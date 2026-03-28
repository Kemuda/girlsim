import { useLearnSession } from './hooks/useLearnSession.ts';
import ChartDisplay from './components/ChartDisplay.tsx';
import StepDayMaster from './components/StepDayMaster.tsx';
import StepShiShen from './components/StepShiShen.tsx';
import StepStrength from './components/StepStrength.tsx';
import StepMonthTheme from './components/StepMonthTheme.tsx';
import StepTouChou from './components/StepTouChou.tsx';
import Summary from './components/Summary.tsx';

const STEP_LABELS = ['日主', '十神', '身强弱', '月柱主题', '透出', '总结'];

export default function App() {
  const { chart, step, analysis, startNewChart, nextStep, reset } = useLearnSession();

  if (step === 'idle' || !chart || !analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-2">BaZiSim</h1>
        <p className="text-[--color-text-muted] mb-1">八字学习模式</p>
        <p className="text-sm text-[--color-text-muted] mb-8 text-center max-w-md">
          系统生成一个虚拟命局，引导你一步步分析：识别日主 → 排十神 → 判身强弱 → 读月柱主题 → 看透出。
        </p>
        <button
          onClick={startNewChart}
          className="bg-[--color-accent] text-white px-8 py-3 rounded-lg text-lg hover:opacity-90 transition-opacity"
        >
          生成命局
        </button>
      </div>
    );
  }

  const stepIdx = ['daymaster', 'shishen', 'strength', 'month_theme', 'touchou', 'summary'].indexOf(step);

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">BaZiSim</h1>
        <button onClick={reset} className="text-sm text-[--color-text-muted] hover:text-white">
          重新开始
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-4">
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            className={`flex-1 text-center text-xs py-1 rounded ${
              i === stepIdx
                ? 'bg-[--color-accent] text-white'
                : i < stepIdx
                  ? 'bg-[--color-correct]/30 text-[--color-correct]'
                  : 'bg-[--color-surface-light] text-[--color-text-muted]'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <ChartDisplay chart={chart} />

      {step === 'daymaster' && <StepDayMaster analysis={analysis} onNext={nextStep} />}
      {step === 'shishen' && <StepShiShen analysis={analysis} onNext={nextStep} />}
      {step === 'strength' && <StepStrength analysis={analysis} onNext={nextStep} />}
      {step === 'month_theme' && <StepMonthTheme analysis={analysis} onNext={nextStep} />}
      {step === 'touchou' && <StepTouChou analysis={analysis} onNext={nextStep} />}
      {step === 'summary' && <Summary chart={chart} analysis={analysis} onReset={reset} />}
    </div>
  );
}
