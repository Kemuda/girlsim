// Developer Mode Panel — shows BaZi engine internals during gameplay
// Toggle with Shift+D

import { useGame } from '../context/GameContext';
import { WUXING_COLORS } from '../engine/bazi';
import { SHISHEN_INFO } from '../engine/bazi';
import { PILLAR_NAMES } from '../engine/bazi';
import type { WuXing } from '../engine/bazi';

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

function StemBranch({ stem, branch }: { stem: string; branch: string }) {
  return (
    <span className="font-mono">
      <span className="text-text-primary">{stem}</span>
      <span className="text-text-secondary/60">{branch}</span>
    </span>
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

  return (
    <aside className="w-72 shrink-0 border-l border-white/5 bg-bg-card/50 text-xs overflow-y-auto">
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <span className="ui-text text-[10px] text-text-secondary/50 tracking-[0.15em] uppercase">Dev · BaZi</span>
        <span className="text-text-secondary/30 font-mono">{baziLife.chartString}</span>
      </div>

      <div className="divide-y divide-white/5">

        {/* Section 1: 命盘 */}
        <section className="px-4 py-3 space-y-2">
          <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">命盘</h4>
          <div className="grid grid-cols-4 gap-1 text-center">
            {(['year', 'month', 'day', 'hour'] as const).map(pos => (
              <div key={pos} className="space-y-1">
                <div className="text-text-secondary/30 text-[9px]">{PILLAR_NAMES[pos]}</div>
                <div className={`text-sm font-light ${pos === 'day' ? 'text-accent' : 'text-text-primary'}`}>
                  {chart[pos].stem.name}
                </div>
                <div className="text-text-secondary/60 text-sm">{chart[pos].branch.name}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-text-secondary/50">日主:</span>
            <span className="text-accent">{dayMaster.name} {dayMaster.wuxing}{dayMaster.yinyang}</span>
            <span className="text-text-secondary/40 ml-auto">{strength.level} ({Math.round(strength.total)})</span>
          </div>
          {/* Strength bar */}
          <div className="h-1 bg-bg-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-accent/50 rounded-full transition-all duration-500"
              style={{ width: `${strength.total}%` }}
            />
          </div>
          <div className="text-text-secondary/40">
            月柱主题: <span className="text-text-primary/70">{monthTheme.primaryShiShen}</span>
            <span className="text-text-secondary/30 ml-1">· {SHISHEN_INFO[monthTheme.primaryShiShen].description}</span>
          </div>
        </section>

        {/* Section 2: 当前大运 */}
        <section className="px-4 py-3 space-y-2">
          <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">当前大运 ({currentCycle.ageRange})</h4>
          <div className="flex items-center gap-3">
            <StemBranch stem={currentCycle.stem.name} branch={currentCycle.branch.name} />
            <span className="text-text-secondary/50">·</span>
            <span className="text-text-primary/70">{currentCycle.shishen}</span>
            <span className={`ml-auto ${ENERGY_COLOR[currentCycle.energyColor]}`}>
              {ENERGY_LABEL[currentCycle.energyColor]}
            </span>
          </div>
          <div className="text-text-secondary/40 leading-relaxed">
            {SHISHEN_INFO[currentCycle.shishen].description}
          </div>
        </section>

        {/* Section 3: 五行分布 */}
        <section className="px-4 py-3 space-y-2">
          <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">五行分布</h4>
          {imbalance.distribution.map(({ element, percentage }) => (
            <div key={element} className="flex items-center gap-2">
              <span className="w-3 text-center" style={{ color: WUXING_COLORS[element as WuXing] }}>{element}</span>
              <div className="flex-1 h-1.5 bg-bg-hover rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, percentage * 100 / 50)}%`,
                    backgroundColor: WUXING_COLORS[element as WuXing],
                    opacity: 0.7,
                  }}
                />
              </div>
              <span className="text-text-secondary/40 w-8 text-right">{percentage.toFixed(0)}%</span>
            </div>
          ))}
          {imbalance.missing.length > 0 && (
            <div className="text-red-400/60 text-[10px]">缺: {imbalance.missing.join(' ')}</div>
          )}
        </section>

        {/* Section 4: 透出 */}
        {penetrations.length > 0 && (
          <section className="px-4 py-3 space-y-1">
            <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">透出</h4>
            {penetrations.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-text-secondary/60">
                <span>{p.hiddenStemName}</span>
                <span className="text-text-secondary/30">→</span>
                <span className="text-text-primary/50">{p.shishen}</span>
                <span className="text-text-secondary/30 ml-auto">{p.branchPosition}柱</span>
              </div>
            ))}
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
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.entries(shishenCounts).map(([s, n]) => (
              <span key={s} className="px-1.5 py-0.5 bg-bg-hover rounded text-text-secondary/60">
                {s}×{n}
              </span>
            ))}
          </div>
          <div className="space-y-0.5 max-h-32 overflow-y-auto">
            {history.slice(-6).map((entry, i) => (
              <div key={i} className="text-text-secondary/40 truncate">
                「{entry.choiceText}」
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: 状态 */}
        <section className="px-4 py-3 space-y-1">
          <h4 className="ui-text text-[10px] text-text-secondary/40 uppercase tracking-wider">当前六维</h4>
          {(Object.entries(characterState) as [string, number][]).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2">
              <span className="text-text-secondary/40 w-16">{k}</span>
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
