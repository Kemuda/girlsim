import type { CharacterState, DimensionKey } from '../types/game';
import { UI_TEXT } from '../content';
import StatBar from './StatBar';

interface StatPanelProps {
  state: CharacterState;
  prevState?: CharacterState;
}

const DIMENSIONS: DimensionKey[] = [
  'Coherence',
  'Depth',
  'Regeneration',
  'Transmission',
  'Body',
  'Shadow',
];

export default function StatPanel({ state, prevState }: StatPanelProps) {
  return (
    <div className="bg-bg-card rounded-lg p-4 space-y-2">
      <h3 className="text-xs text-text-secondary uppercase tracking-wider mb-3">
        {UI_TEXT.gameScreen.statPanelTitle}
      </h3>
      {DIMENSIONS.map((dim) => (
        <StatBar
          key={dim}
          dimension={dim}
          value={state[dim]}
          prevValue={prevState?.[dim]}
        />
      ))}
    </div>
  );
}
