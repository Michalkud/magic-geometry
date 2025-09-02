/**
 * The Empress Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const empressCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-03-the-empress',
    label: 'The Empress Card',
    type: 'card',
    description: 'The Empress Major Arcana card representing fertility, abundance, and nurturing mother energy',
    meanings: ['fertility', 'abundance', 'motherhood', 'nurturing', 'creativity', 'natural beauty'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'empress-figure',
    label: 'The Empress',
    type: 'figure',
    description: 'Stately female figure seated in lush natural setting, embodying divine feminine and motherhood',
    meanings: ['divine feminine', 'mother archetype', 'natural abundance', 'creative force', 'universal fecundity'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'primary' }
    ]
  },

  // Crown and regalia
  {
    id: 'twelve-star-crown',
    label: 'Twelve Star Crown',
    type: 'object',
    description: 'Crown with twelve stars representing connection to celestial realm and zodiac',
    meanings: ['celestial connection', 'twelve signs of zodiac', 'divine authority', 'cosmic consciousness'],
    traditions: ['Astrological', 'Christian (Virgin Mary)', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'primary' }
    ]
  },

  {
    id: 'scepter',
    label: 'Scepter',
    type: 'object',
    description: 'Royal scepter representing earthly authority and creative power',
    meanings: ['earthly authority', 'creative power', 'leadership', 'divine mandate'],
    traditions: ['Royal symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'secondary' }
    ]
  },

  // Venus symbols
  {
    id: 'venus-symbol-shield',
    label: 'Venus Symbol Shield',
    type: 'geometric',
    description: 'Heart-shaped shield with Venus symbol representing love and beauty',
    meanings: ['love', 'beauty', 'Venus planet', 'feminine energy', 'attraction', 'harmony'],
    traditions: ['Astrological', 'Alchemical', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'primary' }
    ]
  },

  // Clothing
  {
    id: 'white-gown',
    label: 'White Gown',
    type: 'object',
    description: 'Flowing white gown representing purity and divine femininity',
    meanings: ['purity', 'divine femininity', 'spiritual motherhood', 'innocence', 'sacred sexuality'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'primary' }
    ]
  },

  {
    id: 'pomegranate-pattern',
    label: 'Pomegranate Pattern on Gown',
    type: 'plant',
    description: 'Pomegranate motifs decorating her gown, symbolizing fertility',
    meanings: ['fertility', 'abundance', 'hidden potential', 'feminine mysteries', 'birth'],
    traditions: ['Greek mythology', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'secondary' }
    ]
  },

  // Comfort and luxury
  {
    id: 'luxurious-cushions',
    label: 'Luxurious Cushions',
    type: 'object',
    description: 'Rich, comfortable cushions representing abundance and comfort',
    meanings: ['abundance', 'comfort', 'luxury', 'material prosperity', 'ease'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'secondary' }
    ]
  },

  // Natural abundance
  {
    id: 'wheat-field',
    label: 'Wheat Field',
    type: 'plant',
    description: 'Golden wheat field representing harvest, abundance, and nourishment',
    meanings: ['harvest', 'abundance', 'nourishment', 'fertility of earth', 'sustenance'],
    traditions: ['Agricultural symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'primary' }
    ]
  },

  {
    id: 'lush-trees',
    label: 'Lush Trees',
    type: 'plant',
    description: 'Abundant trees and forest representing growth and natural fertility',
    meanings: ['growth', 'natural fertility', 'life force', 'shelter', 'protection'],
    traditions: ['Nature symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'background' }
    ]
  },

  {
    id: 'waterfall',
    label: 'Waterfall',
    type: 'element',
    description: 'Cascading waterfall representing life force and emotional flow',
    meanings: ['life force', 'emotional flow', 'cleansing', 'renewal', 'source of life'],
    traditions: ['Nature symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'background' }
    ]
  },

  // Sky and celestial
  {
    id: 'golden-sky',
    label: 'Golden Sky',
    type: 'element',
    description: 'Warm golden sky representing divine blessing and prosperity',
    meanings: ['divine blessing', 'prosperity', 'warmth', 'abundance', 'golden hour'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'background' }
    ]
  },

  // Jewelry and adornments
  {
    id: 'pearl-necklace',
    label: 'Pearl Necklace',
    type: 'object',
    description: 'String of pearls representing wisdom gained through experience',
    meanings: ['wisdom through experience', 'lunar connection', 'feminine beauty', 'hidden treasure'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'secondary' }
    ]
  },

  // Throne and seating
  {
    id: 'natural-throne',
    label: 'Natural Throne',
    type: 'architectural',
    description: 'Throne integrated with natural setting, showing harmony with nature',
    meanings: ['harmony with nature', 'natural authority', 'earth connection', 'grounded power'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'secondary' }
    ]
  },

  // Posture and gesture
  {
    id: 'relaxed-posture',
    label: 'Relaxed, Regal Posture',
    type: 'geometric',
    description: 'Comfortable, confident seated position showing ease and natural authority',
    meanings: ['natural authority', 'comfort with power', 'maternal confidence', 'peaceful dominion'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'primary' }
    ]
  },

  // Additional natural elements
  {
    id: 'fertile-landscape',
    label: 'Fertile Landscape',
    type: 'element',
    description: 'Rich, abundant natural environment surrounding the Empress',
    meanings: ['natural abundance', 'fertile ground', 'creative potential', 'life-giving environment'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'primary' }
    ]
  },

  {
    id: 'flowing-stream',
    label: 'Flowing Stream',
    type: 'element',
    description: 'Gentle stream flowing through the landscape',
    meanings: ['emotional flow', 'life current', 'gentle guidance', 'nurturing waters'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-03-the-empress', prominence: 'background' }
    ]
  }
];

// Export individual symbols for easy access
export const EMPRESS_CARD = empressCardSymbols.find(s => s.id === 'card-03-the-empress')!;
export const TWELVE_STAR_CROWN = empressCardSymbols.find(s => s.id === 'twelve-star-crown')!;
export const VENUS_SHIELD = empressCardSymbols.find(s => s.id === 'venus-symbol-shield')!;
export const WHEAT_FIELD = empressCardSymbols.find(s => s.id === 'wheat-field')!;