/**
 * The Hermit Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const hermitCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-09-the-hermit',
    label: 'The Hermit Card',
    type: 'card',
    description: 'The Hermit Major Arcana card representing introspection, wisdom, and spiritual guidance',
    meanings: ['introspection', 'soul searching', 'inner wisdom', 'spiritual guidance', 'solitude', 'enlightenment'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'hermit-figure',
    label: 'The Hermit',
    type: 'figure',
    description: 'Elderly wise man in gray robes standing on mountain peak, representing wisdom through experience',
    meanings: ['wise elder', 'spiritual teacher', 'inner guide', 'wisdom through experience', 'illuminated consciousness'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  // The Lantern and its contents
  {
    id: 'six-pointed-lantern',
    label: 'Six-Pointed Lantern',
    type: 'object',
    description: 'Hexagonal lantern held high, containing the inner light of wisdom and spiritual illumination',
    meanings: ['inner light', 'spiritual illumination', 'guidance', 'beacon of wisdom', 'divine spark'],
    traditions: ['Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  {
    id: 'seal-of-solomon',
    label: 'Seal of Solomon (Six-Pointed Star)',
    type: 'geometric',
    description: 'Six-pointed star within the lantern representing the union of opposites and divine wisdom',
    meanings: ['union of opposites', 'divine wisdom', 'as above so below', 'macrocosm and microcosm', 'spiritual synthesis'],
    traditions: ['Kabbalistic', 'Hermetic', 'Solomonic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  {
    id: 'inner-flame',
    label: 'Inner Flame',
    type: 'element',
    description: 'Bright flame within the lantern representing the eternal flame of spiritual consciousness',
    meanings: ['eternal flame', 'spiritual consciousness', 'divine spark', 'inner fire', 'illumination'],
    traditions: ['Mystical', 'Fire symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'secondary' }
    ]
  },

  // The Staff
  {
    id: 'pilgrim-staff',
    label: 'Pilgrim Staff',
    type: 'object',
    description: 'Long wooden staff supporting the hermit on his spiritual journey',
    meanings: ['spiritual support', 'pilgrim journey', 'divine guidance', 'walking stick of wisdom', 'authority'],
    traditions: ['Pilgrimage symbolism', 'Biblical', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  // Clothing
  {
    id: 'gray-hooded-robe',
    label: 'Gray Hooded Robe',
    type: 'object',
    description: 'Long gray robe with hood representing withdrawal from material world and spiritual discipline',
    meanings: ['withdrawal from world', 'spiritual discipline', 'monastic life', 'humility', 'asceticism'],
    traditions: ['Monastic', 'Ascetic', 'Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  {
    id: 'hood-shadow',
    label: 'Hood Creating Shadow',
    type: 'geometric',
    description: 'Hood casting shadow over face, suggesting mystery and inner contemplation',
    meanings: ['mystery', 'inner contemplation', 'hidden wisdom', 'introspection', 'veiled knowledge'],
    traditions: ['Mystical', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'secondary' }
    ]
  },

  // Physical characteristics
  {
    id: 'white-beard',
    label: 'Long White Beard',
    type: 'figure',
    description: 'Flowing white beard representing wisdom, age, and spiritual maturity',
    meanings: ['wisdom', 'spiritual maturity', 'ancient knowledge', 'venerable age', 'patriarchal wisdom'],
    traditions: ['Wise elder archetype', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'secondary' }
    ]
  },

  {
    id: 'bowed-posture',
    label: 'Slightly Bowed Posture',
    type: 'geometric',
    description: 'Slightly bent posture suggesting both age and careful, measured movement',
    meanings: ['careful deliberation', 'measured progress', 'weight of wisdom', 'cautious advance', 'contemplative stance'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'secondary' }
    ]
  },

  // Mountain and landscape
  {
    id: 'mountain-peak',
    label: 'Mountain Peak',
    type: 'architectural',
    description: 'High mountain peak where the hermit stands, representing spiritual heights and achievement',
    meanings: ['spiritual heights', 'achievement', 'isolation', 'perspective', 'elevated consciousness'],
    traditions: ['Mountain symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  {
    id: 'rocky-terrain',
    label: 'Rocky Mountain Terrain',
    type: 'architectural',
    description: 'Rough, rocky ground representing the difficult path to wisdom',
    meanings: ['difficult path', 'obstacles overcome', 'harsh journey', 'spiritual trials', 'perseverance'],
    traditions: ['Pilgrim path symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'background' }
    ]
  },

  {
    id: 'dark-valley-below',
    label: 'Dark Valley Below',
    type: 'element',
    description: 'Shadowy valley or lower terrain below the hermit representing the world of illusion',
    meanings: ['world of illusion', 'lower consciousness', 'material realm', 'ignorance', 'what is left behind'],
    traditions: ['Platonic allegory', 'Mystical ascent', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'background' }
    ]
  },

  // Night sky and atmosphere
  {
    id: 'dark-night-sky',
    label: 'Dark Night Sky',
    type: 'color',
    description: 'Dark, possibly starless sky representing the dark night of the soul and inner journey',
    meanings: ['dark night of soul', 'inner journey', 'spiritual testing', 'solitude', 'contemplative darkness'],
    traditions: ['Mystical', 'Dark night symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'background' }
    ]
  },

  {
    id: 'lantern-illumination',
    label: 'Lantern\'s Circle of Light',
    type: 'geometric',
    description: 'Circle of light cast by the lantern, illuminating the immediate path',
    meanings: ['immediate guidance', 'next step illuminated', 'limited but sufficient light', 'present moment', 'practical wisdom'],
    traditions: ['Light symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  // Astrological correspondence
  {
    id: 'virgo-correspondence',
    label: 'Virgo Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Virgo zodiac sign representing analysis and purification',
    meanings: ['analytical mind', 'purification', 'discernment', 'service', 'perfection', 'harvest wisdom'],
    traditions: ['Astrological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  // Symbolic actions and meanings
  {
    id: 'seeking-guidance',
    label: 'Guidance-Seeking Posture',
    type: 'geometric',
    description: 'Overall posture and positioning suggesting one who seeks and offers guidance',
    meanings: ['seeking truth', 'offering guidance', 'spiritual teacher', 'wisdom keeper', 'inner compass'],
    traditions: ['Teaching tradition', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  {
    id: 'lantern-raised-high',
    label: 'Lantern Raised High',
    type: 'geometric',
    description: 'Action of holding the lantern up high to cast light for others to follow',
    meanings: ['beacon for others', 'lighting the way', 'teaching by example', 'shared wisdom', 'guiding light'],
    traditions: ['Teacher symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  // Hebrew letter association
  {
    id: 'letter-yod',
    label: 'Hebrew Letter Yod',
    type: 'number',
    description: 'Association with Hebrew letter Yod, representing divine spark and creative beginning',
    meanings: ['divine spark', 'creative beginning', 'hand of god', 'seed of creation', 'point of light'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'secondary' }
    ]
  },

  // Path symbolism
  {
    id: 'solitary-path',
    label: 'Solitary Spiritual Path',
    type: 'geometric',
    description: 'The hermit\'s journey representing the solitary path to enlightenment',
    meanings: ['solitary journey', 'individual path', 'personal quest', 'inner pilgrimage', 'self-reliance'],
    traditions: ['Mystical journey', 'Hero\'s journey', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  // Spiritual attributes
  {
    id: 'inner-light-manifestation',
    label: 'Inner Light Made Manifest',
    type: 'geometric',
    description: 'The physical lantern as manifestation of inner spiritual illumination',
    meanings: ['inner made outer', 'wisdom shared', 'spiritual realization', 'enlightened consciousness', 'divine revelation'],
    traditions: ['Mystical realization', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'hermit-composition',
    label: 'Hermit Card Composition',
    type: 'geometric',
    description: 'Overall scene of solitary wisdom figure illuminating the darkness for himself and others',
    meanings: ['wisdom through solitude', 'light in darkness', 'spiritual teacher', 'inner guidance', 'enlightened service'],
    traditions: ['Wisdom tradition', 'Teaching lineage', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-09-the-hermit', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const HERMIT_CARD = hermitCardSymbols.find(s => s.id === 'card-09-the-hermit')!;
export const SIX_POINTED_LANTERN = hermitCardSymbols.find(s => s.id === 'six-pointed-lantern')!;
export const SEAL_OF_SOLOMON = hermitCardSymbols.find(s => s.id === 'seal-of-solomon')!;
export const PILGRIM_STAFF = hermitCardSymbols.find(s => s.id === 'pilgrim-staff')!;