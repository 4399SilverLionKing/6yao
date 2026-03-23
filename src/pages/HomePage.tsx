import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">六爻在线工具</p>
        <h1 className="text-4xl font-semibold">六爻在线起卦与自动排盘</h1>
        <p className="max-w-2xl text-base leading-7 text-ink/75">
          首版聚焦三枚铜钱起卦与自动排盘，流程简单，结果结构化展示。
        </p>
      </div>
      <Link
        className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-parchment"
        to="/cast"
      >
        开始起卦
      </Link>
    </section>
  );
}

