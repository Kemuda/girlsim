// 身强身弱 — Day Master Strength Judgment

import type { WuXing } from './wuxing.ts';
import { wuxingRelation } from './wuxing.ts';
import { getTianGan } from './tiangan.ts';
import { getLifeStageStrength } from './changsheng.ts';
import type { BaZiChart } from './chart.ts';

export type StrengthLevel = '极弱' | '偏弱' | '中和' | '偏强' | '极强';

export interface StrengthFactor {
  name: string;
  score: number;     // -100 to 100
  maxScore: number;
  explanation: string;
}

export interface StrengthResult {
  total: number;       // 0-100
  level: StrengthLevel;
  factors: StrengthFactor[];
}

function isSupporting(dmWuxing: WuXing, otherWuxing: WuXing): boolean {
  const rel = wuxingRelation(otherWuxing, dmWuxing);
  return rel === 'same' || rel === 'generate';
}

function seasonScore(dmWuxing: WuXing, monthBranchWuxing: WuXing): number {
  const rel = wuxingRelation(monthBranchWuxing, dmWuxing);
  switch (rel) {
    case 'same': return 100;       // 当令
    case 'generate': return 60;    // 相生
    case 'generatedBy': return -20; // 我生月令，泄气
    case 'overcome': return -60;   // 月令克我
    case 'overcomeBy': return -20; // 我克月令，耗气
    default: return 0;
  }
}

// Position weights: month/hour are close, year is far
const POSITION_WEIGHT: Record<string, number> = {
  year: 0.5,
  month: 1.0,
  day: 1.0,
  hour: 0.8,
};

export function judgeStrength(chart: BaZiChart): StrengthResult {
  const dm = chart.day.stem;
  const factors: StrengthFactor[] = [];

  // 1. 得令 (40% weight)
  const monthBranch = chart.month.branch;
  const lingScore = seasonScore(dm.wuxing, monthBranch.wuxing);
  const lingExpl = lingScore > 0
    ? `月令${monthBranch.name}（${monthBranch.wuxing}）${lingScore >= 80 ? '当令' : '得生'}，对${dm.name}${dm.wuxing}有利`
    : `月令${monthBranch.name}（${monthBranch.wuxing}）${lingScore <= -40 ? '克制' : '不利于'}${dm.name}${dm.wuxing}`;
  factors.push({ name: '得令', score: lingScore, maxScore: 100, explanation: lingExpl });

  // 2. 得地 (25% weight) — Day Master's 十二长生 on day branch
  const seatStrength = getLifeStageStrength(dm, chart.day.branch);
  const diScore = (seatStrength - 50) * 2; // normalize: 100→100, 50→0, 0→-100
  factors.push({
    name: '得地',
    score: diScore,
    maxScore: 100,
    explanation: `${dm.name}坐${chart.day.branch.name}，${seatStrength >= 60 ? '有根气' : '失地'}`,
  });

  // 3. 得生 (20% weight) — Elements that generate DM
  let shengScore = 0;
  const shengParts: string[] = [];
  const pillars = [
    { pos: 'year', p: chart.year },
    { pos: 'month', p: chart.month },
    { pos: 'day', p: chart.day },
    { pos: 'hour', p: chart.hour },
  ] as const;

  for (const { pos, p } of pillars) {
    const w = POSITION_WEIGHT[pos];
    // Skip day stem (it IS the day master), but still check day branch's hidden stems
    if (pos !== 'day') {
      const stemRel = wuxingRelation(p.stem.wuxing, dm.wuxing);
      if (stemRel === 'generate') {
        shengScore += 30 * w;
        const posLabel = pos === 'year' ? '年' : pos === 'month' ? '月' : '时';
        shengParts.push(`${posLabel}干${p.stem.name}生${dm.wuxing}`);
      }
    }
    // Check branch hidden stems
    for (const cg of p.branch.canggan) {
      const cgStem = getTianGan(cg.name);
      if (wuxingRelation(cgStem.wuxing, dm.wuxing) === 'generate') {
        const cgW = cg.weight === 'main' ? 1 : cg.weight === 'middle' ? 0.5 : 0.3;
        shengScore += 15 * w * cgW;
      }
    }
  }

  factors.push({
    name: '得生',
    score: Math.min(100, shengScore),
    maxScore: 100,
    explanation: shengParts.length > 0 ? shengParts.join('；') : '命局中缺少生日主的元素',
  });

  // 4. 得助 (15% weight) — Same element as DM
  let zhuScore = 0;
  const zhuParts: string[] = [];
  for (const { pos, p } of pillars) {
    const w = POSITION_WEIGHT[pos];
    // Skip day stem (it IS the day master), but still check day branch's hidden stems
    if (pos !== 'day' && p.stem.wuxing === dm.wuxing) {
      zhuScore += 35 * w;
      const posLabel = pos === 'year' ? '年' : pos === 'month' ? '月' : '时';
      zhuParts.push(`${posLabel}干${p.stem.name}同类`);
    }
    for (const cg of p.branch.canggan) {
      const cgStem = getTianGan(cg.name);
      if (cgStem.wuxing === dm.wuxing) {
        const cgW = cg.weight === 'main' ? 1 : cg.weight === 'middle' ? 0.5 : 0.3;
        zhuScore += 20 * w * cgW;
      }
    }
  }

  factors.push({
    name: '得助',
    score: Math.min(100, zhuScore),
    maxScore: 100,
    explanation: zhuParts.length > 0 ? zhuParts.join('；') : '命局中没有同类帮助',
  });

  // Weighted total
  const weights = [0.40, 0.25, 0.20, 0.15];
  const weightedSum = factors.reduce((sum, f, i) => sum + f.score * weights[i], 0);
  // Normalize to 0-100 scale (input range is roughly -100 to 100)
  const total = Math.round(Math.max(0, Math.min(100, (weightedSum + 100) / 2)));

  let level: StrengthLevel;
  if (total <= 20) level = '极弱';
  else if (total <= 40) level = '偏弱';
  else if (total <= 60) level = '中和';
  else if (total <= 80) level = '偏强';
  else level = '极强';

  return { total, level, factors };
}

// Check if a wuxing is supporting (for external use)
export { isSupporting };
