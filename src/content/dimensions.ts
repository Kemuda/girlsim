// ============================================================
// Dimension config — six inner dimensions
// ============================================================

import type { DimensionKey } from '../types/game';

export interface DimensionDisplay {
  label: string;
  icon: string;
  color: string; // Tailwind bg class
  description: string;
}

export const DIMENSION_DISPLAY: Record<DimensionKey, DimensionDisplay> = {
  Coherence: {
    label: 'Coherence',
    icon: '◈',
    color: 'bg-coherence',
    description: 'Knowing where you\'re going — and not letting go',
  },
  Depth: {
    label: 'Depth',
    icon: '◉',
    color: 'bg-depth',
    description: 'The richness of your inner world — seeing what others miss',
  },
  Regeneration: {
    label: 'Resilience',
    icon: '❋',
    color: 'bg-regeneration',
    description: 'The ability to come back — no matter how long the winter',
  },
  Transmission: {
    label: 'Reach',
    icon: '◎',
    color: 'bg-transmission',
    description: 'Your ripple effect on others — further than you\'ll ever know',
  },
  Body: {
    label: 'Body',
    icon: '♡',
    color: 'bg-body',
    description: 'Embodied wisdom — remembering you\'re not just a brain',
  },
  Shadow: {
    label: 'Shadow',
    icon: '◐',
    color: 'bg-shadow-dim',
    description: 'What you didn\'t say out loud — it didn\'t go away',
  },
};
