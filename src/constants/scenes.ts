import type { Scene } from '../types/game';

export const SCENES: Scene[] = [
  // Turn 0: Girlhood (0-12岁)
  {
    id: 'girlhood-1',
    turn: 'Girlhood',
    turnIndex: 0,
    title: '院子里的秘密',
    text: '夏天的午后，你躲在外婆家的院子里。阳光穿过葡萄架，在地上投下斑驳的影子。你发现了一只受伤的小鸟，它的翅膀垂着，眼睛里满是恐惧。',
    choices: [
      {
        text: '小心翼翼地捧起它，用旧布条包扎伤口',
        delta: { Regeneration: 8, Body: 3, Depth: 2 },
      },
      {
        text: '跑去叫大人来帮忙',
        delta: { Transmission: 5, Coherence: 5 },
      },
      {
        text: '蹲在旁边静静地看着它，不敢碰',
        delta: { Depth: 8, Shadow: 3 },
      },
    ],
  },
  {
    id: 'girlhood-2',
    turn: 'Girlhood',
    turnIndex: 0,
    title: '第一次考试',
    text: '期末考试发下来了。你考了全班第三名——妈妈的表情很复杂，她说"第三名也不错"，但你听出了她话里的意思。隔壁桌的小明考了第一名，正在被老师表扬。',
    choices: [
      {
        text: '暗暗发誓下次一定考第一',
        delta: { Coherence: 8, Shadow: 5 },
      },
      {
        text: '觉得第三名挺好的，开心地跑出去玩',
        delta: { Body: 5, Regeneration: 5 },
      },
      {
        text: '心里有点难过，但不知道该跟谁说',
        delta: { Depth: 7, Shadow: 4 },
      },
    ],
  },

  // Turn 1: The Threshold (12-18岁)
  {
    id: 'threshold-1',
    turn: 'The Threshold',
    turnIndex: 1,
    title: '镜中人',
    text: '你站在浴室的镜子前。身体在悄悄改变，你不太认识镜中的自己了。学校里有人开始议论你的身材，你假装没听见。今天体育课要跑800米。',
    choices: [
      {
        text: '咬牙跑完全程，哪怕最后一个到达',
        delta: { Body: 8, Coherence: 5 },
      },
      {
        text: '装病请假，躲在教室里看小说',
        delta: { Depth: 6, Shadow: 5, Body: -3 },
      },
      {
        text: '找好朋友一起慢慢跑，边跑边聊天',
        delta: { Transmission: 7, Regeneration: 3 },
      },
    ],
  },
  {
    id: 'threshold-2',
    turn: 'The Threshold',
    turnIndex: 1,
    title: '地下抽屉',
    text: '你在日记本上写了很多东西——关于那个总在走廊里对你笑的男生，关于和最好的朋友吵架后的失眠，关于觉得全世界都不理解你的夜晚。妈妈似乎翻了你的抽屉。',
    choices: [
      {
        text: '愤怒地质问妈妈，要求她尊重你的隐私',
        delta: { Coherence: 6, Transmission: -3, Shadow: 4 },
      },
      {
        text: '把最私密的页面撕掉，以后用密码锁日记',
        delta: { Depth: 5, Shadow: 6 },
      },
      {
        text: '主动和妈妈聊聊最近的心事，虽然有点尴尬',
        delta: { Transmission: 8, Regeneration: 4 },
      },
    ],
  },

  // Turn 2: First World (18-28岁)
  {
    id: 'firstworld-1',
    turn: 'First World',
    turnIndex: 2,
    title: '出发',
    text: '大学录取通知书到了。这是一座你从未去过的城市，离家一千公里。火车站台上，妈妈的眼圈红了，爸爸假装在看手机。你拖着行李箱，站在人生第一个真正的十字路口。',
    choices: [
      {
        text: '头也不回地走进车厢，眼泪留到找到座位以后',
        delta: { Coherence: 7, Depth: 5, Shadow: 3 },
      },
      {
        text: '抱了抱妈妈，说"我会常打电话的"',
        delta: { Transmission: 6, Regeneration: 5 },
      },
      {
        text: '心里有些犹豫，但还是一步步走向检票口',
        delta: { Body: 4, Depth: 4, Coherence: 3 },
      },
    ],
  },
  {
    id: 'firstworld-2',
    turn: 'First World',
    turnIndex: 2,
    title: '深夜实验室',
    text: '你在实验室连续待了三天。论文截止日期就在明天，数据还差最后一组。导师的消息越来越冷淡。与此同时，你最好的朋友在群里发消息说她要结婚了。',
    choices: [
      {
        text: '继续做实验——这是你选的路，必须走完',
        delta: { Coherence: 8, Body: -3, Shadow: 4 },
      },
      {
        text: '放下手头的事，先去恭喜朋友',
        delta: { Transmission: 7, Regeneration: 3 },
      },
      {
        text: '在实验桌前哭了一会儿，然后擦干眼泪继续',
        delta: { Depth: 7, Regeneration: 4, Shadow: 2 },
      },
    ],
  },

  // Turn 3: The Contraction (28-38岁)
  {
    id: 'contraction-1',
    turn: 'The Contraction',
    turnIndex: 3,
    title: '午夜厨房',
    text: '凌晨两点，你在厨房热牛奶。孩子终于睡着了，丈夫出差在外。白天的会议上你的方案被否决了，同事们似乎更关心你什么时候休完产假回来。厨房的灯嗡嗡作响。',
    choices: [
      {
        text: '打开笔记本，重新修改方案——你不会放弃的',
        delta: { Coherence: 8, Body: -4, Shadow: 3 },
      },
      {
        text: '给远方的老朋友发了一条长长的语音消息',
        delta: { Transmission: 6, Depth: 5 },
      },
      {
        text: '就这样坐在黑暗的厨房里，什么都不做，感受安静',
        delta: { Depth: 7, Regeneration: 5, Shadow: 2 },
      },
    ],
  },
  {
    id: 'contraction-2',
    turn: 'The Contraction',
    turnIndex: 3,
    title: '体检报告',
    text: '体检报告出来了，有几项指标亮了黄灯。医生说"不是大问题，但要注意生活方式"。你想起最近总是胃痛、失眠、脱发——身体在发出信号，而你一直在忽略。',
    choices: [
      {
        text: '认真制定健康计划，开始每天走路上班',
        delta: { Body: 8, Regeneration: 5 },
      },
      {
        text: '把报告塞进抽屉——哪有时间管这些',
        delta: { Coherence: 3, Shadow: 8, Body: -5 },
      },
      {
        text: '和丈夫商量，重新分配家务和工作时间',
        delta: { Transmission: 6, Body: 3, Coherence: 3 },
      },
    ],
  },

  // Turn 4: Midgame Reckoning (38-50岁)
  {
    id: 'midgame-1',
    turn: 'Midgame Reckoning',
    turnIndex: 4,
    title: '空房间',
    text: '孩子上大学了。你站在她空空的房间里，书架上还留着她小学时候的画。你忽然意识到，十多年来你不知不觉地把"我"变成了"妈妈"。镜子里的你，皱纹不知何时爬上了眼角。',
    choices: [
      {
        text: '报名一个你一直想学的绘画班',
        delta: { Regeneration: 8, Depth: 5, Coherence: 3 },
      },
      {
        text: '开始整理这些年攒下的日记和照片',
        delta: { Depth: 8, Transmission: 3 },
      },
      {
        text: '关上房门，坐在地上哭了很久',
        delta: { Shadow: 5, Depth: 5, Regeneration: 3 },
      },
    ],
  },
  {
    id: 'midgame-2',
    turn: 'Midgame Reckoning',
    turnIndex: 4,
    title: '十字路口',
    text: '一个猎头打来电话，说有一个新的职位——薪水翻倍，但需要去另一个城市。丈夫说"你看着办"。父母年纪大了。你的职业在现在的地方似乎已经触到了天花板。',
    choices: [
      {
        text: '接受这个机会——这可能是最后一次转折的机会',
        delta: { Coherence: 8, Shadow: 4, Transmission: -3 },
      },
      {
        text: '拒绝，但开始在本地寻找新的可能性',
        delta: { Transmission: 5, Regeneration: 5, Coherence: 3 },
      },
      {
        text: '和家人一起认真讨论，这不是一个人的决定',
        delta: { Transmission: 8, Depth: 4 },
      },
    ],
  },

  // Turn 5: Second Wind (50-65岁)
  {
    id: 'secondwind-1',
    turn: 'Second Wind',
    turnIndex: 5,
    title: '花园',
    text: '你在阳台上种了很多花。退休后的日子比想象中平静。有天下午，一个年轻女孩来敲门——她是你以前带过的实习生，现在已经是部门主管了。她说"当年你说的那句话改变了我"。你不太记得了。',
    choices: [
      {
        text: '请她进来喝茶，认真听她现在的困惑',
        delta: { Transmission: 8, Depth: 5 },
      },
      {
        text: '感到惊讶和欣慰，和她分享更多人生经验',
        delta: { Transmission: 6, Coherence: 4, Regeneration: 3 },
      },
      {
        text: '微笑着说"你自己很优秀"，不愿居功',
        delta: { Depth: 6, Shadow: -3, Regeneration: 4 },
      },
    ],
  },
  {
    id: 'secondwind-2',
    turn: 'Second Wind',
    turnIndex: 5,
    title: '旧照片',
    text: '整理阁楼时，你找到了一箱旧照片。里面有你年轻时候的样子——那个在火车站哭泣的女孩，那个在实验室熬夜的研究生，那个抱着婴儿在午夜厨房里的母亲。你几乎认不出她们了。',
    choices: [
      {
        text: '把照片整理成相册，给女儿看看你年轻的样子',
        delta: { Transmission: 7, Depth: 5 },
      },
      {
        text: '对着那些照片说"你做得很好"',
        delta: { Regeneration: 8, Shadow: -5, Depth: 4 },
      },
      {
        text: '静静地看了很久，然后放回原处',
        delta: { Depth: 8, Shadow: 3 },
      },
    ],
  },

  // Turn 6: Legacy (65岁+)
  {
    id: 'legacy-1',
    turn: 'Legacy',
    turnIndex: 6,
    title: '来信',
    text: '孙女从国外发来邮件，说她在学校的项目拿了奖，主题是"我的家庭"。她写了你的故事——虽然很多细节不太对，但那种精神是对的。她在邮件最后说"奶奶，你是我的英雄"。',
    choices: [
      {
        text: '慢慢地回一封长信，告诉她真正的故事',
        delta: { Transmission: 10, Depth: 5 },
      },
      {
        text: '把信打印出来，贴在冰箱上，每天都看一遍',
        delta: { Regeneration: 7, Coherence: 4 },
      },
      {
        text: '回复说"你才是自己的英雄"',
        delta: { Depth: 6, Transmission: 4, Shadow: -3 },
      },
    ],
  },
  {
    id: 'legacy-2',
    turn: 'Legacy',
    turnIndex: 6,
    title: '最后的院子',
    text: '又是一个夏天的午后。你坐在院子里——不是外婆的院子，是你自己的。葡萄架是你亲手搭的。一只鸟停在栏杆上，歪着头看你。你想起很久以前，那个蹲在地上看受伤小鸟的女孩。',
    choices: [
      {
        text: '对小鸟说"来，我这里安全"',
        delta: { Regeneration: 8, Transmission: 5, Shadow: -5 },
      },
      {
        text: '闭上眼睛，让阳光洒在脸上，感受此刻',
        delta: { Depth: 8, Body: 4, Coherence: 4 },
      },
      {
        text: '拿出手机，给女儿打个电话',
        delta: { Transmission: 8, Regeneration: 4 },
      },
    ],
  },
];
