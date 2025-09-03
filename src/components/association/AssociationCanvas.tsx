import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface SymbolAssociation {
  id: string;
  symbolId: string;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  radius: number; // normalized 0-1
}

interface AssociationCanvasProps {
  cardImage: string;
  cardAlt: string;
  associations: SymbolAssociation[];
  activeArrow: { fromX: number; fromY: number; toX: number; toY: number } | null;
  onAssociationCreate: (association: SymbolAssociation) => void;
  onAssociationDelete: (id: string) => void;
  draggedSymbol: { id: string; name: string } | null;
}

export default function AssociationCanvas({
  cardImage,
  cardAlt,
  associations,
  activeArrow,
  onAssociationCreate,
  onAssociationDelete,
  draggedSymbol,
}: AssociationCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [hoveredAssociation, setHoveredAssociation] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getRelativeCoordinates = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current) return { x: 0, y: 0 };
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    return { 
      x: Math.max(0, Math.min(1, x)), 
      y: Math.max(0, Math.min(1, y)) 
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const coords = getRelativeCoordinates(e);
    setMousePosition(coords);
  }, [getRelativeCoordinates]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!draggedSymbol || !activeArrow) return;
    
    const coords = getRelativeCoordinates(e);
    
    // Calculate radius based on arrow length
    const dx = activeArrow.toX - activeArrow.fromX;
    const dy = activeArrow.toY - activeArrow.fromY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = Math.min(0.1, distance * 0.1); // Scale radius based on distance
    
    // Create new association
    const newAssociation: SymbolAssociation = {
      id: `${draggedSymbol.id}-${Date.now()}`,
      symbolId: draggedSymbol.id,
      x: coords.x,
      y: coords.y,
      radius: radius,
    };
    
    onAssociationCreate(newAssociation);
  }, [draggedSymbol, activeArrow, getRelativeCoordinates, onAssociationCreate]);

  const handleRightClick = useCallback((e: React.MouseEvent, associationId: string) => {
    e.preventDefault();
    if (confirm('Delete this association?')) {
      onAssociationDelete(associationId);
    }
  }, [onAssociationDelete]);

  return (
    <div 
      ref={canvasRef}
      data-testid="association-canvas"
      className="relative w-full h-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Card Image */}
      <img
        ref={imageRef}
        src={cardImage}
        alt={cardAlt}
        data-testid="card-image"
        className="max-w-[400px] max-h-[600px] object-contain shadow-lg rounded-lg"
        draggable={false}
      />
      
      {/* SVG Overlay for Associations */}
      <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
        {/* Active Arrow (during drag) */}
        {activeArrow && (
          <line
            data-testid="association-arrow"
            x1={`${activeArrow.fromX * 100}%`}
            y1={`${activeArrow.fromY * 100}%`}
            x2={`${activeArrow.toX * 100}%`}
            y2={`${activeArrow.toY * 100}%`}
            stroke="blue"
            strokeWidth="2"
            strokeDasharray="5,5"
            markerEnd="url(#arrowhead)"
          />
        )}
        
        {/* Saved Associations */}
        {associations.map((assoc) => (
          <g key={assoc.id}>
            {/* Radius Circle */}
            <circle
              data-testid="radius-circle"
              cx={`${assoc.x * 100}%`}
              cy={`${assoc.y * 100}%`}
              r={`${assoc.radius * 100}%`}
              fill="rgba(59, 130, 246, 0.2)"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              className="pointer-events-auto cursor-pointer"
              onMouseEnter={() => setHoveredAssociation(assoc.id)}
              onMouseLeave={() => setHoveredAssociation(null)}
              onContextMenu={(e) => handleRightClick(e as any, assoc.id)}
            />
            
            {/* Center Point */}
            <circle
              cx={`${assoc.x * 100}%`}
              cy={`${assoc.y * 100}%`}
              r="4"
              fill="rgb(59, 130, 246)"
            />
          </g>
        ))}
        
        {/* Arrow Marker Definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="blue"
            />
          </marker>
        </defs>
      </svg>
      
      {/* Association Saved Indicator */}
      {associations.length > 0 && (
        <div 
          data-testid="association-saved"
          className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm"
        >
          {associations.length} saved
        </div>
      )}
      
      {/* Radius Value Display */}
      {hoveredAssociation && (
        <div 
          data-testid="radius-value"
          className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm"
        >
          Radius: {(associations.find(a => a.id === hoveredAssociation)?.radius || 0).toFixed(3)}
        </div>
      )}
    </div>
  );
}