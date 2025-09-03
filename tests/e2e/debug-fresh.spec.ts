import { test, expect } from '@playwright/test';

test.describe('Fresh Debug Test', () => {
  test.use({
    // Force fresh context for each test
    contextOptions: {
      ignoreHTTPSErrors: true,
    }
  });

  test('check modified symbols route with fresh browser', async ({ page }) => {
    // Clear any existing cache
    await page.context().clearCookies();
    
    await page.goto('/symbols', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const h1s = await page.locator('h1').allTextContents();
    console.log('Fresh symbols route H1s:', h1s);
    
    const allText = await page.textContent('body');
    console.log('Symbols body text:', allText?.substring(0, 200));
  });
  
  test('check test route with fresh browser', async ({ page }) => {
    await page.context().clearCookies();
    
    await page.goto('/test', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const h1s = await page.locator('h1').allTextContents();
    console.log('Fresh test route H1s:', h1s);
    
    const allText = await page.textContent('body');
    console.log('Test body text:', allText?.substring(0, 200));
  });
});