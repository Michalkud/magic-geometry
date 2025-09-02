/**
 * The High Priestess Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const highPriestessCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-02-the-high-priestess',
    label: 'The High Priestess Card',
    type: 'card',
    description: 'The High Priestess Major Arcana card representing intuition, mystery, and inner wisdom',
    meanings: ['intuition', 'inner wisdom', 'mystery', 'subconscious', 'divine feminine', 'esoteric knowledge'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'high-priestess-figure',
    label: 'The High Priestess',
    type: 'figure',
    description: 'Seated female figure in flowing vestments between two pillars, guardian of mystery',
    meanings: ['divine feminine', 'inner wisdom', 'spiritual guide', 'keeper of secrets', 'intuitive knowledge'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  // Pillars and architecture
  {
    id: 'boaz-pillar',
    label: 'Boaz Pillar (B)',
    type: 'architectural',
    description: 'Black pillar on left marked with "B" (Boaz - "in his strength")',
    meanings: ['strength', 'masculine principle', 'severity', 'form', 'limitation'],
    traditions: ['Kabbalistic', 'Masonic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  {
    id: 'jachin-pillar',
    label: 'Jachin Pillar (J)',
    type: 'architectural',
    description: 'White pillar on right marked with "J" (Jachin - "he will establish")',
    meanings: ['establishment', 'feminine principle', 'mercy', 'force', 'expansion'],
    traditions: ['Kabbalistic', 'Masonic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  {
    id: 'temple-veil',
    label: 'Temple Veil',
    type: 'architectural',
    description: 'Veil of the Temple behind her, embroidered with pomegranates and palms',
    meanings: ['hidden mysteries', 'barrier to inner sanctum', 'sacred knowledge', 'initiation threshold'],
    traditions: ['Jewish Temple', 'Christian', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  // Symbols on veil
  {
    id: 'pomegranates-on-veil',
    label: 'Pomegranates on Veil',
    type: 'plant',
    description: 'Pomegranates embroidered on temple veil representing fertility and abundance',
    meanings: ['fertility', 'abundance', 'divine feminine', 'sacred to Persephone', 'hidden seeds of wisdom'],
    traditions: ['Greek mythology', 'Jewish', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'secondary' }
    ]
  },

  {
    id: 'palm-leaves-on-veil',
    label: 'Palm Leaves on Veil',
    type: 'plant',
    description: 'Palm fronds embroidered on temple veil representing masculine principle',
    meanings: ['victory', 'peace', 'masculine principle', 'spiritual triumph', 'righteousness'],
    traditions: ['Christian', 'Jewish', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'secondary' }
    ]
  },

  // Clothing and crown
  {
    id: 'blue-robe',
    label: 'Blue Robe',
    type: 'object',
    description: 'Flowing blue robe representing spiritual truth and divine knowledge',
    meanings: ['spiritual truth', 'divine knowledge', 'peace', 'tranquility', 'water element'],
    traditions: ['Christian (Virgin Mary)', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  {
    id: 'horned-diadem',
    label: 'Horned Diadem/Crown',
    type: 'object',
    description: 'Crown similar to Egyptian goddess Hathor with lunar crescent',
    meanings: ['divine authority', 'lunar connection', 'Isis crown', 'magical power', 'feminine divinity'],
    traditions: ['Egyptian (Hathor/Isis)', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  {
    id: 'solar-cross',
    label: 'Solar Cross',
    type: 'geometric',
    description: 'Large equal-armed cross on her breast representing balance of elements',
    meanings: ['balance of elements', 'spiritual center', 'divine protection', 'solar energy'],
    traditions: ['Christian', 'Solar symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'secondary' }
    ]
  },

  // Lunar symbols
  {
    id: 'crescent-moon-feet',
    label: 'Crescent Moon at Feet',
    type: 'celestial',
    description: 'Lunar crescent at her feet connecting her to moon cycles and intuition',
    meanings: ['lunar cycles', 'intuition', 'subconscious mind', 'feminine energy', 'receptivity'],
    traditions: ['Lunar symbolism', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  // Sacred scroll
  {
    id: 'tora-scroll',
    label: 'TORA Scroll',
    type: 'object',
    description: 'Scroll inscribed with TORA (divine law) partly concealed by her mantle',
    meanings: ['divine law', 'hidden knowledge', 'Torah', 'sacred wisdom', 'esoteric teaching'],
    traditions: ['Jewish', 'Kabbalistic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  // Water element
  {
    id: 'water-behind-veil',
    label: 'Water Behind Veil',
    type: 'element',
    description: 'Body of water visible behind the temple veil representing subconscious',
    meanings: ['subconscious mind', 'emotional depths', 'psychic realm', 'hidden currents', 'intuitive knowledge'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'background' }
    ]
  },

  // Seating and position
  {
    id: 'cubic-throne',
    label: 'Cubic Throne',
    type: 'architectural',
    description: 'Cube-shaped throne representing earthly foundation for spiritual work',
    meanings: ['earthly foundation', 'stability', 'material base for spiritual work', 'four elements'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'background' }
    ]
  },

  {
    id: 'seated-position',
    label: 'Seated Guardian Position',
    type: 'geometric',
    description: 'Seated posture between pillars as guardian of the threshold',
    meanings: ['guardianship', 'threshold keeper', 'patience', 'stillness', 'meditative state'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'primary' }
    ]
  },

  // Additional symbolic elements
  {
    id: 'gauzy-vestments',
    label: 'Gauzy Vestments',
    type: 'object',
    description: 'Flowing, translucent garments suggesting otherworldly nature',
    meanings: ['ethereal nature', 'spiritual being', 'connection to astral realm', 'divine femininity'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'secondary' }
    ]
  },

  {
    id: 'shimmering-radiance',
    label: 'Shimmering Radiance',
    type: 'element',
    description: 'Light emanating from her mantle and presence',
    meanings: ['divine light', 'spiritual radiance', 'inner illumination', 'sacred presence'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-02-the-high-priestess', prominence: 'background' }
    ]
  }
];

// Export individual symbols for easy access
export const HIGH_PRIESTESS_CARD = highPriestessCardSymbols.find(s => s.id === 'card-02-the-high-priestess')!;
export const BOAZ_PILLAR = highPriestessCardSymbols.find(s => s.id === 'boaz-pillar')!;
export const JACHIN_PILLAR = highPriestessCardSymbols.find(s => s.id === 'jachin-pillar')!;
export const TORA_SCROLL = highPriestessCardSymbols.find(s => s.id === 'tora-scroll')!;