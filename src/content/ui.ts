// ============================================================
// UI 文案 — 所有界面上显示的文字
// ============================================================

export const UI_TEXT = {
  // ── 开始页 ──
  startScreen: {
    title: '她的一生',
    subtitle: 'GirlSim',
    intro: [
      '这是一个关于选择的故事。',
      '你将经历一个女性的一生——从童年到暮年，从院子里的小鸟到最后一个夏天的午后。',
      '每一个选择都会塑造你的六个内在维度：凝聚、深度、再生、传递、身体、暗影。没有正确答案。只有你的答案。',
    ],
    startButton: '开始旅程',
    tagline: '七个人生阶段 · 十四个关键时刻 · 无数种可能',
  },

  // ── 游戏中 ──
  gameScreen: {
    choiceLabels: ['一', '二', '三'],
    loadingText: '命运正在编织...',
    continueButton: '继续 →',
    choiceCounter: (n: number) => `已做出 ${n} 个选择`,
    thresholdLabel: '命运事件',
    statPanelTitle: '内在维度',
  },

  // ── 结局页 ──
  endScreen: {
    chapterLabel: '她的一生 · 终章',
    reviewTitle: '旅程回顾',
    totalChoices: (n: number) => `共做出 ${n} 个选择`,
    topDimension: '最突出的维度',
    shadowValue: '暗影值',
    keyChoicesTitle: '关键选择',
    moreChoices: (n: number) => `...还有 ${n} 个选择`,
    restartButton: '重新开始',
    restartHint: '每一次重来，都是不同的人生',
  },
} as const;
