import { useState, useCallback } from 'react';
import type { WuXing } from '../engine/wuxing.ts';
import { wuxingRelation, WUXING_COLORS } from '../engine/wuxing.ts';

const ALL_WX: WuXing[] = ['木', '火', '土', '金', '水'];

type QuestionType = 'generate' | 'overcome';

interface Question {
  type: QuestionType;
  from: WuXing;
  answer: WuXing;
  prompt: string;
}

function generateQuestion(): Question {
  const type: QuestionType = Math.random() < 0.5 ? 'generate' : 'overcome';
  const from = ALL_WX[Math.floor(Math.random() * 5)];
  const answer = ALL_WX.find(wx => wuxingRelation(from, wx) === type)!;
  const prompt = type === 'generate' ? `${from} 生什么？` : `${from} 克什么？`;
  return { type, from, answer, prompt };
}

interface Props {
  onHome: () => void;
}

export default function DrillWuXing({ onHome }: Props) {
  const [q, setQ] = useState(generateQuestion);
  const [selected, setSelected] = useState<WuXing | null>(null);
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
          <h1 className="text-lg font-bold">五行生克</h1>
        </div>
        {stats.total > 0 && (
          <div className="text-sm text-[--color-text-secondary]">
            <span className="text-[--color-correct]">{stats.correct}</span>
            <span className="text-[--color-text-muted]"> / {stats.total}</span>
          </div>
        )}
      </div>

      {/* 五行相生相克参考图 */}
      <div className="card mb-6 text-center text-sm">
        <div className="text-[--color-text-muted] mb-2">相生：木→火→土→金→水→木</div>
        <div className="text-[--color-text-muted]">相克：木→土→水→火→金→木</div>
      </div>

      <div className="card mb-4 animate-fade-in" key={q.prompt}>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-3" style={{ color: WUXING_COLORS[q.from] }}>
            {q.from}
          </div>
          <div className="text-lg">{q.prompt}</div>
        </div>

        <div className="flex gap-3 justify-center mb-5">
          {ALL_WX.map(wx => (
            <button
              key={wx}
              disabled={answered}
              onClick={() => setSelected(wx)}
              className={`choice-btn w-16 h-16 flex flex-col items-center justify-center ${
                answered && wx === q.answer ? 'correct' :
                answered && wx === selected && !isCorrect ? 'wrong' :
                !answered && selected === wx ? 'selected' : ''
              }`}
            >
              <div className="text-xl font-bold" style={{ color: WUXING_COLORS[wx] }}>{wx}</div>
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
              {isCorrect ? '正确' : `${q.from} ${q.type === 'generate' ? '生' : '克'} ${q.answer}`}
            </div>
            <button onClick={next} className="btn-primary">下一题 →</button>
          </div>
        )}
      </div>
    </div>
  );
}
