import { TRIGRAMS } from '../../data/trigrams';
import { TRIGRAM_NA_JIA } from '../../data/zengshan/naJia';
import {
  PALACE_SEQUENCE_PATTERNS,
  SHI_POSITIONS,
} from '../../data/zengshan/shiYing';
import type { LinePolarity, NormalizedLine } from '../../types/divination';
import type { HexagramInstance } from '../../types/hexagram';

function flipLine(line: LinePolarity): LinePolarity {
  return line === 'yang' ? 'yin' : 'yang';
}

function applyPattern(
  baseLines: LinePolarity[],
  pattern: readonly number[]
): LinePolarity[] {
  const next = [...baseLines];

  for (const index of pattern) {
    next[index] = flipLine(next[index]);
  }

  return next;
}

function toNormalizedLines(lines: LinePolarity[]): NormalizedLine[] {
  return lines.map(polarity => ({
    throwValue: polarity === 'yang' ? 7 : 8,
    polarity,
    moving: false,
  }));
}

export function buildPurePalaceLines(palace: string) {
  const trigram = TRIGRAMS.find(item => item.id === palace);

  if (!trigram) {
    throw new Error(`Unknown palace trigram: ${palace}`);
  }

  return [...trigram.lines, ...trigram.lines];
}

export interface PalaceInfo {
  palace: string;
  palaceElement: (typeof TRIGRAM_NA_JIA)[keyof typeof TRIGRAM_NA_JIA]['palaceElement'];
  shi: number;
  ying: number;
  sequenceIndex: number;
  pureLines: LinePolarity[];
  normalizedPureLines: NormalizedLine[];
}

export function resolvePalaceInfo(hexagram: HexagramInstance): PalaceInfo {
  const target = hexagram.lines;

  for (const trigram of TRIGRAMS) {
    const pureLines = buildPurePalaceLines(trigram.id);

    for (const [sequenceIndex, pattern] of PALACE_SEQUENCE_PATTERNS.entries()) {
      const candidate = applyPattern(pureLines, pattern);

      if (candidate.every((line, index) => line === target[index])) {
        const shi = SHI_POSITIONS[sequenceIndex];
        const ying = ((shi + 2) % 6) + 1;

        return {
          palace: trigram.id,
          palaceElement: TRIGRAM_NA_JIA[trigram.id].palaceElement,
          shi,
          ying,
          sequenceIndex,
          pureLines,
          normalizedPureLines: toNormalizedLines(pureLines),
        };
      }
    }
  }

  throw new Error(`Unable to resolve palace for hexagram: ${hexagram.id}`);
}

export function getFormalShiYing(hexagram: HexagramInstance) {
  const { palace, shi, ying } = resolvePalaceInfo(hexagram);

  return { palace, shi, ying };
}
