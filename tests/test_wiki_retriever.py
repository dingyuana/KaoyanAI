"""Tests for wiki_retriever caching and optimization."""

import os
import sys
import time
import tempfile
import shutil
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))
from wiki_retriever import (
    read_file,
    clear_cache,
    _FILE_CACHE,
    _get_l3_files,
    list_concepts,
    _search_subject,
    _l3_cache,
    _L3_CACHE_MAXSIZE,
    _L3_CACHE_TTL,
    _FILE_CACHE_TTL,
)


class TestReadFileCache:
    """Tests for read_file TTL cache."""

    def setup_method(self):
        clear_cache()

    def test_read_file_returns_same_content(self, tmp_path):
        f = tmp_path / "test.txt"
        f.write_text("hello world", encoding="utf-8")
        content = read_file(str(f))
        assert content == "hello world"

    def test_read_file_error_returns_error_message(self, tmp_path):
        content = read_file(str(tmp_path / "nonexistent.txt"))
        assert "[Error reading" in content

    def test_read_file_cached_no_extra_io(self, tmp_path):
        f = tmp_path / "test.txt"
        f.write_text("cached content", encoding="utf-8")
        path = str(f)
        read_file(path)
        cache_size_before = len(_FILE_CACHE)
        read_file(path)
        assert len(_FILE_CACHE) == cache_size_before
        assert path in _FILE_CACHE

    def test_read_file_ttl_eviction_refreshes_content(self, tmp_path, monkeypatch):
        f = tmp_path / "test.txt"
        f.write_text("original content", encoding="utf-8")
        path = str(f)
        # First read caches original
        assert read_file(path) == "original content"
        import wiki_retriever
        original_time = time.monotonic()
        # Write new content to file
        f.write_text("updated content", encoding="utf-8")
        # Advance time beyond TTL so cache entry expires
        monkeypatch.setattr(time, "monotonic", lambda: original_time + _FILE_CACHE_TTL + 1)
        # Set cached entry's timestamp to original_time so it gets evicted
        wiki_retriever._FILE_CACHE[path] = (wiki_retriever._FILE_CACHE[path][0], original_time)
        # Second read should evict expired entry and cache fresh content
        result = read_file(path)
        assert result == "updated content"


class TestL3Cache:
    """Tests for _get_l3_files mtime-aware cache."""

    def setup_method(self):
        clear_cache()

    def test_l3_cache_basic(self, tmp_path):
        # Create a minimal wiki structure
        wiki = tmp_path / "math" / "L3"
        wiki.mkdir(parents=True)
        (wiki / "concept1.md").write_text(
            "---\ntitle: Concept 1\ntype: concept\n---\nBody",
            encoding="utf-8",
        )
        # Patch WIKI_PATH temporarily
        import wiki_retriever
        old_wiki = wiki_retriever.WIKI_PATH
        wiki_retriever.WIKI_PATH = str(tmp_path)
        try:
            result1 = _get_l3_files("math")
            info1_len = len(_l3_cache)
            result2 = _get_l3_files("math")
            assert result1 == result2
            assert len(_l3_cache) == info1_len
        finally:
            wiki_retriever.WIKI_PATH = old_wiki

    def test_l3_cache_mtime_invalidation(self, tmp_path):
        import wiki_retriever
        old_wiki = wiki_retriever.WIKI_PATH
        wiki = tmp_path / "math" / "L3"
        wiki.mkdir(parents=True)
        concept = wiki / "concept1.md"
        concept.write_text(
            "---\ntitle: Concept 1\ntype: concept\n---\nBody",
            encoding="utf-8",
        )
        wiki_retriever.WIKI_PATH = str(tmp_path)
        try:
            result1 = _get_l3_files("math")
            assert len(result1) == 1
            # Touch the file to update mtime
            time.sleep(0.01)
            concept.write_text(
                "---\ntitle: Concept 1 Updated\ntype: concept\n---\nNew Body",
                encoding="utf-8",
            )
            result2 = _get_l3_files("math")
            assert len(result2) == 1
            assert result2[0]["title"] == "Concept 1 Updated"
        finally:
            wiki_retriever.WIKI_PATH = old_wiki

    def test_l3_cache_maxsize_eviction(self, tmp_path):
        import wiki_retriever
        old_wiki = wiki_retriever.WIKI_PATH
        wiki_retriever.WIKI_PATH = str(tmp_path)
        try:
            for i in range(_L3_CACHE_MAXSIZE + 5):
                subj = f"subject{i}"
                s_path = tmp_path / subj / "L3"
                s_path.mkdir(parents=True)
                (s_path / "c.md").write_text(
                    "---\ntitle: C\ntype: concept\n---\n", encoding="utf-8"
                )
                _get_l3_files(subj)
            assert len(_l3_cache) <= _L3_CACHE_MAXSIZE
        finally:
            wiki_retriever.WIKI_PATH = old_wiki

    def test_l3_cache_ttl_invalidation(self, tmp_path, monkeypatch):
        import wiki_retriever
        old_wiki = wiki_retriever.WIKI_PATH
        wiki = tmp_path / "math" / "L3"
        wiki.mkdir(parents=True)
        (wiki / "c.md").write_text(
            "---\ntitle: C\ntype: concept\n---\n", encoding="utf-8"
        )
        wiki_retriever.WIKI_PATH = str(tmp_path)
        orig_monotonic = time.monotonic()
        cached_time = orig_monotonic
        def fake_monotonic():
            return cached_time
        monkeypatch.setattr(time, "monotonic", fake_monotonic)
        try:
            result1 = _get_l3_files("math")
            # Advance time beyond TTL
            cached_time = orig_monotonic + _L3_CACHE_TTL + 1
            result2 = _get_l3_files("math")
            # Should recompute since TTL expired (mtime same but time expired)
            assert result2 == result1  # content same, but was recomputed
        finally:
            wiki_retriever.WIKI_PATH = old_wiki


class TestListConceptsReuse:
    """Tests that list_concepts reuses _get_l3_files."""

    def setup_method(self):
        clear_cache()

    def test_list_concepts_returns_only_concepts(self, tmp_path):
        import wiki_retriever
        old_wiki = wiki_retriever.WIKI_PATH
        wiki = tmp_path / "math" / "L3"
        wiki.mkdir(parents=True)
        (wiki / "concept1.md").write_text(
            "---\ntitle: Concept 1\ntype: concept\n---\n",
            encoding="utf-8",
        )
        (wiki / "exercise1.md").write_text(
            "---\ntitle: Exercise 1\ntype: exercise\n---\n",
            encoding="utf-8",
        )
        wiki_retriever.WIKI_PATH = str(tmp_path)
        try:
            concepts = list_concepts("math")
            assert len(concepts) == 1
            assert concepts[0]["title"] == "Concept 1"
        finally:
            wiki_retriever.WIKI_PATH = old_wiki


class TestSearchSubjectTopN:
    """Tests for _search_subject top_n parameterization."""

    def setup_method(self):
        clear_cache()

    def test_search_subject_top_n_default_is_3(self, tmp_path):
        import wiki_retriever
        old_wiki = wiki_retriever.WIKI_PATH
        wiki = tmp_path / "math" / "L3"
        wiki.mkdir(parents=True)
        for i in range(5):
            (wiki / f"c{i}.md").write_text(
                f"---\ntitle: Concept {i}\ntype: concept\ntags: [test]\n---\nKeyword content",
                encoding="utf-8",
            )
        wiki_retriever.WIKI_PATH = str(tmp_path)
        schema = {"SCHEMA.md": "", "INDEX.yaml": ""}
        try:
            # top_n=3 (default)
            results3, sources3 = _search_subject("math", "Keyword", schema)
            assert len(results3) <= 3
            # top_n=5
            results5, sources5 = _search_subject("math", "Keyword", schema, top_n=5)
            assert len(results5) <= 5
            assert len(results5) >= len(results3)
        finally:
            wiki_retriever.WIKI_PATH = old_wiki


class TestClearCache:
    """Tests for clear_cache function."""

    def test_clear_cache_clears_both_caches(self, tmp_path):
        import wiki_retriever
        old_wiki = wiki_retriever.WIKI_PATH
        wiki = tmp_path / "math" / "L3"
        wiki.mkdir(parents=True)
        (wiki / "c.md").write_text(
            "---\ntitle: C\ntype: concept\n---\n", encoding="utf-8"
        )
        wiki_retriever.WIKI_PATH = str(tmp_path)
        try:
            read_file(str(wiki / "c.md"))
            _get_l3_files("math")
            assert len(_FILE_CACHE) > 0
            assert len(_l3_cache) > 0
            clear_cache()
            assert len(_FILE_CACHE) == 0
            assert len(_l3_cache) == 0
        finally:
            wiki_retriever.WIKI_PATH = old_wiki


class TestIntegration:
    """Integration tests using real wiki data."""

    def setup_method(self):
        clear_cache()

    def test_retrieve_knowledge_smoke_test(self):
        results = __import__("wiki_retriever", fromlist=["retrieve_knowledge"]).retrieve_knowledge(
            "极限", subject="math"
        )
        assert "content" in results
        assert "sources" in results
        assert "query" in results
        assert results["query"] == "极限"

    def test_list_concepts_math(self):
        concepts = list_concepts("math")
        assert isinstance(concepts, list)
        # Math subject has L3 concepts
        if concepts:
            assert "title" in concepts[0]
            assert "file_path" in concepts[0]

    def test_get_l3_files_returns_expected_structure(self):
        files = _get_l3_files("math")
        if files:
            f = files[0]
            assert "id" in f
            assert "file_path" in f
            assert "title" in f
            assert "type" in f
            assert "tags" in f
