import { test, expect } from '@playwright/test';

test.describe('Quick Test', () => {
  test('should load editor page and show demo', async ({ page }) => {
    await page.goto('http://localhost:5173/editor');
    
    // Check page loaded
    await expect(page.locator('h1:has-text("Symbol Hotspot Editor")')).toBeVisible();
    
    // Click Demo button to add hotspots
    await page.click('button:has-text("Demo")');
    
    // Click toggle button
    const toggleButton = page.locator('[data-testid="toggle-assigned-symbols"]');
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();
    
    // Check panel is visible
    const panel = page.locator('[data-testid="assigned-symbols-panel"]');
    await expect(panel).toBeVisible();
    
    // Check that it shows assigned symbols count
    await expect(panel).toContainText('symbols assigned');
    
    // Check specific demo symbols (checking for IDs in the DOM)
    const foolFigure = panel.locator('[data-testid="assigned-symbol-the-fool-figure"]');
    const whiteDog = panel.locator('[data-testid="assigned-symbol-white-dog"]');
    const cliffEdge = panel.locator('[data-testid="assigned-symbol-cliff-edge"]');
    
    console.log('Checking for demo symbols...');
    const foolVisible = await foolFigure.isVisible().catch(() => false);
    const dogVisible = await whiteDog.isVisible().catch(() => false);
    const cliffVisible = await cliffEdge.isVisible().catch(() => false);
    
    console.log('Fool figure visible:', foolVisible);
    console.log('White dog visible:', dogVisible);
    console.log('Cliff edge visible:', cliffVisible);
    
    // Get actual text content to debug
    const panelText = await panel.textContent();
    console.log('Panel text content:', panelText);
  });
});