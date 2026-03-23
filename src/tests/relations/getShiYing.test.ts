import { expect, test } from "vitest";

import { buildHexagram } from "../../core/hexagram/buildHexagram";
import { normalizeCastInput } from "../../core/divination/normalizeCastInput";
import { getShiYing } from "../../core/relations/getShiYing";

test("returns two distinct line indexes within the chart", () => {
  const hexagram = buildHexagram(normalizeCastInput([7, 8, 8, 8, 7, 7]));
  const result = getShiYing(hexagram);

  expect(result.shi).toBeGreaterThanOrEqual(1);
  expect(result.shi).toBeLessThanOrEqual(6);
  expect(result.ying).toBeGreaterThanOrEqual(1);
  expect(result.ying).toBeLessThanOrEqual(6);
  expect(result.shi).not.toBe(result.ying);
});

