/**
 * Wheel of Fortune Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const wheelOfFortuneCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-10-wheel-of-fortune',
    label: 'Wheel of Fortune Card',
    type: 'card',
    description: 'Wheel of Fortune Major Arcana card representing cycles, fate, and karmic turning points',
    meanings: ['cycles', 'fate', 'destiny', 'karma', 'change', 'fortune', 'turning point'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  // The central wheel
  {
    id: 'fortune-wheel',
    label: 'The Wheel of Fortune',
    type: 'geometric',
    description: 'Large central wheel with eight spokes representing the cycles of existence and cosmic order',
    meanings: ['cycles of existence', 'cosmic order', 'fate', 'eternal return', 'wheel of life'],
    traditions: ['Buddhist', 'Hindu', 'Medieval', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  {
    id: 'eight-spokes',
    label: 'Eight Spokes of Wheel',
    type: 'geometric',
    description: 'Eight spokes dividing the wheel representing the eightfold path and cosmic directions',
    meanings: ['eightfold path', 'cosmic directions', 'completeness', 'cycles', 'dharma wheel'],
    traditions: ['Buddhist', 'Directional symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  // Hebrew letters on wheel
  {
    id: 'yhvh-letters',
    label: 'YHVH Hebrew Letters',
    type: 'number',
    description: 'Hebrew letters Yod-Heh-Vau-Heh around the wheel representing the divine name',
    meanings: ['divine name', 'tetragrammaton', 'divine presence', 'cosmic law', 'sacred word'],
    traditions: ['Kabbalistic', 'Hebrew', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  {
    id: 'taro-tora-letters',
    label: 'TARO/TORA Letter Arrangement',
    type: 'number',
    description: 'Letters spelling TARO or TORA (Torah/Tarot) alternating with Hebrew letters',
    meanings: ['tarot wisdom', 'torah teaching', 'divine law', 'cosmic instruction', 'sacred knowledge'],
    traditions: ['Kabbalistic', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  // Alchemical symbols
  {
    id: 'mercury-symbol',
    label: 'Mercury Alchemical Symbol',
    type: 'geometric',
    description: 'Mercury symbol on wheel representing communication and transformation',
    meanings: ['communication', 'transformation', 'messenger', 'quick change', 'mental agility'],
    traditions: ['Alchemical', 'Planetary', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  {
    id: 'sulfur-symbol',
    label: 'Sulfur Alchemical Symbol',
    type: 'geometric',
    description: 'Sulfur symbol on wheel representing the soul and spiritual fire',
    meanings: ['soul principle', 'spiritual fire', 'active principle', 'consciousness', 'transformation'],
    traditions: ['Alchemical', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  {
    id: 'salt-symbol',
    label: 'Salt Alchemical Symbol',
    type: 'geometric',
    description: 'Salt symbol on wheel representing the body and material foundation',
    meanings: ['body principle', 'material foundation', 'passive principle', 'stability', 'earth element'],
    traditions: ['Alchemical', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  // Creatures around the wheel
  {
    id: 'sphinx-top',
    label: 'Sphinx at Top of Wheel',
    type: 'animal',
    description: 'Sphinx with sword at top of wheel representing riddle of existence and divine knowledge',
    meanings: ['divine knowledge', 'riddle of existence', 'sphinx wisdom', 'guardian of mysteries', 'equilibrium'],
    traditions: ['Egyptian', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  {
    id: 'sphinx-sword',
    label: 'Sphinx\'s Sword',
    type: 'object',
    description: 'Sword held by sphinx representing discrimination and cutting through illusion',
    meanings: ['discrimination', 'cutting illusion', 'divine justice', 'mental clarity', 'sword of wisdom'],
    traditions: ['Elemental Air', 'Egyptian', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  {
    id: 'anubis-ascending',
    label: 'Anubis Ascending (Right Side)',
    type: 'figure',
    description: 'Anubis or jackal-headed figure ascending on right side representing rising fortune',
    meanings: ['rising fortune', 'ascension', 'growth', 'positive cycle', 'divine guidance'],
    traditions: ['Egyptian', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  {
    id: 'typhon-descending',
    label: 'Typhon Descending (Left Side)',
    type: 'figure',
    description: 'Typhon or serpent figure descending on left side representing declining fortune',
    meanings: ['declining fortune', 'descent', 'negative cycle', 'destruction', 'chaos'],
    traditions: ['Egyptian', 'Mythological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  // Four corner figures (Evangelists/Fixed Signs)
  {
    id: 'angel-aquarius',
    label: 'Angel (Aquarius) - Top Left',
    type: 'figure',
    description: 'Winged angel in top left corner representing Aquarius and air element',
    meanings: ['Aquarius', 'air element', 'divine messenger', 'intellectual principle', 'fixed air'],
    traditions: ['Astrological', 'Evangelical', 'Elemental', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  {
    id: 'eagle-scorpio',
    label: 'Eagle (Scorpio) - Top Right',
    type: 'animal',
    description: 'Eagle in top right corner representing Scorpio and water element',
    meanings: ['Scorpio', 'water element', 'transformation', 'death and rebirth', 'fixed water'],
    traditions: ['Astrological', 'Evangelical', 'Elemental', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  {
    id: 'lion-leo',
    label: 'Lion (Leo) - Bottom Right',
    type: 'animal',
    description: 'Lion in bottom right corner representing Leo and fire element',
    meanings: ['Leo', 'fire element', 'solar power', 'strength', 'fixed fire'],
    traditions: ['Astrological', 'Evangelical', 'Elemental', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  {
    id: 'bull-taurus',
    label: 'Bull (Taurus) - Bottom Left',
    type: 'animal',
    description: 'Bull in bottom left corner representing Taurus and earth element',
    meanings: ['Taurus', 'earth element', 'material stability', 'persistence', 'fixed earth'],
    traditions: ['Astrological', 'Evangelical', 'Elemental', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  // Books held by corner figures
  {
    id: 'sacred-books',
    label: 'Sacred Books/Scrolls',
    type: 'object',
    description: 'Books or scrolls held by the four corner figures representing divine knowledge',
    meanings: ['divine knowledge', 'sacred wisdom', 'eternal teachings', 'cosmic law', 'akashic records'],
    traditions: ['Evangelical', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  // Background and setting
  {
    id: 'clouded-sky',
    label: 'Clouded Sky Background',
    type: 'element',
    description: 'Cloudy sky background representing the veiled nature of destiny',
    meanings: ['veiled destiny', 'uncertainty', 'hidden forces', 'divine mystery', 'karmic clouds'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'background' }
    ]
  },

  {
    id: 'celestial-realm',
    label: 'Celestial Realm Setting',
    type: 'celestial',
    description: 'Elevated, celestial setting representing cosmic forces at work',
    meanings: ['cosmic forces', 'celestial influence', 'higher laws', 'divine realm', 'spiritual plane'],
    traditions: ['Cosmological', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'background' }
    ]
  },

  // Color symbolism
  {
    id: 'blue-wheel-rim',
    label: 'Blue Wheel Rim',
    type: 'color',
    description: 'Blue outer rim of wheel representing spiritual truth and divine wisdom',
    meanings: ['spiritual truth', 'divine wisdom', 'higher knowledge', 'celestial nature', 'eternal principles'],
    traditions: ['Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  // Jupiter correspondence
  {
    id: 'jupiter-correspondence',
    label: 'Jupiter Planetary Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Jupiter representing expansion and good fortune',
    meanings: ['expansion', 'good fortune', 'wisdom', 'abundance', 'benevolent influence'],
    traditions: ['Astrological', 'Planetary', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  // Symbolic meanings
  {
    id: 'rotation-motion',
    label: 'Wheel\'s Rotational Motion',
    type: 'geometric',
    description: 'Implied circular motion of the wheel representing eternal cycles',
    meanings: ['eternal cycles', 'perpetual motion', 'karmic wheel', 'wheel of samsara', 'cosmic rotation'],
    traditions: ['Hindu', 'Buddhist', 'Cyclical time', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  },

  {
    id: 'axis-mundi',
    label: 'Central Axis (Axis Mundi)',
    type: 'geometric',
    description: 'Central axis of wheel representing world axis and connection between realms',
    meanings: ['world axis', 'cosmic center', 'connection between realms', 'stability in change', 'divine pivot'],
    traditions: ['Shamanic', 'Cosmological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'secondary' }
    ]
  },

  // Overall composition
  {
    id: 'fortune-composition',
    label: 'Wheel of Fortune Composition',
    type: 'geometric',
    description: 'Overall mandala-like composition showing cosmic order and eternal cycles',
    meanings: ['cosmic order', 'eternal cycles', 'divine plan', 'karmic law', 'universal justice'],
    traditions: ['Mandala symbolism', 'Cosmic order', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-10-wheel-of-fortune', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const WHEEL_OF_FORTUNE_CARD = wheelOfFortuneCardSymbols.find(s => s.id === 'card-10-wheel-of-fortune')!;
export const FORTUNE_WHEEL = wheelOfFortuneCardSymbols.find(s => s.id === 'fortune-wheel')!;
export const SPHINX_TOP = wheelOfFortuneCardSymbols.find(s => s.id === 'sphinx-top')!;
export const YHVH_LETTERS = wheelOfFortuneCardSymbols.find(s => s.id === 'yhvh-letters')!;