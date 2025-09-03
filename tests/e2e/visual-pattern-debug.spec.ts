import { test, expect } from '@playwright/test';

test.describe('Visual Pattern Game - Debug', () => {
  test('debug component loading', async ({ page }) => {
    // Capture console logs
    const logs: string[] = [];
    page.on('console', msg => {
      logs.push(`${msg.type()}: ${msg.text()}`);
    });
    
    // Go to the page  
    await page.goto('/pattern-game');
    
    // Wait a bit for page to load
    await page.waitForTimeout(2000);
    
    // Log all console messages
    console.log('Console logs:', logs);
    
    // Take a screenshot to see what's rendered
    await page.screenshot({ path: 'debug-pattern-game.png' });
    
    // Check what's actually rendered
    const content = await page.content();
    console.log('Page content preview:', content.substring(0, 500));
    
    // Try to find any visible elements
    const headings = await page.locator('h1').allTextContents();
    console.log('H1 headings found:', headings);
  });
});