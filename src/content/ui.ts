// ============================================================
// UI text — all interface strings (Chinese)
// ============================================================

export const UI_TEXT = {
  // ── Start screen ──
  startScreen: {
    title: '这场游戏',
    subtitle: 'GirlSim',
    intro: [
      '这是一个关于选择的故事。',
      '你将活过一个女人的一生——从童年到晚年，从一只院子里的鸟到最后一个夏天的下午。',
      '每一个选择都会影响六个内在维度：志、幽、韧、渡、身、影。没有正确答案，只有你的答案。',
    ],
    startButton: '开始',
    tagline: '七个人生阶段 · 十四个关键时刻 · 无限可能',
    // Shadow line
    shadowTitle: '你以为自己在做正确的选择。',
    shadowDesc: '五个场景。三分钟。',
    shadowButton: '开始',
    fullButton: '体验一个女人的完整人生 →',
  },

  // ── Game screen ──
  gameScreen: {
    choiceLabels: ['A', 'B', 'C'],
    loadingText: '命运正在编织……',
    continueButton: '继续 →',
    choiceCounter: (n: number) => `已做出 ${n} 次选择`,
    thresholdLabel: '命运事件',
    statPanelTitle: '内在维度',
  },

  // ── End screen ──
  endScreen: {
    chapterLabel: '她的一生 · 终章',
    reviewTitle: '旅程回顾',
    totalChoices: (n: number) => `共做出 ${n} 次选择`,
    topDimension: '最高维度',
    shadowValue: '影',
    keyChoicesTitle: '关键选择',
    moreChoices: (n: number) => `……以及另外 ${n} 个`,
    restartButton: '重新开始',
    restartHint: '每一次重玩都是不同的人生',
  },
} as const;
