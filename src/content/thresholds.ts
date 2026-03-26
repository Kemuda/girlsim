// ============================================================
// 阈值事件（命运卡）— 在人生阶段转换时随机触发
// ============================================================
// 四种类型：Disruption(打断) / Opening(契机) / Mirror(镜像) / Ghost(幽灵)
// ============================================================

import type { ThresholdCard } from '../types/game';

export const THRESHOLD_CARDS: ThresholdCard[] = [
  // ── Disruption 打断 ────────────────────────────────────────

  {
    id: 'disruption-loss',
    category: 'Disruption',
    title: '突然的失去',
    text: '一通电话。一个你爱的人离开了。世界在一秒之内改变了形状，而你发现自己并没有准备好——没有人真的准备好过。',
    choices: [
      {
        text: '让自己崩溃，该哭的时候就哭',
        delta: { Depth: 8, Regeneration: 5, Shadow: 5, Coherence: -5 },
      },
      {
        text: '撑住，因为还有其他人需要你',
        delta: { Coherence: 6, Transmission: 4, Shadow: 6, Body: -3 },
      },
      {
        text: '独自去了你们常去的地方，坐了一整天',
        delta: { Depth: 10, Shadow: 5, Body: -2 },
      },
    ],
  },
  {
    id: 'disruption-betrayal',
    category: 'Disruption',
    title: '信任的裂痕',
    text: '你信任的人做了一件你无法理解的事。不是什么惊天大事，但足以让你开始怀疑自己的判断力。夜里你反复想：我是不是从一开始就看错了？',
    choices: [
      {
        text: '直接面对对方，哪怕结果是决裂',
        delta: { Coherence: 8, Shadow: 4, Transmission: -4 },
      },
      {
        text: '选择原谅，但在心里画了一条线',
        delta: { Depth: 6, Shadow: 5, Transmission: 2 },
      },
      {
        text: '和第三个你信任的人聊聊，听听不同的声音',
        delta: { Transmission: 7, Depth: 4, Regeneration: 3 },
      },
    ],
  },

  // ── Opening 契机 ───────────────────────────────────────────

  {
    id: 'opening-encounter',
    category: 'Opening',
    title: '意外的相遇',
    text: '在一个你完全没有预期的场合，你遇到了一个人。你们聊了很久。分开的时候你发现，你说了一些从来没跟任何人说过的话。',
    choices: [
      {
        text: '主动要了联系方式，想继续这段对话',
        delta: { Transmission: 8, Regeneration: 5 },
      },
      {
        text: '没有留联系方式，但把这个夜晚记住了',
        delta: { Depth: 8, Shadow: -2 },
      },
      {
        text: '之后给好朋友讲了这件事，她说"你笑得不一样了"',
        delta: { Transmission: 5, Regeneration: 5, Coherence: 3 },
      },
    ],
  },
  {
    id: 'opening-discovery',
    category: 'Opening',
    title: '深夜顿悟',
    text: '读一本书，听一首歌，或者只是看窗外的雨——忽然之间，很多以前想不通的事情串在一起了。你说不清楚具体悟到了什么，但身体感到一种前所未有的轻盈。',
    choices: [
      {
        text: '连夜写下来，怕明天就忘了',
        delta: { Depth: 10, Coherence: 4 },
      },
      {
        text: '什么都不做，就让这种感觉存在着',
        delta: { Regeneration: 7, Depth: 5, Shadow: -3 },
      },
      {
        text: '第二天开始做出改变——从一件小事开始',
        delta: { Coherence: 6, Body: 4, Regeneration: 4 },
      },
    ],
  },

  // ── Mirror 镜像 ────────────────────────────────────────────

  {
    id: 'mirror-feedback',
    category: 'Mirror',
    title: '别人眼中的你',
    text: '有人对你说了一句话，简短却尖锐。它刺痛了你——不是因为不对，而恰恰因为太准了。你在心里反驳了很久，最后安静下来。',
    choices: [
      {
        text: '承认那句话是对的，虽然很不舒服',
        delta: { Depth: 8, Shadow: 5, Coherence: -2 },
      },
      {
        text: '把它当作动力去改变',
        delta: { Coherence: 7, Body: 3, Shadow: 2 },
      },
      {
        text: '选择放下——你不需要被每个人理解',
        delta: { Regeneration: 6, Depth: 4, Shadow: -2 },
      },
    ],
  },

  // ── Ghost 幽灵 ─────────────────────────────────────────────

  {
    id: 'ghost-dream',
    category: 'Ghost',
    title: '梦中的另一个自己',
    text: '你做了一个梦。梦里的你选了另一条路——没有读那个专业，或者嫁了另一个人，或者去了另一个城市。醒来时枕头是湿的，你不知道是遗憾还是释然。',
    choices: [
      {
        text: '告诉自己：那条路也不一定更好',
        delta: { Coherence: 6, Shadow: -3, Regeneration: 4 },
      },
      {
        text: '允许自己悲伤片刻，为那个没有活出的自己',
        delta: { Depth: 8, Shadow: 5 },
      },
      {
        text: '想想现在的路上得到的一切，感到感恩',
        delta: { Regeneration: 7, Transmission: 4, Shadow: -2 },
      },
    ],
  },
];
