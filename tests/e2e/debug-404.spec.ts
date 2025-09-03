import { test, expect } from '@playwright/test';

test.describe('404 Debug', () => {
  test('check 404 route', async ({ page }) => {
    await page.goto('/nonexistent');
    await page.waitForTimeout(2000);
    
    const h1s = await page.locator('h1').allTextContents();
    console.log('404 route H1s:', h1s);
    
    const allText = await page.textContent('body');
    console.log('404 body text:', allText);
  });
  
  test('check current pattern game route again', async ({ page }) => {
    await page.goto('/pattern-game');
    await page.waitForTimeout(2000);
    
    const allText = await page.textContent('body');
    console.log('Pattern game full body text:', JSON.stringify(allText));
    
    // Check if any divs exist
    const divs = await page.locator('div').allTextContents();
    console.log('All divs:', divs);
  });
});