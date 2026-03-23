import { HIDDEN_RELATION_ORDER } from '../../data/zengshan/fuShen';
import type { HexagramInstance } from '../../types/hexagram';
import { buildHexagram } from '../hexagram/buildHexagram';
import { buildNaJiaLines } from './buildNaJiaLines';
import { resolvePalaceInfo } from './getFormalShiYing';
import { getFormalSixRelations } from './getFormalSixRelations';

export interface HiddenLine {
  position: number;
  stem: string;
  branch: string;
  element: string;
  ganzhi: string;
  relation: string;
}

export function buildHiddenLines(hexagram: HexagramInstance): HiddenLine[] {
  const { normalizedPureLines } = resolvePalaceInfo(hexagram);
  const pureHexagram = buildHexagram(normalizedPureLines);
  const pureNaJiaLines = buildNaJiaLines(pureHexagram);
  const pureRelations = getFormalSixRelations(pureHexagram, pureNaJiaLines);
  const actualRelations = new Set(
    getFormalSixRelations(hexagram, buildNaJiaLines(hexagram))
  );

  return pureNaJiaLines
    .map((line, index) => ({
      ...line,
      relation: pureRelations[index],
    }))
    .filter(
      line =>
        HIDDEN_RELATION_ORDER.includes(
          line.relation as (typeof HIDDEN_RELATION_ORDER)[number]
        ) && !actualRelations.has(line.relation)
    );
}
