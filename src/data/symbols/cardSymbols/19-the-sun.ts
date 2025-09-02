/**
 * The Sun Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const sunCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-19-the-sun',
    label: 'The Sun Card',
    type: 'card',
    description: 'The Sun Major Arcana card representing joy, success, vitality, and enlightenment',
    meanings: ['joy', 'success', 'vitality', 'enlightenment', 'happiness', 'achievement'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // The Sun itself
  {
    id: 'radiant-sun',
    label: 'Radiant Sun',
    type: 'celestial',
    description: 'Large bright sun with human face representing consciousness, vitality, and divine illumination',
    meanings: ['divine consciousness', 'life force', 'vitality', 'solar power', 'enlightenment'],
    traditions: ['Solar deities', 'Sun worship', 'Life principle', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  {
    id: 'sun-face',
    label: 'Benevolent Face in Sun',
    type: 'figure',
    description: 'Kind, smiling human face within the sun representing benevolent solar consciousness',
    meanings: ['benevolent consciousness', 'divine joy', 'loving awareness', 'paternal blessing', 'cosmic smile'],
    traditions: ['Anthropomorphic sun', 'Solar deity', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  {
    id: 'sun-rays',
    label: 'Alternating Straight and Wavy Rays',
    type: 'geometric',
    description: 'Rays emanating from sun in alternating straight and wavy patterns',
    meanings: ['solar energy', 'light emanation', 'dual manifestation', 'active/passive rays', 'cosmic radiation'],
    traditions: ['Solar symbolism', 'Light rays', 'Dual nature', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // The child
  {
    id: 'naked-child',
    label: 'Naked Child',
    type: 'figure',
    description: 'Innocent naked child representing pure consciousness, rebirth, and natural joy',
    meanings: ['innocent consciousness', 'rebirth', 'natural joy', 'pure spirit', 'child-like wonder'],
    traditions: ['Childhood innocence', 'Divine child', 'Natural state', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  {
    id: 'child-arms-outstretched',
    label: 'Child with Arms Outstretched',
    type: 'geometric',
    description: 'Child with arms spread wide representing openness, joy, and embracing life',
    meanings: ['openness to life', 'joyful embrace', 'welcoming gesture', 'expansive joy', 'receiving blessings'],
    traditions: ['Joy expression', 'Open gesture', 'Life embrace', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  {
    id: 'child-on-horse',
    label: 'Child Riding Horse',
    type: 'geometric',
    description: 'Child mounted on white horse representing mastery over animal nature through innocence',
    meanings: ['innocent mastery', 'natural control', 'effortless command', 'pure leadership', 'instinctive harmony'],
    traditions: ['Mastery symbolism', 'Natural leadership', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // The white horse
  {
    id: 'white-horse',
    label: 'White Horse',
    type: 'animal',
    description: 'Pure white horse representing purified animal nature and spiritual energy',
    meanings: ['purified nature', 'spiritual energy', 'noble instincts', 'white magic', 'pure power'],
    traditions: ['White horse symbolism', 'Purity', 'Solar horse', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  {
    id: 'horse-no-saddle-bridle',
    label: 'Horse Without Saddle or Bridle',
    type: 'geometric',
    description: 'Horse ridden bareback without restraints representing natural harmony and trust',
    meanings: ['natural harmony', 'trust', 'unforced cooperation', 'instinctive bond', 'effortless unity'],
    traditions: ['Natural horsemanship', 'Trust symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // The red banner/flag
  {
    id: 'red-banner',
    label: 'Red Banner/Flag',
    type: 'object',
    description: 'Red flag or banner held by child representing victory, triumph, and life force',
    meanings: ['victory banner', 'triumph', 'life force', 'achievement', 'celebratory flag'],
    traditions: ['Victory symbolism', 'Triumph banner', 'Life force', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  {
    id: 'banner-flying',
    label: 'Banner Flying in Wind',
    type: 'geometric',
    description: 'Banner flowing freely in the wind representing freedom and dynamic movement',
    meanings: ['freedom', 'dynamic movement', 'flowing energy', 'liberation', 'spirited expression'],
    traditions: ['Freedom symbolism', 'Dynamic energy', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'secondary' }
    ]
  },

  // The wall
  {
    id: 'low-garden-wall',
    label: 'Low Garden Wall',
    type: 'architectural',
    description: 'Low brick or stone wall representing boundaries that can be easily overcome',
    meanings: ['overcome boundaries', 'low obstacles', 'manageable barriers', 'garden protection', 'gentle limits'],
    traditions: ['Boundary symbolism', 'Garden walls', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'secondary' }
    ]
  },

  // Sunflowers
  {
    id: 'four-sunflowers',
    label: 'Four Large Sunflowers',
    type: 'plant',
    description: 'Four prominent sunflowers facing the sun representing devotion and solar worship',
    meanings: ['solar devotion', 'natural worship', 'four elements', 'life orientation', 'growth toward light'],
    traditions: ['Solar worship', 'Devotion symbolism', 'Four elements', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  {
    id: 'sunflower-faces',
    label: 'Sunflower Heads Turned to Sun',
    type: 'geometric',
    description: 'Sunflower heads all turned toward the sun representing natural devotion and heliotropism',
    meanings: ['natural devotion', 'following light', 'solar orientation', 'instinctive worship', 'seeking illumination'],
    traditions: ['Heliotropism', 'Natural devotion', 'Light seeking', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  {
    id: 'sunflower-petals',
    label: 'Bright Yellow Sunflower Petals',
    type: 'plant',
    description: 'Vibrant yellow petals radiating from flower centers like miniature suns',
    meanings: ['solar radiation', 'golden energy', 'natural joy', 'bright vitality', 'flowering light'],
    traditions: ['Solar symbolism', 'Golden energy', 'Joy expression', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'secondary' }
    ]
  },

  // Blue sky
  {
    id: 'clear-blue-sky',
    label: 'Clear Blue Sky',
    type: 'color',
    description: 'Brilliant clear blue sky representing clarity, peace, and spiritual height',
    meanings: ['mental clarity', 'spiritual peace', 'clear consciousness', 'heavenly realm', 'pure atmosphere'],
    traditions: ['Sky symbolism', 'Clarity representation', 'Peaceful sky', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'background' }
    ]
  },

  // Light and illumination
  {
    id: 'golden-light',
    label: 'Golden Light Everywhere',
    type: 'color',
    description: 'Pervasive golden light illuminating everything in the scene',
    meanings: ['divine illumination', 'golden consciousness', 'enlightenment', 'spiritual gold', 'cosmic light'],
    traditions: ['Divine light', 'Golden age', 'Enlightenment', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // Feather in child's hair
  {
    id: 'red-feather',
    label: 'Red Feather in Hair',
    type: 'object',
    description: 'Red feather adorning child\'s hair representing spiritual achievement and connection to air element',
    meanings: ['spiritual achievement', 'air element connection', 'flight capability', 'divine favor', 'elevated thoughts'],
    traditions: ['Feather symbolism', 'Spiritual achievement', 'Air element', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'secondary' }
    ]
  },

  // Shadow elements (absence thereof)
  {
    id: 'no-shadows',
    label: 'Absence of Shadows',
    type: 'geometric',
    description: 'Notable lack of shadows representing complete illumination and no hidden aspects',
    meanings: ['complete illumination', 'no hidden aspects', 'total revelation', 'perfect clarity', 'shadow integration'],
    traditions: ['Complete illumination', 'Shadow integration', 'Full revelation', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'secondary' }
    ]
  },

  // Leo/Sun correspondence
  {
    id: 'leo-solar-correspondence',
    label: 'Leo/Solar Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Sun and Leo representing creative self-expression and vitality',
    meanings: ['creative expression', 'vital energy', 'solar power', 'heart center', 'fixed fire'],
    traditions: ['Astrological', 'Solar rulership', 'Leo energy', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // Joy and celebration
  {
    id: 'joyful-celebration',
    label: 'Overall Joyful Celebration',
    type: 'geometric',
    description: 'Entire scene radiating joy, celebration, and triumphant happiness',
    meanings: ['pure joy', 'celebration', 'triumph', 'success', 'life affirmation'],
    traditions: ['Joy celebration', 'Life affirmation', 'Success celebration', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // Innocence regained
  {
    id: 'innocence-regained',
    label: 'Innocence Regained Theme',
    type: 'geometric',
    description: 'Theme of returning to innocent state after gaining wisdom and experience',
    meanings: ['innocence regained', 'wise innocence', 'mature simplicity', 'enlightened childhood', 'second naivety'],
    traditions: ['Spiritual maturity', 'Wise innocence', 'Return to source', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-resh',
    label: 'Hebrew Letter Resh',
    type: 'number',
    description: 'Association with Hebrew letter Resh meaning head, representing consciousness and leadership',
    meanings: ['consciousness', 'leadership', 'head center', 'rational mind', 'solar consciousness'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Consciousness symbol', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'secondary' }
    ]
  },

  // Vitality and health
  {
    id: 'radiant-health',
    label: 'Radiant Health and Vitality',
    type: 'geometric',
    description: 'Overall representation of perfect health, vitality, and life force',
    meanings: ['perfect health', 'vital energy', 'life force', 'robust constitution', 'glowing wellness'],
    traditions: ['Health symbolism', 'Vitality representation', 'Life force', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // Success and achievement
  {
    id: 'success-achievement',
    label: 'Success and Achievement Theme',
    type: 'geometric',
    description: 'Overall theme of successful completion and achievement of goals',
    meanings: ['successful completion', 'goals achieved', 'victory won', 'mission accomplished', 'dreams realized'],
    traditions: ['Success symbolism', 'Achievement representation', 'Victory theme', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'sun-composition',
    label: 'The Sun Card Composition',
    type: 'geometric',
    description: 'Overall radiant composition showing perfect harmony between divine light and earthly joy',
    meanings: ['divine-earthly harmony', 'perfect integration', 'complete fulfillment', 'total illumination', 'cosmic joy'],
    traditions: ['Perfect harmony', 'Divine integration', 'Cosmic celebration', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-19-the-sun', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const SUN_CARD = sunCardSymbols.find(s => s.id === 'card-19-the-sun')!;
export const RADIANT_SUN = sunCardSymbols.find(s => s.id === 'radiant-sun')!;
export const NAKED_CHILD = sunCardSymbols.find(s => s.id === 'naked-child')!;
export const WHITE_HORSE = sunCardSymbols.find(s => s.id === 'white-horse')!;
export const FOUR_SUNFLOWERS = sunCardSymbols.find(s => s.id === 'four-sunflowers')!;