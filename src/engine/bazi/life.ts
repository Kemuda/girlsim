// Life Assembly — generates a complete BaZi life profile

import { generateRandomChart, chartToString } from './chart.ts';
import type { BaZiChart } from './chart.ts';
import { judgeStrength } from './strength.ts';
import { extractMonthTheme } from './month-theme.ts';
import { analyzeImbalance } from './imbalance.ts';
import { generateLuckCycles } from './luck-cycles.ts';
import { detectTouChou } from './touchou.ts';
import type { BaZiLife } from './types.ts';

/**
 * Generate a complete life profile.
 *
 * 1. Draw a random chart (抽命)
 * 2. Judge day master strength (身强身弱)
 * 3. Extract month theme (月柱主题)
 * 4. Analyze five element imbalance (偏枯)
 * 5. Generate 7 luck cycles (大运)
 * 6. Detect penetrations (透出)
 *
 * Returns everything the game frontend needs to run a life.
 */
export function generateLife(): BaZiLife {
  const chart = generateRandomChart();
  return generateLifeFromChart(chart);
}

export function generateLifeFromChart(chart: BaZiChart): BaZiLife {
  return {
    chart,
    dayMaster: chart.day.stem,
    strength: judgeStrength(chart),
    monthTheme: extractMonthTheme(chart),
    imbalance: analyzeImbalance(chart),
    luckCycles: generateLuckCycles(chart),
    penetrations: detectTouChou(chart),
    chartString: chartToString(chart),
  };
}
