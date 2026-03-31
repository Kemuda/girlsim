// ============================================================
// 暗影结局 — 5 种 shadow pattern，吐槽不诊断
// ============================================================

import type { CharacterState, DimensionKey } from '../types/game';
import { INITIAL_STATE } from '../types/game';

export interface ShadowEndingData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

const SHADOW_ENDINGS_MAP: Record<string, ShadowEndingData> = {
  'efficiency-machine': {
    id: 'efficiency-machine',
    title: '效率机器',
    subtitle: 'The Efficiency Machine',
    description:
      '你周三晚上十一点合上电脑。然后打开了手机。然后关了手机。然后又打开了电脑。\n\n你和最好的朋友上次 properly hang out 是……你想了想。你 Google Calendar 比你可靠——它说你已经连续三周没有一个 block 是留给自己的了。\n\n你开始用 AI 帮你回消息。你管这叫提高效率。省下来的时间你又花在了工作上。\n\n你很厉害。所有人都这么说。但 "很厉害" 上一次让你开心是什么时候？\n\n把这条发给那个总说 "这周不行下周吧" 的朋友。你知道是谁。',
  },
  'invisible-giver': {
    id: 'invisible-giver',
    title: '隐形付出者',
    subtitle: 'The Invisible Giver',
    description:
      '你是那种别人有事第一个想到的人。帮忙改 resume、airport pickup、凌晨回消息安慰失恋的朋友。你做这些很自然。像呼吸。\n\n你翻了翻聊天记录——你发出的最后一条消息，几乎都是在关心对方。没什么人用同样的方式打开和你的对话。不是他们不好。是你太会让别人觉得你不需要这个。\n\n你上次被照顾是什么时候？不是 "你还好吗" 那种。是有人什么都没问，就给你点了你喜欢喝的。想了想，没想起来。\n\n发给你身边那个总说 "没关系我来吧" 的人。如果想不到是谁——嗯。',
  },
  'deep-diver': {
    id: 'deep-diver',
    title: '深海潜水员',
    subtitle: 'The Deep Diver',
    description:
      '你的 Notes app 里有一些东西。不是工作的。是有时候想到的一些话。很碎，很长，没给任何人看过。你偶尔翻到觉得写得还行。然后锁屏。\n\n你打过很多条消息。很真的那种。打完了看一遍，全选，删除。不是写得不好。是发出去还得解释，太累了。\n\n聚会的时候你话不多。有人说你 "chill"。其实你只是在想怎么翻译脑子里那个东西。等你想好了，大家已经在聊别的了。\n\n你应该有个朋友和你一样——你们大概从来没跟对方说过真话。互相发一下这个试试。',
  },
  'perfect-actor': {
    id: 'perfect-actor',
    title: '完美演员',
    subtitle: 'The Perfect Actor',
    description:
      '你很会聊天。什么场合都接得住。English, 中文, 混着来——你总是刚好是那个场合需要的那个人。有人说你 "super thoughtful"。你回了一个刚好的 thank you。\n\n回去的路上你会摘下耳机。不听任何东西。不是在思考人生——只是需要从刚才那个版本的自己里出来一下。\n\n你读到这里的时候，脸上大概是一个恰到好处的微笑。对吧？\n\n转发到群里让大家都测一下。看看谁也得了这个。你就找到同类了。',
  },
  'already-aware': {
    id: 'already-aware',
    title: '已经在路上',
    subtitle: 'Already on the Way',
    description:
      '你和大多数人不太一样。不是因为你更厉害——你也焦虑，也被 LinkedIn 暴击过，也说过 "I\'m good"。\n\n区别是你还会说 "I don\'t know"。\n\n这三个字到了某个阶段很多人就不说了。好像说出来意味着你不够 capable。但你还在说。这比你以为的值钱。\n\n你不需要这个游戏来告诉你什么。但可以把它发给一个你觉得需要的朋友。',
  },
};

export function determineShadowEnding(state: CharacterState): ShadowEndingData {
  const shadowGrowth = state.Shadow - INITIAL_STATE.Shadow;

  if (shadowGrowth < 8) return SHADOW_ENDINGS_MAP['already-aware'];

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
      return SHADOW_ENDINGS_MAP['efficiency-machine'];
    case 'Transmission':
      return SHADOW_ENDINGS_MAP['invisible-giver'];
    case 'Depth':
      return SHADOW_ENDINGS_MAP['deep-diver'];
    default:
      return SHADOW_ENDINGS_MAP['perfect-actor'];
  }
}

export { SHADOW_ENDINGS_MAP as SHADOW_ENDINGS };
