import { test, expect } from '@playwright/test';

test.describe('Assigned Symbols Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/editor');
    await page.waitForSelector('[data-testid="hotspot-canvas"]');
  });

  test('should toggle assigned symbols panel visibility', async ({ page }) => {
    // Panel should not be visible by default
    await expect(page.locator('[data-testid="assigned-symbols-panel"]')).not.toBeVisible();
    
    // Click toggle button to show panel
    await page.click('[data-testid="toggle-assigned-symbols"]');
    await expect(page.locator('[data-testid="assigned-symbols-panel"]')).toBeVisible();
    
    // Click again to hide
    await page.click('[data-testid="toggle-assigned-symbols"]');
    await expect(page.locator('[data-testid="assigned-symbols-panel"]')).not.toBeVisible();
  });

  test('should display assigned symbols for current card', async ({ page }) => {
    // Add demo hotspots with symbols
    await page.click('button:has-text("Demo")');
    
    // Open assigned symbols panel
    await page.click('[data-testid="toggle-assigned-symbols"]');
    
    // Check that assigned symbols are displayed
    const panel = page.locator('[data-testid="assigned-symbols-panel"]');
    await expect(panel).toBeVisible();
    
    // Should show the demo symbols (using correct symbol IDs)
    await expect(panel.locator('text="The Fool\'s Figure"')).toBeVisible();
    await expect(panel.locator('text="White Dog"')).toBeVisible();
    await expect(panel.locator('text="Precipice/Cliff Edge"')).toBeVisible();
  });

  test('should show count of unassigned hotspots', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw a rectangle without assigning a symbol (click and drag)
    await page.mouse.move(100, 300);
    await page.mouse.down();
    await page.mouse.move(200, 400);
    await page.mouse.up();
    
    // Open assigned symbols panel
    await page.click('[data-testid="toggle-assigned-symbols"]');
    
    // Should show unassigned count
    await expect(page.locator('[data-testid="unassigned-count"]')).toContainText('1 hotspot without symbol');
  });

  test('should select hotspot when clicking assigned symbol', async ({ page }) => {
    // Add demo hotspots
    await page.click('button:has-text("Demo")');
    
    // Open assigned symbols panel
    await page.click('[data-testid="toggle-assigned-symbols"]');
    
    // Click on an assigned symbol
    await page.click('[data-testid="assigned-symbol-fool-youth-figure"]');
    
    // Verify the hotspot is selected
    const selectedHotspot = page.locator('.hotspot-selected');
    await expect(selectedHotspot).toBeVisible();
    
    // Verify selected hotspot info is shown
    await expect(page.locator('text=Selected Hotspot')).toBeVisible();
    await expect(page.locator('text=Symbol: fool-youth-figure')).toBeVisible();
  });

  test('should remove symbol assignment', async ({ page }) => {
    // Add demo hotspots
    await page.click('button:has-text("Demo")');
    
    // Open assigned symbols panel
    await page.click('[data-testid="toggle-assigned-symbols"]');
    
    // Check initial count
    await expect(page.locator('[data-testid="assigned-symbols-panel"]')).toContainText('3 symbols assigned');
    
    // Remove a symbol assignment
    await page.click('[data-testid="remove-symbol-fool-youth-figure"]');
    
    // Verify symbol is removed
    await expect(page.locator('[data-testid="assigned-symbol-fool-youth-figure"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="assigned-symbols-panel"]')).toContainText('2 symbols assigned');
    
    // Verify unassigned count increased
    await expect(page.locator('[data-testid="unassigned-count"]')).toContainText('1 hotspot without symbol');
  });

  test('should update when switching cards', async ({ page }) => {
    // Add demo hotspots to The Fool
    await page.click('button:has-text("Demo")');
    
    // Open assigned symbols panel
    await page.click('[data-testid="toggle-assigned-symbols"]');
    
    // Verify symbols for The Fool
    await expect(page.locator('[data-testid="assigned-symbols-panel"]')).toContainText('3 symbols assigned');
    
    // Switch to The Magician
    await page.selectOption('select[aria-label="Select card"]', 'the-magician');
    
    // Panel should show no symbols for The Magician
    await expect(page.locator('[data-testid="assigned-symbols-panel"]')).toContainText('0 symbols assigned');
    await expect(page.locator('[data-testid="no-symbols-message"]')).toContainText('No symbols assigned yet');
  });

  test('should highlight multiple hotspots with same symbol', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw two rectangles
    await page.mouse.move(100, 300);
    await page.mouse.down();
    await page.mouse.move(150, 350);
    await page.mouse.up();
    
    await page.mouse.move(200, 400);
    await page.mouse.down();
    await page.mouse.move(250, 450);
    await page.mouse.up();
    
    // Assign same symbol to both
    const firstHotspot = page.locator('.hotspot-rectangle').first();
    await firstHotspot.click();
    await page.click('[data-testid="symbol-item-fool-youth-figure"]');
    
    const secondHotspot = page.locator('.hotspot-rectangle').nth(1);
    await secondHotspot.click();
    await page.click('[data-testid="symbol-item-fool-youth-figure"]');
    
    // Open assigned symbols panel
    await page.click('[data-testid="toggle-assigned-symbols"]');
    
    // Should show symbol appears in 2 hotspots
    await expect(page.locator('[data-testid="symbol-count-fool-youth-figure"]')).toContainText('(2 hotspots)');
  });

  test('should filter symbol list to show only unassigned symbols', async ({ page }) => {
    // Add demo hotspots
    await page.click('button:has-text("Demo")');
    
    // Open assigned symbols panel
    await page.click('[data-testid="toggle-assigned-symbols"]');
    
    // Toggle filter for unassigned symbols only
    await page.click('[data-testid="filter-unassigned-only"]');
    
    // Verify symbol list doesn't show already assigned symbols
    const symbolList = page.locator('[data-testid="symbol-list"]');
    await expect(symbolList.locator('[data-testid="symbol-item-fool-youth-figure"]')).not.toBeVisible();
    await expect(symbolList.locator('[data-testid="symbol-item-white-dog"]')).not.toBeVisible();
    await expect(symbolList.locator('[data-testid="symbol-item-precipice-cliff"]')).not.toBeVisible();
  });

  test('should show visual indicators for hotspots with/without symbols', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw a rectangle without symbol
    await page.mouse.move(100, 300);
    await page.mouse.down();
    await page.mouse.move(150, 350);
    await page.mouse.up();
    
    // Add demo hotspot with symbol
    await page.click('button:has-text("Demo")');
    
    // Open assigned symbols panel to enable visual mode
    await page.click('[data-testid="toggle-assigned-symbols"]');
    
    // Check for visual indicators
    const hotspotsWithSymbols = page.locator('.hotspot-has-symbol');
    const hotspotsWithoutSymbols = page.locator('.hotspot-no-symbol');
    
    await expect(hotspotsWithSymbols).toHaveCount(3); // Demo adds 3 with symbols
    await expect(hotspotsWithoutSymbols).toHaveCount(1); // We added 1 without
    
    // Verify color coding
    await expect(hotspotsWithSymbols.first()).toHaveCSS('border-color', 'rgb(34, 197, 94)'); // green-500
    await expect(hotspotsWithoutSymbols.first()).toHaveCSS('border-color', 'rgb(239, 68, 68)'); // red-500
  });
});