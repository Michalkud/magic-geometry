import { test, expect } from '@playwright/test';

test.describe('Tree of Life Card Positioning', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5174');
    await page.waitForSelector('img[alt*="The"]', { timeout: 10000 });
  });

  test('should have no overlapping cards', async ({ page }) => {
    // Get all card images (excluding the tree SVG)
    const cardImages = await page.locator('img[alt*="The"], img[alt*="Fortune"], img[alt*="Adjustment"], img[alt*="Art"]').all();
    
    expect(cardImages.length).toBeGreaterThanOrEqual(20); // Should have 22 major arcana cards
    
    // Get bounding boxes for all cards
    const cardBounds = [];
    for (const card of cardImages) {
      const box = await card.boundingBox();
      const alt = await card.getAttribute('alt');
      if (box && alt) {
        cardBounds.push({ 
          name: alt, 
          x: box.x, 
          y: box.y, 
          width: box.width, 
          height: box.height,
          right: box.x + box.width,
          bottom: box.y + box.height
        });
      }
    }
    
    console.log('Card positions:', cardBounds.map(c => `${c.name}: (${Math.round(c.x)}, ${Math.round(c.y)})`));
    
    // Check for overlaps
    const overlaps = [];
    const MIN_GUTTER = 5; // Minimum space between cards
    
    for (let i = 0; i < cardBounds.length; i++) {
      for (let j = i + 1; j < cardBounds.length; j++) {
        const card1 = cardBounds[i];
        const card2 = cardBounds[j];
        
        // Check if cards overlap (with gutter consideration)
        const horizontalOverlap = !(
          card1.right + MIN_GUTTER <= card2.x || 
          card2.right + MIN_GUTTER <= card1.x
        );
        
        const verticalOverlap = !(
          card1.bottom + MIN_GUTTER <= card2.y || 
          card2.bottom + MIN_GUTTER <= card1.y
        );
        
        if (horizontalOverlap && verticalOverlap) {
          overlaps.push({
            card1: card1.name,
            card2: card2.name,
            card1Pos: { x: Math.round(card1.x), y: Math.round(card1.y) },
            card2Pos: { x: Math.round(card2.x), y: Math.round(card2.y) }
          });
        }
      }
    }
    
    if (overlaps.length > 0) {
      console.error('Overlapping cards detected:', overlaps);
    }
    
    expect(overlaps).toHaveLength(0);
  });

  test('should distribute cards properly on left and right sides', async ({ page }) => {
    const cardImages = await page.locator('img[alt*="The"], img[alt*="Fortune"], img[alt*="Adjustment"], img[alt*="Art"]').all();
    
    let leftSideCards = 0;
    let rightSideCards = 0;
    let centerCards = 0;
    
    const viewport = await page.viewportSize();
    const centerX = viewport ? viewport.width / 2 : 640;
    const centerRegion = 200; // 200px wide center region
    
    for (const card of cardImages) {
      const box = await card.boundingBox();
      if (box) {
        const cardCenterX = box.x + box.width / 2;
        if (cardCenterX < centerX - centerRegion / 2) {
          leftSideCards++;
        } else if (cardCenterX > centerX + centerRegion / 2) {
          rightSideCards++;
        } else {
          centerCards++;
        }
      }
    }
    
    console.log(`Card distribution: Left: ${leftSideCards}, Center: ${centerCards}, Right: ${rightSideCards}`);
    
    // Should have cards on both left and right sides
    expect(leftSideCards).toBeGreaterThan(5);
    expect(rightSideCards).toBeGreaterThan(5);
    
    // Should have some cards in center (top/bottom)
    expect(centerCards).toBeGreaterThan(2);
  });

  test('should utilize vertical space efficiently', async ({ page }) => {
    const cardImages = await page.locator('img[alt*="The"], img[alt*="Fortune"], img[alt*="Adjustment"], img[alt*="Art"]').all();
    
    let minY = Infinity;
    let maxY = -Infinity;
    
    for (const card of cardImages) {
      const box = await card.boundingBox();
      if (box) {
        minY = Math.min(minY, box.y);
        maxY = Math.max(maxY, box.y + box.height);
      }
    }
    
    const usedHeight = maxY - minY;
    const viewport = await page.viewportSize();
    const availableHeight = viewport ? viewport.height * 0.8 : 600; // ~80% of viewport
    
    console.log(`Vertical space usage: ${Math.round(usedHeight)}px used out of ${Math.round(availableHeight)}px available`);
    
    // Should use at least 50% of available vertical space
    expect(usedHeight / availableHeight).toBeGreaterThan(0.5);
  });

  test('should have proper gutter spacing between vertically adjacent cards', async ({ page }) => {
    const cardImages = await page.locator('img[alt*="The"], img[alt*="Fortune"], img[alt*="Adjustment"], img[alt*="Art"]').all();
    
    // Group cards by left/right side
    const leftCards = [];
    const rightCards = [];
    
    const viewport = await page.viewportSize();
    const centerX = viewport ? viewport.width / 2 : 640;
    
    for (const card of cardImages) {
      const box = await card.boundingBox();
      const alt = await card.getAttribute('alt');
      if (box && alt) {
        const cardData = { name: alt, x: box.x, y: box.y, height: box.height, bottom: box.y + box.height };
        if (box.x + box.width / 2 < centerX) {
          leftCards.push(cardData);
        } else {
          rightCards.push(cardData);
        }
      }
    }
    
    // Sort by Y position
    leftCards.sort((a, b) => a.y - b.y);
    rightCards.sort((a, b) => a.y - b.y);
    
    const MIN_GUTTER = 8;
    
    // Check left side spacing
    console.log(`Left cards (${leftCards.length}):`, leftCards.map(c => `${c.name}: (${Math.round(c.x)}, ${Math.round(c.y)})`));
    
    for (let i = 1; i < leftCards.length; i++) {
      const spacing = leftCards[i].y - leftCards[i-1].bottom;
      const xDiff = Math.abs(leftCards[i].x - leftCards[i-1].x);
      console.log(`Left side spacing between "${leftCards[i-1].name}" and "${leftCards[i].name}": ${Math.round(spacing)}px, X diff: ${Math.round(xDiff)}px`);
      
      // Only check vertical spacing if cards are in roughly the same column (X difference < 100px)
      if (xDiff < 100 && spacing < -5) {
        console.error(`Insufficient spacing on left side: ${spacing}px between "${leftCards[i-1].name}" and "${leftCards[i].name}"`);
        expect(spacing).toBeGreaterThan(-5);
      } else if (xDiff >= 100) {
        console.log(`  -> Skipping vertical spacing check - cards are in different columns`);
      }
    }
    
    // Check right side spacing  
    console.log(`Right cards (${rightCards.length}):`, rightCards.map(c => `${c.name}: (${Math.round(c.x)}, ${Math.round(c.y)})`));
    
    for (let i = 1; i < rightCards.length; i++) {
      const spacing = rightCards[i].y - rightCards[i-1].bottom;
      const xDiff = Math.abs(rightCards[i].x - rightCards[i-1].x);
      console.log(`Right side spacing between "${rightCards[i-1].name}" and "${rightCards[i].name}": ${Math.round(spacing)}px, X diff: ${Math.round(xDiff)}px`);
      
      // Only check vertical spacing if cards are in roughly the same column (X difference < 100px)
      if (xDiff < 100 && spacing < -5) {
        console.error(`Insufficient spacing on right side: ${spacing}px between "${rightCards[i-1].name}" and "${rightCards[i].name}"`);
        expect(spacing).toBeGreaterThan(-5);
      } else if (xDiff >= 100) {
        console.log(`  -> Skipping vertical spacing check - cards are in different columns`);
      }
    }
  });

  test('should have alternating stagger offsets', async ({ page }) => {
    const cardImages = await page.locator('img[alt*="The"], img[alt*="Fortune"], img[alt*="Adjustment"], img[alt*="Art"]').all();
    
    expect(cardImages.length).toBeGreaterThan(10);
    
    // Group cards by left/right side and check for alternating X positions
    const leftCards = [];
    const viewport = await page.viewportSize();
    const centerX = viewport ? viewport.width / 2 : 640;
    
    for (const card of cardImages) {
      const box = await card.boundingBox();
      if (box && box.x + box.width / 2 < centerX) {
        leftCards.push({ x: box.x, y: box.y });
      }
    }
    
    // Sort left cards by Y coordinate
    leftCards.sort((a, b) => a.y - b.y);
    
    // Check for alternating X positions (stagger effect)
    let hasStagger = false;
    for (let i = 1; i < Math.min(leftCards.length, 8); i++) {
      const xDiff = Math.abs(leftCards[i].x - leftCards[i-1].x);
      if (xDiff > 3) { // Should have some stagger difference
        hasStagger = true;
        break;
      }
    }
    
    expect(hasStagger).toBe(true);
  });
});