import type { HexagramInstance } from "../../types/hexagram";

interface HexagramCardProps {
  label: string;
  hexagram: HexagramInstance;
}

export function HexagramCard({ label, hexagram }: HexagramCardProps) {
  return (
    <article className="rounded-3xl border border-ink/10 bg-white/60 p-5">
      <p className="text-sm uppercase tracking-[0.3em] text-moss">{label}</p>
      <h2 className="mt-3 text-2xl font-semibold">{hexagram.name}</h2>
      <p className="mt-2 text-sm text-ink/70">
        上卦：{hexagram.upperTrigram.name} {hexagram.upperTrigram.symbol} / 下卦：
        {hexagram.lowerTrigram.name} {hexagram.lowerTrigram.symbol}
      </p>
    </article>
  );
}

