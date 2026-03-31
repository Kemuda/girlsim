import { useEffect } from 'react';
import { useGame } from './context/GameContext';
import StartScreen from './screens/StartScreen';
import ChartRevealScreen from './screens/ChartRevealScreen';
import GameScreen from './screens/GameScreen';
import EndScreen from './screens/EndScreen';

function App() {
  const { state, dispatch } = useGame();

  // Shift+D toggles developer mode
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.shiftKey && e.key === 'D') dispatch({ type: 'TOGGLE_DEV' });
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  switch (state.phase) {
    case 'start':
      return <StartScreen />;
    case 'chart-reveal':
      return <ChartRevealScreen />;
    case 'playing':
    case 'threshold':
    case 'transition':
      return <GameScreen />;
    case 'ending':
      return <EndScreen />;
    default:
      return <StartScreen />;
  }
}

export default App;
