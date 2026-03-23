import {
  BRANCH_ELEMENTS,
  type BranchElement,
  TRIGRAM_NA_JIA,
} from '../../data/zengshan/naJia';
import type { HexagramInstance } from '../../types/hexagram';

export interface NaJiaLine {
  position: number;
  stem: string;
  branch: string;
  element: BranchElement;
  ganzhi: string;
}

export function buildNaJiaLines(hexagram: HexagramInstance): NaJiaLine[] {
  const lowerConfig = TRIGRAM_NA_JIA[hexagram.lowerTrigram.id];
  const upperConfig = TRIGRAM_NA_JIA[hexagram.upperTrigram.id];

  if (!lowerConfig || !upperConfig) {
    throw new Error(`Missing Na Jia config for hexagram ${hexagram.id}`);
  }

  const lowerLines = lowerConfig.lowerBranches.map((branch, index) => ({
    position: index + 1,
    stem: lowerConfig.lowerStem,
    branch,
    element: BRANCH_ELEMENTS[branch],
    ganzhi: `${lowerConfig.lowerStem}${branch}`,
  }));

  const upperLines = upperConfig.upperBranches.map((branch, index) => ({
    position: index + 4,
    stem: upperConfig.upperStem,
    branch,
    element: BRANCH_ELEMENTS[branch],
    ganzhi: `${upperConfig.upperStem}${branch}`,
  }));

  return [...lowerLines, ...upperLines];
}
