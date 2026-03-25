import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type {
  CharacterState,
  GamePhase,
  HistoryEntry,
  Scene,
  ThresholdCard,
} from '../types/game';
import { INITIAL_STATE } from '../types/game';
import { SCENES } from '../constants/scenes';
import { THRESHOLD_CARDS } from '../constants/thresholds';

interface GameState {
  phase: GamePhase;
  characterState: CharacterState;
  currentTurnIndex: number;
  currentSceneIndex: number;
  history: HistoryEntry[];
  currentScene: Scene | null;
  currentThreshold: ThresholdCard | null;
  aiNarration: string;
  isLoading: boolean;
  thresholdsUsed: string[];
}

type GameAction =
  | { type: 'START_GAME' }
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
  characterState: { ...INITIAL_STATE },
  currentTurnIndex: 0,
  currentSceneIndex: 0,
  history: [],
  currentScene: null,
  currentThreshold: null,
  aiNarration: '',
  isLoading: false,
  thresholdsUsed: [],
};

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
      const firstScene = SCENES.find((s) => s.turnIndex === 0);
      return {
        ...initialGameState,
        phase: 'playing',
        currentScene: firstScene || null,
        currentSceneIndex: 0,
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
      };
    }

    case 'ADVANCE_TURN': {
      // Find next scene
      const nextSceneIdx = state.currentSceneIndex + 1;
      const nextScene = SCENES[nextSceneIdx];

      if (!nextScene) {
        return { ...state, phase: 'ending' };
      }

      // Check if we're entering a new turn - maybe trigger threshold
      const currentTurn = state.currentTurnIndex;
      const newTurn = nextScene.turnIndex;

      if (newTurn > currentTurn) {
        // Entering a new life phase - chance for threshold event
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

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
