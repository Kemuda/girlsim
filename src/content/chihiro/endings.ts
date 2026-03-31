// 千寻的五种结局 — based on shishenChoices pattern
// Called from GameContext when mode === 'chihiro' and phase === 'ending'

import type { ShiShen } from '../../engine/bazi/shishen.ts';

export interface ChihiroEnding {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export const CHIHIRO_ENDINGS: ChihiroEnding[] = [
  {
    id: 'chihiro',
    title: '千寻',
    subtitle: '她记得了',
    description:
      '她一直在帮助别人。不是因为有人要求她，是因为她记得，在那段她说不清楚的岁月里，有人也这样帮助过她。\n\n她的名字没有被带走。\n\n七十二岁，她在梦里站在那条河边，不害怕。她知道，对岸等她的那个人，认得她。',
  },
  {
    id: 'warrior',
    title: '战士',
    subtitle: '她赢了，但不记得为什么要赢',
    description:
      '她打过很多仗。有些是该打的，有些是拦不住的。她赢了大部分，输了几场，但从没停下来过。\n\n问题是，打仗久了，她忘记了打仗之前，她是什么样子的。\n\n她的名字在档案里，签名很多次。但有一个名字，她有点记不清了。',
  },
  {
    id: 'good-girl',
    title: '听话的孩子',
    subtitle: '她活得很好，但不是她自己的人生',
    description:
      '她从来没有出过大问题。工作稳定，家庭和睦，别人都说她"过得不错"。\n\n她自己也觉得不错。\n\n只是有时候，她会突然想起一股气味——焦糖，还是旧木头？——然后那个念头一闪而过，她就继续做手头的事了。\n\n那段时间，她偶尔在想，是不是有什么东西她答应过别人要记住，但忘了。',
  },
  {
    id: 'stayed',
    title: '她留下了',
    subtitle: '有一部分的她没有回来',
    description:
      '她回来了，身体回来了，年纪也照着长。\n\n但有些地方她去不了——不是害怕，只是进不去。她在那边留了一块东西，她不知道是什么，但能感觉到少了。\n\n有时候，她看着普通的日落，会觉得颜色比别人看到的更深一点。她不确定这是诅咒还是礼物。\n\n她一个人走完了这七十年，安静，但不孤独。',
  },
  {
    id: 'ordinary',
    title: '普通人',
    subtitle: '她是千千万万中的一个',
    description:
      '她的一生没有特别显眼的地方。工作、家庭、朋友、几次告别、几段相遇。\n\n她有时候帮了别人，有时候也没能帮上。她有时候替自己说了话，有时候也咽下去了。\n\n没人知道她那段说不清楚的经历。\n\n但她走完了这七十年，完整的。她叫千寻，她没有忘记。',
  },
];

/**
 * Determine which ending to show based on shishenChoices pattern.
 * Count occurrences of each 十神, pick the dominant one (>= 5 out of 14).
 */
export function determineChihiroEnding(shishenChoices: ShiShen[]): ChihiroEnding {
  const counts: Partial<Record<ShiShen, number>> = {};
  for (const s of shishenChoices) {
    counts[s] = (counts[s] ?? 0) + 1;
  }

  const shishen = (s: ShiShen) => counts[s] ?? 0;
  const THRESHOLD = Math.ceil(shishenChoices.length * 0.35); // ~35% = dominant

  // 食神/伤官 dominant → 千寻 (expression, care, creation)
  if (shishen('食神') + shishen('伤官') >= THRESHOLD) {
    return CHIHIRO_ENDINGS.find(e => e.id === 'chihiro')!;
  }
  // 七杀/比肩 dominant → 战士 (fighting, resistance)
  if (shishen('七杀') + shishen('比肩') >= THRESHOLD) {
    return CHIHIRO_ENDINGS.find(e => e.id === 'warrior')!;
  }
  // 正印/正官 dominant → 听话的孩子 (conformity, authority)
  if (shishen('正印') + shishen('正官') >= THRESHOLD) {
    return CHIHIRO_ENDINGS.find(e => e.id === 'good-girl')!;
  }
  // 偏印 dominant → 她留下了 (introspection, withdrawal)
  if (shishen('偏印') >= THRESHOLD - 1) {
    return CHIHIRO_ENDINGS.find(e => e.id === 'stayed')!;
  }
  // No dominant → 普通人
  return CHIHIRO_ENDINGS.find(e => e.id === 'ordinary')!;
}
