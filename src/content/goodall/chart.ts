// Jane Goodall 的命盘 — Fixed BaZi chart for Jane Goodall
// Born 1934-04-03, London. Died 2025 (age 91).
// Reverse-engineered from her character profile in docs/universes.md
//
// Day Master: 甲木 (Yang Wood = Great Tree)
// Chart: 甲戌 丁卯 甲寅 丙寅 (两甲三寅卯，木气极旺；丁丙透出食伤泄秀)
// Strength: 极强 — a tree with massive root structure
// Month Theme: 伤官 (丁卯月, 木生火 — excess life force flowing into expression)
//
// 年月是真实的历史对应（1934 April 3 前 清明 = 甲戌年丁卯月）；
// 日时按角色气质配置（甲寅日柱 = 建禄身强；丙寅时柱 = 食神透出对外）。
//
// Expected dayun shape:
//   stage 0-1: 木/水 大运 (比劫/印) — 身更强，童年安全被滋养
//   stage 2-3: 火 大运 (食伤) — 表达爆发期，去非洲、遇黑猩猩
//   stage 4-5: 土/金 大运 (财/官) — 被质疑、建制化、丧夫
//   stage 6:   水 大运 (印) — 晚年回归滋养，全球传道

import { TIANGAN } from '../../engine/bazi/tiangan.ts';
import { DIZHI } from '../../engine/bazi/dizhi.ts';
import type { BaZiChart } from '../../engine/bazi/chart.ts';

export const GOODALL_CHART: BaZiChart = {
  year:  { stem: TIANGAN[0], branch: DIZHI[10] },  // 甲戌
  month: { stem: TIANGAN[3], branch: DIZHI[3] },   // 丁卯
  day:   { stem: TIANGAN[0], branch: DIZHI[2] },   // 甲寅
  hour:  { stem: TIANGAN[2], branch: DIZHI[2] },   // 丙寅
};
