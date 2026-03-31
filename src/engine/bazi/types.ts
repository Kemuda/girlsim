// Game-specific types for the BaZi engine

import type { TianGan } from './tiangan.ts';
import type { DiZhi } from './dizhi.ts';
import type { WuXing } from './wuxing.ts';
import type { ShiShen } from './shishen.ts';
import type { BaZiChart } from './chart.ts';
import type { StrengthResult } from './strength.ts';
import type { TouChouResult } from './touchou.ts';

// --- Luck Cycles (大运) ---

export type LifeStageName =
  | 'Girlhood'
  | 'The Threshold'
  | 'First World'
  | 'The Contraction'
  | 'Midgame Reckoning'
  | 'Second Wind'
  | 'Legacy';

/** How a 大运's energy relates to the day master */
export type DaYunEnergy =
  | 'support'   // 生我 (generatedBy) — external nurture
  | 'resource'  // 同我 (same) — allies, same tribe
  | 'drain'     // 我生 (generate) — output, expression, giving
  | 'pressure'  // 克我 (overcomeBy) — pressure, authority, crisis
  | 'neutral';  // 我克 (overcome) — spending energy, control

/** A single 大运 cycle mapped to a life stage */
export interface DaYun {
  index: number;           // 0-6
  stage: LifeStageName;
  ageRange: string;        // e.g. '0–12'
  stem: TianGan;
  branch: DiZhi;
  shishen: ShiShen;        // 十神 of the 大运 stem relative to day master
  branchShiShen: ShiShen;  // 十神 of the branch's main hidden stem
  stemEnergy: DaYunEnergy;   // energy from stem only
  branchEnergy: DaYunEnergy; // energy from branch only
  energyColor: DaYunEnergy;  // composite (stronger signal wins)
}

// --- Month Theme (月柱主题) ---

export interface MonthTheme {
  primaryShiShen: ShiShen;
  secondaryShiShen?: ShiShen;
  description: string;
  coreQuestion: string;
}

// --- Imbalance (偏枯) ---

export interface WuXingCount {
  element: WuXing;
  count: number;       // weighted count across chart
  percentage: number;
}

export type ImbalanceSeverity = 'balanced' | 'mild' | 'moderate' | 'severe';

export interface ImbalanceResult {
  distribution: WuXingCount[];  // sorted by count desc
  dominant: WuXing[];           // overrepresented (>= 3.0)
  missing: WuXing[];            // count === 0
  weak: WuXing[];               // count <= 1.0 (but not 0)
  obsession: string;            // what the chart yearns for
  obsessionElement: WuXing;
  severity: ImbalanceSeverity;
}

// --- Complete Life Profile ---

export interface BaZiLife {
  chart: BaZiChart;
  dayMaster: TianGan;
  strength: StrengthResult;
  monthTheme: MonthTheme;
  imbalance: ImbalanceResult;
  luckCycles: DaYun[];
  penetrations: TouChouResult[];
  chartString: string;
}
