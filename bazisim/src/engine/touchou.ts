// 透出 — Penetration detection

import { getTianGan } from './tiangan.ts';
import type { ShiShen } from './shishen.ts';
import { calcShiShen } from './shishen.ts';
import type { BaZiChart } from './chart.ts';

export interface TouChouResult {
  branchPosition: string;  // 'year' | 'month' | 'day' | 'hour'
  hiddenStemName: string;
  penetratedByStemPosition: string;
  shishen: ShiShen;
}

export function detectTouChou(chart: BaZiChart): TouChouResult[] {
  const dayMaster = chart.day.stem;
  const results: TouChouResult[] = [];

  const pillars = [
    { pos: 'year', pillar: chart.year },
    { pos: 'month', pillar: chart.month },
    { pos: 'day', pillar: chart.day },
    { pos: 'hour', pillar: chart.hour },
  ] as const;

  // Collect all heavenly stem wuxings
  const stemPositions = pillars.map(p => ({
    pos: p.pos,
    stem: p.pillar.stem,
  }));

  // Check each branch's hidden stems
  for (const { pos: branchPos, pillar } of pillars) {
    for (const cg of pillar.branch.canggan) {
      const hiddenStem = getTianGan(cg.name);
      // Check if any heavenly stem shares the same wuxing
      for (const { pos: stemPos, stem } of stemPositions) {
        if (stem.wuxing === hiddenStem.wuxing) {
          results.push({
            branchPosition: branchPos,
            hiddenStemName: cg.name,
            penetratedByStemPosition: stemPos,
            shishen: calcShiShen(dayMaster, hiddenStem),
          });
          break; // One penetration per hidden stem is enough
        }
      }
    }
  }

  return results;
}
