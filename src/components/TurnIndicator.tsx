import { TURNS } from '../types/game';

interface TurnIndicatorProps {
  currentIndex: number;
}

export default function TurnIndicator({ currentIndex }: TurnIndicatorProps) {
  return (
    <div className="flex items-center gap-1">
      {TURNS.map((turn, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i < currentIndex
                ? 'bg-accent'
                : i === currentIndex
                  ? 'bg-accent animate-pulse-soft w-3 h-3'
                  : 'bg-bg-hover'
            }`}
            title={`${turn.name} (${turn.ageRange})`}
          />
          {i < TURNS.length - 1 && (
            <div
              className={`w-4 h-px mx-0.5 ${
                i < currentIndex ? 'bg-accent/50' : 'bg-bg-hover'
              }`}
            />
          )}
        </div>
      ))}
      <span className="ml-3 text-xs text-text-secondary">
        {TURNS[currentIndex]?.name} · {TURNS[currentIndex]?.ageRange}
      </span>
    </div>
  );
}
