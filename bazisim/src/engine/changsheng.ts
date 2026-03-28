// 十二长生 — Twelve Stages of Life

import type { TianGan } from './tiangan.ts';
import type { DiZhi } from './dizhi.ts';
import { DIZHI } from './dizhi.ts';

export type LifeStage =
  | '长生' | '沐浴' | '冠带' | '临官' | '帝旺'
  | '衰' | '病' | '死' | '墓' | '绝' | '胎' | '养';

const STAGES: LifeStage[] = [
  '长生', '沐浴', '冠带', '临官', '帝旺',
  '衰', '病', '死', '墓', '绝', '胎', '养',
];

// Starting 地支 index for 长生 of each 天干, and direction (1=forward, -1=reverse)
// 阳干顺行, 阴干逆行
const START_MAP: Record<string, [number, 1 | -1]> = {
  '甲': [11, 1],  // 亥
  '乙': [7, -1],  // 午 (逆行 from 午)
  '丙': [2, 1],   // 寅
  '丁': [9, -1],  // 酉
  '戊': [2, 1],   // 寅
  '己': [9, -1],  // 酉
  '庚': [5, 1],   // 巳
  '辛': [0, -1],  // 子
  '壬': [8, 1],   // 申
  '癸': [3, -1],  // 卯
};

// Strength score for each stage
export const STAGE_STRENGTH: Record<LifeStage, number> = {
  '长生': 60, '沐浴': 50, '冠带': 70, '临官': 90, '帝旺': 100,
  '衰': 30, '病': 20, '死': 10, '墓': 5, '绝': 2, '胎': 3, '养': 40,
};

export function getLifeStage(stem: TianGan, branch: DiZhi): LifeStage {
  const config = START_MAP[stem.name];
  if (!config) throw new Error(`Unknown stem: ${stem.name}`);
  const [startIdx, direction] = config;

  // How many steps from the start branch to the target branch
  let steps: number;
  if (direction === 1) {
    steps = (branch.index - startIdx + 12) % 12;
  } else {
    steps = (startIdx - branch.index + 12) % 12;
  }

  return STAGES[steps];
}

export function getLifeStageStrength(stem: TianGan, branch: DiZhi): number {
  return STAGE_STRENGTH[getLifeStage(stem, branch)];
}

export { STAGES };

// Helper: get all 12 stages for a stem in order
export function getAllStages(stem: TianGan): { branch: DiZhi; stage: LifeStage }[] {
  const config = START_MAP[stem.name];
  if (!config) throw new Error(`Unknown stem: ${stem.name}`);
  const [startIdx, direction] = config;

  return STAGES.map((stage, i) => {
    const branchIdx = ((startIdx + i * direction) % 12 + 12) % 12;
    return { branch: DIZHI[branchIdx], stage };
  });
}
