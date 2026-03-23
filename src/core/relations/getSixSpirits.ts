import { SIX_SPIRITS } from "../../data/sixSpirits";

export function getSixSpirits(startIndex = 0) {
  return Array.from({ length: 6 }, (_, index) => {
    const spiritIndex = (startIndex + index) % SIX_SPIRITS.length;

    return SIX_SPIRITS[spiritIndex];
  });
}

