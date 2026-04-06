// Echo registry — when a choice registers an echoKey, later stages can
// inject "callback" scenes that reference the earlier moment.
//
// Each entry: { trigger echoKey, stage it fires in, callback scene }.
// The selector checks this after base selection; if a registered echo
// matches the current stage, it REPLACES the slot-b scene.

import type { Scene } from '../../types/game';

export interface EchoCallback {
  triggerEchoKey: string;   // registered when player made an earlier choice
  firesInStage: number;     // stage index where callback appears
  scene: Scene;
}

export const CHIHIRO_ECHOES: EchoCallback[] = [

  // 七岁喂猫 → 三十五岁梦中的河边有只猫
  {
    triggerEchoKey: 'cat-fed',
    firesInStage: 3,
    scene: {
      id: 'ch-echo-cat-river',
      turn: '而立',
      turnIndex: 3,
      title: '那只橘猫',
      text: '三十五岁。你做了一个梦。\n\n梦里你回到了七岁那年的院子，那只橘猫还在墙角，它老了，但它还在等你。它抬头看你，眼神里没有责怪。\n\n它只是说：你记得就好。',
      echoText: '（那只你七岁时喂过的猫，在记忆里回来找你了）',
      choices: [
        { text: '蹲下来，和它说说这些年', delta: { Depth: 10, Transmission: 6, Shadow: -6 }, shishenTag: '食神', memoryText: '三十五岁那年的梦里，我和一只猫说了很多年的事。它都听完了。' },
        { text: '伸手想抱它，但没抱到', delta: { Depth: 8, Shadow: 2 }, shishenTag: '偏印', memoryText: '我没抱到它。但它让我摸了一下。' },
        { text: '醒过来，去厨房喝一杯水', delta: { Body: 5, Shadow: 4 }, shishenTag: '正官', memoryText: '我醒了，喝了水。那个梦后来没再做过。' },
      ],
    },
  },

  // 十二岁写日记 → 四十五岁带徒弟时那段"说不清的经历"有了形状
  {
    triggerEchoKey: 'tunnel-written',
    firesInStage: 4,
    scene: {
      id: 'ch-echo-tunnel-written',
      turn: '中年',
      turnIndex: 4,
      title: '翻开那本旧日记',
      text: '四十五岁。你从书架最底层翻出那本十二岁写的蓝皮日记。\n\n字很幼稚，故事也荒唐。但你读着读着，忽然明白了一件事：那个十二岁的你，其实已经把后来这三十年要走的路，全部写在里面了。\n\n你只是走了很久，才看懂。',
      echoText: '（那本你十二岁时写下的日记，等了你三十三年）',
      choices: [
        { text: '把它抄写一遍，用现在的字', delta: { Depth: 10, Coherence: 8, Shadow: -8 }, shishenTag: '偏印', memoryText: '我把十二岁的日记抄了一遍。一字不漏。抄完那天我哭了很久。', echoKey: 'diary-reclaimed' },
        { text: '给它加一个后记：献给那个十二岁的我', delta: { Transmission: 9, Depth: 7, Shadow: -6 }, shishenTag: '食神', memoryText: '我给日记加了一个后记。写完那天，她和我终于在一起了。', echoKey: 'diary-reclaimed' },
        { text: '合上它，放回最底层', delta: { Body: 5, Shadow: 3 }, shishenTag: '正官', memoryText: '我又把它放回去了。但我知道它在那里。' },
      ],
    },
  },

  // 十二岁封印 → 五十三岁的"不解释"变成一种拒绝
  {
    triggerEchoKey: 'tunnel-sealed',
    firesInStage: 5,
    scene: {
      id: 'ch-echo-tunnel-sealed',
      turn: '知天命',
      turnIndex: 5,
      title: '那个夏天回来找她',
      text: '五十三岁。某个夜里，你突然想起了一件你已经几十年不记得的事——十二岁那年夏天，你去过一个地方。\n\n具体去了哪里，你记不起来。但那种感觉，像一整个房间突然亮了灯。\n\n你坐在床边，天亮也没睡。',
      echoText: '（你十二岁封印的那段记忆，回来敲门了）',
      choices: [
        { text: '起床，把能记起的一切写下来——哪怕只有一行', delta: { Depth: 12, Shadow: -10, Regeneration: 6 }, shishenTag: '食神', memoryText: '五十三岁那天半夜我写了一行字："我回来过。"就这一行。但这一行救了我。', echoKey: 'diary-reclaimed' },
        { text: '继续让它埋着——有些东西不挖也能活', delta: { Body: 6, Shadow: 4, Depth: 3 }, shishenTag: '偏印', memoryText: '我没挖。我睡了一会。但我知道那扇门没关严。' },
        { text: '打电话给一个很久不联系的老朋友', delta: { Transmission: 8, Regeneration: 5 }, shishenTag: '正印', memoryText: '我打了电话给一个老朋友，什么也没说，只是听她说了半小时话。' },
      ],
    },
  },

  // 二十四岁陌生的善意传下去 → 六十七岁外孙女问"为什么你对陌生人这么好"
  {
    triggerEchoKey: 'kindness-passed',
    firesInStage: 6,
    scene: {
      id: 'ch-echo-kindness-passed',
      turn: '晚年',
      turnIndex: 6,
      title: '那把伞的故事',
      text: '六十七岁。你的外孙女问你：奶奶，为什么你对不认识的人都那么好？\n\n你想起了很多年前东京地铁上的那把伞。你想起那天的雨。你想起你把伞给出去时那个人的脸。',
      echoText: '（那把伞转了四十多年的路，今天到了外孙女手里）',
      choices: [
        { text: '给她讲那把伞的故事', delta: { Transmission: 12, Depth: 6, Shadow: -6 }, shishenTag: '食神', memoryText: '我把那把伞的故事讲给了外孙女听。她听完就出门了——外面没下雨，但她想走走。' },
        { text: '只说一句："因为有人曾经也对我很好"', delta: { Transmission: 9, Depth: 7 }, shishenTag: '偏印', memoryText: '我只回了她一句话。她记住了。' },
      ],
    },
  },
];
