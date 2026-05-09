import os, re, yaml, glob
from datetime import date

BASE = '/root/kaoyan/wiki/raw/math'
SRC = f'{BASE}/raw/线性代数'
L3_CONCEPTS = f'{BASE}/L3/concepts'
INDEX_PATH = f'{BASE}/INDEX.yaml'

os.makedirs(L3_CONCEPTS, exist_ok=True)

def parse_fm(content):
    lines = content.split('\n')
    fm = {}
    body_lines = []
    in_fm = False
    for line in lines:
        if line.strip() == '---':
            in_fm = True
            continue
        if in_fm and ':' in line:
            k, v = line.split(':', 1)
            fm[k.strip()] = v.strip()
        else:
            body_lines.append(line)
    return fm, '\n'.join(body_lines)

with open(INDEX_PATH) as f:
    idx = yaml.safe_load(f)

start_num = len([e for e in idx['entries'] if '线代' in str(e.get('chapter','')) or e.get('subject') == '线性代数']) + 1

files = sorted(glob.glob(f'{SRC}/*.md'))
results = []
anchor_num = start_num

for fpath in files:
    fname = os.path.basename(fpath)
    with open(fpath, encoding='utf-8') as f:
        content = f.read()
    
    fm, body = parse_fm(content)
    title = fm.get('title', fname.replace('.md',''))
    subject = '线性代数'
    chapter = fm.get('chapter', '2026张宇《线代9讲》')
    tags_raw = fm.get('tags', [])
    if isinstance(tags_raw, str):
        tags = [t.strip() for t in tags_raw.strip('[]').split(',')]
    else:
        tags = tags_raw or []
    
    anchor = f'RAW-math-线代-P{anchor_num:03d}-concept'
    anchor_num += 1
    
    new_fm_lines = [
        '---',
        f'anchor: {anchor}',
        f'title: {title}',
        f'type: concept',
        f'subject: {subject}',
        f'chapter: {chapter}',
        f'tags: {tags}',
        f'created: {fm.get("created", date.today().isoformat())}',
        '---',
    ]
    new_content = '\n'.join(new_fm_lines) + '\n' + body
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    l3_slug = re.sub(r'[^\w\u4e00-\u9fff]+', '-', title)
    l3_id = f'L3-math-concept-{l3_slug}'
    l3_fname = f'L3-math-concept-{l3_slug}.md'
    
    l3_fm = f'''---
id: {l3_id}
title: {title}
subject: math
type: concept
level: 3
tags: [{', '.join(tags)}]
source_anchors:
  - {anchor}
created: {date.today().isoformat()}
---

> 引用自 [[{anchor}]]

# {title}

来源: {chapter}

{body}
'''
    with open(f'{L3_CONCEPTS}/{l3_fname}', 'w', encoding='utf-8') as f:
        f.write(l3_fm)
    
    idx['entries'].append({
        'anchor': anchor,
        'type': 'concept',
        'title': title,
        'chapter': chapter,
        'subject': subject,
        'raw_concepts': tags,
        'perspective': '基础概念',
        'source': f'raw/线性代数/{fname}',
        'related': [],
        'uncertainty': False,
        'processed_to_L3': l3_id
    })
    
    results.append({'fname': fname, 'anchor': anchor})

with open(INDEX_PATH, 'w', encoding='utf-8') as f:
    yaml.dump(idx, f, allow_unicode=True, sort_keys=False)

print(f'线性代数处理完成:')
print(f'  新增 INDEX 条目: {len(results)}')
print(f'  新增 anchor 编号: P{start_num:03d}-P{anchor_num-1:03d}')
for r in results:
    print(f'  {r["anchor"]} | {r["fname"]}')
