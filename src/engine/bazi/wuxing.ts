// 五行 — Five Elements

export type WuXing = '木' | '火' | '土' | '金' | '水';

export type WuXingRelation = 'same' | 'generate' | 'overcome' | 'generatedBy' | 'overcomeBy';

// 相生: 木→火→土→金→水→木
const GENERATE_ORDER: WuXing[] = ['木', '火', '土', '金', '水'];

export function wuxingRelation(from: WuXing, to: WuXing): WuXingRelation {
  if (from === to) return 'same';
  const fi = GENERATE_ORDER.indexOf(from);
  const ti = GENERATE_ORDER.indexOf(to);
  if ((fi + 1) % 5 === ti) return 'generate';   // 我生
  if ((fi + 2) % 5 === ti) return 'overcome';    // 我克
  if ((fi + 3) % 5 === ti) return 'overcomeBy';  // 克我
  if ((fi + 4) % 5 === ti) return 'generatedBy'; // 生我
  return 'same'; // unreachable
}

export const WUXING_COLORS: Record<WuXing, string> = {
  '木': '#4CAF50',
  '火': '#E53935',
  '土': '#D4A017',
  '金': '#B0BEC5',
  '水': '#1565C0',
};
