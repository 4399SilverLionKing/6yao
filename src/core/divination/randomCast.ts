import type { CoinThrowValue } from '../../types/divination';

const VALUES: CoinThrowValue[] = [6, 7, 8, 9];

export function randomCast(): CoinThrowValue[] {
  return Array.from({ length: 6 }, () => {
    const index = Math.floor(Math.random() * VALUES.length);

    return VALUES[index];
  });
}
