import type { CharacterState, DimensionKey } from '../types/game';
import { DIMENSION_DISPLAY } from '../content';

interface RadarChartProps {
  values: CharacterState;
  size?: number;
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

function polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function hexagonPoints(cx: number, cy: number, r: number): string {
  return DIMENSIONS.map((_, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    const p = polarToCartesian(cx, cy, r, angle);
    return `${p.x},${p.y}`;
  }).join(' ');
}

export default function RadarChart({ values, size = 200 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.36;
  const labelR = size * 0.46;

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const dataPoints = DIMENSIONS.map((dim, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    const r = (values[dim] / 100) * maxR;
    return polarToCartesian(cx, cy, r, angle);
  });

  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      style={{ maxWidth: size }}
      className="mx-auto"
    >
      {/* Grid lines */}
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={hexagonPoints(cx, cy, maxR * level)}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
        />
      ))}

      {/* Axis lines */}
      {DIMENSIONS.map((_, i) => {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const end = polarToCartesian(cx, cy, maxR, angle);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={dataPolygon}
        fill="rgba(127, 119, 221, 0.15)"
        stroke="rgba(127, 119, 221, 0.6)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="2.5"
          fill={COLORS[DIMENSIONS[i]]}
          opacity="0.9"
        />
      ))}

      {/* Labels */}
      {DIMENSIONS.map((dim, i) => {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const pos = polarToCartesian(cx, cy, labelR, angle);
        const display = DIMENSION_DISPLAY[dim];
        return (
          <text
            key={dim}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={COLORS[dim]}
            fontSize="9"
            fontFamily="inherit"
          >
            {display.icon} {display.label}
          </text>
        );
      })}
    </svg>
  );
}
