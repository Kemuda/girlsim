import { useGame } from '../context/GameContext';
import { determineEnding } from '../constants/endings';
import { UI_TEXT, DIMENSION_DISPLAY } from '../content';
import StatPanel from '../components/StatPanel';
import type { DimensionKey } from '../types/game';
import { INITIAL_STATE } from '../types/game';

export default function EndScreen() {
  const { state, dispatch } = useGame();
  const ending = determineEnding(state.characterState);
  const t = UI_TEXT.endScreen;

  const dims: DimensionKey[] = ['Coherence', 'Depth', 'Regeneration', 'Transmission', 'Body', 'Shadow'];
  const highest = dims.reduce((a, b) =>
    state.characterState[a] > state.characterState[b] ? a : b
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full space-y-10 animate-fade-in-slow">
        <div className="text-center space-y-3">
          <p className="text-xs text-text-secondary uppercase tracking-widest">
            {t.chapterLabel}
          </p>
          <h1 className="text-4xl font-light">{ending.title}</h1>
          <p className="text-text-secondary italic">{ending.subtitle}</p>
        </div>

        <div className="bg-bg-card rounded-lg p-6 lg:p-8">
          <p className="leading-relaxed text-text-primary whitespace-pre-line">
            {ending.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatPanel state={state.characterState} prevState={INITIAL_STATE} />

          <div className="bg-bg-card rounded-lg p-4 space-y-4">
            <h3 className="text-xs text-text-secondary uppercase tracking-wider">
              {t.reviewTitle}
            </h3>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>{t.totalChoices(state.history.length)}</p>
              <p>
                {t.topDimension}：
                <span className="text-text-primary">
                  {DIMENSION_DISPLAY[highest].label}
                </span>
                {' '}({state.characterState[highest]})
              </p>
              <p>
                {t.shadowValue}：
                <span className={state.characterState.Shadow >= 50 ? 'text-red-400' : 'text-text-primary'}>
                  {state.characterState.Shadow}
                </span>
              </p>
            </div>

            <div className="pt-2">
              <h4 className="text-xs text-text-secondary mb-2">{t.keyChoicesTitle}</h4>
              <div className="space-y-1">
                {state.history.slice(0, 8).map((entry, i) => (
                  <p key={i} className="text-xs text-text-secondary/70 truncate">
                    「{entry.choiceText}」
                  </p>
                ))}
                {state.history.length > 8 && (
                  <p className="text-xs text-text-secondary/50">
                    {t.moreChoices(state.history.length - 8)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => dispatch({ type: 'START_GAME' })}
            className="px-8 py-3 border border-accent/40 rounded-lg text-accent
                       hover:bg-accent/10 transition-all duration-300 cursor-pointer
                       tracking-wider text-sm"
          >
            {t.restartButton}
          </button>
          <p className="text-xs text-text-secondary/50 mt-3">
            {t.restartHint}
          </p>
        </div>
      </div>
    </div>
  );
}
