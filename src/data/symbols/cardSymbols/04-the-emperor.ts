/**
 * The Emperor Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const emperorCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-04-the-emperor',
    label: 'The Emperor Card',
    type: 'card',
    description: 'The Emperor Major Arcana card representing authority, structure, and masculine power',
    meanings: ['authority', 'structure', 'control', 'father figure', 'leadership', 'masculine energy'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'emperor-figure',
    label: 'The Emperor',
    type: 'figure',
    description: 'Commanding, stately crowned monarch seated on throne, embodying worldly power and authority',
    meanings: ['masculine authority', 'father archetype', 'worldly power', 'executive force', 'virile power'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'primary' }
    ]
  },

  // Throne and regalia
  {
    id: 'emperor-throne',
    label: 'Stone Throne',
    type: 'architectural',
    description: 'Large stone throne, occasionally represented as cubic stone, symbolizing earthly foundation',
    meanings: ['earthly foundation', 'stability', 'material power', 'grounded authority'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'primary' }
    ]
  },

  {
    id: 'ram-heads-throne',
    label: 'Ram Heads on Throne',
    type: 'animal',
    description: 'Four ram heads decorating the arms and corners of the throne, representing Aries energy',
    meanings: ['Aries symbol', 'Mars energy', 'masculine force', 'leadership', 'initiative', 'conquest'],
    traditions: ['Astrological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'primary' }
    ]
  },

  {
    id: 'emperor-crown',
    label: 'Emperor\'s Crown',
    type: 'object',
    description: 'Royal crown representing divine right to rule and temporal authority',
    meanings: ['divine authority', 'kingship', 'temporal power', 'sovereignty', 'ruling class'],
    traditions: ['Royal symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'primary' }
    ]
  },

  // Clothing and armor
  {
    id: 'red-robe',
    label: 'Red Robe',
    type: 'object',
    description: 'Rich red outer robe representing passion, power, and life force energy',
    meanings: ['passion', 'power', 'energy', 'life force', 'active principle', 'fire element'],
    traditions: ['Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'primary' }
    ]
  },

  {
    id: 'armor-underneath',
    label: 'Armor Beneath Robe',
    type: 'object',
    description: 'Suit of armor worn underneath the robe, representing protection and readiness for battle',
    meanings: ['protection', 'military might', 'readiness for conflict', 'defensive strength', 'warrior aspect'],
    traditions: ['Military symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'secondary' }
    ]
  },

  // Sacred objects held
  {
    id: 'ankh-scepter',
    label: 'Ankh Scepter',
    type: 'object',
    description: 'Scepter in the shape of a Crux ansata (ankh), representing eternal life and divine power',
    meanings: ['eternal life', 'divine power', 'key of life', 'Egyptian wisdom', 'spiritual authority'],
    traditions: ['Egyptian', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'primary' }
    ]
  },

  {
    id: 'emperor-orb',
    label: 'Imperial Orb',
    type: 'object',
    description: 'Globe held in left hand representing dominion over the world and earthly realm',
    meanings: ['worldly dominion', 'earthly power', 'material realm', 'global authority', 'temporal rule'],
    traditions: ['Royal regalia', 'Christian', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'primary' }
    ]
  },

  // Background landscape
  {
    id: 'barren-mountains',
    label: 'Barren Mountains',
    type: 'architectural',
    description: 'Stark, barren mountain range in background representing harsh realities and challenges',
    meanings: ['harsh realities', 'obstacles to overcome', 'stern discipline', 'unforgiving nature', 'tests of strength'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'background' }
    ]
  },

  {
    id: 'winding-river',
    label: 'Winding River',
    type: 'element',
    description: 'River flowing through the landscape, representing life force and emotional undercurrent',
    meanings: ['life force', 'emotional depth', 'hidden feelings', 'flow of life', 'continuity'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'background' }
    ]
  },

  {
    id: 'orange-red-sky',
    label: 'Orange-Red Sky',
    type: 'color',
    description: 'Warm orange-red sky representing Mars energy and fiery temperament',
    meanings: ['Mars energy', 'fiery temperament', 'passion', 'active principle', 'masculine energy'],
    traditions: ['Astrological', 'Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'background' }
    ]
  },

  // Symbolic positioning and gestures
  {
    id: 'seated-position',
    label: 'Seated Authoritative Position',
    type: 'geometric',
    description: 'Upright, commanding seated posture demonstrating authority and control',
    meanings: ['authority', 'control', 'stability', 'grounded power', 'established rule'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'primary' }
    ]
  },

  {
    id: 'commanding-gaze',
    label: 'Commanding Gaze',
    type: 'geometric',
    description: 'Direct, authoritative gaze expressing dominance and control',
    meanings: ['dominance', 'control', 'watchfulness', 'authority', 'judgment'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'secondary' }
    ]
  },

  // Additional symbolic elements
  {
    id: 'cubic-foundation',
    label: 'Cubic Foundation',
    type: 'geometric',
    description: 'Square/cubic foundation of throne representing material world and four elements',
    meanings: ['material foundation', 'four elements', 'earthly realm', 'stability', 'physical manifestation'],
    traditions: ['Geometric symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'background' }
    ]
  },

  {
    id: 'right-angle-positioning',
    label: 'Right-Angled Positioning',
    type: 'geometric',
    description: 'Formal, rigid positioning emphasizing structure and order',
    meanings: ['structure', 'order', 'discipline', 'formal authority', 'rigid control'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'secondary' }
    ]
  },

  // Beard and masculine features
  {
    id: 'full-beard',
    label: 'Full Beard',
    type: 'figure',
    description: 'Long, full beard representing wisdom, maturity, and masculine authority',
    meanings: ['wisdom', 'maturity', 'masculine authority', 'patriarchal power', 'experience'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-04-the-emperor', prominence: 'secondary' }
    ]
  }
];

// Export individual symbols for easy access
export const EMPEROR_CARD = emperorCardSymbols.find(s => s.id === 'card-04-the-emperor')!;
export const ANKH_SCEPTER = emperorCardSymbols.find(s => s.id === 'ankh-scepter')!;
export const RAM_HEADS = emperorCardSymbols.find(s => s.id === 'ram-heads-throne')!;
export const IMPERIAL_ORB = emperorCardSymbols.find(s => s.id === 'emperor-orb')!;