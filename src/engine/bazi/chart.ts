// BaZi Chart type and generation

import type { TianGan } from './tiangan.ts';
import type { DiZhi } from './dizhi.ts';
import { TIANGAN } from './tiangan.ts';
import { DIZHI } from './dizhi.ts';

export interface Pillar {
  stem: TianGan;
  branch: DiZhi;
}

export interface BaZiChart {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}

/**
 * In the 六十甲子 cycle, stem and branch must share parity:
 * stem index % 2 === branch index % 2
 */
function randomPillar(): Pillar {
  const stemIdx = Math.floor(Math.random() * 10);
  // Pick a branch with same parity
  const parity = stemIdx % 2;
  const validBranches = DIZHI.filter((_, i) => i % 2 === parity);
  const branch = validBranches[Math.floor(Math.random() * validBranches.length)];
  return { stem: TIANGAN[stemIdx], branch };
}

/**
 * 五虎遁 — Derive month stem from year stem.
 * Year stem determines the starting month stem for month 1 (寅月).
 * 甲/己年 → 丙寅起, 乙/庚年 → 戊寅起, 丙/辛年 → 庚寅起, 丁/壬年 → 壬寅起, 戊/癸年 → 甲寅起
 */
function monthStemStart(yearStemIdx: number): number {
  const group = yearStemIdx % 5;
  return [2, 4, 6, 8, 0][group]; // 丙戊庚壬甲
}

/**
 * 五鼠遁 — Derive hour stem from day stem.
 * Day stem determines the starting hour stem for hour 1 (子时).
 * 甲/己日 → 甲子起, 乙/庚日 → 丙子起, 丙/辛日 → 戊子起, 丁/壬日 → 庚子起, 戊/癸日 → 壬子起
 */
function hourStemStart(dayStemIdx: number): number {
  const group = dayStemIdx % 5;
  return [0, 2, 4, 6, 8][group]; // 甲丙戊庚壬
}

export function generateRandomChart(): BaZiChart {
  // Year pillar: random valid pair
  const year = randomPillar();

  // Month pillar: branch is one of 寅(2)..丑(1), stem derived from year
  const monthBranchIdx = 2 + Math.floor(Math.random() * 12); // 2-13, mod 12
  const monthBranch = DIZHI[monthBranchIdx % 12];
  const monthStemIdx = (monthStemStart(year.stem.index) + (monthBranchIdx - 2)) % 10;
  const month: Pillar = { stem: TIANGAN[monthStemIdx], branch: monthBranch };

  // Day pillar: random valid pair
  const day = randomPillar();

  // Hour pillar: branch is random, stem derived from day
  const hourBranchIdx = Math.floor(Math.random() * 12);
  const hourBranch = DIZHI[hourBranchIdx];
  const hourStemIdx = (hourStemStart(day.stem.index) + hourBranchIdx) % 10;
  const hour: Pillar = { stem: TIANGAN[hourStemIdx], branch: hourBranch };

  return { year, month, day, hour };
}

export function chartToString(chart: BaZiChart): string {
  const p = (pillar: Pillar) => `${pillar.stem.name}${pillar.branch.name}`;
  return `${p(chart.year)} ${p(chart.month)} ${p(chart.day)} ${p(chart.hour)}`;
}

export const PILLAR_NAMES = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' } as const;
export type PillarPosition = keyof typeof PILLAR_NAMES;
