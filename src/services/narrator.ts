import type { CharacterState, HistoryEntry } from '../types/game';
import {
  NARRATION_TEMPLATES,
  NARRATION_CONNECTORS,
  TURN_TRANSITIONS,
  SHADOW_HIGH_SUFFIX,
  REGENERATION_HIGH_SUFFIX,
  DEFAULT_TRANSITION,
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
  _history: HistoryEntry[]
): string {
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
