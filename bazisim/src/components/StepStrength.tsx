import { useState } from 'react';
import type { Analysis } from '../hooks/useLearnSession.ts';
import type { StrengthLevel } from '../engine/strength.ts';

interface Props {
  analysis: Analysis;
  onNext: () => void;
}

const LEVELS: StrengthLevel[] = ['极弱', '偏弱', '中和', '偏强', '极强'];

export default function StepStrength({ analysis, onNext }: Props) {
  const [selected, setSelected] = useState<StrengthLevel | null>(null);
  const [answered, setAnswered] = useState(false);
  const correct = analysis.strength.level;
  const isCorrect = selected === correct;

  return (
    <div className="bg-[--color-surface] rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold mb-4">第三关：判断身强弱</h3>
      <p className="mb-4 text-[--color-text-muted]">
        综合得令、得地、得生、得助四个因素，你觉得日主 {analysis.dayMaster} 是身强还是身弱？
      </p>

      <div className="flex gap-2 mb-6">
        {LEVELS.map(level => (
          <button
            key={level}
            onClick={() => !answered && setSelected(level)}
            className={`flex-1 py-3 rounded text-center transition-colors ${
              answered && level === correct
                ? 'bg-[--color-correct] text-white'
                : answered && level === selected && !isCorrect
                  ? 'bg-[--color-wrong] text-white'
                  : selected === level
                    ? 'bg-[--color-surface-light] ring-1 ring-[--color-accent]'
                    : 'bg-[--color-surface-light] hover:bg-[--color-surface-light]/80'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {!answered && (
        <button
          onClick={() => setAnswered(true)}
          disabled={!selected}
          className="bg-[--color-accent] text-white px-6 py-2 rounded disabled:opacity-50"
        >
          确认
        </button>
      )}

      {answered && (
        <div className="mt-4">
          <div className={`text-lg font-bold ${isCorrect ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
            {isCorrect ? '✓ 正确！' : `✗ 系统判断为「${correct}」`}
          </div>

          <div className="mt-4 space-y-3">
            <div className="text-sm font-bold">分析依据（总分 {analysis.strength.total}/100）：</div>
            {analysis.strength.factors.map(f => (
              <div key={f.name} className="bg-[--color-surface-light] rounded p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">{f.name}</span>
                  <span className={`text-sm ${f.score >= 0 ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
                    {f.score >= 0 ? '+' : ''}{f.score}
                  </span>
                </div>
                <div className="text-xs text-[--color-text-muted]">{f.explanation}</div>
              </div>
            ))}
          </div>

          <button
            onClick={onNext}
            className="mt-4 bg-[--color-accent] text-white px-6 py-2 rounded"
          >
            下一关 →
          </button>
        </div>
      )}
    </div>
  );
}
