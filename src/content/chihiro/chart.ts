// 千寻的命盘 — Fixed BaZi chart for Chihiro (Spirited Away)
// Reverse engineered from her character profile in docs/universes.md
//
// Day Master: 癸水 (Yin Water = Rain)
// Chart: 辛酉 乙未 癸巳 乙卯 (all yin pillars, all valid 六十甲子)
// Strength: 偏弱 (score ~29)
// Month Theme: 七杀 (chronic overwhelming pressure)

import { TIANGAN } from '../../engine/bazi/tiangan.ts';
import { DIZHI } from '../../engine/bazi/dizhi.ts';
import type { BaZiChart } from '../../engine/bazi/chart.ts';

// 辛(7) 酉(9) 乙(1) 未(7) 癸(9) 巳(5) 乙(1) 卯(3)
export const CHIHIRO_CHART: BaZiChart = {
  year:  { stem: TIANGAN[7], branch: DIZHI[9] },  // 辛酉
  month: { stem: TIANGAN[1], branch: DIZHI[7] },  // 乙未
  day:   { stem: TIANGAN[9], branch: DIZHI[5] },  // 癸巳
  hour:  { stem: TIANGAN[1], branch: DIZHI[3] },  // 乙卯
};
