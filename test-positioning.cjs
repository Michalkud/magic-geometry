const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to page...');
    await page.goto('http://localhost:5174');
    
    console.log('Waiting for cards to load...');
    await page.waitForSelector('img[alt*="The"]', { timeout: 10000 });
    
    console.log('Getting card positions...');
    
    // Debug: Log the calculated positions from the algorithm
    await page.evaluate(() => {
      console.log('=== ALGORITHM DEBUG ===');
      // This will trigger the component's positioning calculation
      window.debugCardPositions = true;
    });
    const cardPositions = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('img[alt*="The"], img[alt*="Fortune"], img[alt*="Adjustment"], img[alt*="Art"]'));
      
      return cards.map(card => {
        const rect = card.getBoundingClientRect();
        const alt = card.alt;
        const parentStyle = window.getComputedStyle(card.parentElement);
        
        return {
          name: alt,
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          transform: parentStyle.transform,
          position: parentStyle.position
        };
      });
    });
    
    console.log('Card Positions:');
    cardPositions.forEach(card => {
      console.log(`  ${card.name}: (${card.x}, ${card.y}) ${card.width}x${card.height} - ${card.position} - ${card.transform}`);
    });
    
    // Check for overlaps
    console.log('\nChecking for overlaps...');
    let overlaps = 0;
    for (let i = 0; i < cardPositions.length; i++) {
      for (let j = i + 1; j < cardPositions.length; j++) {
        const card1 = cardPositions[i];
        const card2 = cardPositions[j];
        
        const overlap = !(
          card1.x + card1.width <= card2.x || 
          card2.x + card2.width <= card1.x ||
          card1.y + card1.height <= card2.y || 
          card2.y + card2.height <= card1.y
        );
        
        if (overlap) {
          console.log(`  OVERLAP: "${card1.name}" and "${card2.name}"`);
          overlaps++;
        }
      }
    }
    
    console.log(`\nTotal overlaps: ${overlaps}`);
    
    // Check distribution
    const centerX = 640; // Assume 1280px width
    let leftCards = 0, rightCards = 0, centerCards = 0;
    
    cardPositions.forEach(card => {
      const cardCenterX = card.x + card.width / 2;
      if (cardCenterX < centerX - 100) {
        leftCards++;
      } else if (cardCenterX > centerX + 100) {
        rightCards++;
      } else {
        centerCards++;
      }
    });
    
    console.log(`\nDistribution: Left: ${leftCards}, Center: ${centerCards}, Right: ${rightCards}`);
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();