// Chihiro scene selector.
//
// Given the current stage, dayun, player state, and history, picks the
// 2 scenes to show this stage. Resolution order:
//
// 1. Base scenes: the 2 default scenes for this stageIndex from CHIHIRO_SCENES
// 2. Alternates: if any CHIHIRO_SCENE_ALTERNATES matches current conditions
//    (requiredEnergy / requiredDominantTag / triggerCondition), it REPLACES
//    the first base slot.
// 3. Echoes: if any CHIHIRO_ECHOES entry's triggerEchoKey is in the registered
//    echoes AND firesInStage === stageIndex, it REPLACES the second base slot.

import type { CharacterState, Scene } from '../types/game';
import type { DaYun } from '../engine/bazi/types';
import type { ShiShen } from '../engine/bazi/shishen';
import { CHIHIRO_SCENES } from '../content/chihiro/scenes';
import { CHIHIRO_SCENE_ALTERNATES } from '../content/chihiro/scene-pools';
import { CHIHIRO_ECHOES } from '../content/chihiro/echo-registry';

interface SelectorInput {
  stageIndex: number;
  dayun: DaYun;
  characterState: CharacterState;
  dominantTag: ShiShen | null;
  registeredEchoes: string[];
}

/** Check whether an alternate scene's conditions are satisfied */
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

/** Pick 2 scenes for the given stage */
export function selectScenesForStage(input: SelectorInput): Scene[] {
  const base = CHIHIRO_SCENES.filter((s) => s.turnIndex === input.stageIndex);
  const [slotA, slotB] = [base[0], base[1]];
  let sceneA = slotA;
  let sceneB = slotB;

  // 1. Alternate replaces slot A if matches
  const matchingAlt = CHIHIRO_SCENE_ALTERNATES.find((alt) => alternateMatches(alt, input));
  if (matchingAlt && sceneA) {
    sceneA = matchingAlt;
  }

  // 2. Echo replaces slot B if registered and fires this stage
  const matchingEcho = CHIHIRO_ECHOES.find(
    (e) => e.firesInStage === input.stageIndex && input.registeredEchoes.includes(e.triggerEchoKey),
  );
  if (matchingEcho && sceneB) {
    sceneB = matchingEcho.scene;
  }

  return [sceneA, sceneB].filter(Boolean) as Scene[];
}

/** Compute which 十神 tag dominates the player's history so far */
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
