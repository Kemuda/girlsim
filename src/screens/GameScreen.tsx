import { useCallback, useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { UI_TEXT } from '../content';
import StatPanel from '../components/StatPanel';
import ChoiceCard from '../components/ChoiceCard';
import NarrativeText from '../components/NarrativeText';
import TurnIndicator from '../components/TurnIndicator';
import DevPanel from '../components/DevPanel';
import { generateNarration } from '../services/narrator';
import { canAffordChoice } from '../services/qi-system';
import { computeDominantTag } from '../services/chihiro-selector';

export default function GameScreen() {
  const { state, dispatch } = useGame();
  const [prevState, setPrevState] = useState(state.characterState);
  const t = UI_TEXT.gameScreen;
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isShadow = state.mode === 'shadow';
  const isChihiro = state.mode === 'chihiro';
  const dominantTag = isChihiro ? computeDominantTag(state.shishenChoices) : null;

  const handleContinue = useCallback(() => {
    setPrevState(state.characterState);
    dispatch({ type: 'ADVANCE_TURN' });
  }, [state.characterState, dispatch]);

  const handleAcknowledgeTransition = useCallback(() => {
    dispatch({ type: 'ACKNOWLEDGE_DAYUN_TRANSITION' });
  }, [dispatch]);

  // Clean up auto-advance ref on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, []);

  const handleChoice = useCallback(
    (index: number) => {
      if (state.isLoading) return;

      const scene = state.phase === 'threshold' ? state.currentThreshold : state.currentScene;
      if (!scene) return;

      const choice = scene.choices[index];
      setPrevState(state.characterState);

      dispatch({ type: 'SET_LOADING', loading: true });

      // Shadow mode: 300ms delay (snappy). Full mode: 600ms (contemplative).
      setTimeout(() => {
        const narration = generateNarration(
          state.characterState,
          choice.text,
          state.history,
          state.mode
        );

        if (state.phase === 'threshold') {
          dispatch({ type: 'RESOLVE_THRESHOLD', choiceIndex: index, aiResponse: narration });
        } else {
          dispatch({ type: 'MAKE_CHOICE', choiceIndex: index, aiResponse: narration });
        }
        dispatch({ type: 'SET_LOADING', loading: false });
      }, isShadow ? 300 : 600);
    },
    [state, dispatch, isShadow]
  );

  const scene = state.phase === 'threshold' ? state.currentThreshold : state.currentScene;

  // Dayun transition (chihiro): full-screen atmospheric overlay
  if (state.phase === 'dayun-transition' && state.transitionEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-10">
        <div className="max-w-xl space-y-8 animate-fade-in">
          <div className="ui-text text-[11px] text-accent/40 uppercase tracking-[0.2em]">
            大运转换 · dayun transition
          </div>
          <NarrativeText text={state.transitionEvent.text} />
          <button
            onClick={handleAcknowledgeTransition}
            className="ui-text px-6 py-2 border border-accent/20 rounded-lg text-accent text-sm
                       hover:bg-accent/10 transition-all duration-300 cursor-pointer tracking-wide"
          >
            继续 →
          </button>
        </div>
      </div>
    );
  }

  if (!scene) return null;

  const totalScenes = isShadow ? 5 : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 border-b border-white/5">
        {isShadow ? (
          // Shadow mode: minimal progress
          <div className="flex items-center justify-center gap-3">
            <span className="ui-text text-[11px] text-text-secondary/50 tabular-nums tracking-wider">
              {state.currentSceneIndex + 1} / {totalScenes}
            </span>
            <div className="w-24 h-1 bg-bg-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-accent/50 rounded-full transition-all duration-500"
                style={{ width: `${((state.currentSceneIndex + 1) / 5) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <TurnIndicator
              currentIndex={state.currentTurnIndex}
              turns={undefined}
            />
            {state.baziNarrative && state.baziNarrative.stageIntros[state.currentTurnIndex] && (
              <p className="text-[11px] text-text-secondary/50 italic max-w-md">
                {state.baziNarrative.stageIntros[state.currentTurnIndex]}
              </p>
            )}
          </div>
        )}
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        <main className="flex-1 px-6 py-10 lg:px-16 max-w-2xl mx-auto w-full">
          <div className="mb-8">
            {state.phase === 'threshold' && state.currentThreshold && (
              <span className="ui-text text-xs text-red-400/60 uppercase tracking-[0.12em] mb-2 block">
                {state.currentThreshold.category} · {t.thresholdLabel}
              </span>
            )}
            <h2 className="text-3xl font-light tracking-wide animate-fade-in">{scene.title}</h2>
          </div>

          {state.phase === 'transition' ? (
            <div className="space-y-8">
              <NarrativeText text={state.aiNarration} />
              <button
                onClick={handleContinue}
                className="ui-text px-6 py-2 border border-accent/20 rounded-lg text-accent text-sm
                           hover:bg-accent/10 transition-all duration-300 cursor-pointer
                           animate-fade-in tracking-wide"
                style={{ animationDelay: '0.6s', opacity: 0 }}
              >
                {t.continueButton}
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {isChihiro && 'echoText' in scene && scene.echoText && (
                <div className="ui-text text-[11px] text-accent/50 italic tracking-wide border-l border-accent/20 pl-3">
                  {scene.echoText}
                </div>
              )}
              <NarrativeText text={scene.text} />
              <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
                {scene.choices.map((choice, i) => {
                  const affordable = isChihiro
                    ? canAffordChoice(state.qi, choice.qiCost, choice.qiBypassTag, dominantTag)
                    : true;
                  return (
                    <ChoiceCard
                      key={i}
                      index={i}
                      text={choice.text}
                      onSelect={handleChoice}
                      disabled={state.isLoading}
                      qiLocked={!affordable}
                      lockedReason={!affordable ? (choice.disabledText ?? '气力不足') : undefined}
                      qiCost={isChihiro ? choice.qiCost : undefined}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {state.isLoading && (
            <div className="mt-8 text-text-secondary/50 text-sm animate-pulse-soft">
              {isShadow ? '...' : t.loadingText}
            </div>
          )}
        </main>

        {/* Shadow mode: hide stat sidebar — reveal is at the end */}
        {!isShadow && !state.devMode && (
          <aside className="lg:w-72 px-6 py-8 lg:border-l border-white/5">
            <StatPanel
              state={state.characterState}
              prevState={prevState}
            />
            <div className="mt-6 text-xs text-text-secondary">
              <p>{t.choiceCounter(state.history.length)}</p>
            </div>
            {isChihiro && (
              <div className="mt-6 space-y-3 border-t border-white/5 pt-4">
                <div className="flex items-center justify-between text-[11px] ui-text tracking-wider">
                  <span className="text-text-secondary/60">气 QI</span>
                  <span className="text-accent/80 tabular-nums">{state.qi}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] ui-text tracking-wider">
                  <span className="text-text-secondary/60">记忆 MEMORIES</span>
                  <span className="text-accent/80 tabular-nums">{state.memories.length}</span>
                </div>
                {state.registeredEchoes.length > 0 && (
                  <div className="flex items-center justify-between text-[11px] ui-text tracking-wider">
                    <span className="text-text-secondary/60">回声 ECHOES</span>
                    <span className="text-accent/80 tabular-nums">{state.registeredEchoes.length}</span>
                  </div>
                )}
                {state.memories.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-2 max-h-48 overflow-y-auto">
                    {state.memories.slice(-3).reverse().map((m) => (
                      <p key={m.id} className="text-[10px] italic text-text-secondary/50 leading-relaxed">
                        · {m.text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </aside>
        )}
        {/* Dev mode: full engine internals panel */}
        {state.devMode && <DevPanel />}
      </div>
    </div>
  );
}
