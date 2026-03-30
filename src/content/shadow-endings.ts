// ============================================================
// 暗影结局 — 5 种 shadow pattern 结局
// ============================================================

import type { CharacterState, DimensionKey } from '../types/game';
import { INITIAL_STATE } from '../types/game';

export interface ShadowEndingData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

const SHADOW_ENDINGS: Record<string, ShadowEndingData> = {
  'efficiency-machine': {
    id: 'efficiency-machine',
    title: '效率机器',
    subtitle: 'The Efficiency Machine',
    description:
      '周三。晚上十一点。\n\n你刚合上电脑。房间突然安静了。你拿起手机，打开了一个 app，又关了。打开另一个，也关了。其实什么都不想看。只是不太习惯这种安静。于是你又打开了电脑。\n\n你和最好的朋友上一次见面，是在一个什么 event 上。你们寒暄了大概八分钟。你说 "let\'s catch up properly soon"。那是上个月。\n\n你的 Google Calendar 比你的日记诚实得多。它说你已经连续三周没有一个 block 是留给自己的了。你最近开始用 ChatGPT 帮你回消息——你管这叫提高效率。省下来的时间，你又花在了工作上。\n\n你是一个很厉害的人。所有人都这么说。',
  },
  'invisible-giver': {
    id: 'invisible-giver',
    title: '隐形付出者',
    subtitle: 'The Invisible Giver',
    description:
      '你是那种别人有事第一个想到的人。帮忙改 cover letter、机场接人、凌晨两点回消息安慰失恋的朋友。你做这些的时候很自然，像呼吸一样。\n\n你的聊天列表里，你发出去的最后一条消息几乎都是在关心对方。你翻了翻，发现很少有人用同样的方式打开和你的对话。不是他们不在乎。是你从来没有让他们觉得你需要这个。\n\n你最近一次被照顾是什么时候？不是那种"你还好吗"的客套。是有人什么都没问，就给你倒了杯水。你想了想，记不太清了。',
  },
  'deep-diver': {
    id: 'deep-diver',
    title: '深海潜水员',
    subtitle: 'The Deep Diver',
    description:
      '你的 Notes app 里有一些东西。不是工作的——是有时候突然想到的一些话。很长，很碎，没有给任何人看过。你偶尔翻到，觉得写得还不错。然后锁屏。\n\n你打过很多条消息——很长，很真——打完了看一遍，全选，删除。不是写得不好。是发出去之后还得解释，解释起来太累了。\n\n聚会的时候你话不多。有人说你 "chill"。其实你只是在想怎么把脑子里转的那个东西翻译成能说出口的话。到你想好了，大家已经在聊别的了。',
  },
  'perfect-actor': {
    id: 'perfect-actor',
    title: '完美演员',
    subtitle: 'The Perfect Actor',
    description:
      '你很会聊天。什么场合都接得住。English, 中文, 或者两个混着来——你总是刚好是那个场合需要的人。有人在 LinkedIn 上说你 "incredibly thoughtful"。你回了一个得体的 thank you。\n\n回去的路上你会摘下耳机。那几分钟什么都不听。不是在想什么——只是需要从一个版本的自己切换回来。你也不确定切换回的那个版本是不是 "real"。\n\n你读到这里的时候，脸上大概是一个恰到好处的微笑。\n\n对吧？',
  },
  'already-aware': {
    id: 'already-aware',
    title: '已经在路上',
    subtitle: 'Already on the Way',
    description:
      '你和大多数人不太一样。不是因为你更聪明或更想得开——你也焦虑，也在凌晨刷过让你 emo 的 LinkedIn，也说过 "I\'m good"。\n\n区别是：你还会说 "I don\'t know"。\n\n大多数人到了某个阶段就不说这三个字了。说出来好像意味着你不够 capable。但你还在说。有时候跟朋友说，有时候只是在心里。\n\n这比你以为的珍贵得多。好多人都忘了怎么说了。',
  },
};

export function determineShadowEnding(state: CharacterState): ShadowEndingData {
  const shadowGrowth = state.Shadow - INITIAL_STATE.Shadow;

  if (shadowGrowth < 8) return SHADOW_ENDINGS['already-aware'];

  // Find highest non-Shadow dimension value
  const dims: DimensionKey[] = ['Coherence', 'Depth', 'Regeneration', 'Transmission', 'Body'];
  let highest: DimensionKey = 'Coherence';
  let highestVal = 0;
  for (const d of dims) {
    if (state[d] > highestVal) {
      highestVal = state[d];
      highest = d;
    }
  }

  switch (highest) {
    case 'Coherence':
      return SHADOW_ENDINGS['efficiency-machine'];
    case 'Transmission':
      return SHADOW_ENDINGS['invisible-giver'];
    case 'Depth':
      return SHADOW_ENDINGS['deep-diver'];
    default:
      return SHADOW_ENDINGS['perfect-actor'];
  }
}

export { SHADOW_ENDINGS };
