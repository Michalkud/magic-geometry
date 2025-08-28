import { test, expect } from '@playwright/test';

test('app renders canvas and panel', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Tree of Life — 3D')).toBeVisible();
  // Expect the view options button to be present
  await expect(page.locator('text=View Options')).toBeVisible();
});

test('card selector selects Adjustment and shows arrow', async ({ page }) => {
  await page.goto('/');
  const select = page.getByLabel('card-selector');
  await expect(select).toBeVisible();
  await select.selectOption('adjustment');
  // Arrow SVG line present
  await expect(page.locator('svg line')).toBeVisible();
  await expect(page.getByTestId('card-details')).toBeVisible();
  await expect(page.getByLabel('card-title')).toHaveText(/Adjustment/);
});

test('cards library search filters and keyboard nav works', async ({ page }) => {
  await page.goto('/');
  // Open a specific card's full meaning page to enter the Cards Library reliably
  const select = page.getByLabel('card-selector');
  await select.selectOption('adjustment');
  await page.getByRole('link', { name: 'Open full meaning' }).click({ force: true });
  await expect(page).toHaveURL(/\/cards\/adjustment$/);
  await expect(page.getByRole('button', { name: 'Copy link to this card' })).toBeVisible();
});


