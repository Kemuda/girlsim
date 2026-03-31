// BaZi Engine — Public API

export { generateLife, generateLifeFromChart } from './life.ts';

// Chart utilities
export { generateRandomChart, chartToString, PILLAR_NAMES } from './chart.ts';
export type { BaZiChart, Pillar, PillarPosition } from './chart.ts';

// Core data
export { TIANGAN } from './tiangan.ts';
export type { TianGan, YinYang } from './tiangan.ts';
export { DIZHI } from './dizhi.ts';
export type { DiZhi, CangGan } from './dizhi.ts';
export { WUXING_COLORS } from './wuxing.ts';
export type { WuXing, WuXingRelation } from './wuxing.ts';

// Analysis
export { SHISHEN_INFO, SHISHEN_LIST } from './shishen.ts';
export type { ShiShen } from './shishen.ts';
export { judgeStrength } from './strength.ts';
export type { StrengthResult, StrengthLevel } from './strength.ts';
export { detectTouChou } from './touchou.ts';
export type { TouChouResult } from './touchou.ts';

// Game-specific
export { generateLuckCycles } from './luck-cycles.ts';
export { extractMonthTheme } from './month-theme.ts';
export { analyzeImbalance } from './imbalance.ts';
export type {
  BaZiLife,
  DaYun,
  DaYunEnergy,
  LifeStageName,
  MonthTheme,
  ImbalanceResult,
  ImbalanceSeverity,
  WuXingCount,
} from './types.ts';

// Narrative
export { generateNarrativeFromLife, generateEndingReflection } from './narrative.ts';
export type { LifeNarrative } from './narrative.ts';
