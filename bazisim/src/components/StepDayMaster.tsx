import { useState } from 'react';
import type { Analysis } from '../hooks/useLearnSession.ts';
import { TIANGAN } from '../engine/tiangan.ts';
import { WUXING_COLORS } from '../engine/wuxing.ts';
import type { WuXing } from '../engine/wuxing.ts';

interface Props {
  analysis: Analysis;
  onNext: () => void;
  onAnswer?: (correct: boolean) => void;
}

export default function StepDayMaster({ analysis, onNext, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const correct = analysis.dayMaster;
  const isCorrect = selected === correct;

  function handleSubmit() {
    setAnswered(true);
    onAnswer?.(selected === correct);
  }

  return (
    <div className="card mb-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded bg-[--color-accent]/20 text-[--color-accent]">日主</span>
        <h3 className="text-lg font-bold">识别日主</h3>
      </div>

      <p className="text-[--color-text-secondary] mb-5 leading-relaxed">
        日主是日柱的<strong className="text-[--color-text]">天干</strong>（上面那个字）。
        它是整个命盘的坐标原点。
      </p>

      {!answered && !showHint && (
        <button onClick={() => setShowHint(true)} className="text-xs text-[--color-text-muted] hover:text-[--color-accent] mb-4 transition-colors">
          需要提示？
        </button>
      )}

      {showHint && !answered && (
        <div className="text-sm bg-[--color-surface-light] rounded-lg p-3 mb-4 border-l-2 border-[--color-gold] animate-fade-in">
          看命盘图。四柱从左到右是年、月、日、时。日柱是第三列，天干在上面。
        </div>
      )}

      <p className="mb-3 text-sm">这个盘的日主是？</p>

      <div className="grid grid-cols-5 gap-2 mb-5">
        {TIANGAN.map((tg, i) => (
          <button
            key={tg.name}
            disabled={answered}
            onClick={() => setSelected(tg.name)}
            className={`choice-btn animate-fade-in stagger-${i + 1} ${
              answered && tg.name === correct ? 'correct' :
              answered && tg.name === selected && !isCorrect ? 'wrong' :
              !answered && selected === tg.name ? 'selected' : ''
            }`}
          >
            <div className="text-lg font-bold" style={{ color: WUXING_COLORS[tg.wuxing as WuXing] }}>
              {tg.name}
            </div>
            <div className="text-xs text-[--color-text-muted]">{tg.wuxing}{tg.yinyang}</div>
          </button>
        ))}
      </div>

      {!answered && (
        <button onClick={handleSubmit} disabled={!selected} className="btn-primary">确认</button>
      )}

      {answered && (
        <div className="animate-slide-up">
          <div className={`font-bold mb-3 ${isCorrect ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
            {isCorrect ? '正确' : `正确答案是 ${correct}`}
          </div>
          <div className="bg-[--color-surface-light] rounded-lg p-4 mb-4 text-sm leading-relaxed">
            日主 <strong style={{ color: WUXING_COLORS[analysis.dayMasterWuxing as WuXing] }}>{correct}</strong>，
            属{analysis.dayMasterWuxing}，{analysis.dayMasterYinYang}。
          </div>
          <button onClick={onNext} className="btn-primary">下一题 →</button>
        </div>
      )}
    </div>
  );
}
