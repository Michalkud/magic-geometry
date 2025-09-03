import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import type { 
  DBCard, 
  DBSephirah, 
  DBMinorCard, 
  DBSymbol, 
  DBCardMeaning,
  DBRelationship,
  DBCardAppearance,
  DBHotspot
} from './types';

export function useCard(cardId: string): DBCard | undefined {
  return useLiveQuery(
    async () => {
      return await db.cards.get(cardId);
    },
    [cardId]
  );
}

export function useCards(): DBCard[] | undefined {
  return useLiveQuery(
    async () => {
      return await db.cards.orderBy('trumpNumber').toArray();
    }
  );
}

export function useCardsByPath(nodeA: number, nodeB: number): DBCard[] | undefined {
  return useLiveQuery(
    async () => {
      return await db.cards
        .where('[pathA+pathB]')
        .equals([nodeA, nodeB])
        .or('[pathA+pathB]')
        .equals([nodeB, nodeA])
        .toArray();
    },
    [nodeA, nodeB]
  );
}

export function useSephirot(): DBSephirah[] | undefined {
  return useLiveQuery(
    async () => {
      return await db.sephirot.orderBy('id').toArray();
    }
  );
}

export function useSephirah(id: number): DBSephirah | undefined {
  return useLiveQuery(
    async () => {
      return await db.sephirot.get(id);
    },
    [id]
  );
}

export function useMinorCards(suit?: string): DBMinorCard[] | undefined {
  return useLiveQuery(
    async () => {
      if (suit) {
        return await db.minorCards.where('suit').equals(suit).toArray();
      }
      return await db.minorCards.toArray();
    },
    [suit]
  );
}

export function useMinorCardsBySephirah(nodeId: number): DBMinorCard[] | undefined {
  return useLiveQuery(
    async () => {
      return await db.minorCards.where('nodeId').equals(nodeId).toArray();
    },
    [nodeId]
  );
}

export function useSymbols(type?: string): DBSymbol[] | undefined {
  return useLiveQuery(
    async () => {
      if (type) {
        return await db.symbols.where('type').equals(type).toArray();
      }
      return await db.symbols.toArray();
    },
    [type]
  );
}

export function useSymbol(symbolId: string): DBSymbol | undefined {
  return useLiveQuery(
    async () => {
      return await db.symbols.get(symbolId);
    },
    [symbolId]
  );
}

export function useCardMeaning(cardId: string): DBCardMeaning | undefined {
  return useLiveQuery(
    async () => {
      return await db.cardMeanings.where('cardId').equals(cardId).first();
    },
    [cardId]
  );
}

export function useCardMeaningWithDetails(cardId: string) {
  return useLiveQuery(
    async () => {
      const meaning = await db.cardMeanings.where('cardId').equals(cardId).first();
      if (!meaning || !meaning.id) return { meaning, details: [] };
      
      const details = await db.symbolDetails.where('cardMeaningId').equals(meaning.id).toArray();
      return { meaning, details };
    },
    [cardId]
  );
}

export function useCardSymbols(cardId: string): DBSymbol[] | undefined {
  return useLiveQuery(
    async () => {
      const appearances = await db.cardAppearances.where('cardId').equals(cardId).toArray();
      const symbolIds = appearances.map(a => a.symbolId);
      if (symbolIds.length === 0) return [];
      
      return await db.symbols.where('id').anyOf(symbolIds).toArray();
    },
    [cardId]
  );
}

export function useSymbolAppearances(symbolId: string): DBCardAppearance[] | undefined {
  return useLiveQuery(
    async () => {
      return await db.cardAppearances.where('symbolId').equals(symbolId).toArray();
    },
    [symbolId]
  );
}

export function useRelationships(symbolId: string): DBRelationship[] | undefined {
  return useLiveQuery(
    async () => {
      const asSource = await db.relationships.where('sourceId').equals(symbolId).toArray();
      const asTarget = await db.relationships
        .where('targetId')
        .equals(symbolId)
        .filter(r => r.bidirectional === true)
        .toArray();
      
      return [...asSource, ...asTarget];
    },
    [symbolId]
  );
}

export function useHotspots(cardId: string): DBHotspot[] | undefined {
  return useLiveQuery(
    async () => {
      return await db.hotspots.where('cardId').equals(cardId).toArray();
    },
    [cardId]
  );
}

export function useSearchCards(query: string): DBCard[] | undefined {
  return useLiveQuery(
    async () => {
      if (!query) return [];
      const lowQuery = query.toLowerCase();
      
      return await db.cards
        .filter(card => 
          card.label.toLowerCase().includes(lowQuery) ||
          (card.hebrewName?.toLowerCase().includes(lowQuery) ?? false) ||
          (card.element?.toLowerCase().includes(lowQuery) ?? false) ||
          (card.note?.toLowerCase().includes(lowQuery) ?? false)
        )
        .toArray();
    },
    [query]
  );
}

export function useSearchSymbols(query: string): DBSymbol[] | undefined {
  return useLiveQuery(
    async () => {
      if (!query) return [];
      const lowQuery = query.toLowerCase();
      
      return await db.symbols
        .filter(symbol => 
          symbol.label.toLowerCase().includes(lowQuery) ||
          symbol.description.toLowerCase().includes(lowQuery) ||
          symbol.meanings.some(m => m.toLowerCase().includes(lowQuery))
        )
        .toArray();
    },
    [query]
  );
}