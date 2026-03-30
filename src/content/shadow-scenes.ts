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
    text: '你在宿舍坐了六个小时。第三杯咖啡凉了，杯壁上留着奶的痕迹。手机亮了——你最好的朋友发来消息："出来走走？好久没聊了。" 你看了看屏幕上的 deck，又看了看消息。脖子已经硬了一整天。上次给家里打电话——算了算，跨着时差，已经是两周前了。',
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
    text: '睡前刷手机。一个同学发了条 LinkedIn，配了张 co-working space 的照片："Excited to share that..." 底下全是 congratulations 和🔥🔥🔥。往下滑——另一个同学，某个 top program 的 offer，配文"感恩一切遇见❤️"。再往下——订婚照，两个人在某个欧洲小城的街头。你锁了屏。天花板很白。',
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
    text: '你们在一起快两年了。不算长，但够真。上个月你拿到了一个 offer，ta 也拿到了一个——在地球另一边。时差十三个小时。你们坐在学校旁边那家总去的咖啡馆，谁都没先开口。最后 ta 说了句"we\'ll figure it out"。你说"嗯"。你们都知道 figure it out 是什么意思。',
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
    text: '一个很好的机会。Title 好听，package 不错，LinkedIn 发出去绝对收割一波 congratulations。但它和你真正想做的事没什么关系。导师说"you\'d be crazy not to take it"。爸妈说"这种机会你还挑什么"。群里有人说"先上车再说"。只有你知道心里有个声音在说别的——但那个声音不发 LinkedIn，也没有 offer letter。',
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
    text: '一个很久没见的朋友。你们都忙，约了三次才约上。吃到一半，她放下杯子认真看着你："你最近到底怎么样？" 不是 small talk——她是真的在问。你张了张嘴。那些东西突然都涌上来了：凌晨的焦虑，看不到终点的路，不知道自己是不是在过别人的人生，还有一种跨了几个时区也甩不掉的孤独。',
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
