export type BranchElement = 'metal' | 'wood' | 'water' | 'fire' | 'earth';

export interface TrigramNaJiaDefinition {
  lowerStem: string;
  upperStem: string;
  lowerBranches: [string, string, string];
  upperBranches: [string, string, string];
  palaceElement: BranchElement;
}

export const TRIGRAM_NA_JIA: Record<string, TrigramNaJiaDefinition> = {
  qian: {
    lowerStem: '甲',
    upperStem: '壬',
    lowerBranches: ['子', '寅', '辰'],
    upperBranches: ['午', '申', '戌'],
    palaceElement: 'metal',
  },
  dui: {
    lowerStem: '丁',
    upperStem: '丁',
    lowerBranches: ['巳', '卯', '丑'],
    upperBranches: ['亥', '酉', '未'],
    palaceElement: 'metal',
  },
  li: {
    lowerStem: '己',
    upperStem: '己',
    lowerBranches: ['卯', '丑', '亥'],
    upperBranches: ['酉', '未', '巳'],
    palaceElement: 'fire',
  },
  zhen: {
    lowerStem: '庚',
    upperStem: '庚',
    lowerBranches: ['子', '寅', '辰'],
    upperBranches: ['午', '申', '戌'],
    palaceElement: 'wood',
  },
  xun: {
    lowerStem: '辛',
    upperStem: '辛',
    lowerBranches: ['丑', '亥', '酉'],
    upperBranches: ['未', '巳', '卯'],
    palaceElement: 'wood',
  },
  kan: {
    lowerStem: '戊',
    upperStem: '戊',
    lowerBranches: ['寅', '辰', '午'],
    upperBranches: ['申', '戌', '子'],
    palaceElement: 'water',
  },
  gen: {
    lowerStem: '丙',
    upperStem: '丙',
    lowerBranches: ['辰', '午', '申'],
    upperBranches: ['戌', '子', '寅'],
    palaceElement: 'earth',
  },
  kun: {
    lowerStem: '乙',
    upperStem: '癸',
    lowerBranches: ['未', '巳', '卯'],
    upperBranches: ['丑', '亥', '酉'],
    palaceElement: 'earth',
  },
};

export const BRANCH_ELEMENTS: Record<string, BranchElement> = {
  子: 'water',
  亥: 'water',
  寅: 'wood',
  卯: 'wood',
  巳: 'fire',
  午: 'fire',
  辰: 'earth',
  戌: 'earth',
  丑: 'earth',
  未: 'earth',
  申: 'metal',
  酉: 'metal',
};
