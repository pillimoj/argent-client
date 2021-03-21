export const ALL_MARBLES = [
    'HotPink',
    'Crimson',
    'LightCoral',
    'LightGoldenrodYellow',
    'DeepSkyBlue',
    'Aquamarine',
    'Teal',
    'SpringGreen',
    'DarkViolet',
    'Plum',
] as const;

export type Marble = typeof ALL_MARBLES[number];
