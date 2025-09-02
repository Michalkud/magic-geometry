/**
 * Symbol System Console Tests
 * Simple verification that our symbol system is working correctly
 */

import { 
  SYMBOL_REGISTRY, 
  getRegistryStats, 
  findSymbolsOnCard, 
  getRelatedSymbols,
  calculateSymbolImportance,
  getGraphStats,
  symbolRelationships,
  getRelationshipStats
} from '../data/symbols/index';

/**
 * Run comprehensive tests of the symbol system
 */
export const testSymbolSystem = () => {
  console.log('=== RWS SYMBOL GRAPH SYSTEM TESTS ===\n');

  // Test 1: Registry Stats
  console.log('1. Symbol Registry Stats:');
  const stats = getRegistryStats();
  console.log(`   Total Symbols: ${stats.totalSymbols}`);
  console.log(`   Unique Cards: ${stats.uniqueCards}`);
  console.log(`   Symbols by Type:`, stats.symbolsByType);
  console.log(`   Average Appearances per Symbol: ${stats.averageAppearancesPerSymbol.toFixed(2)}\n`);

  // Test 2: Specific Symbol Lookup
  console.log('2. Key Symbol Lookups:');
  const whiteRose = SYMBOL_REGISTRY.get('white-rose');
  const infinitySymbol = SYMBOL_REGISTRY.get('infinity-symbol');
  const boazPillar = SYMBOL_REGISTRY.get('boaz-pillar');
  
  console.log(`   White Rose: ${whiteRose ? '✓ Found' : '✗ Missing'}`);
  console.log(`   Infinity Symbol: ${infinitySymbol ? '✓ Found' : '✗ Missing'}`);
  console.log(`   Boaz Pillar: ${boazPillar ? '✓ Found' : '✗ Missing'}\n`);

  if (whiteRose) {
    console.log(`   White Rose appears on ${whiteRose.appearances.length} card(s)`);
    console.log(`   Meanings: ${whiteRose.meanings.slice(0, 3).join(', ')}\n`);
  }

  // Test 3: Card Symbols
  console.log('3. Symbols on Specific Cards:');
  const foolSymbols = findSymbolsOnCard('card-00-the-fool');
  const magicianSymbols = findSymbolsOnCard('card-01-the-magician');
  const priestessSymbols = findSymbolsOnCard('card-02-the-high-priestess');
  
  console.log(`   The Fool: ${foolSymbols.length} symbols`);
  console.log(`     Key symbols: ${foolSymbols.slice(0, 5).map(s => s.label).join(', ')}`);
  
  console.log(`   The Magician: ${magicianSymbols.length} symbols`);
  console.log(`     Key symbols: ${magicianSymbols.slice(0, 5).map(s => s.label).join(', ')}`);
  
  console.log(`   The High Priestess: ${priestessSymbols.length} symbols`);
  console.log(`     Key symbols: ${priestessSymbols.slice(0, 5).map(s => s.label).join(', ')}\n`);

  // Test 4: Relationship System
  console.log('4. Symbol Relationships:');
  const relationshipStats = getRelationshipStats();
  console.log(`   Total Relationships: ${relationshipStats.totalRelationships}`);
  console.log(`   Bidirectional: ${relationshipStats.bidirectionalCount}`);
  console.log(`   Average Strength: ${relationshipStats.averageStrength.toFixed(2)}`);
  console.log(`   Relationships by Type:`, relationshipStats.relationshipsByType);

  const whiteRoseRelated = getRelatedSymbols('white-rose');
  console.log(`   White Rose has ${whiteRoseRelated.length} related symbols:`, 
    whiteRoseRelated.map(s => s.label).join(', ').substring(0, 100) + '...\n');

  // Test 5: Graph Analysis
  console.log('5. Graph Analysis:');
  const graphStats = getGraphStats();
  console.log(`   Nodes: ${graphStats.nodeCount}, Edges: ${graphStats.edgeCount}`);
  console.log(`   Density: ${graphStats.density.toFixed(4)}`);
  console.log(`   Clusters: ${graphStats.clusterCount} (avg size: ${graphStats.averageClusterSize.toFixed(1)})`);
  
  console.log('   Most Important Symbols:');
  graphStats.mostImportantSymbols.forEach((symbol, i) => {
    const symbolObj = SYMBOL_REGISTRY.get(symbol.symbolId);
    console.log(`     ${i + 1}. ${symbolObj?.label || symbol.symbolId} (${symbol.importance.toFixed(3)})`);
  });

  console.log('\n=== SYMBOL SYSTEM VERIFICATION COMPLETE ===');
  console.log(`✓ Registry contains ${stats.totalSymbols} symbols across ${stats.uniqueCards} cards`);
  console.log(`✓ Relationship graph has ${relationshipStats.totalRelationships} connections`);
  console.log(`✓ Graph analysis completed successfully`);
  
  return {
    registrySize: stats.totalSymbols,
    uniqueCards: stats.uniqueCards,
    totalRelationships: relationshipStats.totalRelationships,
    graphDensity: graphStats.density
  };
};

/**
 * Quick validation that key symbols exist
 */
export const validateKeySymbols = (): boolean => {
  const requiredSymbols = [
    'card-00-the-fool',
    'card-01-the-magician', 
    'card-02-the-high-priestess',
    'card-03-the-empress',
    'card-13-death',
    'white-rose',
    'infinity-symbol',
    'boaz-pillar',
    'jachin-pillar'
  ];

  const missing = requiredSymbols.filter(id => !SYMBOL_REGISTRY.has(id));
  
  if (missing.length > 0) {
    console.error('Missing required symbols:', missing);
    return false;
  }
  
  console.log('✓ All required symbols present');
  return true;
};

// Auto-run tests in development
if (typeof window === 'undefined') {
  testSymbolSystem();
}