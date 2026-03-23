import { expect, test } from "vitest";

import { getSixSpirits } from "../../core/relations/getSixSpirits";

test("returns six spirits in stable order", () => {
  expect(getSixSpirits()).toEqual([
    "青龙",
    "朱雀",
    "勾陈",
    "腾蛇",
    "白虎",
    "玄武"
  ]);
});

test("rotates the spirit sequence from a custom start index", () => {
  expect(getSixSpirits(2)).toEqual([
    "勾陈",
    "腾蛇",
    "白虎",
    "玄武",
    "青龙",
    "朱雀"
  ]);
});

