import { Link } from "react-router-dom";

const features = [
  { title: "铜钱起卦", desc: "模拟三枚铜钱，逐爻手动输入正反面" },
  { title: "自动排盘", desc: "纳甲装卦、六亲、六神、世应一步到位" },
  { title: "变卦推演", desc: "自动识别动爻，生成本卦与变卦对照" },
];

export function HomePage() {
  return (
    <div className="flex flex-col items-center pt-12 pb-16 text-center">
      {/* hero */}
      <p className="text-sm tracking-[0.3em] text-moss">六爻在线工具</p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
        起卦 · 排盘 · 解卦
      </h1>
      <p className="mt-4 max-w-md text-ink/60 leading-relaxed">
        遵循增删卜易古法，三枚铜钱摇卦，自动完成纳甲装卦、六亲六神排列，助你快速得出完整卦象。
      </p>

      <Link
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-parchment transition-opacity hover:opacity-80"
        to="/cast"
      >
        开始起卦
        <span aria-hidden="true">→</span>
      </Link>

      {/* divider */}
      <div className="mt-16 flex items-center gap-4 text-ink/20">
        <span className="h-px w-12 bg-current" />
        <span className="text-xs tracking-widest">☰</span>
        <span className="h-px w-12 bg-current" />
      </div>

      {/* features */}
      <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
        {features.map((f) => (
          <li key={f.title} className="max-w-[14rem] space-y-2">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-ink/55">{f.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

