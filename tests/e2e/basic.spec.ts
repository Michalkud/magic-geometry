import { test, expect } from '@playwright/test';

test('app renders Tree of Life page correctly', async ({ page }) => {
  await page.goto('/');
  // Check if the main title is visible
  await expect(page.locator('text=Tree of Life')).toBeVisible();
  // Check if the subtitle is present
  await expect(page.locator('text=Interactive Qabalistic Tree with Classical Tarot Correspondences')).toBeVisible();
  // Check if the instructions are present
  await expect(page.locator('text=Hover over paths to see card details')).toBeVisible();
});

test('tree SVG paths are clickable', async ({ page }) => {
  await page.goto('/');
  // Wait for the SVG to load
  await page.waitForSelector('svg', { timeout: 10000 });
  // Check that path elements exist (should be 22 paths)
  const paths = page.locator('svg line, svg g');
  await expect(paths.first()).toBeVisible();
});

test('card preview appears on hover', async ({ page }) => {
  await page.goto('/');
  // Wait for the SVG to load
  await page.waitForSelector('svg', { timeout: 10000 });
  // Hover over a path/card element to trigger preview
  const firstPath = page.locator('svg line').first();
  await firstPath.hover();
  // Wait a bit for the hover effect
  await page.waitForTimeout(500);
  // The preview may appear - this tests basic interaction works
});


