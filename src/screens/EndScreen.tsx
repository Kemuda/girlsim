import { useGame } from '../context/GameContext';
import { determineEnding } from '../constants/endings';
import { determineShadowEnding, UI_TEXT, DIMENSION_DISPLAY } from '../content';
import StatPanel from '../components/StatPanel';
import ShareCard from '../components/ShareCard';
import DimensionCurve from '../components/DimensionCurve';
import type { DimensionKey } from '../types/game';
import { INITIAL_STATE } from '../types/game';
import { WUXING_COLORS, SHISHEN_INFO, PILLAR_NAMES } from '../engine/bazi';

export default function EndScreen() {
  const { state, dispatch } = useGame();
  const isShadow = state.mode === 'shadow';

  const ending = isShadow
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

        {/* BaZi Review */}
        {state.baziLife && (
          <div className="bg-bg-card rounded-lg p-4 lg:p-6 space-y-4">
            <h3 className="text-xs text-text-secondary uppercase tracking-wider ui-text">
              命盘回顾
            </h3>

            {/* Chart */}
            <div className="flex justify-center gap-4">
              {(['year', 'month', 'day', 'hour'] as const).map(pos => {
                const pillar = state.baziLife!.chart[pos];
                return (
                  <div key={pos} className="text-center">
                    <span className="text-[10px] text-text-secondary/40 ui-text block mb-1">
                      {PILLAR_NAMES[pos]}
                    </span>
                    <span
                      className="text-lg block"
                      style={{ color: WUXING_COLORS[pillar.stem.wuxing as keyof typeof WUXING_COLORS] }}
                    >
                      {pillar.stem.name}
                    </span>
                    <span
                      className="text-lg block"
                      style={{ color: WUXING_COLORS[pillar.branch.wuxing as keyof typeof WUXING_COLORS] }}
                    >
                      {pillar.branch.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-text-secondary/50 text-xs ui-text">日主</span>
                <p className="text-text-primary">
                  {state.baziLife.dayMaster.name}{state.baziLife.dayMaster.wuxing}
                  <span className="text-text-secondary/50 ml-1">· {state.baziLife.strength.level}</span>
                </p>
              </div>
              <div>
                <span className="text-text-secondary/50 text-xs ui-text">人生主题</span>
                <p className="text-text-primary">
                  {state.baziLife.monthTheme.primaryShiShen}
                  <span className="text-text-secondary/50 ml-1">
                    · {SHISHEN_INFO[state.baziLife.monthTheme.primaryShiShen].description}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-text-secondary/50 text-xs ui-text">偏枯</span>
                <p className="text-text-primary text-xs">{state.baziLife.imbalance.obsession}</p>
              </div>
              <div>
                <span className="text-text-secondary/50 text-xs ui-text">透出</span>
                <p className="text-text-primary text-xs">
                  {state.baziLife.penetrations.length > 0
                    ? state.baziLife.penetrations.map(p => p.shishen).filter((v, i, a) => a.indexOf(v) === i).join('、')
                    : '无透出'}
                </p>
              </div>
            </div>

            {/* Luck cycles */}
            <div>
              <span className="text-text-secondary/50 text-xs ui-text block mb-2">大运轨迹</span>
              <div className="flex gap-1">
                {state.baziLife.luckCycles.map(dy => {
                  const color = dy.energyColor === 'support' ? '#4CAF50'
                    : dy.energyColor === 'pressure' ? '#E53935'
                    : dy.energyColor === 'drain' ? '#D4A017'
                    : dy.energyColor === 'resource' ? '#378ADD'
                    : '#666';
                  const isCurrent = dy.index <= state.currentTurnIndex;
                  return (
                    <div key={dy.index} className="flex-1 text-center">
                      <div
                        className="h-1.5 rounded-full mb-1"
                        style={{ backgroundColor: color, opacity: isCurrent ? 0.8 : 0.2 }}
                      />
                      <span className="text-[9px] text-text-secondary/40 ui-text">{dy.ageRange}</span>
                    </div>
                  );
                })}
              </div>
            </div>
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
