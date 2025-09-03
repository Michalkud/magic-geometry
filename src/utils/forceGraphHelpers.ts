import { ForceGraphMethods } from 'react-force-graph-2d';
import { CardNode } from '../data/cardRelationships';

export interface ConstellationLayout {
  name: string;
  label: string;
  description: string;
  forces: ForceConfiguration;
  nodePositions?: (nodes: CardNode[]) => Record<string, { x: number; y: number; z?: number }>;
}

export interface ForceConfiguration {
  charge?: { strength: number; distanceMin?: number; distanceMax?: number };
  link?: { distance: number; strength?: number };
  center?: { strength: number; x?: number; y?: number };
  collision?: { radius: number; strength?: number };
  radial?: { radius: number; strength?: number; x?: number; y?: number };
  x?: { strength: number; x?: number };
  y?: { strength: number; y?: number };
}

// Constellation layout configurations
export const CONSTELLATION_LAYOUTS: ConstellationLayout[] = [
  {
    name: 'default',
    label: 'Dynamic',
    description: 'Physics-based force simulation with natural clustering',
    forces: {
      charge: { strength: -300, distanceMin: 1, distanceMax: 2000 },
      link: { distance: 80, strength: 1 },
      center: { strength: 0.1 },
      collision: { radius: 25, strength: 0.7 }
    }
  },
  {
    name: 'spiral-galaxy',
    label: 'Spiral Galaxy',
    description: 'Spiral formation resembling a galaxy with arms',
    forces: {
      charge: { strength: -150 },
      link: { distance: 60 },
      center: { strength: 0.05 },
      radial: { radius: 200, strength: 0.3 }
    },
    nodePositions: (nodes) => {
      const positions: Record<string, { x: number; y: number }> = {};
      const spiralArms = 3;
      const armSeparation = (2 * Math.PI) / spiralArms;
      
      nodes.forEach((node, index) => {
        const arm = index % spiralArms;
        const position = Math.floor(index / spiralArms);
        const angle = arm * armSeparation + position * 0.3;
        const radius = 50 + position * 15;
        
        positions[node.id] = {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        };
      });
      
      return positions;
    }
  },
  {
    name: 'constellation-map',
    label: 'Constellation Map',
    description: 'Star map with constellation-like clustering',
    forces: {
      charge: { strength: -200 },
      link: { distance: 100, strength: 0.5 },
      center: { strength: 0.02 },
      collision: { radius: 30, strength: 0.8 }
    },
    nodePositions: (nodes) => {
      const positions: Record<string, { x: number; y: number }> = {};
      const constellations = [
        { center: { x: -200, y: -200 }, nodes: [] },
        { center: { x: 200, y: -200 }, nodes: [] },
        { center: { x: -200, y: 200 }, nodes: [] },
        { center: { x: 200, y: 200 }, nodes: [] },
        { center: { x: 0, y: 0 }, nodes: [] }
      ];
      
      // Group nodes by type for constellation assignment
      const majorNodes = nodes.filter(n => n.type === 'major');
      const minorNodes = nodes.filter(n => n.type === 'minor');
      const sephirotNodes = nodes.filter(n => n.type === 'sephirah');
      
      // Distribute major arcana across constellations
      majorNodes.forEach((node, index) => {
        const constellation = constellations[index % 4];
        const angle = (index / majorNodes.length) * 2 * Math.PI;
        const radius = 50 + Math.random() * 30;
        
        positions[node.id] = {
          x: constellation.center.x + Math.cos(angle) * radius,
          y: constellation.center.y + Math.sin(angle) * radius
        };
      });
      
      // Put sephirot in center constellation
      sephirotNodes.forEach((node, index) => {
        const angle = (index / sephirotNodes.length) * 2 * Math.PI;
        const radius = 20 + index * 5;
        
        positions[node.id] = {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        };
      });
      
      // Scatter minor arcana around the edges
      minorNodes.forEach((node, index) => {
        const angle = (index / minorNodes.length) * 2 * Math.PI;
        const radius = 250 + Math.random() * 50;
        
        positions[node.id] = {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        };
      });
      
      return positions;
    }
  },
  {
    name: 'cosmic-web',
    label: 'Cosmic Web',
    description: 'Large-scale structure resembling cosmic filaments',
    forces: {
      charge: { strength: -100 },
      link: { distance: 120, strength: 0.3 },
      center: { strength: 0.01 },
      x: { strength: 0.05 },
      y: { strength: 0.05 }
    }
  },
  {
    name: 'solar-system',
    label: 'Solar System',
    description: 'Orbital arrangement with central nodes',
    forces: {
      charge: { strength: -50 },
      link: { distance: 40 },
      center: { strength: 0.3 },
      radial: { radius: 150, strength: 0.8 }
    },
    nodePositions: (nodes) => {
      const positions: Record<string, { x: number; y: number }> = {};
      const sephirotNodes = nodes.filter(n => n.type === 'sephirah');
      const otherNodes = nodes.filter(n => n.type !== 'sephirah');
      
      // Place sephirot in center
      sephirotNodes.forEach((node, index) => {
        const angle = (index / sephirotNodes.length) * 2 * Math.PI;
        const radius = 30;
        
        positions[node.id] = {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        };
      });
      
      // Create orbital rings for other nodes
      const orbitCount = 3;
      otherNodes.forEach((node, index) => {
        const orbit = index % orbitCount;
        const positionInOrbit = Math.floor(index / orbitCount);
        const nodesPerOrbit = Math.ceil(otherNodes.length / orbitCount);
        const angle = (positionInOrbit / nodesPerOrbit) * 2 * Math.PI;
        const radius = 80 + orbit * 60;
        
        positions[node.id] = {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        };
      });
      
      return positions;
    }
  }
];

// Apply constellation layout to force graph
export const applyConstellationLayout = (
  forceGraph: any,
  layout: ConstellationLayout,
  nodes: CardNode[]
) => {
  if (!forceGraph) return;
  
  // Apply force configuration
  const { forces } = layout;
  
  if (forces.charge) {
    forceGraph.d3Force('charge')?.strength(forces.charge.strength);
    if (forces.charge.distanceMin !== undefined) {
      forceGraph.d3Force('charge')?.distanceMin(forces.charge.distanceMin);
    }
    if (forces.charge.distanceMax !== undefined) {
      forceGraph.d3Force('charge')?.distanceMax(forces.charge.distanceMax);
    }
  }
  
  if (forces.link) {
    forceGraph.d3Force('link')?.distance(forces.link.distance);
    if (forces.link.strength !== undefined) {
      forceGraph.d3Force('link')?.strength(forces.link.strength);
    }
  }
  
  if (forces.center) {
    forceGraph.d3Force('center')?.strength(forces.center.strength);
    if (forces.center.x !== undefined && forces.center.y !== undefined) {
      forceGraph.d3Force('center')?.x(forces.center.x).y(forces.center.y);
    }
  }
  
  if (forces.collision) {
    forceGraph.d3Force('collision', forceGraph.d3.forceCollide())
      ?.radius(forces.collision.radius)
      ?.strength(forces.collision.strength || 1);
  }
  
  if (forces.radial) {
    forceGraph.d3Force('radial', forceGraph.d3.forceRadial())
      ?.radius(forces.radial.radius)
      ?.strength(forces.radial.strength || 1);
    if (forces.radial.x !== undefined && forces.radial.y !== undefined) {
      forceGraph.d3Force('radial')?.x(forces.radial.x).y(forces.radial.y);
    }
  }
  
  if (forces.x) {
    forceGraph.d3Force('x', forceGraph.d3.forceX())
      ?.strength(forces.x.strength);
    if (forces.x.x !== undefined) {
      forceGraph.d3Force('x')?.x(forces.x.x);
    }
  }
  
  if (forces.y) {
    forceGraph.d3Force('y', forceGraph.d3.forceY())
      ?.strength(forces.y.strength);
    if (forces.y.y !== undefined) {
      forceGraph.d3Force('y')?.y(forces.y.y);
    }
  }
  
  // Apply initial positions if defined
  if (layout.nodePositions) {
    const positions = layout.nodePositions(nodes);
    
    forceGraph.graphData().nodes.forEach((node: any) => {
      const position = positions[node.id];
      if (position) {
        node.fx = position.x;
        node.fy = position.y;
        if (position.z !== undefined) {
          node.fz = position.z;
        }
      }
    });
    
    // Restart simulation
    forceGraph.d3Force('center')?.strength(0.1);
    setTimeout(() => {
      // Release fixed positions after initial positioning
      forceGraph.graphData().nodes.forEach((node: any) => {
        delete node.fx;
        delete node.fy;
        delete node.fz;
      });
      
      // Re-apply center force
      if (forces.center) {
        forceGraph.d3Force('center')?.strength(forces.center.strength);
      }
    }, 2000);
  }
  
  // Restart the simulation
  forceGraph.d3ReheatSimulation();
};

// Create particle effects for enhanced visuals
export const createParticleSystem = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
  }> = [];
  
  // Create background particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5,
      size: Math.random() * 2
    });
  }
  
  const animateParticles = () => {
    ctx.save();
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Draw particle
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    ctx.restore();
  };
  
  return animateParticles;
};

// Enhanced glow effect for nodes
export const drawNodeGlow = (
  ctx: CanvasRenderingContext2D,
  node: { x: number; y: number },
  radius: number,
  color: string,
  intensity: number = 1
) => {
  const gradient = ctx.createRadialGradient(
    node.x, node.y, 0,
    node.x, node.y, radius * 2
  );
  
  gradient.addColorStop(0, `${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.5, `${color}${Math.floor(intensity * 128).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(1, `${color}00`);
  
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius * 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};