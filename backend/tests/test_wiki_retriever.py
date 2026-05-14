"""Tests for wiki_retriever module."""

from backend.wiki_retriever import get_subjects, _is_relevant, _extract_ngrams


class TestIsRelevant:
    def test_direct_match(self):
        assert _is_relevant("极限的定义和性质", "极限") is True

    def test_no_match(self):
        assert _is_relevant("行列式计算", "极限") is False

    def test_partial_match(self):
        # Content >= 100 chars with query as substring: passes early check
        content = ("函数极限的计算方法包括洛必达法则、泰勒展开等多种技巧，"
                   "这些方法在处理复杂函数的极限问题时非常有效，"
                   "需要熟练掌握极限计算的基本原理和常用解题技巧，"
                   "对于培养数学分析能力和提高解题效率至关重要，"
                   "在实际应用中具有广泛的用途")
        assert _is_relevant(content, "极限计算") is True

    def test_empty_query_returns_false(self):
        assert _is_relevant("任何内容", "") is False

    def test_chinese_fuzzy_match(self):
        assert _is_relevant("微分方程的通解结构", "微分方程") is True


class TestExtractNgrams:
    def test_basic_ngrams(self):
        grams = _extract_ngrams("极限", 2, 2)
        assert len(grams) == 1
        assert "极限" in grams

    def test_longer_text(self):
        grams = _extract_ngrams("导数与微分", 2, 3)
        assert len(grams) >= 3

    def test_empty_string(self):
        assert _extract_ngrams("", 2, 3) == []


class TestGetSubjects:
    def test_math_in_subjects(self):
        subjects = get_subjects()
        assert "math" in subjects
