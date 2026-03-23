import { expect, test } from "vitest";

import { buildCalendarContext } from "../../core/calendar/buildCalendarContext";

test("builds calendar context for a fixed Beijing datetime", () => {
  const result = buildCalendarContext("2026-03-23T10:30");

  expect(result.timezone).toBe("Asia/Shanghai");
  expect(result.monthBranch).toBe("辛卯");
  expect(result.dayGanzhi).toBe("丙申");
  expect(result.dayXunKong).toBe("辰巳");
});

test("throws when datetime is empty", () => {
  expect(() => buildCalendarContext("")).toThrow(/required/i);
});

test("throws when datetime is malformed", () => {
  expect(() => buildCalendarContext("2026/03/23 10:30")).toThrow(/invalid/i);
});
