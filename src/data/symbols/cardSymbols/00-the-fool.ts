/**
 * The Fool Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const foolCardSymbols: Symbol[] = [
  // The card itself as a symbol
  {
    id: 'card-00-the-fool',
    label: 'The Fool Card',
    type: 'card',
    description: 'The Fool Major Arcana card representing new beginnings, innocence, and the soul\'s journey',
    meanings: ['new beginnings', 'innocence', 'spontaneity', 'free spirit', 'leap of faith', 'unlimited potential'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'primary' }
    ]
  },

  // Main figure
  {
    id: 'fool-youth-figure',
    label: 'The Fool\'s Figure',
    type: 'figure',
    description: 'Young man in gorgeous vestments, walking light and eager toward a precipice',
    meanings: ['spirit in search of experience', 'divine innocence', 'the eternal child', 'prince of the other world'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'primary' }
    ]
  },

  // Clothing and accessories
  {
    id: 'colorful-tunic',
    label: 'Colorful Embroidered Tunic',
    type: 'object',
    description: 'Elaborate tunic with eight-spoked wheels and floral patterns over white undergarment',
    meanings: ['spiritual richness', 'prepared for journey', 'divine potential', 'cycles of existence'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'primary' }
    ]
  },

  {
    id: 'eight-spoked-wheel',
    label: 'Eight-Spoked Wheel (Dharma Wheel)',
    type: 'geometric',
    description: 'Dharma wheel embroidered on tunic representing the eightfold path of Buddhism',
    meanings: ['spiritual path', 'Buddhist eightfold path', 'cosmic cycles', 'dharma'],
    traditions: ['Buddhist', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'secondary' }
    ]
  },

  {
    id: 'white-undershirt',
    label: 'White Undershirt',
    type: 'object',
    description: 'Pure white garment beneath the colorful tunic',
    meanings: ['purity', 'spiritual foundation', 'innocence', 'divine essence'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'background' }
    ]
  },

  {
    id: 'yellow-boots',
    label: 'Yellow Boots',
    type: 'object',
    description: 'Bright yellow boots showing readiness for the journey ahead',
    meanings: ['confidence', 'eagerness', 'intellectual readiness', 'solar energy', 'putting best foot forward'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'secondary' }
    ]
  },

  {
    id: 'red-feather',
    label: 'Red Feather',
    type: 'object',
    description: 'Red feather in the Fool\'s cap representing vitality and passion',
    meanings: ['life force', 'vitality', 'sacrifice for enlightenment', 'intuition', 'fire element', 'courage'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'secondary' }
    ]
  },

  // Objects carried
  {
    id: 'white-rose',
    label: 'White Rose',
    type: 'plant',
    description: 'Pure white rose held in left hand symbolizing freedom from base desires',
    meanings: ['purity', 'innocence', 'spiritual love', 'freedom from baser desires', 'divine love', 'new beginnings'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Christian symbolism'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'primary' }
    ]
  },

  {
    id: 'embroidered-wallet',
    label: 'Embroidered Wallet/Knapsack',
    type: 'object',
    description: 'Curiously embroidered wallet hanging over right shoulder containing past experiences',
    meanings: ['past knowledge', 'untapped potential', 'collective wisdom', 'life experiences', 'spiritual tools'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'secondary' }
    ]
  },

  {
    id: 'costly-wand',
    label: 'Costly Wand/Staff',
    type: 'object',
    description: 'Expensive wand or staff carried casually, representing spiritual power held lightly',
    meanings: ['spiritual power', 'divine authority', 'casual relationship with power', 'tools of manifestation'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'secondary' }
    ]
  },

  // Companion animal
  {
    id: 'white-dog',
    label: 'White Dog',
    type: 'animal',
    description: 'Small white dog (Maltese breed) bounding alongside, representing loyalty and protection',
    meanings: ['loyalty', 'companionship', 'instinctual wisdom', 'protection', 'warning of danger', 'faithful friend'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'primary' }
    ]
  },

  // Landscape elements
  {
    id: 'precipice-cliff',
    label: 'Precipice/Cliff Edge',
    type: 'architectural',
    description: 'Dangerous cliff edge that the Fool approaches fearlessly',
    meanings: ['leap of faith', 'danger', 'threshold', 'unknown future', 'risk', 'trust in divine protection'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'primary' }
    ]
  },

  {
    id: 'snow-capped-mountains',
    label: 'Snow-Capped Mountains',
    type: 'architectural',
    description: 'Distant mountains representing challenges and spiritual heights to be attained',
    meanings: ['challenges ahead', 'spiritual ascension', 'obstacles to overcome', 'higher consciousness', 'purity'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'background' }
    ]
  },

  {
    id: 'bright-sun',
    label: 'Bright Sun',
    type: 'celestial',
    description: 'White/yellow sun shining behind, representing divine illumination and new day',
    meanings: ['divine illumination', 'new beginnings', 'blank canvas', 'god consciousness', 'enlightenment'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'background' }
    ]
  },

  {
    id: 'blue-sky',
    label: 'Blue Sky',
    type: 'element',
    description: 'Clear blue sky representing infinite possibilities and spiritual realm',
    meanings: ['infinite possibilities', 'spiritual realm', 'divine consciousness', 'mental clarity', 'freedom'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'background' }
    ]
  },

  // Symbolic gestures and positions
  {
    id: 'upward-gaze',
    label: 'Upward Gaze',
    type: 'geometric',
    description: 'The Fool\'s gaze directed upward toward the divine',
    meanings: ['spiritual aspiration', 'divine connection', 'optimism', 'trust in universe', 'higher consciousness'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'secondary' }
    ]
  },

  {
    id: 'forward-step',
    label: 'Forward Step',
    type: 'geometric',
    description: 'The Fool\'s eager step forward into the unknown',
    meanings: ['courage', 'initiative', 'leap of faith', 'beginning journey', 'fearlessness'],
    traditions: ['Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-00-the-fool', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const FOOL_CARD = foolCardSymbols.find(s => s.id === 'card-00-the-fool')!;
export const WHITE_ROSE = foolCardSymbols.find(s => s.id === 'white-rose')!;
export const WHITE_DOG = foolCardSymbols.find(s => s.id === 'white-dog')!;
export const PRECIPICE = foolCardSymbols.find(s => s.id === 'precipice-cliff')!;