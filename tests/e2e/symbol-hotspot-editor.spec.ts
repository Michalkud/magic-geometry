import { test, expect } from '@playwright/test';

test.describe('Symbol Hotspot Editor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/editor');
  });

  test('should display card image and drawing canvas', async ({ page }) => {
    // Check page title
    await expect(page.locator('h1')).toContainText('Symbol Hotspot Editor');
    
    // Check card selector exists
    await expect(page.locator('select[aria-label="Select card"]')).toBeVisible();
    
    // Check canvas area exists
    await expect(page.locator('[data-testid="hotspot-canvas"]')).toBeVisible();
    
    // Check symbol list panel exists
    await expect(page.locator('[data-testid="symbol-list"]')).toBeVisible();
  });

  test('should allow selecting different cards', async ({ page }) => {
    const cardSelector = page.locator('select[aria-label="Select card"]');
    
    // Select The Fool
    await cardSelector.selectOption('the-fool');
    await expect(page.locator('img[alt*="Fool"]')).toBeVisible();
    
    // Select The Magician
    await cardSelector.selectOption('the-magician');
    await expect(page.locator('img[alt*="Magician"]')).toBeVisible();
  });

  test('should draw rectangle on canvas click and drag', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw a rectangle
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(200, 200, { steps: 10 });
    await page.mouse.up();
    
    // Check that a hotspot was created
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(1);
    
    // Check coordinates display
    await expect(page.locator('[data-testid="coordinate-display"]')).toBeVisible();
  });

  test('should select symbol and associate with hotspot', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw a rectangle
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(200, 200, { steps: 10 });
    await page.mouse.up();
    
    // Wait for hotspot to be created
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(1);
    
    // Search for a specific symbol
    await page.locator('input[placeholder="Search symbols..."]').fill('white dog');
    await page.waitForTimeout(500); // Wait for filter
    
    // Click the first filtered symbol
    const symbolButton = page.locator('button').filter({ hasText: 'White Dog' }).first();
    await symbolButton.click();
    
    // Check that hotspot is associated with symbol
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveAttribute('data-symbol', /white-dog/i);
    
    // Check preview shows symbol name
    await expect(page.locator('[data-testid="hotspot-preview"]')).toContainText(/white.*dog/i);
  });

  test('should display normalized coordinates', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw a rectangle and keep mouse down to see coordinates while drawing
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(200, 200, { steps: 10 });
    
    // Check coordinate display shows normalized values while drawing
    const coordDisplay = page.locator('[data-testid="coordinate-display"]');
    await expect(coordDisplay).toContainText(/x1:\s*0\.\d+/);
    await expect(coordDisplay).toContainText(/y1:\s*0\.\d+/);
    await expect(coordDisplay).toContainText(/x2:\s*0\.\d+/);
    await expect(coordDisplay).toContainText(/y2:\s*0\.\d+/);
    
    // Release mouse
    await page.mouse.up();
  });

  test('should delete hotspot on right click', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw a rectangle
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(200, 200, { steps: 10 });
    await page.mouse.up();
    
    // Verify hotspot exists
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(1);
    
    // Set up dialog handler before the action that triggers it
    page.once('dialog', dialog => {
      console.log('Dialog message:', dialog.message());
      dialog.accept();
    });
    
    // Right-click to delete
    await page.locator('[data-testid="hotspot-rect"]').click({ button: 'right' });
    
    // Verify hotspot removed
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(0);
  });

  test('should export hotspot data', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw a rectangle
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(100, 100, { steps: 5 });
    await page.mouse.up();
    
    // Wait for hotspot creation
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(1);
    
    // Click export button
    await page.locator('button:has-text("Export")').click();
    
    // Check export modal appears
    await expect(page.locator('[data-testid="export-modal"]')).toBeVisible();
    
    // Check JSON output contains hotspot data
    const jsonOutput = page.locator('[data-testid="export-json"]');
    await expect(jsonOutput).toContainText('"cardId"');
    await expect(jsonOutput).toContainText('"the-fool"');
    await expect(jsonOutput).toContainText('"rectangle"');
  });

  test('should save and load hotspots from localStorage', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw a rectangle
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(200, 200, { steps: 10 });
    await page.mouse.up();
    
    // Wait for hotspot creation
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(1);
    
    // Save
    await page.locator('button:has-text("Save")').click();
    await expect(page.locator('.toast')).toContainText('Saved');
    
    // Reload page
    await page.reload();
    
    // Check that hotspot is restored
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(1);
  });

  test('should toggle between edit and preview modes', async ({ page }) => {
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw rectangle
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(150, 150, { steps: 5 });
    await page.mouse.up();
    
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(1);
    
    // Toggle to preview mode
    await page.locator('button:has-text("Edit Mode")').click();
    
    // Should switch to Preview Mode
    await expect(page.locator('button:has-text("Preview Mode")')).toBeVisible();
    
    // Try drawing in preview mode
    const canvasBounds = await canvas.boundingBox();
    if (canvasBounds) {
      await page.mouse.move(canvasBounds.x + 250, canvasBounds.y + 250);
      await page.mouse.down();
      await page.mouse.move(canvasBounds.x + 350, canvasBounds.y + 350, { steps: 5 });
      await page.mouse.up();
    }
    
    // No new hotspot should be created
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(1);
  });

  test.skip('should support keyboard shortcuts', async ({ page }) => {
    // Skip for now - keyboard shortcuts implementation can be added later
    const canvas = page.locator('[data-testid="hotspot-canvas"]');
    
    // Draw a rectangle
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(200, 200, { steps: 10 });
    await page.mouse.up();
    
    // Select hotspot
    await page.locator('[data-testid="hotspot-rect"]').click();
    
    // Delete with keyboard
    await page.keyboard.press('Delete');
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(0);
    
    // Undo with Ctrl+Z
    await page.keyboard.press('Control+z');
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(1);
    
    // Redo with Ctrl+Shift+Z
    await page.keyboard.press('Control+Shift+z');
    await expect(page.locator('[data-testid="hotspot-rect"]')).toHaveCount(0);
  });
});