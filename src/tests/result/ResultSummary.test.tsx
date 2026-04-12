import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";

import { computeChartResult } from "../../core";
import { ResultSummary } from "../../components/result/ResultSummary";

test("renders the user's question instead of repeating hexagram names", () => {
  const result = computeChartResult({
    throws: [7, 8, 8, 6, 7, 9],
    dateTime: "2026-03-23T10:30",
    question: "这次合作能顺利推进吗？"
  });

  const html = renderToStaticMarkup(<ResultSummary result={result} />);

  expect(html).toContain("占问内容");
  expect(html).toContain("这次合作能顺利推进吗？");
  expect(html).not.toContain("本卦为");
  expect(html).not.toContain("变卦为");
});
