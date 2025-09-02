import { SymbolHotspot } from '@/components/CardCanvas';

// Rectangle-based hotspot structure for precise symbol location
export interface RectangleHotspot {
  key: string;
  rectangle: {
    x1: number; // normalized 0-1
    y1: number; // normalized 0-1
    x2: number; // normalized 0-1  
    y2: number; // normalized 0-1
  };
  meanings: string[];
  links: string[];
  note?: string;
}

// Convert rectangle to polygon for compatibility with existing CardCanvas
export function rectangleToPolygon(rect: { x1: number; y1: number; x2: number; y2: number }): number[][] {
  return [
    [rect.x1, rect.y1],
    [rect.x2, rect.y1],
    [rect.x2, rect.y2],
    [rect.x1, rect.y2],
  ];
}

// Symbol hotspot coordinates for cards (normalized 0-1)
// These would ideally be created with an annotation tool
export const CARD_HOTSPOTS: Record<string, SymbolHotspot[]> = {
  'the-fool': [
    {
      key: 'green-child',
      polygon: [[0.4, 0.3], [0.6, 0.3], [0.6, 0.6], [0.4, 0.6]],
      meanings: ['Innocence', 'New beginnings', 'Pure potential'],
      links: ['element:Air', 'letter:Aleph', 'path:1-2'],
      note: 'The divine child stepping into manifestation with perfect trust',
    },
    {
      key: 'crocodile',
      polygon: [[0.3, 0.7], [0.5, 0.7], [0.5, 0.85], [0.3, 0.85]],
      meanings: ['Primal waters', 'Unconscious', 'Raw survival'],
      links: ['element:Water', 'sephira:Malkuth'],
      note: 'Sebek, the crocodile god, representing material dangers',
    },
    {
      key: 'dove',
      polygon: [[0.25, 0.15], [0.35, 0.15], [0.35, 0.25], [0.25, 0.25]],
      meanings: ['Spirit descending', 'Peace', 'Holy Ghost'],
      links: ['element:Air', 'sephira:Kether'],
      note: 'The dove of the Holy Spirit descending into matter',
    },
    {
      key: 'butterfly',
      polygon: [[0.65, 0.2], [0.75, 0.2], [0.75, 0.3], [0.65, 0.3]],
      meanings: ['Transformation', 'Psyche', 'Metamorphosis'],
      links: ['element:Air', 'card:Death', 'card:Art'],
      note: 'The soul in transformation through experience',
    },
    {
      key: 'tiger',
      polygon: [[0.55, 0.65], [0.7, 0.65], [0.7, 0.8], [0.55, 0.8]],
      meanings: ['Desire', 'Instinct', 'Raw energy'],
      links: ['element:Fire', 'card:Lust', 'sephira:Geburah'],
      note: 'Untamed desire and primal life force',
    },
    {
      key: 'vulture',
      polygon: [[0.15, 0.35], [0.3, 0.35], [0.3, 0.5], [0.15, 0.5]],
      meanings: ['Mother goddess', 'Death/rebirth', 'Mut'],
      links: ['element:Water', 'card:Death', 'sephira:Binah'],
      note: 'The vulture goddess Mut, representing the primal mother',
    },
    {
      key: 'caduceus',
      polygon: [[0.45, 0.45], [0.55, 0.45], [0.55, 0.65], [0.45, 0.65]],
      meanings: ['Balance', 'Mercury', 'Healing'],
      links: ['planet:Mercury', 'card:Magus', 'path:1-3'],
      note: 'The caduceus showing balanced currents of energy',
    },
    {
      key: 'sun-disk',
      polygon: [[0.7, 0.05], [0.85, 0.05], [0.85, 0.2], [0.7, 0.2]],
      meanings: ['Solar consciousness', 'Ra', 'Divine light'],
      links: ['planet:Sun', 'card:Sun', 'sephira:Tiphareth'],
      note: 'The solar disk of spiritual illumination',
    },
  ],
  'the-magus': [
    {
      key: 'caduceus',
      polygon: [[0.4, 0.2], [0.6, 0.2], [0.6, 0.5], [0.4, 0.5]],
      meanings: ['Mercury', 'Communication', 'Balance'],
      links: ['planet:Mercury', 'sephira:Hod', 'path:1-3'],
      note: 'The caduceus of Mercury, tool of communication between worlds',
    },
    {
      key: 'wand',
      polygon: [[0.2, 0.4], [0.3, 0.4], [0.3, 0.7], [0.2, 0.7]],
      meanings: ['Will', 'Fire', 'Creative force'],
      links: ['element:Fire', 'suit:Wands', 'card:AceWands'],
      note: 'The wand of will directing creative fire',
    },
    {
      key: 'cup',
      polygon: [[0.7, 0.4], [0.8, 0.4], [0.8, 0.5], [0.7, 0.5]],
      meanings: ['Emotion', 'Water', 'Receptivity'],
      links: ['element:Water', 'suit:Cups', 'card:AceCups'],
      note: 'The cup of understanding and emotional intelligence',
    },
    {
      key: 'sword',
      polygon: [[0.3, 0.3], [0.4, 0.3], [0.4, 0.6], [0.3, 0.6]],
      meanings: ['Intellect', 'Air', 'Analysis'],
      links: ['element:Air', 'suit:Swords', 'card:AceSwords'],
      note: 'The sword of reason cutting through illusion',
    },
    {
      key: 'disk',
      polygon: [[0.6, 0.6], [0.7, 0.6], [0.7, 0.7], [0.6, 0.7]],
      meanings: ['Matter', 'Earth', 'Manifestation'],
      links: ['element:Earth', 'suit:Disks', 'card:AceDisks'],
      note: 'The disk of physical manifestation',
    },
    {
      key: 'ape',
      polygon: [[0.15, 0.75], [0.25, 0.75], [0.25, 0.85], [0.15, 0.85]],
      meanings: ['Mimicry', 'Illusion', 'Lower mind'],
      links: ['planet:Mercury', 'card:Devil', 'sephira:Malkuth'],
      note: 'The ape of Thoth representing mimicry without understanding',
    },
    {
      key: 'winged-sandals',
      polygon: [[0.35, 0.8], [0.45, 0.8], [0.45, 0.9], [0.35, 0.9]],
      meanings: ['Speed', 'Travel', 'Messenger'],
      links: ['planet:Mercury', 'element:Air', 'card:Knight-Swords'],
      note: 'The winged sandals of Mercury for swift travel between realms',
    },
  ],
};

// Helper to get hotspots for a card
export function getCardHotspots(cardId: string): SymbolHotspot[] {
  return CARD_HOTSPOTS[cardId] || [];
}