# GirlSim — 她的一生

一个选择驱动的叙事 RPG 游戏。玩家经历一个女性从童年到暮年的七个人生阶段，在关键时刻做出选择，塑造六个内在维度，最终抵达属于自己的结局。

> **项目状态**：早期开发中，欢迎朋友们参与共创。

---

## 快速开始

### 第一步：安装 Node.js

如果你的电脑还没有 Node.js，先去 [nodejs.org](https://nodejs.org/) 下载安装 **LTS 版本**（左边那个绿色按钮）。安装时一路点"下一步"就行。

### 第二步：打开终端

- **Mac**：按 `Cmd + 空格`，输入 `Terminal`，回车
- **Windows**：按 `Win + R`，输入 `cmd`，回车（或搜索"命令提示符"）

### 第三步：下载项目并运行

在终端里逐行输入以下命令（每行输完按回车）：

```bash
git clone https://github.com/Kemuda/girlsim.git
cd girlsim
npm install
npm run dev
```

> 如果你没装过 git，去 [git-scm.com](https://git-scm.com/) 下载安装，或者直接在 GitHub 页面点绿色的 **Code → Download ZIP**，解压后在终端 `cd` 到解压目录再执行后两行命令。

### 第四步：打开游戏

终端会显示类似 `Local: http://localhost:5173` 的地址。在浏览器里打开这个地址就能玩了。

按 `Ctrl + C`（Mac 也是 Ctrl 不是 Cmd）可以停止。

---

## 游戏内容

- **7 个人生阶段**：Girlhood (0-12) → The Threshold (12-18) → First World (18-28) → The Contraction (28-38) → Midgame Reckoning (38-50) → Second Wind (50-65) → Legacy (65+)
- **14 个核心场景**：每个阶段 2 个关键时刻，每个时刻 3 个选项
- **6 张命运卡**：阶段转换时 40% 概率触发（Disruption / Opening / Mirror / Ghost）
- **6 个内在维度**：志 · 幽 · 韧 · 渡 · 身 · 影
- **7 种结局**：铁骨 · 深潭 · 春草 · 回声 · 扎根 · 暗流 · 河流

---

## 如何共创

这个项目欢迎所有人参与，不需要会写代码。

### 你可以做什么

| 参与方式 | 需要的技能 | 具体做什么 |
|---------|-----------|-----------|
| **写故事** | 会写字就行 | 为场景写选项文案、设计新的命运卡、撰写结局文本 |
| **设计角色** | 了解某个女性角色 | 在 `docs/universes.md` 里为角色设计六维面板、写人物描述 |
| **讨论游戏设计** | 有想法就行 | 在 Issues 里讨论维度体系、结局逻辑、叙事风格 |
| **测试和反馈** | 会玩游戏就行 | 试玩后提 bug 或改进建议 |
| **写代码** | React + TypeScript | 实现新功能、修复 bug、改进 UI |

### 想写故事 / 改文案？只动 `src/content/` 目录

这是最容易参与的方式。所有游戏文本都集中在 `src/content/` 目录下，和代码完全分离：

| 想改什么 | 编辑哪个文件 |
|---------|------------|
| 场景文案、选项文字、数值影响 | `src/content/scenes.ts` |
| 命运卡内容 | `src/content/thresholds.ts` |
| 结局标题和描述 | `src/content/endings.ts` |
| 旁白模板、过渡文本 | `src/content/narration.ts` |
| 维度中文名、图标 | `src/content/dimensions.ts` |
| 按钮文字、UI 提示 | `src/content/ui.ts` |

> 改这些文件不需要懂 React 或 TypeScript。文件里的结构很直观——找到你想改的文字，改掉，保存，刷新浏览器就能看到效果。

### 想讨论想法？去 Issues

去项目的 [Issues 页面](https://github.com/Kemuda/girlsim/issues) 发帖讨论。可以聊的东西包括：

- 某个角色的面板数值设计得合不合理
- 新角色提名（附上你觉得她的六维应该是什么）
- 场景和选项的文案建议
- 游戏机制的改进想法
- 任何你觉得不对劲的地方

### 想提交改动？完整流程

如果你想直接修改文件并提交（不熟悉 GitHub 也没关系，跟着做就行）：

1. **Fork 项目**：点 GitHub 页面右上角的 **Fork** 按钮，把项目复制到你自己的账号下
2. **Clone 你的 Fork**：
   ```bash
   git clone https://github.com/你的用户名/girlsim.git
   cd girlsim
   npm install
   ```
3. **创建新分支**（给你的改动起个名字）：
   ```bash
   git checkout -b my-change
   ```
4. **改你想改的文件**，保存
5. **提交改动**：
   ```bash
   git add .
   git commit -m "简短描述你改了什么"
   git push origin my-change
   ```
6. **创建 Pull Request**：回到 GitHub 页面，点击 **Compare & pull request** 按钮，写几句说明，提交

> 不确定该怎么改？先开个 Issue 聊聊，我们一起讨论。

---

## 项目结构

```
src/
├── content/              <- 所有可编辑的文本内容（改剧本只动这里）
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
├── components/           UI 组件
├── screens/              页面（开始 / 游戏 / 结局）
└── types/                TypeScript 类型定义

docs/
├── universes.md          角色宇宙地图（17 个角色的六维面板 + 人物设定）
└── engine-design.md      游戏引擎设计文档（影子代价、叙事感知系统等）
```

## 技术栈

React 19 + TypeScript + Vite + Tailwind CSS 4
