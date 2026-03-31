// 地支 — Twelve Earthly Branches

import type { WuXing } from './wuxing.ts';
import type { YinYang } from './tiangan.ts';

export interface CangGan {
  name: string;  // 天干 name
  weight: 'main' | 'middle' | 'residual';
}

export interface DiZhi {
  name: string;
  wuxing: WuXing;
  yinyang: YinYang;
  index: number;
  canggan: CangGan[];
}

// 地支 data: [name, wuxing, yinyang, [主气, 中气?, 余气?]]
const DATA: [string, WuXing, YinYang, string[]][] = [
  ['子', '水', '阳', ['癸']],
  ['丑', '土', '阴', ['己', '癸', '辛']],
  ['寅', '木', '阳', ['甲', '丙', '戊']],
  ['卯', '木', '阴', ['乙']],
  ['辰', '土', '阳', ['戊', '乙', '癸']],
  ['巳', '火', '阴', ['丙', '庚', '戊']],
  ['午', '火', '阳', ['丁', '己']],
  ['未', '土', '阴', ['己', '丁', '乙']],
  ['申', '金', '阳', ['庚', '壬', '戊']],
  ['酉', '金', '阴', ['辛']],
  ['戌', '土', '阳', ['戊', '辛', '丁']],
  ['亥', '水', '阴', ['壬', '甲']],
];

const WEIGHTS: ('main' | 'middle' | 'residual')[] = ['main', 'middle', 'residual'];

export const DIZHI: DiZhi[] = DATA.map(([name, wuxing, yinyang, cg], index) => ({
  name, wuxing, yinyang, index,
  canggan: cg.map((n, i) => ({ name: n, weight: WEIGHTS[i] })),
}));

const BY_NAME = new Map(DIZHI.map(d => [d.name, d]));

export function getDiZhi(name: string): DiZhi {
  const d = BY_NAME.get(name);
  if (!d) throw new Error(`Unknown 地支: ${name}`);
  return d;
}
