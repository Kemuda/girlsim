# GirlSim — 她的一生

一个选择驱动的叙事 RPG 游戏。玩家经历一个女性从童年到暮年的七个人生阶段，在关键时刻做出选择，塑造六个内在维度，最终抵达属于自己的结局。

## 快速开始

```bash
git clone https://github.com/Kemuda/girlsim.git
cd girlsim
npm install
npm run dev
```

打开 `http://localhost:5173` 开始体验。

## 游戏内容

- **7 个人生阶段**：Girlhood (0-12) → The Threshold (12-18) → First World (18-28) → The Contraction (28-38) → Midgame Reckoning (38-50) → Second Wind (50-65) → Legacy (65+)
- **14 个核心场景**：每个阶段 2 个关键时刻，每个时刻 3 个选项
- **6 张命运卡**：阶段转换时 40% 概率触发（Disruption / Opening / Mirror / Ghost）
- **6 个内在维度**：凝聚 · 深度 · 再生 · 传递 · 身体 · 暗影
- **7 种结局**：铁骨 · 深潭 · 春草 · 回声 · 扎根 · 暗流 · 河流

## 项目结构

```
src/
├── content/              ← 所有可编辑的文本内容（改剧本只动这里）
│   ├── index.ts          统一入口
│   ├── scenes.ts         14 个场景（叙事 + 选项 + 数值影响）
│   ├── thresholds.ts     6 张命运卡
│   ├── endings.ts        7 种结局文本
│   ├── narration.ts      旁白模板 + 阶段过渡文本
│   ├── dimensions.ts     六维度的中文名 / 图标 / 颜色 / 描述
│   └── ui.ts             所有按钮、标签、提示文案
│
├── context/              游戏引擎（状态管理 + reducer）
├── constants/            游戏逻辑（结局判定函数）
├── services/             叙事生成逻辑
├── components/           UI 组件（StatBar / ChoiceCard / NarrativeText / TurnIndicator）
├── screens/              页面（StartScreen / GameScreen / EndScreen）
└── types/                TypeScript 类型定义
```

## 编辑分工

| 想改什么 | 动哪里 |
|---------|--------|
| 场景文案、选项文字、数值影响 | `src/content/scenes.ts` |
| 命运卡内容 | `src/content/thresholds.ts` |
| 结局标题和描述 | `src/content/endings.ts` |
| 旁白模板、过渡文本 | `src/content/narration.ts` |
| 维度中文名、图标 | `src/content/dimensions.ts` |
| 按钮文字、UI 提示 | `src/content/ui.ts` |
| 游戏玩法、状态逻辑 | `src/context/` `src/constants/` `src/services/` |
| 界面样式、布局 | `src/components/` `src/screens/` `src/index.css` |

## 技术栈

React 19 + TypeScript + Vite + Tailwind CSS 4
