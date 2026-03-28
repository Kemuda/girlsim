import { useState, useCallback, useMemo } from 'react';
import type { BaZiChart } from '../engine/chart.ts';
import { generateRandomChart } from '../engine/chart.ts';
import { calcShiShen } from '../engine/shishen.ts';
import type { ShiShen } from '../engine/shishen.ts';
import { judgeStrength } from '../engine/strength.ts';
import type { StrengthResult } from '../engine/strength.ts';
import { detectTouChou } from '../engine/touchou.ts';
import type { TouChouResult } from '../engine/touchou.ts';
import { getTianGan } from '../engine/tiangan.ts';

export type Step = 'idle' | 'daymaster' | 'shishen' | 'strength' | 'month_theme' | 'touchou' | 'summary';

const STEP_ORDER: Step[] = ['daymaster', 'shishen', 'strength', 'month_theme', 'touchou', 'summary'];

export interface ShiShenEntry {
  position: string;
  stemName: string;
  shishen: ShiShen;
}

export interface Analysis {
  dayMaster: string;
  dayMasterWuxing: string;
  shiShenMap: ShiShenEntry[];
  strength: StrengthResult;
  monthTheme: { stemName: string; shishen: ShiShen };
  touChou: TouChouResult[];
}

export function useLearnSession() {
  const [chart, setChart] = useState<BaZiChart | null>(null);
  const [step, setStep] = useState<Step>('idle');

  const analysis = useMemo<Analysis | null>(() => {
    if (!chart) return null;

    const dm = chart.day.stem;

    // 十神 for all stems except day master
    const entries: ShiShenEntry[] = [];
    const pillars = [
      { pos: '年干', stem: chart.year.stem },
      { pos: '月干', stem: chart.month.stem },
      { pos: '时干', stem: chart.hour.stem },
    ];
    for (const { pos, stem } of pillars) {
      entries.push({ position: pos, stemName: stem.name, shishen: calcShiShen(dm, stem) });
    }

    // Strength
    const strength = judgeStrength(chart);

    // Month theme: main 藏干 of month branch
    const mainCangGan = chart.month.branch.canggan[0];
    const monthStem = getTianGan(mainCangGan.name);
    const monthTheme = {
      stemName: mainCangGan.name,
      shishen: calcShiShen(dm, monthStem),
    };

    // 透出
    const touChou = detectTouChou(chart);

    return {
      dayMaster: dm.name,
      dayMasterWuxing: dm.wuxing,
      shiShenMap: entries,
      strength,
      monthTheme,
      touChou,
    };
  }, [chart]);

  const startNewChart = useCallback(() => {
    setChart(generateRandomChart());
    setStep('daymaster');
  }, []);

  const nextStep = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[idx + 1]);
    }
  }, [step]);

  const reset = useCallback(() => {
    setChart(null);
    setStep('idle');
  }, []);

  return { chart, step, analysis, startNewChart, nextStep, reset };
}
