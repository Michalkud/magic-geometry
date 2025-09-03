export interface DBCard {
  id: string;
  label: string;
  trumpNumber: number;
  image: string;
  pathA?: number;
  pathB?: number;
  hebrewLetter?: string;
  hebrewName?: string;
  element?: string;
  pathNumber?: number;
  note?: string;
}

export interface DBSephirah {
  id: number;
  key: string;
  title: string;
  meaning?: string;
  symbols?: string[];
  sources?: { label: string; url: string }[];
}

export interface DBMinorCard {
  id: string;
  label: string;
  suit: 'Wands' | 'Cups' | 'Swords' | 'Disks';
  rank: 'Ace' | 'Two' | 'Three' | 'Four' | 'Five' | 'Six' | 'Seven' | 'Eight' | 'Nine' | 'Ten';
  image?: string;
  nodeId: number;
}

export interface DBSymbol {
  id: string;
  label: string;
  type: 'card' | 'figure' | 'animal' | 'plant' | 'celestial' | 'object' | 'architectural' | 'geometric' | 'color' | 'number' | 'element';
  description: string;
  meanings: string[];
  traditions: string[];
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  source?: string;
}

export interface DBCardAppearance {
  id?: number;
  symbolId: string;
  cardId: string;
  x?: number;
  y?: number;
  prominence: 'primary' | 'secondary' | 'background';
  variant?: string;
}

export interface DBRelationship {
  id?: number;
  sourceId: string;
  targetId: string;
  type: 'contains' | 'opposes' | 'transforms_into' | 'balances' | 'derives_from' | 'corresponds' | 'evolution' | 'mirrors' | 'complements' | 'shares_element' | 'numerological' | 'geometric' | 'alchemical' | 'kabbalistic';
  strength: number;
  description?: string;
  bidirectional: boolean;
}

export interface DBCardMeaning {
  id?: number;
  cardId: string;
  title: string;
  meaning: string;
  keywords?: string[];
  essay?: string;
  sources?: { label: string; url: string }[];
}

export interface DBSymbolDetail {
  id?: number;
  cardMeaningId: number;
  name: string;
  note: string;
}

export interface DBHotspot {
  id?: number;
  cardId: string;
  symbolId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  meaning?: string;
}

export interface DBGeometry {
  id: string;
  data: any;
}

export interface DBDecan {
  id: string;
  position: number;
  sign: string;
  degreeRange: string;
  planet: string;
  minorCard: string;
  dates: string;
}