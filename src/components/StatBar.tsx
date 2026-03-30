import { useState } from 'react';
import type { DimensionKey } from '../types/game';
import { DIMENSION_DISPLAY } from '../content';

interface StatBarProps {
  dimension: DimensionKey;
  value: number;
  prevValue?: number;
}

export default function StatBar({ dimension, value, prevValue }: StatBarProps) {
  const config = DIMENSION_DISPLAY[dimension];
  const delta = prevValue !== undefined ? value - prevValue : 0;
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className="flex items-center gap-2 text-sm cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="w-5 text-center opacity-70">{config.icon}</span>
        <span className="w-6 text-text-secondary text-xs">{config.label}</span>
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
      {expanded && (
        <p className="text-xs text-text-secondary/60 ml-7 mt-1 animate-fade-in">
          {config.description}
        </p>
      )}
    </div>
  );
}
