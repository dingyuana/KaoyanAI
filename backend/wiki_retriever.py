"""Wiki knowledge base retrieval module."""

import os
import re
import time
from collections import OrderedDict
from pathlib import Path
from typing import List, Dict, Any, Optional

from config import WIKI_PATH, SUBJECTS


# --- TTL cache for read_file ---
_FILE_CACHE: OrderedDict[str, tuple[str, float]] = OrderedDict()
_FILE_CACHE_TTL = 60.0  # seconds
_FILE_CACHE_MAXSIZE = 200


def read_file(file_path: str) -> str:
    """Read file content safely with TTL cache."""
    now = time.monotonic()
    # Evict expired entries
    while _FILE_CACHE:
        oldest_key, (old_content, oldest_time) = next(iter(_FILE_CACHE.items()))
        if now - oldest_time > _FILE_CACHE_TTL:
            _FILE_CACHE.pop(oldest_key)
        else:
            break
    # Return cached if present and not expired
    if file_path in _FILE_CACHE:
        cached_content, _ = _FILE_CACHE[file_path]
        _FILE_CACHE.move_to_end(file_path)
        return cached_content
    # Read and cache
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        content = f"[Error reading {file_path}: {e}]"
    _FILE_CACHE[file_path] = (content, now)
    _FILE_CACHE.move_to_end(file_path)
    while len(_FILE_CACHE) > _FILE_CACHE_MAXSIZE:
        _FILE_CACHE.popitem(last=False)
    return content



# --- mtime-aware cache for _get_l3_files ---
_l3_cache: OrderedDict[str, tuple[Any, float]] = OrderedDict()
_L3_CACHE_MAXSIZE = 32
_L3_CACHE_TTL = 60.0  # seconds; also invalidated on mtime change


def clear_cache() -> None:
    """Clear all wiki_retriever caches. Exposed for testing."""
    _FILE_CACHE.clear()
    _l3_cache.clear()


def get_wiki_schema() -> Dict[str, str]:
    """Read wiki-wide schema files."""
    schema = {
        "WIKI_SCHEMA.md": "",
        "WIKI_AGENT.md": ""
    }
    for key in schema:
        path = os.path.join(WIKI_PATH, key)
        schema[key] = read_file(path)
    return schema


def get_subject_schema(subject: str) -> Dict[str, str]:
    """Read subject-specific schema files."""
    schema = {
        "SCHEMA.md": "",
        "AGENT.md": "",
        "INDEX.yaml": ""
    }
    subject_path = os.path.join(WIKI_PATH, subject)
    for key in schema:
        path = os.path.join(subject_path, key)
        schema[key] = read_file(path)
    return schema


def _parse_frontmatter(content: str) -> tuple:
    """Parse YAML frontmatter from markdown content."""
    if not content.startswith('---'):
        return {}, content
    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content
    try:
        import yaml
        fm = yaml.safe_load(parts[1]) or {}
        body = parts[2].strip()
        return fm, body
    except:
        return {}, content


def _get_affected_l3_paths(subject: str) -> list[str]:
    """Get all L3 .md file paths for a subject (used for cache invalidation)."""
    paths = []
    l3_path = os.path.join(WIKI_PATH, subject, "L3")
    if os.path.exists(l3_path):
        for root, dirs, files in os.walk(l3_path):
            for f in files:
                if f.endswith('.md'):
                    paths.append(os.path.join(root, f))
    return paths


def _get_l3_files(subject: str) -> List[Dict[str, Any]]:
    """Get all L3 files for a subject with frontmatter. Cached with mtime-aware TTL."""
    now = time.monotonic()
    l3_path = os.path.join(WIKI_PATH, subject, "L3")

    current_mtime = 0.0
    if os.path.exists(l3_path):
        for root, dirs, files in os.walk(l3_path):
            for fn in files:
                if fn.endswith('.md'):
                    try:
                        current_mtime = max(current_mtime, os.path.getmtime(os.path.join(root, fn)))
                    except OSError:
                        pass

    if subject in _l3_cache:
        cached_result, cached_file_mtime = _l3_cache[subject]
        size_ok = len(_l3_cache) <= _L3_CACHE_MAXSIZE
        time_ok = (now - cached_file_mtime) <= _L3_CACHE_TTL
        mtime_ok = (current_mtime == cached_file_mtime) or current_mtime == 0.0
        if size_ok and time_ok and mtime_ok:
            _l3_cache.move_to_end(subject)
            return cached_result
        # Mtime changed — also clear read_file cache for affected files
        if not mtime_ok and current_mtime > 0:
            for f_path in _get_affected_l3_paths(subject):
                _FILE_CACHE.pop(f_path, None)

    files = []
    if os.path.exists(l3_path):
        for root, dirs, filenames in os.walk(l3_path):
            for f in filenames:
                if not f.endswith('.md'):
                    continue
                file_path = os.path.join(root, f)
                content = read_file(file_path)
                fm, body = _parse_frontmatter(content)
                if fm.get("searchable") is False:
                    continue
                files.append({
                    "id": f.replace('.md', ''),
                    "file_path": file_path,
                    "title": fm.get("title", f.replace('.md', '')),
                    "type": fm.get("type", "concept"),
                    "tags": fm.get("tags", []),
                    "difficulty": fm.get("difficulty", ""),
                    "related": fm.get("related", []),
                    "body": body,
                })

    _l3_cache[subject] = (files, current_mtime if current_mtime > 0 else now)
    _l3_cache.move_to_end(subject)
    while len(_l3_cache) > _L3_CACHE_MAXSIZE:
        _l3_cache.popitem(last=False)

    return files


def list_concepts(subject: str) -> List[Dict[str, Any]]:
    """List all concepts for a subject. Reuses _get_l3_files to avoid duplicate traversal."""
    l3_files = _get_l3_files(subject)
    concepts = []
    for f in l3_files:
        if f.get("type") == "concept":
            concepts.append({
                "id": f.get("id", ""),
                "title": f.get("title", ""),
                "file_path": f.get("file_path", ""),
                "type": "concept",
                "tags": f.get("tags", []),
                "related": f.get("related", []),
            })
    return concepts


def get_concept_detail(subject: str, concept_id: str) -> Optional[Dict[str, Any]]:
    """Get full detail for a specific concept by its filename."""
    l3_path = os.path.join(WIKI_PATH, subject, "L3")
    for root, dirs, files in os.walk(l3_path):
        for file in files:
            if not file.endswith('.md'):
                continue
            file_stem = file[:-3]
            if file_stem == concept_id:
                content = read_file(os.path.join(root, file))
                fm, body = _parse_frontmatter(content)
                return {
                    "id": fm.get("id", concept_id),
                    "title": fm.get("title", concept_id),
                    "subject": subject,
                    "type": fm.get("type", "concept"),
                    "tags": fm.get("tags", []),
                    "difficulty": fm.get("difficulty", ""),
                    "related": fm.get("related", []),
                    "source_anchors": fm.get("source_anchors", []),
                    "content": body,
                }
    return None


TOPIC_KEYWORDS = [
    '极限', '连续', '导数', '微分', '积分', '级数',
    '矩阵', '行列式', '向量', '方程组', '方程',
    '概率', '统计', '分布', '特征值', '特征向量', '二次型',
]
MAJOR_CHAPTERS = {'高等数学', '线性代数', '概率论与数理统计', '概率论'}


def _extract_topics(title: str) -> set:
    """Extract topic keywords from a title."""
    title_lower = title.lower()
    return {t for t in TOPIC_KEYWORDS if t in title_lower}


def get_related_exercises(subject: str, concept_id: str) -> List[Dict[str, Any]]:
    """Find exercises related to a concept using tag + topic matching."""
    concept = get_concept_detail(subject, concept_id)
    if not concept:
        return []

    concept_tags = set(concept.get("tags", []))
    concept_topics = _extract_topics(concept.get("title", ""))
    concept_chapters = {t for t in concept_tags if t in MAJOR_CHAPTERS}

    all_l3 = _get_l3_files(subject)
    exercises = [f for f in all_l3 if f["type"] == "exercise"]

    scored = []
    for ex in exercises:
        ex_tags = set(ex["tags"])
        ex_topics = _extract_topics(ex["title"])
        ex_chapters = {t for t in ex_tags if t in MAJOR_CHAPTERS}

        explicit = concept_id in [r for r in ex.get("related", [])]

        shared_chapters = len(concept_chapters & ex_chapters)
        topic_match = len(concept_topics & ex_topics)

        score = explicit * 10 + shared_chapters * 2 + topic_match
        if score > 0:
            scored.append((score, ex))

    scored.sort(key=lambda x: -x[0])
    return [
        {
            "id": ex["id"],
            "title": ex["title"],
            "tags": ex["tags"],
            "difficulty": ex.get("difficulty", ""),
            "score": s,
        }
        for s, ex in scored[:10]
    ]


def get_subject_exercises(subject: str) -> Dict[str, Any]:
    """Get all exercises for a subject, grouped by difficulty tier."""
    all_l3 = _get_l3_files(subject)
    exercises = [f for f in all_l3 if f["type"] == "exercise"]

    groups = {"基础篇": [], "强化篇": [], "其他": []}
    for ex in exercises:
        tags = ex.get("tags", [])
        if "基础篇" in tags:
            groups["基础篇"].append(ex)
        elif "强化篇" in tags:
            groups["强化篇"].append(ex)
        else:
            groups["其他"].append(ex)

    return {
        "count": len(exercises),
        "groups": {k: [{
            "id": e["id"],
            "title": e["title"],
            "tags": e["tags"],
            "difficulty": e.get("difficulty", ""),
        } for e in v] for k, v in groups.items() if v},
    }


def _replace_braced_cmd(text: str, cmd: str, label: str = "") -> str:
    if not label:
        label = cmd
    result = []
    i = 0
    pattern = f"\\{cmd}{{"
    while i < len(text):
        if text[i:i+len(pattern)] == pattern:
            i += len(pattern)
            depth = 1
            start = i
            while i < len(text) and depth > 0:
                if text[i] == '{': depth += 1
                elif text[i] == '}': depth -= 1
                i += 1
            content = text[start:i-1]
            subscript = ''
            if i < len(text) and text[i:i+2] == '_{':
                i += 2
                depth = 1
                s_start = i
                while i < len(text) and depth > 0:
                    if text[i] == '{': depth += 1
                    elif text[i] == '}': depth -= 1
                    i += 1
                subscript = text[s_start:i-1]
            replacement = f'[{content}]'
            if subscript:
                replacement += f' ({subscript})'
            result.append(replacement)
        else:
            result.append(text[i])
            i += 1
    return ''.join(result)


def _sanitize_content(text: str) -> str:
    """Simplify overly complex LaTeX that may produce garbled SVG rendering."""
    text = _replace_braced_cmd(text, "underbrace")
    text = _replace_braced_cmd(text, "overbrace")
    text = re.sub(r'\\begin\{aligned\}[\s\S]*?\\end\{aligned\}', '[公式]', text)
    text = re.sub(r'\\begin\{cases\}[\s\S]*?\\end\{cases\}', '[分段函数]', text)
    text = re.sub(r'\\begin\{pmatrix\}[\s\S]*?\\end\{pmatrix\}', '[矩阵]', text)
    return text


def retrieve_knowledge(query: str, subject: Optional[str] = None) -> Dict[str, Any]:
    """Retrieve relevant knowledge from wiki based on query."""
    results = []
    sources = []
    subjects_to_search = [subject] if subject else SUBJECTS
    for subj in subjects_to_search:
        schema = get_subject_schema(subj)
        subj_results, subj_sources = _search_subject(subj, query, schema, top_n=3)
        results.extend(subj_results)
        sources.extend(subj_sources)
    content = "\n\n".join(results) if results else ""
    # Sanitize complex LaTeX that may produce garbled SVG in rendering
    content = _sanitize_content(content)
    return {
        "content": content,
        "sources": sources,
        "query": query,
        "subjects_searched": subjects_to_search
    }


def _score_relevance(content: str, query: str, title: str = "", tags: list = None) -> int:
    """Score content relevance to query (0-100). Higher = more relevant."""
    query_lower = query.lower().strip()
    content_lower = content.lower()
    title_lower = title.lower()

    if not query_lower:
        return 0

    if query_lower in title_lower:
        return 100

    if query_lower in content_lower:
        return 90

    tokens = re.split(r'[\s,，。！？、；;：:（）()\[\]【】""''…—]+', query_lower)
    tokens = [t.strip() for t in tokens if len(t.strip()) > 1]
    if not tokens:
        return 0

    keywords = set(tokens)
    for t in tokens:
        if len(t) > 2:
            for g in _extract_ngrams(t, 2, 4):
                if len(g) >= 2:
                    keywords.add(g)

    if not keywords:
        return 0

    title_matches = sum(1 for k in keywords if k in title_lower)
    tag_matches = sum(1 for t in (tags or []) for k in keywords if isinstance(t, str) and k in t.lower())
    content_matches = sum(1 for k in keywords if k in content_lower)

    score = 0
    score += title_matches * 25
    score += tag_matches * 10
    score += content_matches * 5
    score += min(content_matches / max(len(keywords), 1), 1.0) * 20

    return min(int(score), 100)


def _search_subject(subject: str, query: str, schema: Dict[str, str], top_n: int = 3) -> tuple:
    """Search within a subject for relevant content. Scores and ranks results."""
    l3_path = os.path.join(WIKI_PATH, subject, "L3")
    scored_results = []

    if os.path.exists(l3_path):
        for root, dirs, files in os.walk(l3_path):
            for file in files:
                if not file.endswith('.md'):
                    continue
                file_path = os.path.join(root, file)
                content = read_file(file_path)
                fm, _ = _parse_frontmatter(content)
                if fm.get("searchable") is False:
                    continue

                title = fm.get("title", file)
                tags = fm.get("tags", [])
                score = _score_relevance(content, query, title, tags)
                if score >= 30:
                    clean = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
                    scored_results.append((score, clean[:2000].strip(), f"{subject}/L3/{file}"))

    scored_results.sort(key=lambda x: -x[0])
    top = scored_results[:top_n]

    results = [r[1] for r in top]
    sources = [r[2] for r in top]

    if not results:
        schema_content = schema.get("SCHEMA.md", "")
        if schema_content and _score_relevance(schema_content, query) >= 30:
            results.append(f"【{subject.upper()} 学科说明】\n{schema_content[:500]}")
            sources.append(f"{subject}/SCHEMA.md")
        index_path = os.path.join(WIKI_PATH, subject, "INDEX.yaml")
        if os.path.exists(index_path):
            index_content = read_file(index_path)
            if _score_relevance(index_content, query) >= 30:
                results.append(f"【{subject}/INDEX.yaml】\n{index_content[:2000]}")
                sources.append(f"{subject}/INDEX.yaml")

    return results, sources


def _extract_ngrams(text: str, min_n: int = 2, max_n: int = 4) -> list:
    """Extract character n-grams from Chinese text for fuzzy matching."""
    results = []
    n = len(text)
    for size in range(min_n, min(max_n + 1, n + 1)):
        for i in range(n - size + 1):
            gram = text[i:i + size]
            if len(gram) >= min_n:
                results.append(gram)
    return results


def _is_relevant(content: str, query: str) -> bool:
    """Check if content is relevant to query. Uses _score_relevance internally."""
    return _score_relevance(content, query) >= 30


def get_subjects() -> List[str]:
    """Get list of available subjects from wiki directory."""
    available = []
    for item in os.listdir(WIKI_PATH):
        path = os.path.join(WIKI_PATH, item)
        if os.path.isdir(path) and not item.startswith('_'):
            if os.path.exists(os.path.join(path, "SCHEMA.md")):
                available.append(item)
    return available if available else SUBJECTS
