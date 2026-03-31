// ============================================================
// Endings — 7 life endings based on highest dimension
// ============================================================

import type { DimensionKey } from '../types/game';

export interface EndingData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  requiredHighest: DimensionKey;
  minValue: number; // 0 = fallback ending
}

export const ENDINGS: EndingData[] = [
  {
    id: 'coherence-ending',
    requiredHighest: 'Coherence',
    minValue: 80,
    title: 'Iron Bones',
    subtitle: 'She never strayed from the direction she chose',
    description:
      'You spent a lifetime proving the power of will. Every choice pointed the same way. Every fall made you more certain. People call you "remarkable" — but only you know the weight you carried alone in those late nights. Your story will be remembered as a symbol of strength.',
  },
  {
    id: 'depth-ending',
    requiredHighest: 'Depth',
    minValue: 80,
    title: 'The Deep Well',
    subtitle: 'She lived in a dimension others couldn\'t see',
    description:
      'Your life was a long inward journey. You understood pain more than most — and beauty too. The words you wrote, the silences you gave, the things you noticed that no one else did — they left marks that won\'t fade. Your story is a well: still on the surface, an entire universe underneath.',
  },
  {
    id: 'regeneration-ending',
    requiredHighest: 'Regeneration',
    minValue: 80,
    title: 'Spring Grass',
    subtitle: 'She always bloomed from the ashes',
    description:
      'You fell many times, but every time you got back up — not because it didn\'t hurt, but because you believed life has a way of healing itself. There\'s a lightness in you, the kind only someone who\'s carried real weight can have. You taught the people around you the most important lesson: it\'s okay. It will pass.',
  },
  {
    id: 'transmission-ending',
    requiredHighest: 'Transmission',
    minValue: 80,
    title: 'Echo',
    subtitle: 'Her story continued in others',
    description:
      'You were never the person in the spotlight, but you touched more lives than you\'ll ever know. A sentence you once said, a hug you gave, a choice you made — those ripples traveled to places you can\'t see. Your legacy isn\'t anything tangible. It\'s a warmth.',
  },
  {
    id: 'body-ending',
    requiredHighest: 'Body',
    minValue: 80,
    title: 'Rooted',
    subtitle: 'She never forgot the body\'s wisdom',
    description:
      'You kept a conversation going with your body, all your life. When the world got too fast and too loud, you knew how to come back — to the breath, to the feeling of your feet on the ground. Your later years were more graceful than most, because you never treated yourself as a machine that needed to keep running.',
  },
  {
    id: 'shadow-high-ending',
    requiredHighest: 'Shadow',
    minValue: 60,
    title: 'Undercurrent',
    subtitle: 'She carried everything she never said',
    description:
      'There are things inside you that were never seen — words swallowed, tears held back, selves kept hidden. It\'s not that you weren\'t brave. It\'s that you bore more than anyone imagined. Your story is a requiem, for everyone who processed it all alone.',
  },
  {
    id: 'balanced-ending',
    requiredHighest: 'Coherence', // doesn't matter, this is the fallback
    minValue: 0,
    title: 'The River',
    subtitle: 'She didn\'t choose to become any one thing — so she became herself',
    description:
      'Your life had no great dramatic arc, but it had a lasting fullness. You cried, laughed, fell, got up. You weren\'t any single label — you were the sum of all those moments. Looking back, you see not a straight line but a river: rapids and still water, all flowing toward the sea.',
  },
];
