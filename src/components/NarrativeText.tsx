interface NarrativeTextProps {
  text: string;
  className?: string;
}

export default function NarrativeText({ text, className = '' }: NarrativeTextProps) {
  const paragraphs = text.split('\n').filter(Boolean);
  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="leading-relaxed text-text-primary animate-fade-in"
          style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}
