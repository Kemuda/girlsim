// 八字全盘分析脚本
// Usage: npx tsx bazisim/src/engine/analyze.ts 丙子 辛丑 戊申 丙辰 [大运天干地支...]

import { getTianGan, TIANGAN } from './tiangan.ts';
import type { TianGan } from './tiangan.ts';
import { getDiZhi } from './dizhi.ts';
import type { DiZhi } from './dizhi.ts';
import type { WuXing } from './wuxing.ts';
import { wuxingRelation } from './wuxing.ts';
import { calcShiShen, SHISHEN_INFO } from './shishen.ts';
import type { ShiShen } from './shishen.ts';
import { getLifeStage, STAGE_STRENGTH } from './changsheng.ts';
import { detectTouChou } from './touchou.ts';
import { judgeStrength } from './strength.ts';
import { detectTianGanHe } from './tiangan-he.ts';
import { analyzeDiZhiRelations } from './dizhi-relations.ts';
import { getKongWang, isKongWang } from './kongwang.ts';
import type { BaZiChart, Pillar } from './chart.ts';

// ─── Parse input ───

function parsePillar(s: string): Pillar {
  if (s.length !== 2) throw new Error(`Invalid pillar: ${s}`);
  return { stem: getTianGan(s[0]), branch: getDiZhi(s[1]) };
}

function parseChart(args: string[]): BaZiChart {
  if (args.length < 4) {
    console.error('Usage: npx tsx analyze.ts 年干支 月干支 日干支 时干支 [大运1 大运2 ...] [--流年 流年1 ...]');
    process.exit(1);
  }
  return {
    year: parsePillar(args[0]),
    month: parsePillar(args[1]),
    day: parsePillar(args[2]),
    hour: parsePillar(args[3]),
  };
}

// ─── Formatting helpers ───

const POS_NAMES = ['年', '月', '日', '时'];

function fmtWuxing(wx: WuXing): string {
  const icons: Record<WuXing, string> = { '木': '🌳', '火': '🔥', '土': '⛰️', '金': '🪙', '水': '💧' };
  return `${wx}${icons[wx]}`;
}

function fmtStem(s: TianGan): string {
  return `${s.name}(${fmtWuxing(s.wuxing)} ${s.yinyang})`;
}

// ─── Main analysis ───

function analyzeChart(chart: BaZiChart, dayunPillars: Pillar[], liunianPillars: Pillar[]) {
  const dm = chart.day.stem;
  const pillars = [chart.year, chart.month, chart.day, chart.hour];

  console.log('═══════════════════════════════════════════════');
  console.log('  八字全盘分析');
  console.log('═══════════════════════════════════════════════');
  console.log();

  // ── 1. 四柱展示 ──
  console.log('【四柱】');
  console.log(`        年柱      月柱      日柱      时柱`);
  console.log(`天干    ${pillars.map(p => p.stem.name.padEnd(8)).join('  ')}`);
  console.log(`地支    ${pillars.map(p => p.branch.name.padEnd(8)).join('  ')}`);
  console.log();
  console.log(`日主: ${fmtStem(dm)}`);
  console.log();

  // ── 2. 十神 ──
  console.log('【十神】');
  console.log('  天干十神（主星）:');
  for (let i = 0; i < 4; i++) {
    const p = pillars[i];
    if (i === 2) {
      console.log(`    ${POS_NAMES[i]}干 ${p.stem.name} → 日主（元女）`);
    } else {
      const ss = calcShiShen(dm, p.stem);
      const info = SHISHEN_INFO[ss];
      console.log(`    ${POS_NAMES[i]}干 ${p.stem.name}(${p.stem.wuxing}) → ${ss} [${info.relation}] ${info.description}`);
    }
  }
  console.log();

  console.log('  地支藏干（副星）:');
  for (let i = 0; i < 4; i++) {
    const p = pillars[i];
    const parts = p.branch.canggan.map(cg => {
      const cgStem = getTianGan(cg.name);
      const ss = calcShiShen(dm, cgStem);
      return `${cg.name}(${cgStem.wuxing})→${ss}[${cg.weight === 'main' ? '主' : cg.weight === 'middle' ? '中' : '余'}]`;
    });
    console.log(`    ${POS_NAMES[i]}支 ${p.branch.name}: ${parts.join('  ')}`);
  }
  console.log();

  // ── 3. 天干五合 ──
  console.log('【天干五合】');
  const stems = pillars.map((p, i) => ({ pos: `${POS_NAMES[i]}干`, stem: p.stem }));
  const tianganHe = detectTianGanHe(stems);
  if (tianganHe.length === 0) {
    console.log('  无天干合');
  } else {
    for (const he of tianganHe) {
      const adj = he.adjacent ? '相邻✓' : '不相邻✗';
      console.log(`  ${he.pos1}${he.stem1} + ${he.pos2}${he.stem2} → 合化${fmtWuxing(he.huaWuxing)} (${adj})`);
    }
    // Check争合
    const stemCounts = new Map<string, number>();
    for (const s of stems) {
      stemCounts.set(s.stem.name, (stemCounts.get(s.stem.name) || 0) + 1);
    }
    for (const he of tianganHe) {
      const c1 = stemCounts.get(he.stem1) || 0;
      const c2 = stemCounts.get(he.stem2) || 0;
      if (c1 > 1) console.log(`  ⚠ ${he.stem1}出现${c1}次 → 争合${he.stem2}`);
      if (c2 > 1) console.log(`  ⚠ ${he.stem2}出现${c2}次 → 争合${he.stem1}`);
    }
  }
  console.log();

  // ── 4. 地支关系 ──
  console.log('【地支关系】');
  const branchInputs = pillars.map((p, i) => ({ pos: `${POS_NAMES[i]}支`, name: p.branch.name }));
  const dizhiRels = analyzeDiZhiRelations(branchInputs);
  if (dizhiRels.length === 0) {
    console.log('  无特殊关系');
  } else {
    for (const rel of dizhiRels) {
      const hua = rel.huaWuxing ? ` 化${fmtWuxing(rel.huaWuxing)}` : '';
      const note = rel.note ? ` (${rel.note})` : '';
      console.log(`  ${rel.type}: ${rel.positions.join('+')} [${rel.branches.join('')}]${hua}${note}`);
    }
  }
  console.log();

  // ── 5. 空亡 ──
  console.log('【空亡】');
  const kongwang = getKongWang(chart.day);
  console.log(`  日柱 ${chart.day.stem.name}${chart.day.branch.name} → 旬空: ${kongwang[0]}、${kongwang[1]}`);
  // Check if any natal branch is kongwang
  for (let i = 0; i < 4; i++) {
    if (isKongWang(pillars[i].branch.name, kongwang)) {
      console.log(`  ⚠ ${POS_NAMES[i]}支 ${pillars[i].branch.name} 在空亡中!`);
    }
  }
  // Check wuxing of kongwang branches
  const kw1 = getDiZhi(kongwang[0]);
  const kw2 = getDiZhi(kongwang[1]);
  console.log(`  空亡五行: ${kongwang[0]}(${kw1.wuxing}) ${kongwang[1]}(${kw2.wuxing})`);
  console.log();

  // ── 6. 十二长生 ──
  console.log('【十二长生】');
  console.log('  日主视角:');
  for (let i = 0; i < 4; i++) {
    const stage = getLifeStage(dm, pillars[i].branch);
    const strength = STAGE_STRENGTH[stage];
    console.log(`    ${POS_NAMES[i]}支 ${pillars[i].branch.name}: ${stage} (${strength})`);
  }
  console.log();

  console.log('  自坐视角 (每柱天干看自己地支):');
  for (let i = 0; i < 4; i++) {
    const stage = getLifeStage(pillars[i].stem, pillars[i].branch);
    const strength = STAGE_STRENGTH[stage];
    console.log(`    ${POS_NAMES[i]}柱 ${pillars[i].stem.name}坐${pillars[i].branch.name}: ${stage} (${strength})`);
  }
  console.log();

  console.log('  星运视角 (每个天干在四个地支上):');
  const uniqueStems = new Map<string, TianGan>();
  for (const p of pillars) {
    if (!uniqueStems.has(p.stem.name)) uniqueStems.set(p.stem.name, p.stem);
  }
  for (const [name, stem] of uniqueStems) {
    if (stem.name === dm.name && stem.index === dm.index) continue; // skip day master (already shown above)
    const stages = pillars.map((p, i) =>
      `${POS_NAMES[i]}${p.branch.name}=${getLifeStage(stem, p.branch)}(${STAGE_STRENGTH[getLifeStage(stem, p.branch)]})`
    );
    const ss = name === dm.name ? '日主' : calcShiShen(dm, stem);
    console.log(`    ${name}(${ss}): ${stages.join('  ')}`);
  }
  console.log();

  // ── 7. 透出 ──
  console.log('【透出】');
  const touchou = detectTouChou(chart);
  if (touchou.length === 0) {
    console.log('  无透出');
  } else {
    for (const tc of touchou) {
      console.log(`  ${tc.branchPosition}支藏${tc.hiddenStemName} → 被${tc.penetratedByStemPosition}干透出 → ${tc.shishen}`);
    }
  }
  console.log();

  // ── 8. 五行统计 ──
  console.log('【五行分布】');
  const wuxingCount: Record<WuXing, { tiangan: number; dizhiMain: number; canggan: number }> = {
    '木': { tiangan: 0, dizhiMain: 0, canggan: 0 },
    '火': { tiangan: 0, dizhiMain: 0, canggan: 0 },
    '土': { tiangan: 0, dizhiMain: 0, canggan: 0 },
    '金': { tiangan: 0, dizhiMain: 0, canggan: 0 },
    '水': { tiangan: 0, dizhiMain: 0, canggan: 0 },
  };
  for (const p of pillars) {
    wuxingCount[p.stem.wuxing].tiangan++;
    wuxingCount[p.branch.wuxing].dizhiMain++;
    for (const cg of p.branch.canggan) {
      const cgStem = getTianGan(cg.name);
      wuxingCount[cgStem.wuxing].canggan++;
    }
  }
  for (const wx of ['木', '火', '土', '金', '水'] as WuXing[]) {
    const c = wuxingCount[wx];
    const total = c.tiangan + c.dizhiMain;
    const bar = '█'.repeat(total) + '░'.repeat(Math.max(0, 8 - total));
    console.log(`  ${fmtWuxing(wx)} 天干${c.tiangan} 地支${c.dizhiMain} 藏干${c.canggan} ${bar}`);
  }
  console.log();

  // ── 9. 身强身弱 ──
  console.log('【身强身弱】');
  const str = judgeStrength(chart);
  console.log(`  总分: ${str.total}/100 → ${str.level}`);
  for (const f of str.factors) {
    console.log(`    ${f.name}: ${f.score > 0 ? '+' : ''}${f.score} (max ${f.maxScore}) — ${f.explanation}`);
  }
  console.log();

  // ── 10. 大运分析 ──
  if (dayunPillars.length > 0) {
    console.log('═══════════════════════════════════════════════');
    console.log('  大运分析');
    console.log('═══════════════════════════════════════════════');
    console.log();

    for (const dy of dayunPillars) {
      const stemSS = calcShiShen(dm, dy.stem);
      const branchMainCG = dy.branch.canggan[0];
      const branchMainStem = getTianGan(branchMainCG.name);
      const branchSS = calcShiShen(dm, branchMainStem);

      console.log(`── 大运 ${dy.stem.name}${dy.branch.name} (${stemSS}/${branchSS}) ──`);

      // 天干合 with natal stems
      const dyStems = [...stems, { pos: '运干', stem: dy.stem }];
      const dyHe = detectTianGanHe(dyStems).filter(h => h.pos1 === '运干' || h.pos2 === '运干');
      for (const he of dyHe) {
        console.log(`  天干合: 运${he.stem1 === dy.stem.name ? he.stem1 : he.stem2} + ${he.pos1 === '运干' ? he.pos2 : he.pos1}${he.stem1 === dy.stem.name ? he.stem2 : he.stem1} → 化${he.huaWuxing}`);
      }

      // 地支关系 with natal branches
      const dyBranches = [...branchInputs, { pos: '运支', name: dy.branch.name }];
      const dyRels = analyzeDiZhiRelations(dyBranches).filter(r => r.positions.includes('运支'));
      for (const rel of dyRels) {
        const hua = rel.huaWuxing ? ` 化${rel.huaWuxing}` : '';
        const note = rel.note ? ` (${rel.note})` : '';
        console.log(`  ${rel.type}: ${rel.positions.join('+')} [${rel.branches.join('')}]${hua}${note}`);
      }

      // 空亡 check
      if (isKongWang(dy.branch.name, kongwang)) {
        console.log(`  ⚠ 运支 ${dy.branch.name} 空亡`);
      }

      // 十二长生
      const stage = getLifeStage(dm, dy.branch);
      console.log(`  日主长生: ${dm.name}在${dy.branch.name} = ${stage}(${STAGE_STRENGTH[stage]})`);

      console.log();
    }
  }

  // ── 11. 流年分析 ──
  if (liunianPillars.length > 0) {
    console.log('═══════════════════════════════════════════════');
    console.log('  流年分析');
    console.log('═══════════════════════════════════════════════');
    console.log();

    for (const ln of liunianPillars) {
      const stemSS = calcShiShen(dm, ln.stem);
      const branchMainCG = ln.branch.canggan[0];
      const branchMainStem = getTianGan(branchMainCG.name);
      const branchSS = calcShiShen(dm, branchMainStem);

      console.log(`── 流年 ${ln.stem.name}${ln.branch.name} (${stemSS}/${branchSS}) ──`);

      // 天干合
      const lnStems = [...stems, { pos: '年干', stem: ln.stem }];
      const lnHe = detectTianGanHe(lnStems).filter(h =>
        (h.pos1 === '年干' && h.stem1 === ln.stem.name) ||
        (h.pos2 === '年干' && h.stem2 === ln.stem.name)
      );
      // Deduplicate: only show合 involving the flow year stem position
      const seen = new Set<string>();
      for (const he of lnHe) {
        const key = `${he.stem1}${he.stem2}`;
        if (seen.has(key)) continue;
        seen.add(key);
        console.log(`  天干合: 流年${ln.stem.name} + ${he.stem1 === ln.stem.name ? he.pos2 + he.stem2 : he.pos1 + he.stem1} → 化${he.huaWuxing}`);
      }

      // 地支关系
      const lnBranches = [...branchInputs, { pos: '流年', name: ln.branch.name }];
      const lnRels = analyzeDiZhiRelations(lnBranches).filter(r => r.positions.includes('流年'));
      for (const rel of lnRels) {
        const hua = rel.huaWuxing ? ` 化${rel.huaWuxing}` : '';
        const note = rel.note ? ` (${rel.note})` : '';
        console.log(`  ${rel.type}: ${rel.positions.join('+')} [${rel.branches.join('')}]${hua}${note}`);
      }

      // 空亡
      if (isKongWang(ln.branch.name, kongwang)) {
        console.log(`  ⚠ 流年支 ${ln.branch.name} 空亡`);
      }

      console.log();
    }
  }
}

// ─── CLI entry ───

const args = process.argv.slice(2);
if (args.length < 4) {
  console.log('八字全盘分析工具');
  console.log('');
  console.log('Usage: npx tsx bazisim/src/engine/analyze.ts 年柱 月柱 日柱 时柱 [--大运 运1 运2 ...] [--流年 年1 年2 ...]');
  console.log('');
  console.log('Example:');
  console.log('  npx tsx bazisim/src/engine/analyze.ts 丙子 辛丑 戊申 丙辰 --大运 庚子 己亥 戊戌 丁酉 丙申 乙未 甲午 癸巳 壬辰 --流年 丁未 戊申 己酉 庚戌 辛亥 壬子 癸丑 甲寅 乙卯 丙辰');
  process.exit(0);
}

const chart = parseChart(args);

// Parse 大运 and 流年
let dayunPillars: Pillar[] = [];
let liunianPillars: Pillar[] = [];
let mode: 'none' | 'dayun' | 'liunian' = 'none';

for (let i = 4; i < args.length; i++) {
  if (args[i] === '--大运' || args[i] === '--dayun') {
    mode = 'dayun';
    continue;
  }
  if (args[i] === '--流年' || args[i] === '--liunian') {
    mode = 'liunian';
    continue;
  }
  if (mode === 'dayun') {
    dayunPillars.push(parsePillar(args[i]));
  } else if (mode === 'liunian') {
    liunianPillars.push(parsePillar(args[i]));
  }
}

analyzeChart(chart, dayunPillars, liunianPillars);
