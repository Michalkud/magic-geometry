import { test, expect } from '@playwright/test';

test.describe('Travel Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5180');
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('should open travel mode when Travel Mode button is clicked', async ({ page }) => {
    // Click the Travel Mode button
    await page.click('button:has-text("Travel Mode")');
    
    // Check if travel mode overlay is visible
    await expect(page.locator('[class*="fixed inset-0 z-50"]')).toBeVisible();
    
    // Check if card counter is visible (should show "1 of 22")
    await expect(page.locator('text=1 of 22')).toBeVisible();
    
    // Check if navigation hints are visible
    await expect(page.locator('text=Swipe or use arrow keys to navigate')).toBeVisible();
  });

  test('should navigate through cards using arrow keys', async ({ page }) => {
    // Open travel mode
    await page.click('button:has-text("Travel Mode")');
    
    // Wait for travel mode to open
    await expect(page.locator('text=1 of 22')).toBeVisible();
    
    // Press right arrow to go to next card
    await page.keyboard.press('ArrowRight');
    
    // Should now be on card 2
    await expect(page.locator('text=2 of 22')).toBeVisible();
    
    // Press left arrow to go back to first card
    await page.keyboard.press('ArrowLeft');
    
    // Should be back on card 1
    await expect(page.locator('text=1 of 22')).toBeVisible();
  });

  test('should navigate through cards using navigation buttons', async ({ page }) => {
    // Open travel mode
    await page.click('button:has-text("Travel Mode")');
    
    // Wait for travel mode to open
    await expect(page.locator('text=1 of 22')).toBeVisible();
    
    // Click Next button
    await page.click('button:has-text("Next")');
    
    // Should now be on card 2
    await expect(page.locator('text=2 of 22')).toBeVisible();
    
    // Click Previous button
    await page.click('button:has-text("Previous")');
    
    // Should be back on card 1
    await expect(page.locator('text=1 of 22')).toBeVisible();
  });

  test('should close travel mode when close button is clicked', async ({ page }) => {
    // Open travel mode
    await page.click('button:has-text("Travel Mode")');
    
    // Wait for travel mode to open
    await expect(page.locator('[class*="fixed inset-0 z-50"]')).toBeVisible();
    
    // Click close button (X)
    await page.click('button >> svg'); // Assuming the close button has an X icon
    
    // Travel mode should be closed
    await expect(page.locator('[class*="fixed inset-0 z-50"]')).toBeHidden();
  });

  test('should close travel mode when ESC key is pressed', async ({ page }) => {
    // Open travel mode
    await page.click('button:has-text("Travel Mode")');
    
    // Wait for travel mode to open
    await expect(page.locator('[class*="fixed inset-0 z-50"]')).toBeVisible();
    
    // Press ESC key
    await page.keyboard.press('Escape');
    
    // Travel mode should be closed
    await expect(page.locator('[class*="fixed inset-0 z-50"]')).toBeHidden();
  });

  test('should display card information correctly', async ({ page }) => {
    // Open travel mode
    await page.click('button:has-text("Travel Mode")');
    
    // Wait for travel mode to open and check if first card info is displayed
    await expect(page.locator('text=1 of 22')).toBeVisible();
    
    // Should show card image (check for any img tag within the travel mode)
    await expect(page.locator('.fixed.inset-0 img').first()).toBeVisible();
    
    // Should show Path Connection section
    await expect(page.locator('text=Path Connection')).toBeVisible();
    
    // Should show Meaning section
    await expect(page.locator('text=Meaning')).toBeVisible();
    
    // Should show Key Symbols
    await expect(page.locator('text=Key Symbols')).toBeVisible();
  });

  test('should wrap around from last to first card', async ({ page }) => {
    // Open travel mode
    await page.click('button:has-text("Travel Mode")');
    
    // Navigate to the last card (assuming 22 cards total)
    for (let i = 0; i < 21; i++) {
      await page.keyboard.press('ArrowRight');
    }
    
    // Should be on the last card
    await expect(page.locator('text=22 of 22')).toBeVisible();
    
    // Press right arrow once more to wrap around
    await page.keyboard.press('ArrowRight');
    
    // Should be back on the first card
    await expect(page.locator('text=1 of 22')).toBeVisible();
  });

  test('should show mystical styling and themes', async ({ page }) => {
    // Open travel mode
    await page.click('button:has-text("Travel Mode")');
    
    // Check for mystical styling elements specifically in travel mode
    await expect(page.locator('.fixed.inset-0 [class*="mystical-glow"]').first()).toBeVisible();
    
    // Check for amber colors in travel mode card title
    const styles = await page.locator('.fixed.inset-0 h1').first().getAttribute('class');
    expect(styles).toContain('amber');
  });
});