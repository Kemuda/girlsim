import { useGame } from '../context/GameContext';
import { UI_TEXT } from '../content';

export default function StartScreen() {
  const { dispatch } = useGame();
  const t = UI_TEXT.startScreen;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-14 animate-fade-in-slow">
        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl font-light tracking-[0.06em]">{t.title}</h1>
          <p className="ui-text text-text-secondary/40 text-[11px] tracking-[0.2em] uppercase">
            {t.subtitle}
          </p>
        </div>

        {/* Shadow line — primary */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-text-primary text-lg leading-relaxed italic">
              {t.shadowTitle}
            </p>
            <p className="ui-text text-text-secondary/60 text-xs tracking-wide">
              {t.shadowDesc}
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: 'START_GAME', mode: 'shadow' })}
            className="ui-text px-10 py-3 border border-accent/30 rounded-lg text-accent
                       hover:bg-accent/10 transition-all duration-300 cursor-pointer
                       tracking-[0.08em] text-sm"
          >
            {t.shadowButton}
          </button>
        </div>

        {/* Full life line — secondary */}
        <div>
          <button
            onClick={() => dispatch({ type: 'START_GAME', mode: 'full' })}
            className="ui-text text-text-secondary/30 text-xs hover:text-text-secondary/60
                       transition-colors duration-300 cursor-pointer tracking-wide"
          >
            {t.fullButton}
          </button>
        </div>
      </div>
    </div>
  );
}
