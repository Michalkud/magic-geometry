/**
 * The Hierophant Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const hierophantCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-05-the-hierophant',
    label: 'The Hierophant Card',
    type: 'card',
    description: 'The Hierophant Major Arcana card representing spiritual authority, tradition, and religious doctrine',
    meanings: ['spiritual authority', 'tradition', 'religious doctrine', 'conventional wisdom', 'spiritual guidance', 'institutional faith'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille', 'Catholic'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'hierophant-figure',
    label: 'The Hierophant',
    type: 'figure',
    description: 'Seated religious authority figure representing the ruling power of external religion and spiritual guidance',
    meanings: ['spiritual authority', 'religious leader', 'teacher', 'guide', 'channel of grace', 'institutional wisdom'],
    traditions: ['Christian', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'primary' }
    ]
  },

  // Crown and regalia
  {
    id: 'triple-crown',
    label: 'Triple Crown',
    type: 'object',
    description: 'Three-tiered papal crown representing dominion over three worlds: conscious, subconscious, and superconscious',
    meanings: ['three worlds', 'spiritual authority', 'papal power', 'triple nature of divinity', 'conscious/subconscious/superconscious'],
    traditions: ['Christian', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'primary' }
    ]
  },

  // Sacred implements
  {
    id: 'triple-cross-scepter',
    label: 'Triple Cross Scepter',
    type: 'object',
    description: 'Scepter terminating in triple cross, representing spiritual authority and connection to divine trinity',
    meanings: ['spiritual authority', 'divine trinity', 'papal power', 'three levels of existence', 'religious hierarchy'],
    traditions: ['Christian', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'primary' }
    ]
  },

  {
    id: 'crossed-keys',
    label: 'Crossed Keys',
    type: 'object',
    description: 'Two crossed keys at his feet, one gold and one silver, representing keys to heaven and spiritual mysteries',
    meanings: ['keys to heaven', 'spiritual mysteries', 'divine knowledge', 'papal authority', 'gold and silver principles'],
    traditions: ['Christian', 'Papal symbolism', 'Hermetic', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'primary' }
    ]
  },

  // Hand gestures and positioning
  {
    id: 'benediction-gesture',
    label: 'Benediction Hand Gesture',
    type: 'geometric',
    description: 'Right hand raised in ecclesiastical blessing sign, distinguishing between manifest and concealed doctrine',
    meanings: ['blessing', 'esoteric teaching', 'hidden doctrine', 'spiritual transmission', 'divine grace'],
    traditions: ['Christian', 'Esoteric', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'primary' }
    ]
  },

  // Clothing
  {
    id: 'red-outer-robe',
    label: 'Red Outer Robe',
    type: 'object',
    description: 'Red outer vestment representing passion, divine love, and spiritual energy',
    meanings: ['divine love', 'spiritual passion', 'sacred fire', 'life force', 'active spiritual principle'],
    traditions: ['Christian vestments', 'Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'primary' }
    ]
  },

  {
    id: 'blue-vestment',
    label: 'Blue Middle Vestment',
    type: 'object',
    description: 'Blue middle garment representing spiritual truth, wisdom, and divine knowledge',
    meanings: ['spiritual truth', 'divine wisdom', 'higher knowledge', 'peace', 'spiritual depth'],
    traditions: ['Christian vestments', 'Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'secondary' }
    ]
  },

  {
    id: 'white-undergarment',
    label: 'White Undergarment',
    type: 'object',
    description: 'White inner robe representing purity, spiritual cleanliness, and divine essence',
    meanings: ['purity', 'spiritual cleanliness', 'divine essence', 'innocence', 'sacred foundation'],
    traditions: ['Christian vestments', 'Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'background' }
    ]
  },

  {
    id: 'blue-scarf',
    label: 'Blue Scarf/Stole',
    type: 'object',
    description: 'Blue ceremonial scarf or stole representing priestly office and spiritual authority',
    meanings: ['priestly office', 'ceremonial authority', 'spiritual service', 'divine calling', 'sacred duty'],
    traditions: ['Christian vestments', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'secondary' }
    ]
  },

  // Architectural elements
  {
    id: 'gray-pillars',
    label: 'Gray Pillars',
    type: 'architectural',
    description: 'Two gray pillars flanking the Hierophant, representing the pillars of the temple and spiritual structure',
    meanings: ['spiritual structure', 'temple pillars', 'divine architecture', 'sacred geometry', 'institutional framework'],
    traditions: ['Masonic', 'Temple symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'background' }
    ]
  },

  // Acolytes/disciples
  {
    id: 'kneeling-acolytes',
    label: 'Kneeling Acolytes',
    type: 'figure',
    description: 'Two priestly ministers in albs kneeling before the Hierophant, representing disciples and spiritual seekers',
    meanings: ['disciples', 'spiritual seekers', 'religious devotion', 'learning', 'spiritual guidance', 'humility'],
    traditions: ['Christian', 'Monastic', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'primary' }
    ]
  },

  {
    id: 'white-albs',
    label: 'White Albs',
    type: 'object',
    description: 'White ceremonial robes worn by the acolytes, representing purity and religious devotion',
    meanings: ['purity', 'religious devotion', 'spiritual dedication', 'clerical office', 'sacred service'],
    traditions: ['Christian vestments', 'Monastic', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'secondary' }
    ]
  },

  // Symbolic patterns and decorations
  {
    id: 'rose-patterns',
    label: 'Rose Patterns on Robes',
    type: 'plant',
    description: 'Rose motifs embroidered on vestments representing divine love and spiritual beauty',
    meanings: ['divine love', 'spiritual beauty', 'sacred passion', 'mystical rose', 'spiritual unfoldment'],
    traditions: ['Christian symbolism', 'Rosicrucian', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'background' }
    ]
  },

  {
    id: 'lily-patterns',
    label: 'Lily Patterns on Robes',
    type: 'plant',
    description: 'Lily motifs on vestments representing purity and spiritual wisdom',
    meanings: ['purity', 'spiritual wisdom', 'virgin mary', 'divine grace', 'spiritual perfection'],
    traditions: ['Christian symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'background' }
    ]
  },

  {
    id: 'letter-w-symbol',
    label: 'Letter W Symbol',
    type: 'number',
    description: 'Letter W symbol associated with the Hierophant, representing Vau in Hebrew alphabet',
    meanings: ['Hebrew Vau', 'nail or hook', 'connection', 'binding force', 'bridge between worlds'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'secondary' }
    ]
  },

  // Throne and seating
  {
    id: 'papal-throne',
    label: 'Papal Throne',
    type: 'architectural',
    description: 'Ornate throne representing spiritual authority and ecclesiastical power',
    meanings: ['spiritual authority', 'ecclesiastical power', 'papal seat', 'divine mandate', 'institutional religion'],
    traditions: ['Christian', 'Papal symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'secondary' }
    ]
  },

  // Additional symbolic elements
  {
    id: 'formal-teaching-posture',
    label: 'Formal Teaching Posture',
    type: 'geometric',
    description: 'Upright, formal seated position demonstrating teaching authority and spiritual guidance',
    meanings: ['teaching authority', 'spiritual guidance', 'formal instruction', 'religious doctrine', 'established wisdom'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'primary' }
    ]
  },

  {
    id: 'ecclesiastical-environment',
    label: 'Sacred Temple Environment',
    type: 'architectural',
    description: 'Overall sacred temple setting representing institutional religion and organized spirituality',
    meanings: ['institutional religion', 'organized spirituality', 'sacred space', 'religious authority', 'traditional wisdom'],
    traditions: ['Christian', 'Temple symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-05-the-hierophant', prominence: 'background' }
    ]
  }
];

// Export individual symbols for easy access
export const HIEROPHANT_CARD = hierophantCardSymbols.find(s => s.id === 'card-05-the-hierophant')!;
export const TRIPLE_CROWN = hierophantCardSymbols.find(s => s.id === 'triple-crown')!;
export const CROSSED_KEYS = hierophantCardSymbols.find(s => s.id === 'crossed-keys')!;
export const TRIPLE_CROSS_SCEPTER = hierophantCardSymbols.find(s => s.id === 'triple-cross-scepter')!;