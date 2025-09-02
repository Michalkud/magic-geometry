/**
 * The Hanged Man Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const hangedManCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-12-the-hanged-man',
    label: 'The Hanged Man Card',
    type: 'card',
    description: 'The Hanged Man Major Arcana card representing suspension, sacrifice, and new perspective',
    meanings: ['suspension', 'sacrifice', 'new perspective', 'surrender', 'letting go', 'spiritual awakening'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'hanged-figure',
    label: 'The Hanged Man Figure',
    type: 'figure',
    description: 'Young man suspended upside down by one foot, representing willing sacrifice and new viewpoint',
    meanings: ['willing sacrifice', 'new viewpoint', 'surrender', 'suspension', 'martyrdom', 'enlightenment through sacrifice'],
    traditions: ['Norse Odin myth', 'Christian sacrifice', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  // The Tree or Gibbet
  {
    id: 'tau-cross-tree',
    label: 'Tau Cross Tree/Gibbet',
    type: 'architectural',
    description: 'T-shaped wooden structure from which the man hangs, representing the Tau cross',
    meanings: ['Tau cross', 'sacrifice tree', 'world tree', 'axis mundi', 'gallows of enlightenment'],
    traditions: ['Christian Tau', 'Norse Yggdrasil', 'World tree', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  {
    id: 'living-tree-growth',
    label: 'Living Tree Growth',
    type: 'plant',
    description: 'Green growth or leaves sprouting from the wooden structure, showing life within death',
    meanings: ['life within death', 'renewal', 'resurrection', 'eternal life', 'spring from sacrifice'],
    traditions: ['Tree of life', 'Christian resurrection', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'secondary' }
    ]
  },

  // Suspension and positioning
  {
    id: 'right-foot-bound',
    label: 'Right Foot Bound',
    type: 'geometric',
    description: 'Right foot bound to the tree with rope, representing voluntary limitation',
    meanings: ['voluntary limitation', 'chosen restraint', 'self-imposed restriction', 'willing bondage', 'conscious sacrifice'],
    traditions: ['Sacrifice symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  {
    id: 'left-leg-bent',
    label: 'Left Leg Bent Behind',
    type: 'geometric',
    description: 'Left leg bent behind right leg forming number 4 or cross shape',
    meanings: ['number four', 'cross formation', 'stability in suspension', 'material world transcended'],
    traditions: ['Numerology', 'Cross symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  {
    id: 'inverted-position',
    label: 'Inverted Body Position',
    type: 'geometric',
    description: 'Complete inversion of normal upright position representing reversed perspective',
    meanings: ['reversed perspective', 'upside-down world', 'different viewpoint', 'opposite way', 'inverted values'],
    traditions: ['Perspective symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  // Arms and hand position
  {
    id: 'arms-behind-back',
    label: 'Arms Behind Back',
    type: 'geometric',
    description: 'Arms positioned behind back, possibly bound, representing surrender of control',
    meanings: ['surrender of control', 'giving up struggle', 'acceptance', 'non-resistance', 'submission to higher will'],
    traditions: ['Surrender symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  {
    id: 'triangle-arms-torso',
    label: 'Triangle Formed by Arms and Torso',
    type: 'geometric',
    description: 'Triangular shape created by arms and torso representing fire element inverted',
    meanings: ['inverted fire triangle', 'water element', 'descending spirit', 'spiritual descent', 'passive fire'],
    traditions: ['Elemental symbolism', 'Alchemical', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'secondary' }
    ]
  },

  // Facial expression and demeanor
  {
    id: 'serene-expression',
    label: 'Serene, Peaceful Expression',
    type: 'figure',
    description: 'Calm, peaceful facial expression showing acceptance rather than suffering',
    meanings: ['inner peace', 'acceptance', 'enlightenment', 'transcendence', 'spiritual serenity'],
    traditions: ['Buddha-like serenity', 'Christian martyrdom', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'secondary' }
    ]
  },

  // Halo or aura
  {
    id: 'golden-halo',
    label: 'Golden Halo/Nimbus',
    type: 'celestial',
    description: 'Golden halo or light around the head representing enlightenment and sanctity',
    meanings: ['enlightenment', 'sanctity', 'divine illumination', 'spiritual attainment', 'holy radiance'],
    traditions: ['Christian halos', 'Buddhist nimbus', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  // Clothing
  {
    id: 'blue-tunic',
    label: 'Blue Tunic',
    type: 'object',
    description: 'Blue upper garment representing spiritual truth and devotion',
    meanings: ['spiritual truth', 'devotion', 'higher knowledge', 'peace', 'spiritual dedication'],
    traditions: ['Color symbolism', 'Religious vestments', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  {
    id: 'red-leggings',
    label: 'Red Leggings/Breeches',
    type: 'object',
    description: 'Red lower garments representing passion and life force controlled',
    meanings: ['controlled passion', 'life force', 'active principle restrained', 'material desires suspended'],
    traditions: ['Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'secondary' }
    ]
  },

  {
    id: 'yellow-shoes',
    label: 'Yellow Shoes/Boots',
    type: 'object',
    description: 'Yellow footwear representing understanding and intellectual illumination',
    meanings: ['understanding', 'intellectual illumination', 'golden wisdom', 'enlightened path', 'spiritual foundation'],
    traditions: ['Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'secondary' }
    ]
  },

  // Hair
  {
    id: 'flowing-hair',
    label: 'Hair Flowing Downward',
    type: 'figure',
    description: 'Hair hanging downward due to inverted position, emphasizing the reversal',
    meanings: ['natural response to inversion', 'emphasis on reversal', 'letting go', 'natural flow', 'surrender to gravity'],
    traditions: ['Natural symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'secondary' }
    ]
  },

  // Background elements
  {
    id: 'neutral-background',
    label: 'Neutral Sky Background',
    type: 'element',
    description: 'Plain, neutral sky background focusing attention on the suspended figure',
    meanings: ['focus on sacrifice', 'void', 'emptiness', 'suspension in time', 'neutral space'],
    traditions: ['Minimalist symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'background' }
    ]
  },

  // Water correspondence
  {
    id: 'water-element-correspondence',
    label: 'Water Element Correspondence',
    type: 'element',
    description: 'Card\'s elemental correspondence to water through Neptune planetary rulership',
    meanings: ['emotional depths', 'subconscious', 'sacrifice', 'letting go', 'dissolution', 'spiritual baptism'],
    traditions: ['Elemental', 'Astrological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-mem',
    label: 'Hebrew Letter Mem',
    type: 'number',
    description: 'Association with Hebrew letter Mem representing water and maternal principle',
    meanings: ['water element', 'maternal principle', 'womb', 'birth through sacrifice', 'flowing wisdom'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'secondary' }
    ]
  },

  // Mythological connections
  {
    id: 'odin-sacrifice',
    label: 'Odin\'s Sacrifice Reference',
    type: 'geometric',
    description: 'Connection to Odin hanging from Yggdrasil to gain wisdom',
    meanings: ['wisdom through sacrifice', 'shamanic initiation', 'hanging god', 'self-sacrifice for knowledge', 'divine ordeal'],
    traditions: ['Norse mythology', 'Shamanic', 'Comparative mythology', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  // Rope or binding
  {
    id: 'binding-rope',
    label: 'Rope or Cord Binding',
    type: 'object',
    description: 'Rope or cord securing the foot to the tree, representing chosen limitation',
    meanings: ['chosen limitation', 'self-imposed bondage', 'voluntary restriction', 'spiritual discipline', 'conscious constraint'],
    traditions: ['Bondage symbolism', 'Ascetic practices', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  // Time suspension
  {
    id: 'time-suspension',
    label: 'Suspended in Time',
    type: 'geometric',
    description: 'Overall sense of being suspended between moments, outside normal time flow',
    meanings: ['timeless moment', 'eternal now', 'suspension of time', 'pause for reflection', 'liminal state'],
    traditions: ['Temporal symbolism', 'Mystical experience', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'hanged-man-composition',
    label: 'Hanged Man Composition',
    type: 'geometric',
    description: 'Overall composition showing willing sacrifice leading to enlightenment',
    meanings: ['willing sacrifice', 'enlightenment through surrender', 'spiritual transformation', 'new perspective', 'redemptive suffering'],
    traditions: ['Sacrifice mythology', 'Spiritual transformation', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-12-the-hanged-man', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const HANGED_MAN_CARD = hangedManCardSymbols.find(s => s.id === 'card-12-the-hanged-man')!;
export const HANGED_FIGURE = hangedManCardSymbols.find(s => s.id === 'hanged-figure')!;
export const TAU_CROSS_TREE = hangedManCardSymbols.find(s => s.id === 'tau-cross-tree')!;
export const GOLDEN_HALO = hangedManCardSymbols.find(s => s.id === 'golden-halo')!;