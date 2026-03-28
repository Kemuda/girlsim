import { useState, useCallback } from 'react';
import { TIANGAN } from '../engine/tiangan.ts';
import { WUXING_COLORS } from '../engine/wuxing.ts';
import type { WuXing } from '../engine/wuxing.ts';

type QuestionType = 'wuxing' | 'yinyang';

interface Question {
  type: QuestionType;
  stemName: string;
  stemWuxing: WuXing;
  stemYinYang: string;
  prompt: string;
  options: string[];
  answer: string;
}

const WUXING_OPTIONS: WuXing[] = ['木', '火', '土', '金', '水'];
const YINYANG_OPTIONS = ['阳', '阴'];

function generateQuestion(): Question {
  const stem = TIANGAN[Math.floor(Math.random() * 10)];
  const type: QuestionType = Math.random() < 0.5 ? 'wuxing' : 'yinyang';

  if (type === 'wuxing') {
    return {
      type, stemName: stem.name, stemWuxing: stem.wuxing, stemYinYang: stem.yinyang,
      prompt: `${stem.name} 的五行是什么？`,
      options: WUXING_OPTIONS,
      answer: stem.wuxing,
    };
  }
  return {
    type, stemName: stem.name, stemWuxing: stem.wuxing, stemYinYang: stem.yinyang,
    prompt: `${stem.name} 是阳还是阴？`,
    options: YINYANG_OPTIONS,
    answer: stem.yinyang,
  };
}

interface Props {
  onHome: () => void;
}

export default function DrillTianGan({ onHome }: Props) {
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

  // Reference table
  const pairs = [];
  for (let i = 0; i < 10; i += 2) {
    pairs.push([TIANGAN[i], TIANGAN[i + 1]]);
  }

  return (
    <div className="min-h-screen p-4 pb-20 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button onClick={onHome} className="text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors">← 返回</button>
          <h1 className="text-lg font-bold">天干</h1>
        </div>
        {stats.total > 0 && (
          <div className="text-sm">
            <span className="text-[--color-correct]">{stats.correct}</span>
            <span className="text-[--color-text-muted]"> / {stats.total}</span>
          </div>
        )}
      </div>

      {/* Reference */}
      <div className="card mb-6">
        <div className="grid grid-cols-5 gap-2 text-center text-sm">
          {pairs.map(([yang, yin]) => (
            <div key={yang.name}>
              <div className="text-xs text-[--color-text-muted] mb-1">{yang.wuxing}</div>
              <div style={{ color: WUXING_COLORS[yang.wuxing as WuXing] }}>
                <span className="font-bold">{yang.name}</span>
                <span className="text-[--color-text-muted]">阳</span>
                {' '}
                <span className="font-bold">{yin.name}</span>
                <span className="text-[--color-text-muted]">阴</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-4 animate-fade-in" key={q.prompt + q.stemName}>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold mb-3" style={{ color: WUXING_COLORS[q.stemWuxing] }}>
            {q.stemName}
          </div>
          <div className="text-lg">{q.prompt}</div>
        </div>

        <div className="flex gap-3 justify-center mb-5">
          {q.options.map(opt => (
            <button
              key={opt}
              disabled={answered}
              onClick={() => setSelected(opt)}
              className={`choice-btn px-6 py-3 text-lg ${
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
            <div className={`font-bold mb-3 ${isCorrect ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
              {isCorrect ? '正确' : `${q.stemName} 是 ${q.stemWuxing}${q.stemYinYang}`}
            </div>
            <button onClick={next} className="btn-primary">下一题 →</button>
          </div>
        )}
      </div>
    </div>
  );
}
