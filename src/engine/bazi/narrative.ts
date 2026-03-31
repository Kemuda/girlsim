// Narrative translation layer — turns BaZi analysis into story language.
// No bazi jargon ever reaches the player. Everything is metaphor.

import type { BaZiLife } from './types.ts';
import type { ShiShen } from './shishen.ts';
import type { StrengthLevel } from './strength.ts';
import type { WuXing } from './wuxing.ts';
import type { DaYunEnergy } from './types.ts';

// --- Day Master: Who you are ---

const DM_IDENTITY: Record<string, { metaphor: string; nature: string }> = {
  '甲': { metaphor: '一棵树', nature: '你向上长，不问允许。哪怕泥土贫瘠，你也要够到那片光。' },
  '乙': { metaphor: '一根藤', nature: '你柔软，但从不松手。绕过障碍的方式比穿过它的人走得更远。' },
  '丙': { metaphor: '一团火', nature: '你天生发光。走到哪里，哪里就不再是黑夜。代价是——你也会灼伤靠近的人。' },
  '丁': { metaphor: '一根蜡烛', nature: '你的光很小，但很稳。在所有人都看不见的地方，你照亮了角落。' },
  '戊': { metaphor: '一座山', nature: '你不动。所有人都来找你靠，但没人问过你累不累。' },
  '己': { metaphor: '一片田', nature: '你滋养所有人。种子落在你身上就能活。但你从来不为自己开花。' },
  '庚': { metaphor: '一把刀', nature: '你锋利、果断、不留余地。你相信这个世界需要的是真话，不是安慰。' },
  '辛': { metaphor: '一枚针', nature: '你精致得让人忽略你的尖锐。但被你扎到的人，会记很久。' },
  '壬': { metaphor: '一条河', nature: '你向前流，不回头。自由是你的信仰，但河流也会淹没自己经过的田。' },
  '癸': { metaphor: '一场雨', nature: '你安静地落下，渗进所有人的土里。没人看到雨，但所有人都活在雨后。' },
};

// --- Strength: How much resource you start with ---

const STRENGTH_NARRATIVE: Record<StrengthLevel, string> = {
  '极弱': '这个世界对你来说有点重。你的资源很少，每一步都需要借力。但有时候，最小的火在风里反而最亮。',
  '偏弱': '你不算强。好东西在眼前，你不一定够得到。但你学会了一种别人不会的本事——等待。',
  '中和': '你不强也不弱。这意味着你有选择的余地——你可以走任何方向。问题是，你会选哪条路？',
  '偏强': '你有力量。想做的事，大多数时候做得到。但力量多了，你可能会忘记问自己：这真的是我想要的吗？',
  '极强': '你有用不完的能量。你的问题不是外面的敌人，而是你自己——太强的人，容易把身边的人都推远。',
};

// --- Month Theme: What your life is about ---

const THEME_NARRATIVE: Record<ShiShen, { opening: string; recurring: string }> = {
  '比肩': {
    opening: '你这一生，会反复遇到和你很像的人。他们是镜子，也是对手。你会不断问自己：我到底是谁？我和他们有什么不同？',
    recurring: '又一个和你很像的人出现了。',
  },
  '劫财': {
    opening: '你这一生，总有人来分走你拥有的东西——不一定是钱，也许是功劳，也许是爱。你会不断问自己：什么才是真正属于我的？',
    recurring: '又有人伸手了。',
  },
  '食神': {
    opening: '你这一生，最大的满足来自创造——写一个东西、教一个人、养一棵花。你会不断问自己：我该把时间给自己的作品，还是给需要我的人？',
    recurring: '你又想做点什么了。',
  },
  '伤官': {
    opening: '你这一生，心里一直有一把火在烧。你看不惯的东西太多了，你想打破的规则太多了。你会不断问自己：我该磨平自己的棱角，还是刺穿这个世界？',
    recurring: '又有什么东西让你看不惯了。',
  },
  '偏财': {
    opening: '你这一生，机会来得快，去得也快。你天生敢赌，但运气不总站在你这边。你会不断问自己：这一把，赌还是不赌？',
    recurring: '又一个机会出现了。',
  },
  '正财': {
    opening: '你这一生，最渴望的是稳定——一份可靠的工作，一个不会离开的人，一笔存款。你会不断问自己：这份安全感是保护我的墙，还是困住我的笼？',
    recurring: '你又在算账了。',
  },
  '七杀': {
    opening: '你这一生，压力不会放过你。每个阶段都会有什么东西把你逼到墙角——老师、老板、病、或者命运本身。你会不断问自己：我是扛下去，还是绕开走？',
    recurring: '又来了。又是那种被逼到墙角的感觉。',
  },
  '正官': {
    opening: '你这一生，规则和期待会反复定义你。好学生、好女儿、好妻子、好母亲——每个阶段都有人告诉你"应该"怎样。你会不断问自己：我是活成了别人期待的样子，还是活成了自己？',
    recurring: '又有人告诉你"应该"了。',
  },
  '偏印': {
    opening: '你这一生，最好的灵感来自奇怪的地方——一个不合群的人、一本没人看的书、一个半夜的念头。你会不断问自己：我的孤独是诅咒，还是天赋？',
    recurring: '又一个奇怪的念头冒出来了。',
  },
  '正印': {
    opening: '你这一生，不缺保护——家庭、学校、体制，总有人在帮你挡风。你会不断问自己：我是感激这份庇护，还是想挣脱它？',
    recurring: '又有人来"保护"你了。',
  },
};

// --- Imbalance: What's missing ---

const OBSESSION_NARRATIVE: Record<WuXing, string> = {
  '木': '你命里缺少生长的力量。你渴望自由、渴望舒展，但环境总是在修剪你。',
  '火': '你命里缺少温度。你渴望联结、渴望被看见，但世界总是有点冷。',
  '土': '你命里缺少根基。你渴望稳定、渴望扎根，但脚下的地一直在晃。',
  '金': '你命里缺少边界。你渴望方向、渴望决断，但总是不知道该往哪走。',
  '水': '你命里缺少深度。你渴望理解、渴望看透，但答案总是在水面以下。',
};

// --- Stage intros: What each life stage feels like ---

const ENERGY_INTROS: Record<DaYunEnergy, string[]> = {
  support: [
    '这几年，有人在背后托着你。你不一定看得到，但你能感觉到——路好走了一些。',
    '这段时间，风是顺的。该来的资源在来，该开的门在开。',
    '这几年像是被人喂饱了。你有力气了。',
  ],
  resource: [
    '这几年，你找到了同类。不再那么孤独了。',
    '这段时间，有人跟你站在一起。你们可能成为战友，也可能成为竞争者。',
    '身边出现了和你很像的人。',
  ],
  drain: [
    '这几年，你在不停地输出——给工作、给家庭、给所有需要你的人。你自己呢？',
    '这段时间，你一直在给。给到后来，你差点忘了自己也需要被给予。',
    '你的能量在往外流。这不是坏事，但你要知道什么时候该停。',
  ],
  pressure: [
    '这几年不好过。有什么东西一直压着你——可能是人，可能是事，可能是你自己的期待。',
    '这段时间，世界在考验你。不是问你够不够强，而是问你能不能弯下腰。',
    '你感觉到了压力。不是想象的，是真实的、每天都在的那种重。',
  ],
  neutral: [
    '这几年，不好不坏。你在消耗，但还在可控范围内。',
    '这段时间很平。没有大风大浪，也没有贵人相助。一切靠你自己。',
    '日子在过。不快不慢。',
  ],
};

// --- Public API ---

export interface LifeNarrative {
  /** "你是一棵树。" */
  identity: string;
  /** Extended description of who you are */
  nature: string;
  /** How much resource / agency you have */
  strengthDesc: string;
  /** What your life keeps coming back to */
  themeOpening: string;
  /** Short recurring phrase for each stage */
  themeRecurring: string;
  /** What's missing in your life */
  obsessionDesc: string;
  /** Intro text for each of the 7 life stages */
  stageIntros: string[];
}

export function generateNarrativeFromLife(life: BaZiLife): LifeNarrative {
  const dm = DM_IDENTITY[life.dayMaster.name];
  const theme = THEME_NARRATIVE[life.monthTheme.primaryShiShen];

  const stageIntros = life.luckCycles.map(dy => {
    const pool = ENERGY_INTROS[dy.energyColor];
    // Deterministic pick based on index to keep consistent across renders
    return pool[dy.index % pool.length];
  });

  return {
    identity: `你是${dm.metaphor}。`,
    nature: dm.nature,
    strengthDesc: STRENGTH_NARRATIVE[life.strength.level],
    themeOpening: theme.opening,
    themeRecurring: theme.recurring,
    obsessionDesc: life.imbalance.missing.length > 0
      ? OBSESSION_NARRATIVE[life.imbalance.obsessionElement]
      : life.imbalance.weak.length > 0
        ? OBSESSION_NARRATIVE[life.imbalance.obsessionElement]
        : '你的命格相对平衡。没有特别缺的东西，也没有特别多的东西。这种命，活起来舒服，但不容易留下痕迹。',
    stageIntros,
  };
}

// --- Ending reflection ---

export function generateEndingReflection(life: BaZiLife): string {
  const dm = DM_IDENTITY[life.dayMaster.name];
  const theme = THEME_NARRATIVE[life.monthTheme.primaryShiShen];

  const themeWord = life.monthTheme.primaryShiShen;
  const strengthWord = life.strength.level;

  // Build a reflective paragraph
  const lines: string[] = [];

  lines.push(`你这一生，从头到尾都是${dm.metaphor}。`);

  if (strengthWord === '极弱' || strengthWord === '偏弱') {
    lines.push('你的资源不多，但你走完了这七个阶段。');
  } else if (strengthWord === '极强' || strengthWord === '偏强') {
    lines.push('你有足够的力量走完这一生。问题从来不是"能不能"，而是"值不值"。');
  } else {
    lines.push('你不强不弱，所以你有选择的自由，也有选择的重量。');
  }

  // Theme reflection
  if (themeWord === '七杀') {
    lines.push('压力追了你一辈子。你是扛下来了，还是被它改变了形状？');
  } else if (themeWord === '食神') {
    lines.push('你一直在创造。但你为自己创造了什么？');
  } else if (themeWord === '伤官') {
    lines.push('你一直在打破。但打破之后，你建了什么？');
  } else if (themeWord === '正官') {
    lines.push('你一直在回应期待。但那个没有期待的你，长什么样子？');
  } else if (themeWord === '正印') {
    lines.push('你一直被保护着。但笼子和家，从外面看是一样的。');
  } else if (themeWord === '偏印') {
    lines.push('你一直走在别人看不到的路上。孤独让你看到了什么？');
  } else if (themeWord === '比肩') {
    lines.push('你一直在找自己。镜子里的人，最后跟你和解了吗？');
  } else if (themeWord === '劫财') {
    lines.push('你一直在争。但争到手的东西，最后还在吗？');
  } else if (themeWord === '偏财') {
    lines.push('你赌了很多次。最值得的那一次，是哪一次？');
  } else if (themeWord === '正财') {
    lines.push('你一直在积累。但银行账户和人生不是一回事。');
  }

  lines.push('');
  lines.push(theme.recurring);
  lines.push('');
  lines.push('你的命是抽的。你的运是给的。但这一路上的每个选择，是你自己做的。');
  lines.push('这就是你的一生。');

  return lines.join('\n');
}
