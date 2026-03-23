import { expect, test } from "vitest";

import { computeChartResult } from "../../core";
import { FORMAL_CHART_CASES } from "../fixtures/formal-chart-cases";

test("computes a complete chart result object", () => {
  const result = computeChartResult({
    throws: [7, 8, 8, 6, 7, 9],
    dateTime: "2026-03-23T10:30"
  });

  expect(result.originalHexagram.name).toBeTruthy();
  expect(result.changedHexagram.name).toBeTruthy();
  expect(result.calendar.timezone).toBe("Asia/Shanghai");
  expect(result.monthBranch).toBe("辛卯");
  expect(result.dayGanzhi).toBe("丙申");
  expect(result.dayXunKong).toBe("辰巳");
  expect(result.lines).toHaveLength(6);
  expect(result.sixRelations).toHaveLength(6);
  expect(result.sixSpirits).toHaveLength(6);
  expect(result.lines[0].branch).toBeTruthy();
  expect(result.shiYing.shi).not.toBe(result.shiYing.ying);
  expect(result.hiddenLines).toBeDefined();
});

test.each(FORMAL_CHART_CASES)(
  "matches formal regression fixture: $name",
  ({ input, expected }) => {
    const result = computeChartResult(input);

    expect(result.monthBranch).toBe(expected.monthBranch);
    expect(result.dayGanzhi).toBe(expected.dayGanzhi);
    expect(result.dayXunKong).toBe(expected.dayXunKong);
    expect(result.shiYing).toEqual(expected.shiYing);
    expect(result.lines[0].ganzhi).toBe(expected.firstLine.ganzhi);
    expect(result.lines[0].relation).toBe(expected.firstLine.relation);
    expect(result.lines[0].spirit).toBe(expected.firstLine.spirit);
    expect(result.hiddenLines).toEqual(
      expect.arrayContaining(
        expected.hiddenLines.map((line) => expect.objectContaining(line))
      )
    );
  }
);
