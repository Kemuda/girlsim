import type { CharacterState } from '../types/game';
import RadarChart from './RadarChart';

interface ShareCardProps {
  title: string;
  subtitle: string;
  characterState: CharacterState;
}

export default function ShareCard({ title, subtitle, characterState }: ShareCardProps) {
  return (
    <div className="bg-bg-card rounded-xl p-6 max-w-sm mx-auto space-y-5">
      {/* Header */}
      <div className="text-center space-y-1">
        <p className="text-xs text-text-secondary/60 tracking-widest uppercase">
          她的一生
        </p>
        <h2 className="text-3xl font-light">{title}</h2>
        <p className="text-text-secondary text-sm italic">{subtitle}</p>
      </div>

      {/* Radar */}
      <RadarChart values={characterState} size={220} />

      {/* Footer */}
      <div className="text-center pt-1">
        <p className="text-xs text-text-secondary/40 tracking-wider">
          GirlSim
        </p>
      </div>
    </div>
  );
}
