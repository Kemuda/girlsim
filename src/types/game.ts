export type DimensionKey = 'Coherence' | 'Depth' | 'Regeneration' | 'Transmission' | 'Body' | 'Shadow';

export interface CharacterState {
  Coherence: number;
  Depth: number;
  Regeneration: number;
  Transmission: number;
  Body: number;
  Shadow: number;
}

export interface Choice {
  text: string;
  delta: Partial<CharacterState>;
}

export interface Scene {
  id: string;
  turn: string;
  turnIndex: number;
  title: string;
  text: string;
  choices: Choice[];
}

export interface ThresholdCard {
  id: string;
  category: 'Disruption' | 'Opening' | 'Mirror' | 'Ghost';
  title: string;
  text: string;
  choices: Choice[];
}

export interface HistoryEntry {
  sceneId: string;
  choiceIndex: number;
  choiceText: string;
  aiResponse: string;
  stateBefore: CharacterState;
  stateAfter: CharacterState;
}

export type GamePhase = 'start' | 'chart-reveal' | 'playing' | 'threshold' | 'transition' | 'ending';

export type GameMode = 'full' | 'shadow';

export interface TurnInfo {
  name: string;
  ageRange: string;
  index: number;
}

export const TURNS: TurnInfo[] = [
  { name: 'Girlhood', ageRange: '0–12', index: 0 },
  { name: 'The Threshold', ageRange: '12–18', index: 1 },
  { name: 'First World', ageRange: '18–28', index: 2 },
  { name: 'The Contraction', ageRange: '28–38', index: 3 },
  { name: 'Midgame Reckoning', ageRange: '38–50', index: 4 },
  { name: 'Second Wind', ageRange: '50–65', index: 5 },
  { name: 'Legacy', ageRange: '65+', index: 6 },
];

export const INITIAL_STATE: CharacterState = {
  Coherence: 50,
  Depth: 50,
  Regeneration: 50,
  Transmission: 50,
  Body: 50,
  Shadow: 10,
};
