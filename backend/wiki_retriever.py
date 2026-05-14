"""Wiki knowledge base retrieval module."""

import os
import re
from pathlib import Path
from typing import List, Dict, Any, Optional

from config import WIKI_PATH, SUBJECTS


def read_file(file_path: str) -> str:
    """Read file content safely."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"[Error reading {file_path}: {e}]"


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


def _get_l3_files(subject: str) -> List[Dict[str, Any]]:
    """Get all L3 files for a subject with frontmatter."""
    files = []
    l3_path = os.path.join(WIKI_PATH, subject, "L3")
    if not os.path.exists(l3_path):
        return files
    for root, dirs, filenames in os.walk(l3_path):
        for f in filenames:
            if not f.endswith('.md'):
                continue
            file_path = os.path.join(root, f)
            content = read_file(file_path)
            fm, body = _parse_frontmatter(content)
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
    return files


def list_concepts(subject: str) -> List[Dict[str, Any]]:
    """List all concepts for a subject."""
    concepts = []
    l3_path = os.path.join(WIKI_PATH, subject, "L3")
    if not os.path.exists(l3_path):
        l3_path = os.path.join(l3_path, "concepts")
        if not os.path.exists(l3_path):
            return concepts
    for root, dirs, files in os.walk(l3_path):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                content = read_file(file_path)
                concept_info = {
                    "title": file.replace('.md', ''),
                    "file_path": file_path,
                    "type": "concept"
                }
                if content.startswith('---'):
                    parts = content.split('---', 2)
                    if len(parts) >= 3:
                        try:
                            import yaml
                            frontmatter = yaml.safe_load(parts[1])
                            if frontmatter:
                                concept_info.update({
                                    "id": frontmatter.get("id", ""),
                                    "title": frontmatter.get("title", concept_info["title"]),
                                    "type": frontmatter.get("type", "concept"),
                                    "tags": frontmatter.get("tags", []),
                                    "related": frontmatter.get("related", [])
                                })
                        except:
                            pass
                concepts.append(concept_info)
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


def retrieve_knowledge(query: str, subject: Optional[str] = None) -> Dict[str, Any]:
    """Retrieve relevant knowledge from wiki based on query."""
    results = []
    sources = []
    subjects_to_search = [subject] if subject else SUBJECTS
    for subj in subjects_to_search:
        schema = get_subject_schema(subj)
        subj_results, subj_sources = _search_subject(subj, query, schema)
        results.extend(subj_results)
        sources.extend(subj_sources)
    content = "\n\n".join(results) if results else ""
    return {
        "content": content,
        "sources": sources,
        "query": query,
        "subjects_searched": subjects_to_search
    }


def _search_subject(subject: str, query: str, schema: Dict[str, str]) -> tuple:
    """Search within a subject for relevant content."""
    results = []
    sources = []
    MAX_L3_RESULTS = 3
    l3_path = os.path.join(WIKI_PATH, subject, "L3")
    if os.path.exists(l3_path):
        for root, dirs, files in os.walk(l3_path):
            for file in files:
                if not file.endswith('.md'):
                    continue
                if len([s for s in sources if s.startswith(f"{subject}/L3/")]) >= MAX_L3_RESULTS:
                    break
                file_path = os.path.join(root, file)
                content = read_file(file_path)
                if _is_relevant(content, query):
                    clean = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
                    results.append(clean[:2000].strip())
                    sources.append(f"{subject}/L3/{file}")
            else:
                continue
            break
    if not results:
        if schema.get("SCHEMA.md") and _is_relevant(schema["SCHEMA.md"], query):
            results.append(f"【{subject.upper()} 学科说明】\n{schema['SCHEMA.md'][:500]}")
            sources.append(f"{subject}/SCHEMA.md")
        index_path = os.path.join(WIKI_PATH, subject, "INDEX.yaml")
        if os.path.exists(index_path):
            index_content = read_file(index_path)
            if _is_relevant(index_content, query):
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
    """Check if content is relevant to query."""
    query_lower = query.lower().strip()
    content_lower = content.lower()

    if not query_lower:
        return False

    if query_lower in content_lower:
        return True

    tokens = re.split(r'[\s,，。！？、；;：:（）()\[\]【】""''…—]+', query_lower)
    tokens = [t.strip() for t in tokens if len(t.strip()) > 1]

    keywords = set(tokens)
    for t in tokens:
        if len(t) > 2:
            for g in _extract_ngrams(t, 2, 4):
                keywords.add(g)

    if not keywords:
        return False

    matches = sum(1 for k in keywords if k in content_lower)
    return matches >= 1 or (matches / len(keywords) >= 0.3)


def get_subjects() -> List[str]:
    """Get list of available subjects from wiki directory."""
    available = []
    for item in os.listdir(WIKI_PATH):
        path = os.path.join(WIKI_PATH, item)
        if os.path.isdir(path) and not item.startswith('_'):
            if os.path.exists(os.path.join(path, "SCHEMA.md")):
                available.append(item)
    return available if available else SUBJECTS
