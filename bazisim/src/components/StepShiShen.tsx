import { useState } from 'react';
import type { Analysis } from '../hooks/useLearnSession.ts';
import { SHISHEN_LIST, SHISHEN_INFO } from '../engine/shishen.ts';
import { WUXING_COLORS } from '../engine/wuxing.ts';
import { getTianGan } from '../engine/tiangan.ts';
import { wuxingRelation } from '../engine/wuxing.ts';
import type { WuXing } from '../engine/wuxing.ts';

interface Props {
  analysis: Analysis;
  onNext: () => void;
}

const RELATION_NAMES: Record<string, string> = {
  same: '同我', generate: '我生', overcome: '我克', overcomeBy: '克我', generatedBy: '生我',
};

export default function StepShiShen({ analysis, onNext }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const allDone = currentIdx >= analysis.shiShenMap.length;

  if (allDone) {
    return (
      <div className="card mb-4 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs px-2 py-1 rounded bg-[--color-correct]/20 text-[--color-correct]">完成</span>
          <h3 className="text-lg font-bold">十神排列</h3>
          <span className="text-sm text-[--color-text-muted] ml-auto">{score}/{analysis.shiShenMap.length} 正确</span>
        </div>
        <div className="space-y-2 mb-5">
          {analysis.shiShenMap.map(e => {
            const tg = getTianGan(e.stemName);
            return (
              <div key={e.position} className="flex items-center gap-3 bg-[--color-surface-light] rounded-lg px-4 py-3">
                <span className="text-[--color-text-muted] text-sm w-10">{e.position}</span>
                <span className="font-bold text-lg" style={{ color: WUXING_COLORS[tg.wuxing as WuXing] }}>
                  {e.stemName}
                </span>
                <span className="text-[--color-text-muted]">→</span>
                <span className="text-[--color-accent] font-bold">{e.shishen}</span>
                <span className="text-xs text-[--color-text-muted]">({SHISHEN_INFO[e.shishen].description})</span>
              </div>
            );
          })}
        </div>
        <button onClick={onNext} className="btn-primary">下一关 →</button>
      </div>
    );
  }

  const current = analysis.shiShenMap[currentIdx];
  const targetStem = getTianGan(current.stemName);
  const relation = wuxingRelation(getTianGan(analysis.dayMaster).wuxing, targetStem.wuxing);
  const isCorrect = selected === current.shishen;

  function handleSubmit() {
    setAnswered(true);
    if (selected === current.shishen) setScore(s => s + 1);
  }

  function handleNext() {
    setCurrentIdx(i => i + 1);
    setSelected(null);
    setAnswered(false);
    setShowHint(false);
  }

  return (
    <div className="card mb-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded bg-[--color-accent]/20 text-[--color-accent]">第二关</span>
        <h3 className="text-lg font-bold">排十神</h3>
        <span className="text-sm text-[--color-text-muted] ml-auto">{currentIdx + 1} / {analysis.shiShenMap.length}</span>
      </div>

      <div className="bg-[--color-surface-light] rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center gap-4 text-center">
          <div>
            <div className="text-xs text-[--color-text-muted] mb-1">日主</div>
            <div className="text-2xl font-bold" style={{ color: WUXING_COLORS[analysis.dayMasterWuxing as WuXing] }}>
              {analysis.dayMaster}
            </div>
            <div className="text-xs text-[--color-text-muted]">{analysis.dayMasterWuxing}</div>
          </div>
          <div className="text-[--color-text-muted] text-xl">→</div>
          <div>
            <div className="text-xs text-[--color-text-muted] mb-1">{current.position}</div>
            <div className="text-2xl font-bold" style={{ color: WUXING_COLORS[targetStem.wuxing as WuXing] }}>
              {current.stemName}
            </div>
            <div className="text-xs text-[--color-text-muted]">{targetStem.wuxing}{targetStem.yinyang}</div>
          </div>
          <div className="text-[--color-text-muted] text-xl">= ？</div>
        </div>
      </div>

      {!answered && !showHint && (
        <button
          onClick={() => setShowHint(true)}
          className="text-xs text-[--color-text-muted] hover:text-[--color-accent] mb-3 transition-colors"
        >
          需要提示？
        </button>
      )}

      {showHint && !answered && (
        <div className="text-sm bg-[--color-surface-light] rounded-lg p-3 mb-4 border-l-2 border-[--color-gold] animate-fade-in">
          <p className="mb-1">
            {analysis.dayMasterWuxing} → {targetStem.wuxing} 的关系是：<strong>{RELATION_NAMES[relation]}</strong>
          </p>
          <p>
            阴阳：日主{getTianGan(analysis.dayMaster).yinyang}，目标{targetStem.yinyang}
            → {getTianGan(analysis.dayMaster).yinyang === targetStem.yinyang ? '同阴阳（偏）' : '异阴阳（正）'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2 mb-4">
        {SHISHEN_LIST.map(ss => (
          <button
            key={ss}
            disabled={answered}
            onClick={() => setSelected(ss)}
            className={`choice-btn text-sm ${
              answered && ss === current.shishen ? 'correct' :
              answered && ss === selected && !isCorrect ? 'wrong' :
              !answered && selected === ss ? 'selected' : ''
            }`}
          >
            <div className="font-bold">{ss}</div>
            <div className="text-xs text-[--color-text-muted] hidden sm:block">{SHISHEN_INFO[ss].relation}</div>
          </button>
        ))}
      </div>

      {!answered && (
        <button onClick={handleSubmit} disabled={!selected} className="btn-primary">确认</button>
      )}

      {answered && (
        <div className="animate-fade-in">
          <div className={`font-bold mb-2 ${isCorrect ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
            {isCorrect ? '正确' : `正确答案：${current.shishen}`}
          </div>
          <div className="bg-[--color-surface-light] rounded-lg p-3 mb-4 text-sm leading-relaxed">
            <p>
              {analysis.dayMasterWuxing} → {targetStem.wuxing}：<strong>{RELATION_NAMES[relation]}</strong>，
              {getTianGan(analysis.dayMaster).yinyang === targetStem.yinyang ? '同阴阳' : '异阴阳'}
              → <strong className="text-[--color-accent]">{current.shishen}</strong>
            </p>
            <p className="text-[--color-text-muted] mt-1">
              {SHISHEN_INFO[current.shishen].description}
            </p>
          </div>
          <button onClick={handleNext} className="btn-primary">
            {currentIdx < analysis.shiShenMap.length - 1 ? '下一个 →' : '完成 →'}
          </button>
        </div>
      )}
    </div>
  );
}
