import { useLearnSession } from './hooks/useLearnSession.ts';
import ChartDisplay from './components/ChartDisplay.tsx';
import StepDayMaster from './components/StepDayMaster.tsx';
import StepShiShen from './components/StepShiShen.tsx';
import StepStrength from './components/StepStrength.tsx';
import StepMonthTheme from './components/StepMonthTheme.tsx';
import StepTouChou from './components/StepTouChou.tsx';
import Summary from './components/Summary.tsx';

const STEPS = [
  { key: 'daymaster', label: '日主', num: '一' },
  { key: 'shishen', label: '十神', num: '二' },
  { key: 'strength', label: '强弱', num: '三' },
  { key: 'month_theme', label: '月柱', num: '四' },
  { key: 'touchou', label: '透出', num: '五' },
  { key: 'summary', label: '总结', num: '六' },
];

export default function App() {
  const { chart, step, analysis, startNewChart, nextStep, reset } = useLearnSession();

  if (step === 'idle' || !chart || !analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="animate-fade-in text-center max-w-lg">
          <div className="text-6xl mb-6 opacity-60">命</div>
          <h1 className="text-3xl font-bold mb-3 tracking-wide">BaZiSim</h1>
          <p className="text-[--color-text-secondary] mb-2 text-lg">八字读盘练习</p>
          <div className="w-12 h-px bg-[--color-accent] mx-auto my-6" />
          <p className="text-sm text-[--color-text-muted] mb-10 leading-relaxed">
            系统生成一个虚拟命局，引导你一步步分析：<br />
            识别日主 → 排十神 → 判身强弱 → 读月柱主题 → 看透出
          </p>
          <button onClick={startNewChart} className="btn-primary text-lg px-10 py-3">
            生成命局
          </button>
        </div>
      </div>
    );
  }

  const stepIdx = STEPS.findIndex(s => s.key === step);

  return (
    <div className="min-h-screen p-4 pb-20 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-bold tracking-wide">BaZiSim</h1>
        <button onClick={reset} className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors">
          重新开始
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full h-1 rounded-full transition-all duration-500 ${
                i === stepIdx
                  ? 'bg-[--color-accent]'
                  : i < stepIdx
                    ? 'bg-[--color-correct]'
                    : 'bg-[--color-surface-light]'
              }`}
            />
            <span className={`text-xs transition-colors ${
              i === stepIdx ? 'text-[--color-accent]' : 'text-[--color-text-muted]'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <ChartDisplay chart={chart} />

      <div className="animate-fade-in" key={step}>
        {step === 'daymaster' && <StepDayMaster analysis={analysis} onNext={nextStep} />}
        {step === 'shishen' && <StepShiShen analysis={analysis} onNext={nextStep} />}
        {step === 'strength' && <StepStrength analysis={analysis} onNext={nextStep} />}
        {step === 'month_theme' && <StepMonthTheme analysis={analysis} onNext={nextStep} />}
        {step === 'touchou' && <StepTouChou analysis={analysis} onNext={nextStep} />}
        {step === 'summary' && <Summary chart={chart} analysis={analysis} onReset={reset} />}
      </div>
    </div>
  );
}
