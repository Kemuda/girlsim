// 千寻的命运卡 — Fate cards specific to Chihiro's life themes
// Triggered at stage transitions (40% chance, same as main game)

import type { ThresholdCard } from '../../types/game';

export const CHIHIRO_THRESHOLDS: ThresholdCard[] = [
  {
    id: 'ch-th-name',
    category: 'Ghost',
    title: '有人叫了她的名字',
    text: '你在嘈杂的地方，有人穿过人群叫了一个名字。不是你的名字，但你回头了。\n\n你站在那里想：如果有人把你的名字拿走了，你还知道你是谁吗？',
    choices: [
      { text: '我当然知道我是谁——我不需要名字来证明', delta: { Coherence: 8, Shadow: -4 }, shishenTag: '七杀' },
      { text: '我不确定。名字是很重要的东西', delta: { Depth: 9, Shadow: 3 }, shishenTag: '偏印' },
      { text: '名字是别人叫我的。我是我的选择', delta: { Coherence: 6, Depth: 5, Shadow: -3 }, shishenTag: '食神' },
    ],
  },

  {
    id: 'ch-th-river',
    category: 'Mirror',
    title: '河',
    text: '你做了一个梦，或者不是梦——你站在一条宽到看不见对岸的河边。\n\n水很深。但不危险。你知道对岸有什么，你只是看不见。',
    choices: [
      { text: '跳进去，游过去看', delta: { Coherence: 7, Body: -5, Regeneration: 3 }, shishenTag: '偏财' },
      { text: '等在岸边，看看能不能有船来', delta: { Transmission: 5, Depth: 4 }, shishenTag: '正印' },
      { text: '沿着河岸走，也许能找到渡口', delta: { Regeneration: 6, Coherence: 4, Depth: 3 }, shishenTag: '偏印' },
    ],
  },

  {
    id: 'ch-th-contract',
    category: 'Disruption',
    title: '合同',
    text: '有人给你一份合同，让你签名。\n\n条款写得密密麻麻，你读不完。对方说：都是标准条款，大家都这么签的。\n\n你的笔悬在纸上。',
    choices: [
      { text: '要求时间，把每一条都读完再签', delta: { Coherence: 8, Body: -3 }, shishenTag: '七杀' },
      { text: '签了，相信对方说的是真的', delta: { Shadow: 6, Body: 4 }, shishenTag: '正官' },
      { text: '"我需要让律师看一下。"', delta: { Coherence: 6, Transmission: 3, Shadow: -3 }, shishenTag: '七杀' },
    ],
  },

  {
    id: 'ch-th-memory',
    category: 'Opening',
    title: '那段记忆',
    text: '你突然想起了一件很久以前的事。不是重要的事，就是一个下午，一个人，一句话。\n\n你不知道为什么今天想起来了。但它就在那里，很清楚，好像刚刚发生过。',
    choices: [
      { text: '坐下来，让自己好好想这件事', delta: { Depth: 9, Shadow: -5, Regeneration: 3 }, shishenTag: '偏印' },
      { text: '联系那个人，告诉她你今天想起了她', delta: { Transmission: 8, Shadow: -4 }, shishenTag: '食神' },
      { text: '继续做正在做的事，晚点再想', delta: { Body: 5, Shadow: 3 }, shishenTag: '正官' },
    ],
  },
];
