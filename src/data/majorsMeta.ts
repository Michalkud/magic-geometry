export type MajorMeta = {
  id: string;
  hebrew: string; // letter
  attribution: string; // element/planet/sign (Thoth assignments)
  pathTitle?: string; // e.g., 22nd Path — Faithful Intelligence
  sources?: { label: string; url: string }[];
};

export const MAJORS_META: Record<string, MajorMeta> = {
  'the-fool': { id: 'the-fool', hebrew: 'Aleph', attribution: 'Air', sources: [{ label: 'Tarot & Tree of Life', url: 'https://www.tarrdaniel.com/documents/Hermetic/tarot/tarot_info/tree_of_life.html' }] },
  'the-magus': { id: 'the-magus', hebrew: 'Beth', attribution: 'Mercury' },
  'the-priestess': { id: 'the-priestess', hebrew: 'Gimel', attribution: 'Moon' },
  'the-empress': { id: 'the-empress', hebrew: 'Daleth', attribution: 'Venus' },
  'the-emperor': { id: 'the-emperor', hebrew: 'Tzaddi', attribution: 'Aquarius' },
  'the-hierophant': { id: 'the-hierophant', hebrew: 'Vav', attribution: 'Taurus' },
  'the-lovers': { id: 'the-lovers', hebrew: 'Zayin', attribution: 'Gemini' },
  'the-chariot': { id: 'the-chariot', hebrew: 'Cheth', attribution: 'Cancer' },
  'adjustment': { id: 'adjustment', hebrew: 'Lamed', attribution: 'Libra', pathTitle: '22nd Path — Faithful Intelligence' },
  'the-hermit': { id: 'the-hermit', hebrew: 'Yod', attribution: 'Virgo' },
  'fortune': { id: 'fortune', hebrew: 'Kaph', attribution: 'Jupiter' },
  'lust': { id: 'lust', hebrew: 'Teth', attribution: 'Leo' },
  'the-hanged-man': { id: 'the-hanged-man', hebrew: 'Mem', attribution: 'Water' },
  'death': { id: 'death', hebrew: 'Nun', attribution: 'Scorpio' },
  'art': { id: 'art', hebrew: 'Samekh', attribution: 'Sagittarius' },
  'the-devil': { id: 'the-devil', hebrew: 'Ayin', attribution: 'Capricorn' },
  'the-tower': { id: 'the-tower', hebrew: 'Peh', attribution: 'Mars' },
  'the-star': { id: 'the-star', hebrew: 'Heh', attribution: 'Aries' },
  'the-moon': { id: 'the-moon', hebrew: 'Qoph', attribution: 'Pisces' },
  'the-sun': { id: 'the-sun', hebrew: 'Resh', attribution: 'Sun' },
  'the-aeon': { id: 'the-aeon', hebrew: 'Shin', attribution: 'Fire/Spirit' },
  'the-universe': { id: 'the-universe', hebrew: 'Tav', attribution: 'Saturn/Earth' },
};


