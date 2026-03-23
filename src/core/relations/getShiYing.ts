import { SHI_YING_PATTERNS } from '../../data/shiYing';
import type { HexagramInstance } from '../../types/hexagram';

export function getShiYing(hexagram: HexagramInstance) {
  if (hexagram.upperTrigram.id === hexagram.lowerTrigram.id) {
    return SHI_YING_PATTERNS.same;
  }

  return SHI_YING_PATTERNS.different;
}
