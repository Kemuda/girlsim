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
    <div className="card mb-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded bg-[--color-accent]/20 text-[--color-accent]">第五关</span>
        <h3 className="text-lg font-bold">透出</h3>
      </div>

      <p className="text-[--color-text-secondary] mb-5 text-sm leading-relaxed">
        当地支的藏干在天干中也出现了同一种五行，这个特质就<strong>透出</strong>了——
        从内在变成了外在可见的。透出的十神是这个人最鲜明的标签。
      </p>

      {results.length === 0 ? (
        <div className="bg-[--color-surface-light] rounded-lg p-5 mb-5 text-center">
          <div className="text-2xl mb-2 opacity-40">—</div>
          <p className="text-[--color-text-secondary] text-sm">
            这个盘没有明显的透出。<br />所有藏干的特质都停留在内在层面，外人不容易看到。
          </p>
        </div>
      ) : (
        <div className="space-y-3 mb-5">
          {results.map((r, i) => (
            <div key={i} className="bg-[--color-surface-light] rounded-lg p-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-1.5 py-0.5 rounded bg-[--color-accent]/20 text-[--color-accent]">透出</span>
                <span className="font-bold">{POS_LABELS[r.branchPosition]}支藏干 {r.hiddenStemName}</span>
                <span className="text-[--color-text-muted]">→</span>
                <span className="font-bold">{POS_LABELS[r.penetratedByStemPosition]}干</span>
              </div>
              <div className="text-sm">
                <span className="text-[--color-text-muted]">十神：</span>
                <span className="text-[--color-accent] font-bold">{r.shishen}</span>
                <span className="text-[--color-text-muted]"> — {SHISHEN_INFO[r.shishen].description}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={onNext} className="btn-primary">查看总结 →</button>
    </div>
  );
}
