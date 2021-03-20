export const ALL_MARBLES = [
    'HotPink',
    'Crimson',
    'LightCoral',
    'LightGoldenrodYellow',
    'DeepSkyBlue',
    'Aquamarine',
    'MediumSpringGreen',
    'SeaGreen',
    'DarkViolet',
    'Plum',
] as const;

export type Marble = typeof ALL_MARBLES[number];
