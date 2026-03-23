import { HIDDEN_RELATION_ORDER } from "../../data/zengshan/fuShen";
import { buildHexagram } from "../hexagram/buildHexagram";
import type { HexagramInstance } from "../../types/hexagram";
import { buildNaJiaLines } from "./buildNaJiaLines";
import { getFormalSixRelations } from "./getFormalSixRelations";
import { resolvePalaceInfo } from "./getFormalShiYing";

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
      relation: pureRelations[index]
    }))
    .filter(
      (line) =>
        HIDDEN_RELATION_ORDER.includes(line.relation as (typeof HIDDEN_RELATION_ORDER)[number]) &&
        !actualRelations.has(line.relation)
    );
}

