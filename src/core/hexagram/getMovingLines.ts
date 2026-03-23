import type { NormalizedLine } from "../../types/divination";

export function getMovingLines(lines: NormalizedLine[]) {
  return lines
    .map((line, index) => (line.moving ? index + 1 : null))
    .filter((value): value is number => value !== null);
}

