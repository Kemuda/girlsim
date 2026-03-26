# GirlSim — 她的一生

一款选择驱动的叙事 RPG。玩家将经历一个女性从童年到暮年的七个人生阶段，在关键时刻做出选择，塑造六个内在维度，最终走向属于自己的结局。

### 项目进度

目前有一个**可运行的 MVP**——完整的游戏流程已经跑通，包括 7 个人生阶段、14 个场景、命运卡触发和结局判定。里面的文案是占位性质的，但足够让你感受这个游戏的形态。**欢迎先玩一遍。**

与此同时，我们正在并行推进**剧情和内容设计**：17 个女性角色的六维面板与人生故事线、场景文案与选项打磨、以及引擎机制的完善（影子代价系统、叙事感知系统等）。设计文档在 `docs/` 目录下。

骨架搭好了，现在在填血肉。如果你想参与，这是最好的时机。

---

## 快速开始

### 1. 安装 Node.js

去 [nodejs.org](https://nodejs.org/) 下载 **LTS 版本**（左边那个绿色按钮），安装时一路"下一步"即可。

### 2. 打开终端

- **Mac**：`Cmd + 空格`，输入 `Terminal`，回车
- **Windows**：`Win + R`，输入 `cmd`，回车（或搜索"命令提示符"）

### 3. 下载并运行

在终端里逐行输入（每行输完按回车）：

```bash
git clone https://github.com/Kemuda/girlsim.git
cd girlsim
npm install
npm run dev
```

> 没装 git？去 [git-scm.com](https://git-scm.com/) 下载，或者在 GitHub 页面点 **Code → Download ZIP**，解压后 `cd` 到目录，执行后两行即可。

### 4. 开始游戏

终端会显示 `Local: http://localhost:5173`。浏览器打开这个地址就能玩。`Ctrl + C` 停止服务。

---

## 游戏内容

- **7 个人生阶段**：Girlhood (0-12) → The Threshold (12-18) → First World (18-28) → The Contraction (28-38) → Midgame Reckoning (38-50) → Second Wind (50-65) → Legacy (65+)
- **14 个核心场景**：每个阶段 2 个关键时刻，每个时刻 3 个选项
- **6 张命运卡**：阶段转换时 40% 概率触发（Disruption / Opening / Mirror / Ghost）
- **6 个内在维度**：志 · 幽 · 韧 · 渡 · 身 · 影
- **7 种结局**：铁骨 · 深潭 · 春草 · 回声 · 扎根 · 暗流 · 河流

---

## 如何参与

这个项目欢迎所有人参与，不需要会写代码。

### 你可以做什么

| 参与方式 | 门槛 | 具体内容 |
|---------|------|---------|
| **写故事** | 会写字就行 | 为场景写选项文案、设计新的命运卡、撰写结局文本 |
| **设计角色** | 熟悉某个女性角色 | 在 `docs/universes.md` 里设计六维面板、写人物描述 |
| **讨论设计** | 有想法就行 | 在 Issues 里讨论维度体系、结局逻辑、叙事风格 |
| **试玩反馈** | 会玩游戏就行 | 玩一遍，告诉我们哪里不对劲 |
| **写代码** | React + TypeScript | 新功能、bug 修复、UI 改进 |

### 改文案：只动 `src/content/`

所有游戏文本集中在 `src/content/` 目录下，与代码完全分离：

| 想改什么 | 文件 |
|---------|------|
| 场景文案、选项、数值影响 | `src/content/scenes.ts` |
| 命运卡 | `src/content/thresholds.ts` |
| 结局文本 | `src/content/endings.ts` |
| 旁白模板、过渡文本 | `src/content/narration.ts` |
| 维度中文名、图标 | `src/content/dimensions.ts` |
| 按钮、标签、提示 | `src/content/ui.ts` |

不需要懂 React 或 TypeScript。文件结构很直观——找到想改的文字，改掉，保存，刷新浏览器即可看到效果。

### 讨论想法：去 Issues

[Issues 页面](https://github.com/Kemuda/girlsim/issues) 是我们讨论的地方。适合聊的话题：

- 角色面板数值是否合理
- 新角色提名（附上你觉得她的六维应该怎么分配）
- 场景和选项的文案建议
- 游戏机制的改进想法
- 任何觉得不对劲的地方

### 提交改动：Fork → 修改 → PR

不熟悉 GitHub 也没关系，跟着步骤来：

1. **Fork**：点页面右上角 **Fork** 按钮，将项目复制到你的账号下
2. **Clone 你的 Fork**：
   ```bash
   git clone https://github.com/你的用户名/girlsim.git
   cd girlsim
   npm install
   ```
3. **建分支**：
   ```bash
   git checkout -b my-change
   ```
4. **修改文件**，保存
5. **提交并推送**：
   ```bash
   git add .
   git commit -m "简短描述你改了什么"
   git push origin my-change
   ```
6. **发起 Pull Request**：回到 GitHub，点 **Compare & pull request**，写几句说明，提交

> 不确定怎么改？先开个 Issue，我们一起聊。

---

## 项目结构

```
src/
├── content/              <- 所有叙事文本（改内容只动这里）
│   ├── scenes.ts         14 个场景
│   ├── thresholds.ts     6 张命运卡
│   ├── endings.ts        7 种结局
│   ├── narration.ts      旁白模板 + 过渡文本
│   ├── dimensions.ts     六维度配置
│   ├── ui.ts             界面文案
│   └── index.ts          统一导出
│
├── context/              游戏状态管理
├── constants/            游戏逻辑
├── services/             叙事生成
├── components/           UI 组件
├── screens/              页面
└── types/                类型定义

docs/
├── universes.md          角色宇宙地图（17 个角色的六维面板 + 设定）
└── engine-design.md      引擎设计（影子代价、叙事感知等）
```

## 技术栈

React 19 + TypeScript + Vite + Tailwind CSS 4
