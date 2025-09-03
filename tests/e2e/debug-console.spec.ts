import { test, expect } from '@playwright/test';

test.describe('Console Log Debug', () => {
  test('check for App.tsx console log', async ({ page }) => {
    const consoleLogs: string[] = [];
    
    page.on('console', msg => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
      console.log(`Console: ${msg.type()}: ${msg.text()}`);
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    console.log('All console logs:', consoleLogs);
    
    const hasModifiedLog = consoleLogs.some(log => log.includes('APP.TSX LOADING - MODIFIED VERSION'));
    console.log('Found modified App.tsx log:', hasModifiedLog);
  });
});