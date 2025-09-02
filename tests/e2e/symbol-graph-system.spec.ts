/**
 * Symbol Graph System Tests
 * Testing the comprehensive RWS symbol mapping and relationship system
 */

import { test, expect } from '@playwright/test';

test.describe('Symbol Graph System', () => {
  test('symbol registry contains expected symbols', async ({ page }) => {
    await page.goto('/');
    
    // Test that the symbol registry is accessible and contains expected symbols
    const symbolRegistrySize = await page.evaluate(async () => {
      const { SYMBOL_REGISTRY, getRegistryStats } = await import('/src/data/symbols/symbolRegistry.ts');
      const stats = getRegistryStats();
      
      return {
        totalSymbols: SYMBOL_REGISTRY.size,
        stats
      };
    });
    
    // We should have symbols from at least 5 cards (Fool, Magician, High Priestess, Empress, Death)
    expect(symbolRegistrySize.totalSymbols).toBeGreaterThan(50);
    expect(symbolRegistrySize.stats.uniqueCards).toBeGreaterThanOrEqual(5);
    
    console.log('Symbol Registry Stats:', symbolRegistrySize.stats);
  });

  test('can find specific symbols by ID', async ({ page }) => {
    await page.goto('/');
    
    const symbolTests = await page.evaluate(async () => {
      const { getSymbol } = await import('/src/data/symbols/symbolRegistry.ts');
      
      return {
        whiteRose: getSymbol('white-rose'),
        infinitySymbol: getSymbol('infinity-symbol'),
        boazPillar: getSymbol('boaz-pillar'),
        foolCard: getSymbol('card-00-the-fool')
      };
    });
    
    // Test key symbols exist
    expect(symbolTests.whiteRose).toBeTruthy();
    expect(symbolTests.whiteRose?.label).toBe('White Rose');
    expect(symbolTests.whiteRose?.type).toBe('plant');
    
    expect(symbolTests.infinitySymbol).toBeTruthy();
    expect(symbolTests.infinitySymbol?.label).toBe('Infinity Symbol (Lemniscate)');
    
    expect(symbolTests.boazPillar).toBeTruthy();
    expect(symbolTests.boazPillar?.label).toBe('Boaz Pillar (B)');
    
    expect(symbolTests.foolCard).toBeTruthy();
    expect(symbolTests.foolCard?.type).toBe('card');
  });

  test('can find symbols by type', async ({ page }) => {
    await page.goto('/');
    
    const symbolsByType = await page.evaluate(async () => {
      const { getSymbolsByType } = await import('/src/data/symbols/symbolRegistry.ts');
      
      return {
        cards: getSymbolsByType('card').length,
        figures: getSymbolsByType('figure').length,
        plants: getSymbolsByType('plant').length,
        animals: getSymbolsByType('animal').length,
        celestial: getSymbolsByType('celestial').length,
        objects: getSymbolsByType('object').length,
        architectural: getSymbolsByType('architectural').length,
        geometric: getSymbolsByType('geometric').length
      };
    });
    
    // We should have at least one of each major type
    expect(symbolsByType.cards).toBeGreaterThanOrEqual(5); // At least 5 cards
    expect(symbolsByType.figures).toBeGreaterThanOrEqual(5); // Main figures on cards
    expect(symbolsByType.plants).toBeGreaterThanOrEqual(3); // Roses, lilies, etc.
    expect(symbolsByType.objects).toBeGreaterThanOrEqual(10); // Many objects across cards
    expect(symbolsByType.architectural).toBeGreaterThanOrEqual(3); // Pillars, cliffs, etc.
    
    console.log('Symbols by type:', symbolsByType);
  });

  test('can find symbols on specific cards', async ({ page }) => {
    await page.goto('/');
    
    const cardSymbols = await page.evaluate(async () => {
      const { findSymbolsOnCard } = await import('/src/data/symbols/symbolRegistry.ts');
      
      return {
        foolSymbols: findSymbolsOnCard('card-00-the-fool').map(s => s.label),
        magicianSymbols: findSymbolsOnCard('card-01-the-magician').map(s => s.label),
        priestessSymbols: findSymbolsOnCard('card-02-the-high-priestess').map(s => s.label)
      };
    });
    
    // The Fool should contain key symbols
    expect(cardSymbols.foolSymbols).toContain('White Rose');
    expect(cardSymbols.foolSymbols).toContain('White Dog');
    expect(cardSymbols.foolSymbols).toContain('Precipice/Cliff Edge');
    
    // The Magician should contain key symbols
    expect(cardSymbols.magicianSymbols).toContain('Infinity Symbol (Lemniscate)');
    expect(cardSymbols.magicianSymbols).toContain('Red Roses');
    expect(cardSymbols.magicianSymbols).toContain('White Lilies');
    
    // The High Priestess should contain key symbols
    expect(cardSymbols.priestessSymbols).toContain('Boaz Pillar (B)');
    expect(cardSymbols.priestessSymbols).toContain('Jachin Pillar (J)');
    expect(cardSymbols.priestessSymbols).toContain('TORA Scroll');
    
    console.log('Fool symbols:', cardSymbols.foolSymbols);
  });

  test('symbol relationships work correctly', async ({ page }) => {
    await page.goto('/');
    
    const relationshipTests = await page.evaluate(async () => {
      const { getRelationshipsForSymbol, getRelationshipsByType } = await import('/src/data/symbols/relationships.ts');
      
      return {
        whiteRoseRelationships: getRelationshipsForSymbol('white-rose').length,
        containsRelationships: getRelationshipsByType('contains').length,
        opposesRelationships: getRelationshipsByType('opposes').length,
        evolutionRelationships: getRelationshipsByType('evolution').length
      };
    });
    
    // White rose should have relationships (appears on multiple cards)
    expect(relationshipTests.whiteRoseRelationships).toBeGreaterThan(0);
    
    // We should have various relationship types
    expect(relationshipTests.containsRelationships).toBeGreaterThan(0);
    expect(relationshipTests.evolutionRelationships).toBeGreaterThan(0);
    
    console.log('Relationship counts:', relationshipTests);
  });

  test('graph utilities work correctly', async ({ page }) => {
    await page.goto('/');
    
    const graphTests = await page.evaluate(async () => {
      const { getRelatedSymbols, findShortestPath, getGraphStats } = await import('/src/data/symbols/graphUtils.ts');
      
      const whiteRoseRelated = getRelatedSymbols('white-rose');
      const pathFoolToMagician = findShortestPath('card-00-the-fool', 'card-01-the-magician');
      const stats = getGraphStats();
      
      return {
        whiteRoseRelatedCount: whiteRoseRelated.length,
        foolToMagicianPath: pathFoolToMagician,
        graphStats: stats
      };
    });
    
    // White rose should have related symbols
    expect(graphTests.whiteRoseRelatedCount).toBeGreaterThan(0);
    
    // Should find path between Fool and Magician
    expect(graphTests.foolToMagicianPath).toBeTruthy();
    expect(graphTests.foolToMagicianPath?.length).toBeGreaterThanOrEqual(2);
    
    // Graph should have reasonable density
    expect(graphTests.graphStats.nodeCount).toBeGreaterThan(50);
    expect(graphTests.graphStats.edgeCount).toBeGreaterThan(20);
    expect(graphTests.graphStats.density).toBeGreaterThan(0);
    
    console.log('Graph stats:', graphTests.graphStats);
  });

  test('can search symbols by meaning', async ({ page }) => {
    await page.goto('/');
    
    const searchResults = await page.evaluate(async () => {
      const { findSymbolsByMeaning } = await import('/src/data/symbols/symbolRegistry.ts');
      
      return {
        puritySymbols: findSymbolsByMeaning('purity').map(s => s.label),
        wisdomSymbols: findSymbolsByMeaning('wisdom').map(s => s.label),
        spiritualSymbols: findSymbolsByMeaning('spiritual').map(s => s.label)
      };
    });
    
    // Should find symbols related to purity
    expect(searchResults.puritySymbols.length).toBeGreaterThan(0);
    expect(searchResults.puritySymbols).toContain('White Rose');
    
    // Should find symbols related to wisdom
    expect(searchResults.wisdomSymbols.length).toBeGreaterThan(0);
    
    // Should find symbols related to spiritual concepts
    expect(searchResults.spiritualSymbols.length).toBeGreaterThan(0);
    
    console.log('Search results:', {
      purity: searchResults.puritySymbols.length,
      wisdom: searchResults.wisdomSymbols.length,
      spiritual: searchResults.spiritualSymbols.length
    });
  });

  test('symbol importance calculation works', async ({ page }) => {
    await page.goto('/');
    
    const importanceResults = await page.evaluate(async () => {
      const { calculateSymbolImportance } = await import('/src/data/symbols/graphUtils.ts');
      
      const importance = calculateSymbolImportance(5); // 5 iterations for speed
      const topSymbols = Array.from(importance.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([id, score]) => ({ id, score }));
      
      return topSymbols;
    });
    
    // Should have calculated importance scores
    expect(importanceResults.length).toBe(10);
    expect(importanceResults[0].score).toBeGreaterThan(0);
    
    // Scores should be in descending order
    for (let i = 1; i < importanceResults.length; i++) {
      expect(importanceResults[i].score).toBeLessThanOrEqual(importanceResults[i - 1].score);
    }
    
    console.log('Top 5 most important symbols:', importanceResults.slice(0, 5));
  });

  test('symbol patterns detection works', async ({ page }) => {
    await page.goto('/');
    
    const patterns = await page.evaluate(async () => {
      const { findSymbolPatterns } = await import('/src/data/symbols/graphUtils.ts');
      
      return findSymbolPatterns();
    });
    
    // Should find common symbol patterns
    expect(patterns.length).toBeGreaterThan(0);
    expect(patterns[0].count).toBeGreaterThan(0);
    expect(patterns[0].symbols.length).toBe(2);
    
    console.log('Common symbol patterns:', patterns.slice(0, 5));
  });
});