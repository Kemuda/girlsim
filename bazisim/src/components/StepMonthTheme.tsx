import { useState } from 'react';
import type { Analysis } from '../hooks/useLearnSession.ts';
import { SHISHEN_LIST, SHISHEN_INFO } from '../engine/shishen.ts';

interface Props {
  analysis: Analysis;
  onNext: () => void;
}

export default function StepMonthTheme({ analysis, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const correct = analysis.monthTheme.shishen;
  const isCorrect = selected === correct;

  return (
    <div className="bg-[--color-surface] rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold mb-4">第四关：月柱主题</h3>
      <p className="mb-4 text-[--color-text-muted]">
        月柱地支的主气藏干是 <strong>{analysis.monthTheme.stemName}</strong>。
        它对日主 {analysis.dayMaster} 来说是什么十神？
      </p>
      <p className="mb-4 text-[--color-text-muted] text-sm">
        月柱主题 = 这个人一辈子在跟什么较劲。
      </p>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {SHISHEN_LIST.map(ss => (
          <button
            key={ss}
            onClick={() => !answered && setSelected(ss)}
            className={`py-2 px-2 rounded text-sm transition-colors ${
              answered && ss === correct
                ? 'bg-[--color-correct] text-white'
                : answered && ss === selected && !isCorrect
                  ? 'bg-[--color-wrong] text-white'
                  : selected === ss
                    ? 'bg-[--color-surface-light] ring-1 ring-[--color-accent]'
                    : 'bg-[--color-surface-light] hover:bg-[--color-surface-light]/80'
            }`}
          >
            {ss}
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
            {isCorrect ? '✓ 正确！' : `✗ 正确答案是「${correct}」`}
          </div>
          <p className="text-[--color-text-muted] mt-2">
            月柱主题：<strong>{correct}</strong> — {SHISHEN_INFO[correct].description}
          </p>
          <p className="text-[--color-text-muted] mt-1 text-sm">
            这意味着 ta 的人生核心议题围绕「{correct}」展开。这个主题每个人生阶段都会以某种形式出现。
          </p>
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
