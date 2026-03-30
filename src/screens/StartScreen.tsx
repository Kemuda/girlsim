import { useGame } from '../context/GameContext';
import { UI_TEXT } from '../content';

export default function StartScreen() {
  const { dispatch } = useGame();
  const t = UI_TEXT.startScreen;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-lg w-full text-center space-y-12 animate-fade-in-slow">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-light tracking-wide">{t.title}</h1>
          <p className="text-text-secondary text-sm tracking-widest uppercase">
            {t.subtitle}
          </p>
        </div>

        {/* Shadow line — primary */}
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-text-primary text-lg leading-relaxed">
              {t.shadowTitle}
            </p>
            <p className="text-text-secondary text-sm">
              {t.shadowDesc}
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: 'START_GAME', mode: 'shadow' })}
            className="px-10 py-3 border border-accent/40 rounded-lg text-accent
                       hover:bg-accent/10 transition-all duration-300 cursor-pointer
                       tracking-wider text-sm"
          >
            {t.shadowButton}
          </button>
        </div>

        {/* Full life line — secondary */}
        <div className="pt-2">
          <button
            onClick={() => dispatch({ type: 'START_GAME', mode: 'full' })}
            className="text-text-secondary/50 text-xs hover:text-text-secondary
                       transition-colors duration-300 cursor-pointer"
          >
            {t.fullButton}
          </button>
        </div>
      </div>
    </div>
  );
}
