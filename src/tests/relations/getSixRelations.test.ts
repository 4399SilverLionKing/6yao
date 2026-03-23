import { expect, test } from "vitest";

import { buildHexagram } from "../../core/hexagram/buildHexagram";
import { normalizeCastInput } from "../../core/divination/normalizeCastInput";
import { getSixRelations } from "../../core/relations/getSixRelations";

test("returns one relation label per line", () => {
  const hexagram = buildHexagram(normalizeCastInput([7, 8, 8, 8, 7, 7]));
  const relations = getSixRelations(hexagram);

  expect(relations).toHaveLength(6);
  expect(relations.every((item) => item.length > 0)).toBe(true);
});

