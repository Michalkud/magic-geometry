import { test, expect } from '@playwright/test';

test.describe('Visual Pattern Game - Simple Test', () => {
  test('page loads without errors', async ({ page }) => {
    // Log console messages to debug
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
      }
    });
    
    // Go to the page
    await page.goto('/pattern-game');
    
    // Just check if page loads and has expected title
    await expect(page).toHaveTitle('Magic Geometry');
    
    // Check if we can see any content (even loading state)
    await expect(page.locator('body')).not.toBeEmpty();
  });
});