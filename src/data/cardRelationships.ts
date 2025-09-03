import { TAROT_CARDS } from './cards';
import { MINOR_CARDS } from './minors';
import { SEPHIROT_MEANINGS } from './sephirot';

export type RelationshipType = 'elemental' | 'astrological' | 'numerical' | 'path' | 'sephirotic';

export type CardNode = {
  id: string;
  label: string;
  type: 'major' | 'minor' | 'sephirah';
  data: any; // Original card or sephirah data
  color: string;
  size: number;
};

export type CardRelationship = {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  strength: number; // 1-10, visual weight
  description: string;
  color: string;
};

// Color schemes for different relationship types
export const RELATIONSHIP_COLORS = {
  elemental: '#ff6b6b',    // Red for elemental connections
  astrological: '#4ecdc4', // Teal for astrological connections  
  numerical: '#45b7d1',    // Blue for numerical sequences
  path: '#f9ca24',         // Yellow for Tree of Life paths
  sephirotic: '#6c5ce7'    // Purple for sephirotic connections
};

export const ELEMENT_COLORS = {
  Fire: '#ff4757',    // Wands
  Water: '#3742fa',   // Cups
  Air: '#ffa502',     // Swords  
  Earth: '#2ed573'    // Disks/Pentacles
};

// Generate nodes for visualization
export function generateCardNodes(): CardNode[] {
  const nodes: CardNode[] = [];
  
  // Major Arcana nodes
  TAROT_CARDS.forEach(card => {
    let color = '#ffffff';
    if (card.element) {
      if (['Fire', 'Aries', 'Leo', 'Sagittarius'].some(e => card.element?.includes(e))) color = ELEMENT_COLORS.Fire;
      else if (['Water', 'Cancer', 'Scorpio', 'Pisces'].some(e => card.element?.includes(e))) color = ELEMENT_COLORS.Water;
      else if (['Air', 'Gemini', 'Libra', 'Aquarius'].some(e => card.element?.includes(e))) color = ELEMENT_COLORS.Air;
      else if (['Earth', 'Taurus', 'Virgo', 'Capricorn'].some(e => card.element?.includes(e))) color = ELEMENT_COLORS.Earth;
    }
    
    nodes.push({
      id: card.id,
      label: card.label,
      type: 'major',
      data: card,
      color,
      size: 60
    });
  });
  
  // Minor Arcana nodes (smaller, grouped by suit)
  MINOR_CARDS.forEach(card => {
    const suitColors = {
      Wands: ELEMENT_COLORS.Fire,
      Cups: ELEMENT_COLORS.Water,
      Swords: ELEMENT_COLORS.Air,
      Disks: ELEMENT_COLORS.Earth
    };
    
    nodes.push({
      id: card.id,
      label: card.label,
      type: 'minor',
      data: card,
      color: suitColors[card.suit],
      size: 40
    });
  });
  
  // Sephirot nodes (largest, central)
  Object.values(SEPHIROT_MEANINGS).forEach(sephirah => {
    nodes.push({
      id: `sephirah-${sephirah.id}`,
      label: sephirah.title,
      type: 'sephirah',
      data: sephirah,
      color: '#9b59b6',
      size: 80
    });
  });
  
  return nodes;
}

// Generate relationships for visualization
export function generateCardRelationships(): CardRelationship[] {
  const relationships: CardRelationship[] = [];
  
  // 1. Path relationships (Major Arcana to Sephirot)
  TAROT_CARDS.forEach(card => {
    if (card.path) {
      relationships.push({
        id: `path-${card.id}-${card.path.a}`,
        source: card.id,
        target: `sephirah-${card.path.a}`,
        type: 'path',
        strength: 8,
        description: `${card.label} connects ${card.path.a} to ${card.path.b} via path ${card.pathNumber}`,
        color: RELATIONSHIP_COLORS.path
      });
      
      relationships.push({
        id: `path-${card.id}-${card.path.b}`,
        source: card.id,
        target: `sephirah-${card.path.b}`,
        type: 'path',
        strength: 8,
        description: `${card.label} connects ${card.path.a} to ${card.path.b} via path ${card.pathNumber}`,
        color: RELATIONSHIP_COLORS.path
      });
    }
  });
  
  // 2. Sephirotic relationships (Minor Arcana to Sephirot)
  MINOR_CARDS.forEach(card => {
    relationships.push({
      id: `sephirotic-${card.id}`,
      source: card.id,
      target: `sephirah-${card.nodeId}`,
      type: 'sephirotic',
      strength: 6,
      description: `${card.label} manifests the energy of ${SEPHIROT_MEANINGS[card.nodeId].title}`,
      color: RELATIONSHIP_COLORS.sephirotic
    });
  });
  
  // 3. Elemental relationships (cards sharing elements)
  const elementGroups = {
    Fire: [...MINOR_CARDS.filter(c => c.suit === 'Wands'), ...TAROT_CARDS.filter(c => c.element && ['Aries', 'Leo', 'Sagittarius', 'Fire'].some(e => c.element!.includes(e)))],
    Water: [...MINOR_CARDS.filter(c => c.suit === 'Cups'), ...TAROT_CARDS.filter(c => c.element && ['Cancer', 'Scorpio', 'Pisces', 'Water', 'Moon'].some(e => c.element!.includes(e)))],
    Air: [...MINOR_CARDS.filter(c => c.suit === 'Swords'), ...TAROT_CARDS.filter(c => c.element && ['Gemini', 'Libra', 'Aquarius', 'Air', 'Mercury'].some(e => c.element!.includes(e)))],
    Earth: [...MINOR_CARDS.filter(c => c.suit === 'Disks'), ...TAROT_CARDS.filter(c => c.element && ['Taurus', 'Virgo', 'Capricorn', 'Earth', 'Saturn'].some(e => c.element!.includes(e)))]
  };
  
  // Create elemental connections between Ace and court cards with Major Arcana
  Object.entries(elementGroups).forEach(([element, cards]) => {
    const aces = cards.filter(c => 'rank' in c && c.rank === 'Ace');
    const majors = cards.filter(c => 'trumpNumber' in c);
    
    aces.forEach(ace => {
      majors.forEach(major => {
        relationships.push({
          id: `elemental-${ace.id}-${major.id}`,
          source: ace.id,
          target: major.id,
          type: 'elemental',
          strength: 4,
          description: `${ace.label} and ${major.label} share ${element} elemental energy`,
          color: RELATIONSHIP_COLORS.elemental
        });
      });
    });
  });
  
  // 4. Numerical relationships (Major Arcana sequence)
  for (let i = 0; i < TAROT_CARDS.length - 1; i++) {
    const current = TAROT_CARDS[i];
    const next = TAROT_CARDS[i + 1];
    
    relationships.push({
      id: `numerical-${current.id}-${next.id}`,
      source: current.id,
      target: next.id,
      type: 'numerical',
      strength: 3,
      description: `${current.label} precedes ${next.label} in the Fool's Journey`,
      color: RELATIONSHIP_COLORS.numerical
    });
  }
  
  return relationships;
}

export const EDUCATIONAL_DESCRIPTIONS = {
  elemental: "Elemental connections show how cards share the fundamental forces of Fire (passion/will), Water (emotion/intuition), Air (thought/communication), and Earth (material/practical).",
  astrological: "Astrological relationships reveal how planetary and zodiacal influences create deeper meanings and timing in the cards.",
  numerical: "Numerical relationships trace the Fool's Journey - the progression of spiritual development through the Major Arcana.",
  path: "Path relationships show how Major Arcana cards serve as bridges between the Sephirot on the Tree of Life.",
  sephirotic: "Sephirotic connections demonstrate how Minor Arcana cards express the divine emanations of each sphere of consciousness."
};