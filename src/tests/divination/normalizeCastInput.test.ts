import { describe, expect, it } from "vitest";

import { normalizeCastInput } from "../../core/divination/normalizeCastInput";

describe("normalizeCastInput", () => {
  it("normalizes exactly six throws in bottom-to-top order", () => {
    const lines = normalizeCastInput([6, 7, 8, 9, 7, 8]);

    expect(lines).toHaveLength(6);
    expect(lines[0].throwValue).toBe(6);
    expect(lines[5].throwValue).toBe(8);
  });

  it("throws when the number of lines is not six", () => {
    expect(() => normalizeCastInput([6, 7, 8])).toThrow(/six/i);
  });

  it("throws when a throw value is invalid", () => {
    expect(() => normalizeCastInput([6, 7, 8, 9, 7, 10] as never)).toThrow(
      /invalid/i
    );
  });
});
