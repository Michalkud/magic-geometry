import { test, expect } from '@playwright/test';

test.describe('Route Debug', () => {
  test('check root route works', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    const h1s = await page.locator('h1').allTextContents();
    console.log('Root route H1s:', h1s);
  });
  
  test('check symbols route works', async ({ page }) => {
    await page.goto('/symbols');
    await page.waitForTimeout(2000);
    
    const h1s = await page.locator('h1').allTextContents();
    console.log('Symbols route H1s:', h1s);
  });
  
  test('check pattern-game route works', async ({ page }) => {
    await page.goto('/pattern-game');
    await page.waitForTimeout(2000);
    
    const h1s = await page.locator('h1').allTextContents();
    console.log('Pattern game route H1s:', h1s);
    
    // Also check for any text content
    const allText = await page.textContent('body');
    console.log('Pattern game body text length:', allText?.length || 0);
  });
});