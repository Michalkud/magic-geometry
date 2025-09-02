/**
 * Strength Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const strengthCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-08-strength',
    label: 'Strength Card',
    type: 'card',
    description: 'Strength Major Arcana card representing inner strength, courage, and gentle control',
    meanings: ['inner strength', 'courage', 'patience', 'compassion', 'gentle control', 'fortitude', 'spiritual power'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  // Main figure - The Woman
  {
    id: 'strength-woman',
    label: 'The Woman Figure',
    type: 'figure',
    description: 'Gentle woman in white dress taming the lion, representing feminine spiritual strength',
    meanings: ['feminine strength', 'gentle power', 'spiritual courage', 'compassion', 'inner fortitude', 'moral strength'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  // The Lion
  {
    id: 'golden-lion',
    label: 'Golden Lion',
    type: 'animal',
    description: 'Golden lion being gently controlled by the woman, representing animal nature and passions',
    meanings: ['animal nature', 'raw passions', 'base desires', 'primal instincts', 'Leo energy', 'physical strength'],
    traditions: ['Astrological', 'Solar symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  // Woman's clothing and attributes
  {
    id: 'white-dress',
    label: 'White Dress',
    type: 'object',
    description: 'Pure white dress worn by the woman representing spiritual purity and inner cleanliness',
    meanings: ['spiritual purity', 'innocence', 'divine essence', 'moral cleanliness', 'higher nature'],
    traditions: ['Color symbolism', 'Christian', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  {
    id: 'flower-crown',
    label: 'Flower Crown/Garland',
    type: 'plant',
    description: 'Crown or garland of flowers adorning the woman\'s head, representing natural beauty and divine grace',
    meanings: ['natural beauty', 'divine grace', 'spiritual flowering', 'connection to nature', 'gentle authority'],
    traditions: ['Natural symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'secondary' }
    ]
  },

  {
    id: 'red-belt-sash',
    label: 'Red Belt or Sash',
    type: 'object',
    description: 'Red belt or sash around the woman\'s waist representing passion controlled by higher will',
    meanings: ['controlled passion', 'disciplined desire', 'spiritual girding', 'life force', 'active principle'],
    traditions: ['Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'secondary' }
    ]
  },

  // Infinity symbol
  {
    id: 'infinity-symbol-strength',
    label: 'Infinity Symbol (Lemniscate)',
    type: 'geometric',
    description: 'Figure-eight symbol above the woman\'s head representing infinite spiritual power',
    meanings: ['infinite power', 'eternal strength', 'spiritual mastery', 'unlimited potential', 'divine energy'],
    traditions: ['Mathematical', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  // Action and gesture
  {
    id: 'gentle-lion-taming',
    label: 'Gentle Lion Taming Gesture',
    type: 'geometric',
    description: 'Soft, gentle gesture of opening or closing the lion\'s mouth without force',
    meanings: ['gentle control', 'persuasion over force', 'love conquers all', 'spiritual dominion', 'inner mastery'],
    traditions: ['Psychological', 'Spiritual allegory', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  {
    id: 'hands-on-lion',
    label: 'Hands Touching Lion',
    type: 'geometric',
    description: 'Woman\'s hands gently placed on or near the lion\'s head and jaw',
    meanings: ['gentle touch', 'healing power', 'compassionate control', 'loving guidance', 'spiritual healing'],
    traditions: ['Healing arts', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  // Lion's characteristics
  {
    id: 'lion-mane',
    label: 'Lion\'s Mane',
    type: 'geometric',
    description: 'Full golden mane of the lion representing solar energy and masculine force',
    meanings: ['solar energy', 'masculine power', 'Leo symbolism', 'radiant strength', 'natural majesty'],
    traditions: ['Solar symbolism', 'Astrological', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'secondary' }
    ]
  },

  {
    id: 'lion-submission',
    label: 'Lion\'s Submissive Posture',
    type: 'geometric',
    description: 'Lion\'s willing, gentle submission to the woman\'s touch',
    meanings: ['willing submission', 'tamed nature', 'harmony of opposites', 'peace through strength', 'natural cooperation'],
    traditions: ['Psychological', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  // Background landscape
  {
    id: 'mountain-backdrop',
    label: 'Mountain Backdrop',
    type: 'architectural',
    description: 'Mountains in the background representing spiritual heights and challenges overcome',
    meanings: ['spiritual heights', 'obstacles overcome', 'achievement', 'solid foundation', 'permanence'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'background' }
    ]
  },

  {
    id: 'blue-sky',
    label: 'Blue Sky',
    type: 'color',
    description: 'Clear blue sky representing spiritual clarity and peaceful atmosphere',
    meanings: ['spiritual clarity', 'peace', 'divine atmosphere', 'clear consciousness', 'mental serenity'],
    traditions: ['Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'background' }
    ]
  },

  {
    id: 'pastoral-setting',
    label: 'Pastoral Setting',
    type: 'element',
    description: 'Natural, peaceful countryside setting representing harmony with nature',
    meanings: ['harmony with nature', 'natural setting', 'peaceful environment', 'pastoral beauty', 'garden of the soul'],
    traditions: ['Natural philosophy', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'background' }
    ]
  },

  // Symbolic colors
  {
    id: 'golden-yellow-tones',
    label: 'Golden/Yellow Color Scheme',
    type: 'color',
    description: 'Dominant golden and yellow tones representing solar energy and enlightenment',
    meanings: ['solar energy', 'enlightenment', 'spiritual gold', 'divine light', 'Leo correspondence'],
    traditions: ['Solar symbolism', 'Astrological', 'Color therapy', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  // Astrological and elemental
  {
    id: 'leo-correspondence',
    label: 'Leo Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Leo zodiac sign through lion symbolism',
    meanings: ['Leo energy', 'fixed fire', 'solar rulership', 'heart center', 'creative force', 'noble character'],
    traditions: ['Astrological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  // Spiritual symbolism
  {
    id: 'divine-feminine-strength',
    label: 'Divine Feminine Strength',
    type: 'geometric',
    description: 'Representation of feminine spiritual power overcoming masculine physical force',
    meanings: ['divine feminine', 'spiritual over physical', 'gentle power', 'love over fear', 'inner conquest'],
    traditions: ['Feminine mysteries', 'Spiritual alchemy', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  {
    id: 'soul-animal-harmony',
    label: 'Soul-Animal Harmony',
    type: 'geometric',
    description: 'Perfect harmony between higher soul (woman) and animal nature (lion)',
    meanings: ['soul mastery', 'animal nature tamed', 'integration of opposites', 'spiritual evolution', 'conscious control'],
    traditions: ['Psychological', 'Alchemical', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  },

  // Additional symbolic elements
  {
    id: 'chain-absence',
    label: 'Absence of Chains',
    type: 'geometric',
    description: 'Notable lack of chains or bonds, showing control through love rather than force',
    meanings: ['voluntary cooperation', 'love not force', 'freedom through discipline', 'willing partnership', 'trust'],
    traditions: ['Psychological', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'secondary' }
    ]
  },

  {
    id: 'upright-posture',
    label: 'Upright, Confident Posture',
    type: 'geometric',
    description: 'Woman\'s confident, upright stance showing spiritual authority and inner certainty',
    meanings: ['spiritual authority', 'inner confidence', 'moral certainty', 'divine backing', 'self-assurance'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'secondary' }
    ]
  },

  // Overall composition
  {
    id: 'strength-composition',
    label: 'Strength Card Composition',
    type: 'geometric',
    description: 'Overall peaceful scene showing triumph of spirit over matter through gentle persuasion',
    meanings: ['spirit over matter', 'gentle persuasion', 'inner victory', 'moral strength', 'patient courage'],
    traditions: ['Spiritual allegory', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-08-strength', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const STRENGTH_CARD = strengthCardSymbols.find(s => s.id === 'card-08-strength')!;
export const STRENGTH_WOMAN = strengthCardSymbols.find(s => s.id === 'strength-woman')!;
export const GOLDEN_LION = strengthCardSymbols.find(s => s.id === 'golden-lion')!;
export const INFINITY_SYMBOL = strengthCardSymbols.find(s => s.id === 'infinity-symbol-strength')!;