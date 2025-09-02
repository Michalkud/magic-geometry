/**
 * Graph Utilities
 * Functions for traversing and analyzing the symbol relationship graph
 */

import { Symbol, SymbolRelationship } from './types';
import { SYMBOL_REGISTRY } from './symbolRegistry';
import { symbolRelationships, getRelationshipsForSymbol } from './relationships';

/**
 * Basic graph traversal and analysis functions
 */

/**
 * Find all symbols connected to a given symbol (one degree of separation)
 */
export const getRelatedSymbols = (symbolId: string): Symbol[] => {
  const relationships = getRelationshipsForSymbol(symbolId);
  const relatedIds = new Set<string>();
  
  relationships.forEach(rel => {
    if (rel.sourceId === symbolId) {
      relatedIds.add(rel.targetId);
    }
    if (rel.bidirectional && rel.targetId === symbolId) {
      relatedIds.add(rel.sourceId);
    }
  });
  
  return Array.from(relatedIds)
    .map(id => SYMBOL_REGISTRY.get(id))
    .filter((symbol): symbol is Symbol => symbol !== undefined);
};

/**
 * Breadth-first search to find path between two symbols
 */
export const findShortestPath = (startId: string, endId: string): string[] | null => {
  if (startId === endId) return [startId];
  
  const queue: { id: string; path: string[] }[] = [{ id: startId, path: [startId] }];
  const visited = new Set<string>([startId]);
  
  while (queue.length > 0) {
    const { id: currentId, path } = queue.shift()!;
    
    const relationships = getRelationshipsForSymbol(currentId);
    
    for (const rel of relationships) {
      let nextId: string | null = null;
      
      if (rel.sourceId === currentId) {
        nextId = rel.targetId;
      } else if (rel.bidirectional && rel.targetId === currentId) {
        nextId = rel.sourceId;
      }
      
      if (nextId && !visited.has(nextId)) {
        const newPath = [...path, nextId];
        
        if (nextId === endId) {
          return newPath;
        }
        
        visited.add(nextId);
        queue.push({ id: nextId, path: newPath });
      }
    }
  }
  
  return null; // No path found
};

/**
 * Find all symbols within N degrees of separation
 */
export const findSymbolsWithinDegrees = (symbolId: string, maxDegrees: number): Map<string, number> => {
  const distances = new Map<string, number>();
  const queue: { id: string; degree: number }[] = [{ id: symbolId, degree: 0 }];
  
  distances.set(symbolId, 0);
  
  while (queue.length > 0) {
    const { id: currentId, degree } = queue.shift()!;
    
    if (degree >= maxDegrees) continue;
    
    const relationships = getRelationshipsForSymbol(currentId);
    
    for (const rel of relationships) {
      let nextId: string | null = null;
      
      if (rel.sourceId === currentId) {
        nextId = rel.targetId;
      } else if (rel.bidirectional && rel.targetId === currentId) {
        nextId = rel.sourceId;
      }
      
      if (nextId && !distances.has(nextId)) {
        distances.set(nextId, degree + 1);
        queue.push({ id: nextId, degree: degree + 1 });
      }
    }
  }
  
  return distances;
};

/**
 * Calculate symbol importance using PageRank-like algorithm
 */
export const calculateSymbolImportance = (iterations: number = 10): Map<string, number> => {
  const symbols = Array.from(SYMBOL_REGISTRY.keys());
  const importance = new Map<string, number>();
  const dampingFactor = 0.85;
  
  // Initialize all symbols with equal importance
  symbols.forEach(id => importance.set(id, 1.0));
  
  for (let i = 0; i < iterations; i++) {
    const newImportance = new Map<string, number>();
    
    symbols.forEach(symbolId => {
      let sum = 0;
      const incomingRels = symbolRelationships.filter(rel => 
        rel.targetId === symbolId || (rel.bidirectional && rel.sourceId === symbolId)
      );
      
      incomingRels.forEach(rel => {
        const sourceId = rel.targetId === symbolId ? rel.sourceId : rel.targetId;
        const outgoingCount = getRelationshipsForSymbol(sourceId).length;
        if (outgoingCount > 0) {
          sum += (importance.get(sourceId) || 0) * rel.strength / outgoingCount;
        }
      });
      
      newImportance.set(symbolId, (1 - dampingFactor) + dampingFactor * sum);
    });
    
    // Update importance scores
    newImportance.forEach((score, id) => importance.set(id, score));
  }
  
  return importance;
};

/**
 * Detect clusters of highly connected symbols
 */
export const detectSymbolClusters = (minClusterSize: number = 3): string[][] => {
  const visited = new Set<string>();
  const clusters: string[][] = [];
  
  Array.from(SYMBOL_REGISTRY.keys()).forEach(symbolId => {
    if (visited.has(symbolId)) return;
    
    const cluster = new Set<string>();
    const queue = [symbolId];
    
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;
      
      visited.add(currentId);
      cluster.add(currentId);
      
      const relationships = getRelationshipsForSymbol(currentId);
      const strongConnections = relationships.filter(rel => rel.strength >= 0.7);
      
      strongConnections.forEach(rel => {
        const nextId = rel.sourceId === currentId ? rel.targetId : rel.sourceId;
        if (!visited.has(nextId)) {
          queue.push(nextId);
        }
      });
    }
    
    if (cluster.size >= minClusterSize) {
      clusters.push(Array.from(cluster));
    }
  });
  
  return clusters;
};

/**
 * Find patterns in symbol appearances across cards
 */
export const findSymbolPatterns = () => {
  const cardSymbolMap = new Map<string, string[]>();
  
  // Build card -> symbols mapping
  Array.from(SYMBOL_REGISTRY.values()).forEach(symbol => {
    symbol.appearances.forEach(appearance => {
      if (!cardSymbolMap.has(appearance.cardId)) {
        cardSymbolMap.set(appearance.cardId, []);
      }
      cardSymbolMap.get(appearance.cardId)!.push(symbol.id);
    });
  });
  
  // Find common symbol combinations
  const symbolPairs = new Map<string, number>();
  
  cardSymbolMap.forEach(symbols => {
    for (let i = 0; i < symbols.length; i++) {
      for (let j = i + 1; j < symbols.length; j++) {
        const pair = [symbols[i], symbols[j]].sort().join('|');
        symbolPairs.set(pair, (symbolPairs.get(pair) || 0) + 1);
      }
    }
  });
  
  // Return most common pairs
  return Array.from(symbolPairs.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([pair, count]) => ({ symbols: pair.split('|'), count }));
};

/**
 * Advanced analysis functions
 */

/**
 * Find bridge symbols that connect different clusters
 */
export const findBridgeSymbols = (): string[] => {
  const clusters = detectSymbolClusters();
  const bridgeSymbols: string[] = [];
  
  Array.from(SYMBOL_REGISTRY.keys()).forEach(symbolId => {
    const relatedSymbols = getRelatedSymbols(symbolId);
    const clusterMemberships = new Set<number>();
    
    relatedSymbols.forEach(related => {
      clusters.forEach((cluster, index) => {
        if (cluster.includes(related.id)) {
          clusterMemberships.add(index);
        }
      });
    });
    
    // If symbol connects to multiple clusters, it's a bridge
    if (clusterMemberships.size > 1) {
      bridgeSymbols.push(symbolId);
    }
  });
  
  return bridgeSymbols;
};

/**
 * Calculate centrality measures for symbols
 */
export const calculateCentralityMeasures = () => {
  const symbols = Array.from(SYMBOL_REGISTRY.keys());
  const centrality = {
    degree: new Map<string, number>(),
    betweenness: new Map<string, number>(),
    closeness: new Map<string, number>()
  };
  
  // Degree centrality (number of connections)
  symbols.forEach(symbolId => {
    const connections = getRelationshipsForSymbol(symbolId).length;
    centrality.degree.set(symbolId, connections);
  });
  
  // Simplified betweenness centrality
  symbols.forEach(symbolId => {
    let betweennessScore = 0;
    
    symbols.forEach(sourceId => {
      if (sourceId === symbolId) return;
      symbols.forEach(targetId => {
        if (targetId === symbolId || targetId === sourceId) return;
        
        const pathThroughSymbol = findShortestPath(sourceId, symbolId);
        const directPath = findShortestPath(sourceId, targetId);
        
        if (pathThroughSymbol && directPath && 
            pathThroughSymbol.includes(symbolId) && 
            pathThroughSymbol.length === directPath.length) {
          betweennessScore += 1;
        }
      });
    });
    
    centrality.betweenness.set(symbolId, betweennessScore);
  });
  
  return centrality;
};

/**
 * Export utility functions and current graph statistics
 */
export const getGraphStats = () => {
  const symbols = Array.from(SYMBOL_REGISTRY.keys());
  const relationships = symbolRelationships;
  const clusters = detectSymbolClusters();
  const importance = calculateSymbolImportance();
  
  return {
    nodeCount: symbols.length,
    edgeCount: relationships.length,
    density: (relationships.length * 2) / (symbols.length * (symbols.length - 1)),
    clusterCount: clusters.length,
    averageClusterSize: clusters.reduce((sum, cluster) => sum + cluster.length, 0) / clusters.length,
    mostImportantSymbols: Array.from(importance.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id, score]) => ({ symbolId: id, importance: score }))
  };
};

// Log graph stats for development
if (typeof window === 'undefined') {
  console.log('Symbol Graph Stats:', getGraphStats());
}