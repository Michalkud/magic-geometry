/**
 * The Star Card Symbols
 * Based on Rider-Waite-Smith imagery and A.E. Waite's "Pictorial Key to the Tarot"
 */

import { Symbol } from '../types';

export const starCardSymbols: Symbol[] = [
  // The card itself
  {
    id: 'card-17-the-star',
    label: 'The Star Card',
    type: 'card',
    description: 'The Star Major Arcana card representing hope, inspiration, and spiritual guidance',
    meanings: ['hope', 'inspiration', 'guidance', 'healing', 'renewal', 'spiritual connection'],
    traditions: ['Golden Dawn', 'Rider-Waite-Smith', 'Marseille'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // Main figure - The Maiden
  {
    id: 'star-maiden',
    label: 'The Star Maiden',
    type: 'figure',
    description: 'Nude woman kneeling by water representing pure, natural spiritual essence',
    meanings: ['pure essence', 'natural spirituality', 'divine feminine', 'innocence restored', 'spiritual nakedness'],
    traditions: ['Divine feminine', 'Natural purity', 'Goddess figure', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // The main star
  {
    id: 'large-central-star',
    label: 'Large Eight-Pointed Star',
    type: 'celestial',
    description: 'Dominant eight-pointed star representing Venus, spiritual guidance, and divine light',
    meanings: ['Venus star', 'spiritual guidance', 'divine light', 'hope beacon', 'celestial wisdom'],
    traditions: ['Venus symbolism', 'Star of Bethlehem', 'Ishtar', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  {
    id: 'eight-points',
    label: 'Eight Points of Main Star',
    type: 'geometric',
    description: 'Eight rays of the main star representing balance, renewal, and cosmic order',
    meanings: ['cosmic balance', 'renewal cycle', 'infinite flow', 'resurrection', 'new beginning'],
    traditions: ['Sacred geometry', 'Octagon symbolism', 'Renewal cycles', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // Seven smaller stars
  {
    id: 'seven-small-stars',
    label: 'Seven Smaller Stars',
    type: 'celestial',
    description: 'Seven smaller stars around the main star representing the chakras and spiritual centers',
    meanings: ['seven chakras', 'spiritual centers', 'seven heavens', 'mystical completion', 'inner stars'],
    traditions: ['Chakra system', 'Seven heavens', 'Mystical seven', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // Water vessels and pouring
  {
    id: 'two-water-vessels',
    label: 'Two Water Vessels',
    type: 'object',
    description: 'Two pitchers or urns being used to pour water representing conscious and unconscious flow',
    meanings: ['conscious and unconscious', 'dual nature', 'pouring forth', 'giving freely', 'water of life'],
    traditions: ['Dual vessels', 'Water bearers', 'Aquarius symbol', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  {
    id: 'water-onto-land',
    label: 'Water Poured onto Land',
    type: 'element',
    description: 'Water from one vessel being poured onto solid ground representing nourishing the material realm',
    meanings: ['nourishing earth', 'material blessing', 'grounding spirituality', 'fertility', 'abundance'],
    traditions: ['Earth blessing', 'Fertility rituals', 'Material nourishment', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  {
    id: 'water-into-pool',
    label: 'Water Poured into Pool',
    type: 'element',
    description: 'Water from second vessel flowing back into the pool representing eternal circulation',
    meanings: ['eternal circulation', 'self-renewal', 'continuous flow', 'perpetual motion', 'cyclic nature'],
    traditions: ['Circular flow', 'Eternal return', 'Water cycle', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // The pool of water
  {
    id: 'clear-pool',
    label: 'Clear Pool of Water',
    type: 'element',
    description: 'Crystal clear pool reflecting the stars representing the subconscious and cosmic consciousness',
    meanings: ['subconscious mind', 'cosmic consciousness', 'clear reflection', 'pure awareness', 'mirror of heaven'],
    traditions: ['Water mirror', 'Subconscious', 'Cosmic reflection', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // The kneeling position
  {
    id: 'one-knee-water-land',
    label: 'One Knee on Water, One on Land',
    type: 'geometric',
    description: 'Maiden kneeling with one knee in water and one foot on land, bridging realms',
    meanings: ['bridging realms', 'conscious/unconscious bridge', 'material/spiritual unity', 'balanced position', 'liminal state'],
    traditions: ['Bridge symbolism', 'Dual nature', 'Realm connection', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // Landscape elements
  {
    id: 'rolling-hills',
    label: 'Gentle Rolling Hills',
    type: 'architectural',
    description: 'Soft, rolling hills in background representing peaceful, harmonious landscape',
    meanings: ['peaceful environment', 'harmony', 'gentle nature', 'spiritual landscape', 'serene setting'],
    traditions: ['Pastoral symbolism', 'Peaceful landscape', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'background' }
    ]
  },

  {
    id: 'distant-mountains',
    label: 'Distant Mountains',
    type: 'architectural',
    description: 'Distant mountain peaks representing spiritual aspirations and higher goals',
    meanings: ['spiritual aspirations', 'higher goals', 'distant ideals', 'mountain wisdom', 'elevated consciousness'],
    traditions: ['Mountain symbolism', 'Spiritual heights', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'background' }
    ]
  },

  // The tree
  {
    id: 'tree-on-hill',
    label: 'Single Tree on Hill',
    type: 'plant',
    description: 'Solitary tree on hillside representing the Tree of Life and spiritual growth',
    meanings: ['tree of life', 'spiritual growth', 'solitary strength', 'natural wisdom', 'rooted consciousness'],
    traditions: ['Tree of life', 'World tree', 'Natural wisdom', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'secondary' }
    ]
  },

  {
    id: 'bird-in-tree',
    label: 'Bird in Tree',
    type: 'animal',
    description: 'Bird perched in or near the tree representing the soul and spiritual messenger',
    meanings: ['soul bird', 'spiritual messenger', 'divine communication', 'flight to heaven', 'spirit guide'],
    traditions: ['Soul bird', 'Spirit messenger', 'Divine communication', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'secondary' }
    ]
  },

  // Night sky
  {
    id: 'dark-night-sky',
    label: 'Dark Night Sky',
    type: 'color',
    description: 'Deep blue or black night sky providing contrast for the brilliant stars',
    meanings: ['cosmic vastness', 'infinite space', 'night wisdom', 'stellar consciousness', 'universal backdrop'],
    traditions: ['Night symbolism', 'Cosmic consciousness', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'background' }
    ]
  },

  // Hair
  {
    id: 'flowing-hair',
    label: 'Long Flowing Hair',
    type: 'figure',
    description: 'Beautiful long hair flowing naturally representing natural beauty and freedom',
    meanings: ['natural beauty', 'freedom', 'unbound nature', 'flowing energy', 'divine feminine'],
    traditions: ['Natural beauty', 'Divine feminine', 'Freedom symbolism', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'secondary' }
    ]
  },

  // Nakedness symbolism
  {
    id: 'natural-nudity',
    label: 'Natural Nudity',
    type: 'geometric',
    description: 'Natural state of undress representing innocence, truth, and spiritual purity',
    meanings: ['innocence', 'truth', 'spiritual purity', 'natural state', 'vulnerability and strength'],
    traditions: ['Natural purity', 'Truth symbolism', 'Spiritual nakedness', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // Aquarius correspondence
  {
    id: 'aquarius-correspondence',
    label: 'Aquarius Astrological Correspondence',
    type: 'celestial',
    description: 'Card\'s correspondence to Aquarius representing water-bearing, humanitarian ideals, and innovation',
    meanings: ['water bearer', 'humanitarian ideals', 'innovation', 'group consciousness', 'fixed air'],
    traditions: ['Astrological', 'Water bearer', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // Healing waters
  {
    id: 'healing-waters',
    label: 'Healing Properties of Water',
    type: 'element',
    description: 'Water with healing and purifying properties representing spiritual cleansing',
    meanings: ['spiritual cleansing', 'healing power', 'purification', 'renewal', 'life-giving force'],
    traditions: ['Healing waters', 'Sacred springs', 'Purification rituals', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // Five streams
  {
    id: 'five-water-streams',
    label: 'Five Streams of Water',
    type: 'element',
    description: 'Five streams of water flowing from the land vessel representing the five senses awakened',
    meanings: ['five senses', 'sensory awakening', 'pentagram flow', 'human connection', 'earthly awareness'],
    traditions: ['Five senses', 'Pentagram symbolism', 'Human awakening', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'secondary' }
    ]
  },

  // Hebrew letter
  {
    id: 'letter-heh',
    label: 'Hebrew Letter Heh',
    type: 'number',
    description: 'Association with Hebrew letter Heh representing window, breath, and divine revelation',
    meanings: ['divine breath', 'window to heaven', 'revelation', 'spiritual opening', 'cosmic window'],
    traditions: ['Kabbalistic', 'Hebrew alphabet', 'Divine breath', 'Golden Dawn', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'secondary' }
    ]
  },

  // Hope symbolism
  {
    id: 'hope-beacon',
    label: 'Beacon of Hope',
    type: 'celestial',
    description: 'Overall symbolic function as beacon of hope and spiritual guidance',
    meanings: ['beacon of hope', 'spiritual guidance', 'divine promise', 'light in darkness', 'inspiration'],
    traditions: ['Hope symbolism', 'Guiding star', 'Divine promise', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // Renewal theme
  {
    id: 'spiritual-renewal',
    label: 'Spiritual Renewal Scene',
    type: 'geometric',
    description: 'Overall scene representing spiritual renewal and connection to cosmic consciousness',
    meanings: ['spiritual renewal', 'cosmic connection', 'divine communion', 'soul restoration', 'celestial blessing'],
    traditions: ['Renewal rituals', 'Cosmic communion', 'Soul restoration', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  },

  // Overall composition
  {
    id: 'star-composition',
    label: 'The Star Card Composition',
    type: 'geometric',
    description: 'Overall peaceful composition showing harmony between earthly and celestial realms',
    meanings: ['heaven-earth harmony', 'cosmic balance', 'spiritual peace', 'divine connection', 'perfect alignment'],
    traditions: ['Cosmic harmony', 'Divine balance', 'Spiritual peace', 'Rider-Waite-Smith'],
    appearances: [
      { cardId: 'card-17-the-star', prominence: 'primary' }
    ]
  }
];

// Export individual symbols for easy access
export const STAR_CARD = starCardSymbols.find(s => s.id === 'card-17-the-star')!;
export const STAR_MAIDEN = starCardSymbols.find(s => s.id === 'star-maiden')!;
export const LARGE_CENTRAL_STAR = starCardSymbols.find(s => s.id === 'large-central-star')!;
export const SEVEN_SMALL_STARS = starCardSymbols.find(s => s.id === 'seven-small-stars')!;