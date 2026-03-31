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
}

type GameAction =
  | { type: 'START_GAME'; mode?: GameMode }
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
};

function getScenes(mode: GameMode): Scene[] {
  return mode === 'shadow' ? SHADOW_SCENES : SCENES;
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
      const scenes = getScenes(mode);
      const firstScene = scenes.find((s) => s.turnIndex === 0);
      return {
        ...initialGameState,
        mode,
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
      return {
        ...state,
        characterState: newState,
        history: [...state.history, entry],
        aiNarration: action.aiResponse,
        phase: 'transition',
        dimensionHistory: [...state.dimensionHistory, newState],
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
      return {
        ...state,
        characterState: newState,
        history: [...state.history, entry],
        aiNarration: action.aiResponse,
        currentThreshold: null,
        phase: 'transition',
        dimensionHistory: [...state.dimensionHistory, newState],
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

      // Skip threshold cards in shadow mode
      if (state.mode === 'full' && newTurn > currentTurn) {
        const available = THRESHOLD_CARDS.filter(
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
