interface NarrativeTextProps {
  text: string;
  className?: string;
}

export default function NarrativeText({ text, className = '' }: NarrativeTextProps) {
  const paragraphs = text.split('\n').filter(Boolean);
  return (
    <div className={`space-y-5 ${className}`}>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-text-primary text-[17px] leading-[1.85] animate-fade-in"
          style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}
