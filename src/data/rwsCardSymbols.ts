/**
 * Rider-Waite-Smith Card Symbols
 * Detailed symbol mapping for RWS tarot cards
 */

export type RWSCardSymbol = {
  id: string;
  label: string;
  meaning: string;
  category: 'animal' | 'celestial' | 'plant' | 'object' | 'figure' | 'architectural' | 'geometric' | 'religious' | 'nature';
  x?: number;
  y?: number;
};

export const RWS_CARD_SYMBOLS: Record<string, RWSCardSymbol[]> = {
  'the-fool': [
    {
      id: 'white-rose',
      label: 'White Rose',
      meaning: 'Purity, innocence, and new beginnings',
      category: 'plant',
      x: 120,
      y: 200
    },
    {
      id: 'cliff-edge',
      label: 'Cliff Edge',
      meaning: 'The leap of faith, taking risks, unknown territory',
      category: 'nature',
      x: 180,
      y: 350
    },
    {
      id: 'white-dog',
      label: 'White Dog',
      meaning: 'Instinct, loyalty, protection of the innocent',
      category: 'animal',
      x: 150,
      y: 320
    }
  ],
  'the-magician': [
    {
      id: 'lemniscate',
      label: 'Infinity Symbol',
      meaning: 'Infinite potential, eternal life, balance',
      category: 'geometric',
      x: 100,
      y: 50
    },
    {
      id: 'white-lilies',
      label: 'White Lilies',
      meaning: 'Purity, spiritual awakening, divine feminine',
      category: 'plant',
      x: 80,
      y: 300
    },
    {
      id: 'red-roses',
      label: 'Red Roses',
      meaning: 'Passion, desire, material world',
      category: 'plant',
      x: 120,
      y: 300
    }
  ],
  'the-high-priestess': [
    {
      id: 'pillars',
      label: 'Temple Pillars',
      meaning: 'Duality, conscious and subconscious, gateway',
      category: 'architectural',
      x: 60,
      y: 100
    },
    {
      id: 'veil',
      label: 'Veil with Pomegranates',
      meaning: 'Hidden knowledge, feminine mysteries',
      category: 'object',
      x: 100,
      y: 150
    },
    {
      id: 'crescent-moon',
      label: 'Crescent Moon',
      meaning: 'Intuition, feminine energy, cycles',
      category: 'celestial',
      x: 100,
      y: 80
    }
  ],
  'the-moon': [
    {
      id: 'moon-symbol',
      label: 'Crescent Moon',
      meaning: 'Subconscious mind, intuition, illusion',
      category: 'celestial',
      x: 100,
      y: 60
    },
    {
      id: 'wolf',
      label: 'Wolf',
      meaning: 'Wild instincts, fear, the shadow self',
      category: 'animal',
      x: 70,
      y: 250
    },
    {
      id: 'dog',
      label: 'Domesticated Dog',
      meaning: 'Tamed instincts, civilized nature',
      category: 'animal',
      x: 130,
      y: 250
    }
  ],
  'the-chariot': [
    {
      id: 'sphinx-left',
      label: 'Black Sphinx',
      meaning: 'Negative forces, material world',
      category: 'animal',
      x: 80,
      y: 280
    },
    {
      id: 'sphinx-right',
      label: 'White Sphinx',
      meaning: 'Positive forces, spiritual world',
      category: 'animal',
      x: 120,
      y: 280
    },
    {
      id: 'city',
      label: 'City Background',
      meaning: 'Civilization, achievement, structure',
      category: 'architectural',
      x: 100,
      y: 350
    }
  ],
  'temperance': [
    {
      id: 'angel-wings',
      label: 'Angel Wings',
      meaning: 'Divine guidance, protection, elevation',
      category: 'religious',
      x: 100,
      y: 100
    },
    {
      id: 'water-cups',
      label: 'Water Between Cups',
      meaning: 'Flow of consciousness, balance, mixing',
      category: 'object',
      x: 100,
      y: 200
    },
    {
      id: 'mountain-path',
      label: 'Mountain Path',
      meaning: 'Spiritual journey, higher calling',
      category: 'nature',
      x: 100,
      y: 300
    }
  ],
  'the-wheel-of-fortune': [
    {
      id: 'wheel',
      label: 'Wheel of Fortune',
      meaning: 'Cycles, fate, karma, change',
      category: 'geometric',
      x: 100,
      y: 150
    },
    {
      id: 'sphinx-wheel',
      label: 'Sphinx on Wheel',
      meaning: 'Wisdom, riddles, balance',
      category: 'animal',
      x: 100,
      y: 120
    },
    {
      id: 'snake-wheel',
      label: 'Snake (Typhon)',
      meaning: 'Destruction, chaos, downward spiral',
      category: 'animal',
      x: 80,
      y: 180
    }
  ],
  'nine-of-pentacles': [
    {
      id: 'grapes',
      label: 'Bunches of Grapes',
      meaning: 'Abundance, harvest, fruits of labor',
      category: 'plant',
      x: 80,
      y: 120
    },
    {
      id: 'garden',
      label: 'Garden Setting',
      meaning: 'Cultivation, growth, prosperity',
      category: 'nature',
      x: 100,
      y: 200
    }
  ],
  'the-hermit': [
    {
      id: 'lantern',
      label: 'Lantern of Truth',
      meaning: 'Inner wisdom, guidance, illumination',
      category: 'object',
      x: 120,
      y: 150
    },
    {
      id: 'staff-hermit',
      label: 'Staff of Wisdom',
      meaning: 'Support, authority, spiritual power',
      category: 'object',
      x: 80,
      y: 200
    }
  ],
  'the-sun': [
    {
      id: 'horses',
      label: 'White Horse',
      meaning: 'Purity, vitality, conquest over ignorance',
      category: 'animal',
      x: 100,
      y: 250
    },
    {
      id: 'sunflowers',
      label: 'Sunflowers',
      meaning: 'Joy, vitality, following the light',
      category: 'plant',
      x: 60,
      y: 300
    }
  ]
};

export default RWS_CARD_SYMBOLS;