// 偏枯 — Five Element Imbalance Analysis

import type { BaZiChart } from './chart.ts';
import type { WuXing } from './wuxing.ts';
import { wuxingRelation } from './wuxing.ts';
import { getTianGan } from './tiangan.ts';
import type { ImbalanceResult, ImbalanceSeverity, WuXingCount } from './types.ts';

const ALL_ELEMENTS: WuXing[] = ['木', '火', '土', '金', '水'];

const CANGGAN_WEIGHT = { main: 1.0, middle: 0.5, residual: 0.3 } as const;

/** Obsession descriptions — what the chart yearns for when an element is missing/weak */
const OBSESSION_DESC: Record<WuXing, string> = {
  '木': '你渴望生长和自由，但命里缺少向上伸展的力量',
  '火': '你天生想要温暖和联结，但环境一直在灭你的火',
  '土': '你渴望扎根和稳定，但脚下一直没有实地',
  '金': '你渴望方向和决断，但命里缺少那把刀',
  '水': '你渴望深度和智慧，但命里缺少那口井',
};

/**
 * Count five elements across the chart.
 * - 4 heavenly stems: 1.0 each
 * - 4 earthly branches via hidden stems: main=1.0, middle=0.5, residual=0.3
 */
function countElements(chart: BaZiChart): Map<WuXing, number> {
  const counts = new Map<WuXing, number>(ALL_ELEMENTS.map(e => [e, 0]));

  const pillars = [chart.year, chart.month, chart.day, chart.hour];

  for (const pillar of pillars) {
    // Heavenly stem
    counts.set(pillar.stem.wuxing, counts.get(pillar.stem.wuxing)! + 1.0);

    // Earthly branch hidden stems
    for (const cg of pillar.branch.canggan) {
      const stem = getTianGan(cg.name);
      const w = CANGGAN_WEIGHT[cg.weight];
      counts.set(stem.wuxing, counts.get(stem.wuxing)! + w);
    }
  }

  return counts;
}

/**
 * Pick the obsession element: the missing or weakest element
 * that would most benefit the day master.
 *
 * Priority: elements that generate or are same as day master's element.
 * Fallback: the weakest element overall.
 */
function pickObsession(
  candidates: WuXing[],
  dayMasterWuxing: WuXing,
): WuXing {
  if (candidates.length === 0) return dayMasterWuxing;
  if (candidates.length === 1) return candidates[0];

  // Prefer elements that support the day master (生我 or 同我)
  const supportive = candidates.filter(e => {
    const rel = wuxingRelation(e, dayMasterWuxing);
    return rel === 'generate' || rel === 'same';
  });
  if (supportive.length > 0) return supportive[0];

  // Then prefer the day master's own element
  if (candidates.includes(dayMasterWuxing)) return dayMasterWuxing;

  return candidates[0];
}

export function analyzeImbalance(chart: BaZiChart): ImbalanceResult {
  const counts = countElements(chart);
  const dayMasterWuxing = chart.day.stem.wuxing;

  // Build sorted distribution
  const distribution: WuXingCount[] = ALL_ELEMENTS
    .map(element => {
      const count = counts.get(element)!;
      const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
      return {
        element,
        count: Math.round(count * 10) / 10,
        percentage: Math.round((count / total) * 100),
      };
    })
    .sort((a, b) => b.count - a.count);

  const dominant = distribution.filter(d => d.count >= 3.0).map(d => d.element);
  const missing = distribution.filter(d => d.count === 0).map(d => d.element);
  const weak = distribution.filter(d => d.count > 0 && d.count <= 1.0).map(d => d.element);

  // Determine severity
  const maxCount = distribution[0].count;
  const minCount = distribution[distribution.length - 1].count;
  const spread = maxCount - minCount;

  let severity: ImbalanceSeverity;
  if (missing.length >= 2 || spread >= 5) severity = 'severe';
  else if (missing.length === 1 || spread >= 3.5) severity = 'moderate';
  else if (weak.length >= 2 || spread >= 2) severity = 'mild';
  else severity = 'balanced';

  // Pick obsession from missing first, then weak
  const candidates = missing.length > 0 ? missing : weak;
  const obsessionElement = pickObsession(candidates, dayMasterWuxing);
  const obsession = OBSESSION_DESC[obsessionElement];

  return {
    distribution,
    dominant,
    missing,
    weak,
    obsession,
    obsessionElement,
    severity,
  };
}
