import type { LinePolarity, NormalizedLine } from "./divination";

export interface TrigramDefinition {
  id: string;
  name: string;
  symbol: string;
  element: "metal" | "wood" | "water" | "fire" | "earth";
  lines: [LinePolarity, LinePolarity, LinePolarity];
}

export interface HexagramDefinition {
  id: string;
  name: string;
  upperTrigramId: string;
  lowerTrigramId: string;
  lines: LinePolarity[];
}

export interface HexagramInstance extends HexagramDefinition {
  upperTrigram: TrigramDefinition;
  lowerTrigram: TrigramDefinition;
  normalizedLines: NormalizedLine[];
}

