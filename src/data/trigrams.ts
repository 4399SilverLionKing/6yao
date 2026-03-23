import type { TrigramDefinition } from "../types/hexagram";

export const TRIGRAMS: TrigramDefinition[] = [
  {
    id: "qian",
    name: "乾",
    symbol: "☰",
    element: "metal",
    lines: ["yang", "yang", "yang"]
  },
  {
    id: "dui",
    name: "兑",
    symbol: "☱",
    element: "metal",
    lines: ["yang", "yang", "yin"]
  },
  {
    id: "li",
    name: "离",
    symbol: "☲",
    element: "fire",
    lines: ["yang", "yin", "yang"]
  },
  {
    id: "zhen",
    name: "震",
    symbol: "☳",
    element: "wood",
    lines: ["yang", "yin", "yin"]
  },
  {
    id: "xun",
    name: "巽",
    symbol: "☴",
    element: "wood",
    lines: ["yin", "yang", "yang"]
  },
  {
    id: "kan",
    name: "坎",
    symbol: "☵",
    element: "water",
    lines: ["yin", "yang", "yin"]
  },
  {
    id: "gen",
    name: "艮",
    symbol: "☶",
    element: "earth",
    lines: ["yin", "yin", "yang"]
  },
  {
    id: "kun",
    name: "坤",
    symbol: "☷",
    element: "earth",
    lines: ["yin", "yin", "yin"]
  }
];

export const TRIGRAM_BY_ID = Object.fromEntries(
  TRIGRAMS.map((trigram) => [trigram.id, trigram])
) as Record<string, TrigramDefinition>;

export function findTrigramByLines(lines: readonly [string, string, string]) {
  const trigram = TRIGRAMS.find((item) =>
    item.lines.every((line, index) => line === lines[index])
  );

  if (!trigram) {
    throw new Error(`Unknown trigram for lines: ${lines.join(",")}`);
  }

  return trigram;
}
