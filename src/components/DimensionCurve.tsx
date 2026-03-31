import type { CharacterState, DimensionKey } from '../types/game';
import { DIMENSION_DISPLAY } from '../content';

interface DimensionCurveProps {
  history: CharacterState[];
}

const DIMENSIONS: DimensionKey[] = [
  'Coherence', 'Depth', 'Regeneration', 'Transmission', 'Body', 'Shadow',
];

const COLORS: Record<DimensionKey, string> = {
  Coherence: '#7F77DD',
  Depth: '#1D9E75',
  Regeneration: '#D85A30',
  Transmission: '#378ADD',
  Body: '#D4537E',
  Shadow: '#888780',
};

export default function DimensionCurve({ history }: DimensionCurveProps) {
  if (history.length < 2) return null;

  const width = 360;
  const height = 180;
  const padX = 30;
  const padY = 20;
  const plotW = width - padX * 2;
  const plotH = height - padY * 2;

  const n = history.length;
  const stepX = plotW / (n - 1);

  function toPoints(dim: DimensionKey): string {
    return history
      .map((s, i) => {
        const x = padX + i * stepX;
        const y = padY + plotH - (s[dim] / 100) * plotH;
        return `${x},${y}`;
      })
      .join(' ');
  }

  return (
    <div className="space-y-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ maxWidth: width }}
        className="mx-auto"
      >
        {/* Y grid lines */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = padY + plotH - (v / 100) * plotH;
          return (
            <g key={v}>
              <line
                x1={padX} y1={y} x2={width - padX} y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.5"
              />
              <text
                x={padX - 6} y={y + 3}
                textAnchor="end"
                fill="rgba(255,255,255,0.2)"
                fontSize="7"
                fontFamily="inherit"
              >
                {v}
              </text>
            </g>
          );
        })}

        {/* Dimension lines */}
        {DIMENSIONS.map((dim) => (
          <polyline
            key={dim}
            points={toPoints(dim)}
            fill="none"
            stroke={COLORS[dim]}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
        ))}

        {/* End dots */}
        {DIMENSIONS.map((dim) => {
          const last = history[n - 1];
          const x = padX + (n - 1) * stepX;
          const y = padY + plotH - (last[dim] / 100) * plotH;
          return (
            <circle
              key={dim}
              cx={x} cy={y} r="2.5"
              fill={COLORS[dim]}
              opacity="0.9"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {DIMENSIONS.map((dim) => (
          <span key={dim} className="text-xs flex items-center gap-1">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[dim] }}
            />
            <span className="text-text-secondary/60">
              {DIMENSION_DISPLAY[dim].label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
