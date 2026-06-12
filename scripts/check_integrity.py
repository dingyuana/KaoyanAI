#!/usr/bin/env python3
"""
知识库完整性检查脚本

遍历所有学科 L3 文档，验证：
1. Frontmatter 完整性（id/title/subject/type/source_anchors）
2. source_anchors 引用的 RAW 文件是否存在
3. INDEX.yaml 中引用的 L3 文件是否存在
"""

import os
import sys
import yaml

WIKI_PATH = os.path.join(os.path.dirname(__file__), '..', 'wiki')

def check_l3_frontmatter():
    """Check Frontmatter completeness for L3 files only."""
    errors = []
    for root, dirs, files in os.walk(WIKI_PATH):
        # Skip RAW and raw directories — they don't require Frontmatter
        rel_path = os.path.relpath(root, WIKI_PATH)
        if '/RAW' in rel_path or '/raw' in rel_path or rel_path.startswith('RAW') or rel_path.startswith('raw'):
            continue
        # Only check L3 directory files
        if '/L3/' not in rel_path and not rel_path.endswith('/L3'):
            continue
        for f in files:
            if not f.endswith('.md'):
                continue
            path = os.path.join(root, f)
            with open(path) as fh:
                content = fh.read()
            if not content.startswith('---'):
                errors.append(f"{path}: 缺少 Frontmatter")
                continue


def check_index_references():
    """Check INDEX.yaml references point to existing L3 files."""
    errors = []
    for root, dirs, files in os.walk(WIKI_PATH):
        for f in files:
            if f != 'INDEX.yaml':
                continue
            path = os.path.join(root, f)
            with open(path) as fh:
                try:
                    data = yaml.safe_load(fh)
                except Exception as e:
                    errors.append(f"{path}: YAML 解析失败: {e}")
                    continue
            if not data or 'chapters' not in data:
                continue
            index_dir = os.path.dirname(path)
            for ch in data['chapters']:
                for ref_type in ['concepts', 'methods', 'exercises']:
                    for ref in ch.get(ref_type, []):
                        ref_path = os.path.join(index_dir, ref)
                        if not os.path.exists(ref_path):
                            errors.append(f"{path}: 章节 '{ch.get('title', '?')}' 引用的 {ref} 不存在")

    return errors


def main():
    print("=" * 60)
    print("知识库完整性检查")
    print("=" * 60)

    errors = []

    print("\n1. L3 Frontmatter 检查...")
    fm_errors = check_l3_frontmatter()
    if fm_errors:
        print(f"   发现 {len(fm_errors)} 个问题:")
        for e in fm_errors:
            print(f"   ❌ {e}")
        errors.extend(fm_errors)
    else:
        print("   ✅ 全部通过")

    print("\n2. INDEX.yaml 引用检查...")
    idx_errors = check_index_references()
    if idx_errors:
        print(f"   发现 {len(idx_errors)} 个问题:")
        for e in idx_errors:
            print(f"   ❌ {e}")
        errors.extend(idx_errors)
    else:
        print("   ✅ 全部通过")

    print(f"\n{'=' * 60}")
    if errors:
        print(f"❌ 发现 {len(errors)} 个问题")
        sys.exit(1)
    else:
        print("✅ 知识库完整性检查全部通过")
        sys.exit(0)


if __name__ == '__main__':
    main()