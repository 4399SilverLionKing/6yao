import { FIVE_ELEMENT_CONTROLS, FIVE_ELEMENT_GENERATES, RELATION_LABELS } from "../../data/sixRelations";
import type { HexagramInstance } from "../../types/hexagram";

type Element = HexagramInstance["lowerTrigram"]["element"];

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

export function getSixRelations(hexagram: HexagramInstance) {
  const selfElement = hexagram.lowerTrigram.element;

  return hexagram.normalizedLines.map((_, index) => {
    const targetElement =
      index < 3 ? hexagram.lowerTrigram.element : hexagram.upperTrigram.element;

    return resolveRelation(selfElement, targetElement);
  });
}

