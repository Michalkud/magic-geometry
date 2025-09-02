/**
 * The Chariot Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const chariotCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-07-the-chariot',
    label: 'The Chariot Card',
    type: 'card',
    description: 'The Chariot Major Arcana card representing willpower, determination, and triumph over obstacles',
    meanings: ['willpower', 'determination', 'triumph', 'control', 'victory', 'forward movement', 'success'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'primary' }
    ]
  },

  // Main figure - The Charioteer
  {
    id: 'charioteer-figure',
    label: 'The Charioteer',
    type: 'figure',
    description: 'Victorious prince or warrior standing erect in chariot, representing mastery and control',
    meanings: ['victory', 'mastery', 'control', 'leadership', 'triumph', 'determination', 'willpower'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'primary' }
    ]
  },

  // Crown and regalia
  {
    id: 'star-crown',
    label: 'Star Crown',
    type: 'object',
    description: 'Crown adorned with stars representing cosmic consciousness and divine authority',
    meanings: ['cosmic consciousness', 'divine authority', 'stellar wisdom', 'celestial connection', 'spiritual victory'],
    traditions: ['Astrological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'primary' }
    ]
  },

  // Armor and protection
  {
    id: 'square-breastplate',
    label: 'Square Breastplate',
    type: 'object',
    description: 'Square armor on chest representing the four elements and earthly protection',
    meanings: ['four elements', 'earthly protection', 'material mastery', 'balanced foundation', 'stability'],
    traditions: ['Elemental symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'primary' }
    ]
  },

  {
    id: 'crescent-moons-shoulders',
    label: 'Crescent Moons on Shoulders',
    type: 'celestial',
    description: 'Crescent moon symbols on shoulder armor representing lunar energy and intuitive wisdom',
    meanings: ['lunar energy', 'intuitive wisdom', 'feminine principle', 'receptive power', 'psychic protection'],
    traditions: ['Lunar symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'secondary' }
    ]
  },

  // Victory symbols
  {
    id: 'victory-wreath',
    label: 'Victory Wreath',
    type: 'plant',
    description: 'Laurel wreath or victory garland representing triumph and achievement',
    meanings: ['victory', 'triumph', 'achievement', 'success', 'honor', 'glory'],
    traditions: ['Classical', 'Roman', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'secondary' }
    ]
  },

  // The Chariot vehicle
  {
    id: 'war-chariot',
    label: 'War Chariot',
    type: 'object',
    description: 'Ornate chariot representing the vehicle of will and means of spiritual progress',
    meanings: ['vehicle of will', 'spiritual progress', 'controlled movement', 'directed energy', 'purposeful action'],
    traditions: ['Military', 'Spiritual allegory', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'primary' }
    ]
  },

  {
    id: 'starry-canopy',
    label: 'Starry Canopy',
    type: 'celestial',
    description: 'Star-studded canopy over the chariot representing cosmic protection and celestial guidance',
    meanings: ['cosmic protection', 'celestial guidance', 'stellar influence', 'divine shelter', 'heavenly blessing'],
    traditions: ['Astrological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'primary' }
    ]
  },

  {
    id: 'winged-sun-disk',
    label: 'Winged Sun Disk',
    type: 'celestial',
    description: 'Winged solar disk on the front of the chariot representing divine protection and solar power',
    meanings: ['divine protection', 'solar power', 'enlightenment', 'victory of light', 'spiritual triumph'],
    traditions: ['Egyptian', 'Solar symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'secondary' }
    ]
  },

  // The Sphinxes
  {
    id: 'black-sphinx',
    label: 'Black Sphinx',
    type: 'animal',
    description: 'Black sphinx representing negative forces, obstacles, and the unconscious that must be controlled',
    meanings: ['negative forces', 'unconscious mind', 'obstacles', 'shadow self', 'material challenges'],
    traditions: ['Egyptian', 'Psychological', 'Alchemical', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'primary' }
    ]
  },

  {
    id: 'white-sphinx',
    label: 'White Sphinx',
    type: 'animal',
    description: 'White sphinx representing positive forces, consciousness, and spiritual aspiration',
    meanings: ['positive forces', 'conscious mind', 'spiritual aspiration', 'higher self', 'divine guidance'],
    traditions: ['Egyptian', 'Psychological', 'Alchemical', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'primary' }
    ]
  },

  // Landscape and background
  {
    id: 'fortified-city',
    label: 'Fortified City',
    type: 'architectural',
    description: 'Walled city in background representing civilization, achievement, and protected realm',
    meanings: ['civilization', 'achievement', 'protection', 'established order', 'conquered territory'],
    traditions: ['Military', 'Architectural', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'background' }
    ]
  },

  {
    id: 'city-towers',
    label: 'City Towers',
    type: 'architectural',
    description: 'Defensive towers of the city representing strength, vigilance, and protective power',
    meanings: ['strength', 'vigilance', 'protection', 'defensive power', 'established authority'],
    traditions: ['Military architecture', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'background' }
    ]
  },

  {
    id: 'moat-water',
    label: 'Moat or River',
    type: 'element',
    description: 'Water around the city representing emotional boundaries and protective barriers',
    meanings: ['emotional boundaries', 'protective barriers', 'flowing energy', 'life force', 'cleansing'],
    traditions: ['Military architecture', 'Elemental', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'background' }
    ]
  },

  // Weapons and implements
  {
    id: 'drawn-sword',
    label: 'Drawn Sword',
    type: 'object',
    description: 'Sword held by the charioteer representing cutting through obstacles and decisive action',
    meanings: ['decisive action', 'cutting through obstacles', 'mental clarity', 'discrimination', 'spiritual weapon'],
    traditions: ['Military', 'Elemental (Air)', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'secondary' }
    ]
  },

  // Sacred symbols
  {
    id: 'masonic-symbol',
    label: 'Coat of Arms (Masonic Symbol)',
    type: 'geometric',
    description: 'Coat of arms on chariot representing self-control and masonic symbolism',
    meanings: ['self-control', 'masonic wisdom', 'inner mastery', 'spiritual discipline', 'occult knowledge'],
    traditions: ['Masonic', 'Occult', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'secondary' }
    ]
  },

  // Belt and regalia details
  {
    id: 'ceremonial-belt',
    label: 'Ceremonial Belt',
    type: 'object',
    description: 'Ornate belt representing containment of power and disciplined energy',
    meanings: ['contained power', 'disciplined energy', 'self-mastery', 'controlled force', 'spiritual girding'],
    traditions: ['Ceremonial magic', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'secondary' }
    ]
  },

  {
    id: 'magical-amulet',
    label: 'Magical Amulet',
    type: 'object',
    description: 'Protective amulet worn by the charioteer representing magical protection and spiritual power',
    meanings: ['magical protection', 'spiritual power', 'divine favor', 'occult knowledge', 'esoteric wisdom'],
    traditions: ['Magical', 'Protective', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'secondary' }
    ]
  },

  // Overall symbolic composition
  {
    id: 'triumph-composition',
    label: 'Triumphal Scene Composition',
    type: 'geometric',
    description: 'Overall composition showing mastery over opposing forces through willpower and determination',
    meanings: ['mastery over opposites', 'willpower triumph', 'conscious control', 'victory through effort', 'spiritual achievement'],
    traditions: ['Psychological', 'Spiritual allegory', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-07-the-chariot', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const CHARIOT_CARD = chariotCardSymbols.find(s => s.id === 'card-07-the-chariot')!;
export const BLACK_SPHINX = chariotCardSymbols.find(s => s.id === 'black-sphinx')!;
export const WHITE_SPHINX = chariotCardSymbols.find(s => s.id === 'white-sphinx')!;
export const STAR_CROWN = chariotCardSymbols.find(s => s.id === 'star-crown')!;