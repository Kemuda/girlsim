import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { WUXING_COLORS, SHISHEN_INFO, PILLAR_NAMES } from '../engine/bazi';
import type { BaZiLife } from '../engine/bazi';

/** One-sentence day master descriptions */
const DAY_MASTER_FLAVOR: Record<string, string> = {
  '甲': '你是一棵大树。向上，向光，不问允许。',
  '乙': '你是藤蔓。柔软，但从不放手。',
  '丙': '你是太阳。照亮一切，也灼伤自己。',
  '丁': '你是一根蜡烛。微光不灭，照见暗处。',
  '戊': '你是大地。承载万物，自己不动。',
  '己': '你是湿土。滋养一切，但没人看到泥里的你。',
  '庚': '你是一把刀。锋利，精确，没有多余的话。',
  '辛': '你是一枚戒指。精致，但刮到会痛。',
  '壬': '你是大海。自由，深邃，吞没一切。',
  '癸': '你是雨水。安静地落，渗进所有人的土里。',
};

const STRENGTH_FLAVOR: Record<string, string> = {
  '极弱': '世界对你来说太重了。但蜡烛在风里反而最亮。',
  '偏弱': '你的资源不多。每一步都要精打细算。',
  '中和': '不强不弱——你有选择的余地。',
  '偏强': '你有足够的力量去做想做的事。问题是，你想做什么？',
  '极强': '力量多到溢出来。你的敌人不是别人，是自己。',
};

function PillarCard({ position, stem, branch, delay }: {
  position: string;
  stem: { name: string; wuxing: string };
  branch: { name: string; wuxing: string };
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) {
    return (
      <div className="flex flex-col items-center gap-2 w-16">
        <span className="text-[10px] text-text-secondary/40 ui-text tracking-wider">{position}</span>
        <div className="w-12 h-20 rounded-lg bg-bg-hover animate-pulse-soft" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 w-16 animate-fade-in">
      <span className="text-[10px] text-text-secondary/40 ui-text tracking-wider">{position}</span>
      <div className="flex flex-col items-center gap-1 bg-bg-card rounded-lg px-3 py-3 border border-white/5">
        <span
          className="text-2xl font-light"
          style={{ color: WUXING_COLORS[stem.wuxing as keyof typeof WUXING_COLORS] }}
        >
          {stem.name}
        </span>
        <span className="text-[9px] text-text-secondary/50 ui-text">{stem.wuxing}</span>
        <div className="w-6 h-px bg-white/10 my-1" />
        <span
          className="text-2xl font-light"
          style={{ color: WUXING_COLORS[branch.wuxing as keyof typeof WUXING_COLORS] }}
        >
          {branch.name}
        </span>
        <span className="text-[9px] text-text-secondary/50 ui-text">{branch.wuxing}</span>
      </div>
    </div>
  );
}

function RevealSection({ delay, children }: { delay: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return <div className="animate-fade-in">{children}</div>;
}

export default function ChartRevealScreen() {
  const { state, dispatch } = useGame();
  const life = state.baziLife as BaZiLife;

  if (!life) return null;

  const dm = life.dayMaster;
  const positions = ['year', 'month', 'day', 'hour'] as const;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full space-y-10">

        {/* Four Pillars */}
        <div className="flex justify-center gap-6">
          {positions.map((pos, i) => (
            <PillarCard
              key={pos}
              position={PILLAR_NAMES[pos]}
              stem={life.chart[pos].stem}
              branch={life.chart[pos].branch}
              delay={i * 600}
            />
          ))}
        </div>

        {/* Day Master reveal */}
        <RevealSection delay={2800}>
          <div className="text-center space-y-3">
            <p className="text-text-secondary/60 text-sm ui-text tracking-wider">你的日主</p>
            <p
              className="text-4xl font-light"
              style={{ color: WUXING_COLORS[dm.wuxing as keyof typeof WUXING_COLORS] }}
            >
              {dm.name}{dm.wuxing} · {dm.yinyang}
            </p>
            <p className="text-text-primary/80 text-lg italic leading-relaxed">
              {DAY_MASTER_FLAVOR[dm.name]}
            </p>
          </div>
        </RevealSection>

        {/* Strength */}
        <RevealSection delay={4000}>
          <div className="bg-bg-card rounded-lg p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary ui-text tracking-wider">身强弱</span>
              <span className="text-sm text-text-primary ui-text">{life.strength.level}</span>
            </div>
            <div className="w-full h-2 bg-bg-hover rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 bg-accent/70"
                style={{ width: `${life.strength.total}%` }}
              />
            </div>
            <p className="text-text-secondary/70 text-sm italic">
              {STRENGTH_FLAVOR[life.strength.level]}
            </p>
          </div>
        </RevealSection>

        {/* Month Theme */}
        <RevealSection delay={5200}>
          <div className="bg-bg-card rounded-lg p-5 space-y-3">
            <p className="text-xs text-text-secondary ui-text tracking-wider">你的人生主题</p>
            <p className="text-xl text-text-primary">
              {life.monthTheme.primaryShiShen}
              <span className="text-text-secondary/50 text-sm ml-2">
                {SHISHEN_INFO[life.monthTheme.primaryShiShen].description}
              </span>
            </p>
            <p className="text-text-primary/80 italic">{life.monthTheme.description}</p>
            <p className="text-text-secondary/60 text-sm">
              核心问题：{life.monthTheme.coreQuestion}
            </p>
          </div>
        </RevealSection>

        {/* Imbalance */}
        <RevealSection delay={6400}>
          <div className="bg-bg-card rounded-lg p-5 space-y-3">
            <p className="text-xs text-text-secondary ui-text tracking-wider">五行偏枯</p>
            <div className="flex gap-2">
              {life.imbalance.distribution.map(d => (
                <div key={d.element} className="flex-1 text-center">
                  <div
                    className="mx-auto rounded-full mb-1"
                    style={{
                      width: `${Math.max(8, d.percentage * 0.5)}px`,
                      height: `${Math.max(8, d.percentage * 0.5)}px`,
                      backgroundColor: WUXING_COLORS[d.element as keyof typeof WUXING_COLORS],
                      opacity: d.count === 0 ? 0.15 : 0.7,
                    }}
                  />
                  <span className="text-xs text-text-secondary/60">{d.element}</span>
                  <span className="block text-[10px] text-text-secondary/40 ui-text">{d.percentage}%</span>
                </div>
              ))}
            </div>
            <p className="text-text-primary/70 text-sm italic">{life.imbalance.obsession}</p>
          </div>
        </RevealSection>

        {/* Luck Cycles preview */}
        <RevealSection delay={7600}>
          <div className="bg-bg-card rounded-lg p-5 space-y-3">
            <p className="text-xs text-text-secondary ui-text tracking-wider">七步大运</p>
            <div className="flex gap-1">
              {life.luckCycles.map((dy) => {
                const color = dy.energyColor === 'support' ? '#4CAF50'
                  : dy.energyColor === 'pressure' ? '#E53935'
                  : dy.energyColor === 'drain' ? '#D4A017'
                  : dy.energyColor === 'resource' ? '#378ADD'
                  : '#666';
                return (
                  <div key={dy.index} className="flex-1 text-center">
                    <div
                      className="h-1.5 rounded-full mb-2"
                      style={{ backgroundColor: color, opacity: 0.6 }}
                    />
                    <span className="text-[10px] text-text-secondary/50 ui-text block">{dy.ageRange}</span>
                    <span className="text-xs text-text-secondary/70">{dy.shishen}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>

        {/* Begin button */}
        <RevealSection delay={8800}>
          <div className="text-center space-y-4 pt-4">
            <p className="text-text-secondary/50 text-sm italic">
              命已定。运已排。接下来，是你的选择。
            </p>
            <button
              onClick={() => dispatch({ type: 'BEGIN_PLAY' })}
              className="ui-text px-10 py-3 border border-accent/30 rounded-lg text-accent
                         hover:bg-accent/10 transition-all duration-300 cursor-pointer
                         tracking-[0.08em] text-sm"
            >
              开始这一生
            </button>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
