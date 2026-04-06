// Thin wrapper — delegates to character-selector with Chihiro's bundle.
// Kept for backwards compat with existing GameContext imports.

import type { CharacterBundle } from './character-selector';
import {
  selectScenesForStage as selectGeneric,
  computeDominantTag as computeDominant,
} from './character-selector';
import { CHIHIRO_SCENES } from '../content/chihiro/scenes';
import { CHIHIRO_SCENE_ALTERNATES } from '../content/chihiro/scene-pools';
import { CHIHIRO_ECHOES } from '../content/chihiro/echo-registry';
import type { CharacterState, Scene } from '../types/game';
import type { DaYun } from '../engine/bazi/types';
import type { ShiShen } from '../engine/bazi/shishen';

export const CHIHIRO_BUNDLE: CharacterBundle = {
  baseScenes: CHIHIRO_SCENES,
  alternates: CHIHIRO_SCENE_ALTERNATES,
  echoes: CHIHIRO_ECHOES,
};

interface SelectorInput {
  stageIndex: number;
  dayun: DaYun;
  characterState: CharacterState;
  dominantTag: ShiShen | null;
  registeredEchoes: string[];
}

export function selectScenesForStage(input: SelectorInput): Scene[] {
  return selectGeneric(input, CHIHIRO_BUNDLE);
}

export const computeDominantTag = computeDominant;
