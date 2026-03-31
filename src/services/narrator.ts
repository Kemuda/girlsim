import type { CharacterState, GameMode, HistoryEntry } from '../types/game';
import {
  NARRATION_TEMPLATES,
  NARRATION_CONNECTORS,
  ZH_NARRATION_TEMPLATES,
  ZH_NARRATION_CONNECTORS,
  TURN_TRANSITIONS,
  SHADOW_HIGH_SUFFIX,
  REGENERATION_HIGH_SUFFIX,
  DEFAULT_TRANSITION,
  SHADOW_NARRATION,
  SHADOW_CONNECTORS,
} from '../content';

function getHighestDimension(state: CharacterState): string {
  const dims = Object.entries(state) as [string, number][];
  dims.sort((a, b) => b[1] - a[1]);
  const highest = dims[0];
  if (highest[1] >= 70) return `high_${highest[0].toLowerCase()}`;
  return 'generic';
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateNarration(
  state: CharacterState,
  choiceText: string,
  _history: HistoryEntry[],
  mode: GameMode = 'full'
): string {
  if (mode === 'shadow') {
    const connector = pickRandom(SHADOW_CONNECTORS);
    const line = pickRandom(SHADOW_NARRATION);
    return `${connector}「${choiceText}」。\n\n${line}`;
  }

  if (mode === 'chihiro' || mode === 'full') {
    const category = getHighestDimension(state);
    const templates = ZH_NARRATION_TEMPLATES[category] || ZH_NARRATION_TEMPLATES.generic;
    const base = pickRandom(templates);
    const connector = pickRandom(ZH_NARRATION_CONNECTORS);
    return `${connector}「${choiceText}」。\n\n${base}`;
  }

  const category = getHighestDimension(state);
  const templates = NARRATION_TEMPLATES[category] || NARRATION_TEMPLATES.generic;
  const base = pickRandom(templates);
  const connector = pickRandom(NARRATION_CONNECTORS);

  return `${connector}「${choiceText}」。\n\n${base}`;
}

export function generateTransitionText(
  fromTurn: string,
  toTurn: string,
  state: CharacterState
): string {
  const key = `${fromTurn}→${toTurn}`;
  const base = TURN_TRANSITIONS[key] || DEFAULT_TRANSITION;

  if (state.Shadow >= 50) {
    return base + '\n\n' + SHADOW_HIGH_SUFFIX;
  }
  if (state.Regeneration >= 70) {
    return base + '\n\n' + REGENERATION_HIGH_SUFFIX;
  }
  return base;
}
