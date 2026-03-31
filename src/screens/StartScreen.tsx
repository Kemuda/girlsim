import { useGame } from '../context/GameContext';
import { UI_TEXT } from '../content';

export default function StartScreen() {
  const { dispatch } = useGame();
  const t = UI_TEXT.startScreen;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="max-w-md w-full text-center space-y-14 animate-fade-in-slow">
        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl font-light tracking-[0.06em]">{t.title}</h1>
          <p className="ui-text text-text-secondary/40 text-[11px] tracking-[0.2em] uppercase">
            {t.subtitle}
          </p>
        </div>

        {/* BaZi mode — primary */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-text-primary text-lg leading-relaxed italic">
              命是抽的。运是给的。选择是你的。
            </p>
            <p className="ui-text text-text-secondary/60 text-xs tracking-wide">
              八字驱动 · 七个人生阶段 · 无限可能
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: 'START_GAME', mode: 'full' })}
            className="ui-text px-10 py-3 border border-accent/30 rounded-lg text-accent
                       hover:bg-accent/10 transition-all duration-300 cursor-pointer
                       tracking-[0.08em] text-sm"
          >
            抽命
          </button>
        </div>
      </div>

      {/* Shadow mode — bottom right corner */}
      <button
        onClick={() => dispatch({ type: 'START_GAME', mode: 'shadow' })}
        className="ui-text fixed bottom-6 right-6 text-text-secondary/30 text-sm hover:text-text-secondary/60
                   transition-colors duration-300 cursor-pointer tracking-wide underline underline-offset-4
                   decoration-text-secondary/15 hover:decoration-text-secondary/30"
      >
        {t.shadowButton} — {t.shadowDesc}
      </button>
    </div>
  );
}
