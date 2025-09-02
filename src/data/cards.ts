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

// Complete Rider-Waite-Smith Tarot mapping with Hebrew letters and correspondences
// Based on traditional Golden Dawn attributions
export const TAROT_CARDS: TarotCard[] = [
  { 
    id: 'the-fool', 
    label: '0 The Fool', 
    trumpNumber: 0, 
    image: '/rws/RWS_Tarot_00_Fool.jpg', 
    path: { a: 1, b: 2 }, 
    hebrewLetter: 'א', 
    hebrewName: 'Aleph', 
    element: 'Air', 
    pathNumber: 11,
    note: 'Path of Aleph - The Breath of Life'
  },
  { 
    id: 'the-magician', 
    label: 'I The Magician', 
    trumpNumber: 1, 
    image: '/rws/RWS_Tarot_01_Magician.jpg', 
    path: { a: 1, b: 3 }, 
    hebrewLetter: 'ב', 
    hebrewName: 'Beth', 
    element: 'Mercury', 
    pathNumber: 12,
    note: 'Path of Beth - The House of God'
  },
  { 
    id: 'the-high-priestess', 
    label: 'II The High Priestess', 
    trumpNumber: 2, 
    image: '/rws/RWS_Tarot_02_High_Priestess.jpg', 
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
    image: '/rws/RWS_Tarot_03_Empress.jpg', 
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
    image: '/rws/RWS_Tarot_04_Emperor.jpg', 
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
    image: '/rws/RWS_Tarot_05_Hierophant.jpg', 
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
    image: '/rws/RWS_Tarot_06_Lovers.jpg', 
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
    image: '/rws/RWS_Tarot_07_Chariot.jpg', 
    path: { a: 3, b: 5 }, 
    hebrewLetter: 'ח', 
    hebrewName: 'Cheth', 
    element: 'Cancer', 
    pathNumber: 18,
    note: 'Path of Cheth - The Fence'
  },
  { 
    id: 'strength', 
    label: 'VIII Strength', 
    trumpNumber: 8, 
    image: '/rws/RWS_Tarot_08_Strength.jpg', 
    path: { a: 4, b: 5 }, 
    hebrewLetter: 'ט', 
    hebrewName: 'Teth', 
    element: 'Leo', 
    pathNumber: 19,
    note: 'Path of Teth - The Serpent'
  },
  { 
    id: 'the-hermit', 
    label: 'IX The Hermit', 
    trumpNumber: 9, 
    image: '/rws/RWS_Tarot_09_Hermit.jpg', 
    path: { a: 4, b: 6 }, 
    hebrewLetter: 'י', 
    hebrewName: 'Yod', 
    element: 'Virgo', 
    pathNumber: 20,
    note: 'Path of Yod - The Hand'
  },
  { 
    id: 'wheel-of-fortune', 
    label: 'X Wheel of Fortune', 
    trumpNumber: 10, 
    image: '/rws/RWS_Tarot_10_Wheel_of_Fortune.jpg', 
    path: { a: 4, b: 7 }, 
    hebrewLetter: 'כ', 
    hebrewName: 'Kaph', 
    element: 'Jupiter', 
    pathNumber: 21,
    note: 'Path of Kaph - The Palm of the Hand'
  },
  { 
    id: 'justice', 
    label: 'XI Justice', 
    trumpNumber: 11, 
    image: '/rws/RWS_Tarot_11_Justice.jpg', 
    path: { a: 5, b: 6 }, 
    hebrewLetter: 'ל', 
    hebrewName: 'Lamed', 
    element: 'Libra', 
    pathNumber: 22,
    note: 'Path of Lamed - The Ox Goad'
  },
  { 
    id: 'the-hanged-man', 
    label: 'XII The Hanged Man', 
    trumpNumber: 12, 
    image: '/rws/RWS_Tarot_12_Hanged_Man.jpg', 
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
    image: '/rws/RWS_Tarot_13_Death.jpg', 
    path: { a: 6, b: 7 }, 
    hebrewLetter: 'נ', 
    hebrewName: 'Nun', 
    element: 'Scorpio', 
    pathNumber: 24,
    note: 'Path of Nun - The Fish'
  },
  { 
    id: 'temperance', 
    label: 'XIV Temperance', 
    trumpNumber: 14, 
    image: '/rws/RWS_Tarot_14_Temperance.jpg', 
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
    image: '/rws/RWS_Tarot_15_Devil.jpg', 
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
    image: '/rws/RWS_Tarot_16_Tower.jpg', 
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
    image: '/rws/RWS_Tarot_17_Star.jpg', 
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
    image: '/rws/RWS_Tarot_18_Moon.jpg', 
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
    image: '/rws/RWS_Tarot_19_Sun.jpg', 
    path: { a: 8, b: 9 }, 
    hebrewLetter: 'ר', 
    hebrewName: 'Resh', 
    element: 'Sun', 
    pathNumber: 30,
    note: 'Path of Resh - The Head'
  },
  { 
    id: 'judgement', 
    label: 'XX Judgement', 
    trumpNumber: 20, 
    image: '/rws/RWS_Tarot_20_Judgement.jpg', 
    path: { a: 8, b: 10 }, 
    hebrewLetter: 'ש', 
    hebrewName: 'Shin', 
    element: 'Fire', 
    pathNumber: 31,
    note: 'Path of Shin - The Tooth'
  },
  { 
    id: 'the-world', 
    label: 'XXI The World', 
    trumpNumber: 21, 
    image: '/rws/RWS_Tarot_21_World.jpg', 
    path: { a: 9, b: 10 }, 
    hebrewLetter: 'ת', 
    hebrewName: 'Tav', 
    element: 'Saturn', 
    pathNumber: 32,
    note: 'Path of Tav - The Cross'
  }
].sort((a, b) => a.trumpNumber - b.trumpNumber);


