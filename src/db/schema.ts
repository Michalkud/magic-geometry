import Dexie, { type EntityTable } from 'dexie';
import type {
  DBCard,
  DBSephirah,
  DBMinorCard,
  DBSymbol,
  DBCardAppearance,
  DBRelationship,
  DBCardMeaning,
  DBSymbolDetail,
  DBHotspot,
  DBGeometry,
  DBDecan
} from './types';

export class TarotDatabase extends Dexie {
  cards!: EntityTable<DBCard, 'id'>;
  sephirot!: EntityTable<DBSephirah, 'id'>;
  minorCards!: EntityTable<DBMinorCard, 'id'>;
  symbols!: EntityTable<DBSymbol, 'id'>;
  cardAppearances!: EntityTable<DBCardAppearance, 'id'>;
  relationships!: EntityTable<DBRelationship, 'id'>;
  cardMeanings!: EntityTable<DBCardMeaning, 'id'>;
  symbolDetails!: EntityTable<DBSymbolDetail, 'id'>;
  hotspots!: EntityTable<DBHotspot, 'id'>;
  geometries!: EntityTable<DBGeometry, 'id'>;
  decans!: EntityTable<DBDecan, 'id'>;

  constructor() {
    super('TarotDatabase');

    this.version(1).stores({
      cards: 'id, trumpNumber, hebrewLetter, element, pathA, pathB',
      sephirot: 'id, key',
      minorCards: 'id, suit, rank, nodeId',
      symbols: 'id, type, category, difficulty',
      cardAppearances: '++id, symbolId, cardId, [symbolId+cardId]',
      relationships: '++id, sourceId, targetId, type, [sourceId+targetId]',
      cardMeanings: '++id, cardId, title',
      symbolDetails: '++id, cardMeaningId',
      hotspots: '++id, cardId, symbolId, [cardId+symbolId]',
      geometries: 'id',
      decans: 'id, position, sign, planet, minorCard'
    });

  }
}