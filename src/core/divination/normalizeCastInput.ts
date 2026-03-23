import { mapCoinThrowToLine } from "./coinValues";
import type { CoinThrowValue, NormalizedLine } from "../../types/divination";

function isCoinThrowValue(value: number): value is CoinThrowValue {
  return value === 6 || value === 7 || value === 8 || value === 9;
}

export function normalizeCastInput(input: readonly number[]): NormalizedLine[] {
  if (input.length !== 6) {
    throw new Error("A cast requires exactly six lines.");
  }

  return input.map((value) => {
    if (!isCoinThrowValue(value)) {
      throw new Error(`Invalid coin throw value: ${value}`);
    }

    return mapCoinThrowToLine(value);
  });
}
