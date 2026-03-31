// 天干 — Ten Heavenly Stems

import type { WuXing } from './wuxing.ts';

export type YinYang = '阳' | '阴';

export interface TianGan {
  name: string;
  wuxing: WuXing;
  yinyang: YinYang;
  index: number;
}

const DATA: [string, WuXing, YinYang][] = [
  ['甲', '木', '阳'], ['乙', '木', '阴'],
  ['丙', '火', '阳'], ['丁', '火', '阴'],
  ['戊', '土', '阳'], ['己', '土', '阴'],
  ['庚', '金', '阳'], ['辛', '金', '阴'],
  ['壬', '水', '阳'], ['癸', '水', '阴'],
];

export const TIANGAN: TianGan[] = DATA.map(([name, wuxing, yinyang], index) => ({
  name, wuxing, yinyang, index,
}));

const BY_NAME = new Map(TIANGAN.map(t => [t.name, t]));

export function getTianGan(name: string): TianGan {
  const t = BY_NAME.get(name);
  if (!t) throw new Error(`Unknown 天干: ${name}`);
  return t;
}
