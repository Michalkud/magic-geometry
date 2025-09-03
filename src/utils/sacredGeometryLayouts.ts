import { CardNode } from '../data/cardRelationships';

export type LayoutType = 'dynamic' | 'tree-of-life' | 'metatron-cube' | 'flower-of-life' | 'circle' | 'hexagram';

export interface Position {
  x: number;
  y: number;
}

// Tree of Life coordinates from TreeOfLifeMystical component
const TREE_OF_LIFE_POSITIONS: Record<number, Position> = {
  1: { x: 300, y: 50 },   // Kether - Crown (Middle Pillar)
  2: { x: 450, y: 150 },  // Chokmah - Wisdom (Right Pillar - Mercy)
  3: { x: 150, y: 150 },  // Binah - Understanding (Left Pillar - Severity)
  4: { x: 450, y: 300 },  // Chesed - Mercy (Right Pillar - Mercy)
  5: { x: 150, y: 300 },  // Geburah - Severity (Left Pillar - Severity)
  6: { x: 300, y: 350 },  // Tiphareth - Beauty (Middle Pillar)
  7: { x: 450, y: 500 },  // Netzach - Victory (Right Pillar - Mercy)
  8: { x: 150, y: 500 },  // Hod - Glory (Left Pillar - Severity)
  9: { x: 300, y: 550 },  // Yesod - Foundation (Middle Pillar)
  10: { x: 300, y: 700 }  // Malkuth - Kingdom (Middle Pillar)
};

// Metatron's Cube positions - 13 circles in Fruit of Life pattern
const METATRON_CUBE_POSITIONS: Position[] = [
  { x: 300, y: 200 },    // Center
  { x: 300, y: 100 },    // Top
  { x: 300, y: 300 },    // Bottom
  { x: 200, y: 150 },    // Top Left
  { x: 400, y: 150 },    // Top Right
  { x: 200, y: 250 },    // Bottom Left
  { x: 400, y: 250 },    // Bottom Right
  { x: 150, y: 200 },    // Far Left
  { x: 450, y: 200 },    // Far Right
  { x: 250, y: 75 },     // Outer Top Left
  { x: 350, y: 75 },     // Outer Top Right
  { x: 250, y: 325 },    // Outer Bottom Left
  { x: 350, y: 325 }     // Outer Bottom Right
];

// Flower of Life positions - 19 circles pattern
function generateFlowerOfLifePositions(): Position[] {
  const positions: Position[] = [];
  const centerX = 300;
  const centerY = 250;
  const radius = 60; // Distance between circle centers
  
  // Center circle
  positions.push({ x: centerX, y: centerY });
  
  // First ring - 6 circles around center
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60) * Math.PI / 180;
    positions.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }
  
  // Second ring - 12 circles around first ring
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180;
    const ringRadius = radius * Math.sqrt(3);
    positions.push({
      x: centerX + ringRadius * Math.cos(angle),
      y: centerY + ringRadius * Math.sin(angle)
    });
  }
  
  return positions;
}

// Circle layout - nodes arranged in a circle
function generateCirclePositions(nodeCount: number): Position[] {
  const positions: Position[] = [];
  const centerX = 300;
  const centerY = 250;
  const radius = 200;
  
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i * 360 / nodeCount) * Math.PI / 180;
    positions.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }
  
  return positions;
}

// Hexagram (Star of David) layout - 6 points + center
function generateHexagramPositions(): Position[] {
  const positions: Position[] = [];
  const centerX = 300;
  const centerY = 250;
  const radius = 150;
  
  // Center position
  positions.push({ x: centerX, y: centerY });
  
  // 6 points of the hexagram
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60) * Math.PI / 180;
    positions.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }
  
  // Additional positions for more nodes (inner ring)
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 + 30) * Math.PI / 180; // Offset by 30 degrees
    positions.push({
      x: centerX + (radius * 0.6) * Math.cos(angle),
      y: centerY + (radius * 0.6) * Math.sin(angle)
    });
  }
  
  return positions;
}

// Scale positions to fit within viewport dimensions
function scalePositions(positions: Position[], viewportWidth: number, viewportHeight: number, padding: number = 50): Position[] {
  if (positions.length === 0) return positions;
  
  // Find bounds of current positions
  const minX = Math.min(...positions.map(p => p.x));
  const maxX = Math.max(...positions.map(p => p.x));
  const minY = Math.min(...positions.map(p => p.y));
  const maxY = Math.max(...positions.map(p => p.y));
  
  const currentWidth = maxX - minX;
  const currentHeight = maxY - minY;
  
  // Calculate scale factor to fit in viewport with padding
  const scaleX = (viewportWidth - 2 * padding) / currentWidth;
  const scaleY = (viewportHeight - 2 * padding) / currentHeight;
  const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down
  
  // Calculate offset to center the layout
  const scaledWidth = currentWidth * scale;
  const scaledHeight = currentHeight * scale;
  const offsetX = (viewportWidth - scaledWidth) / 2 - minX * scale;
  const offsetY = (viewportHeight - scaledHeight) / 2 - minY * scale;
  
  return positions.map(pos => ({
    x: pos.x * scale + offsetX,
    y: pos.y * scale + offsetY
  }));
}

// Get positions for nodes based on layout type
export function getLayoutPositions(
  nodes: CardNode[], 
  layoutType: LayoutType, 
  viewportWidth: number = 800, 
  viewportHeight: number = 600
): Record<string, Position> {
  const nodePositions: Record<string, Position> = {};
  let positions: Position[] = [];
  
  switch (layoutType) {
    case 'tree-of-life':
      // Position sephirot nodes at Tree of Life positions
      const sephirotNodes = nodes.filter(node => node.type === 'sephirah');
      const otherNodes = nodes.filter(node => node.type !== 'sephirah');
      
      sephirotNodes.forEach((node, index) => {
        const sephirahId = parseInt(node.id.replace('sephirah-', ''));
        if (TREE_OF_LIFE_POSITIONS[sephirahId]) {
          positions.push(TREE_OF_LIFE_POSITIONS[sephirahId]);
        } else {
          // Fallback position for additional sephirot
          positions.push({ x: 300 + (index - 5) * 50, y: 400 });
        }
      });
      
      // Position other nodes in a circle around the Tree of Life
      const circlePositions = generateCirclePositions(otherNodes.length);
      const scaledCircle = scalePositions(circlePositions, viewportWidth * 0.8, viewportHeight * 0.8);
      positions = positions.concat(scaledCircle);
      break;
      
    case 'metatron-cube':
      // Use first 13 positions for main nodes, arrange others around
      const mainNodes = nodes.slice(0, 13);
      const extraNodes = nodes.slice(13);
      
      positions = [...METATRON_CUBE_POSITIONS];
      
      if (extraNodes.length > 0) {
        const extraCircle = generateCirclePositions(extraNodes.length);
        const scaledExtra = scalePositions(extraCircle, viewportWidth * 0.6, viewportHeight * 0.6);
        positions = positions.concat(scaledExtra);
      }
      break;
      
    case 'flower-of-life':
      const flowerPositions = generateFlowerOfLifePositions();
      const remainingNodes = Math.max(0, nodes.length - flowerPositions.length);
      
      positions = [...flowerPositions];
      
      if (remainingNodes > 0) {
        const outerRing = generateCirclePositions(remainingNodes);
        const scaledOuter = scalePositions(outerRing, viewportWidth * 0.4, viewportHeight * 0.4);
        positions = positions.concat(scaledOuter);
      }
      break;
      
    case 'circle':
      positions = generateCirclePositions(nodes.length);
      break;
      
    case 'hexagram':
      const hexagramPositions = generateHexagramPositions();
      const hexRemainingNodes = Math.max(0, nodes.length - hexagramPositions.length);
      
      positions = [...hexagramPositions];
      
      if (hexRemainingNodes > 0) {
        const outerHexRing = generateCirclePositions(hexRemainingNodes);
        const scaledHexOuter = scalePositions(outerHexRing, viewportWidth * 0.3, viewportHeight * 0.3);
        positions = positions.concat(scaledHexOuter);
      }
      break;
      
    default:
      // Dynamic layout - return empty positions to use Cytoscape's automatic layout
      return {};
  }
  
  // Scale all positions to fit viewport
  const scaledPositions = scalePositions(positions, viewportWidth, viewportHeight);
  
  // Map positions to node IDs
  nodes.forEach((node, index) => {
    if (scaledPositions[index]) {
      nodePositions[node.id] = scaledPositions[index];
    }
  });
  
  return nodePositions;
}

// Get Cytoscape layout configuration
export function getLayoutConfig(layoutType: LayoutType, positions?: Record<string, Position>) {
  if (layoutType === 'dynamic') {
    // Use the existing cose layout
    return {
      name: 'cose',
      animate: true,
      animationDuration: 1000,
      nodeDimensionsIncludeLabels: true,
      idealEdgeLength: 100,
      nodeOverlap: 20,
      refresh: 20,
      fit: true,
      padding: 30,
      randomize: false,
      componentSpacing: 100,
      nodeRepulsion: 400000,
      edgeElasticity: 100,
      nestingFactor: 5,
      gravity: 80,
      numIter: 1000,
      initialTemp: 200,
      coolingFactor: 0.95,
      minTemp: 1.0
    };
  }
  
  // For all sacred geometry layouts, use preset with calculated positions
  return {
    name: 'preset',
    animate: true,
    animationDuration: 1000,
    fit: true,
    padding: 30,
    positions
  };
}

export const LAYOUT_OPTIONS = [
  { value: 'dynamic', label: 'Dynamic' },
  { value: 'tree-of-life', label: 'Tree of Life' },
  { value: 'metatron-cube', label: 'Metatron\'s Cube' },
  { value: 'flower-of-life', label: 'Flower of Life' },
  { value: 'circle', label: 'Circle' },
  { value: 'hexagram', label: 'Hexagram' }
];