import { expect, test } from "vitest";

import { normalizeCastInput } from "../../core/divination/normalizeCastInput";
import { buildHexagram } from "../../core/hexagram/buildHexagram";
import { buildNaJiaLines } from "../../core/liuyao/buildNaJiaLines";
import { getFormalSixRelations } from "../../core/liuyao/getFormalSixRelations";

test("derives six relations from palace element and na jia lines", () => {
  const hexagram = buildHexagram(normalizeCastInput([7, 7, 7, 7, 7, 7]));
  const naJiaLines = buildNaJiaLines(hexagram);

  expect(getFormalSixRelations(hexagram, naJiaLines)).toEqual([
    "子孙",
    "妻财",
    "父母",
    "官鬼",
    "兄弟",
    "父母"
  ]);
});

