// Qi (气) system — energy pool derived from 身强/身弱 + current 大运能量.
// Each stage, the player gets a fresh qi budget. Certain choices cost qi.
// If qi is insufficient, the choice is disabled — unless the player's
// dominant shishen tag matches the choice's `qiBypassTag` (a kind of
// "signature move" override).
//
// Budget formula (intentionally coarse, aesthetic > simulation):
//   base = clamp(身强度 / 2, 10, 40)   // 强者气足
//   modifier from dayun:
//     support  → +12  (被滋养: 正印/偏印)
//     resource → +6   (比肩/劫财)
//     drain    → -4   (食神/伤官 — 付出)
//     pressure → -8   (七杀/正官 — 压力)
//     neutral  → 0    (正财/偏财 — 控制/花费)

import type { DaYun, DaYunEnergy } from '../engine/bazi/types';
import type { StrengthResult } from '../engine/bazi/strength';
import type { ShiShen } from '../engine/bazi/shishen';

const ENERGY_MOD: Record<DaYunEnergy, number> = {
  support: 12,
  resource: 6,
  drain: -4,
  pressure: -8,
  neutral: 0,
};

export function calcQiForStage(strength: StrengthResult, dayun: DaYun): number {
  const strengthScore = strength.total ?? 50;
  const base = Math.max(10, Math.min(40, Math.round(strengthScore / 2)));
  const mod = ENERGY_MOD[dayun.energyColor] ?? 0;
  return Math.max(0, base + mod);
}

/** True if the choice is affordable given current qi + player's dominant tag */
export function canAffordChoice(
  qi: number,
  qiCost: number | undefined,
  qiBypassTag: ShiShen | undefined,
  dominantTag: ShiShen | null,
): boolean {
  if (!qiCost || qiCost <= 0) return true;
  if (qi >= qiCost) return true;
  if (qiBypassTag && dominantTag === qiBypassTag) return true;
  return false;
}
