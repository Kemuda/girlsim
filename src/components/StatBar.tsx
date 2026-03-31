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
        <span className="shrink-0 w-4 text-center opacity-60 text-xs">{config.icon}</span>
        <span className="ui-text shrink-0 w-[4.5rem] text-text-secondary text-[11px] tracking-wide truncate">
          {config.label}
        </span>
        <div className="flex-1 min-w-0 h-1.5 bg-bg-hover rounded-full overflow-hidden">
          <div
            className={`h-full ${config.color} rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="ui-text shrink-0 w-7 text-right text-[11px] tabular-nums text-text-secondary/70">
          {value}
        </span>
        {delta !== 0 && (
          <span
            className={`ui-text shrink-0 w-7 text-[11px] tabular-nums ${delta > 0 ? 'text-green-400/80' : 'text-red-400/80'}`}
          >
            {delta > 0 ? '+' : ''}{delta}
          </span>
        )}
      </div>
      {expanded && (
        <p className="text-xs text-text-secondary/50 ml-6 pl-[4.5rem] mt-1 animate-fade-in leading-relaxed">
          {config.description}
        </p>
      )}
    </div>
  );
}
