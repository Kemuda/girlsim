import type { CharacterState, HistoryEntry } from '../types/game';

const NARRATION_TEMPLATES: Record<string, string[]> = {
  high_coherence: [
    '你的脚步从未犹豫。每一个选择都在加固你内心的城墙。',
    '方向感是你最强大的武器——你知道自己要走向哪里。',
  ],
  high_depth: [
    '你的内心世界比外面的世界更广阔。在沉默里，你找到了最多的答案。',
    '你看到了别人看不到的东西——这是天赋，也是负担。',
  ],
  high_regeneration: [
    '你像春天一样——无论冬天多长，你总会重新发芽。',
    '在你身上有一种温柔的韧性，它不张扬，但从未消失。',
  ],
  high_transmission: [
    '你的影响力像涟漪一样扩散。你不经意的一句话，可能正在改变某个人的人生。',
    '你与人之间的联结是你最大的力量。',
  ],
  high_body: [
    '你始终记得自己是有血肉的人。当头脑太累的时候，身体会接住你。',
    '你比大多数人更懂得：先照顾好自己，才能照顾好一切。',
  ],
  high_shadow: [
    '那些被压下去的情绪并没有消失，它们在暗处生长。',
    '你的影子越来越长。也许是时候回头看看它了。',
  ],
  generic: [
    '生活在继续。每一个选择都在塑造你，虽然你自己可能还没有意识到。',
    '你不是任何一个标签。你是所有这些时刻的总和。',
    '前方的路还很长，但你已经走过了最难的部分——开始。',
  ],
};

function getHighestDimension(state: CharacterState): string {
  const dims = Object.entries(state) as [string, number][];
  dims.sort((a, b) => b[1] - a[1]);
  const highest = dims[0];
  if (highest[1] >= 70) return `high_${highest[0].toLowerCase()}`;
  return 'generic';
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateNarration(
  state: CharacterState,
  choiceText: string,
  _history: HistoryEntry[]
): string {
  const category = getHighestDimension(state);
  const templates = NARRATION_TEMPLATES[category] || NARRATION_TEMPLATES.generic;
  const base = pickRandom(templates);

  // Add choice-specific flavor
  const connector = pickRandom([
    '你选择了',
    '在这个时刻，你决定',
    '你的内心告诉你',
  ]);

  return `${connector}「${choiceText}」。\n\n${base}`;
}

export function generateTransitionText(
  fromTurn: string,
  toTurn: string,
  state: CharacterState
): string {
  const transitions: Record<string, string> = {
    'Girlhood→The Threshold':
      '童年像一场漫长的梦，你在不知不觉中醒来。镜子里的脸不再是小女孩了。',
    'The Threshold→First World':
      '十八岁，你站在世界的入口。行李很轻，但心里装着整个未来。',
    'First World→The Contraction':
      '二十多岁的冲劲慢慢变成了一种更沉稳的节奏。生活开始有了重量——不全是负担，也有分量。',
    'The Contraction→Midgame Reckoning':
      '时间的流速改变了。你开始有了回头看的冲动，也开始认真想：前方还有多远。',
    'Midgame Reckoning→Second Wind':
      '人到中年的觉醒不是一个瞬间，而是一个漫长的过程。你发现自己还可以重新开始。',
    'Second Wind→Legacy':
      '当你不再急着赶路，风景反而变得清晰了。你开始想：留下什么。',
  };

  const key = `${fromTurn}→${toTurn}`;
  const base = transitions[key] || '时间在继续，你也在继续。';

  // Add stat-based flavor
  if (state.Shadow >= 50) {
    return base + '\n\n但在心底，有些东西一直在隐隐作痛。';
  }
  if (state.Regeneration >= 70) {
    return base + '\n\n不管发生了什么，你总能找到重新出发的力量。';
  }
  return base;
}
