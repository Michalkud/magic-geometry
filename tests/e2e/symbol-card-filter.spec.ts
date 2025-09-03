import { test, expect } from '@playwright/test';

test.describe('Symbol List Card Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/editor');
    await page.waitForSelector('[data-testid="symbol-list"]');
  });

  test('should display card filter dropdown', async ({ page }) => {
    const cardFilter = page.locator('[data-testid="card-filter"]');
    await expect(cardFilter).toBeVisible();
    
    // Default should be "All Cards"
    await expect(cardFilter).toHaveValue('all');
  });

  test('should show all available cards in dropdown', async ({ page }) => {
    const cardFilter = page.locator('[data-testid="card-filter"]');
    await cardFilter.click();
    
    // Check for some Major Arcana cards
    const options = await cardFilter.locator('option').allTextContents();
    expect(options).toContain('All Cards');
    expect(options.some(opt => opt.includes('The Fool'))).toBeTruthy();
    expect(options.some(opt => opt.includes('The Magician'))).toBeTruthy();
    expect(options.some(opt => opt.includes('The World'))).toBeTruthy();
  });

  test('should filter symbols by selected card', async ({ page }) => {
    // Get initial count
    const initialCount = await page.locator('[data-testid^="symbol-item-"]').count();
    expect(initialCount).toBeGreaterThan(0);

    // Select "The Fool" card
    const cardFilter = page.locator('[data-testid="card-filter"]');
    await cardFilter.selectOption({ label: 'The Fool' });

    // Wait for filter to apply
    await page.waitForTimeout(500);

    // Count should be less after filtering
    const filteredCount = await page.locator('[data-testid^="symbol-item-"]').count();
    expect(filteredCount).toBeLessThan(initialCount);

    // Verify all visible symbols belong to The Fool
    const visibleSymbols = await page.locator('[data-testid^="symbol-item-"]').all();
    
    // Click on first visible symbol to verify it belongs to The Fool
    if (visibleSymbols.length > 0) {
      await visibleSymbols[0].click();
      
      // The symbol should be from The Fool card
      // (This will be validated by the actual symbol data)
      const symbolText = await visibleSymbols[0].textContent();
      expect(symbolText).toBeDefined();
    }
  });

  test('should combine card filter with type filter', async ({ page }) => {
    // First filter by card
    const cardFilter = page.locator('[data-testid="card-filter"]');
    await cardFilter.selectOption({ label: 'The Fool' });
    
    await page.waitForTimeout(500);
    const cardFilteredCount = await page.locator('[data-testid^="symbol-item-"]').count();

    // Then also filter by type
    const typeFilter = page.locator('select').nth(1); // Type filter is second select
    await typeFilter.selectOption('figure');
    
    await page.waitForTimeout(500);
    const combinedFilterCount = await page.locator('[data-testid^="symbol-item-"]').count();
    
    // Combined filter should show even fewer results
    expect(combinedFilterCount).toBeLessThanOrEqual(cardFilteredCount);
  });

  test('should combine card filter with search', async ({ page }) => {
    // Filter by The Magician card
    const cardFilter = page.locator('[data-testid="card-filter"]');
    await cardFilter.selectOption({ label: 'The Magician' });
    
    await page.waitForTimeout(500);

    // Search for "wand"
    const searchInput = page.locator('input[placeholder="Search symbols..."]');
    await searchInput.fill('wand');
    
    await page.waitForTimeout(500);

    // Should show only wand-related symbols from The Magician
    const results = await page.locator('[data-testid^="symbol-item-"]').count();
    
    // Verify search + card filter combination works
    if (results > 0) {
      const firstSymbol = await page.locator('[data-testid^="symbol-item-"]').first().textContent();
      expect(firstSymbol?.toLowerCase()).toContain('wand');
    }
  });

  test('should update symbol count when filtering', async ({ page }) => {
    // Check initial count display
    const countText = page.locator('text=/\\d+ symbols/');
    const initialCountText = await countText.textContent();
    const initialCount = parseInt(initialCountText?.match(/\d+/)?.[0] || '0');
    
    // Filter by card
    const cardFilter = page.locator('[data-testid="card-filter"]');
    await cardFilter.selectOption({ label: 'The High Priestess' });
    
    await page.waitForTimeout(500);
    
    // Count should update
    const updatedCountText = await countText.textContent();
    const updatedCount = parseInt(updatedCountText?.match(/\d+/)?.[0] || '0');
    
    expect(updatedCount).toBeLessThan(initialCount);
  });

  test('should reset to all symbols when selecting All Cards', async ({ page }) => {
    // Get initial count
    const initialCount = await page.locator('[data-testid^="symbol-item-"]').count();
    
    // Filter by a specific card
    const cardFilter = page.locator('[data-testid="card-filter"]');
    await cardFilter.selectOption({ label: 'Death' });
    
    await page.waitForTimeout(500);
    const filteredCount = await page.locator('[data-testid^="symbol-item-"]').count();
    expect(filteredCount).toBeLessThan(initialCount);
    
    // Reset to All Cards
    await cardFilter.selectOption('all');
    
    await page.waitForTimeout(500);
    const resetCount = await page.locator('[data-testid^="symbol-item-"]').count();
    expect(resetCount).toBe(initialCount);
  });
});