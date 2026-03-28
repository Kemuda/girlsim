// 十神 — Ten Gods

import type { TianGan } from './tiangan.ts';
import { wuxingRelation } from './wuxing.ts';

export type ShiShen =
  | '比肩' | '劫财'
  | '食神' | '伤官'
  | '偏财' | '正财'
  | '七杀' | '正官'
  | '偏印' | '正印';

export const SHISHEN_LIST: ShiShen[] = [
  '比肩', '劫财', '食神', '伤官', '偏财',
  '正财', '七杀', '正官', '偏印', '正印',
];

export interface ShiShenInfo {
  name: ShiShen;
  relation: string;
  description: string;
}

export const SHISHEN_INFO: Record<ShiShen, ShiShenInfo> = {
  '比肩': { name: '比肩', relation: '同我·同阴阳', description: '平等的同行者' },
  '劫财': { name: '劫财', relation: '同我·异阴阳', description: '争夺者' },
  '食神': { name: '食神', relation: '我生·同阴阳', description: '温柔的表达' },
  '伤官': { name: '伤官', relation: '我生·异阴阳', description: '叛逆的表达' },
  '偏财': { name: '偏财', relation: '我克·同阴阳', description: '流动的财' },
  '正财': { name: '正财', relation: '我克·异阴阳', description: '稳定的财' },
  '七杀': { name: '七杀', relation: '克我·同阴阳', description: '强烈的压力' },
  '正官': { name: '正官', relation: '克我·异阴阳', description: '正当的权威' },
  '偏印': { name: '偏印', relation: '生我·同阴阳', description: '偏门的滋养' },
  '正印': { name: '正印', relation: '生我·异阴阳', description: '正统的滋养' },
};

/**
 * Calculate the 十神 of `target` relative to `dayMaster`.
 * Same yin/yang = 偏, different = 正.
 */
export function calcShiShen(dayMaster: TianGan, target: TianGan): ShiShen {
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
