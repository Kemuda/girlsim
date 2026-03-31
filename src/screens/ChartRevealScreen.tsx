import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import type { LifeNarrative } from '../engine/bazi';
import { STAGE_NAMES_ZH } from '../types/game';

type Phase = 'waiting' | 'draw-fate' | 'fate-revealed' | 'draw-luck' | 'luck-revealed' | 'ready';

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
  const [phase, setPhase] = useState<Phase>('waiting');

  useEffect(() => {
    const t = setTimeout(() => setPhase('draw-fate'), 600);
    return () => clearTimeout(t);
  }, []);

  const handleDrawFate = useCallback(() => {
    setPhase('fate-revealed');
  }, []);

  const handleDrawLuck = useCallback(() => {
    setPhase('luck-revealed');
    // Auto-advance to ready after reveals finish
    setTimeout(() => setPhase('ready'), 8000);
  }, []);

  if (!narrative) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-md w-full space-y-10 text-center">

        {/* ========== STEP 1: 抽命 ========== */}
        {phase === 'draw-fate' && (
          <div className="animate-fade-in-slow space-y-8">
            <p className="text-text-secondary/50 text-sm">第一抽</p>
            <p className="text-xl text-text-primary/80 leading-relaxed">
              你无法选择自己是谁。
            </p>
            <button
              onClick={handleDrawFate}
              className="ui-text px-10 py-3 border border-accent/30 rounded-lg text-accent
                         hover:bg-accent/10 transition-all duration-300 cursor-pointer
                         tracking-[0.08em] text-sm"
            >
              抽命
            </button>
          </div>
        )}

        {/* ========== FATE REVEALED ========== */}
        {phase === 'fate-revealed' && (
          <div className="space-y-10">
            {/* Identity — who you are */}
            <Reveal delay={300}>
              <p className="text-3xl font-light tracking-wide">
                {narrative.identity}
              </p>
            </Reveal>

            <Reveal delay={2200}>
              <p className="text-text-primary/80 leading-relaxed">
                {narrative.nature}
              </p>
            </Reveal>

            <Reveal delay={4200}>
              <p className="text-text-secondary/70 leading-relaxed text-sm">
                {narrative.strengthDesc}
              </p>
            </Reveal>

            {/* Theme — what your life is about */}
            <Reveal delay={6200}>
              <div className="bg-bg-card rounded-lg p-5 text-left">
                <p className="text-text-primary/90 leading-relaxed">
                  {narrative.themeOpening}
                </p>
              </div>
            </Reveal>

            {/* What's missing */}
            <Reveal delay={8600}>
              <p className="text-text-secondary/50 italic text-sm leading-relaxed">
                {narrative.obsessionDesc}
              </p>
            </Reveal>

            {/* Draw luck button */}
            <Reveal delay={10600}>
              <div className="space-y-4 pt-2">
                <p className="text-text-secondary/40 text-sm">命已定。但运还没排。</p>
                <button
                  onClick={handleDrawLuck}
                  className="ui-text px-10 py-3 border border-accent/30 rounded-lg text-accent
                             hover:bg-accent/10 transition-all duration-300 cursor-pointer
                             tracking-[0.08em] text-sm"
                >
                  抽运
                </button>
              </div>
            </Reveal>
          </div>
        )}

        {/* ========== STEP 2: 运 REVEALED ========== */}
        {(phase === 'luck-revealed' || phase === 'ready') && (
          <div className="space-y-10">
            {/* Identity reminder */}
            <p className="text-xl font-light text-text-primary/60">
              {narrative.identity}
            </p>

            {/* Seven stages preview */}
            <Reveal delay={300}>
              <p className="text-text-secondary/50 text-sm">第二抽</p>
              <p className="text-lg text-text-primary/80 mt-2">
                你无法选择时代的风往哪吹。
              </p>
            </Reveal>

            <Reveal delay={1800}>
              <div className="space-y-3 text-left">
                {narrative.stageIntros.map((intro, i) => (
                  <Reveal key={i} delay={2400 + i * 700}>
                    <div className="flex gap-3 items-start">
                      <span className="text-text-secondary/30 text-xs ui-text whitespace-nowrap mt-1">
                        {STAGE_NAMES_ZH[i]}
                      </span>
                      <p className="text-text-secondary/60 text-sm leading-relaxed">
                        {intro}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Begin */}
            {phase === 'ready' && (
              <div className="animate-fade-in-slow space-y-6 pt-2">
                <p className="text-text-secondary/40 text-sm">
                  命定了。运排了。剩下的，看你怎么选。
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
