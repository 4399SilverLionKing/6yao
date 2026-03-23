import type {
  CoinThrowDefinition,
  CoinThrowValue,
} from '../../types/divination';

const COIN_THROW_MAP: Record<CoinThrowValue, CoinThrowDefinition> = {
  6: {
    polarity: 'yin',
    moving: true,
    label: '老阴',
  },
  7: {
    polarity: 'yang',
    moving: false,
    label: '少阳',
  },
  8: {
    polarity: 'yin',
    moving: false,
    label: '少阴',
  },
  9: {
    polarity: 'yang',
    moving: true,
    label: '老阳',
  },
};

export function mapCoinThrowToLine(throwValue: CoinThrowValue) {
  return {
    throwValue,
    ...COIN_THROW_MAP[throwValue],
  };
}
