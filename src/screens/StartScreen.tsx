import { useGame } from '../context/GameContext';

export default function StartScreen() {
  const { dispatch } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-8 animate-fade-in-slow">
        <div className="space-y-2">
          <h1 className="text-4xl font-light tracking-wide">她的一生</h1>
          <p className="text-text-secondary text-sm tracking-widest uppercase">
            GirlSim
          </p>
        </div>

        <div className="space-y-4 text-text-secondary leading-relaxed text-sm">
          <p>
            这是一个关于选择的故事。
          </p>
          <p>
            你将经历一个女性的一生——从童年到暮年，从院子里的小鸟到最后一个夏天的午后。
          </p>
          <p>
            每一个选择都会塑造你的六个内在维度：凝聚、深度、再生、传递、身体、暗影。
            没有正确答案。只有你的答案。
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <button
            onClick={() => dispatch({ type: 'START_GAME' })}
            className="px-8 py-3 border border-accent/40 rounded-lg text-accent
                       hover:bg-accent/10 transition-all duration-300 cursor-pointer
                       tracking-wider text-sm"
          >
            开始旅程
          </button>
          <p className="text-xs text-text-secondary/50">
            七个人生阶段 · 十四个关键时刻 · 无数种可能
          </p>
        </div>
      </div>
    </div>
  );
}
