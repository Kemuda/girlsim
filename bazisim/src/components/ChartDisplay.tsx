import type { BaZiChart, Pillar } from '../engine/chart.ts';
import { WUXING_COLORS } from '../engine/wuxing.ts';
import type { WuXing } from '../engine/wuxing.ts';

function WuXingDot({ wx, size = 8 }: { wx: WuXing; size?: number }) {
  return (
    <span
      className="inline-block rounded-full"
      style={{ width: size, height: size, backgroundColor: WUXING_COLORS[wx] }}
    />
  );
}

function PillarCol({ label, pillar, highlight, delay }: {
  label: string;
  pillar: Pillar;
  highlight?: boolean;
  delay: number;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 animate-slide-up ${highlight ? 'relative' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-xs tracking-widest text-[--color-text-muted] mb-2">{label}</div>

      {/* 天干 */}
      <div
        className={`text-3xl font-bold w-14 h-14 flex items-center justify-center rounded-lg transition-all ${
          highlight ? 'animate-pulse-glow ring-1 ring-[--color-accent]/50' : ''
        }`}
        style={{
          color: WUXING_COLORS[pillar.stem.wuxing],
          background: `${WUXING_COLORS[pillar.stem.wuxing]}12`,
        }}
      >
        {pillar.stem.name}
      </div>
      <div className="flex items-center gap-1 text-xs text-[--color-text-muted]">
        <WuXingDot wx={pillar.stem.wuxing} size={6} />
        <span>{pillar.stem.wuxing}{pillar.stem.yinyang}</span>
      </div>

      {/* 分隔线 */}
      <div className="w-8 h-px bg-[--color-border] my-2" />

      {/* 地支 */}
      <div
        className="text-3xl font-bold w-14 h-14 flex items-center justify-center rounded-lg"
        style={{
          color: WUXING_COLORS[pillar.branch.wuxing],
          background: `${WUXING_COLORS[pillar.branch.wuxing]}12`,
        }}
      >
        {pillar.branch.name}
      </div>
      <div className="flex items-center gap-1 text-xs text-[--color-text-muted]">
        <WuXingDot wx={pillar.branch.wuxing} size={6} />
        <span>{pillar.branch.wuxing}{pillar.branch.yinyang}</span>
      </div>

      {/* 藏干 */}
      <div className="mt-2 flex gap-1">
        {pillar.branch.canggan.map((c, i) => (
          <span
            key={i}
            className="text-xs px-1.5 py-0.5 rounded bg-[--color-surface-light] text-[--color-text-secondary]"
            title={`${c.weight === 'main' ? '主气' : c.weight === 'middle' ? '中气' : '余气'}`}
          >
            {c.name}
          </span>
        ))}
      </div>

      {highlight && (
        <div className="mt-1 text-xs text-[--color-accent] font-bold">日主</div>
      )}
    </div>
  );
}

export default function ChartDisplay({ chart }: { chart: BaZiChart }) {
  return (
    <div className="card mb-6">
      <div className="flex justify-center gap-8 sm:gap-12">
        <PillarCol label="年" pillar={chart.year} delay={0.1} />
        <PillarCol label="月" pillar={chart.month} delay={0.2} />
        <PillarCol label="日" pillar={chart.day} highlight delay={0.3} />
        <PillarCol label="时" pillar={chart.hour} delay={0.4} />
      </div>
    </div>
  );
}
