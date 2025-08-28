export type Sephirah = {
  id: number;
  key: string;
  title: string; // e.g., "1 Kether"
};

export const SEPHIROT: Sephirah[] = [
  { id: 1, key: 'kether', title: '1 Kether' },
  { id: 2, key: 'chokmah', title: '2 Chokmah' },
  { id: 3, key: 'binah', title: '3 Binah' },
  { id: 4, key: 'chesed', title: '4 Chesed' },
  { id: 5, key: 'geburah', title: '5 Geburah' },
  { id: 6, key: 'tiphareth', title: '6 Tiphareth' },
  { id: 7, key: 'netzach', title: '7 Netzach' },
  { id: 8, key: 'hod', title: '8 Hod' },
  { id: 9, key: 'yesod', title: '9 Yesod' },
  { id: 10, key: 'malkuth', title: '10 Malkuth' },
];

export type SephirahMeaning = {
  id: number;
  title: string;
  meaning: string;
  symbols: string[];
  sources?: { label: string; url: string }[];
};

export const SEPHIROT_MEANINGS: Record<number, SephirahMeaning> = {
  1: {
    id: 1,
    title: 'Kether',
    meaning: 'The Crown; spiritual perfection; the divine spark above all worlds.',
    symbols: ['Crown', 'Point of brilliance'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  2: {
    id: 2,
    title: 'Chokmah',
    meaning: 'Wisdom; dynamic creative force; primal energy of emanation.',
    symbols: ['Sphere of grey', 'Zodiacal current'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  3: {
    id: 3,
    title: 'Binah',
    meaning: 'Understanding; form-giving intelligence; great sea of realization.',
    symbols: ['Black sphere', 'Throne/Great Sea'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  4: {
    id: 4,
    title: 'Chesed',
    meaning: 'Mercy; stability and governance; expansive benevolence.',
    symbols: ['Blue sphere', 'Sceptre'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  5: {
    id: 5,
    title: 'Geburah',
    meaning: 'Severity; motion and strength; purifying power of destruction.',
    symbols: ['Red sphere', 'Sword'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  6: {
    id: 6,
    title: 'Tiphareth',
    meaning: 'Beauty; solar harmony; heart of balance and consciousness.',
    symbols: ['Yellow-gold sphere', 'Sun'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  7: {
    id: 7,
    title: 'Netzach',
    meaning: 'Victory; creativity and desire; Venusian instinct and artistry.',
    symbols: ['Green sphere', 'Rose'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  8: {
    id: 8,
    title: 'Hod',
    meaning: 'Glory; intellect and structure; Mercurial analysis and order.',
    symbols: ['Orange sphere', 'Winged sandals/Book'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  9: {
    id: 9,
    title: 'Yesod',
    meaning: 'Foundation; reflection and imagination; lunar matrix of forms.',
    symbols: ['Violet sphere', 'Moon'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
  10: {
    id: 10,
    title: 'Malkuth',
    meaning: 'Kingdom; root and origin; the manifest world of action.',
    symbols: ['Earthy sphere', 'Altar/Temple'],
    sources: [{ label: 'Tarot & Tree of Life overview', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }],
  },
};


