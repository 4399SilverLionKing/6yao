import { expect, test } from "vitest";

import { getFormalSixSpirits } from "../../core/liuyao/getFormalSixSpirits";

test("uses day stem to determine six spirits order", () => {
  expect(getFormalSixSpirits("丙申")).toEqual([
    "朱雀",
    "勾陈",
    "腾蛇",
    "白虎",
    "玄武",
    "青龙"
  ]);
});

