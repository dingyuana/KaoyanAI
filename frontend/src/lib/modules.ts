// 9 大业务模块静态配置（对应需求清单 + 视觉规范）
// 状态：done（完成）/ bias（存在偏差）/ paused（暂停未开发）
// 优先级：P0 核心 / P1 进阶

export type ModuleStatus = 'done' | 'bias' | 'paused';
export type ModulePriority = 'P0' | 'P1';

export interface ModuleItem {
  id: string;
  name: string;
  description: string;
  iconKey: IconKey;
  gradient: string;            // CSS 渐变（已含 var）
  iconColor: string;           // 描边/主色
  priority: ModulePriority;
  status: ModuleStatus;
  completion: number;          // 0-100
  bottomNote: string;          // 卡片底部的简短备注
  biasDetail?: string;         // 偏差详情（hover popover 内容）
  optimizationPlan?: string;   // 后续优化方案
  href?: string;               // 点击跳转（如有）
}

export type IconKey =
  | 'kb' | 'dx' | 'eb' | 'ai' | 'plan' | 'info'
  | 'exam' | 'school' | 'viz';

export const MODULES: ModuleItem[] = [
  {
    id: 'kb',
    name: '知识库基座',
    description: '7 学科 · 1300+ 文档，覆盖数学与 408',
    iconKey: 'kb',
    gradient: 'var(--ds-grad-kb)',
    iconColor: 'var(--ds-icon-kb)',
    priority: 'P0',
    status: 'done',
    completion: 100,
    bottomNote: '完成度 100% · 超出原始设计，覆盖数学 + 408 四门学科',
    href: '/kaoyan/concepts',
  },
  {
    id: 'dx',
    name: '学习诊断',
    description: '诊断测试 + 薄弱点分析',
    iconKey: 'dx',
    gradient: 'var(--ds-grad-dx)',
    iconColor: 'var(--ds-icon-dx)',
    priority: 'P0',
    status: 'bias',
    completion: 90,
    bottomNote: '完成度 90% · 存在偏差：无 LLM 步骤级批改，仅关键词匹配',
    biasDetail: '当前诊断判分仅做关键词匹配，未使用 LLM 进行步骤级批改。简单对错可识别，复杂解题过程的中间步骤无法判定对错，会影响薄弱点定位精度。',
    optimizationPlan: '接入 LLM 步骤级评分：解析答题步骤为可批改单元 → 调用 LLM 判定每步对错 → 聚合成知识点薄弱度。已规划 Phase 6.2，依赖 LLM 调用稳定性。',
    href: '/kaoyan/diagnosis',
  },
  {
    id: 'eb',
    name: '错题管理',
    description: '艾宾浩斯复习 + 同类题推荐',
    iconKey: 'eb',
    gradient: 'var(--ds-grad-eb)',
    iconColor: 'var(--ds-icon-eb)',
    priority: 'P0',
    status: 'bias',
    completion: 95,
    bottomNote: '完成度 95% · 存在偏差：同类推荐仅知识点匹配，无向量检索',
    biasDetail: '同类题推荐依赖知识点标签的精确匹配，未做语义级向量检索。出现"形似神不似"的题时召回率偏低。',
    optimizationPlan: '为题目与知识点生成 embedding → 引入向量库（FAISS / Milvus）→ 用余弦相似度召回 Top-K 同类题。已规划 Phase 6.3，需 embedding 模型选型。',
    href: '/kaoyan/error-book',
  },
  {
    id: 'ai',
    name: 'AI 辅导',
    description: '苏格拉底式引导解题',
    iconKey: 'ai',
    gradient: 'var(--ds-grad-ai)',
    iconColor: 'var(--ds-icon-ai)',
    priority: 'P0',
    status: 'bias',
    completion: 80,
    bottomNote: '完成度 80% · 存在偏差：暂不支持拍照/语音多模态输入',
    biasDetail: 'AI 辅导仅支持文本输入，无法识别手写题目、公式截图或语音提问。对移动端用户体验影响较大。',
    optimizationPlan: '接入多模态 LLM：拍照 → OCR + 公式识别 → 转结构化题目；语音 → ASR → 转文本。已规划 Phase 7.1，需选型视觉/语音模型。',
    href: '/kaoyan/tutor',
  },
  {
    id: 'plan',
    name: '个性规划',
    description: '目标拆解 + 每日任务',
    iconKey: 'plan',
    gradient: 'var(--ds-grad-plan)',
    iconColor: 'var(--ds-icon-plan)',
    priority: 'P0',
    status: 'bias',
    completion: 85,
    bottomNote: '完成度 85% · 存在偏差：无推送提醒，仅页面内展示',
    biasDetail: '计划任务以页面内展示为主，缺少主动提醒（push / 邮件 / 微信）。用户未打开应用时易遗忘复习节点。',
    optimizationPlan: '增加提醒渠道：浏览器 Web Push + 微信模板消息 + 邮件摘要，按用户偏好选择。已规划 Phase 7.2，需服务端推送凭证。',
    href: '/kaoyan/plan',
  },
  {
    id: 'info',
    name: '智能信息中枢',
    description: '研招网 / 院校资讯采集',
    iconKey: 'info',
    gradient: 'var(--ds-grad-paused)',
    iconColor: 'var(--ds-icon-paused)',
    priority: 'P0',
    status: 'paused',
    completion: 0,
    bottomNote: '完成度 0% · 功能暂停，研招网院校采集未实现',
  },
  {
    id: 'exam',
    name: '阶段检测',
    description: '模考测评 + 自动判分',
    iconKey: 'exam',
    gradient: 'var(--ds-grad-exam)',
    iconColor: 'var(--ds-icon-exam)',
    priority: 'P1',
    status: 'bias',
    completion: 90,
    bottomNote: '完成度 90% · 存在偏差：题目为模板生成，无真实题库',
    biasDetail: '当前模考题目由模板生成器动态产出，未对接真实考研真题题库。模考信度与正式考试有差距。',
    optimizationPlan: '分两期：① 接入 LLM 按知识点生成高仿真题；② 与出版社/机构合作接入历年真题。已规划 Phase 8.1，需先解决版权与生成稳定性。',
    href: '/kaoyan/exam',
  },
  {
    id: 'school',
    name: '智能择校',
    description: '院校定位 + 难度匹配',
    iconKey: 'school',
    gradient: 'var(--ds-grad-paused)',
    iconColor: 'var(--ds-icon-paused)',
    priority: 'P1',
    status: 'paused',
    completion: 0,
    bottomNote: '完成度 0% · 功能暂停未开发',
  },
  {
    id: 'viz',
    name: '能力可视化',
    description: '心理支持 · 学习数据雷达',
    iconKey: 'viz',
    gradient: 'var(--ds-grad-viz)',
    iconColor: 'var(--ds-icon-viz)',
    priority: 'P1',
    status: 'bias',
    completion: 90,
    bottomNote: '完成度 90% · 存在偏差：无匿名成绩对标功能',
    biasDetail: '数据看板仅展示个人数据，没有匿名对标（与同阶段/同院校/同专业考生平均分对比）。缺少对标会让用户难以定位真实水平。',
    optimizationPlan: '聚合匿名用户数据 → 按用户所属 cohort 切片 → 展示百分位排名。隐私优先：去除所有可识别字段，仅保留聚合指标。',
    href: '/kaoyan/dashboard',
  },
];

// 过滤 & 排序辅助
export type FilterKey = 'all' | 'P0' | 'P1' | 'paused';

export const FILTER_LABELS: Record<FilterKey, string> = {
  all: '全部模块',
  P0: 'P0 核心',
  P1: 'P1 进阶',
  paused: '已暂停',
};

export function filterModules(modules: ModuleItem[], filter: FilterKey): ModuleItem[] {
  if (filter === 'all') return modules;
  if (filter === 'paused') return modules.filter((m) => m.status === 'paused');
  return modules.filter((m) => m.priority === filter);
}

export function countByStatus(modules: ModuleItem[]) {
  return {
    total: modules.length,
    done: modules.filter((m) => m.status === 'done').length,
    bias: modules.filter((m) => m.status === 'bias').length,
    paused: modules.filter((m) => m.status === 'paused').length,
    p0: modules.filter((m) => m.priority === 'P0').length,
    p1: modules.filter((m) => m.priority === 'P1').length,
  };
}
