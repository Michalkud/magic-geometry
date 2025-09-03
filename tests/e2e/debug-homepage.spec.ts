import { test, expect } from '@playwright/test';

test.describe('Homepage Debug Test', () => {
  test('check if homepage modification takes effect', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const h1s = await page.locator('h1').allTextContents();
    console.log('Homepage H1s:', h1s);
    
    // This should be "HOMEPAGE COMPLETELY MODIFIED" if our changes work
    const allText = await page.textContent('body');
    console.log('Homepage body text:', allText?.substring(0, 200));
  });
});