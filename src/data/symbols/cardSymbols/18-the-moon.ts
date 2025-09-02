/**
 * The Moon Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const moonCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-18-the-moon',
    label: 'The Moon Card',
    type: 'card',
    description: 'The Moon Major Arcana card representing illusion, intuition, and the subconscious',
    meanings: ['illusion', 'intuition', 'subconscious', 'dreams', 'mystery', 'deception'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  // The Moon itself
  {
    id: 'crescent-moon',
    label: 'Crescent Moon',
    type: 'celestial',
    description: 'Large crescent moon in sky representing feminine principle, cycles, and reflected light',
    meanings: ['feminine principle', 'lunar cycles', 'reflected light', 'waxing/waning', 'monthly rhythm'],
    traditions: ['Lunar symbolism', 'Goddess worship', 'Cyclical time', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  {
    id: 'moon-face',
    label: 'Human Face in Moon',
    type: 'figure',
    description: 'Human face visible in the moon representing personified lunar consciousness',
    meanings: ['lunar consciousness', 'moon deity', 'personified moon', 'watchful presence', 'cosmic awareness'],
    traditions: ['Moon deity', 'Anthropomorphic celestials', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  {
    id: 'moon-rays',
    label: 'Moon Rays/Drops',
    type: 'celestial',
    description: 'Rays or droplets of light falling from moon representing lunar influence and psychic energy',
    meanings: ['lunar influence', 'psychic energy', 'moon dew', 'subtle forces', 'invisible emanations'],
    traditions: ['Lunar emanations', 'Psychic energy', 'Subtle influences', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  {
    id: 'yod-drops',
    label: 'Yod-Shaped Drops',
    type: 'geometric',
    description: 'Teardrop shapes like Hebrew Yods falling from moon representing divine sparks',
    meanings: ['divine sparks', 'creative seeds', 'spiritual drops', 'cosmic influence', 'heavenly dew'],
    traditions: ['Kabbalistic', 'Hebrew Yod', 'Divine emanation', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'secondary' }
    ]
  },

  // The two dogs/wolves
  {
    id: 'domesticated-dog',
    label: 'Domesticated Dog',
    type: 'animal',
    description: 'Tame dog howling at moon representing trained consciousness and civilization',
    meanings: ['trained consciousness', 'civilization', 'domesticated nature', 'loyal companion', 'conscious mind'],
    traditions: ['Domestic animals', 'Consciousness symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  {
    id: 'wild-wolf',
    label: 'Wild Wolf',
    type: 'animal',
    description: 'Wild wolf howling at moon representing untamed nature and primitive instincts',
    meanings: ['untamed nature', 'primitive instincts', 'wild consciousness', 'primal self', 'unconscious drives'],
    traditions: ['Wild animals', 'Primal instincts', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  {
    id: 'howling-pose',
    label: 'Howling at Moon Posture',
    type: 'geometric',
    description: 'Both creatures howling upward at moon representing lunar call and response',
    meanings: ['lunar response', 'instinctual calling', 'moon worship', 'primitive communication', 'celestial connection'],
    traditions: ['Lunar worship', 'Animal communication', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  // The crayfish/crab
  {
    id: 'crayfish-emerging',
    label: 'Crayfish Emerging from Water',
    type: 'animal',
    description: 'Crayfish or crab crawling from pool representing emergence from subconscious depths',
    meanings: ['subconscious emergence', 'primitive evolution', 'deep-water wisdom', 'ancient knowledge', 'cancer energy'],
    traditions: ['Cancer zodiac', 'Water creatures', 'Evolutionary symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  {
    id: 'crayfish-claws',
    label: 'Crayfish Claws',
    type: 'geometric',
    description: 'Pincer claws of crayfish representing grasping nature and protective instincts',
    meanings: ['grasping nature', 'protective instincts', 'holding on', 'defensive posture', 'ancient wisdom'],
    traditions: ['Protective symbolism', 'Ancestral wisdom', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'secondary' }
    ]
  },

  // The path
  {
    id: 'winding-path',
    label: 'Winding Path',
    type: 'geometric',
    description: 'Curving path leading into distance representing the unclear journey ahead',
    meanings: ['unclear journey', 'winding way', 'indirect path', 'mysterious route', 'labyrinthine progress'],
    traditions: ['Journey symbolism', 'Labyrinth path', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  {
    id: 'path-into-unknown',
    label: 'Path Leading into Unknown',
    type: 'geometric',
    description: 'Path disappearing into darkness representing journey into mystery',
    meanings: ['journey into mystery', 'unknown destination', 'faith in darkness', 'trust in intuition', 'leap of faith'],
    traditions: ['Mystery journey', 'Faith path', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  // The two towers
  {
    id: 'twin-towers',
    label: 'Two Towers/Pillars',
    type: 'architectural',
    description: 'Two towers flanking the path representing guardians of the threshold',
    meanings: ['threshold guardians', 'gateway pillars', 'boundary markers', 'protective towers', 'passage guardians'],
    traditions: ['Gateway symbolism', 'Threshold guardians', 'Pillar symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  {
    id: 'towers-in-distance',
    label: 'Distant Tower Placement',
    type: 'architectural',
    description: 'Towers positioned in far distance representing distant goals and challenges',
    meanings: ['distant goals', 'far challenges', 'remote aspirations', 'long journey ahead', 'spiritual destinations'],
    traditions: ['Distance symbolism', 'Goal representation', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'secondary' }
    ]
  },

  // The pool of water
  {
    id: 'dark-pool',
    label: 'Dark Pool of Water',
    type: 'element',
    description: 'Dark reflective pool representing the subconscious mind and emotional depths',
    meanings: ['subconscious mind', 'emotional depths', 'mirror of soul', 'hidden feelings', 'psychic waters'],
    traditions: ['Water symbolism', 'Subconscious', 'Mirror waters', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  {
    id: 'pool-reflection',
    label: 'Reflecting Pool Surface',
    type: 'geometric',
    description: 'Reflective surface of pool showing moon\'s image representing illusion and reflection',
    meanings: ['illusion', 'reflection', 'mirror image', 'deceptive appearances', 'surface vs depth'],
    traditions: ['Reflection symbolism', 'Illusion', 'Maya doctrine', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'secondary' }
    ]
  },

  // Landscape features
  {
    id: 'barren-landscape',
    label: 'Barren, Desolate Landscape',
    type: 'element',
    description: 'Sparse, desolate terrain representing spiritual wasteland and inner emptiness',
    meanings: ['spiritual wasteland', 'inner emptiness', 'desolate journey', 'barren period', 'soul desert'],
    traditions: ['Wasteland symbolism', 'Desert journey', 'Spiritual aridity', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'background' }
    ]
  },

  {
    id: 'rolling-hills',
    label: 'Undulating Hills',
    type: 'architectural',
    description: 'Gently rolling hills in background representing the unconscious landscape',
    meanings: ['unconscious landscape', 'psychic terrain', 'dream geography', 'inner topography', 'soul hills'],
    traditions: ['Psychic landscape', 'Dream geography', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'background' }
    ]
  },

  // Night sky
  {
    id: 'dark-night-sky',
    label: 'Dark Night Sky',
    type: 'color',
    description: 'Deep dark sky representing the realm of mystery and hidden knowledge',
    meanings: ['mystery realm', 'hidden knowledge', 'night wisdom', 'dark mysteries', 'unconscious depths'],
    traditions: ['Night symbolism', 'Dark mysteries', 'Hidden wisdom', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'background' }
    ]
  },

  // Pisces correspondence
  {
    id: 'pisces-correspondence',
    label: 'Pisces Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Pisces representing dreams, intuition, and spiritual dissolution',
    meanings: ['dreams', 'intuition', 'spiritual dissolution', 'psychic sensitivity', 'mutable water'],
    traditions: ['Astrological', 'Piscean age', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-qoph',
    label: 'Hebrew Letter Qoph',
    type: 'number',
    description: 'Association with Hebrew letter Qoph meaning back of head, representing hidden knowledge',
    meanings: ['hidden knowledge', 'back of mind', 'subconscious', 'occult wisdom', 'secret teachings'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Hidden wisdom', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'secondary' }
    ]
  },

  // Illusion theme
  {
    id: 'illusion-deception',
    label: 'Illusion and Deception Theme',
    type: 'geometric',
    description: 'Overall theme of things not being as they appear and deceptive influences',
    meanings: ['deceptive appearances', 'things not as they seem', 'maya illusion', 'false impressions', 'veiled truth'],
    traditions: ['Illusion doctrine', 'Maya teaching', 'Deception awareness', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  // Psychic sensitivity
  {
    id: 'psychic-atmosphere',
    label: 'Psychic Atmospheric Influence',
    type: 'geometric',
    description: 'Overall psychically charged atmosphere affecting perception and intuition',
    meanings: ['psychic influence', 'intuitive atmosphere', 'sixth sense', 'psychic sensitivity', 'supernatural awareness'],
    traditions: ['Psychic development', 'Supernatural perception', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  // Fear and anxiety
  {
    id: 'fear-anxiety-mood',
    label: 'Fearful, Anxious Mood',
    type: 'geometric',
    description: 'Overall mood of uncertainty, fear, and anxiety about the unknown',
    meanings: ['uncertainty', 'anxiety', 'fear of unknown', 'psychological unease', 'emotional instability'],
    traditions: ['Psychological symbolism', 'Fear representation', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'moon-composition',
    label: 'The Moon Card Composition',
    type: 'geometric',
    description: 'Overall mysterious composition showing the treacherous path through illusion to truth',
    meanings: ['path through illusion', 'treacherous journey', 'mystery navigation', 'intuitive guidance', 'hidden truth'],
    traditions: ['Mystery journey', 'Illusion navigation', 'Truth seeking', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-18-the-moon', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const MOON_CARD = moonCardSymbols.find(s => s.id === 'card-18-the-moon')!;
export const CRESCENT_MOON = moonCardSymbols.find(s => s.id === 'crescent-moon')!;
export const TWIN_DOGS = [
  moonCardSymbols.find(s => s.id === 'domesticated-dog')!,
  moonCardSymbols.find(s => s.id === 'wild-wolf')!
];
export const CRAYFISH_EMERGING = moonCardSymbols.find(s => s.id === 'crayfish-emerging')!;