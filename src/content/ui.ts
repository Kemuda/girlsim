// ============================================================
// UI text — all interface strings
// ============================================================

export const UI_TEXT = {
  // ── Start screen ──
  startScreen: {
    title: 'Her Life',
    subtitle: 'GirlSim',
    intro: [
      'This is a story about choices.',
      'You\'ll live a woman\'s entire life — from childhood to old age, from a bird in the courtyard to a final summer afternoon.',
      'Every choice shapes six inner dimensions: Will, Depth, Grit, Reach, Body, Shadow. There are no right answers. Only yours.',
    ],
    startButton: 'Begin',
    tagline: 'Seven life stages · Fourteen key moments · Infinite possibilities',
    // Shadow line
    shadowTitle: 'You think you\'re making the right choices.',
    shadowDesc: 'Five scenes. Three minutes.',
    shadowButton: 'Start',
    fullButton: 'Experience a woman\'s full life →',
  },

  // ── Game screen ──
  gameScreen: {
    choiceLabels: ['A', 'B', 'C'],
    loadingText: 'Fate is weaving...',
    continueButton: 'Continue →',
    choiceCounter: (n: number) => `${n} choice${n === 1 ? '' : 's'} made`,
    thresholdLabel: 'Fate Event',
    statPanelTitle: 'Inner Dimensions',
  },

  // ── End screen ──
  endScreen: {
    chapterLabel: 'Her Life · Finale',
    reviewTitle: 'Journey Review',
    totalChoices: (n: number) => `${n} choice${n === 1 ? '' : 's'} made`,
    topDimension: 'Strongest dimension',
    shadowValue: 'Shadow',
    keyChoicesTitle: 'Key Choices',
    moreChoices: (n: number) => `...and ${n} more`,
    restartButton: 'Start Over',
    restartHint: 'Every replay is a different life',
  },
} as const;
