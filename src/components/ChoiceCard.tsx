import { UI_TEXT } from '../content';

interface ChoiceCardProps {
  text: string;
  index: number;
  onSelect: (index: number) => void;
  disabled?: boolean;
  qiLocked?: boolean;
  lockedReason?: string;
  qiCost?: number;
}

export default function ChoiceCard({
  text,
  index,
  onSelect,
  disabled,
  qiLocked,
  lockedReason,
  qiCost,
}: ChoiceCardProps) {
  const isLocked = qiLocked || disabled;
  return (
    <button
      onClick={() => !qiLocked && onSelect(index)}
      disabled={isLocked}
      className="w-full text-left px-5 py-4 bg-bg-card hover:bg-bg-hover
                 border border-white/[0.04] hover:border-accent/20
                 rounded-lg transition-all duration-300
                 disabled:opacity-40 disabled:cursor-not-allowed
                 group cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <span className="ui-text text-accent/40 text-xs mt-1 group-hover:text-accent/70 transition-colors tracking-wider">
          {UI_TEXT.gameScreen.choiceLabels[index]}
        </span>
        <div className="flex-1">
          <span className="text-text-primary/80 text-[14px] leading-[1.7] group-hover:text-text-primary transition-colors">
            {text}
          </span>
          {qiCost != null && qiCost > 0 && (
            <span className="ml-2 ui-text text-[10px] text-accent/50 tracking-wider">
              气 −{qiCost}
            </span>
          )}
          {qiLocked && lockedReason && (
            <div className="mt-1 ui-text text-[10px] text-red-400/50 italic tracking-wide">
              {lockedReason}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
