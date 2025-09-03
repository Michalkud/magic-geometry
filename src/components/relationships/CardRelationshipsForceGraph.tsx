import React, { useState, useRef, useEffect, useCallback } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import ForceGraph3D, { ForceGraphMethods as ForceGraphMethods3D } from 'react-force-graph-3d';
import * as THREE from 'three';
import {
  generateCardNodes,
  generateCardRelationships,
  RelationshipType,
  CardNode,
  CardRelationship,
  RELATIONSHIP_COLORS
} from '../../data/cardRelationships';
import {
  CONSTELLATION_LAYOUTS,
  ConstellationLayout,
  applyConstellationLayout
} from '../../utils/forceGraphHelpers';

interface ForceGraphData {
  nodes: ForceGraphNode[];
  links: ForceGraphLink[];
}

interface ForceGraphNode extends CardNode {
  x?: number;
  y?: number;
  z?: number;
  fx?: number;
  fy?: number;
  fz?: number;
  image?: string;
  group?: string;
}

interface ForceGraphLink extends Omit<CardRelationship, 'id'> {
  id: string;
}

interface CardRelationshipsForceGraphProps {
  selectedRelationshipTypes: RelationshipType[];
  onNodeSelect?: (node: CardNode | null) => void;
  selectedNode?: CardNode | null;
  is3D?: boolean;
  width?: number;
  height?: number;
  constellationLayout?: string;
  onLayoutChange?: (layout: ConstellationLayout) => void;
}

const CardRelationshipsForceGraph: React.FC<CardRelationshipsForceGraphProps> = ({
  selectedRelationshipTypes,
  onNodeSelect,
  selectedNode,
  is3D = false,
  width = 800,
  height = 600,
  constellationLayout = 'default',
  onLayoutChange
}) => {
  const fgRef = useRef<any>();
  const [graphData, setGraphData] = useState<ForceGraphData>({ nodes: [], links: [] });
  const [hoveredNode, setHoveredNode] = useState<ForceGraphNode | null>(null);
  const [imageCache] = useState<Map<string, HTMLImageElement>>(new Map());

  // Generate graph data
  useEffect(() => {
    const allNodes = generateCardNodes();
    const allRelationships = generateCardRelationships();
    
    // Filter relationships based on selected types
    const filteredRelationships = allRelationships.filter(rel => 
      selectedRelationshipTypes.includes(rel.type)
    );

    // Convert to force graph format
    const nodes: ForceGraphNode[] = allNodes.map(node => ({
      ...node,
      group: node.type,
      image: getCardImagePath(node)
    }));

    const links: ForceGraphLink[] = filteredRelationships.map(rel => ({
      ...rel,
      id: rel.id
    }));

    setGraphData({ nodes, links });
  }, [selectedRelationshipTypes]);

  // Get card image path
  const getCardImagePath = (node: CardNode): string | undefined => {
    if (node.type === 'major' && node.data?.id) {
      // Use Thoth tarot images for major arcana
      const cardId = node.data.id.toLowerCase().replace(/[\s-]/g, '-');
      return `/cards/${cardId}.jpg`;
    } else if (node.type === 'minor' && node.data?.suit && node.data?.rank) {
      // Use minor arcana images
      const suit = node.data.suit.toLowerCase();
      const rank = node.data.rank.toString().padStart(2, '0');
      return `/cards/${suit}-${rank}.jpg`;
    }
    return undefined;
  };

  // Preload images
  useEffect(() => {
    graphData.nodes.forEach(node => {
      if (node.image && !imageCache.has(node.id)) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          imageCache.set(node.id, img);
        };
        img.onerror = () => {
          console.warn(`Failed to load image for node ${node.id}: ${node.image}`);
        };
        img.src = node.image;
      }
    });
  }, [graphData.nodes, imageCache]);

  // Custom node canvas object for 2D graph with enhanced visuals
  const nodeCanvasObject = useCallback((node: ForceGraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.label || node.id;
    const fontSize = Math.max(8, 12 / globalScale);
    const baseRadius = node.size ? node.size / 4 : 12;
    const nodeRadius = Math.max(8, baseRadius / Math.sqrt(globalScale));
    const x = node.x || 0;
    const y = node.y || 0;

    // Draw glow effect for special nodes
    if (hoveredNode && hoveredNode.id === node.id) {
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, nodeRadius * 3);
      glowGradient.addColorStop(0, `${node.color}80`);
      glowGradient.addColorStop(0.5, `${node.color}40`);
      glowGradient.addColorStop(1, `${node.color}00`);
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius * 3, 0, 2 * Math.PI, false);
      ctx.fill();
    }
    
    // Draw outer ring for sephirot nodes
    if (node.type === 'sephirah') {
      ctx.strokeStyle = '#9b59b6';
      ctx.lineWidth = 3 / globalScale;
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius + 3, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
    
    // Draw shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.arc(x + 2, y + 2, nodeRadius, 0, 2 * Math.PI, false);
    ctx.fill();
    
    // Draw main node background
    ctx.fillStyle = node.color || '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI, false);
    ctx.fill();
    
    // Draw image if available and loaded
    const cachedImage = imageCache.get(node.id);
    if (cachedImage && cachedImage.complete) {
      ctx.save();
      
      // Create circular clipping path with slight inset
      const imageRadius = nodeRadius - 2;
      ctx.beginPath();
      ctx.arc(x, y, imageRadius, 0, 2 * Math.PI, false);
      ctx.clip();
      
      // Draw image with proper scaling
      const imgSize = imageRadius * 2;
      ctx.drawImage(
        cachedImage,
        x - imageRadius,
        y - imageRadius,
        imgSize,
        imgSize
      );
      
      ctx.restore();
      
      // Add subtle inner border for images
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1 / globalScale;
      ctx.beginPath();
      ctx.arc(x, y, imageRadius, 0, 2 * Math.PI, false);
      ctx.stroke();
    } else {
      // Draw icon or symbol for nodes without images
      const symbolSize = nodeRadius * 0.6;
      ctx.fillStyle = '#333333';
      ctx.font = `${symbolSize * 2}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      let symbol = '●';
      if (node.type === 'major') symbol = '✦';
      else if (node.type === 'sephirah') symbol = '◊';
      else if (node.type === 'minor') symbol = '◯';
      
      ctx.fillText(symbol, x, y);
    }
    
    // Draw selection border
    if (node.id === selectedNode?.id) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4 / globalScale;
      ctx.setLineDash([5 / globalScale, 5 / globalScale]);
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius + 4, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Draw connection indicators
    const connectedLinks = graphData.links.filter(link => 
      link.source === node.id || link.target === node.id
    );
    if (connectedLinks.length > 5) {
      // Draw connection count indicator
      const indicatorRadius = 4 / globalScale;
      const indicatorX = x + nodeRadius - indicatorRadius;
      const indicatorY = y - nodeRadius + indicatorRadius;
      
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath();
      ctx.arc(indicatorX, indicatorY, indicatorRadius, 0, 2 * Math.PI, false);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.font = `${6 / globalScale}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(connectedLinks.length.toString(), indicatorX, indicatorY);
    }
    
    // Draw label with enhanced styling
    if (globalScale > 0.5) { // Only show labels at reasonable zoom levels
      const maxLabelLength = 15;
      const truncatedLabel = label.length > maxLabelLength ? 
        label.substring(0, maxLabelLength) + '...' : label;
      
      ctx.font = `${fontSize}px 'Segoe UI', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      const labelY = y + nodeRadius + 6;
      const labelPadding = 4;
      
      // Measure text for background
      const textMetrics = ctx.measureText(truncatedLabel);
      const textWidth = textMetrics.width;
      const textHeight = fontSize;
      
      // Draw label background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(
        x - textWidth / 2 - labelPadding,
        labelY - 2,
        textWidth + labelPadding * 2,
        textHeight + 4
      );
      
      // Draw label text with outline
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3 / globalScale;
      ctx.strokeText(truncatedLabel, x, labelY);
      
      ctx.fillStyle = '#ffffff';
      ctx.fillText(truncatedLabel, x, labelY);
    }
  }, [selectedNode, hoveredNode, imageCache, graphData.links]);

  // Custom link object for colored relationships
  const linkColor = useCallback((link: ForceGraphLink) => {
    return link.color || RELATIONSHIP_COLORS[link.type] || '#666666';
  }, []);

  // Handle node hover
  const handleNodeHover = useCallback((node: ForceGraphNode | null) => {
    setHoveredNode(node);
    
    // Update cursor
    if (node) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, []);

  // Handle node click
  const handleNodeClick = useCallback((node: ForceGraphNode) => {
    onNodeSelect?.(node);
  }, [onNodeSelect]);

  // Handle link hover for relationship descriptions
  const handleLinkHover = useCallback((link: ForceGraphLink | null) => {
    if (link) {
      console.log('Relationship:', link.description);
    }
  }, []);

  // Apply constellation layout when it changes
  useEffect(() => {
    if (fgRef.current && graphData.nodes.length > 0) {
      const layout = CONSTELLATION_LAYOUTS.find(l => l.name === constellationLayout) || CONSTELLATION_LAYOUTS[0];
      const allNodes = generateCardNodes(); // Get original node data for positioning
      
      setTimeout(() => {
        applyConstellationLayout(fgRef.current as any, layout, allNodes);
      }, 100); // Small delay to ensure graph is rendered
    }
  }, [constellationLayout, graphData.nodes]);

  // Enhance canvas with background effects
  const enhanceCanvas = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!ctx || !canvas) return;
    
    // Draw starfield background
    const particles = 200;
    ctx.save();
    
    for (let i = 0; i < particles; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2;
      const alpha = Math.random() * 0.8;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    ctx.restore();
  }, []);

  // Get current constellation layout configuration
  const currentLayout = CONSTELLATION_LAYOUTS.find(l => l.name === constellationLayout) || CONSTELLATION_LAYOUTS[0];

  // Force graph configuration
  const graphConfig = {
    graphData,
    nodeCanvasObject: !is3D ? nodeCanvasObject : undefined,
    nodeLabel: (node: ForceGraphNode) => `${node.label}\n${node.type}\nConnections: ${graphData.links.filter(l => l.source === node.id || l.target === node.id).length}`,
    nodeColor: (node: ForceGraphNode) => node.color || '#ffffff',
    nodeVal: (node: ForceGraphNode) => Math.max(4, (node.size || 40) / 8),
    linkColor,
    linkWidth: (link: ForceGraphLink) => Math.max(0.5, (link.strength || 1) / 3),
    linkOpacity: 0.7,
    linkCurvature: 0.15,
    linkDirectionalParticles: 2,
    linkDirectionalParticleSpeed: 0.002,
    linkDirectionalParticleWidth: 2,
    onNodeHover: handleNodeHover,
    onNodeClick: handleNodeClick,
    onLinkHover: handleLinkHover,
    backgroundColor: '#000011', // Deep space blue-black
    ref: fgRef,
    width,
    height,
    // Enhanced physics configuration based on constellation layout
    d3AlphaDecay: 0.005,
    d3VelocityDecay: 0.15,
    d3Force: currentLayout.forces,
    cooldownTicks: 300,
    onEngineStop: () => {
      if (onLayoutChange) {
        onLayoutChange(currentLayout);
      }
    }
  };

  if (is3D) {
    return (
      <ForceGraph3D
        {...graphConfig}
        nodeThreeObject={(node: ForceGraphNode) => {
          // Create a group for the node
          const group = new THREE.Group();
          
          // Main sphere
          const radius = Math.max(2, (node.size || 40) / 10);
          const geometry = new THREE.SphereGeometry(radius, 16, 16);
          
          // Create material based on node type
          let material;
          if (node.type === 'sephirah') {
            // Glowing material for sephirot
            material = new THREE.MeshBasicMaterial({ 
              color: node.color || '#9b59b6',
              transparent: true,
              opacity: 0.9
            });
            
            // Add outer glow ring
            const ringGeometry = new THREE.RingGeometry(radius * 1.2, radius * 1.4, 16);
            const ringMaterial = new THREE.MeshBasicMaterial({
              color: '#9b59b6',
              transparent: true,
              opacity: 0.3,
              side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.lookAt(0, 0, 1);
            group.add(ring);
          } else {
            material = new THREE.MeshLambertMaterial({ 
              color: node.color || '#ffffff',
              transparent: true,
              opacity: 0.8
            });
          }
          
          const sphere = new THREE.Mesh(geometry, material);
          group.add(sphere);
          
          // Add particle system for enhanced visuals
          if (node.id === selectedNode?.id) {
            const particleCount = 20;
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount; i++) {
              const angle = (i / particleCount) * Math.PI * 2;
              const orbitRadius = radius * 2;
              positions[i * 3] = Math.cos(angle) * orbitRadius;
              positions[i * 3 + 1] = Math.sin(angle) * orbitRadius;
              positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particleMaterial = new THREE.PointsMaterial({
              color: '#ffffff',
              size: 2,
              transparent: true,
              opacity: 0.8
            });
            
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            group.add(particles);
          }
          
          return group;
        }}
        nodeLabel={(node: ForceGraphNode) => `
          <div style="background: rgba(0,0,0,0.8); padding: 8px; border-radius: 4px; color: white; font-size: 12px;">
            <strong>${node.label}</strong><br/>
            Type: ${node.type}<br/>
            Connections: ${graphData.links.filter(l => l.source === node.id || l.target === node.id).length}
          </div>
        `}
        showNavInfo={false}
        controlType="orbit"
        enableNavigationControls={true}
        enableNodeDrag={true}
        linkDirectionalParticles={3}
        linkDirectionalParticleSpeed={0.003}
        linkOpacity={0.6}
        backgroundColor="#000011"
      />
    );
  }

  return (
    <ForceGraph2D
      {...graphConfig}
    />
  );
};

export default CardRelationshipsForceGraph;