#!/usr/bin/env python3
"""
知识库覆盖率检查脚本

计算各学科 L2→L3 处理覆盖率，输出统计报告。
"""

import os
import yaml

WIKI_PATH = os.path.join(os.path.dirname(__file__), '..', 'wiki')


def count_l3_files(subject):
    """Count L3 files per type for a subject."""
    counts = {'concepts': 0, 'methods': 0, 'exercises': 0}
    l3_path = os.path.join(WIKI_PATH, subject, 'L3')
    if not os.path.exists(l3_path):
        return counts
    for root, dirs, files in os.walk(l3_path):
        folder = os.path.basename(root)
        if folder in counts:
            counts[folder] += len([f for f in files if f.endswith('.md')])
    return counts


def count_raw_files(subject):
    """Count RAW files for a subject."""
    raw_path = os.path.join(WIKI_PATH, subject, 'RAW')
    if not os.path.exists(raw_path):
        raw_path = os.path.join(WIKI_PATH, subject, 'raw')
    if not os.path.exists(raw_path):
        return 0
    count = 0
    for root, dirs, files in os.walk(raw_path):
        count += len([f for f in files if f.endswith('.md')])
    return count


def main():
    subjects = [d for d in os.listdir(WIKI_PATH)
                if os.path.isdir(os.path.join(WIKI_PATH, d))
                and not d.startswith('_')
                and d not in ('raw', 'RAW')
                and os.path.exists(os.path.join(WIKI_PATH, d, 'SCHEMA.md'))]

    print("=" * 70)
    print("知识库覆盖率报告")
    print("=" * 70)
    print(f"{'学科':<16} {'RAW':>6} {'概念':>6} {'方法':>6} {'习题':>6} {'总计':>6}")
    print("-" * 70)

    total_raw = 0
    total_l3 = 0

    for subject in sorted(subjects):
        raw = count_raw_files(subject)
        l3 = count_l3_files(subject)
        total = sum(l3.values())
        total_raw += raw
        total_l3 += total
        print(f"{subject:<16} {raw:>6} {l3['concepts']:>6} {l3['methods']:>6} {l3['exercises']:>6} {total:>6}")

    print("-" * 70)
    print(f"{'合计':<16} {total_raw:>6} {'':>6} {'':>6} {'':>6} {total_l3:>6}")
    print(f"\nL3/L1 比率: {total_l3}/{total_raw} = {total_l3/total_raw*100:.1f}%" if total_raw > 0 else "")
    print("=" * 70)


if __name__ == '__main__':
    main()