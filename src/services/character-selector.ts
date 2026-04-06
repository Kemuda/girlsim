// Character-agnostic scene selector.
//
// Given a character bundle (base scenes, alternates, echo callbacks) and the
// current player state, picks the 2 scenes to show this stage.
//
// Resolution order:
//   1. Base scenes: the 2 default scenes for this stageIndex
//   2. Alternates: first matching alternate (requiredEnergy / requiredDominantTag
//      / triggerCondition) REPLACES slot-A
//   3. Echoes: first registered echo whose firesInStage === stageIndex
//      REPLACES slot-B

import type { CharacterState, Scene } from '../types/game';
import type { DaYun } from '../engine/bazi/types';
import type { ShiShen } from '../engine/bazi/shishen';

export interface EchoCallback {
  triggerEchoKey: string;
  firesInStage: number;
  scene: Scene;
}

export interface CharacterBundle {
  baseScenes: Scene[];
  alternates: Scene[];
  echoes: EchoCallback[];
}

interface SelectorInput {
  stageIndex: number;
  dayun: DaYun;
  characterState: CharacterState;
  dominantTag: ShiShen | null;
  registeredEchoes: string[];
}

function alternateMatches(alt: Scene, input: SelectorInput): boolean {
  if (alt.turnIndex !== input.stageIndex) return false;
  if (alt.requiredEnergy && alt.requiredEnergy.length > 0) {
    if (!alt.requiredEnergy.includes(input.dayun.energyColor)) return false;
  }
  if (alt.requiredDominantTag && alt.requiredDominantTag.length > 0) {
    if (!input.dominantTag) return false;
    if (!alt.requiredDominantTag.includes(input.dominantTag)) return false;
  }
  if (alt.triggerCondition) {
    const { dimension, operator, value } = alt.triggerCondition;
    const current = input.characterState[dimension];
    if (operator === 'gte' && !(current >= value)) return false;
    if (operator === 'lte' && !(current <= value)) return false;
  }
  return true;
}

export function selectScenesForStage(input: SelectorInput, bundle: CharacterBundle): Scene[] {
  const base = bundle.baseScenes.filter((s) => s.turnIndex === input.stageIndex);
  let sceneA = base[0];
  let sceneB = base[1];

  const matchingAlt = bundle.alternates.find((alt) => alternateMatches(alt, input));
  if (matchingAlt && sceneA) sceneA = matchingAlt;

  const matchingEcho = bundle.echoes.find(
    (e) => e.firesInStage === input.stageIndex && input.registeredEchoes.includes(e.triggerEchoKey),
  );
  if (matchingEcho && sceneB) sceneB = matchingEcho.scene;

  return [sceneA, sceneB].filter(Boolean) as Scene[];
}

export function computeDominantTag(shishenChoices: ShiShen[]): ShiShen | null {
  if (shishenChoices.length === 0) return null;
  const counts = new Map<ShiShen, number>();
  for (const tag of shishenChoices) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  let best: ShiShen | null = null;
  let bestCount = 0;
  for (const [tag, count] of counts) {
    if (count > bestCount) {
      best = tag;
      bestCount = count;
    }
  }
  return best;
}
