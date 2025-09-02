/**
 * Justice Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const justiceCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-11-justice',
    label: 'Justice Card',
    type: 'card',
    description: 'Justice Major Arcana card representing balance, fairness, and karmic law',
    meanings: ['justice', 'balance', 'fairness', 'karma', 'legal matters', 'truth', 'accountability'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'justice-figure',
    label: 'Justice Figure',
    type: 'figure',
    description: 'Crowned female figure seated on throne representing divine justice and balanced judgment',
    meanings: ['divine justice', 'balanced judgment', 'impartial authority', 'fair arbitration', 'moral law'],
    traditions: ['Roman Justitia', 'Divine feminine', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  // Crown and regalia
  {
    id: 'square-crown',
    label: 'Square Crown',
    type: 'object',
    description: 'Square or cubic crown representing earthly authority and material justice',
    meanings: ['earthly authority', 'material justice', 'four elements', 'structured authority', 'temporal power'],
    traditions: ['Royal symbolism', 'Geometric', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  {
    id: 'crown-jewel',
    label: 'Crown Jewel/Ornament',
    type: 'object',
    description: 'Central jewel or ornament on crown representing divine wisdom and clarity',
    meanings: ['divine wisdom', 'clarity of judgment', 'third eye', 'spiritual insight', 'precious truth'],
    traditions: ['Crown symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'secondary' }
    ]
  },

  // The Scales
  {
    id: 'scales-of-justice',
    label: 'Scales of Justice',
    type: 'object',
    description: 'Golden scales held in left hand representing perfect balance and fair measurement',
    meanings: ['perfect balance', 'fair measurement', 'weighing actions', 'equilibrium', 'impartial judgment'],
    traditions: ['Classical justice', 'Legal symbolism', 'Egyptian Ma\'at', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  {
    id: 'scale-pans',
    label: 'Scale Pans',
    type: 'geometric',
    description: 'Two balanced pans of the scales representing opposing forces in equilibrium',
    meanings: ['opposing forces', 'equilibrium', 'balanced consideration', 'fair comparison', 'equal weight'],
    traditions: ['Balance symbolism', 'Libra', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  // The Sword
  {
    id: 'upright-sword',
    label: 'Upright Double-Edged Sword',
    type: 'object',
    description: 'Double-edged sword held upright in right hand representing truth and decisive judgment',
    meanings: ['truth', 'decisive judgment', 'cutting through deception', 'mental clarity', 'swift justice'],
    traditions: ['Sword of truth', 'Elemental Air', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  {
    id: 'sword-double-edge',
    label: 'Double-Edged Blade',
    type: 'geometric',
    description: 'Two-sided blade representing that justice cuts both ways',
    meanings: ['justice cuts both ways', 'double-edged truth', 'fair to all parties', 'impartial blade', 'balanced cutting'],
    traditions: ['Justice symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'secondary' }
    ]
  },

  {
    id: 'sword-hilt',
    label: 'Ornate Sword Hilt',
    type: 'object',
    description: 'Decorated hilt of the sword representing authority and controlled power',
    meanings: ['controlled authority', 'disciplined power', 'righteous force', 'lawful strength', 'judicial authority'],
    traditions: ['Weapon symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'secondary' }
    ]
  },

  // Throne and setting
  {
    id: 'stone-throne',
    label: 'Stone Throne',
    type: 'architectural',
    description: 'Solid stone throne representing unshakeable foundation of justice',
    meanings: ['unshakeable foundation', 'solid judgment', 'permanent law', 'stable authority', 'enduring justice'],
    traditions: ['Throne symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'secondary' }
    ]
  },

  // Clothing
  {
    id: 'red-robe',
    label: 'Red Outer Robe',
    type: 'object',
    description: 'Rich red robe representing passion for justice and life-giving force of law',
    meanings: ['passion for justice', 'life force', 'active principle', 'moral energy', 'judicial authority'],
    traditions: ['Color symbolism', 'Judicial robes', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  {
    id: 'green-undergarment',
    label: 'Green Undergarment',
    type: 'object',
    description: 'Green dress or undergarment representing growth, nature, and Venus energy',
    meanings: ['natural law', 'growth through justice', 'Venus influence', 'harmony', 'fertile justice'],
    traditions: ['Color symbolism', 'Natural law', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'secondary' }
    ]
  },

  // Pillars
  {
    id: 'temple-pillars',
    label: 'Temple Pillars',
    type: 'architectural',
    description: 'Two pillars flanking Justice representing the temple of law and cosmic order',
    meanings: ['temple of law', 'cosmic order', 'divine justice', 'balanced support', 'structural righteousness'],
    traditions: ['Temple symbolism', 'Masonic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'background' }
    ]
  },

  // Veil or curtain
  {
    id: 'purple-veil',
    label: 'Purple Veil/Curtain',
    type: 'object',
    description: 'Purple hanging or veil behind Justice representing the mystery of divine law',
    meanings: ['divine mystery', 'hidden law', 'spiritual justice', 'cosmic order', 'veiled truth'],
    traditions: ['Temple symbolism', 'Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'background' }
    ]
  },

  // Posture and positioning
  {
    id: 'upright-posture',
    label: 'Upright Seated Posture',
    type: 'geometric',
    description: 'Perfectly upright, formal seated position demonstrating moral rectitude',
    meanings: ['moral rectitude', 'uprightness', 'proper bearing', 'dignity', 'unwavering stance'],
    traditions: ['Posture symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  {
    id: 'centered-position',
    label: 'Centered Position',
    type: 'geometric',
    description: 'Figure positioned exactly in center representing balance and impartiality',
    meanings: ['perfect balance', 'impartiality', 'centered judgment', 'equilibrium', 'fair positioning'],
    traditions: ['Balance symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  // Symbolic gestures
  {
    id: 'scales-raised',
    label: 'Scales Held High',
    type: 'geometric',
    description: 'Scales elevated and displayed openly representing transparent justice',
    meanings: ['transparent justice', 'open judgment', 'visible fairness', 'public accountability', 'elevated standards'],
    traditions: ['Justice symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  {
    id: 'sword-vertical',
    label: 'Vertical Sword Position',
    type: 'geometric',
    description: 'Sword held perfectly vertical representing absolute truth and unwavering justice',
    meanings: ['absolute truth', 'unwavering justice', 'spiritual axis', 'divine order', 'moral compass'],
    traditions: ['Truth symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  // Astrological correspondence
  {
    id: 'libra-correspondence',
    label: 'Libra Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Libra zodiac sign representing balance and harmony',
    meanings: ['balance', 'harmony', 'partnership', 'aesthetic sense', 'diplomatic nature', 'air element'],
    traditions: ['Astrological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  },

  // Eyes and vision
  {
    id: 'clear-eyes',
    label: 'Clear, Open Eyes',
    type: 'figure',
    description: 'Open eyes looking directly forward, representing clear sight and impartial observation',
    meanings: ['clear sight', 'impartial observation', 'seeing truth', 'vigilant justice', 'moral clarity'],
    traditions: ['Vision symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'secondary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-lamed',
    label: 'Hebrew Letter Lamed',
    type: 'number',
    description: 'Association with Hebrew letter Lamed meaning ox-goad or teaching',
    meanings: ['teaching', 'guidance', 'learning', 'instruction', 'moral education'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'secondary' }
    ]
  },

  // Overall composition
  {
    id: 'justice-composition',
    label: 'Justice Card Composition',
    type: 'geometric',
    description: 'Overall balanced composition showing perfect symmetry and divine order',
    meanings: ['perfect symmetry', 'divine order', 'cosmic justice', 'moral law', 'balanced judgment'],
    traditions: ['Sacred geometry', 'Divine order', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-11-justice', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const JUSTICE_CARD = justiceCardSymbols.find(s => s.id === 'card-11-justice')!;
export const SCALES_OF_JUSTICE = justiceCardSymbols.find(s => s.id === 'scales-of-justice')!;
export const UPRIGHT_SWORD = justiceCardSymbols.find(s => s.id === 'upright-sword')!;
export const SQUARE_CROWN = justiceCardSymbols.find(s => s.id === 'square-crown')!;