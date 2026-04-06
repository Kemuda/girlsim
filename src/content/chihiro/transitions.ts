// 大运转运事件 — Dayun transition narrations.
// These show between stages (after stage N ends, before stage N+1 begins).
// Not choices — just atmosphere that marks the shift.
// Indexed by the incoming stage (1..6). Stage 0 has no transition.

import type { TransitionEvent } from '../../types/game';

export const CHIHIRO_TRANSITIONS: TransitionEvent[] = [
  {
    from: 0,
    to: 1,
    text: '十二岁那年夏天，你去了一个地方。没人相信你回来了。但你回来了。\n\n丙申大运结束。你从父母家的院子里走了出去。丁酉大运开始——偏财当值。你的世界第一次不只是父母的房子，它开始像一条河，向下流。',
  },
  {
    from: 1,
    to: 2,
    text: '高中毕业那天下了很大的雨。你没带伞，但你一路走回了家，没跑。\n\n丁酉结束。戊戌大运开始——正官当值。秩序、规则、压力。你即将第一次替自己做决定，而这些决定的后果，要自己一个人扛。',
  },
  {
    from: 2,
    to: 3,
    text: '二十八岁那年冬天，你在东京的公寓里给自己煮了一锅味噌汤。你忽然意识到：没有人会替你做这件事了。\n\n戊戌结束。己亥大运开始——七杀当值。你开始和一些你打不过的东西正面对决：工作、父母的老去、自己的疲惫。',
  },
  {
    from: 3,
    to: 4,
    text: '三十八岁的某个早上，你醒得很早，天还没亮。你坐在厨房里，没开灯，也没做事。你只是坐着。那种坐着，是一种新的坐法。\n\n己亥结束。庚子大运开始——正印当值。有东西要来滋养你了。你要学会接受。',
  },
  {
    from: 4,
    to: 5,
    text: '五十岁那年，你第一次在镜子里看见自己像妈妈。不是像，是就是。你愣了一下，然后笑了。\n\n庚子结束。辛丑大运开始——偏印当值。一种奇怪的智慧，开始从你身体里长出来。它不来自书，不来自别人，它就是你。',
  },
  {
    from: 5,
    to: 6,
    text: '六十五岁。你把工作彻底放下。那一天你做的第一件事，是给自己的外孙女写了一封信，信里没说什么大道理，只是告诉她今天天气很好。\n\n辛丑结束。壬寅大运开始——劫财当值。你开始把你活过的这些，一点一点，交出去。',
  },
];
