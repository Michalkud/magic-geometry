import { test, expect } from '@playwright/test';

test.describe('Test Route Debug', () => {
  test('check /test route', async ({ page }) => {
    await page.goto('/test');
    await page.waitForTimeout(3000);
    
    const h1s = await page.locator('h1').allTextContents();
    console.log('Test route H1s:', h1s);
    
    const allText = await page.textContent('body');
    console.log('Test route body text:', allText?.substring(0, 200));
  });
});