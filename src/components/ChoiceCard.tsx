import { UI_TEXT } from '../content';

interface ChoiceCardProps {
  text: string;
  index: number;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export default function ChoiceCard({ text, index, onSelect, disabled }: ChoiceCardProps) {
  return (
    <button
      onClick={() => onSelect(index)}
      disabled={disabled}
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
        <span className="text-text-primary/90 text-[15px] leading-[1.7] group-hover:text-text-primary transition-colors">
          {text}
        </span>
      </div>
    </button>
  );
}
