import { buildHexagram } from "./buildHexagram";
import type { NormalizedLine } from "../../types/divination";

function flipLine(line: NormalizedLine): NormalizedLine {
  if (!line.moving) {
    return line;
  }

  if (line.polarity === "yin") {
    return {
      throwValue: 7,
      polarity: "yang",
      moving: false
    };
  }

  return {
    throwValue: 8,
    polarity: "yin",
    moving: false
  };
}

export function buildChangedHexagram(lines: NormalizedLine[]) {
  return buildHexagram(lines.map(flipLine));
}
