import { expect, test } from "vitest";

import { normalizeCastInput } from "../../core/divination/normalizeCastInput";
import { buildHexagram } from "../../core/hexagram/buildHexagram";
import { buildHiddenLines } from "../../core/liuyao/buildHiddenLines";

test("returns hidden lines for a hexagram with missing relations", () => {
  const gou = buildHexagram(normalizeCastInput([8, 7, 7, 7, 7, 7]));
  const hiddenLines = buildHiddenLines(gou);

  expect(hiddenLines).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        position: 2,
        relation: "妻财",
        branch: "寅"
      })
    ])
  );
});
