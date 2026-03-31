// ============================================================
// 内容层统一入口
// ============================================================
// 编辑游戏文本只需修改 src/content/ 下的文件
//
//   scenes.ts      — 14 个核心场景（叙事 + 选项 + 数值影响）
//   thresholds.ts  — 6 张命运卡（阶段转换时随机触发）
//   endings.ts     — 7 种结局文本
//   narration.ts   — 旁白模板 + 阶段过渡文本
//   dimensions.ts  — 六维度的中文名、图标、颜色、描述
//   ui.ts          — 所有 UI 按钮/标签/提示文案
// ============================================================

export { SCENES } from './scenes';
export { THRESHOLD_CARDS } from './thresholds';
export { ENDINGS, type EndingData } from './endings';
export {
  NARRATION_TEMPLATES,
  NARRATION_CONNECTORS,
  ZH_NARRATION_TEMPLATES,
  ZH_NARRATION_CONNECTORS,
  TURN_TRANSITIONS,
  SHADOW_HIGH_SUFFIX,
  REGENERATION_HIGH_SUFFIX,
  DEFAULT_TRANSITION,
} from './narration';
export { DIMENSION_DISPLAY, type DimensionDisplay } from './dimensions';
export { UI_TEXT } from './ui';
export { SHADOW_SCENES, SHADOW_TURNS } from './shadow-scenes';
export { SHADOW_ENDINGS, determineShadowEnding, type ShadowEndingData } from './shadow-endings';
export { SHADOW_NARRATION, SHADOW_CONNECTORS } from './shadow-narration';
