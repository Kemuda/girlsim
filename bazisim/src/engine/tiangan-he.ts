// 天干五合 — Five Heavenly Stem Combinations

import type { TianGan } from './tiangan.ts';
import type { WuXing } from './wuxing.ts';

export interface TianGanHe {
  stem1: string;
  stem2: string;
  huaWuxing: WuXing; // 合化的五行
}

// 甲己合土, 乙庚合金, 丙辛合水, 丁壬合木, 戊癸合火
const HE_PAIRS: [string, string, WuXing][] = [
  ['甲', '己', '土'],
  ['乙', '庚', '金'],
  ['丙', '辛', '水'],
  ['丁', '壬', '木'],
  ['戊', '癸', '火'],
];

const HE_MAP = new Map<string, { partner: string; huaWuxing: WuXing }>();
for (const [a, b, wx] of HE_PAIRS) {
  HE_MAP.set(a, { partner: b, huaWuxing: wx });
  HE_MAP.set(b, { partner: a, huaWuxing: wx });
}

export interface TianGanHeResult {
  pos1: string;     // e.g. '年干'
  stem1: string;
  pos2: string;
  stem2: string;
  huaWuxing: WuXing;
  adjacent: boolean; // 是否相邻（相邻才能合）
}

/**
 * Detect all 天干五合 in a set of stems at positions.
 * Only adjacent positions can form a合: 年-月, 月-日, 日-时.
 * Also checks non-adjacent pairs but marks them as non-adjacent.
 */
export function detectTianGanHe(
  stems: { pos: string; stem: TianGan }[]
): TianGanHeResult[] {
  const results: TianGanHeResult[] = [];
  const posOrder = ['年干', '月干', '日干', '时干'];

  for (let i = 0; i < stems.length; i++) {
    for (let j = i + 1; j < stems.length; j++) {
      const a = stems[i];
      const b = stems[j];
      const info = HE_MAP.get(a.stem.name);
      if (info && info.partner === b.stem.name) {
        const ai = posOrder.indexOf(a.pos);
        const bi = posOrder.indexOf(b.pos);
        const adjacent = ai >= 0 && bi >= 0 && Math.abs(ai - bi) === 1;
        results.push({
          pos1: a.pos,
          stem1: a.stem.name,
          pos2: b.pos,
          stem2: b.stem.name,
          huaWuxing: info.huaWuxing,
          adjacent,
        });
      }
    }
  }
  return results;
}

export { HE_MAP };
