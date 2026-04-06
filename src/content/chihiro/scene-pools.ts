// Chihiro scene pool — alternate scenes that get selected based on
// dayun energy, dominant shishen tag, or prior dimension state.
//
// Structure: for each stage, the base scenes in `scenes.ts` are the default.
// The scenes here are *alternates* that REPLACE one of the default slots
// when their `requiredEnergy` / `requiredDominantTag` / `triggerCondition`
// matches the current state. See `services/chihiro-selector.ts`.

import type { Scene } from '../../types/game';

export const CHIHIRO_SCENE_ALTERNATES: Scene[] = [

  // Stage 0 alternate — triggered when dayun energy is 'pressure'
  // (i.e. father figure / authority dominating early life)
  {
    id: 'ch-girlhood-alt-pressure',
    turn: '童年',
    turnIndex: 0,
    title: '父亲的沉默',
    text: '八岁。父亲从不打你，但他的沉默比打更重。那天晚饭，你不小心打翻了汤。他没说话。你低着头，等他发火。他只是起身，出门，很久没回来。',
    requiredEnergy: ['pressure'],
    choices: [
      { text: '把地擦干净，假装什么都没发生', delta: { Body: 4, Shadow: 6, Regeneration: 3 }, shishenTag: '正官', memoryText: '那天晚上的汤，我一个人擦干净了。地板很凉。' },
      { text: '出门去找他', delta: { Transmission: 5, Coherence: 4, Body: -3 }, shishenTag: '偏财', memoryText: '我追出去找他。街上没人。但我没哭。' },
      { text: '回房间把自己锁起来', delta: { Shadow: 9, Depth: 5, Body: -4 }, shishenTag: '偏印', memoryText: '我把房门锁上。那是我第一次学会怎么一个人过一晚上。', erasesMemory: true },
    ],
  },

  // Stage 1 alternate — triggered when dayun is 'drain' (食神/伤官 expression)
  {
    id: 'ch-youth-alt-drain',
    turn: '青春',
    turnIndex: 1,
    title: '音乐教室',
    text: '十四岁。放学后，音乐教室没锁。你走进去，坐在钢琴前。你不会弹，但你按下了一个键。\n\n声音在空房间里回荡。你突然想哭，不知道为什么。',
    requiredEnergy: ['drain'],
    choices: [
      { text: '一直按那个键，直到声音消失', delta: { Depth: 9, Shadow: -3 }, shishenTag: '食神', memoryText: '我在音乐教室里按了一个键，一直按。那是我第一次知道，有些东西只能自己听。' },
      { text: '开始乱按——反正没人听', delta: { Transmission: 5, Regeneration: 5, Coherence: 3 }, shishenTag: '伤官', memoryText: '我胡乱弹了十分钟。那不是音乐，但那是我。' },
      { text: '合上琴盖，像什么都没发生过', delta: { Shadow: 6, Body: 3 }, shishenTag: '正官', memoryText: '我合上了琴盖。我记得那个声音。' },
    ],
  },

  // Stage 2 alternate — triggered when 'support' dayun (resource arrives)
  {
    id: 'ch-firstworld-alt-support',
    turn: '初入社会',
    turnIndex: 2,
    title: '陌生的善意',
    text: '二十四岁。你在东京地铁上迷了路。一个老奶奶看见你盯着地图，走过来，把她的伞给了你——外面在下雨——然后指了方向，什么也没多说。\n\n你想还她伞，但她已经走了。',
    requiredEnergy: ['support'],
    choices: [
      { text: '把伞一直带回家，放在门边', delta: { Depth: 7, Regeneration: 5 }, shishenTag: '正印', memoryText: '那把伞我留了很多年。每次下雨都想起她。', echoKey: 'kindness-received' },
      { text: '在下一站把伞留给另一个迷路的人', delta: { Transmission: 9, Shadow: -4 }, shishenTag: '食神', memoryText: '我把伞送给了下一个迷路的人。传下去了。', echoKey: 'kindness-passed' },
      { text: '找到那家店问有没有人认识那个老奶奶', delta: { Coherence: 6, Transmission: 4 }, shishenTag: '偏财', memoryText: '我没找到她。但那天我学会了怎么谢一个不在场的人。' },
    ],
  },

  // Stage 3 alternate — triggered when dominant tag is 七杀 or 正官 (officer stress)
  {
    id: 'ch-contraction-alt-officer',
    turn: '而立',
    turnIndex: 3,
    title: '会议室的灯',
    text: '三十二岁。凌晨一点，会议室只剩你一个。窗外是东京的霓虹，你的手已经打不出字了。\n\n你看着屏幕，发现自己不记得今天是星期几。',
    requiredDominantTag: ['七杀', '正官'],
    choices: [
      { text: '站起来，关掉所有的灯，回家', delta: { Body: 8, Regeneration: 6, Shadow: -4 }, shishenTag: '食神', memoryText: '那天凌晨，我关了会议室的灯，一个人走回家。路上没人，但天快亮了。' },
      { text: '再撑两个小时，把东西交完', delta: { Coherence: 6, Body: -8, Shadow: 5 }, shishenTag: '七杀', memoryText: '我撑到了早上五点。交了。那天我学会什么都不让别人看见。' },
      { text: '打电话给妈妈，只是想听她的声音', delta: { Transmission: 7, Depth: 5, Shadow: -3 }, shishenTag: '正印', memoryText: '我凌晨给妈妈打了电话。她没接。但我按了那个号码。' },
    ],
  },

  // Stage 4 alternate — triggered when Shadow >= 60 (the suppressed self breaks through)
  {
    id: 'ch-reckoning-alt-shadow',
    turn: '中年',
    turnIndex: 4,
    title: '镜子里那个人',
    text: '四十二岁。有一天晚上，你照镜子，看见的不完全是自己。是一个你很久没见过的人——那个十岁时站在隧道前的小女孩，她看着你，没有怪你，但也没有原谅你。',
    triggerCondition: { dimension: 'Shadow', operator: 'gte', value: 60 },
    choices: [
      { text: '对她说对不起——大声说出来', delta: { Shadow: -12, Depth: 8, Transmission: 4 }, shishenTag: '食神', memoryText: '四十二岁那年晚上，我对着镜子道了歉。没人听见，但她听见了。', echoKey: 'shadow-reconciled' },
      { text: '问她：你想要什么？', delta: { Depth: 10, Regeneration: 5, Shadow: -6 }, shishenTag: '偏印', memoryText: '我问了她想要什么。她没回答，但她留下来了。', echoKey: 'shadow-integrated' },
      { text: '把灯关掉，不去看她', delta: { Shadow: 8, Body: -5 }, shishenTag: '偏印', memoryText: '我关了灯。我知道她还在。', erasesMemory: true },
    ],
  },

  // Stage 5 alternate — triggered when 偏印 is dominant (eccentric wisdom)
  {
    id: 'ch-secondwind-alt-pianyin',
    turn: '知天命',
    turnIndex: 5,
    title: '奇怪的来信',
    text: '五十五岁。你收到一封信，寄信人的名字你完全不认识。信里只有一句话：\n\n"我三十年前见过你一次，你那天救了我。谢谢。"\n\n没有署名，没有地址。你想了很久，想不起来。',
    requiredDominantTag: ['偏印', '食神'],
    choices: [
      { text: '把信烧了，心里记住那句话', delta: { Depth: 8, Body: 5, Shadow: -5 }, shishenTag: '偏印', memoryText: '我把那封信烧了。但我记得那句话——有些好事，是别人帮你记着的。', echoKey: 'anonymous-thanks' },
      { text: '把信贴在书桌前，每天看一眼', delta: { Depth: 7, Regeneration: 5 }, shishenTag: '正印', memoryText: '那封信我贴了很多年。每次心虚就看一眼。' },
      { text: '写一封回信，寄给"所有我不记得的人"', delta: { Transmission: 10, Depth: 6, Shadow: -6 }, shishenTag: '食神', memoryText: '我写了一封没有收件人的回信。写完就扔了。但我写完了。', echoKey: 'letter-returned' },
    ],
  },

  // Stage 6 alternate — triggered when 'transmission' themes dominant
  // (only fires if player has rich memory bank — checked in selector)
  {
    id: 'ch-legacy-alt-transmission',
    turn: '晚年',
    turnIndex: 6,
    title: '一本没写完的书',
    text: '七十岁。你书桌上有一本从三十五岁开始写的日记，现在写了一半。你知道你写不完了。你也知道，没关系。',
    requiredDominantTag: ['食神', '伤官'],
    choices: [
      { text: '把最后一页留白，只写一个字："听"', delta: { Depth: 10, Transmission: 8, Shadow: -8 }, shishenTag: '偏印', memoryText: '我在最后一页写了一个"听"字。就一个字。', echoKey: 'final-word' },
      { text: '把整本书交给外孙女', delta: { Transmission: 12, Coherence: 6, Shadow: -6 }, shishenTag: '食神', memoryText: '我把日记交给了她。没解释。我相信她能看懂。', echoKey: 'book-passed' },
      { text: '烧掉最后那几页，只留前面的部分', delta: { Depth: 6, Body: 4, Shadow: -3 }, shishenTag: '偏印', memoryText: '我烧了几页。留下的是我愿意让人看见的部分。' },
    ],
  },
];
