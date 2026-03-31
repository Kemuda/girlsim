// 大运 — Luck Cycles Generation

import type { BaZiChart } from './chart.ts';
import type { DaYun, DaYunEnergy, LifeStageName } from './types.ts';
import { TIANGAN, getTianGan } from './tiangan.ts';
import { DIZHI } from './dizhi.ts';
import { calcShiShen } from './shishen.ts';
import type { WuXingRelation } from './wuxing.ts';
import { wuxingRelation } from './wuxing.ts';

const LIFE_STAGES: { name: LifeStageName; ageRange: string }[] = [
  { name: 'Girlhood', ageRange: '0–12' },
  { name: 'The Threshold', ageRange: '12–18' },
  { name: 'First World', ageRange: '18–28' },
  { name: 'The Contraction', ageRange: '28–38' },
  { name: 'Midgame Reckoning', ageRange: '38–50' },
  { name: 'Second Wind', ageRange: '50–65' },
  { name: 'Legacy', ageRange: '65+' },
];

const ENERGY_RANK: Record<DaYunEnergy, number> = {
  pressure: 0,  // strongest signal
  support:  1,
  drain:    2,
  resource: 3,
  neutral:  4,  // weakest signal
};

function energyFromRelation(rel: WuXingRelation): DaYunEnergy {
  switch (rel) {
    case 'same':        return 'resource';   // 同我
    case 'generatedBy': return 'support';    // 生我
    case 'generate':    return 'drain';      // 我生 (泄)
    case 'overcomeBy':  return 'pressure';   // 克我
    case 'overcome':    return 'neutral';    // 我克 (耗)
  }
}

/**
 * Combine stem and branch energies into a composite.
 * Rule: the stronger signal wins (pressure > support > drain > resource > neutral).
 * If both are equally ranked, use the stem (天干主外).
 */
function compositeEnergy(stemEnergy: DaYunEnergy, branchEnergy: DaYunEnergy): DaYunEnergy {
  return ENERGY_RANK[stemEnergy] <= ENERGY_RANK[branchEnergy] ? stemEnergy : branchEnergy;
}

/**
 * Generate 7 大运 (luck cycles) from the month pillar.
 *
 * Direction rule for female:
 *   - Yang year stem (阳) → reverse (逆行)
 *   - Yin year stem (阴) → forward (顺行)
 *
 * Each 大运 steps one pillar from the month pillar.
 * Stem advances ±1 mod 10, branch advances ±1 mod 12.
 */
export function generateLuckCycles(chart: BaZiChart): DaYun[] {
  const dayMaster = chart.day.stem;
  const direction = chart.year.stem.yinyang === '阳' ? -1 : 1; // female rule

  const monthStemIdx = chart.month.stem.index;
  const monthBranchIdx = chart.month.branch.index;

  const cycles: DaYun[] = [];

  for (let i = 0; i < 7; i++) {
    const step = i + 1; // 大运 starts from the pillar AFTER the month pillar
    const stemIdx = ((monthStemIdx + step * direction) % 10 + 10) % 10;
    const branchIdx = ((monthBranchIdx + step * direction) % 12 + 12) % 12;

    const stem = TIANGAN[stemIdx];
    const branch = DIZHI[branchIdx];
    const mainCangGan = getTianGan(branch.canggan[0].name);

    const stage = LIFE_STAGES[i];

    const stemEnergy = energyFromRelation(wuxingRelation(dayMaster.wuxing, stem.wuxing));
    const branchEnergy = energyFromRelation(wuxingRelation(dayMaster.wuxing, mainCangGan.wuxing));

    cycles.push({
      index: i,
      stage: stage.name,
      ageRange: stage.ageRange,
      stem,
      branch,
      shishen: calcShiShen(dayMaster, stem),
      branchShiShen: calcShiShen(dayMaster, mainCangGan),
      stemEnergy,
      branchEnergy,
      energyColor: compositeEnergy(stemEnergy, branchEnergy),
    });
  }

  return cycles;
}
