import { useState } from 'react';
import { useLearnSession } from './hooks/useLearnSession.ts';
import type { PracticeMode } from './hooks/useLearnSession.ts';
import ChartDisplay from './components/ChartDisplay.tsx';
import StepDayMaster from './components/StepDayMaster.tsx';
import StepShiShen from './components/StepShiShen.tsx';
import StepStrength from './components/StepStrength.tsx';
import StepMonthTheme from './components/StepMonthTheme.tsx';
import FullMode from './components/FullMode.tsx';
import DrillWuXing from './components/DrillWuXing.tsx';
import DrillTianGan from './components/DrillTianGan.tsx';
import DrillDiZhi from './components/DrillDiZhi.tsx';

type DrillMode = 'drill_wuxing' | 'drill_tiangan' | 'drill_dizhi';

const BASICS = [
  { key: 'drill_wuxing' as DrillMode, title: '五行生克', subtitle: '木火土金水，谁生谁？谁克谁？', icon: '五' },
  { key: 'drill_tiangan' as DrillMode, title: '天干', subtitle: '甲乙丙丁……的五行和阴阳', icon: '干' },
  { key: 'drill_dizhi' as DrillMode, title: '地支 · 藏干', subtitle: '子丑寅卯……的五行、阴阳、藏干', icon: '支' },
];

const PRACTICE = [
  { key: 'daymaster' as PracticeMode, title: '识别日主', subtitle: '找到命盘的坐标原点', icon: '☉' },
  { key: 'shishen' as PracticeMode, title: '排十神', subtitle: '判断天干的十神关系', icon: '神' },
  { key: 'strength' as PracticeMode, title: '判身强弱', subtitle: '得令、得地、得生、得助', icon: '⚖' },
  { key: 'month_theme' as PracticeMode, title: '月柱主题', subtitle: '月支主气藏干——人生核心议题', icon: '☽' },
];

const FULL = [
  { key: 'full' as PracticeMode, title: '完整读盘', subtitle: '从头到尾分析一个命局', icon: '卦' },
];

export default function App() {
  const [drillMode, setDrillMode] = useState<DrillMode | null>(null);
  const session = useLearnSession();
  const { chart, mode, analysis, stats, goHome: sessionGoHome, startPractice, nextChart, recordAnswer } = session;

  function goHome() {
    setDrillMode(null);
    sessionGoHome();
  }

  // Drill modes (standalone, no chart needed)
  if (drillMode === 'drill_wuxing') return <DrillWuXing onHome={goHome} />;
  if (drillMode === 'drill_tiangan') return <DrillTianGan onHome={goHome} />;
  if (drillMode === 'drill_dizhi') return <DrillDiZhi onHome={goHome} />;

  // Full read mode
  if (mode === 'full' && chart && analysis) {
    return (
      <div className="min-h-screen p-4 pb-20 max-w-2xl mx-auto">
        <Header title="完整读盘" onHome={goHome} />
        <ChartDisplay chart={chart} />
        <FullMode chart={chart} analysis={analysis} onReset={nextChart} onHome={goHome} />
      </div>
    );
  }

  // Practice mode (single skill drill with chart)
  if (mode && chart && analysis) {
    const modeInfo = [...PRACTICE].find(m => m.key === mode);
    return (
      <div className="min-h-screen p-4 pb-20 max-w-2xl mx-auto">
        <Header title={modeInfo?.title || ''} onHome={goHome} stats={stats} />
        <ChartDisplay chart={chart} />
        <div key={chart.day.stem.name + chart.day.branch.name}>
          {mode === 'daymaster' && <StepDayMaster analysis={analysis} onNext={nextChart} onAnswer={recordAnswer} />}
          {mode === 'shishen' && <StepShiShen analysis={analysis} onNext={nextChart} onAnswer={recordAnswer} />}
          {mode === 'strength' && <StepStrength analysis={analysis} onNext={nextChart} onAnswer={recordAnswer} />}
          {mode === 'month_theme' && <StepMonthTheme analysis={analysis} onNext={nextChart} onAnswer={recordAnswer} />}
        </div>
      </div>
    );
  }

  // Home screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="animate-fade-in text-center max-w-lg w-full">
        <div className="text-5xl mb-4 opacity-50">命</div>
        <h1 className="text-3xl font-bold mb-2 tracking-wide">BaZiSim</h1>
        <p className="text-[--color-text-secondary] mb-8">八字读盘练习</p>

        <div className="text-left">
          <SectionLabel>基础记忆</SectionLabel>
          <div className="space-y-2 mb-6">
            {BASICS.map((m, i) => (
              <ModeButton key={m.key} m={m} delay={i} onClick={() => setDrillMode(m.key)} />
            ))}
          </div>

          <SectionLabel>读盘技能</SectionLabel>
          <div className="space-y-2 mb-6">
            {PRACTICE.map((m, i) => (
              <ModeButton key={m.key} m={m} delay={i + 3} onClick={() => startPractice(m.key)} />
            ))}
          </div>

          <SectionLabel>综合练习</SectionLabel>
          <div className="space-y-2">
            {FULL.map((m, i) => (
              <ModeButton key={m.key} m={m} delay={i + 7} onClick={() => startPractice(m.key)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs text-[--color-text-muted] uppercase tracking-widest mb-2 mt-2">{children}</div>
  );
}

function ModeButton({ m, delay, onClick }: {
  m: { icon: string; title: string; subtitle: string };
  delay: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full card flex items-center gap-4 hover:border-[--color-accent] transition-all cursor-pointer animate-fade-in stagger-${delay + 1}`}
    >
      <div className="text-xl w-10 h-10 flex items-center justify-center rounded-lg bg-[--color-surface-light] shrink-0">
        {m.icon}
      </div>
      <div className="flex-1 text-left">
        <div className="font-bold">{m.title}</div>
        <div className="text-sm text-[--color-text-muted]">{m.subtitle}</div>
      </div>
      <div className="text-[--color-text-muted] shrink-0">→</div>
    </button>
  );
}

function Header({ title, onHome, stats }: {
  title: string;
  onHome: () => void;
  stats?: { total: number; correct: number };
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <button onClick={onHome} className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors">
          ← 返回
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      {stats && stats.total > 0 && (
        <div className="text-sm text-[--color-text-secondary]">
          <span className="text-[--color-correct]">{stats.correct}</span>
          <span className="text-[--color-text-muted]"> / {stats.total}</span>
        </div>
      )}
    </div>
  );
}
