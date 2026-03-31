import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type {
  CharacterState,
  GameMode,
  GamePhase,
  HistoryEntry,
  Scene,
  ThresholdCard,
} from '../types/game';
import { INITIAL_STATE } from '../types/game';
import { SCENES, THRESHOLD_CARDS, SHADOW_SCENES } from '../content';
import { CHIHIRO_SCENES } from '../content/chihiro/scenes';
import { CHIHIRO_THRESHOLDS } from '../content/chihiro/thresholds';
import { CHIHIRO_CHART } from '../content/chihiro/chart';
import type { BaZiLife, ShiShen, LifeNarrative } from '../engine/bazi';
import { generateLife, generateLifeFromChart, generateNarrativeFromLife } from '../engine/bazi';

interface GameState {
  phase: GamePhase;
  mode: GameMode;
  characterState: CharacterState;
  currentTurnIndex: number;
  currentSceneIndex: number;
  history: HistoryEntry[];
  currentScene: Scene | null;
  currentThreshold: ThresholdCard | null;
  aiNarration: string;
  isLoading: boolean;
  thresholdsUsed: string[];
  dimensionHistory: CharacterState[];
  // BaZi
  baziLife: BaZiLife | null;
  baziNarrative: LifeNarrative | null;
  shishenChoices: ShiShen[];  // track 十神 direction of each choice
  // Dev
  devMode: boolean;
}

type GameAction =
  | { type: 'START_GAME'; mode?: GameMode }
  | { type: 'TOGGLE_DEV' }
  | { type: 'BEGIN_PLAY' }
  | { type: 'SET_SCENE'; scene: Scene }
  | { type: 'SET_THRESHOLD'; card: ThresholdCard }
  | { type: 'MAKE_CHOICE'; choiceIndex: number; aiResponse: string }
  | { type: 'RESOLVE_THRESHOLD'; choiceIndex: number; aiResponse: string }
  | { type: 'ADVANCE_TURN' }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_AI_NARRATION'; narration: string }
  | { type: 'END_GAME' };

const initialGameState: GameState = {
  phase: 'start',
  mode: 'full',
  characterState: { ...INITIAL_STATE },
  currentTurnIndex: 0,
  currentSceneIndex: 0,
  history: [],
  currentScene: null,
  currentThreshold: null,
  aiNarration: '',
  isLoading: false,
  thresholdsUsed: [],
  dimensionHistory: [{ ...INITIAL_STATE }],
  baziLife: null,
  baziNarrative: null,
  shishenChoices: [],
  devMode: false,
};

function getScenes(mode: GameMode): Scene[] {
  if (mode === 'shadow') return SHADOW_SCENES;
  if (mode === 'chihiro') return CHIHIRO_SCENES;
  return SCENES;
}

function getThresholds(mode: GameMode) {
  return mode === 'chihiro' ? CHIHIRO_THRESHOLDS : THRESHOLD_CARDS;
}

function applyDelta(state: CharacterState, delta: Partial<CharacterState>): CharacterState {
  const next = { ...state };
  for (const [key, value] of Object.entries(delta)) {
    const k = key as keyof CharacterState;
    next[k] = Math.max(0, Math.min(100, next[k] + (value as number)));
  }
  return next;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const mode = action.mode ?? 'full';
      const life = mode === 'chihiro'
        ? generateLifeFromChart(CHIHIRO_CHART)
        : generateLife();
      const narrative = generateNarrativeFromLife(life);
      if (mode === 'shadow') {
        // Shadow mode: skip chart reveal, go straight to playing
        const scenes = getScenes(mode);
        const firstScene = scenes.find((s) => s.turnIndex === 0);
        return {
          ...initialGameState,
          mode,
          phase: 'playing',
          currentScene: firstScene || null,
          currentSceneIndex: 0,
          dimensionHistory: [{ ...INITIAL_STATE }],
          baziLife: life,
          baziNarrative: narrative,
          shishenChoices: [],
          devMode: state.devMode,
        };
      }
      return {
        ...initialGameState,
        mode,
        phase: 'chart-reveal',
        baziLife: life,
        baziNarrative: narrative,
        shishenChoices: [],
        devMode: state.devMode,
      };
    }

    case 'TOGGLE_DEV':
      return { ...state, devMode: !state.devMode };

    case 'BEGIN_PLAY': {
      const scenes = getScenes(state.mode);
      const firstScene = scenes.find((s) => s.turnIndex === 0);
      return {
        ...state,
        phase: 'playing',
        currentScene: firstScene || null,
        currentSceneIndex: 0,
        dimensionHistory: [{ ...INITIAL_STATE }],
      };
    }

    case 'SET_SCENE':
      return { ...state, currentScene: action.scene, phase: 'playing' };

    case 'SET_THRESHOLD':
      return {
        ...state,
        currentThreshold: action.card,
        phase: 'threshold',
        thresholdsUsed: [...state.thresholdsUsed, action.card.id],
      };

    case 'MAKE_CHOICE': {
      const scene = state.currentScene;
      if (!scene) return state;
      const choice = scene.choices[action.choiceIndex];
      const newState = applyDelta(state.characterState, choice.delta);
      const entry: HistoryEntry = {
        sceneId: scene.id,
        choiceIndex: action.choiceIndex,
        choiceText: choice.text,
        aiResponse: action.aiResponse,
        stateBefore: state.characterState,
        stateAfter: newState,
      };
      const newShishen = choice.shishenTag
        ? [...state.shishenChoices, choice.shishenTag]
        : state.shishenChoices;
      return {
        ...state,
        characterState: newState,
        history: [...state.history, entry],
        aiNarration: action.aiResponse,
        phase: 'transition',
        dimensionHistory: [...state.dimensionHistory, newState],
        shishenChoices: newShishen,
      };
    }

    case 'RESOLVE_THRESHOLD': {
      const card = state.currentThreshold;
      if (!card) return state;
      const choice = card.choices[action.choiceIndex];
      const newState = applyDelta(state.characterState, choice.delta);
      const entry: HistoryEntry = {
        sceneId: card.id,
        choiceIndex: action.choiceIndex,
        choiceText: choice.text,
        aiResponse: action.aiResponse,
        stateBefore: state.characterState,
        stateAfter: newState,
      };
      const newShishen = choice.shishenTag
        ? [...state.shishenChoices, choice.shishenTag]
        : state.shishenChoices;
      return {
        ...state,
        characterState: newState,
        history: [...state.history, entry],
        aiNarration: action.aiResponse,
        currentThreshold: null,
        phase: 'transition',
        dimensionHistory: [...state.dimensionHistory, newState],
        shishenChoices: newShishen,
      };
    }

    case 'ADVANCE_TURN': {
      const scenes = getScenes(state.mode);
      const nextSceneIdx = state.currentSceneIndex + 1;
      const nextScene = scenes[nextSceneIdx];

      if (!nextScene) {
        return { ...state, phase: 'ending' };
      }

      const currentTurn = state.currentTurnIndex;
      const newTurn = nextScene.turnIndex;

      // Lifespan mechanic: at Stage 3 entry, check for breaking point
      if (newTurn === 3 && currentTurn < 3 && state.mode !== 'shadow') {
        if (state.characterState.Body < 20 && state.characterState.Regeneration < 20) {
          // Trigger breaking point threshold
          const breakingPoint: import('../types/game').ThresholdCard = {
            id: 'breaking-point',
            category: 'Disruption',
            title: '她在三十岁停下来了',
            text: '某一天，你发现自己站不起来了。不是身体，是别的什么。\n\n医生说你需要休息。你不确定休息能解决什么。但你确实，再也不想动了。\n\n扛下去，还是停下来？',
            choices: [
              { text: '再撑一下，还没到放弃的时候', delta: { Body: -8, Regeneration: 8, Shadow: 5 }, shishenTag: '七杀' },
              { text: '停下来。真的停下来。', delta: { Body: 10, Regeneration: 10, Shadow: -5 }, shishenTag: '正印' },
            ],
          };
          return {
            ...state,
            currentTurnIndex: newTurn,
            currentSceneIndex: nextSceneIdx,
            currentScene: nextScene,
            currentThreshold: breakingPoint,
            phase: 'threshold',
            thresholdsUsed: [...state.thresholdsUsed, 'breaking-point'],
            aiNarration: '',
          };
        }
      }

      // Skip threshold cards in shadow mode
      if (state.mode !== 'shadow' && newTurn > currentTurn) {
        const thresholds = getThresholds(state.mode);
        const available = thresholds.filter(
          (t) => !state.thresholdsUsed.includes(t.id)
        );
        const shouldTrigger = Math.random() < 0.4 && available.length > 0;

        if (shouldTrigger) {
          const card = available[Math.floor(Math.random() * available.length)];
          return {
            ...state,
            currentTurnIndex: newTurn,
            currentSceneIndex: nextSceneIdx,
            currentScene: nextScene,
            currentThreshold: card,
            phase: 'threshold',
            thresholdsUsed: [...state.thresholdsUsed, card.id],
            aiNarration: '',
          };
        }
      }

      return {
        ...state,
        currentTurnIndex: newTurn,
        currentSceneIndex: nextSceneIdx,
        currentScene: nextScene,
        phase: 'playing',
        aiNarration: '',
      };
    }

    case 'SET_LOADING':
      return { ...state, isLoading: action.loading };

    case 'SET_AI_NARRATION':
      return { ...state, aiNarration: action.narration };

    case 'END_GAME':
      return { ...state, phase: 'ending' };

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
