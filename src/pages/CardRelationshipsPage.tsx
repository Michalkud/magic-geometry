import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { 
  generateCardNodes, 
  generateCardRelationships, 
  RelationshipType, 
  EDUCATIONAL_DESCRIPTIONS,
  RELATIONSHIP_COLORS,
  CardNode,
  CardRelationship
} from '../data/cardRelationships';
import { 
  LayoutType, 
  getLayoutPositions, 
  getLayoutConfig, 
  LAYOUT_OPTIONS 
} from '../utils/sacredGeometryLayouts';
import CardRelationshipsForceGraph from '../components/relationships/CardRelationshipsForceGraph';
import { CONSTELLATION_LAYOUTS, ConstellationLayout } from '../utils/forceGraphHelpers';

const CardRelationshipsPage: React.FC = () => {
  const [selectedRelationshipTypes, setSelectedRelationshipTypes] = useState<RelationshipType[]>(['path']);
  const [selectedNode, setSelectedNode] = useState<CardNode | null>(null);
  const [showLegend, setShowLegend] = useState(true);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('dynamic');
  const [useForceGraph, setUseForceGraph] = useState(true);
  const [is3D, setIs3D] = useState(false);
  const [constellationLayout, setConstellationLayout] = useState('default');
  const cyRef = useRef<cytoscape.Core | null>(null);
  
  const allNodes = generateCardNodes();
  const allRelationships = generateCardRelationships();
  
  // Filter relationships based on selected types
  const filteredRelationships = allRelationships.filter(rel => 
    selectedRelationshipTypes.includes(rel.type)
  );
  
  // Cytoscape stylesheet
  const stylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': (node: any) => node.data('color'),
        'width': (node: any) => node.data('size'),
        'height': (node: any) => node.data('size'),
        'label': (node: any) => node.data('label'),
        'color': '#ffffff',
        'text-outline-width': 2,
        'text-outline-color': '#000000',
        'font-size': '10px',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'text-max-width': '60px'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'border-width': 3,
        'border-color': '#ffffff',
        'box-shadow': '0 0 20px rgba(255,255,255,0.8)'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': (edge: any) => Math.max(1, edge.data('strength') / 2),
        'line-color': (edge: any) => edge.data('color'),
        'opacity': 0.6,
        'curve-style': 'bezier',
        'target-arrow-color': (edge: any) => edge.data('color'),
        'target-arrow-shape': 'triangle',
        'target-arrow-size': 8
      }
    },
    {
      selector: 'edge:selected',
      style: {
        'opacity': 1,
        'width': 4
      }
    }
  ];
  
  // Calculate positions for sacred geometry layouts
  const positions = getLayoutPositions(allNodes, selectedLayout, 800, 600);
  
  // Layout options
  const layout = getLayoutConfig(selectedLayout, positions);
  
  // Build elements for Cytoscape
  const elements = [
    ...allNodes.map(node => ({
      data: {
        id: node.id,
        label: node.label,
        color: node.color,
        size: node.size,
        nodeData: node.data,
        type: node.type
      },
      position: positions[node.id] // Add position for preset layouts
    })),
    ...filteredRelationships.map(rel => ({
      data: {
        id: rel.id,
        source: rel.source,
        target: rel.target,
        color: rel.color,
        strength: rel.strength,
        description: rel.description,
        type: rel.type
      }
    }))
  ];
  
  const handleRelationshipTypeToggle = (type: RelationshipType) => {
    setSelectedRelationshipTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const handleCytoscapeInit = (cy: cytoscape.Core) => {
    cyRef.current = cy;
    
    // Node click handler
    cy.on('tap', 'node', (event: any) => {
      const node = event.target;
      const nodeData = node.data();
      setSelectedNode({
        id: nodeData.id,
        label: nodeData.label,
        type: nodeData.type,
        data: nodeData.nodeData,
        color: nodeData.color,
        size: nodeData.size
      });
    });
    
    // Edge click handler for relationship details
    cy.on('tap', 'edge', (event: any) => {
      const edge = event.target;
      const edgeData = edge.data();
      console.log('Relationship:', edgeData.description);
    });
  };
  
  const resetLayout = () => {
    if (cyRef.current) {
      cyRef.current.layout(layout).run();
    }
  };

  const handleLayoutChange = (newLayout: LayoutType) => {
    setSelectedLayout(newLayout);
    // The layout will be recalculated on the next render due to the dependency on selectedLayout
  };
  
  // Effect to update layout when selectedLayout changes
  useEffect(() => {
    if (cyRef.current) {
      const newPositions = getLayoutPositions(allNodes, selectedLayout, 800, 600);
      const newLayout = getLayoutConfig(selectedLayout, newPositions);
      cyRef.current.layout(newLayout).run();
    }
  }, [selectedLayout, allNodes]);
  
  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Tarot Card Relationships
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto">
          Explore the philosophical connections between cards through elemental, astrological, numerical, and Tree of Life relationships.
        </p>
      </div>
      
      {/* Controls */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {(Object.keys(EDUCATIONAL_DESCRIPTIONS) as RelationshipType[]).map(type => (
          <button
            key={type}
            onClick={() => handleRelationshipTypeToggle(type)}
            className={`px-4 py-2 rounded border transition-colors ${
              selectedRelationshipTypes.includes(type)
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-white border-gray-500 hover:border-white'
            }`}
            style={{
              borderColor: selectedRelationshipTypes.includes(type) 
                ? RELATIONSHIP_COLORS[type] 
                : undefined
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
        
        <button
          onClick={resetLayout}
          className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors ml-4"
        >
          Reset Layout
        </button>
        
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors"
        >
          {showLegend ? 'Hide' : 'Show'} Legend
        </button>
        
        {/* Visualization Engine Toggle */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded border border-gray-600">
          <label className="text-sm text-white">Engine:</label>
          <button
            onClick={() => setUseForceGraph(!useForceGraph)}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              useForceGraph
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            {useForceGraph ? 'Force Graph' : 'Cytoscape'}
          </button>
        </div>

        {/* Layout/Constellation Selector */}
        {useForceGraph ? (
          <select
            value={constellationLayout}
            onChange={(e) => setConstellationLayout(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors border border-gray-600"
          >
            {CONSTELLATION_LAYOUTS.map(layout => (
              <option key={layout.name} value={layout.name}>
                {layout.label}
              </option>
            ))}
          </select>
        ) : (
          <select
            value={selectedLayout}
            onChange={(e) => handleLayoutChange(e.target.value as LayoutType)}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors border border-gray-600"
          >
            {LAYOUT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* 2D/3D Toggle for Force Graph */}
        {useForceGraph && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded border border-gray-600">
            <label className="text-sm text-white">View:</label>
            <button
              onClick={() => setIs3D(!is3D)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                is3D
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {is3D ? '3D' : '2D'}
            </button>
          </div>
        )}
      </div>
      
      {/* Educational descriptions */}
      {selectedRelationshipTypes.length > 0 && (
        <div className="mb-4 max-w-4xl mx-auto">
          {selectedRelationshipTypes.map(type => (
            <div key={type} className="mb-2 p-3 bg-gray-900 rounded">
              <span className="font-semibold" style={{color: RELATIONSHIP_COLORS[type]}}>
                {type.charAt(0).toUpperCase() + type.slice(1)}:
              </span>
              <span className="ml-2 text-gray-300">
                {EDUCATIONAL_DESCRIPTIONS[type]}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex gap-4 h-[600px]">
        {/* Main visualization */}
        <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden">
          {useForceGraph ? (
            <CardRelationshipsForceGraph
              selectedRelationshipTypes={selectedRelationshipTypes}
              onNodeSelect={setSelectedNode}
              selectedNode={selectedNode}
              is3D={is3D}
              width={800}
              height={600}
              constellationLayout={constellationLayout}
            />
          ) : (
            <CytoscapeComponent
              elements={elements}
              style={{width: '100%', height: '100%'}}
              stylesheet={stylesheet}
              layout={layout}
              cy={handleCytoscapeInit}
            />
          )}
        </div>
        
        {/* Side panels */}
        <div className="w-80 space-y-4">
          {/* Legend */}
          {showLegend && (
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Legend</h3>
              
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Node Types:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                      <span>Sephirot (Tree of Life spheres)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                      <span>Major Arcana</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <span>Minor Arcana</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2 mt-4">Elements:</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#ff4757'}}></div>
                      <span>Fire (Wands)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#3742fa'}}></div>
                      <span>Water (Cups)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#ffa502'}}></div>
                      <span>Air (Swords)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#2ed573'}}></div>
                      <span>Earth (Disks)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Selected node details */}
          {selectedNode && (
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Selected: {selectedNode.label}</h3>
              
              {selectedNode.type === 'major' && (
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Hebrew Letter:</span> {selectedNode.data.hebrewLetter} ({selectedNode.data.hebrewName})</p>
                  <p><span className="font-semibold">Element:</span> {selectedNode.data.element}</p>
                  <p><span className="font-semibold">Path:</span> {selectedNode.data.pathNumber}</p>
                  <p className="text-gray-400 italic">{selectedNode.data.note}</p>
                </div>
              )}
              
              {selectedNode.type === 'minor' && (
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Suit:</span> {selectedNode.data.suit}</p>
                  <p><span className="font-semibold">Rank:</span> {selectedNode.data.rank}</p>
                  <p><span className="font-semibold">Sephirah:</span> {selectedNode.data.nodeId}</p>
                </div>
              )}
              
              {selectedNode.type === 'sephirah' && (
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">{selectedNode.data.meaning}</p>
                  <p><span className="font-semibold">Symbols:</span> {selectedNode.data.symbols.join(', ')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="mt-4 text-center">
        <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Tree of Life
        </a>
      </div>
    </div>
  );
};

export default CardRelationshipsPage;