/**
 * The Magician Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const magicianCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-01-the-magician',
    label: 'The Magician Card',
    type: 'card',
    description: 'The Magician Major Arcana card representing manifestation, will, and divine connection',
    meanings: ['manifestation', 'will power', 'divine connection', 'as above so below', 'skill', 'concentration'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'magician-figure',
    label: 'The Magician',
    type: 'figure',
    description: 'Youthful figure in magician\'s robe with countenance of divine Apollo and confident smile',
    meanings: ['divine motive in man', 'unity of individual being', 'spiritual mastery', 'conscious will'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'primary' }
    ]
  },

  // Key symbols
  {
    id: 'infinity-symbol',
    label: 'Infinity Symbol (Lemniscate)',
    type: 'geometric',
    description: 'Horizontal figure-8 above the Magician\'s head representing eternal spiritual energy',
    meanings: ['eternal life', 'unlimited potential', 'divine consciousness', 'spiritual infinity', 'holy spirit'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'primary' }
    ]
  },

  {
    id: 'serpent-cincture',
    label: 'Serpent Belt/Cincture',
    type: 'object',
    description: 'Serpent eating its own tail worn as a belt, representing eternal cycles',
    meanings: ['ouroboros', 'eternal cycles', 'self-renewal', 'wholeness', 'alchemical transformation'],
    traditions: ['Alchemical', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'secondary' }
    ]
  },

  // Hand gestures and positions
  {
    id: 'raised-wand',
    label: 'Raised Wand',
    type: 'object',
    description: 'Wand raised toward heaven in right hand, channeling divine energy',
    meanings: ['divine connection', 'channeling energy', 'spiritual authority', 'connection to above'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'primary' }
    ]
  },

  {
    id: 'pointing-left-hand',
    label: 'Pointing Left Hand',
    type: 'geometric',
    description: 'Left hand pointing downward to earth, demonstrating "as above, so below"',
    meanings: ['as above so below', 'grounding energy', 'manifestation', 'earthly application'],
    traditions: ['Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'primary' }
    ]
  },

  // Altar and tools
  {
    id: 'magician-altar',
    label: 'Magician\'s Altar',
    type: 'architectural',
    description: 'Table/altar displaying the four suit symbols representing mastery over elements',
    meanings: ['sacred workspace', 'elemental mastery', 'preparation', 'foundation for work'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'secondary' }
    ]
  },

  {
    id: 'wand-on-table',
    label: 'Wand (Fire Element)',
    type: 'object',
    description: 'Wand on altar representing fire element and creative energy',
    meanings: ['fire element', 'creative force', 'inspiration', 'spiritual energy', 'will'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'secondary' }
    ]
  },

  {
    id: 'cup-on-table',
    label: 'Cup (Water Element)',
    type: 'object',
    description: 'Cup on altar representing water element and emotional/intuitive realm',
    meanings: ['water element', 'emotions', 'intuition', 'receptivity', 'subconscious'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'secondary' }
    ]
  },

  {
    id: 'sword-on-table',
    label: 'Sword (Air Element)',
    type: 'object',
    description: 'Sword on altar representing air element and mental realm',
    meanings: ['air element', 'intellect', 'mental clarity', 'communication', 'thought'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'secondary' }
    ]
  },

  {
    id: 'pentacle-on-table',
    label: 'Pentacle (Earth Element)',
    type: 'object',
    description: 'Pentacle on altar representing earth element and material realm',
    meanings: ['earth element', 'material manifestation', 'practical results', 'physical realm', 'resources'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'secondary' }
    ]
  },

  // Clothing
  {
    id: 'red-robe',
    label: 'Red Robe',
    type: 'object',
    description: 'Outer red robe representing passion and active energy',
    meanings: ['passion', 'active energy', 'life force', 'power', 'vitality'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'secondary' }
    ]
  },

  {
    id: 'white-undergarment',
    label: 'White Undergarment',
    type: 'object',
    description: 'White garment beneath the red robe representing purity of intention',
    meanings: ['purity', 'spiritual foundation', 'divine essence', 'clean intentions'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'background' }
    ]
  },

  // Flora
  {
    id: 'red-roses',
    label: 'Red Roses',
    type: 'plant',
    description: 'Red roses in garden above representing desire and passion',
    meanings: ['passion', 'desire', 'love', 'earthly attachment', 'material beauty'],
    traditions: ['Rider-Waite-Smith', 'Christian symbolism'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'background' }
    ]
  },

  {
    id: 'white-lilies',
    label: 'White Lilies',
    type: 'plant',
    description: 'White lilies below representing purity and spiritual wisdom',
    meanings: ['purity', 'spiritual wisdom', 'divine love', 'virgin mary', 'compassion'],
    traditions: ['Rider-Waite-Smith', 'Christian symbolism', 'Hermetic'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'background' }
    ]
  },

  // Background elements
  {
    id: 'lush-garden',
    label: 'Lush Garden',
    type: 'element',
    description: 'Abundant garden setting representing fertility and manifestation',
    meanings: ['abundance', 'fertility', 'manifestation', 'growth', 'natural magic'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'background' }
    ]
  },

  {
    id: 'yellow-background',
    label: 'Yellow Background',
    type: 'color',
    description: 'Yellow background representing consciousness and mental clarity',
    meanings: ['consciousness', 'mental clarity', 'illumination', 'intellectual power', 'solar energy'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-01-the-magician', prominence: 'background' }
    ]
  }
];

// Export individual symbols for easy access
export const MAGICIAN_CARD = magicianCardSymbols.find(s => s.id === 'card-01-the-magician')!;
export const INFINITY_SYMBOL = magicianCardSymbols.find(s => s.id === 'infinity-symbol')!;
export const RED_ROSES = magicianCardSymbols.find(s => s.id === 'red-roses')!;
export const WHITE_LILIES = magicianCardSymbols.find(s => s.id === 'white-lilies')!;