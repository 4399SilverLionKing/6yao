import { expect, test } from "vitest";

import { normalizeCastInput } from "../../core/divination/normalizeCastInput";
import { buildHexagram } from "../../core/hexagram/buildHexagram";
import { buildNaJiaLines } from "../../core/liuyao/buildNaJiaLines";

test("builds six na jia lines for qian palace", () => {
  const hexagram = buildHexagram(normalizeCastInput([7, 7, 7, 7, 7, 7]));
  const result = buildNaJiaLines(hexagram);

  expect(result).toHaveLength(6);
  expect(result[0]).toMatchObject({
    position: 1,
    stem: "甲",
    branch: "子",
    element: "water",
    ganzhi: "甲子"
  });
  expect(result[5]).toMatchObject({
    position: 6,
    stem: "壬",
    branch: "戌",
    element: "earth",
    ganzhi: "壬戌"
  });
});

