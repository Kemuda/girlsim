import type { BaZiChart } from '../engine/chart.ts';
import type { Pillar } from '../engine/chart.ts';
import { WUXING_COLORS } from '../engine/wuxing.ts';

function PillarCol({ label, pillar, highlight }: { label: string; pillar: Pillar; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs text-[--color-text-muted]">{label}</div>
      <div
        className={`text-2xl font-bold px-3 py-2 rounded ${highlight ? 'ring-2 ring-[--color-accent]' : ''}`}
        style={{ color: WUXING_COLORS[pillar.stem.wuxing] }}
      >
        {pillar.stem.name}
      </div>
      <div className="text-xs text-[--color-text-muted]">{pillar.stem.wuxing} {pillar.stem.yinyang}</div>
      <div className="w-full h-px bg-[--color-surface-light] my-1" />
      <div
        className="text-2xl font-bold px-3 py-2 rounded"
        style={{ color: WUXING_COLORS[pillar.branch.wuxing] }}
      >
        {pillar.branch.name}
      </div>
      <div className="text-xs text-[--color-text-muted]">{pillar.branch.wuxing} {pillar.branch.yinyang}</div>
      <div className="text-xs text-[--color-text-muted] mt-1">
        藏：{pillar.branch.canggan.map(c => c.name).join(' ')}
      </div>
    </div>
  );
}

export default function ChartDisplay({ chart }: { chart: BaZiChart }) {
  return (
    <div className="bg-[--color-surface] rounded-lg p-6 mb-6">
      <div className="grid grid-cols-4 gap-6 text-center">
        <PillarCol label="年柱" pillar={chart.year} />
        <PillarCol label="月柱" pillar={chart.month} />
        <PillarCol label="日柱" pillar={chart.day} highlight />
        <PillarCol label="时柱" pillar={chart.hour} />
      </div>
      <div className="text-center mt-3 text-xs text-[--color-text-muted]">
        日主 = 日柱天干（红框标记）
      </div>
    </div>
  );
}
