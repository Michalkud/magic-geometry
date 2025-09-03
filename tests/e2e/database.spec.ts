import { test, expect } from '@playwright/test';

test.describe('Database Integration', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/database');
    await page.waitForLoadState('networkidle');
  });

  test('should initialize database and display cards', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Database Integration Demo');
    
    const majorArcanaSection = page.locator('text=Major Arcana').first();
    await expect(majorArcanaSection).toBeVisible();
    
    const majorArcanaCount = await page.locator('h2:has-text("Major Arcana")').textContent();
    expect(majorArcanaCount).toContain('22');
    
    const foolCard = page.locator('text=0 The Fool').first();
    await expect(foolCard).toBeVisible();
  });

  test('should display sephirot data', async ({ page }) => {
    const sephirotSection = page.locator('text=Sephirot').first();
    await expect(sephirotSection).toBeVisible();
    
    const sephirotCount = await page.locator('h2:has-text("Sephirot")').textContent();
    expect(sephirotCount).toContain('10');
    
    const kether = page.locator('text=1 Kether').first();
    await expect(kether).toBeVisible();
    
    const malkuth = page.locator('text=10 Malkuth').first();
    await expect(malkuth).toBeVisible();
  });

  test('should display minor arcana cards', async ({ page }) => {
    const minorSection = page.locator('text=Minor Arcana').first();
    await expect(minorSection).toBeVisible();
    
    const wandsAce = page.locator('div:has-text("Wands Ace")').first();
    await expect(wandsAce).toBeVisible();
  });

  test('should show card meaning when card is selected', async ({ page }) => {
    const foolCard = page.locator('div:has-text("0 The Fool")').first();
    await foolCard.click();
    
    const meaningSection = page.locator('text=Selected Card Meaning');
    await expect(meaningSection).toBeVisible();
    
    const foolMeaning = page.locator('text=/Innocent leap.*manifestation/');
    await expect(foolMeaning).toBeVisible();
    
    const keywords = page.locator('text=Keywords:');
    await expect(keywords).toBeVisible();
  });

  test('should search cards by text', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('moon');
    
    await page.waitForTimeout(500);
    
    const moonCard = page.locator('.grid').last().locator('div:has-text("XVIII The Moon")').first();
    await expect(moonCard).toBeVisible();
  });

  test('should add custom card to database', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    
    const addButton = page.locator('button:has-text("Add Custom Card")');
    await addButton.click();
    
    await page.waitForTimeout(500);
    
    const customCard = page.locator('div').filter({ hasText: /^Custom Card$/ }).first();
    await expect(customCard).toBeVisible();
  });

  test('should search by Hebrew letter', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Aleph');
    
    await page.waitForTimeout(500);
    
    const foolCard = page.locator('.grid').last().locator('text=0 The Fool');
    await expect(foolCard).toBeVisible();
  });

  test('should search by element', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Fire');
    
    await page.waitForTimeout(500);
    
    const fireCards = page.locator('.grid').last().locator('text=Fire');
    await expect(fireCards).toBeVisible();
  });

  test('should display card with Hebrew letter and element', async ({ page }) => {
    const firstCard = page.locator('.bg-gray-700').first();
    
    const hebrewText = firstCard.locator('text=/.*א.*/');
    await expect(hebrewText).toBeVisible();
    
    const elementText = firstCard.locator('text=Air');
    await expect(elementText).toBeVisible();
  });

  test('should handle database reset', async ({ page }) => {
    let dialogHandled = false;
    
    page.on('dialog', async dialog => {
      if (dialog.message().includes('reset')) {
        dialogHandled = true;
        await dialog.dismiss();
      }
    });
    
    const resetButton = page.locator('button:has-text("Reset Database")');
    await resetButton.click();
    
    await page.waitForTimeout(500);
    expect(dialogHandled).toBe(true);
  });
});