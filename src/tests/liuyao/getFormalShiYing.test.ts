import { expect, test } from "vitest";

import { normalizeCastInput } from "../../core/divination/normalizeCastInput";
import { buildHexagram } from "../../core/hexagram/buildHexagram";
import { getFormalShiYing } from "../../core/liuyao/getFormalShiYing";

test("returns palace-based shi and ying positions", () => {
  const pureQian = buildHexagram(normalizeCastInput([7, 7, 7, 7, 7, 7]));
  const gou = buildHexagram(normalizeCastInput([8, 7, 7, 7, 7, 7]));

  expect(getFormalShiYing(pureQian)).toEqual({ palace: "qian", shi: 6, ying: 3 });
  expect(getFormalShiYing(gou)).toEqual({ palace: "qian", shi: 1, ying: 4 });
});

