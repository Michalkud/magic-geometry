/**
 * Symbol Aggregator - Combines all symbol sources
 * Merges RWS symbols, Thoth symbols, Universal symbols, and other sources
 * into a unified format for the quiz
 */

import { RWS_CARD_SYMBOLS, RWSCardSymbol } from './rwsCardSymbols';
import { CARD_SYMBOLS, CardSymbol } from './cardSymbols';
import { UNIVERSAL_SYMBOLS, UniversalSymbol } from './universalSymbols';
import { CARD_MEANINGS } from './cardMeanings';

export type AggregatedSymbol = {
  id: string;
  label: string;
  meaning: string;
  category: 'animal' | 'celestial' | 'plant' | 'object' | 'figure' | 'architectural' | 'geometric' | 'religious' | 'universal' | 'nature';
  cardId?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  source: 'rws' | 'thoth' | 'universal' | 'meanings';
  x?: number;
  y?: number;
  cards?: string[];
};

// Convert RWS symbols to aggregated format
const convertRWSSymbols = (): AggregatedSymbol[] => {
  const symbols: AggregatedSymbol[] = [];
  
  Object.entries(RWS_CARD_SYMBOLS).forEach(([cardId, cardSymbols]) => {
    cardSymbols.forEach((symbol: RWSCardSymbol) => {
      symbols.push({
        id: `rws-${symbol.id}`,
        label: symbol.label,
        meaning: symbol.meaning,
        category: symbol.category,
        cardId: cardId,
        difficulty: getDifficultyFromCategory(symbol.category),
        source: 'rws',
        x: symbol.x,
        y: symbol.y,
      });
    });
  });
  
  return symbols;
};

// Convert Thoth symbols to aggregated format
const convertThothSymbols = (): AggregatedSymbol[] => {
  const symbols: AggregatedSymbol[] = [];
  
  Object.entries(CARD_SYMBOLS).forEach(([cardId, cardSymbols]) => {
    cardSymbols.forEach((symbol: CardSymbol) => {
      symbols.push({
        id: `thoth-${symbol.id}`,
        label: symbol.label,
        meaning: symbol.meaning,
        category: mapThothCategory(symbol.category),
        cardId: cardId,
        difficulty: getDifficultyFromCategory(mapThothCategory(symbol.category)),
        source: 'thoth',
        x: symbol.x,
        y: symbol.y,
      });
    });
  });
  
  return symbols;
};

// Convert Universal symbols to aggregated format
const convertUniversalSymbols = (): AggregatedSymbol[] => {
  return UNIVERSAL_SYMBOLS.map((symbol: UniversalSymbol) => ({
    id: `universal-${symbol.id}`,
    label: symbol.label,
    meaning: symbol.meaning,
    category: symbol.category,
    difficulty: symbol.difficulty,
    source: 'universal',
    x: symbol.x,
    y: symbol.y,
    cards: symbol.cards,
  }));
};

// Extract symbols from card meanings
const extractMeaningSymbols = (): AggregatedSymbol[] => {
  const symbols: AggregatedSymbol[] = [];
  
  Object.entries(CARD_MEANINGS).forEach(([cardId, cardMeaning]) => {
    if (cardMeaning.symbolDetails) {
      cardMeaning.symbolDetails.forEach((symbolDetail, index) => {
        symbols.push({
          id: `meaning-${cardId}-${index}`,
          label: symbolDetail.name,
          meaning: symbolDetail.note,
          category: 'object', // Default category for meaning symbols
          cardId: cardId,
          difficulty: 'medium',
          source: 'meanings',
        });
      });
    }
  });
  
  return symbols;
};

// Map Thoth categories to standard categories
const mapThothCategory = (thothCategory: string): AggregatedSymbol['category'] => {
  const categoryMap: Record<string, AggregatedSymbol['category']> = {
    'mythic': 'figure',
    'alchemical': 'object',
    'kabbalah': 'religious',
    'geometry': 'geometric',
    'animal': 'animal',
    'celestial': 'celestial',
    'object': 'object',
    'figure': 'figure',
  };
  
  return categoryMap[thothCategory] || 'object';
};

// Get difficulty based on category
const getDifficultyFromCategory = (category: string): 'easy' | 'medium' | 'hard' => {
  const difficultyMap: Record<string, 'easy' | 'medium' | 'hard'> = {
    'celestial': 'easy',
    'animal': 'easy',
    'object': 'easy',
    'plant': 'easy',
    'nature': 'easy',
    'figure': 'medium',
    'architectural': 'medium',
    'universal': 'medium',
    'geometric': 'hard',
    'religious': 'hard',
  };
  
  return difficultyMap[category] || 'medium';
};

// Remove duplicate symbols based on similar meanings or labels
const deduplicateSymbols = (symbols: AggregatedSymbol[]): AggregatedSymbol[] => {
  const seen = new Set<string>();
  const deduplicated: AggregatedSymbol[] = [];
  
  for (const symbol of symbols) {
    // Create a key based on normalized label for deduplication
    const normalizedLabel = symbol.label.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace(/the|a|an/g, '');
    
    if (!seen.has(normalizedLabel)) {
      seen.add(normalizedLabel);
      deduplicated.push(symbol);
    }
  }
  
  return deduplicated;
};

// Main function to get all aggregated symbols
export const getAllAggregatedSymbols = (): AggregatedSymbol[] => {
  const rwsSymbols = convertRWSSymbols();
  const thothSymbols = convertThothSymbols();
  const universalSymbols = convertUniversalSymbols();
  const meaningSymbols = extractMeaningSymbols();
  
  const allSymbols = [
    ...rwsSymbols,
    ...thothSymbols,
    ...universalSymbols,
    ...meaningSymbols,
  ];
  
  return deduplicateSymbols(allSymbols);
};

// Filter symbols by source
export const getSymbolsBySource = (source: 'rws' | 'thoth' | 'universal' | 'all'): AggregatedSymbol[] => {
  const allSymbols = getAllAggregatedSymbols();
  
  if (source === 'all') {
    return allSymbols;
  }
  
  return allSymbols.filter(symbol => symbol.source === source);
};

// Filter symbols by category
export const getSymbolsByCategory = (
  category: string, 
  source: 'rws' | 'thoth' | 'universal' | 'all' = 'all'
): AggregatedSymbol[] => {
  const symbols = getSymbolsBySource(source);
  
  if (category === 'all') {
    return symbols;
  }
  
  return symbols.filter(symbol => symbol.category === category);
};

// Filter symbols by difficulty
export const getSymbolsByDifficulty = (
  difficulty: 'easy' | 'medium' | 'hard' | 'all',
  source: 'rws' | 'thoth' | 'universal' | 'all' = 'all'
): AggregatedSymbol[] => {
  const symbols = getSymbolsBySource(source);
  
  if (difficulty === 'all') {
    return symbols;
  }
  
  return symbols.filter(symbol => symbol.difficulty === difficulty);
};

// Available symbol images mapping
export const AVAILABLE_IMAGES: Record<string, string> = {
  // Original symbols
  'cliff-edge': '/symbols/cliff-edge.png',
  'white-dog': '/symbols/white-dog.png',
  'white-rose': '/symbols/white-rose.png',
  'green-child': '/symbols/green-child.png',
  
  // Cropped Occultissimo symbols (individual symbols extracted from cards)
  'moon-symbol': '/symbols/cropped/moon.jpg',
  'moon': '/symbols/cropped/moon.jpg',
  'pillars-temple': '/symbols/cropped/pillars.jpg',
  'pillars': '/symbols/cropped/pillars.jpg',
  'temple': '/symbols/cropped/pillars.jpg',
  'snake-serpent': '/symbols/cropped/snake.jpg',
  'snake': '/symbols/cropped/snake.jpg',
  'serpent': '/symbols/cropped/snake.jpg',
  'sphinx': '/symbols/cropped/sphinx-left.jpg',
  'castle': '/symbols/cropped/castle.jpg',
  'city': '/symbols/cropped/castle.jpg',
  'grapes': '/symbols/cropped/grapes.jpg',
  'ivy-leaves': '/symbols/cropped/grapes.jpg',
  'horses': '/symbols/cropped/horse.jpg',
  'horse': '/symbols/cropped/horse.jpg',
  'lemniscate': '/symbols/cropped/lemniscate.jpg',
  'infinity': '/symbols/cropped/lemniscate.jpg',
  'infinity-symbol': '/symbols/cropped/lemniscate.jpg',
  'white-lilies': '/symbols/cropped/lilies.jpg',
  'lilies': '/symbols/cropped/lilies.jpg',
  'lily': '/symbols/cropped/lilies.jpg',
  
  // RWS symbols that match available images
  'rws-cliff-edge': '/symbols/cliff-edge.png',
  'rws-white-dog': '/symbols/white-dog.png', 
  'rws-white-rose': '/symbols/white-rose.png',
  'rws-moon-symbol': '/symbols/cropped/moon.jpg',
  'rws-snake-serpent': '/symbols/cropped/snake.jpg',
  'rws-grapes': '/symbols/cropped/grapes.jpg',
  'rws-horses': '/symbols/cropped/horse.jpg',
  'rws-lemniscate': '/symbols/cropped/lemniscate.jpg',
  'rws-white-lilies': '/symbols/cropped/lilies.jpg',
  
  // Universal symbols that match images
  'universal-moon-symbol': '/symbols/cropped/moon.jpg',
  'universal-snake-serpent': '/symbols/cropped/snake.jpg',
  'universal-grapes': '/symbols/cropped/grapes.jpg',
  'universal-horses': '/symbols/cropped/horse.jpg',
  'universal-lemniscate': '/symbols/cropped/lemniscate.jpg',
  'universal-sphinx': '/symbols/cropped/sphinx-left.jpg',
  'universal-castle': '/symbols/cropped/castle.jpg',
  'universal-white-lilies': '/symbols/cropped/lilies.jpg',
  'universal-pillars-temple': '/symbols/cropped/pillars.jpg',
  
  // Label-based matching
  'cliff edge': '/symbols/cliff-edge.png',
  'white dog': '/symbols/white-dog.png',
  'white rose': '/symbols/white-rose.png',
  'green child': '/symbols/green-child.png',
  'crescent moon': '/symbols/cropped/moon.jpg',
  'sacred serpent': '/symbols/cropped/snake.jpg',
  'bunches of grapes': '/symbols/cropped/grapes.jpg',
  'infinity symbol (lemniscate)': '/symbols/cropped/lemniscate.jpg',
};

// Check if symbol has available image
export const hasAvailableImage = (symbol: AggregatedSymbol): boolean => {
  // Check by ID
  if (AVAILABLE_IMAGES[symbol.id]) return true;
  
  // Check by label
  const labelKey = symbol.label.toLowerCase().replace(/\s+/g, '-');
  if (AVAILABLE_IMAGES[labelKey]) return true;
  
  // Check by label with spaces
  if (AVAILABLE_IMAGES[symbol.label.toLowerCase()]) return true;
  
  // For RWS symbols, also try without the rws- prefix
  if (symbol.id.startsWith('rws-')) {
    const baseId = symbol.id.replace('rws-', '');
    if (AVAILABLE_IMAGES[baseId]) return true;
  }
  
  return false;
};

// Get only symbols that have available images
export const getSymbolsWithImages = (): AggregatedSymbol[] => {
  const allSymbols = getAllAggregatedSymbols();
  return allSymbols.filter(hasAvailableImage);
};

// Get symbol counts by source
export const getSymbolCounts = () => {
  const allSymbols = getAllAggregatedSymbols();
  const withImages = getSymbolsWithImages();
  
  return {
    total: allSymbols.length,
    withImages: withImages.length,
    rws: allSymbols.filter(s => s.source === 'rws').length,
    thoth: allSymbols.filter(s => s.source === 'thoth').length,
    universal: allSymbols.filter(s => s.source === 'universal').length,
    meanings: allSymbols.filter(s => s.source === 'meanings').length,
  };
};

// Get all available categories
export const getAllCategories = (): string[] => {
  const allSymbols = getAllAggregatedSymbols();
  const categories = new Set(allSymbols.map(symbol => symbol.category));
  
  return ['all', ...Array.from(categories).sort()];
};

export default { 
  getAllAggregatedSymbols,
  getSymbolsBySource,
  getSymbolsByCategory,
  getSymbolsByDifficulty,
  getSymbolCounts,
  getAllCategories,
  getSymbolsWithImages,
  hasAvailableImage,
};