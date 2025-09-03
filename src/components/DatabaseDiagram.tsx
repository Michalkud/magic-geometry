import React, { useState, useCallback, useRef, useEffect } from 'react';

interface TableNode {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  category: 'core' | 'symbol' | 'meaning' | 'visual' | 'astrological';
  recordCount: number;
}

interface Relationship {
  from: string;
  to: string;
  field: string;
}

interface DatabaseDiagramProps {
  relationships: Relationship[];
  recordCounts: Record<string, number>;
  onNodeClick?: (tableName: string) => void;
}

export default function DatabaseDiagram({ relationships, recordCounts, onNodeClick }: DatabaseDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Define table positions and categories
  const tables: TableNode[] = [
    // Core Card Tables (top row)
    { name: 'cards', x: 200, y: 50, width: 140, height: 80, category: 'core', recordCount: recordCounts.cards || 0 },
    { name: 'sephirot', x: 400, y: 50, width: 140, height: 80, category: 'core', recordCount: recordCounts.sephirot || 0 },
    { name: 'minorCards', x: 600, y: 50, width: 140, height: 80, category: 'core', recordCount: recordCounts.minorCards || 0 },
    
    // Symbol System Tables (middle row)
    { name: 'symbols', x: 100, y: 200, width: 140, height: 80, category: 'symbol', recordCount: recordCounts.symbols || 0 },
    { name: 'cardAppearances', x: 300, y: 200, width: 140, height: 80, category: 'symbol', recordCount: recordCounts.cardAppearances || 0 },
    { name: 'relationships', x: 500, y: 200, width: 140, height: 80, category: 'symbol', recordCount: recordCounts.relationships || 0 },
    { name: 'hotspots', x: 700, y: 200, width: 140, height: 80, category: 'visual', recordCount: recordCounts.hotspots || 0 },
    
    // Meaning & Detail Tables (bottom row)
    { name: 'cardMeanings', x: 200, y: 350, width: 140, height: 80, category: 'meaning', recordCount: recordCounts.cardMeanings || 0 },
    { name: 'symbolDetails', x: 400, y: 350, width: 140, height: 80, category: 'meaning', recordCount: recordCounts.symbolDetails || 0 },
    { name: 'geometries', x: 600, y: 350, width: 140, height: 80, category: 'visual', recordCount: recordCounts.geometries || 0 },
    { name: 'decans', x: 800, y: 350, width: 140, height: 80, category: 'astrological', recordCount: recordCounts.decans || 0 },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return '#60a5fa'; // blue-400
      case 'symbol': return '#34d399'; // emerald-400
      case 'meaning': return '#a78bfa'; // violet-400
      case 'visual': return '#fbbf24'; // amber-400
      case 'astrological': return '#f87171'; // red-400
      default: return '#9ca3af'; // gray-400
    }
  };

  const getTableNode = (name: string) => tables.find(t => t.name === name);

  const isRelationshipHighlighted = (rel: Relationship) => {
    if (!hoveredNode) return false;
    return rel.from === hoveredNode || rel.to === hoveredNode;
  };

  const getConnectedTables = (tableName: string) => {
    const connected = new Set<string>();
    relationships.forEach(rel => {
      if (rel.from === tableName) connected.add(rel.to);
      if (rel.to === tableName) connected.add(rel.from);
    });
    return connected;
  };

  const handleNodeClick = (tableName: string) => {
    if (onNodeClick) {
      onNodeClick(tableName);
    }
  };

  const drawConnection = (rel: Relationship, index: number) => {
    const fromTable = getTableNode(rel.from);
    const toTable = getTableNode(rel.to);
    if (!fromTable || !toTable) return null;

    // Calculate connection points
    const fromX = fromTable.x + fromTable.width / 2;
    const fromY = fromTable.y + fromTable.height;
    const toX = toTable.x + toTable.width / 2;
    const toY = toTable.y;

    // Create a curved path
    const midY = (fromY + toY) / 2;
    const path = `M ${fromX} ${fromY} Q ${fromX} ${midY} ${(fromX + toX) / 2} ${midY} T ${toX} ${toY}`;

    const isHighlighted = isRelationshipHighlighted(rel);
    const connectedTables = hoveredNode ? getConnectedTables(hoveredNode) : new Set();

    return (
      <g key={`rel-${index}`} data-relationship data-highlighted={isHighlighted ? "true" : "false"}>
        <path
          d={path}
          stroke={isHighlighted ? '#60a5fa' : '#374151'}
          strokeWidth={isHighlighted ? 2 : 1}
          fill="none"
          opacity={hoveredNode && !isHighlighted ? 0.2 : 1}
        />
        {isHighlighted && (
          <text
            x={(fromX + toX) / 2}
            y={midY}
            fill="#9ca3af"
            fontSize="10"
            textAnchor="middle"
            className="pointer-events-none"
          >
            {rel.field}
          </text>
        )}
      </g>
    );
  };

  return (
    <div data-testid="database-diagram" className="bg-gray-800 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Visual Database Schema</h2>
      
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded"></div>
          <span className="text-sm text-gray-400">Core Tables</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-400 rounded"></div>
          <span className="text-sm text-gray-400">Symbol System</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-violet-400 rounded"></div>
          <span className="text-sm text-gray-400">Meanings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-400 rounded"></div>
          <span className="text-sm text-gray-400">Visual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 rounded"></div>
          <span className="text-sm text-gray-400">Astrological</span>
        </div>
      </div>

      <svg
        ref={svgRef}
        width="100%"
        height="500"
        viewBox="0 0 1000 500"
        className="w-full"
      >
        {/* Draw connections first (behind nodes) */}
        {relationships.map((rel, index) => drawConnection(rel, index))}
        
        {/* Draw table nodes */}
        {tables.map(table => {
          const connectedTables = hoveredNode ? getConnectedTables(hoveredNode) : new Set();
          const isConnected = connectedTables.has(table.name);
          const isHovered = table.name === hoveredNode;
          
          return (
            <g
              key={table.name}
              data-node={table.name}
              className={`cursor-pointer transition-all ${isHovered ? 'highlighted' : ''}`}
              onMouseEnter={() => setHoveredNode(table.name)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(table.name)}
            >
              <rect
                x={table.x}
                y={table.y}
                width={table.width}
                height={table.height}
                fill={getCategoryColor(table.category)}
                stroke={isHovered || isConnected ? '#fff' : getCategoryColor(table.category)}
                strokeWidth={isHovered ? 3 : isConnected ? 2 : 1}
                rx="5"
                opacity={hoveredNode && !isHovered && !isConnected ? 0.3 : 1}
              />
              
              <text
                x={table.x + table.width / 2}
                y={table.y + 30}
                fill="white"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
                className="pointer-events-none"
              >
                {table.name}
              </text>
              
              <text
                x={table.x + table.width / 2}
                y={table.y + 50}
                fill="white"
                fontSize="12"
                textAnchor="middle"
                className="pointer-events-none"
              >
                {table.recordCount} records
              </text>
              
              {isHovered && (
                <text
                  x={table.x + table.width / 2}
                  y={table.y + 70}
                  fill="white"
                  fontSize="10"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  Click to view
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}