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
    
    # Add schema context to results
    if schema.get("SCHEMA.md"):
        # Extract key terms from schema that match query
        schema_keywords = _extract_keywords(schema["SCHEMA.md"])
        query_keywords = _extract_keywords(query)
        
        # Check for keyword matches
        for keyword in query_keywords:
            if keyword in schema_keywords or keyword in query.lower():
                results.append(f"【{subject.upper()} 学科说明】\n{schema['SCHEMA.md'][:500]}")
                sources.append(f"{subject}/SCHEMA.md")
                break
    
    # Search L3 concepts
    l3_path = os.path.join(WIKI_PATH, subject, "L3")
    if os.path.exists(l3_path):
        for root, dirs, files in os.walk(l3_path):
            for file in files:
                if file.endswith('.md'):
                    file_path = os.path.join(root, file)
                    content = read_file(file_path)
                    
                    # Simple relevance check
                    if _is_relevant(content, query):
                        results.append(f"【{file}】\n{content[:2000]}")
                        sources.append(f"{subject}/L3/{file}")
    
    # Search INDEX.yaml
    index_path = os.path.join(WIKI_PATH, subject, "INDEX.yaml")
    if os.path.exists(index_path):
        index_content = read_file(index_path)
        if _is_relevant(index_content, query):
            results.append(f"【{subject}/INDEX.yaml】\n{index_content[:2000]}")
            sources.append(f"{subject}/INDEX.yaml")
    
    return results, sources


def _extract_keywords(text: str) -> List[str]:
    """Extract key terms from text."""
    # Remove markdown formatting
    text = re.sub(r'[#*`\[\]()]', '', text)
    # Split and filter
    words = text.split()
    return [w for w in words if len(w) > 1]


def _is_relevant(content: str, query: str) -> bool:
    """Check if content is relevant to query."""
    query_lower = query.lower()
    content_lower = content.lower()
    
    # Extract query keywords
    query_words = set(_extract_keywords(query_lower))
    
    # Check for matches
    content_words = set(_extract_keywords(content_lower))
    
    # At least one keyword match
    common = query_words & content_words
    return len(common) > 0 or any(word in content_lower for word in query_words)


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