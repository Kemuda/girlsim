import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import type { LifeNarrative } from '../engine/bazi';
import DevPanel from '../components/DevPanel';

type Phase = 'waiting' | 'draw-fate' | 'fate-revealed' | 'draw-luck' | 'luck-revealed' | 'ready';

function Reveal({
  delay,
  skip,
  children,
}: {
  delay: number;
  skip: boolean;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(skip);
  useEffect(() => {
    if (skip) { setVisible(true); return; }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay, skip]);
  if (!visible) return null;
  return <div className={skip ? undefined : 'animate-fade-in-slow'}>{children}</div>;
}

export default function ChartRevealScreen() {
  const { state, dispatch } = useGame();
  const narrative = state.baziNarrative as LifeNarrative;
  const dev = state.devMode;
  const [phase, setPhase] = useState<Phase>('waiting');

  useEffect(() => {
    const t = setTimeout(() => setPhase('draw-fate'), dev ? 0 : 600);
    return () => clearTimeout(t);
  }, [dev]);

  const handleDrawFate = useCallback(() => {
    setPhase('fate-revealed');
  }, []);

  const handleDrawLuck = useCallback(() => {
    setPhase('luck-revealed');
    setTimeout(() => setPhase('ready'), dev ? 0 : 6000);
  }, [dev]);

  if (!narrative) return null;

  const r = (delay: number, children: React.ReactNode) => (
    <Reveal delay={delay} skip={dev}>{children}</Reveal>
  );

  return (
    <div className="min-h-screen flex">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
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
              {r(300,
                <p className="text-3xl font-light tracking-wide">{narrative.identity}</p>
              )}
              {r(2200,
                <p className="text-text-primary/80 leading-relaxed">{narrative.nature}</p>
              )}
              {r(4200,
                <p className="text-text-secondary/70 leading-relaxed text-sm">{narrative.strengthDesc}</p>
              )}
              {r(6200,
                <div className="bg-bg-card rounded-lg p-5 text-left">
                  <p className="text-text-primary/90 leading-relaxed">{narrative.themeOpening}</p>
                </div>
              )}
              {r(8600,
                <p className="text-text-secondary/50 italic text-sm leading-relaxed">{narrative.obsessionDesc}</p>
              )}
              {r(10600,
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
              )}
            </div>
          )}

          {/* ========== STEP 2: 运 REVEALED ========== */}
          {(phase === 'luck-revealed' || phase === 'ready') && (
            <div className="space-y-10">
              <p className="text-xl font-light text-text-primary/60">{narrative.identity}</p>

              {r(300,
                <p className="text-text-secondary/50 text-sm">第二抽</p>
              )}

              {r(1200,
                <div className="bg-bg-card rounded-lg p-5 text-left space-y-3">
                  <p className="text-text-primary/80 leading-relaxed whitespace-pre-line">
                    {narrative.eraDesc}
                  </p>
                </div>
              )}

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

      {/* Dev panel — right side during chart reveal */}
      {dev && <DevPanel />}
    </div>
  );
}
