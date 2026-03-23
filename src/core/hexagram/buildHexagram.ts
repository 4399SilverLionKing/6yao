import { HEXAGRAM_BY_ID } from "../../data/hexagrams";
import { TRIGRAM_BY_ID, findTrigramByLines } from "../../data/trigrams";
import type { NormalizedLine } from "../../types/divination";
import type { HexagramInstance } from "../../types/hexagram";

function toTrigramLines(lines: NormalizedLine[], start: number) {
  return [
    lines[start].polarity,
    lines[start + 1].polarity,
    lines[start + 2].polarity
  ] as const;
}

export function buildHexagram(lines: NormalizedLine[]): HexagramInstance {
  if (lines.length !== 6) {
    throw new Error("A hexagram requires exactly six normalized lines.");
  }

  const lowerTrigram = findTrigramByLines(toTrigramLines(lines, 0));
  const upperTrigram = findTrigramByLines(toTrigramLines(lines, 3));
  const id = `${upperTrigram.id}_${lowerTrigram.id}`;
  const definition = HEXAGRAM_BY_ID[id];

  if (!definition) {
    throw new Error(`Unknown hexagram definition: ${id}`);
  }

  return {
    ...definition,
    upperTrigram: TRIGRAM_BY_ID[definition.upperTrigramId],
    lowerTrigram: TRIGRAM_BY_ID[definition.lowerTrigramId],
    normalizedLines: lines
  };
}

