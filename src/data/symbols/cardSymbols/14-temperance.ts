/**
 * Temperance Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const temperanceCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-14-temperance',
    label: 'Temperance Card',
    type: 'card',
    description: 'Temperance Major Arcana card representing balance, moderation, and divine alchemy',
    meanings: ['balance', 'moderation', 'patience', 'healing', 'divine alchemy', 'harmonious blending'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  // Main figure - The Angel
  {
    id: 'temperance-angel',
    label: 'Angel of Temperance',
    type: 'figure',
    description: 'Androgynous angelic figure standing between water and land, representing divine balance',
    meanings: ['divine balance', 'angelic guidance', 'spiritual healing', 'harmonious nature', 'sacred integration'],
    traditions: ['Angelic hierarchy', 'Christian', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  // Wings
  {
    id: 'angel-wings',
    label: 'Angel\'s Wings',
    type: 'geometric',
    description: 'Large wings representing spiritual elevation and divine messenger status',
    meanings: ['spiritual elevation', 'divine messenger', 'higher consciousness', 'angelic presence', 'spiritual protection'],
    traditions: ['Angelic symbolism', 'Christian iconography', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  // The Cups and Water Transfer
  {
    id: 'two-cups',
    label: 'Two Golden Cups',
    type: 'object',
    description: 'Two golden chalices being used to transfer water between each other',
    meanings: ['divine vessels', 'alchemical containers', 'sacred chalices', 'grail symbolism', 'receptive vessels'],
    traditions: ['Grail tradition', 'Alchemical vessels', 'Christian chalices', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  {
    id: 'water-transfer',
    label: 'Water Transfer Between Cups',
    type: 'element',
    description: 'Miraculous flow of water from one cup to another representing divine alchemy',
    meanings: ['divine alchemy', 'miraculous transformation', 'flowing grace', 'spiritual circulation', 'life force transfer'],
    traditions: ['Alchemical processes', 'Divine miracle', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  {
    id: 'impossible-water-flow',
    label: 'Impossible Water Flow',
    type: 'geometric',
    description: 'Water flowing upward and in impossible trajectory, defying natural law',
    meanings: ['transcendence of natural law', 'divine intervention', 'spiritual physics', 'miraculous power', 'higher laws'],
    traditions: ['Miracle symbolism', 'Divine physics', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  // Body position and stance
  {
    id: 'one-foot-water-land',
    label: 'One Foot on Water, One on Land',
    type: 'geometric',
    description: 'Angel standing with one foot in water and one on land, balancing elements',
    meanings: ['balancing elements', 'bridging realms', 'conscious and unconscious', 'material and spiritual', 'perfect equilibrium'],
    traditions: ['Element balancing', 'Hermetic', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  {
    id: 'balanced-stance',
    label: 'Perfectly Balanced Stance',
    type: 'geometric',
    description: 'Graceful, perfectly balanced posture demonstrating divine equilibrium',
    meanings: ['divine equilibrium', 'perfect balance', 'graceful poise', 'harmonious movement', 'centered being'],
    traditions: ['Balance symbolism', 'Divine grace', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  // Clothing and adornment
  {
    id: 'white-robe',
    label: 'White Robe',
    type: 'object',
    description: 'Pure white robe representing spiritual purity and divine essence',
    meanings: ['spiritual purity', 'divine essence', 'angelic nature', 'sacred vestment', 'holy garment'],
    traditions: ['Angelic attire', 'Sacred vestments', 'Color symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  {
    id: 'square-on-chest',
    label: 'Square Symbol on Chest',
    type: 'geometric',
    description: 'Square symbol on the angel\'s chest representing the four elements in perfect balance',
    meanings: ['four elements balanced', 'material perfection', 'earthly harmony', 'foundational stability', 'elemental synthesis'],
    traditions: ['Elemental symbolism', 'Sacred geometry', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'secondary' }
    ]
  },

  {
    id: 'triangle-in-square',
    label: 'Triangle Within Square',
    type: 'geometric',
    description: 'Triangle contained within the square on chest, representing spirit within matter',
    meanings: ['spirit within matter', 'divine in earthly', 'consciousness in form', 'sacred geometry', 'alchemical marriage'],
    traditions: ['Hermetic', 'Alchemical', 'Sacred geometry', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'secondary' }
    ]
  },

  // Forehead symbol
  {
    id: 'solar-disc-forehead',
    label: 'Solar Disc on Forehead',
    type: 'celestial',
    description: 'Golden solar disc or circle on forehead representing enlightened consciousness',
    meanings: ['enlightened consciousness', 'solar wisdom', 'divine illumination', 'third eye', 'spiritual sight'],
    traditions: ['Solar symbolism', 'Third eye', 'Egyptian', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'secondary' }
    ]
  },

  // Hair and features
  {
    id: 'flowing-golden-hair',
    label: 'Flowing Golden Hair',
    type: 'figure',
    description: 'Beautiful golden hair flowing naturally, representing divine radiance',
    meanings: ['divine radiance', 'solar energy', 'natural beauty', 'spiritual light', 'golden wisdom'],
    traditions: ['Solar symbolism', 'Divine beauty', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'secondary' }
    ]
  },

  // Landscape elements
  {
    id: 'pool-of-water',
    label: 'Pool of Water',
    type: 'element',
    description: 'Clear pool of water where angel\'s foot touches, representing the subconscious',
    meanings: ['subconscious mind', 'emotional depth', 'reflective waters', 'cleansing element', 'life source'],
    traditions: ['Water symbolism', 'Subconscious', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  {
    id: 'dry-land',
    label: 'Solid Ground/Land',
    type: 'element',
    description: 'Solid earth where angel\'s other foot rests, representing conscious mind',
    meanings: ['conscious mind', 'material realm', 'solid foundation', 'earthly plane', 'practical reality'],
    traditions: ['Earth symbolism', 'Consciousness', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  {
    id: 'mountain-background',
    label: 'Mountains in Background',
    type: 'architectural',
    description: 'Distant mountains representing spiritual heights and goals to achieve',
    meanings: ['spiritual heights', 'distant goals', 'aspirations', 'higher realms', 'spiritual peaks'],
    traditions: ['Mountain symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'background' }
    ]
  },

  {
    id: 'winding-path',
    label: 'Winding Path',
    type: 'geometric',
    description: 'Path winding toward the mountains representing the spiritual journey',
    meanings: ['spiritual journey', 'gradual progress', 'patient path', 'pilgrimage', 'step by step'],
    traditions: ['Journey symbolism', 'Pilgrimage', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'background' }
    ]
  },

  // Light and radiance
  {
    id: 'crown-of-light',
    label: 'Crown or Halo of Light',
    type: 'celestial',
    description: 'Radiant light around angel\'s head representing divine consciousness',
    meanings: ['divine consciousness', 'enlightenment', 'spiritual authority', 'sacred radiance', 'holy light'],
    traditions: ['Halo symbolism', 'Divine light', 'Christian iconography', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'secondary' }
    ]
  },

  // Iris flowers
  {
    id: 'iris-flowers',
    label: 'Iris Flowers',
    type: 'plant',
    description: 'Iris flowers growing near the water representing messages and communication',
    meanings: ['divine messages', 'communication', 'rainbow bridge', 'spiritual connection', 'heavenly messenger'],
    traditions: ['Iris goddess', 'Rainbow bridge', 'Flower symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'background' }
    ]
  },

  // Sagittarius correspondence
  {
    id: 'sagittarius-correspondence',
    label: 'Sagittarius Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Sagittarius representing the spiritual archer and higher learning',
    meanings: ['spiritual archer', 'higher learning', 'philosophical quest', 'teaching', 'mutable fire'],
    traditions: ['Astrological', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-samech',
    label: 'Hebrew Letter Samech',
    type: 'number',
    description: 'Association with Hebrew letter Samech representing support and protection',
    meanings: ['divine support', 'protection', 'circular completion', 'eternal cycle', 'supporting pillar'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'secondary' }
    ]
  },

  // Alchemical processes
  {
    id: 'alchemical-mixing',
    label: 'Alchemical Mixing Process',
    type: 'geometric',
    description: 'Overall scene representing the alchemical process of mixing opposite elements',
    meanings: ['alchemical marriage', 'opposites united', 'chemical wedding', 'divine synthesis', 'perfect mixture'],
    traditions: ['Alchemical', 'Hermetic', 'Chemical wedding', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  // Healing energy
  {
    id: 'healing-presence',
    label: 'Healing Presence',
    type: 'geometric',
    description: 'Overall aura of healing and restoration emanating from the angel',
    meanings: ['divine healing', 'restoration', 'therapeutic energy', 'spiritual medicine', 'balancing force'],
    traditions: ['Healing arts', 'Spiritual healing', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  // Time and patience
  {
    id: 'patient-process',
    label: 'Patient, Gradual Process',
    type: 'geometric',
    description: 'Slow, careful water transfer representing patience and gradual transformation',
    meanings: ['divine patience', 'gradual transformation', 'slow alchemy', 'careful process', 'time and timing'],
    traditions: ['Time symbolism', 'Patience virtue', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'temperance-composition',
    label: 'Temperance Card Composition',
    type: 'geometric',
    description: 'Overall harmonious composition showing divine balance and alchemical transformation',
    meanings: ['divine balance', 'alchemical transformation', 'harmonious integration', 'spiritual synthesis', 'perfect temperance'],
    traditions: ['Alchemical art', 'Divine harmony', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-14-temperance', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const TEMPERANCE_CARD = temperanceCardSymbols.find(s => s.id === 'card-14-temperance')!;
export const TEMPERANCE_ANGEL = temperanceCardSymbols.find(s => s.id === 'temperance-angel')!;
export const TWO_CUPS = temperanceCardSymbols.find(s => s.id === 'two-cups')!;
export const WATER_TRANSFER = temperanceCardSymbols.find(s => s.id === 'water-transfer')!;