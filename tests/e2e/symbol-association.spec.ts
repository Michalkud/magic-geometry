import { test, expect } from '@playwright/test';

test.describe('Symbol Association Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/association');
  });

  test('displays page with card selector', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Symbol Association');
    await expect(page.locator('select[data-testid="card-selector"]')).toBeVisible();
    await expect(page.locator('[data-testid="association-canvas"]')).toBeVisible();
  });

  test('displays card in center of canvas', async ({ page }) => {
    await expect(page.locator('[data-testid="card-image"]')).toBeVisible();
    const canvas = page.locator('[data-testid="association-canvas"]');
    const card = page.locator('[data-testid="card-image"]');
    
    const canvasBox = await canvas.boundingBox();
    const cardBox = await card.boundingBox();
    
    if (canvasBox && cardBox) {
      const canvasCenterX = canvasBox.x + canvasBox.width / 2;
      const cardCenterX = cardBox.x + cardBox.width / 2;
      expect(Math.abs(canvasCenterX - cardCenterX)).toBeLessThan(50);
    }
  });

  test('displays symbol modals in circular formation', async ({ page }) => {
    await page.selectOption('[data-testid="card-selector"]', 'the-fool');
    await page.waitForSelector('[data-testid="symbol-modal"]');
    
    const modals = page.locator('[data-testid="symbol-modal"]');
    const count = await modals.count();
    expect(count).toBeGreaterThan(0);
    
    // Check that modals are visible and contain symbol info
    const firstModal = modals.first();
    await expect(firstModal.locator('[data-testid="symbol-name"]')).toBeVisible();
    await expect(firstModal.locator('[data-testid="symbol-description"]')).toBeVisible();
  });

  test('can draw arrow from modal to card', async ({ page }) => {
    await page.selectOption('[data-testid="card-selector"]', 'the-fool');
    await page.waitForSelector('[data-testid="symbol-modal"]');
    
    const modal = page.locator('[data-testid="symbol-modal"]').first();
    const card = page.locator('[data-testid="card-image"]');
    
    // Start drag from modal
    const modalBox = await modal.boundingBox();
    const cardBox = await card.boundingBox();
    
    if (modalBox && cardBox) {
      await page.mouse.move(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      await page.mouse.down();
      
      // Drag to card position
      const targetX = cardBox.x + cardBox.width * 0.3;
      const targetY = cardBox.y + cardBox.height * 0.5;
      await page.mouse.move(targetX, targetY);
      
      // Arrow should be visible during drag
      await expect(page.locator('[data-testid="association-arrow"]')).toBeVisible();
      
      await page.mouse.up();
      
      // Association should be saved
      await expect(page.locator('[data-testid="association-saved"]')).toBeVisible();
    }
  });

  test('displays radius circle on arrow completion', async ({ page }) => {
    await page.selectOption('[data-testid="card-selector"]', 'the-fool');
    await page.waitForSelector('[data-testid="symbol-modal"]');
    
    const modal = page.locator('[data-testid="symbol-modal"]').first();
    const card = page.locator('[data-testid="card-image"]');
    
    const modalBox = await modal.boundingBox();
    const cardBox = await card.boundingBox();
    
    if (modalBox && cardBox) {
      await page.mouse.move(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      await page.mouse.down();
      
      const targetX = cardBox.x + cardBox.width * 0.3;
      const targetY = cardBox.y + cardBox.height * 0.5;
      await page.mouse.move(targetX, targetY);
      await page.mouse.up();
      
      // Radius circle should be visible
      await expect(page.locator('[data-testid="radius-circle"]')).toBeVisible();
      
      // Radius value should be displayed
      await expect(page.locator('[data-testid="radius-value"]')).toBeVisible();
    }
  });

  test('can save associations to JSON', async ({ page }) => {
    await page.selectOption('[data-testid="card-selector"]', 'the-fool');
    
    // Create an association
    const modal = page.locator('[data-testid="symbol-modal"]').first();
    const card = page.locator('[data-testid="card-image"]');
    
    const modalBox = await modal.boundingBox();
    const cardBox = await card.boundingBox();
    
    if (modalBox && cardBox) {
      await page.mouse.move(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(cardBox.x + cardBox.width * 0.3, cardBox.y + cardBox.height * 0.5);
      await page.mouse.up();
    }
    
    // Click export button
    await page.click('[data-testid="export-button"]');
    
    // Export modal should be visible
    await expect(page.locator('[data-testid="export-modal"]')).toBeVisible();
    
    // JSON should contain association data
    const jsonContent = await page.locator('[data-testid="export-json"]').textContent();
    expect(jsonContent).toContain('"cardId":"the-fool"');
    expect(jsonContent).toContain('"associations"');
  });

  test('persists associations in localStorage', async ({ page }) => {
    await page.selectOption('[data-testid="card-selector"]', 'the-fool');
    
    // Create an association
    const modal = page.locator('[data-testid="symbol-modal"]').first();
    const card = page.locator('[data-testid="card-image"]');
    
    const modalBox = await modal.boundingBox();
    const cardBox = await card.boundingBox();
    
    if (modalBox && cardBox) {
      await page.mouse.move(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(cardBox.x + cardBox.width * 0.3, cardBox.y + cardBox.height * 0.5);
      await page.mouse.up();
    }
    
    // Save to localStorage
    await page.click('[data-testid="save-button"]');
    await expect(page.locator('[data-testid="save-toast"]')).toContainText('Saved');
    
    // Reload page
    await page.reload();
    
    // Select same card
    await page.selectOption('[data-testid="card-selector"]', 'the-fool');
    
    // Association should still be visible
    await expect(page.locator('[data-testid="association-arrow"]')).toBeVisible();
    await expect(page.locator('[data-testid="radius-circle"]')).toBeVisible();
  });

  test('can switch between different cards', async ({ page }) => {
    // Select The Fool
    await page.selectOption('[data-testid="card-selector"]', 'the-fool');
    await expect(page.locator('[data-testid="card-image"]')).toHaveAttribute('alt', /fool/i);
    
    // Select The Magician
    await page.selectOption('[data-testid="card-selector"]', 'the-magician');
    await expect(page.locator('[data-testid="card-image"]')).toHaveAttribute('alt', /magician/i);
    
    // Symbols should update
    const firstSymbol = await page.locator('[data-testid="symbol-modal"]').first().locator('[data-testid="symbol-name"]').textContent();
    expect(firstSymbol).toBeTruthy();
  });

  test('can delete an association', async ({ page }) => {
    await page.selectOption('[data-testid="card-selector"]', 'the-fool');
    
    // Create an association
    const modal = page.locator('[data-testid="symbol-modal"]').first();
    const card = page.locator('[data-testid="card-image"]');
    
    const modalBox = await modal.boundingBox();
    const cardBox = await card.boundingBox();
    
    if (modalBox && cardBox) {
      await page.mouse.move(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(cardBox.x + cardBox.width * 0.3, cardBox.y + cardBox.height * 0.5);
      await page.mouse.up();
    }
    
    // Right-click on association to delete
    await page.locator('[data-testid="radius-circle"]').click({ button: 'right' });
    
    // Confirm deletion
    await page.click('[data-testid="confirm-delete"]');
    
    // Association should be removed
    await expect(page.locator('[data-testid="association-arrow"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="radius-circle"]')).not.toBeVisible();
  });

  test('shows association statistics', async ({ page }) => {
    await page.selectOption('[data-testid="card-selector"]', 'the-fool');
    
    // Stats should show 0 associations initially
    await expect(page.locator('[data-testid="stats-panel"]')).toContainText('Associations: 0');
    
    // Create an association
    const modal = page.locator('[data-testid="symbol-modal"]').first();
    const card = page.locator('[data-testid="card-image"]');
    
    const modalBox = await modal.boundingBox();
    const cardBox = await card.boundingBox();
    
    if (modalBox && cardBox) {
      await page.mouse.move(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(cardBox.x + cardBox.width * 0.3, cardBox.y + cardBox.height * 0.5);
      await page.mouse.up();
    }
    
    // Stats should update
    await expect(page.locator('[data-testid="stats-panel"]')).toContainText('Associations: 1');
  });
});