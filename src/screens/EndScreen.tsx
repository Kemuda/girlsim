import { useGame } from '../context/GameContext';
import { determineEnding } from '../constants/endings';
import { determineShadowEnding, UI_TEXT, DIMENSION_DISPLAY } from '../content';
import { determineChihiroEnding } from '../content/chihiro/endings';
import StatPanel from '../components/StatPanel';
import ShareCard from '../components/ShareCard';
import DimensionCurve from '../components/DimensionCurve';
import type { DimensionKey } from '../types/game';
import { INITIAL_STATE } from '../types/game';
import { generateEndingReflection } from '../engine/bazi';

export default function EndScreen() {
  const { state, dispatch } = useGame();
  const isShadow = state.mode === 'shadow';
  const isChihiro = state.mode === 'chihiro';

  const ending = isChihiro
    ? determineChihiroEnding(state.shishenChoices)
    : isShadow
      ? determineShadowEnding(state.characterState)
      : determineEnding(state.characterState);

  const t = UI_TEXT.endScreen;

  const dims: DimensionKey[] = ['Coherence', 'Depth', 'Regeneration', 'Transmission', 'Body', 'Shadow'];
  const highest = dims.reduce((a, b) =>
    state.characterState[a] > state.characterState[b] ? a : b
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full space-y-10 animate-fade-in-slow">
        {/* Share Card — screenshot-friendly */}
        <ShareCard
          title={ending.title}
          subtitle={ending.subtitle}
          characterState={state.characterState}
        />

        {/* Ending description */}
        <div className="bg-bg-card rounded-lg p-6 lg:p-8">
          <p className="leading-relaxed text-text-primary whitespace-pre-line">
            {ending.description}
          </p>
        </div>

        {/* Share nudge */}
        <p className="text-center text-xs text-text-secondary/40">
          Send to someone who came to mind
        </p>

        {/* Dimension curve */}
        {state.dimensionHistory.length > 1 && (
          <div className="bg-bg-card rounded-lg p-4 lg:p-6 space-y-3">
            <h3 className="text-xs text-text-secondary uppercase tracking-wider">
              {isShadow ? 'Your Choice Trail' : 'Your Life Curve'}
            </h3>
            <DimensionCurve history={state.dimensionHistory} />
          </div>
        )}

        {/* Stats + review */}
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

        {/* Life Reflection — narrative, no jargon */}
        {state.baziLife && (
          <div className="bg-bg-card rounded-lg p-6 lg:p-8">
            <p className="leading-relaxed text-text-primary/80 whitespace-pre-line italic">
              {generateEndingReflection(state.baziLife)}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="text-center pt-4 space-y-3">
          <button
            onClick={() => dispatch({ type: 'START_GAME', mode: state.mode })}
            className="px-8 py-3 border border-accent/40 rounded-lg text-accent
                       hover:bg-accent/10 transition-all duration-300 cursor-pointer
                       tracking-wider text-sm"
          >
            {t.restartButton}
          </button>
          {isShadow && (
            <div>
              <button
                onClick={() => dispatch({ type: 'START_GAME', mode: 'full' })}
                className="text-text-secondary/50 text-xs hover:text-text-secondary
                           transition-colors duration-300 cursor-pointer"
              >
                Experience a woman's full life →
              </button>
            </div>
          )}
          <p className="text-xs text-text-secondary/50">
            {t.restartHint}
          </p>
        </div>
      </div>
    </div>
  );
}
