import { useState } from 'react';
import type { Analysis } from '../hooks/useLearnSession.ts';
import { SHISHEN_LIST, SHISHEN_INFO } from '../engine/shishen.ts';

const THEME_DESCRIPTIONS: Record<string, string> = {
  '比肩': '一辈子在身份认同中打转。核心问题：独立 vs 合群',
  '劫财': '一辈子在争夺和被争夺中度过。核心问题：什么是真正属于你的？',
  '食神': '一辈子在温和地创造和输出。核心问题：表达自己 vs 照顾别人',
  '伤官': '一辈子在叛逆和表达中挣扎。核心问题：磨平棱角还是刺穿世界？',
  '偏财': '一辈子在冒险和流动中寻找意义。核心问题：要不要赌这一把？',
  '正财': '一辈子在追求稳定和积累。核心问题：稳定是保护还是牢笼？',
  '七杀': '一辈子在跟压力和危机搏斗。核心问题：对抗还是臣服？',
  '正官': '一辈子在规则和期待中寻找自我。核心问题：满足期待 vs 做自己',
  '偏印': '一辈子在孤独和灵感之间游走。核心问题：孤独是诅咒还是天赋？',
  '正印': '一辈子被体制和传统滋养/束缚。核心问题：感恩还是挣脱？',
};

interface Props {
  analysis: Analysis;
  onNext: () => void;
}

export default function StepMonthTheme({ analysis, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const correct = analysis.monthTheme.shishen;
  const isCorrect = selected === correct;

  return (
    <div className="card mb-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded bg-[--color-accent]/20 text-[--color-accent]">第四关</span>
        <h3 className="text-lg font-bold">月柱主题</h3>
      </div>

      <p className="text-[--color-text-secondary] mb-2 text-sm leading-relaxed">
        月柱地支的<strong>主气藏干</strong>对日主来说是什么十神？这决定了命主一辈子的核心议题。
      </p>

      <div className="bg-[--color-surface-light] rounded-lg p-3 mb-5 text-sm">
        <span className="text-[--color-text-muted]">月支主气藏干：</span>
        <strong className="text-[--color-accent]">{analysis.monthTheme.stemName}</strong>
        <span className="text-[--color-text-muted]"> 对日主 {analysis.dayMaster} 来说是？</span>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-5">
        {SHISHEN_LIST.map(ss => (
          <button
            key={ss}
            disabled={answered}
            onClick={() => setSelected(ss)}
            className={`choice-btn text-sm ${
              answered && ss === correct ? 'correct' :
              answered && ss === selected && !isCorrect ? 'wrong' :
              !answered && selected === ss ? 'selected' : ''
            }`}
          >
            <div className="font-bold">{ss}</div>
          </button>
        ))}
      </div>

      {!answered && (
        <button onClick={() => setAnswered(true)} disabled={!selected} className="btn-primary">确认</button>
      )}

      {answered && (
        <div className="animate-slide-up">
          <div className={`font-bold mb-3 ${isCorrect ? 'text-[--color-correct]' : 'text-[--color-wrong]'}`}>
            {isCorrect ? '正确' : `正确答案：${correct}`}
          </div>
          <div className="bg-[--color-surface-light] rounded-lg p-4 mb-4">
            <div className="font-bold text-[--color-accent] text-lg mb-2">
              月柱主题：{correct}
            </div>
            <p className="text-sm text-[--color-text-secondary] leading-relaxed">
              {THEME_DESCRIPTIONS[correct] || SHISHEN_INFO[correct].description}
            </p>
          </div>
          <button onClick={onNext} className="btn-primary">下一关 →</button>
        </div>
      )}
    </div>
  );
}
