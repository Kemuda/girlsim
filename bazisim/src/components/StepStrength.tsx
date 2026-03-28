import { useState } from 'react';
import type { Analysis } from '../hooks/useLearnSession.ts';
import type { StrengthLevel } from '../engine/strength.ts';

interface Props {
  analysis: Analysis;
  onNext: () => void;
}

const LEVELS: { level: StrengthLevel; label: string }[] = [
  { level: '极弱', label: '极弱' },
  { level: '偏弱', label: '偏弱' },
  { level: '中和', label: '中和' },
  { level: '偏强', label: '偏强' },
  { level: '极强', label: '极强' },
];

export default function StepStrength({ analysis, onNext }: Props) {
  const [selected, setSelected] = useState<StrengthLevel | null>(null);
  const [answered, setAnswered] = useState(false);
  const correct = analysis.strength.level;
  const isCorrect = selected === correct;

  return (
    <div className="card mb-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded bg-[--color-accent]/20 text-[--color-accent]">第三关</span>
        <h3 className="text-lg font-bold">身强身弱</h3>
      </div>

      <p className="text-[--color-text-secondary] mb-5 leading-relaxed text-sm">
        综合四个因素判断日主的强弱：<br />
        <strong>得令</strong>（月令是否支持）· <strong>得地</strong>（日支是否有根）· <strong>得生</strong>（有没有生我的）· <strong>得助</strong>（有没有同类）
      </p>

      <div className="flex gap-2 mb-5">
        {LEVELS.map(({ level, label }) => (
          <button
            key={level}
            disabled={answered}
            onClick={() => setSelected(level)}
            className={`choice-btn flex-1 py-3 ${
              answered && level === correct ? 'correct' :
              answered && level === selected && !isCorrect ? 'wrong' :
              !answered && selected === level ? 'selected' : ''
            }`}
          >
            <div className="font-bold">{label}</div>
          </button>
        ))}
      </div>

      {!answered && (
        <button onClick={() => setAnswered(true)} disabled={!selected} className="btn-primary">
          确认
        </button>
      )}

      {answered && (
        <div className="animate-slide-up">
          <div className={`font-bold mb-3 ${isCorrect ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
            {isCorrect ? '正确' : `系统判断：${correct}`}
          </div>

          {/* Strength bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-[--color-text-muted] mb-1">
              <span>极弱</span><span>极强</span>
            </div>
            <div className="h-3 bg-[--color-surface-light] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${analysis.strength.total}%`,
                  background: `linear-gradient(90deg, var(--color-wrong), var(--color-gold), var(--color-correct))`,
                }}
              />
            </div>
            <div className="text-center text-sm mt-1 text-[--color-text-secondary]">
              {analysis.strength.total} / 100
            </div>
          </div>

          <div className="space-y-2 mb-5">
            {analysis.strength.factors.map(f => (
              <div key={f.name} className="bg-[--color-surface-light] rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">{f.name}</span>
                  <span className={`text-sm font-mono ${f.score >= 0 ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
                    {f.score >= 0 ? '+' : ''}{Math.round(f.score)}
                  </span>
                </div>
                <div className="text-xs text-[--color-text-muted] leading-relaxed">{f.explanation}</div>
              </div>
            ))}
          </div>

          <button onClick={onNext} className="btn-primary">下一关 →</button>
        </div>
      )}
    </div>
  );
}
