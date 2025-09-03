import { test, expect } from '@playwright/test';

test.describe('Database Schema Page', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/schema');
    await page.waitForLoadState('networkidle');
  });

  test('should display page title and all database tables', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Database Schema');
    
    // Check all 11 tables are displayed using more specific selectors
    await expect(page.locator('[data-table="cards"]')).toBeVisible();
    await expect(page.locator('[data-table="sephirot"]')).toBeVisible();
    await expect(page.locator('[data-table="minorCards"]')).toBeVisible();
    await expect(page.locator('[data-table="symbols"]')).toBeVisible();
    await expect(page.locator('[data-table="cardAppearances"]')).toBeVisible();
    await expect(page.locator('[data-table="relationships"]')).toBeVisible();
    await expect(page.locator('[data-table="cardMeanings"]')).toBeVisible();
    await expect(page.locator('[data-table="symbolDetails"]')).toBeVisible();
    await expect(page.locator('[data-table="hotspots"]')).toBeVisible();
    await expect(page.locator('[data-table="geometries"]')).toBeVisible();
    await expect(page.locator('[data-table="decans"]')).toBeVisible();
  });

  test('should display visual database diagram', async ({ page }) => {
    // Check that the visual diagram section exists
    const diagram = page.locator('[data-testid="database-diagram"]');
    await expect(diagram).toBeVisible();
    
    // Check that SVG container exists
    const svg = diagram.locator('svg');
    await expect(svg).toBeVisible();
    
    // Check that table nodes exist in the diagram
    await expect(diagram.locator('[data-node="cards"]')).toBeVisible();
    await expect(diagram.locator('[data-node="symbols"]')).toBeVisible();
    await expect(diagram.locator('[data-node="cardAppearances"]')).toBeVisible();
    
    // Check that relationship lines exist
    const relationships = diagram.locator('[data-relationship]');
    await expect(relationships).toHaveCount(10); // Based on the 10 relationships shown in stats
  });

  test('should highlight connections on table hover in diagram', async ({ page }) => {
    const diagram = page.locator('[data-testid="database-diagram"]');
    const cardsNode = diagram.locator('[data-node="cards"]');
    
    // Hover over cards table
    await cardsNode.hover();
    
    // Check that related connections are highlighted
    const highlightedLines = diagram.locator('[data-relationship][data-highlighted="true"]');
    await expect(highlightedLines.first()).toBeVisible();
    
    // Check that the hovered node has highlight class
    await expect(cardsNode).toHaveClass(/highlighted/);
  });

  test('should scroll to table card when clicking diagram node', async ({ page }) => {
    const diagram = page.locator('[data-testid="database-diagram"]');
    const symbolsNode = diagram.locator('[data-node="symbols"]');
    
    // Click on symbols node in diagram
    await symbolsNode.click();
    
    // Check that the page scrolled to the symbols table card
    const symbolsCard = page.locator('[data-table="symbols"]');
    await expect(symbolsCard).toBeInViewport();
    
    // Check for visual feedback (highlight or border)
    await expect(symbolsCard).toHaveClass(/highlight-animation/);
  });

  test('should display record counts for each table', async ({ page }) => {
    const cardsTable = page.locator('[data-table="cards"]');
    await expect(cardsTable).toBeVisible();
    const recordCount = await cardsTable.locator('.record-count').textContent();
    expect(recordCount).toMatch(/\d+ records/);
  });

  test('should expand table to show fields when clicked', async ({ page }) => {
    const cardsTable = page.locator('[data-table="cards"]');
    await cardsTable.click();
    
    // Check that fields are displayed
    await expect(page.locator('text=id: string')).toBeVisible();
    await expect(page.locator('text=label: string')).toBeVisible();
    await expect(page.locator('text=trumpNumber: number')).toBeVisible();
    await expect(page.locator('text=hebrewLetter?: string')).toBeVisible();
  });

  test('should show indexed fields with indicator', async ({ page }) => {
    const cardsTable = page.locator('[data-table="cards"]');
    await cardsTable.click();
    
    // Check for index indicators
    const idField = page.locator('[data-field="id"]');
    await expect(idField.locator('.index-badge')).toBeVisible();
    
    const trumpField = page.locator('[data-field="trumpNumber"]');
    await expect(trumpField.locator('.index-badge')).toBeVisible();
  });

  test('should display relationships between tables', async ({ page }) => {
    // Check for relationship section
    await expect(page.locator('h2:has-text("Table Relationships")')).toBeVisible();
    
    // Check that the relationship section contains the expected content
    const relSection = page.locator('h2:has-text("Table Relationships") ~ div');
    await expect(relSection).toBeVisible();
    
    // Check for specific table names in relationships
    await expect(relSection).toContainText('cardAppearances');
    await expect(relSection).toContainText('symbols');
    await expect(relSection).toContainText('cards');
  });

  test('should display database statistics', async ({ page }) => {
    const statsSection = page.locator('[data-testid="db-statistics"]');
    await expect(statsSection).toBeVisible();
    
    await expect(statsSection.locator('text=Total Tables: 11')).toBeVisible();
    await expect(statsSection.locator('text=/Total Records: \\d+/')).toBeVisible();
  });

  test('should collapse expanded table when clicked again', async ({ page }) => {
    const cardsTable = page.locator('[data-table="cards"]');
    
    // Expand
    await cardsTable.click();
    await expect(page.locator('text=id: string')).toBeVisible();
    
    // Collapse
    await cardsTable.click();
    await expect(page.locator('text=id: string')).not.toBeVisible();
  });

  test('should show foreign key relationships in expanded view', async ({ page }) => {
    const cardAppearancesTable = page.locator('[data-table="cardAppearances"]');
    await cardAppearancesTable.click();
    
    // Check for foreign key indicators
    const symbolIdField = page.locator('[data-field="symbolId"]');
    await expect(symbolIdField.locator('text=FK → symbols.id')).toBeVisible();
    
    const cardIdField = page.locator('[data-field="cardId"]');
    await expect(cardIdField.locator('text=FK → cards.id')).toBeVisible();
  });

  test('should display compound indices correctly', async ({ page }) => {
    const cardAppearancesTable = page.locator('[data-table="cardAppearances"]');
    await cardAppearancesTable.click();
    
    // Check for compound index
    await expect(page.locator('text=[symbolId+cardId]')).toBeVisible();
  });

  test('should be responsive and scrollable', async ({ page }) => {
    // Check that the page is scrollable if content overflows
    const container = page.locator('.schema-container');
    await expect(container).toHaveCSS('overflow-y', 'auto');
    
    // Check mobile responsiveness
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-table="cards"]')).toBeVisible();
  });
});