// Developer Mode Panel — shows BaZi engine internals during gameplay
// Toggle with Shift+D

import { useGame } from '../context/GameContext';
import { WUXING_COLORS, SHISHEN_INFO, PILLAR_NAMES } from '../engine/bazi';
import { calcShiShen } from '../engine/bazi/shishen';
import { getTianGan } from '../engine/bazi/tiangan';
import type { WuXing, TianGan } from '../engine/bazi';

const ENERGY_COLOR: Record<string, string> = {
  support:  'text-green-400',
  resource: 'text-blue-400',
  drain:    'text-amber-400',
  pressure: 'text-red-400',
  neutral:  'text-text-secondary',
};

const ENERGY_LABEL: Record<string, string> = {
  support:  '滋养',
  resource: '同类',
  drain:    '输出',
  pressure: '压力',
  neutral:  '平淡',
};

/** Colored stem/branch name with wuxing */
function ElementLabel({
  gan,
  dayMaster,
  isDay = false,
}: {
  gan: TianGan;
  dayMaster: TianGan;
  isDay?: boolean;
}) {
  const color = WUXING_COLORS[gan.wuxing as WuXing];
  const polarity = gan.yinyang === '阳' ? '+' : '−';
  const shishen = isDay ? '日主' : calcShiShen(dayMaster, gan);

  return (
    <div className="text-center space-y-0.5">
      <div className="font-light text-sm" style={{ color }}>
        {gan.name}{gan.wuxing}{polarity}
      </div>
      <div className="text-[9px] text-text-secondary/40">{shishen}</div>
    </div>
  );
}

export default function DevPanel() {
  const { state } = useGame();
  const { baziLife, shishenChoices, characterState, currentTurnIndex, history } = state;

  if (!baziLife) return null;

  const { chart, dayMaster, strength, monthTheme, imbalance, luckCycles, penetrations } = baziLife;
  const currentCycle = luckCycles[currentTurnIndex] ?? luckCycles[0];

  const shishenCounts: Record<string, number> = {};
  for (const s of shishenChoices) {
    shishenCounts[s] = (shishenCounts[s] ?? 0) + 1;
  }
  const topShishen = Object.entries(shishenCounts).sort(([, a], [, b]) => b - a)[0];

  const positions = ['year', 'month', 'day', 'hour'] as const;

  return (
    <aside className="w-72 shrink-0 border-l border-white/5 bg-bg-card/50 text-xs overflow-y-auto">
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <span className="ui-text text-[10px] text-text-secondary/50 tracking-[0.15em] uppercase">Dev · BaZi</span>
        <span className="text-text-secondary/30 font-mono">{baziLife.chartString}</span>
      </div>

      <div className="divide-y divide-white/5">

        {/* Section 1: 命盘 */}
        <section className="px-4 py-3 space-y-3">
          <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">命盘</h4>

          {/* Pillar headers */}
          <div className="grid grid-cols-4 gap-1 text-center">
            {positions.map(pos => (
              <div key={pos} className="text-[9px] text-text-secondary/30">{PILLAR_NAMES[pos]}</div>
            ))}
          </div>

          {/* Stems row */}
          <div className="grid grid-cols-4 gap-1">
            {positions.map(pos => (
              <ElementLabel
                key={pos}
                gan={chart[pos].stem}
                dayMaster={dayMaster}
                isDay={pos === 'day'}
              />
            ))}
          </div>

          {/* Branches row */}
          <div className="grid grid-cols-4 gap-1">
            {positions.map(pos => {
              const branch = chart[pos].branch;
              const mainCangGan = getTianGan(branch.canggan[0].name);
              return (
                <div key={pos} className="text-center space-y-0.5">
                  <div
                    className="font-light text-sm"
                    style={{ color: WUXING_COLORS[branch.wuxing as WuXing] }}
                  >
                    {branch.name}{branch.wuxing}{branch.yinyang === '阳' ? '+' : '−'}
                  </div>
                  <div className="text-[9px] text-text-secondary/40">
                    {calcShiShen(dayMaster, mainCangGan)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day master + strength */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-text-secondary/40">日主</span>
            <span style={{ color: WUXING_COLORS[dayMaster.wuxing as WuXing] }}>
              {dayMaster.name}{dayMaster.wuxing}{dayMaster.yinyang === '阳' ? '+' : '−'}
            </span>
            <span className="text-text-secondary/40 ml-auto">{strength.level} ({Math.round(strength.total)})</span>
          </div>
          <div className="h-1 bg-bg-hover rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${strength.total}%`,
                backgroundColor: WUXING_COLORS[dayMaster.wuxing as WuXing],
                opacity: 0.6,
              }}
            />
          </div>

          {/* Month theme */}
          <div className="text-text-secondary/40 text-[10px]">
            月支 - 人生主题:
            <span className="text-text-primary/70 ml-1">{monthTheme.primaryShiShen}</span>
            <span className="text-text-secondary/30 ml-1">· {SHISHEN_INFO[monthTheme.primaryShiShen].description}</span>
          </div>
        </section>

        {/* Section 2: 当前大运 */}
        <section className="px-4 py-3 space-y-2">
          <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">
            当前大运 ({currentCycle.ageRange})
          </h4>
          <div className="flex items-center gap-2">
            <span
              className="font-light text-sm"
              style={{ color: WUXING_COLORS[currentCycle.stem.wuxing as WuXing] }}
            >
              {currentCycle.stem.name}{currentCycle.stem.wuxing}{currentCycle.stem.yinyang === '阳' ? '+' : '−'}
            </span>
            <span
              className="text-sm"
              style={{ color: WUXING_COLORS[currentCycle.branch.wuxing as WuXing] }}
            >
              {currentCycle.branch.name}{currentCycle.branch.wuxing}{currentCycle.branch.yinyang === '阳' ? '+' : '−'}
            </span>
            <span className="text-text-primary/60 ml-1">{currentCycle.shishen}</span>
            <span className={`ml-auto ${ENERGY_COLOR[currentCycle.energyColor]}`}>
              {ENERGY_LABEL[currentCycle.energyColor]}
            </span>
          </div>
          <div className="text-text-secondary/40 leading-relaxed text-[10px]">
            {SHISHEN_INFO[currentCycle.shishen].description}
          </div>
        </section>

        {/* Section 3: 五行分布 */}
        <section className="px-4 py-3 space-y-2">
          <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">五行分布</h4>
          {imbalance.distribution.map(({ element, percentage }) => (
            <div key={element} className="flex items-center gap-2">
              <span className="w-4 text-center font-light" style={{ color: WUXING_COLORS[element as WuXing] }}>
                {element}
              </span>
              <div className="flex-1 h-1.5 bg-bg-hover rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, percentage * 100 / 50)}%`,
                    backgroundColor: WUXING_COLORS[element as WuXing],
                    opacity: 0.65,
                  }}
                />
              </div>
              <span className="text-text-secondary/40 w-8 text-right">{percentage.toFixed(0)}%</span>
            </div>
          ))}
          {imbalance.missing.length > 0 && (
            <div className="text-[10px] flex gap-1 flex-wrap mt-1">
              <span className="text-text-secondary/30">缺:</span>
              {imbalance.missing.map(el => (
                <span key={el} style={{ color: WUXING_COLORS[el as WuXing] }}>{el}</span>
              ))}
            </div>
          )}
        </section>

        {/* Section 4: 透出 */}
        {penetrations.length > 0 && (
          <section className="px-4 py-3 space-y-1">
            <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">透出</h4>
            {penetrations.map((p, i) => {
              const hiddenGan = getTianGan(p.hiddenStemName);
              return (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ color: WUXING_COLORS[hiddenGan.wuxing as WuXing] }}>{p.hiddenStemName}</span>
                  <span className="text-text-secondary/30">→</span>
                  <span className="text-text-primary/50">{p.shishen}</span>
                  <span className="text-text-secondary/30 ml-auto text-[9px]">{p.branchPosition}柱</span>
                </div>
              );
            })}
          </section>
        )}

        {/* Section 5: 选择轨迹 */}
        <section className="px-4 py-3 space-y-2">
          <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">
            选择轨迹 ({shishenChoices.length})
          </h4>
          {topShishen && (
            <div className="text-text-primary/60">
              主导: <span className="text-accent">{topShishen[0]}</span>
              <span className="text-text-secondary/40 ml-1">×{topShishen[1]}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            {Object.entries(shishenCounts).map(([s, n]) => (
              <span key={s} className="px-1.5 py-0.5 bg-bg-hover rounded text-text-secondary/60">
                {s}×{n}
              </span>
            ))}
          </div>
          <div className="space-y-0.5 max-h-28 overflow-y-auto">
            {history.slice(-6).map((entry, i) => (
              <div key={i} className="text-text-secondary/40 truncate text-[10px]">
                「{entry.choiceText}」
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: 当前六维 */}
        <section className="px-4 py-3 space-y-1">
          <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">当前六维</h4>
          {(Object.entries(characterState) as [string, number][]).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2">
              <span className="text-text-secondary/40 w-20">{k}</span>
              <div className="flex-1 h-1 bg-bg-hover rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${k === 'Shadow' ? 'bg-red-400/50' : 'bg-accent/40'}`}
                  style={{ width: `${v}%` }}
                />
              </div>
              <span className={`w-6 text-right ${k === 'Shadow' && v >= 50 ? 'text-red-400' : 'text-text-secondary/50'}`}>
                {v}
              </span>
            </div>
          ))}
        </section>

      </div>
    </aside>
  );
}
