import type { HexagramDefinition } from '../types/hexagram';
import { TRIGRAMS } from './trigrams';

const KNOWN_NAMES: Record<string, string> = {
  qian_qian: '乾为天',
  kun_kun: '坤为地',
  kan_kan: '坎为水',
  li_li: '离为火',
  zhen_zhen: '震为雷',
  xun_xun: '巽为风',
  gen_gen: '艮为山',
  dui_dui: '兑为泽',
};

export const HEXAGRAMS: HexagramDefinition[] = TRIGRAMS.flatMap(upper =>
  TRIGRAMS.map(lower => {
    const id = `${upper.id}_${lower.id}`;

    return {
      id,
      name: KNOWN_NAMES[id] ?? `${upper.name}上${lower.name}下`,
      upperTrigramId: upper.id,
      lowerTrigramId: lower.id,
      lines: [...lower.lines, ...upper.lines],
    };
  })
);

export const HEXAGRAM_BY_ID = Object.fromEntries(
  HEXAGRAMS.map(hexagram => [hexagram.id, hexagram])
) as Record<string, HexagramDefinition>;
