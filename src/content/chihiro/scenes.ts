// 千寻的十四幕 — Chihiro's 14 life scenes
// 7 life stages × 2 scenes each
// Each choice tagged with a 十神 direction for ending calculation

import type { Scene } from '../../types/game';

export const CHIHIRO_SCENES: Scene[] = [

  // ── Stage 0: 童年 (0–12) — 丙申大运 · 正财 · 平稳 ────────────

  {
    id: 'ch-girlhood-1',
    turn: '童年',
    turnIndex: 0,
    title: '那只不知道从哪里来的猫',
    text: '七岁。院子里出现了一只橘猫，不知道是谁家的，也不知道从哪里来。它每天蹲在墙角，看你。你妈妈说不要喂，喂了就赶不走了。',
    choices: [
      { text: '悄悄带饭出去喂它', delta: { Transmission: 6, Depth: 4, Shadow: 2 }, shishenTag: '食神' },
      { text: '假装没看见，但每天经过都多看几眼', delta: { Depth: 8, Shadow: 3 }, shishenTag: '偏印' },
      { text: '听妈妈的话，不喂', delta: { Coherence: 5, Body: 3 }, shishenTag: '正印' },
    ],
  },

  {
    id: 'ch-girlhood-2',
    turn: '童年',
    turnIndex: 0,
    title: '隧道',
    text: '十岁。搬家的路上，爸爸开车拐错了方向，路的尽头是一条废弃的隧道。里面有风吹出来，带着一股奇怪的气味，像是焦糖，又像是旧木头。爸爸说进去看看。',
    choices: [
      { text: '拉住爸爸的手，跟他一起走进去', delta: { Coherence: 5, Transmission: 5 }, shishenTag: '正印' },
      { text: '站在入口不动，等他们先进', delta: { Body: 4, Shadow: 5, Depth: 3 }, shishenTag: '偏印' },
      { text: '鼓起勇气，第一个迈进去', delta: { Coherence: 7, Body: 3, Regeneration: 2 }, shishenTag: '偏财' },
    ],
  },

  // ── Stage 1: 青春 (12–18) — 丁酉大运 · 偏财 · 冒险 ─────────────

  {
    id: 'ch-youth-1',
    turn: '青春',
    turnIndex: 1,
    title: '那扇不该打开的门',
    text: '十二岁。那个奇怪的夏天改变了一切——你在一个不属于人类的地方活了下来，靠的不是聪明，是某种你自己都说不清楚的东西。\n\n现在你回来了。同学们不知道发生了什么。他们问你暑假去哪里了，你说：去了一个地方。\n\n那个地方的记忆开始模糊。你知道你必须记住某件事，但不知道是什么。',
    choices: [
      { text: '把那段经历写成日记，不管多荒唐', delta: { Depth: 8, Coherence: 4 }, shishenTag: '食神' },
      { text: '告诉最好的朋友——即使她不信', delta: { Transmission: 7, Shadow: -3 }, shishenTag: '食神' },
      { text: '什么都不说，把那段记忆锁起来', delta: { Shadow: 8, Depth: 4, Body: -3 }, shishenTag: '偏印' },
    ],
  },

  {
    id: 'ch-youth-2',
    turn: '青春',
    turnIndex: 1,
    title: '她们开始排挤她',
    text: '十五岁。班上的女生们开始排挤一个叫宋音的同学。原因很小——她的午饭盒太大声了。你看着这件事发生，你知道宋音什么都没做错。\n\n你也知道，如果你替她说话，下一个被排挤的可能是你。',
    choices: [
      { text: '在食堂走过去坐在宋音旁边，假装什么事都没有', delta: { Transmission: 8, Regeneration: 4, Shadow: -4 }, shishenTag: '食神' },
      { text: '正面质问那些排挤她的人', delta: { Coherence: 7, Transmission: 5, Body: -4 }, shishenTag: '七杀' },
      { text: '什么也不做，低头吃饭', delta: { Shadow: 9, Body: 3, Depth: -2 }, shishenTag: '正印' },
    ],
  },

  // ── Stage 2: 初入社会 (18–28) — 戊戌大运 · 正官 · 压力 ─────────

  {
    id: 'ch-firstworld-1',
    turn: '初入社会',
    turnIndex: 2,
    title: '实习期最后一天',
    text: '二十三岁。实习快结束了。你的主管叫你去他办公室，说你做得不错，但有一个项目需要你加班完成，没有加班费。\n\n你的合同上写的是朝九晚六。',
    choices: [
      { text: '答应加班，但在邮件里写清楚这是义务劳动', delta: { Coherence: 6, Transmission: 4, Shadow: 3 }, shishenTag: '七杀' },
      { text: '直接问他加班费的问题', delta: { Coherence: 8, Body: -3, Shadow: 2 }, shishenTag: '七杀' },
      { text: '什么都不说，答应了', delta: { Body: -5, Shadow: 7, Regeneration: 3 }, shishenTag: '正官' },
    ],
  },

  {
    id: 'ch-firstworld-2',
    turn: '初入社会',
    turnIndex: 2,
    title: '他问你叫什么名字',
    text: '二十五岁。你换了工作。有一个同事，聪明、温柔，知道你喜欢什么书。\n\n他有一天问你：你真正想做什么？不是这份工作，是你自己想做的事。\n\n你想了很久，发现自己不知道答案。',
    choices: [
      { text: '说出那个你一直藏着的答案', delta: { Depth: 8, Coherence: 5, Shadow: -4 }, shishenTag: '食神' },
      { text: '把话题转开，说工作也挺好', delta: { Shadow: 6, Body: 2 }, shishenTag: '正官' },
      { text: '"我也在找。你呢？"——把问题还给他', delta: { Transmission: 7, Depth: 4 }, shishenTag: '食神' },
    ],
  },

  // ── Stage 3: 而立 (28–38) — 己亥大运 · 七杀 · 双重压力 ──────────

  {
    id: 'ch-contraction-1',
    turn: '而立',
    turnIndex: 3,
    title: '她妈妈打来电话',
    text: '三十一岁。你妈妈的电话来了。她的声音有点奇怪。\n\n你爸爸生病了，不严重，但需要照顾。她说你是独生子女，问你打不打算回去。\n\n你刚刚升职，手上有一个重要项目，再过六个月就能独当一面。',
    choices: [
      { text: '申请远程工作，两边都撑着', delta: { Coherence: 5, Body: -5, Regeneration: -3 }, shishenTag: '七杀' },
      { text: '先把项目交出去，回去陪爸妈', delta: { Transmission: 7, Coherence: -4, Shadow: 3 }, shishenTag: '正印' },
      { text: '跟妈妈说实话：你需要再等六个月', delta: { Coherence: 7, Transmission: -3, Shadow: 5 }, shishenTag: '七杀' },
    ],
  },

  {
    id: 'ch-contraction-2',
    turn: '而立',
    turnIndex: 3,
    title: '她想起了那条河',
    text: '三十五岁。你有一个梦，反复做。\n\n你站在一条很宽的河边，对岸有什么东西在等你，但你不记得是什么了。河水是黑的，但不危险。\n\n你醒来，枕头湿了一块。不是眼泪，是汗。',
    choices: [
      { text: '开始写作——把那个梦写下来，管它是不是故事', delta: { Depth: 9, Shadow: -5, Coherence: 3 }, shishenTag: '食神' },
      { text: '去看心理咨询师', delta: { Regeneration: 7, Shadow: -4 }, shishenTag: '正印' },
      { text: '不去理它，继续上班', delta: { Shadow: 8, Body: -3 }, shishenTag: '正官' },
    ],
  },

  // ── Stage 4: 中年 (38–50) — 庚子大运 · 正印 · 被滋养 ─────────────

  {
    id: 'ch-reckoning-1',
    turn: '中年',
    turnIndex: 4,
    title: '老师',
    text: '四十一岁。你遇到了一个人，她比你年长二十岁，是你工作里的前辈。她从不问你做了什么，只问你：你觉得对不对？\n\n没人这样问过你。',
    choices: [
      { text: '把那段你说不清楚的直觉告诉她', delta: { Depth: 7, Transmission: 5, Shadow: -4 }, shishenTag: '偏印' },
      { text: '"我不知道，所以才来问你。"', delta: { Regeneration: 6, Coherence: 4 }, shishenTag: '正印' },
      { text: '说一个听起来很合理的答案，而不是真话', delta: { Shadow: 6, Body: 2 }, shishenTag: '正官' },
    ],
  },

  {
    id: 'ch-reckoning-2',
    turn: '中年',
    turnIndex: 4,
    title: '她第一次教别人',
    text: '四十五岁。你带了一个刚入职的年轻人。她问你：你怎么知道什么是对的？\n\n你想了想，想到了某段很久以前的记忆——不是工作经验，是别的什么。',
    choices: [
      { text: '把那段说不清楚的经历，用自己的方式告诉她', delta: { Transmission: 9, Depth: 5, Shadow: -5 }, shishenTag: '食神' },
      { text: '给她一个方法，不给答案', delta: { Transmission: 7, Coherence: 4 }, shishenTag: '食神' },
      { text: '说：等你做够了，你就会知道', delta: { Shadow: 4, Body: 3 }, shishenTag: '正官' },
    ],
  },

  // ── Stage 5: 知天命 (50–65) — 辛丑大运 · 偏印 · 奇异智慧 ──────────

  {
    id: 'ch-secondwind-1',
    turn: '知天命',
    turnIndex: 5,
    title: '她不再解释了',
    text: '五十三岁。有一件事你相信了很多年，但很难说清楚是什么——某种关于人和人之间的事，某种关于承诺的感觉。\n\n你的同事们觉得你"有点奇怪"。你以前会解释。现在你不解释了。',
    choices: [
      { text: '把那件事写下来，给自己看', delta: { Depth: 9, Shadow: -6, Coherence: 4 }, shishenTag: '偏印' },
      { text: '找一个愿意听的人，认真说一次', delta: { Transmission: 8, Depth: 5 }, shishenTag: '食神' },
      { text: '继续不解释——有些东西不需要被理解', delta: { Body: 5, Depth: 5, Shadow: -3 }, shishenTag: '偏印' },
    ],
  },

  {
    id: 'ch-secondwind-2',
    turn: '知天命',
    turnIndex: 5,
    title: '白发',
    text: '五十八岁。你照镜子，看见鬓角有几根白发。\n\n你妈妈的头发也是这样变白的。你爸爸的也是。\n\n你站在那里想了很久，不是在想老了，是在想：她们活过的那些年，和我活过的这些年，是不是同一种东西？',
    choices: [
      { text: '打电话给妈妈，就说：我在想你', delta: { Transmission: 8, Depth: 4, Shadow: -4 }, shishenTag: '食神' },
      { text: '给自己煮一杯茶，坐着想完这件事', delta: { Depth: 8, Body: 5, Regeneration: 4 }, shishenTag: '偏印' },
      { text: '继续去上班，把这个念头留到晚上再想', delta: { Body: 4, Shadow: 3 }, shishenTag: '正官' },
    ],
  },

  // ── Stage 6: 晚年 (65+) — 壬寅大运 · 劫财 · 传递 ────────────────

  {
    id: 'ch-legacy-1',
    turn: '晚年',
    turnIndex: 6,
    title: '她的名字',
    text: '六十七岁。你的外孙女问你：你叫什么名字？\n\n不是问你的姓，是问你的名。那个你自己取的、或者你选择留下的那个名字。\n\n你顿了一下。那是一个很老的问题了。',
    choices: [
      { text: '告诉她你的名字，然后告诉她为什么是这个', delta: { Transmission: 9, Coherence: 5, Shadow: -6 }, shishenTag: '食神' },
      { text: '说：名字是别人给的。但你叫什么，是你自己决定的', delta: { Depth: 8, Coherence: 6 }, shishenTag: '偏印' },
      { text: '叫她去玩，等她大了再说', delta: { Shadow: 4, Body: 3 }, shishenTag: '正官' },
    ],
  },

  {
    id: 'ch-legacy-2',
    turn: '晚年',
    turnIndex: 6,
    title: '最后一次回去',
    text: '七十二岁。你做了最后一次那个梦。\n\n这次，河对岸有人在等你，你看清楚了他的脸。\n\n你知道你现在不必过去，但有一天你会。你不害怕。你只是想，等那一天，我要把这七十年好好说给他听。',
    choices: [
      { text: '把这个梦写进日记里的最后一页', delta: { Depth: 8, Coherence: 5, Regeneration: 4, Shadow: -8 }, shishenTag: '食神' },
      { text: '告诉最近的人——你做了一个好梦', delta: { Transmission: 9, Shadow: -6 }, shishenTag: '食神' },
      { text: '什么都不说，只是微笑', delta: { Body: 6, Depth: 5, Shadow: -4 }, shishenTag: '偏印' },
    ],
  },
];
