import type { HexagramDefinition } from '../types/hexagram';
import { HEXAGRAM_MEANINGS } from './hexagramMeanings';
import { TRIGRAMS } from './trigrams';

export const HEXAGRAMS: HexagramDefinition[] = TRIGRAMS.flatMap(upper =>
  TRIGRAMS.map(lower => {
    const id = `${upper.id}_${lower.id}`;
    const meaning = HEXAGRAM_MEANINGS[id];

    if (!meaning) {
      throw new Error(`Missing hexagram meaning for ${id}`);
    }

    return {
      id,
      name: meaning.name,
      fullName: meaning.fullName,
      meaning: meaning.meaning,
      sequence: meaning.sequence,
      upperTrigramId: upper.id,
      lowerTrigramId: lower.id,
      lines: [...lower.lines, ...upper.lines],
    };
  })
);

export const HEXAGRAM_BY_ID = Object.fromEntries(
  HEXAGRAMS.map(hexagram => [hexagram.id, hexagram])
) as Record<string, HexagramDefinition>;
