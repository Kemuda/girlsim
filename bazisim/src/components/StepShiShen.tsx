import { useState } from 'react';
import type { Analysis } from '../hooks/useLearnSession.ts';
import { SHISHEN_LIST, SHISHEN_INFO } from '../engine/shishen.ts';

interface Props {
  analysis: Analysis;
  onNext: () => void;
}

export default function StepShiShen({ analysis, onNext }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const allDone = currentIdx >= analysis.shiShenMap.length;

  if (allDone) {
    return (
      <div className="bg-[--color-surface] rounded-lg p-6 mb-4">
        <h3 className="text-lg font-bold mb-4">第二关：排十神 ✓</h3>
        <div className="space-y-2 mb-4">
          {analysis.shiShenMap.map(e => (
            <div key={e.position} className="flex gap-3 text-sm">
              <span className="text-[--color-text-muted] w-12">{e.position}</span>
              <span className="font-bold">{e.stemName}</span>
              <span>→</span>
              <span className="text-[--color-accent]">{e.shishen}</span>
              <span className="text-[--color-text-muted]">({SHISHEN_INFO[e.shishen].description})</span>
            </div>
          ))}
        </div>
        <button onClick={onNext} className="bg-[--color-accent] text-white px-6 py-2 rounded">
          下一关 →
        </button>
      </div>
    );
  }

  const current = analysis.shiShenMap[currentIdx];
  const isCorrect = selected === current.shishen;

  function handleSubmit() {
    setAnswered(true);
  }

  function handleNext() {
    setCurrentIdx(i => i + 1);
    setSelected(null);
    setAnswered(false);
  }

  return (
    <div className="bg-[--color-surface] rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold mb-2">第二关：排十神 ({currentIdx + 1}/{analysis.shiShenMap.length})</h3>
      <p className="mb-4 text-[--color-text-muted]">
        日主是 <strong>{analysis.dayMaster}</strong>（{analysis.dayMasterWuxing}）。
        {current.position}是 <strong>{current.stemName}</strong>，它对日主来说是什么十神？
      </p>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {SHISHEN_LIST.map(ss => (
          <button
            key={ss}
            onClick={() => !answered && setSelected(ss)}
            className={`py-2 px-2 rounded text-sm transition-colors ${
              answered && ss === current.shishen
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
            {isCorrect ? '✓ 正确！' : `✗ 正确答案是「${current.shishen}」`}
          </div>
          <p className="text-[--color-text-muted] mt-2 text-sm">
            {current.stemName} → {SHISHEN_INFO[current.shishen].relation} → {current.shishen}（{SHISHEN_INFO[current.shishen].description}）
          </p>
          <button
            onClick={handleNext}
            className="mt-4 bg-[--color-accent] text-white px-6 py-2 rounded"
          >
            {currentIdx < analysis.shiShenMap.length - 1 ? '下一个 →' : '完成 →'}
          </button>
        </div>
      )}
    </div>
  );
}
