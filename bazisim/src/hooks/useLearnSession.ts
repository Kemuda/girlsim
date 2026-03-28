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

export type PracticeMode = 'daymaster' | 'shishen' | 'strength' | 'month_theme' | 'full';

export interface ShiShenEntry {
  position: string;
  stemName: string;
  shishen: ShiShen;
}

export interface Analysis {
  dayMaster: string;
  dayMasterWuxing: string;
  dayMasterYinYang: string;
  shiShenMap: ShiShenEntry[];
  strength: StrengthResult;
  monthTheme: { stemName: string; shishen: ShiShen };
  touChou: TouChouResult[];
}

export interface SessionStats {
  total: number;
  correct: number;
}

export function useLearnSession() {
  const [chart, setChart] = useState<BaZiChart | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const [stats, setStats] = useState<SessionStats>({ total: 0, correct: 0 });
  const [showResult, setShowResult] = useState(false);

  const analysis = useMemo<Analysis | null>(() => {
    if (!chart) return null;

    const dm = chart.day.stem;

    const entries: ShiShenEntry[] = [];
    const pillars = [
      { pos: '年干', stem: chart.year.stem },
      { pos: '月干', stem: chart.month.stem },
      { pos: '时干', stem: chart.hour.stem },
    ];
    for (const { pos, stem } of pillars) {
      entries.push({ position: pos, stemName: stem.name, shishen: calcShiShen(dm, stem) });
    }

    const strength = judgeStrength(chart);

    const mainCangGan = chart.month.branch.canggan[0];
    const monthStem = getTianGan(mainCangGan.name);
    const monthTheme = {
      stemName: mainCangGan.name,
      shishen: calcShiShen(dm, monthStem),
    };

    const touChou = detectTouChou(chart);

    return {
      dayMaster: dm.name,
      dayMasterWuxing: dm.wuxing,
      dayMasterYinYang: dm.yinyang,
      shiShenMap: entries,
      strength,
      monthTheme,
      touChou,
    };
  }, [chart]);

  const startPractice = useCallback((practiceMode: PracticeMode) => {
    setMode(practiceMode);
    setChart(generateRandomChart());
    setStats({ total: 0, correct: 0 });
    setShowResult(false);
  }, []);

  const nextChart = useCallback(() => {
    setChart(generateRandomChart());
    setShowResult(false);
  }, []);

  const recordAnswer = useCallback((correct: boolean) => {
    setStats(s => ({ total: s.total + 1, correct: s.correct + (correct ? 1 : 0) }));
    setShowResult(true);
  }, []);

  const goHome = useCallback(() => {
    setChart(null);
    setMode(null);
    setStats({ total: 0, correct: 0 });
    setShowResult(false);
  }, []);

  return {
    chart, mode, analysis, stats, showResult,
    startPractice, nextChart, recordAnswer, goHome,
  };
}
