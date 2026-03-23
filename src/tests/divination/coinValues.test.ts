import { describe, expect, it } from "vitest";

import { mapCoinThrowToLine } from "../../core/divination/coinValues";

describe("mapCoinThrowToLine", () => {
  it("maps 6 to old yin", () => {
    const line = mapCoinThrowToLine(6);

    expect(line.throwValue).toBe(6);
    expect(line.polarity).toBe("yin");
    expect(line.moving).toBe(true);
  });

  it("maps 7 to young yang", () => {
    const line = mapCoinThrowToLine(7);

    expect(line.throwValue).toBe(7);
    expect(line.polarity).toBe("yang");
    expect(line.moving).toBe(false);
  });

  it("maps 8 to young yin", () => {
    const line = mapCoinThrowToLine(8);

    expect(line.throwValue).toBe(8);
    expect(line.polarity).toBe("yin");
    expect(line.moving).toBe(false);
  });

  it("maps 9 to old yang", () => {
    const line = mapCoinThrowToLine(9);

    expect(line.throwValue).toBe(9);
    expect(line.polarity).toBe("yang");
    expect(line.moving).toBe(true);
  });
});

