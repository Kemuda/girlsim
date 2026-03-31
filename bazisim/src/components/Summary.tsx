import type { BaZiChart } from '../engine/chart.ts';
import { chartToString } from '../engine/chart.ts';
import type { Analysis } from '../hooks/useLearnSession.ts';
import { SHISHEN_INFO } from '../engine/shishen.ts';
import { WUXING_COLORS } from '../engine/wuxing.ts';
import type { WuXing } from '../engine/wuxing.ts';
import { getTianGan } from '../engine/tiangan.ts';
import { getLifeStage } from '../engine/changsheng.ts';

interface Props {
  chart: BaZiChart;
  analysis: Analysis;
  onReset: () => void;
  onHome?: () => void;
}

const THEME_CORE: Record<string, string> = {
  '比肩': '独立 vs 合群',
  '劫财': '什么是真正属于你的？',
  '食神': '表达自己 vs 照顾别人',
  '伤官': '磨平棱角还是刺穿世界？',
  '偏财': '要不要赌这一把？',
  '正财': '稳定是保护还是牢笼？',
  '七杀': '对抗还是臣服？',
  '正官': '满足期待 vs 做自己',
  '偏印': '孤独是诅咒还是天赋？',
  '正印': '感恩还是挣脱？',
};

export default function Summary({ chart, analysis, onReset }: Props) {
  const dm = getTianGan(analysis.dayMaster);
  const dayStage = getLifeStage(dm, chart.day.branch);

  // Count wuxing across all stems and branches
  const wuxingCount: Record<WuXing, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
  const pillars = [chart.year, chart.month, chart.day, chart.hour];
  for (const p of pillars) {
    wuxingCount[p.stem.wuxing]++;
    wuxingCount[p.branch.wuxing]++;
  }
  const maxCount = Math.max(...Object.values(wuxingCount), 1);

  // Missing elements
  const missing = (Object.entries(wuxingCount) as [WuXing, number][]).filter(([, c]) => c === 0).map(([wx]) => wx);
  const dominant = (Object.entries(wuxingCount) as [WuXing, number][]).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div className="card mb-4 animate-slide-up">
      <h3 className="text-xl font-bold mb-5 text-center">读盘总结</h3>

      {/* Chart string */}
      <div className="bg-[--color-bg] rounded-lg p-4 mb-6 text-center">
        <div className="font-mono text-lg tracking-widest text-[--color-text-secondary]">
          {chartToString(chart)}
        </div>
      </div>

      {/* Key info grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[--color-surface-light] rounded-lg p-4">
          <div className="text-xs text-[--color-text-muted] mb-1">日主</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold" style={{ color: WUXING_COLORS[dm.wuxing] }}>{dm.name}</span>
            <span className="text-sm text-[--color-text-secondary]">{dm.wuxing}{dm.yinyang}</span>
          </div>
          <div className="text-xs text-[--color-text-muted] mt-1">坐{chart.day.branch.name}（{dayStage}）</div>
        </div>

        <div className="bg-[--color-surface-light] rounded-lg p-4">
          <div className="text-xs text-[--color-text-muted] mb-1">身强弱</div>
          <div className="text-2xl font-bold">{analysis.strength.level}</div>
          <div className="text-xs text-[--color-text-muted] mt-1">{analysis.strength.total} / 100</div>
        </div>

        <div className="bg-[--color-surface-light] rounded-lg p-4">
          <div className="text-xs text-[--color-text-muted] mb-1">月柱主题</div>
          <div className="text-xl font-bold text-[--color-accent]">{analysis.monthTheme.shishen}</div>
          <div className="text-xs text-[--color-text-muted] mt-1">
            {THEME_CORE[analysis.monthTheme.shishen] || ''}
          </div>
        </div>

        <div className="bg-[--color-surface-light] rounded-lg p-4">
          <div className="text-xs text-[--color-text-muted] mb-1">透出</div>
          <div className="text-xl font-bold">
            {analysis.touChou.length > 0
              ? analysis.touChou.map(t => t.shishen).join('、')
              : '无'}
          </div>
          <div className="text-xs text-[--color-text-muted] mt-1">
            {analysis.touChou.length > 0 ? '外人可见的特质' : '特质都在内在'}
          </div>
        </div>
      </div>

      {/* 五行 distribution */}
      <div className="mb-6">
        <div className="text-sm font-bold mb-3">五行分布</div>
        <div className="space-y-2">
          {(Object.entries(wuxingCount) as [WuXing, number][]).map(([wx, count]) => (
            <div key={wx} className="flex items-center gap-3">
              <div className="w-6 text-center text-sm font-bold" style={{ color: WUXING_COLORS[wx] }}>{wx}</div>
              <div className="flex-1 bg-[--color-bg] rounded-full h-5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                  style={{
                    width: `${Math.max(8, (count / maxCount) * 100)}%`,
                    backgroundColor: WUXING_COLORS[wx],
                    opacity: 0.75,
                  }}
                >
                  <span className="text-xs font-bold text-white/80">{count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-[--color-text-muted] mt-2">
          主导：{dominant}
          {missing.length > 0 && ` · 缺：${missing.join('、')}`}
        </div>
      </div>

      {/* 十神 map */}
      <div className="mb-6">
        <div className="text-sm font-bold mb-3">十神排列</div>
        <div className="space-y-1.5">
          {analysis.shiShenMap.map(e => (
            <div key={e.position} className="flex items-center gap-3 text-sm">
              <span className="text-[--color-text-muted] w-10">{e.position}</span>
              <span className="font-bold w-6" style={{ color: WUXING_COLORS[getTianGan(e.stemName).wuxing] }}>
                {e.stemName}
              </span>
              <span className="text-[--color-text-muted]">→</span>
              <span className="text-[--color-accent] font-bold">{e.shishen}</span>
              <span className="text-xs text-[--color-text-muted]">{SHISHEN_INFO[e.shishen].description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Narrative interpretation */}
      <div className="mb-6 bg-[--color-bg] rounded-lg p-5 border border-[--color-border]">
        <div className="text-sm font-bold mb-3 text-[--color-gold]">简要解读</div>
        <p className="text-sm text-[--color-text-secondary] leading-relaxed">
          {analysis.dayMaster}（{dm.wuxing}）日主，
          {analysis.strength.level === '极弱' || analysis.strength.level === '偏弱'
            ? `身弱，${dm.wuxing}的力量在这个盘里得不到足够支持`
            : analysis.strength.level === '中和'
              ? '身中和，力量不偏不倚'
              : `身强，${dm.wuxing}的力量在盘里占据优势`
          }。

          月柱主题是<strong className="text-[--color-accent]">{analysis.monthTheme.shishen}</strong>
          （{SHISHEN_INFO[analysis.monthTheme.shishen].description}），
          这意味着 ta 的人生核心议题是「{THEME_CORE[analysis.monthTheme.shishen] || ''}」。

          {missing.length > 0
            ? `命局缺${missing.join('、')}，这是 ta 人生中需要补的功课。`
            : '五行俱全，格局相对均衡。'
          }

          {analysis.touChou.length > 0
            ? `${analysis.touChou.map(t => t.shishen).join('、')}透出，是别人第一眼就能看到的特质。`
            : '没有十神透出，ta 的内在特质不容易被外人直接看到。'
          }
        </p>
      </div>

      <button onClick={onReset} className="btn-primary w-full text-lg py-3">
        再来一局
      </button>
    </div>
  );
}
