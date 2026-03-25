// ============================================================
// 结局文本 — 根据最高维度决定的 7 种人生终章
// ============================================================
// requiredHighest: 触发结局需要的最高维度
// minValue: 该维度至少需要达到的值（兜底结局不需要）
// ============================================================

import type { DimensionKey } from '../types/game';

export interface EndingData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  requiredHighest: DimensionKey;
  minValue: number; // 0 = 兜底结局，无条件
}

export const ENDINGS: EndingData[] = [
  {
    id: 'coherence-ending',
    requiredHighest: 'Coherence',
    minValue: 80,
    title: '铁骨',
    subtitle: '她从未偏离自己选定的方向',
    description:
      '你用一生证明了意志的力量。每一个选择都指向同一个方向，每一次跌倒都让你更加坚定。人们说你"了不起"，但只有你知道那些深夜里独自承受的重量。你的故事会被记住——作为一种力量的象征。',
  },
  {
    id: 'depth-ending',
    requiredHighest: 'Depth',
    minValue: 80,
    title: '深潭',
    subtitle: '她活在别人看不到的维度里',
    description:
      '你的一生是一场漫长的内在旅行。你比大多数人更了解痛苦，也比大多数人更了解美。你写过的字、说过的话、给过的沉默，都在某个人心里留下了不可磨灭的痕迹。你的故事是一口深井——水面平静，下面有整个宇宙。',
  },
  {
    id: 'regeneration-ending',
    requiredHighest: 'Regeneration',
    minValue: 80,
    title: '春草',
    subtitle: '她总能从灰烬中发芽',
    description:
      '你跌倒过很多次，但每一次你都站起来了——不是因为你不痛，而是因为你相信生命有一种自愈的力量。你的身上有一种轻盈，那是只有经历过很多重量的人才有的轻盈。你教会了身边的人最重要的一课：没关系的，一切都会过去。',
  },
  {
    id: 'transmission-ending',
    requiredHighest: 'Transmission',
    minValue: 80,
    title: '回声',
    subtitle: '她的故事在别人身上继续',
    description:
      '你不是那种站在聚光灯下的人，但你影响的人比你知道的多得多。你说过的一句话、给过的一个拥抱、做出的一个选择——这些涟漪扩散到了你看不到的地方。你的遗产不是任何有形的东西，而是一种温度。',
  },
  {
    id: 'body-ending',
    requiredHighest: 'Body',
    minValue: 80,
    title: '扎根',
    subtitle: '她从未遗忘肉身的智慧',
    description:
      '你始终与自己的身体保持着对话。当世界变得太快太吵的时候，你知道回到呼吸、回到双脚踩在地上的感觉。你的晚年比大多数人从容——因为你从来没有把自己当作一台需要不断运转的机器。',
  },
  {
    id: 'shadow-high-ending',
    requiredHighest: 'Shadow',
    minValue: 60,
    title: '暗流',
    subtitle: '她带着未说出口的一切活完了一生',
    description:
      '你心里有一些永远没有被看见的东西——那些被吞下去的话，被压住的眼泪，被藏起来的自己。你不是不勇敢，而是你承受的比别人想象的多得多。你的故事是一首安魂曲，献给所有独自消化了一切的人。',
  },
  {
    id: 'balanced-ending',
    requiredHighest: 'Coherence', // 不重要，此为兜底
    minValue: 0,
    title: '河流',
    subtitle: '她没有选择成为任何一种人，于是成为了自己',
    description:
      '你的一生没有太多戏剧性的时刻，但有一种持久的丰富。你哭过、笑过、跌倒过、站起来过。你不是任何一个标签，而是所有这些经历的总和。当你回望这一生，你看到的不是一条直线，而是一条河——有急流也有静水，最终汇入大海。',
  },
];
