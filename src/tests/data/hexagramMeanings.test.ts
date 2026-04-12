import { expect, test } from "vitest";

import { HEXAGRAM_BY_ID, HEXAGRAMS } from "../../data/hexagrams";

test("provides complete metadata for all sixty-four hexagrams", () => {
  expect(HEXAGRAMS).toHaveLength(64);

  for (const hexagram of HEXAGRAMS) {
    expect(hexagram.sequence).toBeGreaterThan(0);
    expect(hexagram.fullName).toBeTruthy();
    expect(hexagram.meaning).toBeTruthy();
  }
});

test("uses formal names and meanings for representative hexagrams", () => {
  expect(HEXAGRAM_BY_ID.li_kun.fullName).toBe("火地晋");
  expect(HEXAGRAM_BY_ID.li_kun.meaning).toContain("进");
  expect(HEXAGRAM_BY_ID.qian_kun.fullName).toBe("天地否");
  expect(HEXAGRAM_BY_ID.qian_kun.meaning).toContain("闭塞");
});
