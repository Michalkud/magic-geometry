import { test, expect } from '@playwright/test';

test.describe('Database Seeding Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have seeded all data tables', async ({ page }) => {
    // Execute database queries in browser context
    const results = await page.evaluate(async () => {
      const db = (window as any).tarotDB;
      if (!db) throw new Error('Database not found');
      
      const counts = {
        cards: await db.cards.count(),
        sephirot: await db.sephirot.count(),
        minorCards: await db.minorCards.count(),
        symbols: await db.symbols.count(),
        cardMeanings: await db.cardMeanings.count(),
        relationships: await db.relationships.count(),
        cardAppearances: await db.cardAppearances.count(),
        hotspots: await db.hotspots.count(),
        decans: await db.decans.count(),
        geometries: await db.geometries.count()
      };
      
      return counts;
    });
    
    // Verify all tables have data
    expect(results.cards).toBeGreaterThan(0);
    expect(results.sephirot).toBeGreaterThan(0);
    expect(results.minorCards).toBeGreaterThan(0);
    expect(results.symbols).toBeGreaterThan(0);
    expect(results.cardMeanings).toBeGreaterThan(0);
    expect(results.relationships).toBeGreaterThan(50); // Should have 58 relationships
    expect(results.cardAppearances).toBeGreaterThan(0);
    expect(results.hotspots).toBeGreaterThan(0);
    expect(results.decans).toBe(36); // Exactly 36 decans
    expect(results.geometries).toBeGreaterThan(0);
    
    console.log('Database seeding counts:', results);
  });

  test('should have properly seeded relationships', async ({ page }) => {
    const relationships = await page.evaluate(async () => {
      const db = (window as any).tarotDB;
      const rels = await db.relationships.toArray();
      
      // Check different relationship types
      const types = new Set(rels.map((r: any) => r.type));
      const bidirectionalCount = rels.filter((r: any) => r.bidirectional).length;
      
      return {
        total: rels.length,
        types: Array.from(types),
        bidirectionalCount,
        sample: rels[0] // Get first relationship as sample
      };
    });
    
    expect(relationships.total).toBe(58); // Exact count of relationships in data file
    expect(relationships.types).toContain('evolution');
    expect(relationships.types).toContain('mirrors');
    expect(relationships.types).toContain('opposes');
    expect(relationships.types).toContain('complements');
    expect(relationships.bidirectionalCount).toBeGreaterThan(0);
    
    // Verify relationship structure
    if (relationships.sample) {
      expect(relationships.sample).toHaveProperty('sourceId');
      expect(relationships.sample).toHaveProperty('targetId');
      expect(relationships.sample).toHaveProperty('type');
      expect(relationships.sample).toHaveProperty('strength');
      expect(relationships.sample).toHaveProperty('description');
      expect(relationships.sample).toHaveProperty('bidirectional');
    }
  });

  test('should have properly seeded card appearances', async ({ page }) => {
    const appearances = await page.evaluate(async () => {
      const db = (window as any).tarotDB;
      const apps = await db.cardAppearances.toArray();
      
      // Count RWS vs Thoth variants
      const rwsCount = apps.filter((a: any) => a.variant === 'rws').length;
      const thothCount = apps.filter((a: any) => a.variant === 'thoth').length;
      
      return {
        total: apps.length,
        rwsCount,
        thothCount,
        sample: apps[0]
      };
    });
    
    expect(appearances.total).toBeGreaterThan(0);
    expect(appearances.rwsCount).toBeGreaterThan(0);
    expect(appearances.thothCount).toBeGreaterThan(0);
    
    // Verify appearance structure
    if (appearances.sample) {
      expect(appearances.sample).toHaveProperty('symbolId');
      expect(appearances.sample).toHaveProperty('cardId');
      expect(appearances.sample).toHaveProperty('prominence');
      expect(appearances.sample).toHaveProperty('variant');
    }
  });

  test('should have enhanced major arcana with metadata', async ({ page }) => {
    const cards = await page.evaluate(async () => {
      const db = (window as any).tarotDB;
      const majorCards = await db.cards.toArray();
      
      // Check for enhanced metadata from majorsMeta
      const withPathTitles = majorCards.filter((c: any) => c.note && c.note.includes('Path'));
      const withAttribution = majorCards.filter((c: any) => 
        c.element && (c.element.includes('Mercury') || c.element.includes('Venus') || 
        c.element.includes('Jupiter') || c.element.includes('Saturn'))
      );
      
      return {
        total: majorCards.length,
        withPathTitles: withPathTitles.length,
        withAttribution: withAttribution.length,
        sample: majorCards[0]
      };
    });
    
    expect(cards.total).toBe(22); // 22 major arcana
    expect(cards.withPathTitles).toBeGreaterThan(0); // Some cards should have path titles
    expect(cards.withAttribution).toBeGreaterThan(0); // Some cards should have planetary attributions
  });
});