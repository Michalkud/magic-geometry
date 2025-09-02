/**
 * Symbol Quiz Data Configuration
 * Provides data and functions for the tarot symbol quiz
 */

import { getSymbolsWithImages, AggregatedSymbol } from './allSymbols';

export type QuizSymbol = AggregatedSymbol;

export type QuizProgress = {
  correct: number;
  total: number;
  streak: number;
  maxStreak: number;
  bySource: {
    rws: { correct: number; total: number };
    thoth: { correct: number; total: number };
    universal: { correct: number; total: number };
    meanings: { correct: number; total: number };
  };
  byCategory: Record<string, { correct: number; total: number }>;
  byDifficulty: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
};

export const getInitialProgress = (): QuizProgress => ({
  correct: 0,
  total: 0,
  streak: 0,
  maxStreak: 0,
  bySource: {
    rws: { correct: 0, total: 0 },
    thoth: { correct: 0, total: 0 },
    universal: { correct: 0, total: 0 },
    meanings: { correct: 0, total: 0 },
  },
  byCategory: {},
  byDifficulty: {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  },
});

export const updateProgress = (
  progress: QuizProgress,
  symbol: QuizSymbol,
  isCorrect: boolean
): QuizProgress => {
  const newProgress = { ...progress };
  
  // Update overall stats
  newProgress.total += 1;
  if (isCorrect) {
    newProgress.correct += 1;
    newProgress.streak += 1;
    newProgress.maxStreak = Math.max(newProgress.maxStreak, newProgress.streak);
  } else {
    newProgress.streak = 0;
  }
  
  // Update by source
  const sourceKey = symbol.source === 'meanings' ? 'universal' : symbol.source; // Map meanings to universal for stats
  if (newProgress.bySource[sourceKey as keyof typeof newProgress.bySource]) {
    newProgress.bySource[sourceKey as keyof typeof newProgress.bySource].total += 1;
    if (isCorrect) {
      newProgress.bySource[sourceKey as keyof typeof newProgress.bySource].correct += 1;
    }
  }
  
  // Update by category
  if (!newProgress.byCategory[symbol.category]) {
    newProgress.byCategory[symbol.category] = { correct: 0, total: 0 };
  }
  newProgress.byCategory[symbol.category].total += 1;
  if (isCorrect) {
    newProgress.byCategory[symbol.category].correct += 1;
  }
  
  // Update by difficulty
  newProgress.byDifficulty[symbol.difficulty].total += 1;
  if (isCorrect) {
    newProgress.byDifficulty[symbol.difficulty].correct += 1;
  }
  
  return newProgress;
};

// Get all symbols that have images (for quiz)
export const getAllSymbols = (): QuizSymbol[] => {
  return getSymbolsWithImages(); // Only returns symbols with actual images
};

// Generate multiple choice options for a symbol
export const generateQuizOptions = (
  correctSymbol: QuizSymbol,
  allSymbols: QuizSymbol[],
  numOptions: number = 4
): { text: string; isCorrect: boolean }[] => {
  const options: { text: string; isCorrect: boolean }[] = [];
  
  // Add correct answer
  options.push({
    text: correctSymbol.meaning,
    isCorrect: true,
  });
  
  // Filter out the correct symbol and get wrong answers
  const wrongSymbols = allSymbols.filter(s => s.id !== correctSymbol.id);
  
  // Shuffle and take random wrong answers
  const shuffledWrong = wrongSymbols.sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < numOptions - 1 && i < shuffledWrong.length; i++) {
    options.push({
      text: shuffledWrong[i].meaning,
      isCorrect: false,
    });
  }
  
  // Shuffle all options
  return options.sort(() => Math.random() - 0.5);
};

// Get random symbol for quiz
export const getRandomSymbol = (symbols: QuizSymbol[]): QuizSymbol => {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Filter symbols by source
export const filterSymbolsBySource = (
  symbols: QuizSymbol[],
  source: 'rws' | 'thoth' | 'universal' | 'all'
): QuizSymbol[] => {
  if (source === 'all') {
    return symbols;
  }
  return symbols.filter(symbol => symbol.source === source);
};

// Filter symbols by category
export const filterSymbolsByCategory = (
  symbols: QuizSymbol[],
  category: string
): QuizSymbol[] => {
  if (category === 'all') {
    return symbols;
  }
  return symbols.filter(symbol => symbol.category === category);
};

// Filter symbols by difficulty
export const filterSymbolsByDifficulty = (
  symbols: QuizSymbol[],
  difficulty: 'easy' | 'medium' | 'hard' | 'all'
): QuizSymbol[] => {
  if (difficulty === 'all') {
    return symbols;
  }
  return symbols.filter(symbol => symbol.difficulty === difficulty);
};

// Get available categories from symbols
export const getAvailableCategories = (symbols: QuizSymbol[]): string[] => {
  const categories = new Set(symbols.map(s => s.category));
  return ['all', ...Array.from(categories).sort()];
};

// Calculate accuracy percentage
export const getAccuracyPercentage = (correct: number, total: number): number => {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
};

export default {
  getAllSymbols,
  generateQuizOptions,
  getRandomSymbol,
  filterSymbolsBySource,
  filterSymbolsByCategory,
  filterSymbolsByDifficulty,
  getAvailableCategories,
  getInitialProgress,
  updateProgress,
  getAccuracyPercentage,
};