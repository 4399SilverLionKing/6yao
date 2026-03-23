import {
  FIVE_ELEMENT_CONTROLS,
  FIVE_ELEMENT_GENERATES,
  RELATION_LABELS,
} from '../../data/zengshan/relations';
import type { HexagramInstance } from '../../types/hexagram';
import type { NaJiaLine } from './buildNaJiaLines';
import { resolvePalaceInfo } from './getFormalShiYing';

type Element = NaJiaLine['element'];

function resolveRelation(selfElement: Element, targetElement: Element) {
  if (selfElement === targetElement) {
    return RELATION_LABELS.sibling;
  }

  if (FIVE_ELEMENT_GENERATES[selfElement] === targetElement) {
    return RELATION_LABELS.child;
  }

  if (FIVE_ELEMENT_CONTROLS[selfElement] === targetElement) {
    return RELATION_LABELS.wealth;
  }

  if (FIVE_ELEMENT_GENERATES[targetElement] === selfElement) {
    return RELATION_LABELS.parent;
  }

  return RELATION_LABELS.officer;
}

export function getFormalSixRelations(
  hexagram: HexagramInstance,
  naJiaLines: NaJiaLine[]
) {
  const { palaceElement } = resolvePalaceInfo(hexagram);

  return naJiaLines.map(line => resolveRelation(palaceElement, line.element));
}
