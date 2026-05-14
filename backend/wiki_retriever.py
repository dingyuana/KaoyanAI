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


def list_concepts(subject: str) -> List[Dict[str, Any]]:
    """
    List all concepts for a subject.
    
    Returns list of concept info with id, title, type, tags, etc.
    """
    concepts = []
    l3_path = os.path.join(WIKI_PATH, subject, "L3")
    
    if not os.path.exists(l3_path):
        # Try concepts directory
        l3_path = os.path.join(l3_path, "concepts")
        if not os.path.exists(l3_path):
            return concepts
    
    # Scan for concept files
    for root, dirs, files in os.walk(l3_path):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                content = read_file(file_path)
                
                # Parse frontmatter
                concept_info = {
                    "title": file.replace('.md', ''),
                    "file_path": file_path,
                    "type": "concept"
                }
                
                # Try to extract frontmatter
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


def retrieve_knowledge(query: str, subject: Optional[str] = None) -> Dict[str, Any]:
    """
    Retrieve relevant knowledge from wiki based on query.
    
    Args:
        query: User query text
        subject: Optional subject filter
        
    Returns:
        Dict with 'content' and 'sources'
    """
    results = []
    sources = []
    
    subjects_to_search = [subject] if subject else SUBJECTS
    
    for subj in subjects_to_search:
        # Read schema files first
        schema = get_subject_schema(subj)
        
        # Build searchable content from all available knowledge
        subj_results, subj_sources = _search_subject(subj, query, schema)
        results.extend(subj_results)
        sources.extend(subj_sources)
    
    # Combine all content
    content = "\n\n".join(results) if results else ""
    
    return {
        "content": content,
        "sources": sources,
        "query": query,
        "subjects_searched": subjects_to_search
    }


def _search_subject(subject: str, query: str, schema: Dict[str, str]) -> tuple:
    """
    Search within a subject for relevant content.
    """
    results = []
    sources = []
    
    MAX_L3_RESULTS = 3

    # Search L3 concepts first (highest priority)
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
                    # Strip YAML frontmatter (---...---)
                    clean = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
                    results.append(clean[:2000].strip())
                    sources.append(f"{subject}/L3/{file}")
            else:
                continue
            break

    # Only add schema/INDEX if no L3 results found (fallback)
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

    # Direct substring match
    if query_lower in content_lower:
        return True

    # Split into tokens by punctuation/whitespace
    tokens = re.split(r'[\s,，。！？、；;：:（）()\[\]【】""''…—]+', query_lower)
    tokens = [t.strip() for t in tokens if len(t.strip()) > 1]

    # Collect all keywords: original tokens + character bigrams/trigrams
    keywords = set(tokens)
    for t in tokens:
        if len(t) > 2:
            for g in _extract_ngrams(t, 2, 4):
                keywords.add(g)

    if not keywords:
        return False

    # A match counts if any keyword appears in the content
    matches = sum(1 for k in keywords if k in content_lower)
    # Pass if at least one keyword matches, or 30%+ match rate
    return matches >= 1 or (matches / len(keywords) >= 0.3)


def get_subjects() -> List[str]:
    """Get list of available subjects from wiki directory."""
    available = []
    for item in os.listdir(WIKI_PATH):
        path = os.path.join(WIKI_PATH, item)
        if os.path.isdir(path) and not item.startswith('_'):
            # Check if it's a valid subject (has SCHEMA.md)
            if os.path.exists(os.path.join(path, "SCHEMA.md")):
                available.append(item)
    return available if available else SUBJECTS