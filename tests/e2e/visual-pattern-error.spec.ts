import { test, expect } from '@playwright/test';

test.describe('Visual Pattern Game - Error Check', () => {
  test('check for JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    
    // Capture all types of console messages
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console Error:', msg.text());
        errors.push(msg.text());
      }
    });
    
    // Capture page errors
    page.on('pageerror', error => {
      console.log('❌ Page Error:', error.message);
      errors.push(error.message);
    });
    
    // Go to page
    await page.goto('/pattern-game');
    
    // Wait for React to load
    await page.waitForTimeout(3000);
    
    // Check if any content is rendered
    const bodyText = await page.textContent('body');
    console.log('Body text:', bodyText?.substring(0, 200));
    
    // Look for loading text
    const loadingText = await page.getByText('Loading').first().isVisible().catch(() => false);
    console.log('Loading text visible:', loadingText);
    
    // Check for any divs
    const divCount = await page.locator('div').count();
    console.log('Div count:', divCount);
    
    console.log('Total errors found:', errors.length);
    if (errors.length > 0) {
      console.log('Errors:', errors);
    }
  });
});