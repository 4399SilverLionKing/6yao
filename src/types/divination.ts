export type CoinThrowValue = 6 | 7 | 8 | 9;
export type LinePolarity = "yin" | "yang";

export interface NormalizedLine {
  throwValue: CoinThrowValue;
  polarity: LinePolarity;
  moving: boolean;
}

export interface CoinThrowDefinition {
  polarity: LinePolarity;
  moving: boolean;
  label: string;
}

