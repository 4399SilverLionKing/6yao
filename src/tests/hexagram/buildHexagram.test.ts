import { expect, test } from "vitest";

import { buildHexagram } from "../../core/hexagram/buildHexagram";
import { normalizeCastInput } from "../../core/divination/normalizeCastInput";

test("builds a named original hexagram from six lines", () => {
  const result = buildHexagram(normalizeCastInput([7, 8, 8, 8, 7, 7]));

  expect(result.normalizedLines).toHaveLength(6);
  expect(result.name).toBeTruthy();
  expect(result.lowerTrigram.name).toBeTruthy();
  expect(result.upperTrigram.name).toBeTruthy();
});

