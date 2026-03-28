import type { Analysis } from '../hooks/useLearnSession.ts';
import { SHISHEN_INFO } from '../engine/shishen.ts';

const POS_LABELS: Record<string, string> = {
  year: '年', month: '月', day: '日', hour: '时',
};

interface Props {
  analysis: Analysis;
  onNext: () => void;
}

export default function StepTouChou({ analysis, onNext }: Props) {
  const results = analysis.touChou;

  return (
    <div className="bg-[--color-surface] rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold mb-4">第五关：透出</h3>
      <p className="mb-4 text-[--color-text-muted]">
        当地支的藏干在天干中也出现了同一种五行，这个特质就「透出」了——从内在变成了外在可见的。
      </p>

      {results.length === 0 ? (
        <div className="bg-[--color-surface-light] rounded p-4 mb-4">
          <p>这个盘没有明显的透出。所有藏干的特质都停留在内在层面。</p>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          {results.map((r, i) => (
            <div key={i} className="bg-[--color-surface-light] rounded p-4">
              <div className="font-bold">
                {POS_LABELS[r.branchPosition]}支藏干 {r.hiddenStemName} → 透出于{POS_LABELS[r.penetratedByStemPosition]}干
              </div>
              <div className="text-sm text-[--color-text-muted] mt-1">
                十神：<span className="text-[--color-accent]">{r.shishen}</span>（{SHISHEN_INFO[r.shishen].description}）
              </div>
              <div className="text-sm text-[--color-text-muted] mt-1">
                这个人的「{SHISHEN_INFO[r.shishen].description}」不是隐藏的——所有人都能看到。
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onNext}
        className="bg-[--color-accent] text-white px-6 py-2 rounded"
      >
        查看总结 →
      </button>
    </div>
  );
}
