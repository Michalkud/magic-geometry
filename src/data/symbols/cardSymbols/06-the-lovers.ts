/**
 * The Lovers Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const loversCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-06-the-lovers',
    label: 'The Lovers Card',
    type: 'card',
    description: 'The Lovers Major Arcana card representing love, relationships, choices, and divine union',
    meanings: ['love', 'relationships', 'choices', 'divine union', 'harmony', 'partnership', 'moral decision'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille', 'Christian'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  // Divine figure
  {
    id: 'angel-raphael',
    label: 'Angel Raphael',
    type: 'figure',
    description: 'Archangel Raphael hovering above the couple with outstretched wings, representing divine blessing and guidance',
    meanings: ['divine blessing', 'spiritual guidance', 'healing', 'divine love', 'higher consciousness', 'angelic protection'],
    traditions: ['Christian', 'Jewish', 'Islamic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  {
    id: 'raphael-wings',
    label: 'Angel\'s Outstretched Wings',
    type: 'geometric',
    description: 'Large purple and red wings of Raphael spreading protection over the lovers',
    meanings: ['divine protection', 'spiritual shelter', 'angelic presence', 'higher love', 'transcendence'],
    traditions: ['Christian angelology', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  // Human figures
  {
    id: 'adam-figure',
    label: 'Adam (Male Figure)',
    type: 'figure',
    description: 'Naked man representing Adam, the masculine principle, conscious mind, and solar energy',
    meanings: ['masculine principle', 'conscious mind', 'solar energy', 'active force', 'rational thought', 'Adam archetype'],
    traditions: ['Biblical', 'Alchemical', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  {
    id: 'eve-figure',
    label: 'Eve (Female Figure)',
    type: 'figure',
    description: 'Naked woman representing Eve, the feminine principle, subconscious mind, and lunar energy',
    meanings: ['feminine principle', 'subconscious mind', 'lunar energy', 'receptive force', 'intuitive wisdom', 'Eve archetype'],
    traditions: ['Biblical', 'Alchemical', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  // Sacred trees
  {
    id: 'tree-of-knowledge',
    label: 'Tree of Knowledge',
    type: 'plant',
    description: 'Tree behind Eve bearing fruit and entwined with serpent, representing knowledge of good and evil',
    meanings: ['knowledge of good and evil', 'temptation', 'moral choice', 'consciousness', 'duality', 'wisdom through experience'],
    traditions: ['Biblical', 'Kabbalistic', 'Gnostic', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  {
    id: 'tree-of-life',
    label: 'Tree of Life',
    type: 'plant',
    description: 'Tree behind Adam with twelve flames representing the twelve zodiacal signs and eternal life',
    meanings: ['eternal life', 'zodiacal forces', 'spiritual fire', 'divine spark', 'immortality', 'cosmic consciousness'],
    traditions: ['Kabbalistic', 'Astrological', 'Biblical', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  {
    id: 'twelve-flames',
    label: 'Twelve Flames on Tree',
    type: 'celestial',
    description: 'Twelve flame-like fruits on the Tree of Life representing the twelve signs of the zodiac',
    meanings: ['twelve zodiac signs', 'cosmic forces', 'astrological influences', 'divine fire', 'spiritual energy'],
    traditions: ['Astrological', 'Kabbalistic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'secondary' }
    ]
  },

  // The serpent and temptation
  {
    id: 'serpent-on-tree',
    label: 'Serpent on Tree of Knowledge',
    type: 'animal',
    description: 'Serpent coiled around the Tree of Knowledge, representing temptation and wisdom',
    meanings: ['temptation', 'wisdom', 'kundalini energy', 'sexual energy', 'knowledge', 'transformation'],
    traditions: ['Biblical', 'Gnostic', 'Alchemical', 'Kundalini', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  // Fruits and symbols of knowledge
  {
    id: 'forbidden-fruit',
    label: 'Forbidden Fruit',
    type: 'plant',
    description: 'Apple or fruit on the Tree of Knowledge representing the choice between good and evil',
    meanings: ['moral choice', 'forbidden knowledge', 'temptation', 'consequences of choice', 'free will'],
    traditions: ['Biblical', 'Christian', 'Gnostic', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'secondary' }
    ]
  },

  // Celestial elements
  {
    id: 'bright-sun',
    label: 'Bright Sun',
    type: 'celestial',
    description: 'Radiant sun shining from above, representing divine illumination and conscious awareness',
    meanings: ['divine illumination', 'consciousness', 'clarity', 'divine love', 'spiritual light', 'enlightenment'],
    traditions: ['Solar symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'background' }
    ]
  },

  {
    id: 'golden-rays',
    label: 'Golden Rays from Sun',
    type: 'celestial',
    description: 'Golden rays emanating from the sun, blessing the scene with divine light',
    meanings: ['divine blessing', 'spiritual illumination', 'golden consciousness', 'divine grace', 'enlightenment'],
    traditions: ['Solar symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'background' }
    ]
  },

  // Landscape elements
  {
    id: 'garden-of-eden',
    label: 'Garden of Eden Setting',
    type: 'element',
    description: 'Paradisiacal garden setting representing innocence, perfection, and divine creation',
    meanings: ['paradise', 'innocence', 'perfection', 'divine creation', 'natural harmony', 'pure love'],
    traditions: ['Biblical', 'Christian', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'background' }
    ]
  },

  {
    id: 'distant-mountain',
    label: 'Distant Mountain',
    type: 'architectural',
    description: 'Mountain peak in the background representing spiritual aspirations and higher consciousness',
    meanings: ['spiritual aspiration', 'higher consciousness', 'divine heights', 'spiritual goal', 'transcendence'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'background' }
    ]
  },

  {
    id: 'white-clouds',
    label: 'White Clouds',
    type: 'element',
    description: 'Pure white clouds representing spiritual purity and divine atmosphere',
    meanings: ['spiritual purity', 'divine atmosphere', 'heavenly realm', 'ethereal beauty', 'spiritual elevation'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'background' }
    ]
  },

  // Symbolic relationships and positioning
  {
    id: 'divine-triangle',
    label: 'Divine Triangle Formation',
    type: 'geometric',
    description: 'Triangular composition with angel above and two humans below, representing divine-human relationship',
    meanings: ['divine-human relationship', 'trinity', 'spiritual hierarchy', 'divine guidance', 'sacred geometry'],
    traditions: ['Sacred geometry', 'Christian trinity', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  {
    id: 'choice-symbolism',
    label: 'Symbolic Choice Scene',
    type: 'geometric',
    description: 'The entire scene representing the fundamental choice between spiritual and material paths',
    meanings: ['moral choice', 'spiritual vs material', 'free will', 'consequence', 'ethical decision', 'path selection'],
    traditions: ['Christian morality', 'Philosophical', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'primary' }
    ]
  },

  // Additional symbolic elements
  {
    id: 'nakedness-purity',
    label: 'Natural Nakedness',
    type: 'geometric',
    description: 'The naked state of Adam and Eve representing innocence, truth, and natural purity',
    meanings: ['innocence', 'natural truth', 'vulnerability', 'authentic self', 'spiritual nakedness', 'pure essence'],
    traditions: ['Biblical', 'Natural philosophy', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-06-the-lovers', prominence: 'secondary' }
    ]
  }
];

// Export individual symbols for easy access
export const LOVERS_CARD = loversCardSymbols.find(s => s.id === 'card-06-the-lovers')!;
export const ANGEL_RAPHAEL = loversCardSymbols.find(s => s.id === 'angel-raphael')!;
export const TREE_OF_KNOWLEDGE = loversCardSymbols.find(s => s.id === 'tree-of-knowledge')!;
export const TREE_OF_LIFE = loversCardSymbols.find(s => s.id === 'tree-of-life')!;