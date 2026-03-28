import type { BaZiChart } from '../engine/chart.ts';
import { chartToString } from '../engine/chart.ts';
import type { Analysis } from '../hooks/useLearnSession.ts';
import { SHISHEN_INFO } from '../engine/shishen.ts';
import { WUXING_COLORS } from '../engine/wuxing.ts';
import type { WuXing } from '../engine/wuxing.ts';

interface Props {
  chart: BaZiChart;
  analysis: Analysis;
  onReset: () => void;
}

function WuXingBadge({ wx }: { wx: WuXing }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-bold text-white"
      style={{ backgroundColor: WUXING_COLORS[wx] }}
    >
      {wx}
    </span>
  );
}

export default function Summary({ chart, analysis, onReset }: Props) {
  // Count wuxing occurrences across all 8 positions
  const wuxingCount: Record<WuXing, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
  const pillars = [chart.year, chart.month, chart.day, chart.hour];
  for (const p of pillars) {
    wuxingCount[p.stem.wuxing]++;
    wuxingCount[p.branch.wuxing]++;
  }

  const maxCount = Math.max(...Object.values(wuxingCount));

  return (
    <div className="bg-[--color-surface] rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold mb-4">读盘总结</h3>

      <div className="bg-[--color-surface-light] rounded p-4 mb-4 font-mono text-center text-lg">
        {chartToString(chart)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-sm text-[--color-text-muted] mb-1">日主</div>
          <div className="text-xl font-bold">{analysis.dayMaster} <WuXingBadge wx={analysis.dayMasterWuxing as WuXing} /></div>
        </div>
        <div>
          <div className="text-sm text-[--color-text-muted] mb-1">身强弱</div>
          <div className="text-xl font-bold">{analysis.strength.level}（{analysis.strength.total}分）</div>
        </div>
        <div>
          <div className="text-sm text-[--color-text-muted] mb-1">月柱主题</div>
          <div className="text-xl font-bold text-[--color-accent]">{analysis.monthTheme.shishen}</div>
          <div className="text-sm text-[--color-text-muted]">{SHISHEN_INFO[analysis.monthTheme.shishen].description}</div>
        </div>
        <div>
          <div className="text-sm text-[--color-text-muted] mb-1">透出</div>
          <div className="text-xl font-bold">
            {analysis.touChou.length > 0
              ? analysis.touChou.map(t => t.shishen).join('、')
              : '无'}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-[--color-text-muted] mb-2">五行分布</div>
        <div className="space-y-2">
          {(Object.entries(wuxingCount) as [WuXing, number][]).map(([wx, count]) => (
            <div key={wx} className="flex items-center gap-3">
              <div className="w-8 text-center" style={{ color: WUXING_COLORS[wx] }}>{wx}</div>
              <div className="flex-1 bg-[--color-surface-light] rounded-full h-4 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(count / maxCount) * 100}%`,
                    backgroundColor: WUXING_COLORS[wx],
                    opacity: 0.8,
                  }}
                />
              </div>
              <div className="w-6 text-right text-sm">{count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-[--color-text-muted] mb-2">十神排列</div>
        <div className="space-y-1">
          {analysis.shiShenMap.map(e => (
            <div key={e.position} className="flex gap-3 text-sm">
              <span className="text-[--color-text-muted] w-12">{e.position}</span>
              <span className="font-bold w-6">{e.stemName}</span>
              <span className="text-[--color-accent]">{e.shishen}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-[--color-accent] text-white py-3 rounded text-lg"
      >
        再来一局
      </button>
    </div>
  );
}
