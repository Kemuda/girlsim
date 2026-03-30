// ============================================================
// 维度配置 — 六个内在维度的显示信息
// ============================================================

import type { DimensionKey } from '../types/game';

export interface DimensionDisplay {
  label: string;
  icon: string;
  color: string; // Tailwind bg class
  description: string;
}

export const DIMENSION_DISPLAY: Record<DimensionKey, DimensionDisplay> = {
  Coherence: {
    label: '志',
    icon: '◈',
    color: 'bg-coherence',
    description: '方向感与意志力——你知道自己要走向哪里',
  },
  Depth: {
    label: '幽',
    icon: '◉',
    color: 'bg-depth',
    description: '内在世界的丰富——你看到了别人看不到的东西',
  },
  Regeneration: {
    label: '韧',
    icon: '❋',
    color: 'bg-regeneration',
    description: '复原力——无论冬天多长，你总会重新发芽',
  },
  Transmission: {
    label: '渡',
    icon: '◎',
    color: 'bg-transmission',
    description: '与他人的联结——你的涟漪扩散到了看不见的地方',
  },
  Body: {
    label: '身',
    icon: '♡',
    color: 'bg-body',
    description: '身体的智慧——先照顾好自己，才能照顾好一切',
  },
  Shadow: {
    label: '影',
    icon: '◐',
    color: 'bg-shadow-dim',
    description: '被压抑的部分——那些没有说出口的，并没有消失',
  },
};
