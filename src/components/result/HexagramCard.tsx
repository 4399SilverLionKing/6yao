import type { HexagramInstance } from '../../types/hexagram';

interface HexagramCardProps {
  label: string;
  hexagram: HexagramInstance;
}

export function HexagramCard({ label, hexagram }: HexagramCardProps) {
  return (
    <article className="border-ink/10 rounded-3xl border bg-white/60 p-5">
      <p className="text-moss text-sm tracking-[0.3em] uppercase">{label}</p>
      <h2 className="mt-3 text-2xl font-semibold">{hexagram.name}</h2>
      <p className="text-ink/70 mt-2 text-sm">
        上卦：{hexagram.upperTrigram.name} {hexagram.upperTrigram.symbol} /
        下卦：
        {hexagram.lowerTrigram.name} {hexagram.lowerTrigram.symbol}
      </p>
    </article>
  );
}
