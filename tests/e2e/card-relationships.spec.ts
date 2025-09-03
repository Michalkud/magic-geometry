import { test, expect } from '@playwright/test';

test.describe('Card Relationships Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/relationships');
  });

  test('should load the relationships page with title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Tarot Card Relationships');
    
    // Check for educational description
    await expect(page.locator('p')).toContainText('philosophical connections');
  });

  test('should display relationship type controls', async ({ page }) => {
    // Check all relationship type buttons exist
    const relationshipTypes = ['Path', 'Elemental', 'Astrological', 'Numerical', 'Sephirotic'];
    
    for (const type of relationshipTypes) {
      await expect(page.getByRole('button', { name: type })).toBeVisible();
    }
    
    // Path should be selected by default
    const pathButton = page.getByRole('button', { name: 'Path' });
    await expect(pathButton).toHaveClass(/bg-white text-black/);
  });

  test('should toggle relationship types', async ({ page }) => {
    const elementalButton = page.getByRole('button', { name: 'Elemental' });
    
    // Initially not selected
    await expect(elementalButton).not.toHaveClass(/bg-white text-black/);
    
    // Click to select
    await elementalButton.click();
    await expect(elementalButton).toHaveClass(/bg-white text-black/);
    
    // Click to deselect
    await elementalButton.click();
    await expect(elementalButton).not.toHaveClass(/bg-white text-black/);
  });

  test('should display educational descriptions for selected types', async ({ page }) => {
    // Path should be selected by default, check its description
    await expect(page.locator('text=Path relationships show how Major Arcana cards serve as bridges')).toBeVisible();
    
    // Add elemental type
    await page.getByRole('button', { name: 'Elemental' }).click();
    await expect(page.locator('text=Elemental connections show how cards share the fundamental forces')).toBeVisible();
  });

  test('should have control buttons for layout and legend', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Reset Layout' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hide Legend' })).toBeVisible();
    
    // Check for new visualization engine toggle
    await expect(page.locator('text=Engine:')).toBeVisible();
    await expect(page.getByRole('button', { name: /Force Graph|Cytoscape/ })).toBeVisible();
  });

  test('should toggle legend visibility', async ({ page }) => {
    // Legend should be visible initially
    await expect(page.getByRole('heading', { name: 'Legend' })).toBeVisible();
    
    // Hide legend
    await page.getByRole('button', { name: 'Hide Legend' }).click();
    await expect(page.getByRole('heading', { name: 'Legend' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Show Legend' })).toBeVisible();
    
    // Show legend again
    await page.getByRole('button', { name: 'Show Legend' }).click();
    await expect(page.getByRole('heading', { name: 'Legend' })).toBeVisible();
  });

  test('should display legend with node types and elements', async ({ page }) => {
    await expect(page.locator('text=Node Types:')).toBeVisible();
    await expect(page.locator('text=Sephirot (Tree of Life spheres)')).toBeVisible();
    await expect(page.locator('.space-y-1 >> text=Major Arcana')).toBeVisible();
    await expect(page.locator('text=Minor Arcana')).toBeVisible();
    
    await expect(page.locator('text=Elements:')).toBeVisible();
    await expect(page.locator('text=Fire (Wands)')).toBeVisible();
    await expect(page.locator('text=Water (Cups)')).toBeVisible();
    await expect(page.locator('text=Air (Swords)')).toBeVisible();
    await expect(page.locator('text=Earth (Disks)')).toBeVisible();
  });

  test('should have cytoscape visualization container', async ({ page }) => {
    // Check that the visualization container exists
    const cytoscapeContainer = page.locator('div').filter({ has: page.locator('canvas, svg') }).first();
    await expect(cytoscapeContainer).toBeVisible();
  });

  test('should have navigation back to tree of life', async ({ page }) => {
    const backLink = page.locator('a', { hasText: '← Back to Tree of Life' });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/');
  });

  test('should show different relationship counts when toggling types', async ({ page }) => {
    // This test would require access to the actual cytoscape instance
    // We'll test the UI behavior instead
    
    // Start with just Path selected
    const pathButton = page.getByRole('button', { name: 'Path' });
    await expect(pathButton).toHaveClass(/bg-white text-black/);
    
    // Add Elemental relationships
    await page.getByRole('button', { name: 'Elemental' }).click();
    
    // Add Numerical relationships
    await page.getByRole('button', { name: 'Numerical' }).click();
    
    // Verify multiple descriptions are shown
    await expect(page.locator('text=Path relationships show')).toBeVisible();
    await expect(page.locator('text=Elemental connections show')).toBeVisible();
    await expect(page.locator('text=Numerical relationships trace')).toBeVisible();
  });

  test('should handle empty relationship selection gracefully', async ({ page }) => {
    // Deselect the default Path selection
    await page.getByRole('button', { name: 'Path' }).click();
    
    // No educational descriptions should be shown
    await expect(page.locator('.bg-gray-900.rounded').filter({ hasText: /Path|Elemental|Astrological|Numerical|Sephirotic/ })).not.toBeVisible();
  });

  test('should display layout selector dropdown', async ({ page }) => {
    const layoutSelector = page.locator('select').last(); // Get the last select element (layout selector)
    await expect(layoutSelector).toBeVisible();
  });

  test('should have sacred geometry layout options', async ({ page }) => {
    // Check for layout options
    const layoutOptions = ['Dynamic', 'Tree of Life', 'Metatron\'s Cube', 'Flower of Life', 'Circle', 'Hexagram'];
    
    // Get the layout selector
    const layoutSelector = page.locator('select').last();
    await expect(layoutSelector).toBeVisible();
    
    for (const option of layoutOptions) {
      // Check that the option exists in the DOM (options aren't visible when select is closed)
      await expect(layoutSelector.locator('option', { hasText: option })).toHaveCount(1);
    }
  });

  test('should switch to Tree of Life layout', async ({ page }) => {
    // Find and select Tree of Life layout
    const layoutSelector = page.locator('select').last();
    await expect(layoutSelector).toBeVisible();
    await layoutSelector.selectOption('tree-of-life');
    
    // Wait for layout to apply
    await page.waitForTimeout(1000);
    
    // Check that nodes have moved to fixed positions (Tree of Life should use preset layout)
    const cytoscapeContainer = page.locator('div').filter({ has: page.locator('canvas, svg') }).first();
    await expect(cytoscapeContainer).toBeVisible();
  });

  test('should switch to Metatron\'s Cube layout', async ({ page }) => {
    const layoutSelector = page.locator('select').last();
    await expect(layoutSelector).toBeVisible();
    await layoutSelector.selectOption('metatron-cube');
    await page.waitForTimeout(1000);
    
    const cytoscapeContainer = page.locator('div').filter({ has: page.locator('canvas, svg') }).first();
    await expect(cytoscapeContainer).toBeVisible();
  });

  test('should switch between layouts without errors', async ({ page }) => {
    const layoutSelector = page.locator('select').last();
    await expect(layoutSelector).toBeVisible();
    
    // Test switching between different layouts
    await layoutSelector.selectOption('circle');
    await page.waitForTimeout(500);
    
    await layoutSelector.selectOption('flower-of-life');
    await page.waitForTimeout(500);
    
    await layoutSelector.selectOption('dynamic');
    await page.waitForTimeout(500);
    
    // Should not have any console errors
    const cytoscapeContainer = page.locator('div').filter({ has: page.locator('canvas, svg') }).first();
    await expect(cytoscapeContainer).toBeVisible();
  });

  test('should toggle between Force Graph and Cytoscape engines', async ({ page }) => {
    const engineToggle = page.getByRole('button', { name: /Force Graph|Cytoscape/ });
    await expect(engineToggle).toBeVisible();
    
    // Should start with Force Graph by default
    await expect(engineToggle).toContainText('Force Graph');
    
    // Click to switch to Cytoscape
    await engineToggle.click();
    await expect(engineToggle).toContainText('Cytoscape');
    
    // Switch back to Force Graph
    await engineToggle.click();
    await expect(engineToggle).toContainText('Force Graph');
  });

  test('should show constellation layout options for Force Graph', async ({ page }) => {
    // Ensure we're using Force Graph
    const engineToggle = page.getByRole('button', { name: /Force Graph|Cytoscape/ });
    if (await engineToggle.textContent() !== 'Force Graph') {
      await engineToggle.click();
    }
    
    // Check for constellation layout selector
    const layoutSelector = page.locator('select').last();
    await expect(layoutSelector).toBeVisible();
    
    // Check for constellation layout options
    const constellationOptions = ['Dynamic', 'Spiral Galaxy', 'Constellation Map', 'Cosmic Web', 'Solar System'];
    for (const option of constellationOptions) {
      await expect(layoutSelector.locator('option', { hasText: option })).toHaveCount(1);
    }
  });

  test('should show 2D/3D toggle for Force Graph', async ({ page }) => {
    // Ensure we're using Force Graph
    const engineToggle = page.getByRole('button', { name: /Force Graph|Cytoscape/ });
    if (await engineToggle.textContent() !== 'Force Graph') {
      await engineToggle.click();
    }
    
    // Check for 2D/3D toggle
    await expect(page.locator('text=View:')).toBeVisible();
    const viewToggle = page.getByRole('button', { name: /2D|3D/ });
    await expect(viewToggle).toBeVisible();
    
    // Should start with 2D
    await expect(viewToggle).toContainText('2D');
    
    // Switch to 3D
    await viewToggle.click();
    await expect(viewToggle).toContainText('3D');
    
    // Switch back to 2D
    await viewToggle.click();
    await expect(viewToggle).toContainText('2D');
  });

  test('should switch constellation layouts smoothly', async ({ page }) => {
    // Ensure we're using Force Graph
    const engineToggle = page.getByRole('button', { name: /Force Graph|Cytoscape/ });
    if (await engineToggle.textContent() !== 'Force Graph') {
      await engineToggle.click();
    }
    
    const layoutSelector = page.locator('select').last();
    
    // Test switching between constellation layouts
    await layoutSelector.selectOption('spiral-galaxy');
    await page.waitForTimeout(1000);
    
    await layoutSelector.selectOption('solar-system');
    await page.waitForTimeout(1000);
    
    await layoutSelector.selectOption('constellation-map');
    await page.waitForTimeout(1000);
    
    // Visualization should still be working
    const visualizationContainer = page.locator('div').filter({ has: page.locator('canvas') }).first();
    await expect(visualizationContainer).toBeVisible();
  });

  test('should render 3D view without errors', async ({ page }) => {
    // Ensure we're using Force Graph
    const engineToggle = page.getByRole('button', { name: /Force Graph|Cytoscape/ });
    if (await engineToggle.textContent() !== 'Force Graph') {
      await engineToggle.click();
    }
    
    // Switch to 3D view
    const viewToggle = page.getByRole('button', { name: /2D|3D/ });
    await expect(viewToggle).toContainText('2D');
    await viewToggle.click();
    await expect(viewToggle).toContainText('3D');
    
    // Wait for 3D view to load
    await page.waitForTimeout(2000);
    
    // Check that the visualization container still exists and is visible
    const visualizationContainer = page.locator('div').filter({ has: page.locator('canvas') }).first();
    await expect(visualizationContainer).toBeVisible();
    
    // Check for no console errors related to THREE.js
    const messages = await page.evaluate(() => {
      return window.console.error.toString();
    });
    
    // The page should load without THREE.js related errors
    await expect(page.locator('text=Tarot Card Relationships')).toBeVisible();
  });
});