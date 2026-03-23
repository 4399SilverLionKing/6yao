import type { ChartResult } from "../../types/chartResult";

interface ResultSummaryProps {
  result: ChartResult;
}

export function ResultSummary({ result }: ResultSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <section className="space-y-3 rounded-3xl border border-ink/10 bg-white/60 p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">结果</p>
        <h1 className="text-3xl font-semibold">排盘结果</h1>
        <p className="max-w-2xl text-ink/75">
          本卦为 {result.originalHexagram.name}，变卦为 {result.changedHexagram.name}，
          动爻位于第 {result.movingLines.join("、") || "无"} 爻。
        </p>
      </section>

      <section className="rounded-3xl border border-ink/10 bg-white/60 p-5">
        <h2 className="text-lg font-semibold">时间盘面</h2>
        <dl className="mt-4 space-y-2 text-sm text-ink/80">
          <div className="flex justify-between gap-4">
            <dt>公历</dt>
            <dd>{result.calendar.solarDate}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>农历</dt>
            <dd>{result.calendar.lunarDate}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>月建</dt>
            <dd>{result.monthBranch}月</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>日辰</dt>
            <dd>{result.dayGanzhi}日</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>旬空</dt>
            <dd>{result.dayXunKong}空</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
