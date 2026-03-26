import type { CharacterState, DimensionKey } from '../types/game';
import { ENDINGS, type EndingData } from '../content';

export type { EndingData };
export { ENDINGS };

export function determineEnding(state: CharacterState): EndingData {
  const dims: DimensionKey[] = ['Coherence', 'Depth', 'Regeneration', 'Transmission', 'Body', 'Shadow'];
  let highest: DimensionKey = 'Coherence';
  let highestVal = 0;
  for (const d of dims) {
    if (state[d] > highestVal) {
      highestVal = state[d];
      highest = d;
    }
  }

  // Try specific endings first (skip the fallback)
  for (let i = 0; i < ENDINGS.length - 1; i++) {
    const e = ENDINGS[i];
    if (e.requiredHighest === highest && highestVal >= e.minValue) {
      return e;
    }
  }

  // Fallback: balanced ending
  return ENDINGS[ENDINGS.length - 1];
}
