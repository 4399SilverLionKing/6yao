export const FIVE_ELEMENT_GENERATES = {
  wood: 'fire',
  fire: 'earth',
  earth: 'metal',
  metal: 'water',
  water: 'wood',
} as const;

export const FIVE_ELEMENT_CONTROLS = {
  wood: 'earth',
  fire: 'metal',
  earth: 'water',
  metal: 'wood',
  water: 'fire',
} as const;

export const RELATION_LABELS = {
  sibling: '兄弟',
  child: '子孙',
  wealth: '妻财',
  parent: '父母',
  officer: '官鬼',
} as const;
