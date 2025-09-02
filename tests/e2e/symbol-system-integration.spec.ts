/**
 * Symbol System Integration Tests
 * Tests the symbol system through the actual web interface
 */

import { test, expect } from '@playwright/test';

test.describe('Symbol System Integration', () => {
  test('symbol demo page loads and displays statistics', async ({ page }) => {
    await page.goto('/symbols');
    
    // Wait for the page to load
    await page.waitForSelector('h1:has-text("RWS Symbol Graph System")', { timeout: 10000 });
    
    // Check that main heading is visible
    await expect(page.locator('h1')).toContainText('RWS Symbol Graph System');
    
    // Check that statistics are displayed
    await expect(page.locator('text=Registry Stats')).toBeVisible();
    await expect(page.locator('text=Graph Stats')).toBeVisible();
    await expect(page.locator('text=Symbol Types')).toBeVisible();
    
    // Check that key statistics are present
    await expect(page.locator('text=Total Symbols:')).toBeVisible();
    await expect(page.locator('text=Unique Cards:')).toBeVisible();
    await expect(page.locator('text=Nodes:')).toBeVisible();
    await expect(page.locator('text=Edges:')).toBeVisible();
    
    // Take a screenshot for verification
    await page.screenshot({ path: '.playwright-mcp/symbol-system-overview.png' });
  });

  test('can search for symbols by meaning', async ({ page }) => {
    await page.goto('/symbols');
    
    // Wait for page to load
    await page.waitForSelector('input[placeholder*="Search symbols"]');
    
    // Search for "purity" 
    await page.fill('input[placeholder*="Search symbols"]', 'purity');
    
    // Wait for search results
    await page.waitForSelector('text=White Rose', { timeout: 5000 });
    
    // Should find the white rose symbol
    await expect(page.locator('text=White Rose')).toBeVisible();
    
    // Click on white rose to select it
    await page.click('text=White Rose');
    
    // Should show symbol details
    await expect(page.locator('h2:has-text("White Rose")')).toBeVisible();
    await expect(page.locator('text=plant')).toBeVisible();
    
    // Take a screenshot of symbol search
    await page.screenshot({ path: '.playwright-mcp/symbol-search.png' });
  });

  test('can explore symbols on different cards', async ({ page }) => {
    await page.goto('/symbols');
    
    // Wait for page to load
    await page.waitForSelector('select');
    
    // Select The Magician card
    await page.selectOption('select', 'card-01-the-magician');
    
    // Should show symbols for The Magician
    await expect(page.locator('text=Infinity Symbol')).toBeVisible();
    await expect(page.locator('text=Red Roses')).toBeVisible();
    
    // Click on infinity symbol
    await page.click('text=Infinity Symbol');
    
    // Should show symbol details
    await expect(page.locator('h2:has-text("Infinity Symbol")')).toBeVisible();
    await expect(page.locator('text=geometric')).toBeVisible();
    
    // Should show related symbols
    await expect(page.locator('text=Related Symbols')).toBeVisible();
    
    // Take a screenshot of card exploration
    await page.screenshot({ path: '.playwright-mcp/card-exploration.png' });
  });

  test('displays symbol relationships', async ({ page }) => {
    await page.goto('/symbols');
    
    // Wait for page to load and search for a symbol with relationships
    await page.waitForSelector('input[placeholder*="Search symbols"]');
    await page.fill('input[placeholder*="Search symbols"]', 'white');
    
    // Click on white rose
    await page.waitForSelector('text=White Rose');
    await page.click('text=White Rose');
    
    // Check that symbol details are shown
    await expect(page.locator('h2:has-text("White Rose")')).toBeVisible();
    
    // Check meanings are displayed
    await expect(page.locator('text=Meanings:')).toBeVisible();
    await expect(page.locator('text=purity')).toBeVisible();
    
    // Check traditions are displayed  
    await expect(page.locator('text=Traditions:')).toBeVisible();
    
    // Check appearances are shown
    await expect(page.locator('text=Appears on')).toBeVisible();
    await expect(page.locator('text=card(s):')).toBeVisible();
    
    // Take a screenshot of symbol relationships
    await page.screenshot({ path: '.playwright-mcp/symbol-relationships.png' });
  });

  test('validates key symbols exist in registry', async ({ page }) => {
    await page.goto('/symbols');
    
    // Search for each key symbol and verify it exists
    const keySymbols = [
      'white rose',
      'infinity',
      'pillar',
      'death',
      'magician'
    ];
    
    for (const symbolTerm of keySymbols) {
      await page.fill('input[placeholder*="Search symbols"]', symbolTerm);
      await page.waitForTimeout(500); // Allow search to complete
      
      // Should find at least one result
      const hasResults = await page.locator('[class*="bg-black/30"]').count() > 0;
      expect(hasResults).toBeTruthy(`No results found for "${symbolTerm}"`);
      
      // Clear search
      await page.fill('input[placeholder*="Search symbols"]', '');
      await page.waitForTimeout(300);
    }
  });

  test('symbol type counts are reasonable', async ({ page }) => {
    await page.goto('/symbols');
    
    // Wait for statistics to load
    await page.waitForSelector('text=Symbol Types');
    
    // Extract symbol type counts using JavaScript
    const symbolTypes = await page.evaluate(() => {
      const elements = document.querySelectorAll('[class*="text-blue-300"]');
      const counts: Record<string, number> = {};
      
      elements.forEach(el => {
        const parent = el.parentElement;
        if (parent && parent.textContent) {
          const text = parent.textContent;
          const match = text.match(/(\w+):\s*(\d+)/);
          if (match) {
            counts[match[1]] = parseInt(match[2]);
          }
        }
      });
      
      return counts;
    });
    
    // Validate we have reasonable symbol counts
    expect(Object.keys(symbolTypes).length).toBeGreaterThan(5); // At least 6 symbol types
    expect(symbolTypes.card || 0).toBeGreaterThanOrEqual(5); // At least 5 cards
    expect(symbolTypes.object || 0).toBeGreaterThanOrEqual(10); // At least 10 objects
    expect(symbolTypes.plant || 0).toBeGreaterThanOrEqual(3); // At least 3 plants
    
    console.log('Symbol type counts:', symbolTypes);
  });

  test('page performance is acceptable', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/symbols');
    await page.waitForSelector('h1:has-text("RWS Symbol Graph System")');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Test search performance
    const searchStartTime = Date.now();
    await page.fill('input[placeholder*="Search symbols"]', 'spiritual');
    await page.waitForSelector('[class*="bg-black/30"]', { timeout: 2000 });
    
    const searchTime = Date.now() - searchStartTime;
    expect(searchTime).toBeLessThan(1000); // Search should be fast
    
    console.log(`Page load time: ${loadTime}ms, Search time: ${searchTime}ms`);
  });
});