import { Link } from "react-router-dom";

export function ErrorState() {
  return (
    <section className="space-y-4 rounded-3xl border border-ink/10 bg-white/60 p-8">
      <h1 className="text-3xl font-semibold">请先起卦</h1>
      <p className="text-ink/75">当前没有可展示的排盘结果，请先回到起卦页完成起卦。</p>
      <Link
        className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-parchment"
        to="/cast"
      >
        返回起卦页
      </Link>
    </section>
  );
}

