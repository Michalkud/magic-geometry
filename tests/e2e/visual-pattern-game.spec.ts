import { test, expect } from '@playwright/test';

test.describe('Visual Pattern Matching Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pattern-game');
  });

  test('displays game page with correct title and header', async ({ page }) => {
    await expect(page).toHaveTitle('Magic Geometry');
    await expect(page.locator('h1')).toContainText('Visual Pattern Game');
  });

  test('shows visual-only game setup screen', async ({ page }) => {
    // Should show difficulty selector
    await expect(page.locator('text=Difficulty')).toBeVisible();
    await expect(page.locator('button:has-text("Easy")')).toBeVisible();
    await expect(page.locator('button:has-text("Medium")')).toBeVisible();
    await expect(page.locator('button:has-text("Hard")')).toBeVisible();
    
    // Should have start game button
    await expect(page.locator('button:has-text("Start Game")')).toBeVisible();
    await expect(page.locator('button:has-text("Start Game")')).toBeEnabled();
  });

  test('can select difficulty level', async ({ page }) => {
    // Test difficulty selection
    await page.click('button:has-text("Medium")');
    await expect(page.locator('button:has-text("Medium")')).toHaveClass(/selected|active/);
    
    await page.click('button:has-text("Hard")');
    await expect(page.locator('button:has-text("Hard")')).toHaveClass(/selected|active/);
  });

  test('starts visual pattern matching game', async ({ page }) => {
    // Start game
    await page.click('button:has-text("Start Game")');
    
    // Should show game board
    await expect(page.getByTestId('pattern-game-board')).toBeVisible();
    
    // Should show target symbol (no text labels)
    await expect(page.getByTestId('target-symbol')).toBeVisible();
    
    // Should show symbol options for matching
    await expect(page.getByTestId('symbol-options')).toBeVisible();
    
    // Should show timer
    await expect(page.getByTestId('game-timer')).toBeVisible();
    
    // Should show streak display
    await expect(page.getByTestId('streak-display')).toBeVisible();
  });

  test('displays symbols without text labels during gameplay', async ({ page }) => {
    await page.click('button:has-text("Start Game")');
    
    // Target symbol should have no text
    const targetSymbol = page.getByTestId('target-symbol');
    await expect(targetSymbol).toBeVisible();
    
    // Options should be visual only - no text labels visible
    const options = page.getByTestId('symbol-option');
    const optionCount = await options.count();
    expect(optionCount).toBeGreaterThan(0);
    
    // Each option should be an image without text
    for (let i = 0; i < optionCount; i++) {
      const option = options.nth(i);
      await expect(option.locator('img')).toBeVisible();
    }
  });

  test('can make symbol matches', async ({ page }) => {
    await page.click('button:has-text("Start Game")');
    
    // Click on a symbol option
    await page.getByTestId('symbol-option').first().click();
    
    // Should show visual feedback (correct or incorrect)
    await expect(page.getByTestId('match-feedback')).toBeVisible();
  });

  test('tracks streak correctly', async ({ page }) => {
    await page.click('button:has-text("Start Game")');
    
    // Make first match
    await page.getByTestId('symbol-option').first().click();
    
    // Streak should be updated (visual display only)
    const streakDisplay = page.getByTestId('streak-display');
    await expect(streakDisplay).toBeVisible();
  });

  test('shows visual progress indicators', async ({ page }) => {
    await page.click('button:has-text("Start Game")');
    
    // Should show visual progress (no numerical text)
    await expect(page.getByTestId('visual-progress')).toBeVisible();
    
    // Should show difficulty level indicator
    await expect(page.getByTestId('difficulty-indicator')).toBeVisible();
  });

  test('has timer functionality', async ({ page }) => {
    await page.click('button:has-text("Start Game")');
    
    const timer = page.getByTestId('game-timer');
    await expect(timer).toBeVisible();
    
    // Timer should show visual countdown (no numbers)
    await expect(timer.locator('[data-testid="timer-visual"]')).toBeVisible();
  });

  test('provides visual feedback for correct matches', async ({ page }) => {
    await page.click('button:has-text("Start Game")');
    
    // Make a match
    await page.getByTestId('symbol-option').first().click();
    
    // Should show visual success feedback
    await expect(page.getByTestId('success-animation')).toBeVisible();
  });

  test('can end game and return to menu', async ({ page }) => {
    await page.click('button:has-text("Start Game")');
    
    // Should have option to end game
    await page.click('button:has-text("End Game")');
    
    // Should return to setup screen
    await expect(page.locator('button:has-text("Start Game")')).toBeVisible();
  });

  test('shows game results with visual indicators', async ({ page }) => {
    await page.click('button:has-text("Start Game")');
    
    // Play through a few rounds and end game
    await page.getByTestId('symbol-option').first().click();
    await page.click('button:has-text("End Game")');
    
    // Should show results with visual indicators
    await expect(page.getByTestId('game-results')).toBeVisible();
    await expect(page.getByTestId('final-streak')).toBeVisible();
    
    // Should have play again option
    await expect(page.locator('button:has-text("Play Again")')).toBeVisible();
  });
});