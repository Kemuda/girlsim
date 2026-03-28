import { useState } from 'react';
import type { Analysis } from '../hooks/useLearnSession.ts';
import { TIANGAN } from '../engine/tiangan.ts';

interface Props {
  analysis: Analysis;
  onNext: () => void;
}

export default function StepDayMaster({ analysis, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const correct = analysis.dayMaster;

  function handleSubmit() {
    setAnswered(true);
  }

  const isCorrect = selected === correct;

  return (
    <div className="bg-[--color-surface] rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold mb-4">第一关：识别日主</h3>
      <p className="mb-4 text-[--color-text-muted]">日主是日柱的天干。它决定了你是谁——五行坐标系的原点。</p>
      <p className="mb-4">这个盘的日主是哪个天干？</p>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {TIANGAN.map(tg => (
          <button
            key={tg.name}
            onClick={() => !answered && setSelected(tg.name)}
            className={`py-2 px-3 rounded text-center transition-colors ${
              answered && tg.name === correct
                ? 'bg-[--color-correct] text-white'
                : answered && tg.name === selected && !isCorrect
                  ? 'bg-[--color-wrong] text-white'
                  : selected === tg.name
                    ? 'bg-[--color-surface-light] ring-1 ring-[--color-accent]'
                    : 'bg-[--color-surface-light] hover:bg-[--color-surface-light]/80'
            }`}
          >
            {tg.name}
            <div className="text-xs text-[--color-text-muted]">{tg.wuxing}{tg.yinyang}</div>
          </button>
        ))}
      </div>

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="bg-[--color-accent] text-white px-6 py-2 rounded disabled:opacity-50"
        >
          确认
        </button>
      )}

      {answered && (
        <div className="mt-4">
          <div className={`text-lg font-bold ${isCorrect ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
            {isCorrect ? '✓ 正确！' : `✗ 不对。正确答案是 ${correct}`}
          </div>
          <p className="text-[--color-text-muted] mt-2">
            日主 {correct}，{analysis.dayMasterWuxing}，
            是这个命盘的坐标原点。所有十神都相对于它来计算。
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
