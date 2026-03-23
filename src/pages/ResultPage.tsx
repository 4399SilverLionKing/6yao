import { ErrorState } from "../components/result/ErrorState";
import { HexagramCard } from "../components/result/HexagramCard";
import { LineTable } from "../components/result/LineTable";
import { ResultSummary } from "../components/result/ResultSummary";
import { loadResult } from "../lib/resultStore";

export function ResultPage() {
  const result = loadResult();

  if (!result) {
    return <ErrorState />;
  }

  return (
    <section className="space-y-6">
      <ResultSummary result={result} />
      <div className="grid gap-4 md:grid-cols-2">
        <HexagramCard label="本卦" hexagram={result.originalHexagram} />
        <HexagramCard label="变卦" hexagram={result.changedHexagram} />
      </div>
      <LineTable result={result} />
    </section>
  );
}
