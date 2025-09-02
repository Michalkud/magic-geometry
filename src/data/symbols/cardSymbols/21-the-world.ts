/**
 * The World Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const worldCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-21-the-world',
    label: 'The World Card',
    type: 'card',
    description: 'The World Major Arcana card representing completion, fulfillment, and cosmic consciousness',
    meanings: ['completion', 'fulfillment', 'achievement', 'cosmic consciousness', 'wholeness', 'success'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Central figure - The World Dancer
  {
    id: 'world-dancer',
    label: 'The World Dancer',
    type: 'figure',
    description: 'Central dancing figure representing the cosmic soul and achieved enlightenment',
    meanings: ['cosmic soul', 'achieved enlightenment', 'divine dancer', 'cosmic consciousness', 'perfected being'],
    traditions: ['Cosmic dancer', 'Divine feminine', 'Enlightened soul', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  {
    id: 'androgynous-nature',
    label: 'Androgynous Nature of Dancer',
    type: 'figure',
    description: 'Figure combining masculine and feminine qualities representing perfect balance',
    meanings: ['perfect balance', 'unified opposites', 'androgynous completeness', 'masculine-feminine unity', 'whole being'],
    traditions: ['Androgyny symbolism', 'Unity of opposites', 'Perfect balance', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Dance pose and movement
  {
    id: 'dancing-pose',
    label: 'Ecstatic Dancing Pose',
    type: 'geometric',
    description: 'Dynamic dancing posture representing joy, celebration, and cosmic movement',
    meanings: ['cosmic joy', 'divine celebration', 'dynamic movement', 'spiritual ecstasy', 'life dance'],
    traditions: ['Sacred dance', 'Divine ecstasy', 'Cosmic movement', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  {
    id: 'legs-crossed',
    label: 'Crossed Leg Position',
    type: 'geometric',
    description: 'Legs in crossed position suggesting movement while maintaining balance',
    meanings: ['dynamic balance', 'movement in stability', 'cosmic poise', 'perfect equilibrium', 'graceful motion'],
    traditions: ['Balance symbolism', 'Dynamic equilibrium', 'Sacred geometry', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // The wands/batons
  {
    id: 'two-wands',
    label: 'Two Wands/Batons',
    type: 'object',
    description: 'Two wands held in hands representing mastery over the elements and divine tools',
    meanings: ['elemental mastery', 'divine tools', 'magical implements', 'creative power', 'spiritual authority'],
    traditions: ['Magical tools', 'Elemental mastery', 'Divine authority', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // The laurel wreath
  {
    id: 'oval-laurel-wreath',
    label: 'Oval Laurel Wreath',
    type: 'plant',
    description: 'Oval wreath of laurel leaves surrounding the figure representing victory and eternal life',
    meanings: ['victory crown', 'eternal life', 'triumph', 'immortality', 'cosmic completion'],
    traditions: ['Victory symbolism', 'Laurel crown', 'Immortality', 'Classical tradition', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  {
    id: 'wreath-oval-shape',
    label: 'Oval Shape of Wreath',
    type: 'geometric',
    description: 'Oval or vesica piscis shape of wreath representing cosmic egg and birth portal',
    meanings: ['cosmic egg', 'birth portal', 'infinite loop', 'cosmic womb', 'eternal cycle'],
    traditions: ['Cosmic egg', 'Vesica piscis', 'Sacred geometry', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  {
    id: 'green-laurel-leaves',
    label: 'Green Laurel Leaves',
    type: 'plant',
    description: 'Vibrant green laurel leaves representing eternal life and natural victory',
    meanings: ['eternal life', 'natural victory', 'living triumph', 'evergreen nature', 'continuous growth'],
    traditions: ['Evergreen symbolism', 'Eternal life', 'Victory laurel', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'secondary' }
    ]
  },

  {
    id: 'red-ribbon-ties',
    label: 'Red Ribbon Ties',
    type: 'object',
    description: 'Red ribbons tying the wreath representing life force and binding completion',
    meanings: ['life force binding', 'completion seal', 'vital energy', 'achievement marker', 'success ribbon'],
    traditions: ['Ribbon symbolism', 'Life force', 'Achievement binding', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'secondary' }
    ]
  },

  // Four corner figures (Evangelists/Fixed Signs)
  {
    id: 'angel-aquarius-corner',
    label: 'Angel (Aquarius) in Corner',
    type: 'figure',
    description: 'Winged angel in corner representing Aquarius, air element, and divine messenger',
    meanings: ['Aquarius energy', 'air element', 'divine messenger', 'fixed air', 'intellectual principle'],
    traditions: ['Evangelical symbols', 'Fixed signs', 'Elemental guardians', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'secondary' }
    ]
  },

  {
    id: 'eagle-scorpio-corner',
    label: 'Eagle (Scorpio) in Corner',
    type: 'animal',
    description: 'Eagle in corner representing Scorpio, water element, and transformative power',
    meanings: ['Scorpio energy', 'water element', 'transformation', 'fixed water', 'regenerative power'],
    traditions: ['Evangelical symbols', 'Fixed signs', 'Elemental guardians', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'secondary' }
    ]
  },

  {
    id: 'lion-leo-corner',
    label: 'Lion (Leo) in Corner',
    type: 'animal',
    description: 'Lion in corner representing Leo, fire element, and solar power',
    meanings: ['Leo energy', 'fire element', 'solar power', 'fixed fire', 'creative force'],
    traditions: ['Evangelical symbols', 'Fixed signs', 'Elemental guardians', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'secondary' }
    ]
  },

  {
    id: 'bull-taurus-corner',
    label: 'Bull (Taurus) in Corner',
    type: 'animal',
    description: 'Bull in corner representing Taurus, earth element, and material stability',
    meanings: ['Taurus energy', 'earth element', 'material stability', 'fixed earth', 'grounding force'],
    traditions: ['Evangelical symbols', 'Fixed signs', 'Elemental guardians', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'secondary' }
    ]
  },

  // Clouds around corner figures
  {
    id: 'corner-clouds',
    label: 'Clouds Around Corner Figures',
    type: 'element',
    description: 'Clouds surrounding the four corner figures representing celestial realm',
    meanings: ['celestial realm', 'heavenly witnesses', 'divine atmosphere', 'spiritual elevation', 'cosmic support'],
    traditions: ['Celestial symbolism', 'Divine witnesses', 'Heavenly realm', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'background' }
    ]
  },

  // Purple/violet drapery
  {
    id: 'purple-sash',
    label: 'Purple Sash/Drapery',
    type: 'object',
    description: 'Purple cloth draped around dancer representing spiritual mastery and royal dignity',
    meanings: ['spiritual mastery', 'royal dignity', 'divine authority', 'mystical achievement', 'cosmic royalty'],
    traditions: ['Purple symbolism', 'Royal dignity', 'Spiritual mastery', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Saturn correspondence
  {
    id: 'saturn-correspondence',
    label: 'Saturn Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Saturn representing completion, achievement, and cosmic structure',
    meanings: ['cosmic structure', 'completed achievement', 'time mastery', 'disciplined success', 'earned wisdom'],
    traditions: ['Astrological', 'Saturnian completion', 'Time mastery', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-tav',
    label: 'Hebrew Letter Tav',
    type: 'number',
    description: 'Association with Hebrew letter Tav meaning cross or mark, representing completion',
    meanings: ['completion mark', 'final cross', 'total achievement', 'end of cycle', 'cosmic signature'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Completion symbol', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'secondary' }
    ]
  },

  // Mandala symbolism
  {
    id: 'mandala-structure',
    label: 'Mandala-like Structure',
    type: 'geometric',
    description: 'Overall circular, mandala-like composition representing cosmic wholeness',
    meanings: ['cosmic wholeness', 'perfect circle', 'mandala completion', 'universal harmony', 'centered being'],
    traditions: ['Mandala symbolism', 'Cosmic completion', 'Sacred geometry', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Four elements unified
  {
    id: 'four-elements-unified',
    label: 'Four Elements Unified',
    type: 'geometric',
    description: 'Four corner creatures representing all elements unified in cosmic completion',
    meanings: ['elemental unity', 'cosmic completion', 'perfect balance', 'universal harmony', 'total integration'],
    traditions: ['Elemental unity', 'Cosmic completion', 'Universal harmony', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Achievement and success
  {
    id: 'ultimate-achievement',
    label: 'Ultimate Achievement Theme',
    type: 'geometric',
    description: 'Overall theme of ultimate achievement and successful completion of life\'s journey',
    meanings: ['ultimate success', 'journey completed', 'goals achieved', 'mastery attained', 'destiny fulfilled'],
    traditions: ['Success symbolism', 'Journey completion', 'Destiny fulfillment', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Cosmic consciousness
  {
    id: 'cosmic-consciousness',
    label: 'Cosmic Consciousness Representation',
    type: 'geometric',
    description: 'Figure representing achieved cosmic consciousness and universal awareness',
    meanings: ['cosmic awareness', 'universal consciousness', 'enlightened being', 'god-consciousness', 'unified field'],
    traditions: ['Cosmic consciousness', 'Universal awareness', 'Enlightenment', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Eternal dance
  {
    id: 'eternal-dance',
    label: 'Eternal Cosmic Dance',
    type: 'geometric',
    description: 'Dancing representing the eternal cosmic dance of creation and consciousness',
    meanings: ['cosmic dance', 'eternal movement', 'creative principle', 'divine play', 'universal rhythm'],
    traditions: ['Cosmic dance', 'Divine play', 'Creative principle', 'Hindu Nataraja', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Completion of major arcana
  {
    id: 'arcana-completion',
    label: 'Major Arcana Completion',
    type: 'geometric',
    description: 'Represents the completion of the Fool\'s journey through all Major Arcana experiences',
    meanings: ['journey completion', 'full cycle', 'fool transformed', 'wisdom achieved', 'evolution complete'],
    traditions: ['Tarot journey', 'Hero\'s journey', 'Spiritual evolution', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'world-composition',
    label: 'The World Card Composition',
    type: 'geometric',
    description: 'Overall perfect composition showing cosmic completion and universal harmony',
    meanings: ['cosmic completion', 'universal harmony', 'perfect achievement', 'divine fulfillment', 'total success'],
    traditions: ['Cosmic completion', 'Universal harmony', 'Perfect achievement', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-21-the-world', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const WORLD_CARD = worldCardSymbols.find(s => s.id === 'card-21-the-world')!;
export const WORLD_DANCER = worldCardSymbols.find(s => s.id === 'world-dancer')!;
export const OVAL_LAUREL_WREATH = worldCardSymbols.find(s => s.id === 'oval-laurel-wreath')!;
export const FOUR_CORNER_GUARDIANS = [
  worldCardSymbols.find(s => s.id === 'angel-aquarius-corner')!,
  worldCardSymbols.find(s => s.id === 'eagle-scorpio-corner')!,
  worldCardSymbols.find(s => s.id === 'lion-leo-corner')!,
  worldCardSymbols.find(s => s.id === 'bull-taurus-corner')!
];