import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";

import { computeChartResult } from "../../core";
import { LineTable } from "../../components/result/LineTable";

test("renders original and changed line structures side by side", () => {
  const result = computeChartResult({
    throws: [7, 8, 8, 6, 7, 9],
    dateTime: "2026-03-23T10:30",
    question: "测试占问"
  });

  const html = renderToStaticMarkup(<LineTable result={result} />);

  expect(html).toContain("本卦");
  expect(html).toContain("变卦");
  expect(html).toContain("本卦纳甲");
  expect(html).toContain("变卦纳甲");
});
