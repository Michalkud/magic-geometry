/**
 * Symbol Relationships
 * Defines relationships between symbols in the RWS tarot deck
 */

import { SymbolRelationship, RelationshipCollection } from './types';

/**
 * Core symbol relationships in the RWS deck
 * This demonstrates the interconnected nature of tarot symbolism
 */
export const symbolRelationships: RelationshipCollection = [
  // Card containment relationships (card → symbols)
  {
    id: 'fool-contains-white-rose',
    sourceId: 'card-00-the-fool',
    targetId: 'white-rose',
    relationshipType: 'contains',
    strength: 1.0,
    description: 'The Fool card contains a white rose symbol',
    bidirectional: false
  },
  {
    id: 'death-contains-white-rose-flag',
    sourceId: 'card-13-death',
    targetId: 'white-rose-on-flag',
    relationshipType: 'contains',
    strength: 1.0,
    description: 'The Death card contains a white rose on the banner',
    bidirectional: false
  },
  {
    id: 'magician-contains-infinity',
    sourceId: 'card-01-the-magician',
    targetId: 'infinity-symbol',
    relationshipType: 'contains',
    strength: 1.0,
    description: 'The Magician card contains the infinity symbol',
    bidirectional: false
  },

  // White rose relationships - showing the same symbol across cards
  {
    id: 'white-rose-mirrors-flag-rose',
    sourceId: 'white-rose',
    targetId: 'white-rose-on-flag',
    relationshipType: 'mirrors',
    strength: 0.9,
    description: 'The white rose in The Fool mirrors the white rose on Death\'s banner, connecting beginning and transformation',
    bidirectional: true
  },

  // Opposite symbols
  {
    id: 'fool-sun-opposes-hp-moon',
    sourceId: 'bright-sun',
    targetId: 'crescent-moon-feet',
    relationshipType: 'opposes',
    strength: 0.8,
    description: 'The bright sun (Fool) opposes the crescent moon (High Priestess), representing conscious vs unconscious',
    bidirectional: true
  },

  // Pillar relationships
  {
    id: 'boaz-balances-jachin',
    sourceId: 'boaz-pillar',
    targetId: 'jachin-pillar',
    relationshipType: 'balances',
    strength: 1.0,
    description: 'Boaz (black/severity) balances Jachin (white/mercy) in the High Priestess',
    bidirectional: true
  },

  // Evolutionary relationships - Fool's journey
  {
    id: 'fool-evolves-to-magician',
    sourceId: 'card-00-the-fool',
    targetId: 'card-01-the-magician',
    relationshipType: 'evolution',
    strength: 0.9,
    description: 'The Fool evolves into The Magician - from potential to focused will',
    bidirectional: false
  },
  {
    id: 'magician-evolves-to-priestess',
    sourceId: 'card-01-the-magician',
    targetId: 'card-02-the-high-priestess',
    relationshipType: 'evolution',
    strength: 0.9,
    description: 'The Magician evolves into The High Priestess - from conscious will to intuitive wisdom',
    bidirectional: false
  },
  {
    id: 'priestess-evolves-to-empress',
    sourceId: 'card-02-the-high-priestess',
    targetId: 'card-03-the-empress',
    relationshipType: 'evolution',
    strength: 0.9,
    description: 'The High Priestess evolves into The Empress - from inner wisdom to creative manifestation',
    bidirectional: false
  },

  // Complementary relationships
  {
    id: 'magician-complements-priestess',
    sourceId: 'card-01-the-magician',
    targetId: 'card-02-the-high-priestess',
    relationshipType: 'complements',
    strength: 0.8,
    description: 'The Magician (conscious, active) complements The High Priestess (unconscious, receptive)',
    bidirectional: true
  },

  // Transformation relationships
  {
    id: 'fool-transforms-through-death',
    sourceId: 'card-00-the-fool',
    targetId: 'card-13-death',
    relationshipType: 'transforms_into',
    strength: 0.7,
    description: 'The Fool ultimately transforms through Death - innocence through necessary endings',
    bidirectional: false
  },

  // Shared element relationships
  {
    id: 'roses-share-purity-theme',
    sourceId: 'white-rose',
    targetId: 'white-lilies',
    relationshipType: 'shares_element',
    strength: 0.6,
    description: 'White roses and white lilies share themes of purity and spiritual love',
    bidirectional: true
  },
  {
    id: 'roses-contrast-passion-purity',
    sourceId: 'red-roses',
    targetId: 'white-rose',
    relationshipType: 'opposes',
    strength: 0.7,
    description: 'Red roses (passion, earthly love) oppose white roses (purity, spiritual love)',
    bidirectional: true
  },

  // Astrological correspondences
  {
    id: 'empress-corresponds-venus',
    sourceId: 'card-03-the-empress',
    targetId: 'venus-symbol-shield',
    relationshipType: 'corresponds',
    strength: 1.0,
    description: 'The Empress corresponds to Venus, planet of love and beauty',
    bidirectional: false
  },

  // Numerical relationships
  {
    id: 'fool-zero-unlimited',
    sourceId: 'card-00-the-fool',
    targetId: 'infinity-symbol',
    relationshipType: 'numerological',
    strength: 0.8,
    description: 'The Fool (0) relates to infinity - unlimited potential',
    bidirectional: false
  },

  // Kabbalistic relationships
  {
    id: 'pillars-tree-of-life',
    sourceId: 'boaz-pillar',
    targetId: 'jachin-pillar',
    relationshipType: 'kabbalistic',
    strength: 0.9,
    description: 'The pillars Boaz and Jachin represent the left and right pillars of the Tree of Life',
    bidirectional: false
  },

  // Geometric relationships
  {
    id: 'dharma-wheel-cosmic-cycles',
    sourceId: 'eight-spoked-wheel',
    targetId: 'infinity-symbol',
    relationshipType: 'geometric',
    strength: 0.6,
    description: 'Eight-spoked wheel (cycles) relates geometrically to infinity symbol (eternal cycles)',
    bidirectional: false
  },

  // Alchemical relationships
  {
    id: 'serpent-ouroboros-cycle',
    sourceId: 'serpent-cincture',
    targetId: 'infinity-symbol',
    relationshipType: 'alchemical',
    strength: 0.8,
    description: 'Serpent ouroboros represents eternal cycles, relating to infinity symbol',
    bidirectional: false
  },

  // Color symbolism relationships
  {
    id: 'white-purity-theme',
    sourceId: 'white-dog',
    targetId: 'white-rose',
    relationshipType: 'shares_element',
    strength: 0.5,
    description: 'White dog and white rose share the theme of purity and innocence',
    bidirectional: true
  },

  // Cross-card figure relationships
  {
    id: 'youth-to-wisdom-journey',
    sourceId: 'fool-youth-figure',
    targetId: 'high-priestess-figure',
    relationshipType: 'derives_from',
    strength: 0.6,
    description: 'The youthful Fool figure develops wisdom represented by High Priestess',
    bidirectional: false
  },

  // Element relationships
  {
    id: 'water-intuition-connection',
    sourceId: 'water-behind-veil',
    targetId: 'crescent-moon-feet',
    relationshipType: 'corresponds',
    strength: 0.7,
    description: 'Water behind veil corresponds to lunar crescent - both represent intuition and subconscious',
    bidirectional: true
  },

  // Crown and authority relationships
  {
    id: 'crowns-divine-authority',
    sourceId: 'twelve-star-crown',
    targetId: 'horned-diadem',
    relationshipType: 'shares_element',
    strength: 0.6,
    description: 'Both crowns represent divine feminine authority - celestial and lunar',
    bidirectional: true
  },

  // Major Arcana card evolution sequence
  {
    id: 'empress-evolves-to-emperor',
    sourceId: 'card-03-the-empress',
    targetId: 'card-04-the-emperor',
    relationshipType: 'evolution',
    strength: 0.9,
    description: 'The Empress evolves into The Emperor - from creative nurturing to structured authority',
    bidirectional: false
  },
  {
    id: 'emperor-evolves-to-hierophant',
    sourceId: 'card-04-the-emperor',
    targetId: 'card-05-the-hierophant',
    relationshipType: 'evolution',
    strength: 0.9,
    description: 'The Emperor evolves into The Hierophant - from worldly power to spiritual authority',
    bidirectional: false
  },

  // Gender complementarity
  {
    id: 'empress-complements-emperor',
    sourceId: 'card-03-the-empress',
    targetId: 'card-04-the-emperor',
    relationshipType: 'complements',
    strength: 0.9,
    description: 'The Empress (divine feminine) complements The Emperor (divine masculine)',
    bidirectional: true
  },

  // Infinity symbol relationships across cards
  {
    id: 'magician-strength-infinity-link',
    sourceId: 'infinity-symbol',
    targetId: 'infinity-symbol-strength',
    relationshipType: 'mirrors',
    strength: 1.0,
    description: 'Infinity symbol appears on both Magician and Strength, connecting conscious will with spiritual power',
    bidirectional: true
  },

  // Sun and moon opposites
  {
    id: 'sun-opposes-moon',
    sourceId: 'radiant-sun',
    targetId: 'crescent-moon',
    relationshipType: 'opposes',
    strength: 1.0,
    description: 'The Sun card opposes The Moon - clarity vs illusion, consciousness vs unconscious',
    bidirectional: true
  },

  // Star and hope relationships
  {
    id: 'star-brings-hope-after-tower',
    sourceId: 'card-16-the-tower',
    targetId: 'card-17-the-star',
    relationshipType: 'evolution',
    strength: 0.8,
    description: 'The Tower evolves into The Star - destruction leads to hope and renewal',
    bidirectional: false
  },

  // Water pouring connections
  {
    id: 'star-temperance-water-pouring',
    sourceId: 'water-transfer',
    targetId: 'water-onto-land',
    relationshipType: 'mirrors',
    strength: 0.8,
    description: 'Both Temperance and Star feature water pouring, representing divine flow and blessing',
    bidirectional: true
  },

  // Lion symbols across cards
  {
    id: 'strength-fortune-lion-connection',
    sourceId: 'golden-lion',
    targetId: 'lion-leo',
    relationshipType: 'corresponds',
    strength: 0.7,
    description: 'Lions in Strength and Wheel of Fortune both represent Leo energy and fixed fire',
    bidirectional: true
  },

  // Death and rebirth cycle
  {
    id: 'death-transforms-to-temperance',
    sourceId: 'card-13-death',
    targetId: 'card-14-temperance',
    relationshipType: 'transforms_into',
    strength: 0.8,
    description: 'Death transforms into Temperance - ending leads to healing and balance',
    bidirectional: false
  },

  // Angel figures connection
  {
    id: 'temperance-judgement-angels',
    sourceId: 'temperance-angel',
    targetId: 'archangel-gabriel',
    relationshipType: 'shares_element',
    strength: 0.7,
    description: 'Both Temperance and Judgement feature divine angelic messengers',
    bidirectional: true
  },

  // Tower and devil bondage themes
  {
    id: 'devil-tower-false-structures',
    sourceId: 'loose-chains',
    targetId: 'tall-tower',
    relationshipType: 'mirrors',
    strength: 0.6,
    description: 'Both Devil and Tower represent false structures that can be overcome',
    bidirectional: true
  },

  // Hermit and star guidance
  {
    id: 'hermit-star-guidance-light',
    sourceId: 'six-pointed-lantern',
    targetId: 'large-central-star',
    relationshipType: 'shares_element',
    strength: 0.7,
    description: 'Both Hermit and Star provide guiding light - inner wisdom and cosmic hope',
    bidirectional: true
  },

  // Justice and judgment themes
  {
    id: 'justice-judgement-divine-law',
    sourceId: 'scales-of-justice',
    targetId: 'golden-trumpet',
    relationshipType: 'corresponds',
    strength: 0.6,
    description: 'Justice scales and Judgment trumpet both represent divine law and accountability',
    bidirectional: false
  },

  // Hanged man and world completion
  {
    id: 'hanged-man-world-surrender-achievement',
    sourceId: 'hanged-figure',
    targetId: 'world-dancer',
    relationshipType: 'transforms_into',
    strength: 0.7,
    description: 'Hanged Man\'s surrender transforms into World\'s triumphant achievement',
    bidirectional: false
  },

  // Chariot and sun victory themes
  {
    id: 'chariot-sun-victory-success',
    sourceId: 'charioteer-figure',
    targetId: 'naked-child',
    relationshipType: 'shares_element',
    strength: 0.6,
    description: 'Both Chariot and Sun represent victory and success through different means',
    bidirectional: true
  },

  // Lovers and devil choice themes
  {
    id: 'lovers-devil-choice-bondage',
    sourceId: 'choice-symbolism',
    targetId: 'bondage-illusion',
    relationshipType: 'opposes',
    strength: 0.8,
    description: 'Lovers\' divine choice opposes Devil\'s illusory bondage - freedom vs captivity',
    bidirectional: true
  },

  // Fool and world journey completion
  {
    id: 'fool-world-journey-complete',
    sourceId: 'card-00-the-fool',
    targetId: 'card-21-the-world',
    relationshipType: 'transforms_into',
    strength: 1.0,
    description: 'The Fool\'s journey culminates in The World - potential becomes full realization',
    bidirectional: false
  },

  // Wheel of fortune center stability
  {
    id: 'wheel-world-cosmic-center',
    sourceId: 'axis-mundi',
    targetId: 'mandala-structure',
    relationshipType: 'geometric',
    strength: 0.7,
    description: 'Both Wheel and World represent cosmic centers and universal completion',
    bidirectional: true
  },

  // High priestess and moon mystery
  {
    id: 'priestess-moon-mystery-intuition',
    sourceId: 'card-02-the-high-priestess',
    targetId: 'card-18-the-moon',
    relationshipType: 'corresponds',
    strength: 0.8,
    description: 'High Priestess and Moon both represent mystery, intuition, and hidden knowledge',
    bidirectional: true
  },

  // Hierophant and devil spiritual authority
  {
    id: 'hierophant-devil-authority-inversion',
    sourceId: 'triple-crown',
    targetId: 'inverted-pentagram',
    relationshipType: 'opposes',
    strength: 0.7,
    description: 'Hierophant\'s divine authority opposes Devil\'s inverted spiritual symbols',
    bidirectional: true
  },

  // Four corner creatures consistency
  {
    id: 'fortune-world-four-guardians',
    sourceId: 'angel-aquarius',
    targetId: 'angel-aquarius-corner',
    relationshipType: 'mirrors',
    strength: 1.0,
    description: 'Same four guardian creatures appear in Wheel of Fortune and World',
    bidirectional: true
  },
  {
    id: 'fortune-world-eagle-guardians',
    sourceId: 'eagle-scorpio',
    targetId: 'eagle-scorpio-corner',
    relationshipType: 'mirrors',
    strength: 1.0,
    description: 'Eagle guardians in both Wheel of Fortune and World represent Scorpio/water element',
    bidirectional: true
  },
  {
    id: 'fortune-world-lion-guardians',
    sourceId: 'lion-leo',
    targetId: 'lion-leo-corner',
    relationshipType: 'mirrors',
    strength: 1.0,
    description: 'Lion guardians in both Wheel of Fortune and World represent Leo/fire element',
    bidirectional: true
  },
  {
    id: 'fortune-world-bull-guardians',
    sourceId: 'bull-taurus',
    targetId: 'bull-taurus-corner',
    relationshipType: 'mirrors',
    strength: 1.0,
    description: 'Bull guardians in both Wheel of Fortune and World represent Taurus/earth element',
    bidirectional: true
  },

  // Tower and judgement destruction/renewal
  {
    id: 'tower-judgement-destruction-renewal',
    sourceId: 'lightning-bolt',
    targetId: 'divine-radiance',
    relationshipType: 'transforms_into',
    strength: 0.7,
    description: 'Tower\'s destructive lightning transforms into Judgement\'s divine radiance',
    bidirectional: false
  },

  // Animals across cards - dogs and wolves
  {
    id: 'fool-moon-dogs-loyalty-wildness',
    sourceId: 'white-dog',
    targetId: 'domesticated-dog',
    relationshipType: 'shares_element',
    strength: 0.8,
    description: 'Dogs in Fool and Moon represent loyalty and companionship vs wild instincts',
    bidirectional: true
  },

  // Strength and devil animal nature
  {
    id: 'strength-devil-animal-mastery',
    sourceId: 'gentle-lion-taming',
    targetId: 'goat-head',
    relationshipType: 'opposes',
    strength: 0.7,
    description: 'Strength\'s gentle animal mastery opposes Devil\'s bestial dominance',
    bidirectional: true
  },

  // Sun and moon children/figures
  {
    id: 'sun-moon-child-emergence',
    sourceId: 'naked-child',
    targetId: 'crayfish-emerging',
    relationshipType: 'opposes',
    strength: 0.6,
    description: 'Sun\'s joyful child opposes Moon\'s primitive creature emergence',
    bidirectional: true
  },

  // Temperance and devil opposites
  {
    id: 'temperance-devil-healing-bondage',
    sourceId: 'healing-presence',
    targetId: 'material-temptation',
    relationshipType: 'opposes',
    strength: 0.8,
    description: 'Temperance\'s healing presence opposes Devil\'s material temptation',
    bidirectional: true
  },

  // Red and white color symbolism
  {
    id: 'white-rose-purity-across-cards',
    sourceId: 'white-rose',
    targetId: 'white-robe',
    relationshipType: 'shares_element',
    strength: 0.5,
    description: 'White symbols across cards share themes of purity and spiritual essence',
    bidirectional: true
  },

  // Crown symbolism progression
  {
    id: 'crown-authority-progression',
    sourceId: 'emperor-crown',
    targetId: 'star-crown',
    relationshipType: 'evolution',
    strength: 0.6,
    description: 'Crowns evolve from earthly authority to celestial consciousness',
    bidirectional: false
  },

  // Paths and journeys
  {
    id: 'hermit-moon-paths',
    sourceId: 'solitary-path',
    targetId: 'winding-path',
    relationshipType: 'shares_element',
    strength: 0.6,
    description: 'Both Hermit and Moon feature spiritual paths through difficulty',
    bidirectional: true
  },

  // Mountains as spiritual heights
  {
    id: 'multiple-card-mountains',
    sourceId: 'mountain-peak',
    targetId: 'distant-mountains',
    relationshipType: 'shares_element',
    strength: 0.7,
    description: 'Mountains across multiple cards represent spiritual aspirations and achievement',
    bidirectional: true
  },

  // Water symbolism across cards
  {
    id: 'water-consciousness-flow',
    sourceId: 'clear-pool',
    targetId: 'dark-pool',
    relationshipType: 'opposes',
    strength: 0.6,
    description: 'Clear water (Star) opposes dark water (Moon) - clarity vs mystery',
    bidirectional: true
  },

  // Swords as discrimination
  {
    id: 'swords-cutting-truth',
    sourceId: 'drawn-sword',
    targetId: 'upright-sword',
    relationshipType: 'shares_element',
    strength: 0.8,
    description: 'Swords in Chariot and Justice both represent cutting through to truth',
    bidirectional: true
  },

  // Wings and spiritual elevation
  {
    id: 'wings-spiritual-elevation',
    sourceId: 'temperance-angel',
    targetId: 'gabriel-wings',
    relationshipType: 'shares_element',
    strength: 0.8,
    description: 'Angel wings represent spiritual elevation and divine messenger status',
    bidirectional: true
  }
];

/**
 * Utility functions for working with relationships
 */

/**
 * Find all relationships for a specific symbol
 */
export const getRelationshipsForSymbol = (symbolId: string): SymbolRelationship[] => {
  return symbolRelationships.filter(rel => 
    rel.sourceId === symbolId || 
    (rel.bidirectional && rel.targetId === symbolId)
  );
};

/**
 * Find relationships of a specific type
 */
export const getRelationshipsByType = (type: SymbolRelationship['relationshipType']): SymbolRelationship[] => {
  return symbolRelationships.filter(rel => rel.relationshipType === type);
};

/**
 * Find the strongest relationships (above threshold)
 */
export const getStrongRelationships = (minStrength: number = 0.8): SymbolRelationship[] => {
  return symbolRelationships.filter(rel => rel.strength >= minStrength);
};

/**
 * Get relationship statistics
 */
export const getRelationshipStats = () => {
  const byType = symbolRelationships.reduce((acc, rel) => {
    acc[rel.relationshipType] = (acc[rel.relationshipType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const bidirectionalCount = symbolRelationships.filter(rel => rel.bidirectional).length;
  const averageStrength = symbolRelationships.reduce((sum, rel) => sum + rel.strength, 0) / symbolRelationships.length;

  return {
    totalRelationships: symbolRelationships.length,
    relationshipsByType: byType,
    bidirectionalCount,
    averageStrength,
    strongRelationships: symbolRelationships.filter(rel => rel.strength >= 0.8).length
  };
};

// Export relationship collections by type for easy access
export const CONTAINMENT_RELATIONSHIPS = getRelationshipsByType('contains');
export const OPPOSITION_RELATIONSHIPS = getRelationshipsByType('opposes');
export const EVOLUTION_RELATIONSHIPS = getRelationshipsByType('evolution');
export const MIRROR_RELATIONSHIPS = getRelationshipsByType('mirrors');
export const CORRESPONDENCE_RELATIONSHIPS = getRelationshipsByType('corresponds');

// Log relationship stats for development
if (typeof window === 'undefined') {
  console.log('Symbol Relationships Stats:', getRelationshipStats());
}