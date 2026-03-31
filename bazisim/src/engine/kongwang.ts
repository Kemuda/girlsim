// 空亡 — Void/Empty Branches

import type { Pillar } from './chart.ts';

/**
 * 六十甲子分六旬，每旬10对，剩2个地支 = 空亡。
 * 以日柱定旬。
 *
 * 旬首的天干index=0(甲), 地支index = 旬首地支index.
 * 旬内用掉的地支: startBranch ... startBranch+9
 * 剩下的2个 = 空亡
 */
export function getKongWang(dayPillar: Pillar): [string, string] {
  const stemIdx = dayPillar.stem.index;
  const branchIdx = dayPillar.branch.index;

  // 旬首: 天干index=0(甲) 时对应的地支index
  // 从当前日柱倒推: 天干走了stemIdx步, 地支也走了stemIdx步
  const xunStartBranch = ((branchIdx - stemIdx) % 12 + 12) % 12;

  // 旬内用了地支 xunStartBranch ~ xunStartBranch+9 (mod 12)
  // 空亡 = xunStartBranch+10 和 xunStartBranch+11
  const DIZHI_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  const void1 = DIZHI_NAMES[(xunStartBranch + 10) % 12];
  const void2 = DIZHI_NAMES[(xunStartBranch + 11) % 12];

  return [void1, void2];
}

/**
 * Check if a branch name is in the 空亡 set.
 */
export function isKongWang(branchName: string, kongwang: [string, string]): boolean {
  return branchName === kongwang[0] || branchName === kongwang[1];
}
