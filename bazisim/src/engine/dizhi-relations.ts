// 地支关系 — Earthly Branch Relations: 六合、三合、六冲、三刑、六破、六害

import type { WuXing } from './wuxing.ts';

// ─── 六合 (Six Combinations) ───
export interface LiuHe {
  branch1: string;
  branch2: string;
  huaWuxing: WuXing;
}

const LIU_HE_DATA: [string, string, WuXing][] = [
  ['子', '丑', '土'],
  ['寅', '亥', '木'],
  ['卯', '戌', '火'],
  ['辰', '酉', '金'],
  ['巳', '申', '水'],
  ['午', '未', '火'],  // 有争议，有说化土
];

const LIU_HE_MAP = new Map<string, { partner: string; huaWuxing: WuXing }>();
for (const [a, b, wx] of LIU_HE_DATA) {
  LIU_HE_MAP.set(a + b, { partner: b, huaWuxing: wx });
  LIU_HE_MAP.set(b + a, { partner: a, huaWuxing: wx });
}

// ─── 三合局 (Three Combinations) ───
export interface SanHe {
  branches: [string, string, string];
  huaWuxing: WuXing;
}

const SAN_HE_DATA: SanHe[] = [
  { branches: ['申', '子', '辰'], huaWuxing: '水' },
  { branches: ['寅', '午', '戌'], huaWuxing: '火' },
  { branches: ['亥', '卯', '未'], huaWuxing: '木' },
  { branches: ['巳', '酉', '丑'], huaWuxing: '金' },
];

// 半合: 生地+旺地 or 旺地+墓地. 拱: 生地+墓地
// In each三合, order is [生地, 旺地, 墓地]
export type PartialHeType = '半合' | '拱';

export interface PartialSanHe {
  branch1: string;
  branch2: string;
  missing: string;
  huaWuxing: WuXing;
  type: PartialHeType;  // 半合 (stronger) or 拱 (weaker)
}

// ─── 六冲 (Six Clashes) ───
const LIU_CHONG_DATA: [string, string][] = [
  ['子', '午'],
  ['丑', '未'],
  ['寅', '申'],
  ['卯', '酉'],
  ['辰', '戌'],
  ['巳', '亥'],
];

const CHONG_MAP = new Map<string, string>();
for (const [a, b] of LIU_CHONG_DATA) {
  CHONG_MAP.set(a, b);
  CHONG_MAP.set(b, a);
}

// ─── 六破 (Six Destructions) ───
const LIU_PO_DATA: [string, string][] = [
  ['子', '酉'],
  ['丑', '辰'],
  ['寅', '亥'],
  ['卯', '午'],
  ['巳', '申'],
  ['未', '戌'],
];

const PO_MAP = new Map<string, string>();
for (const [a, b] of LIU_PO_DATA) {
  PO_MAP.set(a + b, b);
  PO_MAP.set(b + a, a);
}

// ─── 六害 (Six Harms) ───
const LIU_HAI_DATA: [string, string][] = [
  ['子', '未'],
  ['丑', '午'],
  ['寅', '巳'],
  ['卯', '辰'],
  ['申', '亥'],
  ['酉', '戌'],
];

const HAI_MAP = new Map<string, string>();
for (const [a, b] of LIU_HAI_DATA) {
  HAI_MAP.set(a + b, b);
  HAI_MAP.set(b + a, a);
}

// ─── 三刑 (Three Punishments) ───
export interface SanXing {
  branches: string[];
  name: string;
}

const SAN_XING_DATA: SanXing[] = [
  { branches: ['寅', '巳', '申'], name: '恃势之刑' },
  { branches: ['丑', '未', '戌'], name: '无恩之刑' },
  { branches: ['子', '卯'], name: '无礼之刑' },
  { branches: ['辰', '辰'], name: '自刑' },
  { branches: ['午', '午'], name: '自刑' },
  { branches: ['酉', '酉'], name: '自刑' },
  { branches: ['亥', '亥'], name: '自刑' },
];

// ─── Main analysis interface ───

export interface DiZhiRelation {
  type: '六合' | '三合' | '半合' | '拱' | '六冲' | '六破' | '六害' | '三刑' | '半刑';
  branches: string[];
  positions: string[];
  huaWuxing?: WuXing;
  note?: string;
}

/**
 * Analyze all 地支 relations in a set of branches.
 */
export function analyzeDiZhiRelations(
  branches: { pos: string; name: string }[]
): DiZhiRelation[] {
  const results: DiZhiRelation[] = [];
  const branchNames = branches.map(b => b.name);

  // 六合
  for (let i = 0; i < branches.length; i++) {
    for (let j = i + 1; j < branches.length; j++) {
      const key = branches[i].name + branches[j].name;
      const he = LIU_HE_MAP.get(key);
      if (he) {
        results.push({
          type: '六合',
          branches: [branches[i].name, branches[j].name],
          positions: [branches[i].pos, branches[j].pos],
          huaWuxing: he.huaWuxing,
        });
      }
    }
  }

  // 三合 & 半合/拱
  for (const san of SAN_HE_DATA) {
    const [sheng, wang, mu] = san.branches;
    const hasSheng = branchNames.includes(sheng);
    const hasWang = branchNames.includes(wang);
    const hasMu = branchNames.includes(mu);
    const count = [hasSheng, hasWang, hasMu].filter(Boolean).length;

    if (count === 3) {
      const positions = san.branches.map(b => {
        const found = branches.find(br => br.name === b);
        return found ? found.pos : '?';
      });
      results.push({
        type: '三合',
        branches: [...san.branches],
        positions,
        huaWuxing: san.huaWuxing,
      });
    } else if (count === 2) {
      const present = san.branches.filter(b => branchNames.includes(b));
      const missing = san.branches.find(b => !branchNames.includes(b))!;
      const positions = present.map(b => {
        const found = branches.find(br => br.name === b);
        return found ? found.pos : '?';
      });

      // Determine type: 半合 or 拱
      let type: PartialHeType;
      if (!hasSheng) {
        type = '半合';  // 旺+墓
      } else if (!hasMu) {
        type = '半合';  // 生+旺
      } else {
        type = '拱';    // 生+墓 (missing 旺)
      }

      results.push({
        type,
        branches: present,
        positions,
        huaWuxing: san.huaWuxing,
        note: `缺${missing}`,
      });
    }
  }

  // 六冲
  for (let i = 0; i < branches.length; i++) {
    for (let j = i + 1; j < branches.length; j++) {
      if (CHONG_MAP.get(branches[i].name) === branches[j].name) {
        results.push({
          type: '六冲',
          branches: [branches[i].name, branches[j].name],
          positions: [branches[i].pos, branches[j].pos],
        });
      }
    }
  }

  // 六破
  for (let i = 0; i < branches.length; i++) {
    for (let j = i + 1; j < branches.length; j++) {
      const key = branches[i].name + branches[j].name;
      if (PO_MAP.has(key)) {
        results.push({
          type: '六破',
          branches: [branches[i].name, branches[j].name],
          positions: [branches[i].pos, branches[j].pos],
        });
      }
    }
  }

  // 六害
  for (let i = 0; i < branches.length; i++) {
    for (let j = i + 1; j < branches.length; j++) {
      const key = branches[i].name + branches[j].name;
      if (HAI_MAP.has(key)) {
        results.push({
          type: '六害',
          branches: [branches[i].name, branches[j].name],
          positions: [branches[i].pos, branches[j].pos],
        });
      }
    }
  }

  // 三刑
  for (const xing of SAN_XING_DATA) {
    if (xing.branches.length === 2 && xing.branches[0] === xing.branches[1]) {
      // 自刑: need duplicate
      const b = xing.branches[0];
      const matching = branches.filter(br => br.name === b);
      if (matching.length >= 2) {
        results.push({
          type: '三刑',
          branches: [b, b],
          positions: matching.map(m => m.pos),
          note: xing.name,
        });
      }
    } else if (xing.branches.length === 2) {
      // 子卯刑
      const has0 = branches.find(br => br.name === xing.branches[0]);
      const has1 = branches.find(br => br.name === xing.branches[1]);
      if (has0 && has1) {
        results.push({
          type: '三刑',
          branches: [...xing.branches],
          positions: [has0.pos, has1.pos],
          note: xing.name,
        });
      }
    } else {
      // 三刑 (3 branches)
      const present = xing.branches.filter(b => branchNames.includes(b));
      if (present.length === 3) {
        const positions = present.map(b => {
          const found = branches.find(br => br.name === b);
          return found ? found.pos : '?';
        });
        results.push({
          type: '三刑',
          branches: present,
          positions,
          note: xing.name,
        });
      } else if (present.length === 2) {
        const positions = present.map(b => {
          const found = branches.find(br => br.name === b);
          return found ? found.pos : '?';
        });
        const missing = xing.branches.find(b => !branchNames.includes(b));
        results.push({
          type: '半刑',
          branches: present,
          positions,
          note: `${xing.name}(缺${missing})`,
        });
      }
    }
  }

  return results;
}

export { CHONG_MAP, LIU_HE_MAP, PO_MAP, HAI_MAP };
