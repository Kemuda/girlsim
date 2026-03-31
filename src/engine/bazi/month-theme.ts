// 月柱主题 — Month Pillar Theme Extraction

import type { BaZiChart } from './chart.ts';
import type { ShiShen } from './shishen.ts';
import { calcShiShen } from './shishen.ts';
import { getTianGan } from './tiangan.ts';
import type { MonthTheme } from './types.ts';

/**
 * 月柱主题 mapping: each 十神 defines a life-long core tension.
 * From docs/bazisim.md — 月柱藏干对应的十神 table.
 */
const THEME_MAP: Record<ShiShen, { description: string; coreQuestion: string }> = {
  '比肩': {
    description: '一辈子在「我是谁」的身份认同中打转',
    coreQuestion: '独立，还是合群？',
  },
  '劫财': {
    description: '一辈子在争夺和被争夺中度过',
    coreQuestion: '什么是真正属于你的？',
  },
  '食神': {
    description: '一辈子在温和地创造和输出',
    coreQuestion: '表达自己，还是照顾别人？',
  },
  '伤官': {
    description: '一辈子在叛逆和表达中挣扎',
    coreQuestion: '要磨平棱角，还是刺穿世界？',
  },
  '偏财': {
    description: '一辈子在冒险和流动中寻找意义',
    coreQuestion: '要不要赌这一把？',
  },
  '正财': {
    description: '一辈子在追求稳定和积累',
    coreQuestion: '稳定是保护，还是牢笼？',
  },
  '七杀': {
    description: '一辈子在跟压力和危机搏斗',
    coreQuestion: '对抗，还是臣服？',
  },
  '正官': {
    description: '一辈子在规则和期待中寻找自我',
    coreQuestion: '满足期待，还是做自己？',
  },
  '偏印': {
    description: '一辈子在孤独和灵感之间游走',
    coreQuestion: '孤独是诅咒，还是天赋？',
  },
  '正印': {
    description: '一辈子被体制和传统滋养又束缚',
    coreQuestion: '感恩，还是挣脱？',
  },
};

/**
 * Extract the life theme from the month branch's hidden stems (藏干).
 * The 主气 (main hidden stem) determines the primary theme.
 */
export function extractMonthTheme(chart: BaZiChart): MonthTheme {
  const dayMaster = chart.day.stem;
  const monthBranch = chart.month.branch;
  const canggan = monthBranch.canggan;

  // Primary: 主气 (always present)
  const mainStem = getTianGan(canggan[0].name);
  const primaryShiShen = calcShiShen(dayMaster, mainStem);
  const theme = THEME_MAP[primaryShiShen];

  // Secondary: 中气 (if present)
  let secondaryShiShen: ShiShen | undefined;
  const middleQi = canggan.find(c => c.weight === 'middle');
  if (middleQi) {
    secondaryShiShen = calcShiShen(dayMaster, getTianGan(middleQi.name));
  }

  return {
    primaryShiShen,
    secondaryShiShen,
    description: theme.description,
    coreQuestion: theme.coreQuestion,
  };
}
