import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";

import { buildHexagram } from "../../core/hexagram/buildHexagram";
import { normalizeCastInput } from "../../core/divination/normalizeCastInput";
import { HexagramCard } from "../../components/result/HexagramCard";

test("renders the formal hexagram name and meaning", () => {
  const hexagram = buildHexagram(normalizeCastInput([8, 8, 8, 7, 7, 7]));

  const html = renderToStaticMarkup(
    <HexagramCard label="本卦" hexagram={hexagram} />
  );

  expect(html).toContain("天地否");
  expect(html).toContain("卦义");
  expect(html).toContain("闭塞");
});
