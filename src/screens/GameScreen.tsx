import { useCallback, useRef } from 'react';
import { useGame } from '../context/GameContext';
import StatPanel from '../components/StatPanel';
import ChoiceCard from '../components/ChoiceCard';
import NarrativeText from '../components/NarrativeText';
import TurnIndicator from '../components/TurnIndicator';
import { generateNarration } from '../services/narrator';

export default function GameScreen() {
  const { state, dispatch } = useGame();
  const prevStateRef = useRef(state.characterState);

  const handleChoice = useCallback(
    (index: number) => {
      if (state.isLoading) return;

      const scene = state.phase === 'threshold' ? state.currentThreshold : state.currentScene;
      if (!scene) return;

      const choice = scene.choices[index];
      prevStateRef.current = state.characterState;

      dispatch({ type: 'SET_LOADING', loading: true });

      // Simulate brief "thinking" delay for narrative feel
      setTimeout(() => {
        const narration = generateNarration(
          state.characterState,
          choice.text,
          state.history
        );

        if (state.phase === 'threshold') {
          dispatch({ type: 'RESOLVE_THRESHOLD', choiceIndex: index, aiResponse: narration });
        } else {
          dispatch({ type: 'MAKE_CHOICE', choiceIndex: index, aiResponse: narration });
        }
        dispatch({ type: 'SET_LOADING', loading: false });
      }, 600);
    },
    [state, dispatch]
  );

  const handleContinue = useCallback(() => {
    prevStateRef.current = state.characterState;
    dispatch({ type: 'ADVANCE_TURN' });
  }, [state.characterState, dispatch]);

  const scene = state.phase === 'threshold' ? state.currentThreshold : state.currentScene;

  if (!scene) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/5">
        <TurnIndicator currentIndex={state.currentTurnIndex} />
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main narrative area */}
        <main className="flex-1 px-6 py-8 lg:px-12 max-w-3xl mx-auto w-full">
          {/* Scene title */}
          <div className="mb-6">
            {state.phase === 'threshold' && state.currentThreshold && (
              <span className="text-xs text-red-400/80 uppercase tracking-wider mb-1 block">
                {state.currentThreshold.category} · 命运事件
              </span>
            )}
            <h2 className="text-2xl font-light animate-fade-in">{scene.title}</h2>
          </div>

          {/* Scene text or AI narration */}
          {state.phase === 'transition' ? (
            <div className="space-y-8">
              <NarrativeText text={state.aiNarration} />
              <button
                onClick={handleContinue}
                className="px-6 py-2 border border-accent/30 rounded-lg text-accent text-sm
                           hover:bg-accent/10 transition-all duration-300 cursor-pointer
                           animate-fade-in"
                style={{ animationDelay: '0.8s', opacity: 0 }}
              >
                继续 →
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <NarrativeText text={scene.text} />

              {/* Choices */}
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

          {/* Loading indicator */}
          {state.isLoading && (
            <div className="mt-6 text-text-secondary text-sm animate-pulse-soft">
              命运正在编织...
            </div>
          )}
        </main>

        {/* Side panel - stats */}
        <aside className="lg:w-72 px-6 py-8 lg:border-l border-white/5">
          <StatPanel
            state={state.characterState}
            prevState={prevStateRef.current}
          />

          {/* History summary */}
          <div className="mt-6 text-xs text-text-secondary">
            <p>已做出 {state.history.length} 个选择</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
