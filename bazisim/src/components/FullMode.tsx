import { useState } from 'react';
import type { BaZiChart } from '../engine/chart.ts';
import type { Analysis } from '../hooks/useLearnSession.ts';
import StepDayMaster from './StepDayMaster.tsx';
import StepShiShen from './StepShiShen.tsx';
import StepStrength from './StepStrength.tsx';
import StepMonthTheme from './StepMonthTheme.tsx';
import StepTouChou from './StepTouChou.tsx';
import Summary from './Summary.tsx';

type FullStep = 'daymaster' | 'shishen' | 'strength' | 'month_theme' | 'touchou' | 'summary';

const STEPS: { key: FullStep; label: string }[] = [
  { key: 'daymaster', label: '日主' },
  { key: 'shishen', label: '十神' },
  { key: 'strength', label: '强弱' },
  { key: 'month_theme', label: '月柱' },
  { key: 'touchou', label: '透出' },
  { key: 'summary', label: '总结' },
];

interface Props {
  chart: BaZiChart;
  analysis: Analysis;
  onReset: () => void;
  onHome: () => void;
}

export default function FullMode({ chart, analysis, onReset, onHome }: Props) {
  const [step, setStep] = useState<FullStep>('daymaster');

  const stepIdx = STEPS.findIndex(s => s.key === step);

  function nextStep() {
    const idx = STEPS.findIndex(s => s.key === step);
    if (idx < STEPS.length - 1) {
      setStep(STEPS[idx + 1].key);
    }
  }

  function handleReset() {
    setStep('daymaster');
    onReset();
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-6">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex-1 flex flex-col items-center gap-1">
            <div className={`w-full h-1 rounded-full transition-all duration-500 ${
              i === stepIdx ? 'bg-[--color-accent]' : i < stepIdx ? 'bg-[--color-correct]' : 'bg-[--color-surface-light]'
            }`} />
            <span className={`text-xs transition-colors ${
              i === stepIdx ? 'text-[--color-accent]' : 'text-[--color-text-muted]'
            }`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div key={step} className="animate-fade-in">
        {step === 'daymaster' && <StepDayMaster analysis={analysis} onNext={nextStep} />}
        {step === 'shishen' && <StepShiShen analysis={analysis} onNext={nextStep} />}
        {step === 'strength' && <StepStrength analysis={analysis} onNext={nextStep} />}
        {step === 'month_theme' && <StepMonthTheme analysis={analysis} onNext={nextStep} />}
        {step === 'touchou' && <StepTouChou analysis={analysis} onNext={nextStep} />}
        {step === 'summary' && <Summary chart={chart} analysis={analysis} onReset={handleReset} onHome={onHome} />}
      </div>
    </div>
  );
}
