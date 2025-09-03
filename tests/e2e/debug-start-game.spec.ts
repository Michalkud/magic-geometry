import { test, expect } from '@playwright/test';

test.describe('Debug Start Game', () => {
  test('check start game functionality', async ({ page }) => {
    // Capture console logs
    page.on('console', msg => {
      console.log(`Console: ${msg.type()}: ${msg.text()}`);
    });
    
    await page.goto('/pattern-game');
    await page.waitForTimeout(3000);
    
    // Check if start game button exists and is clickable
    const startButton = page.locator('button:has-text("Start Game")');
    await expect(startButton).toBeVisible();
    
    console.log('Start button is visible');
    
    // Try to click it
    await startButton.click();
    
    await page.waitForTimeout(2000);
    
    // Check what happens after click
    const bodyText = await page.textContent('body');
    console.log('Body text after click:', bodyText?.substring(0, 300));
    
    // Check if we're still in setup or moved to a different state
    const isStillSetup = await page.locator('text=Game Setup').isVisible();
    console.log('Still showing Game Setup:', isStillSetup);
  });
});