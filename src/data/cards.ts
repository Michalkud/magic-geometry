export type PathRef = { a: number; b: number };

export type TarotCard = {
  id: string;
  label: string;
  trumpNumber: number; // 0-21
  image: string; // URL or local path
  path?: PathRef; // associated Tree path
  note?: string; // brief epithet
  hebrewLetter?: string; // Hebrew letter
  hebrewName?: string; // Hebrew name of the letter
  element?: string; // Element or astrological association
  pathNumber?: number; // Traditional path number (11-32)
};

// Complete Thoth Tarot mapping with Hebrew letters and correspondences
// Based on Aleister Crowley's Book of Thoth and Golden Dawn attributions
export const TAROT_CARDS: TarotCard[] = [
  { 
    id: 'the-fool', 
    label: '0 The Fool', 
    trumpNumber: 0, 
    image: '/cards/the-fool.jpg', 
    path: { a: 1, b: 2 }, 
    hebrewLetter: 'א', 
    hebrewName: 'Aleph', 
    element: 'Air', 
    pathNumber: 11,
    note: 'Path of Aleph - The Breath of Life'
  },
  { 
    id: 'the-magus', 
    label: 'I The Magus', 
    trumpNumber: 1, 
    image: '/cards/trumps-01a-the-magus.jpg', 
    path: { a: 1, b: 3 }, 
    hebrewLetter: 'ב', 
    hebrewName: 'Beth', 
    element: 'Mercury', 
    pathNumber: 12,
    note: 'Path of Beth - The House of God'
  },
  { 
    id: 'the-priestess', 
    label: 'II The Priestess', 
    trumpNumber: 2, 
    image: '/cards/the-priestess.jpg', 
    path: { a: 1, b: 6 }, 
    hebrewLetter: 'ג', 
    hebrewName: 'Gimel', 
    element: 'Moon', 
    pathNumber: 13,
    note: 'Path of Gimel - The Camel'
  },
  { 
    id: 'the-empress', 
    label: 'III The Empress', 
    trumpNumber: 3, 
    image: '/cards/the-empress.jpg', 
    path: { a: 2, b: 3 }, 
    hebrewLetter: 'ד', 
    hebrewName: 'Daleth', 
    element: 'Venus', 
    pathNumber: 14,
    note: 'Path of Daleth - The Door'
  },
  { 
    id: 'the-emperor', 
    label: 'IV The Emperor', 
    trumpNumber: 4, 
    image: '/cards/the-emperor.jpg', 
    path: { a: 2, b: 6 }, 
    hebrewLetter: 'ה', 
    hebrewName: 'Heh', 
    element: 'Aries', 
    pathNumber: 15,
    note: 'Path of Heh - The Window'
  },
  { 
    id: 'the-hierophant', 
    label: 'V The Hierophant', 
    trumpNumber: 5, 
    image: '/cards/the-hierophant.jpg', 
    path: { a: 2, b: 4 }, 
    hebrewLetter: 'ו', 
    hebrewName: 'Vav', 
    element: 'Taurus', 
    pathNumber: 16,
    note: 'Path of Vav - The Nail'
  },
  { 
    id: 'the-lovers', 
    label: 'VI The Lovers', 
    trumpNumber: 6, 
    image: '/cards/the-lovers.jpg', 
    path: { a: 3, b: 6 }, 
    hebrewLetter: 'ז', 
    hebrewName: 'Zayin', 
    element: 'Gemini', 
    pathNumber: 17,
    note: 'Path of Zayin - The Sword'
  },
  { 
    id: 'the-chariot', 
    label: 'VII The Chariot', 
    trumpNumber: 7, 
    image: '/cards/the-chariot.jpg', 
    path: { a: 3, b: 5 }, 
    hebrewLetter: 'ח', 
    hebrewName: 'Cheth', 
    element: 'Cancer', 
    pathNumber: 18,
    note: 'Path of Cheth - The Fence'
  },
  { 
    id: 'adjustment', 
    label: 'VIII Adjustment', 
    trumpNumber: 8, 
    image: '/cards/adjustment.jpg', 
    path: { a: 5, b: 6 }, 
    hebrewLetter: 'ל', 
    hebrewName: 'Lamed', 
    element: 'Libra', 
    pathNumber: 22,
    note: 'Path of Lamed - The Ox Goad'
  },
  { 
    id: 'the-hermit', 
    label: 'IX The Hermit', 
    trumpNumber: 9, 
    image: '/cards/the-hermit.jpg', 
    path: { a: 4, b: 6 }, 
    hebrewLetter: 'י', 
    hebrewName: 'Yod', 
    element: 'Virgo', 
    pathNumber: 20,
    note: 'Path of Yod - The Hand'
  },
  { 
    id: 'fortune', 
    label: 'X Fortune', 
    trumpNumber: 10, 
    image: '/cards/fortune.jpg', 
    path: { a: 4, b: 7 }, 
    hebrewLetter: 'כ', 
    hebrewName: 'Kaph', 
    element: 'Jupiter', 
    pathNumber: 21,
    note: 'Path of Kaph - The Palm of the Hand'
  },
  { 
    id: 'lust', 
    label: 'XI Lust', 
    trumpNumber: 11, 
    image: '/cards/lust.jpg', 
    path: { a: 4, b: 5 }, 
    hebrewLetter: 'ט', 
    hebrewName: 'Teth', 
    element: 'Leo', 
    pathNumber: 19,
    note: 'Path of Teth - The Serpent'
  },
  { 
    id: 'the-hanged-man', 
    label: 'XII The Hanged Man', 
    trumpNumber: 12, 
    image: '/cards/the-hanged-man.jpg', 
    path: { a: 5, b: 8 }, 
    hebrewLetter: 'מ', 
    hebrewName: 'Mem', 
    element: 'Water', 
    pathNumber: 23,
    note: 'Path of Mem - The Waters'
  },
  { 
    id: 'death', 
    label: 'XIII Death', 
    trumpNumber: 13, 
    image: '/cards/death.jpg', 
    path: { a: 6, b: 7 }, 
    hebrewLetter: 'נ', 
    hebrewName: 'Nun', 
    element: 'Scorpio', 
    pathNumber: 24,
    note: 'Path of Nun - The Fish'
  },
  { 
    id: 'art', 
    label: 'XIV Art', 
    trumpNumber: 14, 
    image: '/cards/art.jpg', 
    path: { a: 6, b: 9 }, 
    hebrewLetter: 'ס', 
    hebrewName: 'Samekh', 
    element: 'Sagittarius', 
    pathNumber: 25,
    note: 'Path of Samekh - The Prop'
  },
  { 
    id: 'the-devil', 
    label: 'XV The Devil', 
    trumpNumber: 15, 
    image: '/cards/the-devil.jpg', 
    path: { a: 6, b: 8 }, 
    hebrewLetter: 'ע', 
    hebrewName: 'Ayin', 
    element: 'Capricorn', 
    pathNumber: 26,
    note: 'Path of Ayin - The Eye'
  },
  { 
    id: 'the-tower', 
    label: 'XVI The Tower', 
    trumpNumber: 16, 
    image: '/cards/the-tower.jpg', 
    path: { a: 7, b: 8 }, 
    hebrewLetter: 'פ', 
    hebrewName: 'Peh', 
    element: 'Mars', 
    pathNumber: 27,
    note: 'Path of Peh - The Mouth'
  },
  { 
    id: 'the-star', 
    label: 'XVII The Star', 
    trumpNumber: 17, 
    image: '/cards/the-star.jpg', 
    path: { a: 7, b: 9 }, 
    hebrewLetter: 'צ', 
    hebrewName: 'Tzaddi', 
    element: 'Aquarius', 
    pathNumber: 28,
    note: 'Path of Tzaddi - The Fish Hook'
  },
  { 
    id: 'the-moon', 
    label: 'XVIII The Moon', 
    trumpNumber: 18, 
    image: '/cards/the-moon.jpg', 
    path: { a: 7, b: 10 }, 
    hebrewLetter: 'ק', 
    hebrewName: 'Qoph', 
    element: 'Pisces', 
    pathNumber: 29,
    note: 'Path of Qoph - The Back of the Head'
  },
  { 
    id: 'the-sun', 
    label: 'XIX The Sun', 
    trumpNumber: 19, 
    image: '/cards/the-sun.jpg', 
    path: { a: 8, b: 9 }, 
    hebrewLetter: 'ר', 
    hebrewName: 'Resh', 
    element: 'Sun', 
    pathNumber: 30,
    note: 'Path of Resh - The Head'
  },
  { 
    id: 'the-aeon', 
    label: 'XX The Aeon', 
    trumpNumber: 20, 
    image: '/cards/the-aeon.jpg', 
    path: { a: 8, b: 10 }, 
    hebrewLetter: 'ש', 
    hebrewName: 'Shin', 
    element: 'Fire', 
    pathNumber: 31,
    note: 'Path of Shin - The Tooth'
  },
  { 
    id: 'the-universe', 
    label: 'XXI The Universe', 
    trumpNumber: 21, 
    image: '/cards/the-universe.jpg', 
    path: { a: 9, b: 10 }, 
    hebrewLetter: 'ת', 
    hebrewName: 'Tav', 
    element: 'Saturn', 
    pathNumber: 32,
    note: 'Path of Tav - The Cross'
  }
].sort((a, b) => a.trumpNumber - b.trumpNumber);


