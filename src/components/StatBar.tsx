import type { DimensionKey } from '../types/game';

const DIM_CONFIG: Record<DimensionKey, { label: string; color: string; icon: string }> = {
  Coherence: { label: '凝聚', color: 'bg-coherence', icon: '◈' },
  Depth: { label: '深度', color: 'bg-depth', icon: '◉' },
  Regeneration: { label: '再生', color: 'bg-regeneration', icon: '❋' },
  Transmission: { label: '传递', color: 'bg-transmission', icon: '◎' },
  Body: { label: '身体', color: 'bg-body', icon: '♡' },
  Shadow: { label: '暗影', color: 'bg-shadow-dim', icon: '◐' },
};

interface StatBarProps {
  dimension: DimensionKey;
  value: number;
  prevValue?: number;
}

export default function StatBar({ dimension, value, prevValue }: StatBarProps) {
  const config = DIM_CONFIG[dimension];
  const delta = prevValue !== undefined ? value - prevValue : 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-5 text-center opacity-70">{config.icon}</span>
      <span className="w-10 text-text-secondary text-xs">{config.label}</span>
      <div className="flex-1 h-2 bg-bg-hover rounded-full overflow-hidden">
        <div
          className={`h-full ${config.color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs tabular-nums">{value}</span>
      {delta !== 0 && (
        <span
          className={`w-8 text-xs font-mono ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}
        >
          {delta > 0 ? '+' : ''}{delta}
        </span>
      )}
    </div>
  );
}
