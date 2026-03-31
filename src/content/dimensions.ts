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
    label: 'Will',
    icon: '◈',
    color: 'bg-coherence',
    description: 'Direction & willpower — you know where you\'re going',
  },
  Depth: {
    label: 'Depth',
    icon: '◉',
    color: 'bg-depth',
    description: 'Inner richness — you see what others can\'t',
  },
  Regeneration: {
    label: 'Grit',
    icon: '❋',
    color: 'bg-regeneration',
    description: 'Resilience — no matter how long the winter, you bloom again',
  },
  Transmission: {
    label: 'Reach',
    icon: '◎',
    color: 'bg-transmission',
    description: 'Connection — your ripples travel further than you know',
  },
  Body: {
    label: 'Body',
    icon: '♡',
    color: 'bg-body',
    description: 'Embodied wisdom — take care of yourself first',
  },
  Shadow: {
    label: 'Shadow',
    icon: '◐',
    color: 'bg-shadow-dim',
    description: 'The suppressed — what you didn\'t say didn\'t disappear',
  },
};
