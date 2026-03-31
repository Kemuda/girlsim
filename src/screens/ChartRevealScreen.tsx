import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import type { LifeNarrative } from '../engine/bazi';

function Reveal({ delay, children }: { delay: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return <div className="animate-fade-in-slow">{children}</div>;
}

export default function ChartRevealScreen() {
  const { state, dispatch } = useGame();
  const narrative = state.baziNarrative as LifeNarrative;

  if (!narrative) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-md w-full space-y-12 text-center">

        {/* Identity */}
        <Reveal delay={400}>
          <p className="text-3xl font-light tracking-wide">
            {narrative.identity}
          </p>
        </Reveal>

        <Reveal delay={2000}>
          <p className="text-text-primary/80 text-lg leading-relaxed italic">
            {narrative.nature}
          </p>
        </Reveal>

        {/* Strength */}
        <Reveal delay={4000}>
          <p className="text-text-secondary/70 leading-relaxed">
            {narrative.strengthDesc}
          </p>
        </Reveal>

        {/* Life theme */}
        <Reveal delay={6500}>
          <div className="bg-bg-card rounded-lg p-6 text-left space-y-3">
            <p className="text-text-primary leading-relaxed">
              {narrative.themeOpening}
            </p>
          </div>
        </Reveal>

        {/* What's missing */}
        <Reveal delay={9500}>
          <p className="text-text-secondary/60 leading-relaxed italic">
            {narrative.obsessionDesc}
          </p>
        </Reveal>

        {/* Begin */}
        <Reveal delay={12000}>
          <div className="space-y-6 pt-4">
            <p className="text-text-secondary/40 text-sm">
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
        </Reveal>
      </div>
    </div>
  );
}
