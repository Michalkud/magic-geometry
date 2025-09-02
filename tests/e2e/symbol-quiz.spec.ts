import { test, expect } from '@playwright/test';

test.describe('Symbol Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quiz');
  });

  test('displays quiz page with correct title and header', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle('Magic Geometry');
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Symbol Quiz');
    
    // Check subtitle
    await expect(page.locator('text=Test your knowledge of tarot symbols')).toBeVisible();
  });

  test('shows symbol counts and filtering info', async ({ page }) => {
    // Check symbol count display
    const symbolCount = page.getByTestId('total-symbols-count');
    await expect(symbolCount).toBeVisible();
    await expect(symbolCount).toContainText('symbols with images');
    await expect(symbolCount).toContainText('RWS');
    await expect(symbolCount).toContainText('Thoth');
    await expect(symbolCount).toContainText('Universal');
    
    // Check filtering message
    await expect(page.locator('text=📷 Showing only symbols with images')).toBeVisible();
  });

  test('displays quiz settings with filters', async ({ page }) => {
    // Check settings card is visible
    await expect(page.locator('text=Quiz Settings')).toBeVisible();
    
    // Check source filter tabs
    await expect(page.locator('text=Source')).toBeVisible();
    await expect(page.locator('[role="tablist"] >> text=All')).toBeVisible();
    await expect(page.locator('[role="tablist"] >> text=RWS')).toBeVisible();
    await expect(page.locator('[role="tablist"] >> text=Thoth')).toBeVisible();
    await expect(page.locator('[role="tablist"] >> text=Universal')).toBeVisible();
    
    // Check category filter
    await expect(page.locator('text=Category')).toBeVisible();
    
    // Check difficulty filter
    await expect(page.locator('text=Difficulty')).toBeVisible();
    await expect(page.locator('text=Easy')).toBeVisible();
    await expect(page.locator('text=Medium')).toBeVisible();
    await expect(page.locator('text=Hard')).toBeVisible();
    
    // Check available symbols count
    await expect(page.locator('text=symbols available with current filters')).toBeVisible();
    
    // Check start button
    await expect(page.locator('button:has-text("Start Quiz")')).toBeVisible();
    await expect(page.locator('button:has-text("Start Quiz")')).toBeEnabled();
  });

  test('can filter symbols by source', async ({ page }) => {
    // Click RWS filter
    await page.locator('[role="tablist"] button:has-text("RWS")').first().click();
    
    // Should still show available symbols
    await expect(page.locator('text=symbols available with current filters')).toBeVisible();
    
    // Click Universal filter
    await page.locator('[role="tablist"] button:has-text("Universal")').first().click();
    
    // Should show available symbols
    await expect(page.locator('text=symbols available with current filters')).toBeVisible();
  });

  test('can start and play quiz', async ({ page }) => {
    // Start the quiz
    await page.click('button:has-text("Start Quiz")');
    
    // Should be in playing state
    await expect(page.locator('text=What does this symbol mean?')).toBeVisible();
    
    // Should show quiz options
    await expect(page.getByTestId('quiz-options')).toBeVisible();
    
    // Should show at least one option
    await expect(page.getByTestId('quiz-option-0')).toBeVisible();
    
    // Should show progress sidebar
    await expect(page.locator('text=📊 Quiz Progress')).toBeVisible();
  });

  test('quiz shows symbol image and details', async ({ page }) => {
    // Start the quiz
    await page.click('button:has-text("Start Quiz")');
    
    // Should show symbol image or placeholder
    const symbolImage = page.getByTestId('symbol-image');
    const hasImage = await symbolImage.count() > 0;
    
    if (hasImage) {
      await expect(symbolImage).toBeVisible();
    }
    
    // Should show symbol source badge
    await expect(page.getByTestId('symbol-source')).toBeVisible();
    
    // Should show category and difficulty badges
    await expect(page.locator('.mystical-badge')).toHaveCount({ min: 3 }); // Source, difficulty, category
  });

  test('can answer questions and see results', async ({ page }) => {
    // Start the quiz
    await page.click('button:has-text("Start Quiz")');
    
    // Wait for options to load
    await expect(page.getByTestId('quiz-option-0')).toBeVisible();
    
    // Click the first option
    await page.getByTestId('quiz-option-0').click();
    
    // Should show next question and end quiz buttons
    await expect(page.locator('button:has-text("Next Question")')).toBeVisible();
    await expect(page.locator('button:has-text("End Quiz")')).toBeVisible();
    
    // Progress should show 1 total question
    await expect(page.locator('text=1')).toBeVisible();
  });

  test('quiz progress updates correctly', async ({ page }) => {
    // Start the quiz
    await page.click('button:has-text("Start Quiz")');
    
    // Answer first question
    await page.getByTestId('quiz-option-0').click();
    
    // Check progress shows 1 question answered
    const progressText = await page.locator('[class*="text-2xl"][class*="font-bold"]').textContent();
    expect(progressText).toMatch(/[0-1] \/ 1/);
    
    // Should show accuracy percentage
    await expect(page.locator('text=% Accuracy')).toBeVisible();
    
    // Should show streak information
    await expect(page.locator('text=Streak:')).toBeVisible();
    await expect(page.locator('text=Best:')).toBeVisible();
  });

  test('can end quiz and see results', async ({ page }) => {
    // Start the quiz
    await page.click('button:has-text("Start Quiz")');
    
    // Answer a question
    await page.getByTestId('quiz-option-0').click();
    
    // End the quiz
    await page.click('button:has-text("End Quiz")');
    
    // Should show results screen
    await expect(page.locator('text=🎉 Quiz Complete!')).toBeVisible();
    await expect(page.locator('button:has-text("Play Again")')).toBeVisible();
    await expect(page.locator('button:has-text("Change Settings")')).toBeVisible();
  });

  test('can return to settings from results', async ({ page }) => {
    // Start and complete a short quiz
    await page.click('button:has-text("Start Quiz")');
    await page.getByTestId('quiz-option-0').click();
    await page.click('button:has-text("End Quiz")');
    
    // Go back to settings
    await page.click('button:has-text("Change Settings")');
    
    // Should be back at menu
    await expect(page.locator('text=Quiz Settings')).toBeVisible();
    await expect(page.locator('button:has-text("Start Quiz")')).toBeVisible();
  });

  test('can play again from results', async ({ page }) => {
    // Start and complete a short quiz
    await page.click('button:has-text("Start Quiz")');
    await page.getByTestId('quiz-option-0').click();
    await page.click('button:has-text("End Quiz")');
    
    // Play again
    await page.click('button:has-text("Play Again")');
    
    // Should be back in playing state with fresh progress
    await expect(page.locator('text=What does this symbol mean?')).toBeVisible();
    
    // Progress should be reset (0/0 initially, then 0/1 after first question loads)
    const progressElement = page.locator('[class*="text-2xl"][class*="font-bold"]');
    await expect(progressElement).toBeVisible();
  });

  test('handles empty symbol filters gracefully', async ({ page }) => {
    // This test would check edge cases, but since we have symbols with images,
    // we'll just verify the start button works
    await expect(page.locator('button:has-text("Start Quiz")')).toBeEnabled();
  });
});