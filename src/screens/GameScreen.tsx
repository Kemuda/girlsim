import { useCallback, useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { UI_TEXT } from '../content';
import StatPanel from '../components/StatPanel';
import ChoiceCard from '../components/ChoiceCard';
import NarrativeText from '../components/NarrativeText';
import TurnIndicator from '../components/TurnIndicator';
import { generateNarration } from '../services/narrator';

export default function GameScreen() {
  const { state, dispatch } = useGame();
  const [prevState, setPrevState] = useState(state.characterState);
  const t = UI_TEXT.gameScreen;
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isShadow = state.mode === 'shadow';

  const handleContinue = useCallback(() => {
    setPrevState(state.characterState);
    dispatch({ type: 'ADVANCE_TURN' });
  }, [state.characterState, dispatch]);

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
          <TurnIndicator
            currentIndex={state.currentTurnIndex}
            turns={undefined}
          />
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
            <h2 className="text-2xl font-light tracking-wide animate-fade-in">{scene.title}</h2>
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
              <NarrativeText text={scene.text} />
              <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
                {scene.choices.map((choice, i) => (
                  <ChoiceCard
                    key={i}
                    index={i}
                    text={choice.text}
                    onSelect={handleChoice}
                    disabled={state.isLoading}
                  />
                ))}
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
        {!isShadow && (
          <aside className="lg:w-72 px-6 py-8 lg:border-l border-white/5">
            <StatPanel
              state={state.characterState}
              prevState={prevState}
            />
            <div className="mt-6 text-xs text-text-secondary">
              <p>{t.choiceCounter(state.history.length)}</p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
