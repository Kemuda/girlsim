# GirlSim Game Engine — 核心逻辑文档

本文档描述当前 GirlSim 项目的核心 Game Engine。每个模块包含两层：
1. **抽象逻辑** — 概念上做什么，为什么这样做
2. **具体实现** — 代码在哪里，关键函数和数据结构

---

## 总体架构

```
┌──────────────────────────────────────────────────────────┐
│                        UI Layer                          │
│  StartScreen / ChartRevealScreen / GameScreen /          │
│  EndScreen / DevPanel / ChoiceCard                       │
└──────────────────────────────────────────────────────────┘
                            ↕
┌──────────────────────────────────────────────────────────┐
│              Game State Engine (useReducer)              │
│              src/context/GameContext.tsx                 │
│  - Phases: start → chart-reveal → playing → ending       │
│  - Actions: START_GAME, MAKE_CHOICE, ADVANCE_TURN ...    │
└──────────────────────────────────────────────────────────┘
                            ↕
┌────────────────────┐  ┌────────────────────┐  ┌──────────┐
│   BaZi Engine      │  │  Narrator Service  │  │  Content │
│   src/engine/bazi  │  │   src/services     │  │   Layer  │
│  (pure functions)  │  │ (template-driven)  │  │ src/cont │
└────────────────────┘  └────────────────────┘  └──────────┘
```

**核心原则：内容与逻辑分离**

- `src/content/` — 纯数据：场景、结局、旁白模板
- `src/engine/bazi/` — 纯计算：八字推演，无副作用
- `src/services/` — 模板拼接：把数据和状态变成文本
- `src/context/` — 状态机：管理游戏生命周期

---

## Module 1: 五行（WuXing）

### 抽象逻辑
五行是整个引擎的代数基础。木、火、土、金、水之间存在五种关系：
- **same** 同 — 同元素
- **generate** 生 — 我生（木生火）
- **generatedBy** 被生 — 生我（木被水生）
- **overcome** 克 — 我克（木克土）
- **overcomeBy** 被克 — 克我（木被金克）

所有十神、能量、强弱判断都基于这五种关系。

### 具体实现
**文件**：`src/engine/bazi/wuxing.ts`

```typescript
const GENERATE_ORDER: WuXing[] = ['木', '火', '土', '金', '水'];

function wuxingRelation(from: WuXing, to: WuXing): WuXingRelation {
  if (from === to) return 'same';
  const fi = GENERATE_ORDER.indexOf(from);
  const ti = GENERATE_ORDER.indexOf(to);
  if ((fi + 1) % 5 === ti) return 'generate';      // 我生
  if ((fi + 2) % 5 === ti) return 'overcome';       // 我克
  if ((fi + 3) % 5 === ti) return 'overcomeBy';     // 克我
  if ((fi + 4) % 5 === ti) return 'generatedBy';    // 生我
}
```

**关键约定**：`wuxingRelation(from, to)` 返回 from 对 to 的关系。方向重要——颠倒会算反。

---

## Module 2: 天干地支

### 抽象逻辑
- **天干（10个）** 甲乙丙丁戊己庚辛壬癸：每个有五行 + 阴阳
- **地支（12个）** 子丑寅卯辰巳午未申酉戌亥：每个有五行 + 阴阳 + **藏干**

藏干（地支中暗藏的天干）是八字深度的核心：地支不只是一个元素，是若干天干的容器。藏干分主气、中气、余气三层，权重递减。

### 具体实现
**文件**：`src/engine/bazi/tiangan.ts`、`src/engine/bazi/dizhi.ts`

```typescript
// 地支数据示例
['未', '土', '阴', ['己', '丁', '乙']]
//                  主气  中气  余气
```

主气总是存在；中气余气可能没有。在 `dizhi.ts` 里映射为：
```typescript
canggan: [
  { name: '己', weight: 'main' },
  { name: '丁', weight: 'middle' },
  { name: '乙', weight: 'residual' },
]
```

---

## Module 3: 命盘生成

### 抽象逻辑
一张八字 = 四柱（年月日时），每柱 = 一个天干 + 一个地支。

约束：
1. **六十甲子奇偶律** — 天干索引和地支索引必须同奇偶（甲子可以、甲丑不行）
2. **五虎遁** — 月柱天干由年柱天干决定（给定月支后唯一）
3. **五鼠遁** — 时柱天干由日柱天干决定（给定时支后唯一）

### 具体实现
**文件**：`src/engine/bazi/chart.ts`

```typescript
// 五虎遁：年干 → 月干起点
function monthStemStart(yearStemIdx: number): number {
  const group = yearStemIdx % 5;
  return [2, 4, 6, 8, 0][group]; // 丙戊庚壬甲
}

// 五鼠遁：日干 → 时干起点
function hourStemStart(dayStemIdx: number): number {
  const group = dayStemIdx % 5;
  return [0, 2, 4, 6, 8][group]; // 甲丙戊庚壬
}

// 随机生成符合所有约束的命盘
generateRandomChart(): BaZiChart

// 从固定数据生成（用于千寻）
generateLifeFromChart(chart): BaZiLife
```

---

## Module 4: 十神（ShiShen）

### 抽象逻辑
十神是日主（日柱天干）和其他天干之间的关系。10种关系两两组合 = 5×2 = 10种十神。

| 五行关系 | 同阴阳 | 异阴阳 |
|---------|-------|-------|
| 同我（比劫） | 比肩 | 劫财 |
| 我生（食伤） | 食神 | 伤官 |
| 我克（财） | 偏财 | 正财 |
| 克我（官杀） | 七杀 | 正官 |
| 生我（印） | 偏印 | 正印 |

每种十神在叙事上有独特含义：
- 比肩 = 同行的镜子
- 食神 = 温柔的表达
- 伤官 = 叛逆的表达
- 七杀 = 强烈压力
- 正印 = 正统庇护
- ……

### 具体实现
**文件**：`src/engine/bazi/shishen.ts`

```typescript
function calcShiShen(dayMaster: TianGan, target: TianGan): ShiShen {
  const rel = wuxingRelation(dayMaster.wuxing, target.wuxing);
  const samePolarity = dayMaster.yinyang === target.yinyang;

  switch (rel) {
    case 'same':        return samePolarity ? '比肩' : '劫财';
    case 'generate':    return samePolarity ? '食神' : '伤官';
    case 'overcome':    return samePolarity ? '偏财' : '正财';
    case 'overcomeBy':  return samePolarity ? '七杀' : '正官';
    case 'generatedBy': return samePolarity ? '偏印' : '正印';
  }
}
```

---

## Module 5: 身强身弱（Strength）

### 抽象逻辑
日主有多少"自身能量"。身强 = 资源充沛能驾驭外部，身弱 = 资源紧张需要等待。这决定了每张命盘的核心生存策略。

身强弱由四个因素加权：

| 因素 | 权重 | 含义 |
|------|------|------|
| 得令 | 40% | 月支是不是日主的当令季节 |
| 得地 | 25% | 日主在日支上的十二长生位置 |
| 得生 | 20% | 命盘中有多少元素生日主 |
| 得助 | 15% | 命盘中有多少同类元素 |

### 具体实现
**文件**：`src/engine/bazi/strength.ts`、`changsheng.ts`

```typescript
judgeStrength(chart): {
  total: number;       // 0-100
  level: '极弱' | '偏弱' | '中和' | '偏强' | '极强';
  factors: StrengthFactor[];  // 4个因素的明细
}
```

得地用十二长生表查日主在日支的强度（长生 60、临官 90、帝旺 100、衰 30、墓 5、绝 2 等）。

加权后归一化到 0-100：
- ≤20 极弱
- ≤40 偏弱
- ≤60 中和
- ≤80 偏强
- 80+ 极强

---

## Module 6: 月柱主题（Month Theme）

### 抽象逻辑
月支主气对日主的十神 = **人生的核心命题**。这是命盘里最重要的单一信号。

例：千寻日主癸水，月支未的主气是己土，土克水同阴阳 → 七杀。所以她一生的命题是"持续压力下记住自己是谁"。

### 具体实现
**文件**：`src/engine/bazi/month-theme.ts`

```typescript
extractMonthTheme(chart): {
  primaryShiShen: ShiShen;     // 主气十神
  secondaryShiShen?: ShiShen;  // 中气十神（如有）
  description: string;
  coreQuestion: string;
}
```

---

## Module 7: 大运（Luck Cycles）

### 抽象逻辑
七个十年期的运势变化，对应人生七个阶段（童年、青春、初社会、而立、中年、知天命、晚年）。

**起运规则**：从月柱开始，根据年干阴阳和性别决定方向：
- 阳年男 / 阴年女 → 顺行
- 阴年男 / 阳年女 → 逆行

每步走一柱（天干+1，地支+1，或同时-1）。

**能量类型**（从大运对日主的关系推出）：
- support 滋养（生我）
- resource 同类（同我）
- drain 输出（我生）
- pressure 压力（克我）
- neutral 平淡（我克）

**关键修正（已修）**：
1. energy 必须从日主向大运算（`wuxingRelation(dayMaster, stem)`），方向反了会得到完全相反的结果
2. 大运地支也有自己的 energy，**综合能量取较强信号**（pressure > support > drain > resource > neutral）

### 具体实现
**文件**：`src/engine/bazi/luck-cycles.ts`

```typescript
generateLuckCycles(chart): DaYun[]  // 7 cycles

interface DaYun {
  index: number;
  stage: LifeStageName;
  ageRange: string;
  stem: TianGan;
  branch: DiZhi;
  shishen: ShiShen;            // 大运干十神
  branchShiShen: ShiShen;      // 大运支主气十神
  stemEnergy: DaYunEnergy;     // 仅看天干
  branchEnergy: DaYunEnergy;   // 仅看地支
  energyColor: DaYunEnergy;    // 综合（更强的信号）
}
```

综合能量算法：
```typescript
const ENERGY_RANK = { pressure: 0, support: 1, drain: 2, resource: 3, neutral: 4 };
function compositeEnergy(stemE, branchE) {
  return ENERGY_RANK[stemE] <= ENERGY_RANK[branchE] ? stemE : branchE;
}
```

---

## Module 8: 透出（Penetration）

### 抽象逻辑
当地支的某个藏干，和某个天干**完全相同**时（不只是同五行），这个藏干就"透出"了——意味着这个隐藏的特质浮到表面，被世界看见。

千寻例：
- 酉藏辛 ← 年干辛 → **偏印透出**（不寻常的智慧浮现）
- 未藏乙 ← 月干乙 → **食神透出**（温柔表达浮现）
- 卯藏乙 ← 月干乙 → **食神透出**

人格画像 = 透出十神 + 月柱主题 + 强弱。

### 具体实现
**文件**：`src/engine/bazi/touchou.ts`

```typescript
detectTouChou(chart): TouChouResult[]
```

**关键修正（已修）**：之前用 `stem.wuxing === hidden.wuxing` 判定，这是错的——庚和辛同为金但不是同一个天干。修正为 `stem.name === hidden.name` 精确匹配。

---

## Module 9: 偏枯（Imbalance）

### 抽象逻辑
五行的分布是否平衡。偏枯严重的命盘会有"渴望"——缺少的元素是这一生的暗中追求。

权重：
- 天干每个 1.0
- 地支主气 1.0
- 地支中气 0.5
- 地支余气 0.3

### 具体实现
**文件**：`src/engine/bazi/imbalance.ts`

```typescript
analyzeImbalance(chart): {
  distribution: WuXingCount[];  // 五元素分布
  dominant: WuXing[];           // 占优（≥3.0）
  missing: WuXing[];            // 缺（=0）
  weak: WuXing[];               // 弱（≤1.0）
  obsessionElement: WuXing;     // 命盘渴望什么
  severity: 'balanced' | 'mild' | 'moderate' | 'severe';
}
```

---

## Module 10: 命书生成（Life Assembly）

### 抽象逻辑
组合所有模块，生成一份完整的"命书"。这是引擎对外的主入口。

### 具体实现
**文件**：`src/engine/bazi/life.ts`

```typescript
function generateLife(): BaZiLife {
  const chart = generateRandomChart();
  return generateLifeFromChart(chart);
}

function generateLifeFromChart(chart: BaZiChart): BaZiLife {
  return {
    chart,
    dayMaster: chart.day.stem,
    strength: judgeStrength(chart),
    monthTheme: extractMonthTheme(chart),
    imbalance: analyzeImbalance(chart),
    luckCycles: generateLuckCycles(chart),
    penetrations: detectTouChou(chart),
    chartString: chartToString(chart),
  };
}
```

---

## Module 11: 叙事翻译层（Narrative）

### 抽象逻辑
玩家**不应该看到任何八字术语**。命盘 → 故事语言的翻译发生在这一层。

每个引擎数据都映射到一段普通话：
- 日主 → 身份隐喻（"你是一场雨"）
- 强弱 → 资源描述
- 月柱主题 → 人生命题段落
- 缺失元素 → 渴望描述
- 大运能量 → 阶段心境
- 整体大运弧线 → 时代背景

### 具体实现
**文件**：`src/engine/bazi/narrative.ts`

```typescript
function generateNarrativeFromLife(life: BaZiLife): LifeNarrative {
  // 查 DM_IDENTITY[日主] → "你是一场雨。"
  // 查 STRENGTH_NARRATIVE[level] → 资源描述
  // 查 THEME_NARRATIVE[十神] → 命题段落
  // 查 OBSESSION_NARRATIVE[缺] → 渴望描述
  // 用 generateEraDesc(life) → 时代背景段落
  // 用 ENERGY_INTROS[每个大运能量] → 阶段心境
  return { identity, nature, strengthDesc, themeOpening, ..., eraDesc, stageIntros };
}

function generateEndingReflection(life: BaZiLife): string
```

`generateEraDesc` 根据七个大运的能量分布（早期/中期/晚期 pressure 集中度、support 集中度、drain 数量）拼接出一段描述时代风向的话。

---

## Module 12: 游戏状态机（Game State）

### 抽象逻辑
游戏由若干**相位（phase）**组成。每个相位等待特定的玩家动作，或自动推进到下一相位。

```
start → chart-reveal → playing → transition → playing → ... → ending
                                ↘ threshold ↗
```

- **start**：开始页
- **chart-reveal**：抽命/抽运（千寻+full模式）
- **playing**：当前场景，等待玩家选择
- **transition**：选择已做，显示旁白，等待"继续"
- **threshold**：命运卡（full 模式 40% 概率触发）
- **ending**：结局

### 具体实现
**文件**：`src/context/GameContext.tsx`

`useReducer` 管理所有状态。核心数据：
```typescript
interface GameState {
  phase: GamePhase;
  mode: GameMode;                    // 'full' | 'shadow' | 'chihiro'
  characterState: CharacterState;    // 六维
  currentTurnIndex: number;          // 0-6 阶段
  currentSceneIndex: number;
  currentScene: Scene | null;
  history: HistoryEntry[];           // 所有已做的选择
  shishenChoices: ShiShen[];         // 选择的十神方向轨迹
  baziLife: BaZiLife | null;
  baziNarrative: LifeNarrative | null;
  devMode: boolean;
  // ...
}
```

核心 actions：
| Action | 触发 | 效果 |
|--------|------|------|
| `START_GAME` | StartScreen 按钮 | 生成命盘+叙事，进 chart-reveal |
| `BEGIN_PLAY` | ChartReveal "开始这一生" | 加载第一场景，进 playing |
| `MAKE_CHOICE` | ChoiceCard 点击 | 应用 delta 到六维，记 history，记 shishenChoices，进 transition |
| `RESOLVE_THRESHOLD` | 命运卡选择 | 同 MAKE_CHOICE |
| `ADVANCE_TURN` | "继续" 按钮 | 加载下一场景，可能触发命运卡或 ending |
| `TOGGLE_DEV` | Shift+D | 切换 devMode |

---

## Module 13: Narrator 服务

### 抽象逻辑
选择做完后，要给玩家一段反馈旁白。旁白应该：
1. 引用玩家的选择文本
2. 反映当前的人格状态（最高维度决定基调）
3. 模式相关（中文/英文）

### 具体实现
**文件**：`src/services/narrator.ts`

```typescript
function generateNarration(state, choiceText, history, mode): string {
  // 1. 找最高维度（如 Coherence ≥70 → 'high_coherence'）
  // 2. 从对应模板池随机抽一句
  // 3. 用连接词包装选择文本 + 模板句
  // 4. mode 决定中/英模板
}
```

模板存放：`src/content/narration.ts`
- `NARRATION_TEMPLATES`：英文（full mode 默认）
- `ZH_NARRATION_TEMPLATES`：中文（chihiro 和 full 中文版）
- `SHADOW_NARRATION`：shadow mode 专用

---

## Module 14: 内容层（Content Layer）

### 抽象逻辑
**所有叙事文本独立于代码逻辑**。改故事不需要碰任何 .ts 文件以外的东西。

### 文件结构
```
src/content/
├── scenes.ts         — 14 个 full 模式场景（英文）
├── thresholds.ts     — 6 个命运卡
├── endings.ts        — 7 个结局
├── narration.ts      — 旁白模板（中英）
├── dimensions.ts     — 六维显示配置
├── ui.ts             — 所有 UI 文本（中文）
├── shadow-*.ts       — Shadow 模式专属
└── chihiro/
    ├── chart.ts      — 千寻固定命盘
    ├── scenes.ts     — 14 个千寻场景
    ├── thresholds.ts — 4 个千寻命运卡
    └── endings.ts    — 5 个千寻结局
```

### 数据形状
```typescript
interface Scene {
  id: string;
  turn: string;
  turnIndex: number;
  title: string;
  text: string;
  choices: Choice[];
}

interface Choice {
  text: string;
  delta: Partial<CharacterState>;     // 六维变化
  shishenTag?: ShiShen;                // 用于结局判定
}
```

---

## Module 15: 结局判定

### 抽象逻辑
结局不是看分数，是看选择**模式**。

**Full mode**：六维中最高的那个决定结局类型（每种结局要求 highestDim ≥ 80，shadow ≥ 60）。
**Shadow mode**：依据五维分布判定。
**Chihiro mode**：根据 `shishenChoices` 数组里十神的占比判定。

### 具体实现
- `src/constants/endings.ts` — full mode 判定函数 `determineEnding(state)`
- `src/content/shadow-endings.ts` — shadow mode 判定函数
- `src/content/chihiro/endings.ts` — chihiro 判定函数 `determineChihiroEnding(shishenChoices)`

千寻判定示例：
```typescript
const STRONG = 4, LEAN = 2;
if (shishen('食神') + shishen('伤官') >= STRONG) return '千寻';
if (shishen('七杀') >= STRONG) return '战士';
if (shishen('正印') + shishen('正官') >= STRONG) return '听话的孩子';
if (shishen('偏印') >= STRONG - 1) return '她留下了';
// 否则取最强的 cluster，达到 LEAN 阈值则倾向那个
// 全部低于阈值 → '普通人'
```

---

## Data Flow（一个完整选择的生命周期）

```
1. 玩家点击 ChoiceCard
   ↓
2. GameScreen.handleChoice(index)
   ↓
3. 调用 generateNarration(state, choice.text, history, mode)
   → 返回 aiResponse 字符串
   ↓
4. dispatch({ type: 'MAKE_CHOICE', choiceIndex, aiResponse })
   ↓
5. GameContext reducer:
   - applyDelta(state.characterState, choice.delta) → newState
   - history.push({ ..., stateBefore, stateAfter })
   - shishenChoices.push(choice.shishenTag) （如有）
   - phase = 'transition'
   - aiNarration = aiResponse
   ↓
6. UI 重新渲染：StatPanel 显示新六维（带变化指示），
   NarrativeText 显示 aiResponse，按钮变成 "继续"
   ↓
7. 玩家点击 "继续"
   ↓
8. dispatch({ type: 'ADVANCE_TURN' })
   ↓
9. reducer 计算下一场景：
   - currentSceneIndex + 1
   - 如果跨阶段且是 full mode，40% 概率插一张命运卡
   - 如果 chihiro mode 进入 Stage 3 且 Body+Regen < 50，强制触发"breaking point"
   - 如果没有下一场景，phase = 'ending'
   ↓
10. 进入下一场景，等待玩家选择
```

---

## Developer Mode

### 抽象逻辑
DevPanel 把引擎所有内部数据可视化，用于调试和理解。**对玩家完全不可见，对开发者完全透明。**

### 切换
- 快捷键 `Shift+D`，全局监听
- 在 `App.tsx` 注册 keydown listener
- DevPanel 仅在 GameScreen 和 ChartRevealScreen 渲染

### 显示内容
1. **命盘** — 四柱：每格显示 天干名+五行+阴阳+十神，地支同样，再下面藏干 with 透明度 (主气 85%、中气 55%、余气 35%)
2. **当前大运** — 干和支分行显示各自的十神和能量，最下面综合能量
3. **五行分布** — 5 个元素的条形图，按五行颜色，显示百分比，缺的标红
4. **透出** — 列表
5. **选择轨迹** — 主导十神 + 全部十神计数 + 最近 6 个选择文本
6. **当前六维** — 6 个条形图，Shadow 高时变红

### 实现
**文件**：`src/components/DevPanel.tsx`

调色统一从 `WUXING_COLORS` 取，所有颜色和五行绑定。

---

## 当前已修复的关键 Bug 历史

1. **Energy 方向反了** — `wuxingRelation(stem, dayMaster)` 改为 `wuxingRelation(dayMaster, stem)`
2. **透出判定太宽** — `stem.wuxing === hidden.wuxing` 改为 `stem.name === hidden.name`
3. **大运能量只看天干** — 加入 `branchEnergy` 和 `compositeEnergy`
4. **抽运剧透阶段名** — 改为单段时代背景描述（`eraDesc`），不再列出 7 个阶段标签

---

## 已知缺失能力（待加）

1. **合冲刑害** — 地支之间的关系（六合、三合、冲、刑、害）完全没做。这影响真实的力量分布判断
2. **大运 × 原盘交互** — 大运目前独立计算，没有和原盘干支发生冲合
3. **场景选择动态化** — 当前是固定线性 14 场景，没有场景池或大运驱动的场景挑选
4. **记忆系统** — 没有"被压力侵蚀的记忆"机制
5. **回声系统** — 早期选择无法在后期场景里回响
6. **气值系统** — 身弱体感停留在数字层面，没变成可交互的限制

这些是 Phase C 的目标。