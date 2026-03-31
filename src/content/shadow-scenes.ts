// ============================================================
// 暗影短线 — 5 个场景，针对 22-29 岁 high achievers
// ============================================================

import type { Scene } from '../types/game';

export const SHADOW_SCENES: Scene[] = [
  {
    id: 'shadow-late-night',
    turn: '深夜',
    turnIndex: 0,
    title: '凌晨两点半',
    text: '你在宿舍坐了六个小时。第三杯咖啡凉了，你已经把它当装饰品了。手机亮了——朋友发来消息："出来走走？感觉一百年没见了。" 你看了看 deck，看了看消息，看了看 deck。你在认真考虑把"下次吧"设成快捷回复。',
    choices: [
      {
        text: '"下次吧，这周实在不行"',
        delta: { Coherence: 7, Shadow: 5, Body: -3 },
      },
      {
        text: '合上电脑就走——活永远干不完',
        delta: { Transmission: 6, Regeneration: 4 },
      },
      {
        text: '回了句"好累"，什么也没去，直接躺下了',
        delta: { Body: 5, Depth: 4, Shadow: -2 },
      },
    ],
  },
  {
    id: 'shadow-feed',
    turn: '比较',
    turnIndex: 1,
    title: '那条动态',
    text: '睡前刷手机。一个同学发了条 LinkedIn："Excited to share that..." 底下全是🔥🔥🔥。往下滑——另一个同学，某个 top program 的 offer，"感恩一切遇见❤️"。再往下——订婚照。你锁了屏。打开了。又锁了。又打开了。这次打开的是外卖 app。',
    choices: [
      {
        text: '又打开了手机，开始改简历',
        delta: { Coherence: 7, Shadow: 5 },
      },
      {
        text: '给那个同学点了赞，打了句"太强了"，删了，又打了"Congrats!!"',
        delta: { Transmission: 5, Shadow: 4 },
      },
      {
        text: '给朋友发消息："我今天被 LinkedIn 暴击了"',
        delta: { Depth: 6, Transmission: 4, Shadow: -2 },
      },
    ],
  },
  {
    id: 'shadow-thirteen-hours',
    turn: '关系',
    turnIndex: 2,
    title: '十三个小时',
    text: '你们在一起快两年了。手机里最多的照片都是 ta。上个月你拿到了一个 offer，ta 也拿到了一个——在地球另一边。时差十三个小时。你们坐在学校旁边那家总去的咖啡馆。你的美式喝完了，ta 的燕麦拿铁还没动。最后 ta 说了句 "we\'ll figure it out"。你说 "嗯"。你们都知道这句话的翻译是"先不想了"。',
    choices: [
      {
        text: '"我们都先走自己的路吧"',
        delta: { Coherence: 6, Shadow: 5, Transmission: -2 },
      },
      {
        text: '"要不……我可以去你那边看看机会"',
        delta: { Transmission: 7, Shadow: 3, Coherence: -2 },
      },
      {
        text: '"我也不知道。但我不想装没事"',
        delta: { Depth: 6, Transmission: 4, Shadow: -2 },
      },
    ],
  },
  {
    id: 'shadow-offer',
    turn: '选择',
    turnIndex: 3,
    title: '那个 offer',
    text: '一个很好的机会。Title 好听，package 不错，发 LinkedIn 绝对收割一波 congratulations。但它和你真正想做的事没什么关系。导师说 "you\'d be crazy not to take it"。爸妈说 "这种机会你还挑什么"。群里有人说 "先上车再说"。你心里那个声音倒是很有主见——可惜它不发 LinkedIn，也没有 offer letter，甚至不能帮你说服你妈。',
    choices: [
      {
        text: '接了——先上车再说',
        delta: { Coherence: 8, Shadow: 4 },
      },
      {
        text: '拒了——我知道我想要什么，虽然说不太清楚',
        delta: { Depth: 6, Coherence: 4, Shadow: -3 },
      },
      {
        text: '把截止日期推了又推，最后到了最后一天',
        delta: { Shadow: 6, Depth: 3 },
      },
    ],
  },
  {
    id: 'shadow-how-are-you',
    turn: '真话',
    turnIndex: 4,
    title: '你最近怎么样？',
    text: '一个很久没见的朋友。约了三次才约上。吃到一半，她突然放下杯子看着你："你最近到底怎么样？" 不是 small talk——她是真的在问。空气安静了一秒。你嘴角动了一下，正在组织一个很真诚的 "I\'m good"。',
    choices: [
      {
        text: '"I\'m good, just busy. How about you?"',
        delta: { Shadow: 6, Coherence: 3 },
      },
      {
        text: '犹豫了一下，说了些真话——虽然只说了十分之一',
        delta: { Depth: 7, Transmission: 5, Shadow: -4 },
      },
      {
        text: '笑着说"别搞得这么严肃"，然后给她看手机上一个搞笑视频',
        delta: { Transmission: 4, Shadow: 5 },
      },
    ],
  },
];

export const SHADOW_TURNS = [
  { name: '深夜', ageRange: '', index: 0 },
  { name: '比较', ageRange: '', index: 1 },
  { name: '关系', ageRange: '', index: 2 },
  { name: '选择', ageRange: '', index: 3 },
  { name: '真话', ageRange: '', index: 4 },
];
