import { test, expect } from '@playwright/test';

test.describe('Visual Pattern Game - Simple', () => {
  test('page loads and shows title', async ({ page }) => {
    // Capture any console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
      }
    });
    
    await page.goto('/pattern-game');
    await page.waitForTimeout(5000); // Wait for loading
    
    // Check for title
    await expect(page).toHaveTitle('Magic Geometry');
    
    // Look for our h1
    const h1Text = await page.locator('h1').first().textContent();
    console.log('H1 text found:', h1Text);
    
    // Check if loading or actual content
    const bodyText = await page.textContent('body');
    console.log('Body text length:', bodyText?.length);
    console.log('Body preview:', bodyText?.substring(0, 200));
  });
});