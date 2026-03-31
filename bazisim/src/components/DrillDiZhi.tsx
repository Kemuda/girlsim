import { useState, useCallback, useEffect } from 'react';
import { DIZHI } from '../engine/dizhi.ts';
import { getTianGan } from '../engine/tiangan.ts';
import { WUXING_COLORS } from '../engine/wuxing.ts';
import type { WuXing } from '../engine/wuxing.ts';

type QuestionType = 'wuxing' | 'yinyang' | 'canggan';

interface Question {
  type: QuestionType;
  branchName: string;
  branchWuxing: WuXing;
  branchYinYang: string;
  canggan: string[];
  prompt: string;
  options: string[];
  answer: string;
}

const WUXING_OPTIONS: WuXing[] = ['木', '火', '土', '金', '水'];
const YINYANG_OPTIONS = ['阳', '阴'];

function generateQuestion(): Question {
  const branch = DIZHI[Math.floor(Math.random() * 12)];
  const canggan = branch.canggan.map(c => c.name);

  const r = Math.random();
  let type: QuestionType;
  if (r < 0.5) type = 'canggan';
  else if (r < 0.75) type = 'wuxing';
  else type = 'yinyang';

  if (type === 'wuxing') {
    return {
      type, branchName: branch.name, branchWuxing: branch.wuxing, branchYinYang: branch.yinyang, canggan,
      prompt: `${branch.name} 的五行？`,
      options: WUXING_OPTIONS,
      answer: branch.wuxing,
    };
  }

  if (type === 'yinyang') {
    return {
      type, branchName: branch.name, branchWuxing: branch.wuxing, branchYinYang: branch.yinyang, canggan,
      prompt: `${branch.name} 是阳还是阴？`,
      options: YINYANG_OPTIONS,
      answer: branch.yinyang,
    };
  }

  const mainCG = branch.canggan[0].name;
  const allStems = [...new Set(DIZHI.flatMap(d => d.canggan.map(c => c.name)))];
  const wrong = allStems.filter(s => s !== mainCG).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [mainCG, ...wrong].sort(() => Math.random() - 0.5);

  return {
    type, branchName: branch.name, branchWuxing: branch.wuxing, branchYinYang: branch.yinyang, canggan,
    prompt: `${branch.name} 的主气藏干？`,
    options,
    answer: mainCG,
  };
}

interface Props {
  onHome: () => void;
}

export default function DrillDiZhi({ onHome }: Props) {
  const [q, setQ] = useState(generateQuestion);
  const [selected, setSelected] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, correct: 0 });

  const isCorrect = selected === q.answer;

  const next = useCallback(() => {
    setQ(generateQuestion());
    setSelected(null);
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const delay = isCorrect ? 400 : 1200;
    const timer = setTimeout(next, delay);
    return () => clearTimeout(timer);
  }, [selected, isCorrect, next]);

  function handleSelect(opt: string) {
    if (selected !== null) return;
    setSelected(opt);
    setStats(s => ({ total: s.total + 1, correct: s.correct + (opt === q.answer ? 1 : 0) }));
  }

  return (
    <div className="min-h-screen p-4 pb-20 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button onClick={onHome} className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors">← 返回</button>
          <h1 className="text-lg font-bold">地支 · 藏干</h1>
        </div>
        {stats.total > 0 && (
          <div className="text-sm">
            <span className="text-[--color-correct]">{stats.correct}</span>
            <span className="text-[--color-text-muted]"> / {stats.total}</span>
          </div>
        )}
      </div>

      {/* Reference */}
      <div className="card mb-6 overflow-x-auto">
        <div className="grid grid-cols-6 gap-1 text-center text-xs min-w-[500px]">
          {DIZHI.map(d => (
            <div key={d.name} className="bg-[--color-surface-light] rounded p-2">
              <div className="font-bold text-base" style={{ color: WUXING_COLORS[d.wuxing] }}>{d.name}</div>
              <div className="text-[--color-text-muted]">{d.wuxing}{d.yinyang}</div>
              <div className="mt-1 flex flex-col gap-0.5 items-center">
                {d.canggan.map((c, i) => {
                  const cg = getTianGan(c.name);
                  return (
                    <span key={i} style={{ color: WUXING_COLORS[cg.wuxing] }}>
                      {c.name}<span className="text-[--color-text-muted]">({cg.wuxing}{cg.yinyang})</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-4" key={q.prompt + q.branchName}>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold mb-3" style={{ color: WUXING_COLORS[q.branchWuxing] }}>{q.branchName}</div>
          <div className="text-lg">{q.prompt}</div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap mb-2">
          {q.options.map(opt => (
            <button
              key={opt}
              disabled={selected !== null}
              onClick={() => handleSelect(opt)}
              className={`choice-btn px-5 py-3 text-lg transition-all ${
                selected !== null && opt === q.answer ? 'correct' :
                selected === opt && !isCorrect ? 'wrong' : ''
              }`}
              style={q.type === 'wuxing' ? { color: WUXING_COLORS[opt as WuXing] } : undefined}
            >
              <div className="font-bold">{opt}</div>
            </button>
          ))}
        </div>

        {/* Show full info briefly on wrong answer */}
        {selected !== null && !isCorrect && (
          <div className="text-center text-sm mt-4 animate-fade-in">
            <span className="text-[--color-text-muted]">{q.branchName}：{q.branchWuxing}{q.branchYinYang}，藏干 </span>
            {q.canggan.map((name, i) => {
              const cg = getTianGan(name);
              return (
                <span key={i}>
                  {i > 0 && <span className="text-[--color-text-muted]"> · </span>}
                  <span style={{ color: WUXING_COLORS[cg.wuxing] }} className="font-bold">{name}</span>
                  <span className="text-[--color-text-muted]">({cg.wuxing}{cg.yinyang})</span>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
