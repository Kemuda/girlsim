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
      className="w-full text-left p-4 bg-bg-card hover:bg-bg-hover border border-transparent
                 hover:border-accent/30 rounded-lg transition-all duration-300
                 disabled:opacity-50 disabled:cursor-not-allowed
                 group cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <span className="text-accent/60 text-sm mt-0.5 group-hover:text-accent transition-colors">
          {['一', '二', '三'][index]}
        </span>
        <span className="text-text-primary leading-relaxed">{text}</span>
      </div>
    </button>
  );
}
