import { expect, test } from "vitest";

import { buildChangedHexagram } from "../../core/hexagram/buildChangedHexagram";
import { getMovingLines } from "../../core/hexagram/getMovingLines";
import { normalizeCastInput } from "../../core/divination/normalizeCastInput";

test("collects moving lines from bottom to top", () => {
  const movingLines = getMovingLines(normalizeCastInput([6, 7, 8, 9, 7, 8]));

  expect(movingLines).toEqual([1, 4]);
});

test("flips moving lines to compute the changed hexagram", () => {
  const changed = buildChangedHexagram(normalizeCastInput([6, 7, 8, 9, 7, 8]));

  expect(changed.normalizedLines[0].polarity).toBe("yang");
  expect(changed.normalizedLines[0].moving).toBe(false);
  expect(changed.normalizedLines[3].polarity).toBe("yin");
  expect(changed.normalizedLines[3].moving).toBe(false);
  expect(changed.name).toBeTruthy();
});
