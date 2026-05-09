# WORKFLOWS.md - 数学考研知识库标准操作流程

> 本文件定义知识库的标准操作流程。  
> Hermes 执行任务时必须遵循此流程。

---

## 一、材料摄入流程

### 流程1：摄入新教材（PDF/讲义）

```
输入：PDF文件 或 Markdown文件
输出：raw/ 目录下生成 L1 Chunk 文件

Step 1：格式转换
  ├─ 文本型PDF → MarkItDown 转 Markdown
  └─ 扫描版PDF → OCR（Mathpix/MinerU）→ Markdown

Step 2：L1 分块
  ├─ 按页/章节切分
  ├─ 每个Chunk分配永久锚点ID：RAW-{来源}-P{页码}-C{序号}
  └─ 验证公式完整性和内容独立性

Step 3：写入 raw/
  └─ 文件命名：{学科}_{章节序号}_{标题}.md

Step 4：更新 INDEX.yaml
  └─ 添加新Entry，processed_to_L3 留空
```

### 流程2：摄入真题卷

```
输入：历年真题（PDF/图片）
输出：raw/ 目录下生成带年份标注的 Chunk

Step 1：OCR识别（如果图片）
Step 2：按年份+题号切分
  └─ 文件命名：raw/exams/{年份}_{科目}_{题号}.md
  └─ 锚点ID：RAW-{年份}考研-{题号}
Step 3：标记为 exercise 类型
Step 4：更新 INDEX.yaml
```

---

## 二、L2 索引生成流程

```
输入：raw/ 目录下的新 Chunk
输出：更新后的 INDEX.yaml

Step 1：读取 SCHEMA.md（了解类型定义）
Step 2：分析 Chunk 内容
  ├─ 识别类型：concept | method | exercise
  ├─ 提取 raw_concepts（原始概念标签）
  └─ 确定 perspective（视角）
Step 3：生成索引条目
  └─ 格式见 INDEX.yaml 结构
Step 4：检查 related（关联锚点）
  └─ 如果有关联概念，查 INDEX.yaml 找到对应锚点
Step 5：写入 INDEX.yaml
```

---

## 三、L3 文档生成流程

```
输入：INDEX.yaml 中 processed_to_L3 为空的条目
输出：L3/ 目录下的文档

Step 1：读取 SCHEMA.md 和 AGENT.md
Step 2：读取对应 L1 Chunk 的原文
Step 3：确定文档类型
  ├─ concept → L3/concepts/
  ├─ method → L3/methods/
  └─ exercise → L3/exercises/
Step 4：加载 TEMPLATES/ 中对应模板
Step 5：生成 L3 文档
  ├─ 填写 Frontmatter
  ├─ 引用 L1 原文（带锚点）
  ├─ 添加 LLM 解释（区分于原文）
  └─ 建立关联（related）
Step 6：写入文件
  └─ 文件名：L3-{学科}-{概念英文名}.md
Step 7：更新 INDEX.yaml
  └─ processed_to_L3 填写生成的文档ID
```

---

## 四、维护检查流程

### 流程4：定期检查

```
频率：每周一次（或每次批量更新后）

Step 1：检查 L1/L2/L3 一致性
  ├─ L2 锚点是否指向有效的 L1
  ├─ L3 source_anchors 是否指向有效的 L1
  └─ concept_map.yaml 是否覆盖已知同义词

Step 2：检查索引完整性
  ├─ L2 覆盖率 = processed / total
  └─ 低于 80% 触发警告

Step 3：检查重复
  ├─ 相同内容的 L1 Chunk
  └─ 相同概念的 L3 文档

Step 4：输出报告
  └─ 格式：{日期}_integrity_report.md
```

### 流程5：冲突检测

```
触发条件：发现 L1 中存在矛盾表述

Step 1：标记冲突
  └─ INDEX.yaml 条目添加 conflict_flag: true

Step 2：在 L3 中呈现冲突
  └─ 保留所有原始表述
  └─ 添加"考研建议"小节

Step 3：记录日志
  └─ 格式：{锚点ID}_conflict_log.md
```

---

## 五、检索响应流程

```
触发：AI 编程助手需要检索知识库

Step 1：解析 query
  ├─ 提取概念关键词
  └─ 查 concept_map.yaml（标准概念映射）

Step 2：定位锚点
  ├─ 查 INDEX.yaml
  └─ 找到所有相关 L1 锚点

Step 3：读取原文
  ├─ 读取 L1 Chunk 内容
  └─ 截取相关段落（最多2000字）

Step 4：返回结果
  └─ 格式：
    {
      "anchors": [...],
      "excerpts": [...],
      "sources": [...]
    }
```

---

## 六、文件命名规范

| 类型 | 目录 | 命名格式 |
|------|------|---------|
| L1 Raw | `raw/` | `{学科}_{章节序号}_{标题}.md` |
| L2 Index | `INDEX.yaml` | 全局索引文件 |
| L3 Concept | `L3/concepts/` | `L3-{学科}-{概念英文名}.md` |
| L3 Method | `L3/methods/` | `L3-{学科}-{方法英文名}.md` |
| L3 Exercise | `L3/exercises/` | `L3-{学科}-{题目类型}.md` |

---

*流程制定：2026-05-09*  
*如需修改，通过知识库更新流程处理*