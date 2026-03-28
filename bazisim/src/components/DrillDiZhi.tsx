import { useState, useCallback } from 'react';
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

  // Weight: canggan questions 50%, wuxing 25%, yinyang 25%
  const r = Math.random();
  let type: QuestionType;
  if (r < 0.5) type = 'canggan';
  else if (r < 0.75) type = 'wuxing';
  else type = 'yinyang';

  if (type === 'wuxing') {
    return {
      type, branchName: branch.name, branchWuxing: branch.wuxing, branchYinYang: branch.yinyang, canggan,
      prompt: `${branch.name} 的五行是什么？`,
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

  // canggan: ask for main hidden stem
  const mainCG = branch.canggan[0].name;
  // Build options: correct answer + 3 random wrong ones
  const allStems = [...new Set(DIZHI.flatMap(d => d.canggan.map(c => c.name)))];
  const wrong = allStems.filter(s => s !== mainCG).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [mainCG, ...wrong].sort(() => Math.random() - 0.5);

  return {
    type, branchName: branch.name, branchWuxing: branch.wuxing, branchYinYang: branch.yinyang, canggan,
    prompt: `${branch.name} 的主气藏干是什么？`,
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
  const [answered, setAnswered] = useState(false);
  const [stats, setStats] = useState({ total: 0, correct: 0 });

  const isCorrect = selected === q.answer;

  const next = useCallback(() => {
    setQ(generateQuestion());
    setSelected(null);
    setAnswered(false);
  }, []);

  function handleSubmit() {
    setAnswered(true);
    setStats(s => ({ total: s.total + 1, correct: s.correct + (selected === q.answer ? 1 : 0) }));
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

      <div className="card mb-4 animate-fade-in" key={q.prompt + q.branchName}>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold mb-3" style={{ color: WUXING_COLORS[q.branchWuxing] }}>
            {q.branchName}
          </div>
          <div className="text-lg">{q.prompt}</div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap mb-5">
          {q.options.map(opt => (
            <button
              key={opt}
              disabled={answered}
              onClick={() => setSelected(opt)}
              className={`choice-btn px-5 py-3 text-lg ${
                answered && opt === q.answer ? 'correct' :
                answered && opt === selected && !isCorrect ? 'wrong' :
                !answered && selected === opt ? 'selected' : ''
              }`}
              style={q.type === 'wuxing' ? { color: WUXING_COLORS[opt as WuXing] } : undefined}
            >
              <div className="font-bold">{opt}</div>
            </button>
          ))}
        </div>

        {!answered && (
          <div className="text-center">
            <button onClick={handleSubmit} disabled={!selected} className="btn-primary">确认</button>
          </div>
        )}

        {answered && (
          <div className="animate-fade-in text-center">
            <div className={`font-bold mb-2 ${isCorrect ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
              {isCorrect ? '正确' : `正确答案：${q.answer}`}
            </div>
            <div className="text-sm mb-3">
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
            <button onClick={next} className="btn-primary">下一题 →</button>
          </div>
        )}
      </div>
    </div>
  );
}
