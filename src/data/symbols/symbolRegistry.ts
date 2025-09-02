/**
 * Symbol Registry
 * Comprehensive registry of all symbols found in the Rider-Waite-Smith tarot deck
 */

import { Symbol, SymbolRegistry } from './types';

// Import all card symbol arrays
import { foolCardSymbols } from './cardSymbols/00-the-fool';
import { magicianCardSymbols } from './cardSymbols/01-the-magician';
import { highPriestessCardSymbols } from './cardSymbols/02-the-high-priestess';
import { empressCardSymbols } from './cardSymbols/03-the-empress';
import { emperorCardSymbols } from './cardSymbols/04-the-emperor';
import { hierophantCardSymbols } from './cardSymbols/05-the-hierophant';
import { loversCardSymbols } from './cardSymbols/06-the-lovers';
import { chariotCardSymbols } from './cardSymbols/07-the-chariot';
import { strengthCardSymbols } from './cardSymbols/08-strength';
import { hermitCardSymbols } from './cardSymbols/09-the-hermit';
import { wheelOfFortuneCardSymbols } from './cardSymbols/10-wheel-of-fortune';
import { justiceCardSymbols } from './cardSymbols/11-justice';
import { hangedManCardSymbols } from './cardSymbols/12-the-hanged-man';
import { deathCardSymbols } from './cardSymbols/13-death';
import { temperanceCardSymbols } from './cardSymbols/14-temperance';
import { devilCardSymbols } from './cardSymbols/15-the-devil';
import { towerCardSymbols } from './cardSymbols/16-the-tower';
import { starCardSymbols } from './cardSymbols/17-the-star';
import { moonCardSymbols } from './cardSymbols/18-the-moon';
import { sunCardSymbols } from './cardSymbols/19-the-sun';
import { judgementCardSymbols } from './cardSymbols/20-judgement';
import { worldCardSymbols } from './cardSymbols/21-the-world';

/**
 * Master Symbol Registry
 * Contains all unique symbols from the RWS deck
 * Includes symbols from all 22 Major Arcana cards
 */
export const createSymbolRegistry = (): SymbolRegistry => {
  const registry = new Map<string, Symbol>();
  
  // Collect all symbols from all card files
  const allCardSymbols = [
    ...foolCardSymbols,
    ...magicianCardSymbols,
    ...highPriestessCardSymbols,
    ...empressCardSymbols,
    ...emperorCardSymbols,
    ...hierophantCardSymbols,
    ...loversCardSymbols,
    ...chariotCardSymbols,
    ...strengthCardSymbols,
    ...hermitCardSymbols,
    ...wheelOfFortuneCardSymbols,
    ...justiceCardSymbols,
    ...hangedManCardSymbols,
    ...deathCardSymbols,
    ...temperanceCardSymbols,
    ...devilCardSymbols,
    ...towerCardSymbols,
    ...starCardSymbols,
    ...moonCardSymbols,
    ...sunCardSymbols,
    ...judgementCardSymbols,
    ...worldCardSymbols
  ];
  
  // Add each symbol to the registry
  allCardSymbols.forEach(symbol => {
    // Check for duplicates and merge appearances if symbol already exists
    if (registry.has(symbol.id)) {
      const existingSymbol = registry.get(symbol.id)!;
      // Merge appearances arrays, avoiding duplicates
      const mergedAppearances = [
        ...existingSymbol.appearances,
        ...symbol.appearances.filter(newApp => 
          !existingSymbol.appearances.some(existingApp => 
            existingApp.cardId === newApp.cardId && 
            existingApp.variant === newApp.variant
          )
        )
      ];
      registry.set(symbol.id, {
        ...existingSymbol,
        appearances: mergedAppearances
      });
    } else {
      registry.set(symbol.id, symbol);
    }
  });
  
  return registry;
};

// Create and export the registry instance
export const SYMBOL_REGISTRY = createSymbolRegistry();

/**
 * Utility functions for working with the symbol registry
 */

/**
 * Get a symbol by its ID
 */
export const getSymbol = (id: string): Symbol | undefined => {
  return SYMBOL_REGISTRY.get(id);
};

/**
 * Get all symbols of a specific type
 */
export const getSymbolsByType = (type: Symbol['type']): Symbol[] => {
  return Array.from(SYMBOL_REGISTRY.values()).filter(symbol => symbol.type === type);
};

/**
 * Find symbols that appear on a specific card
 */
export const findSymbolsOnCard = (cardId: string): Symbol[] => {
  return Array.from(SYMBOL_REGISTRY.values()).filter(symbol =>
    symbol.appearances.some(appearance => appearance.cardId === cardId)
  );
};

/**
 * Find all cards that contain a specific symbol
 */
export const findCardsContainingSymbol = (symbolId: string): string[] => {
  const symbol = SYMBOL_REGISTRY.get(symbolId);
  if (!symbol) return [];
  
  return symbol.appearances.map(appearance => appearance.cardId);
};

/**
 * Search symbols by meaning
 */
export const findSymbolsByMeaning = (meaning: string): Symbol[] => {
  const searchTerm = meaning.toLowerCase();
  return Array.from(SYMBOL_REGISTRY.values()).filter(symbol =>
    symbol.meanings.some(m => m.toLowerCase().includes(searchTerm)) ||
    symbol.description.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get symbols associated with a specific tradition
 */
export const getSymbolsByTradition = (tradition: string): Symbol[] => {
  return Array.from(SYMBOL_REGISTRY.values()).filter(symbol =>
    symbol.traditions.includes(tradition)
  );
};

/**
 * Get statistics about the symbol registry
 */
export const getRegistryStats = () => {
  const symbols = Array.from(SYMBOL_REGISTRY.values());
  const symbolsByType = symbols.reduce((acc, symbol) => {
    acc[symbol.type] = (acc[symbol.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalAppearances = symbols.reduce(
    (total, symbol) => total + symbol.appearances.length, 0
  );
  
  const uniqueCards = new Set(
    symbols.flatMap(symbol => symbol.appearances.map(app => app.cardId))
  );
  
  return {
    totalSymbols: symbols.length,
    symbolsByType,
    totalAppearances,
    uniqueCards: uniqueCards.size,
    averageAppearancesPerSymbol: totalAppearances / symbols.length
  };
};

// Common symbol collections for easy access
export const CARD_SYMBOLS = getSymbolsByType('card');
export const FIGURE_SYMBOLS = getSymbolsByType('figure');
export const ANIMAL_SYMBOLS = getSymbolsByType('animal');
export const PLANT_SYMBOLS = getSymbolsByType('plant');
export const CELESTIAL_SYMBOLS = getSymbolsByType('celestial');
export const OBJECT_SYMBOLS = getSymbolsByType('object');
export const ARCHITECTURAL_SYMBOLS = getSymbolsByType('architectural');
export const GEOMETRIC_SYMBOLS = getSymbolsByType('geometric');
export const COLOR_SYMBOLS = getSymbolsByType('color');
export const ELEMENT_SYMBOLS = getSymbolsByType('element');

// Cross-card symbol analysis
export const RECURRING_SYMBOLS = Array.from(SYMBOL_REGISTRY.values())
  .filter(symbol => symbol.appearances.length > 1)
  .sort((a, b) => b.appearances.length - a.appearances.length);

/**
 * Export current registry size for tracking progress
 */
export const CURRENT_REGISTRY_SIZE = SYMBOL_REGISTRY.size;

// Log registry stats for development
if (typeof window === 'undefined') {
  console.log('Symbol Registry Stats:', getRegistryStats());
}