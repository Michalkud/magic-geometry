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

// Symbol Registry Hooks

export function useAllSymbols(): DBSymbol[] | undefined {
  return useLiveQuery(
    async () => {
      return await db.symbols.toArray();
    }
  );
}

export function useSymbolsByType(type: string): DBSymbol[] | undefined {
  return useLiveQuery(
    async () => {
      return await db.symbols.where('type').equals(type).toArray();
    },
    [type]
  );
}

export function useSymbolsByCard(cardId: string): DBSymbol[] | undefined {
  return useLiveQuery(
    async () => {
      // Convert card id format if needed
      const appearances = await db.cardAppearances.where('cardId').equals(cardId).toArray();
      const symbolIds = [...new Set(appearances.map(a => a.symbolId))];
      
      if (symbolIds.length === 0) return [];
      
      const symbols = await db.symbols.where('id').anyOf(symbolIds).toArray();
      
      // Add appearance data to each symbol
      return symbols.map(symbol => ({
        ...symbol,
        appearances: appearances.filter(a => a.symbolId === symbol.id)
      }));
    },
    [cardId]
  );
}

export function useSymbolRegistry() {
  return useLiveQuery(
    async () => {
      const symbols = await db.symbols.toArray();
      const appearances = await db.cardAppearances.toArray();
      
      // Create a map for quick lookup
      const registry = new Map();
      
      // Build symbol registry with appearances
      for (const symbol of symbols) {
        const symbolAppearances = appearances.filter(a => a.symbolId === symbol.id);
        registry.set(symbol.id, {
          ...symbol,
          appearances: symbolAppearances
        });
      }
      
      return registry;
    }
  );
}

export function useSymbolRelationships(symbolId?: string): DBRelationship[] | undefined {
  return useLiveQuery(
    async () => {
      if (symbolId) {
        const asSource = await db.relationships.where('sourceId').equals(symbolId).toArray();
        const asTarget = await db.relationships
          .where('targetId')
          .equals(symbolId)
          .filter(r => r.bidirectional === true)
          .toArray();
        
        return [...asSource, ...asTarget];
      }
      return await db.relationships.toArray();
    },
    [symbolId]
  );
}

export function useQuizSymbols() {
  return useLiveQuery(
    async () => {
      // Get symbols that have appearances in cards (for quiz)
      const appearances = await db.cardAppearances.toArray();
      const symbolIds = [...new Set(appearances.map(a => a.symbolId))];
      
      const symbols = await db.symbols.where('id').anyOf(symbolIds).toArray();
      
      // Add card appearance counts and sources
      return symbols.map(symbol => {
        const symbolAppearances = appearances.filter(a => a.symbolId === symbol.id);
        const uniqueCards = [...new Set(symbolAppearances.map(a => a.cardId))];
        
        return {
          ...symbol,
          cardCount: uniqueCards.length,
          sources: symbolAppearances.map(a => a.variant || 'universal')
        };
      });
    }
  );
}

export function useSymbolCounts() {
  return useLiveQuery(
    async () => {
      const symbols = await db.symbols.toArray();
      const appearances = await db.cardAppearances.toArray();
      
      const byType = symbols.reduce((acc, symbol) => {
        acc[symbol.type] = (acc[symbol.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const bySource = appearances.reduce((acc, app) => {
        const source = app.variant || 'universal';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      return {
        total: symbols.length,
        byType,
        bySource,
        withAppearances: [...new Set(appearances.map(a => a.symbolId))].length
      };
    }
  );
}