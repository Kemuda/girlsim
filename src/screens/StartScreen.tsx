import { useGame } from '../context/GameContext';
import { UI_TEXT } from '../content';

export default function StartScreen() {
  const { dispatch } = useGame();
  const t = UI_TEXT.startScreen;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-8 animate-fade-in-slow">
        <div className="space-y-2">
          <h1 className="text-4xl font-light tracking-wide">{t.title}</h1>
          <p className="text-text-secondary text-sm tracking-widest uppercase">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-4 text-text-secondary leading-relaxed text-sm">
          {t.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="pt-4 space-y-3">
          <button
            onClick={() => dispatch({ type: 'START_GAME' })}
            className="px-8 py-3 border border-accent/40 rounded-lg text-accent
                       hover:bg-accent/10 transition-all duration-300 cursor-pointer
                       tracking-wider text-sm"
          >
            {t.startButton}
          </button>
          <p className="text-xs text-text-secondary/50">
            {t.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
