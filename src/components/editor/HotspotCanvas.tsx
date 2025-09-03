import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface Rectangle {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  symbolId?: string;
}

export interface HotspotCanvasProps {
  imageSrc: string;
  imageAlt: string;
  hotspots: Rectangle[];
  selectedHotspot?: string | null;
  isPreviewMode?: boolean;
  onHotspotsChange: (hotspots: Rectangle[]) => void;
  onHotspotSelect: (id: string | null) => void;
  onCoordinateChange?: (coords: { x1: number; y1: number; x2: number; y2: number } | null) => void;
}

export default function HotspotCanvas({
  imageSrc,
  imageAlt,
  hotspots,
  selectedHotspot,
  isPreviewMode = false,
  onHotspotsChange,
  onHotspotSelect,
  onCoordinateChange,
}: HotspotCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [drawEnd, setDrawEnd] = useState({ x: 0, y: 0 });
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [isDraggingHotspot, setIsDraggingHotspot] = useState(false);
  const [draggingHotspotId, setDraggingHotspotId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPreview, setDragPreview] = useState<Rectangle | null>(null);

  useEffect(() => {
    const handleImageLoad = () => {
      if (imageRef.current) {
        setImageDimensions({
          width: imageRef.current.naturalWidth,
          height: imageRef.current.naturalHeight,
        });
      }
    };

    if (imageRef.current?.complete) {
      handleImageLoad();
    }
  }, [imageSrc]);

  const getRelativeCoordinates = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current || !imageRef.current) return { x: 0, y: 0 };
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    return { 
      x: Math.max(0, Math.min(1, x)), 
      y: Math.max(0, Math.min(1, y)) 
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isPreviewMode) return;
    
    // Check if clicking on an existing hotspot
    const target = e.target as SVGElement;
    if (target.tagName === 'rect' && target.dataset.testid === 'hotspot-rect') {
      // Start dragging the hotspot - get ID directly from the element
      const hotspotId = target.id;
      
      if (hotspotId) {
        const coords = getRelativeCoordinates(e);
        const hotspot = hotspots.find(h => h.id === hotspotId);
        if (hotspot) {
          setIsDraggingHotspot(true);
          setDraggingHotspotId(hotspotId);
          // Calculate offset from mouse position to rectangle top-left corner
          setDragOffset({
            x: coords.x - hotspot.x1,
            y: coords.y - hotspot.y1
          });
          // Initialize drag preview with current position
          setDragPreview({ ...hotspot });
          onHotspotSelect(hotspotId);
        }
      }
      return;
    }
    
    const coords = getRelativeCoordinates(e);
    setIsDrawing(true);
    setDrawStart(coords);
    setDrawEnd(coords);
    onHotspotSelect(null);
  }, [isPreviewMode, getRelativeCoordinates, onHotspotSelect, hotspots]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPreviewMode) return;
    
    const coords = getRelativeCoordinates(e);
    
    // Handle hotspot dragging
    if (isDraggingHotspot && draggingHotspotId) {
      const hotspot = hotspots.find(h => h.id === draggingHotspotId);
      if (hotspot) {
        const width = hotspot.x2 - hotspot.x1;
        const height = hotspot.y2 - hotspot.y1;
        
        // Calculate new position with offset
        let newX1 = coords.x - dragOffset.x;
        let newY1 = coords.y - dragOffset.y;
        let newX2 = newX1 + width;
        let newY2 = newY1 + height;
        
        // Constrain to canvas bounds
        if (newX1 < 0) {
          newX1 = 0;
          newX2 = width;
        }
        if (newY1 < 0) {
          newY1 = 0;
          newY2 = height;
        }
        if (newX2 > 1) {
          newX2 = 1;
          newX1 = 1 - width;
        }
        if (newY2 > 1) {
          newY2 = 1;
          newY1 = 1 - height;
        }
        
        // Update preview position only (for smooth visual feedback)
        setDragPreview({
          ...hotspot,
          x1: newX1,
          y1: newY1,
          x2: newX2,
          y2: newY2
        });
        
        if (onCoordinateChange) {
          onCoordinateChange({ x1: newX1, y1: newY1, x2: newX2, y2: newY2 });
        }
      }
      return;
    }
    
    // Handle drawing new rectangle
    if (isDrawing) {
      setDrawEnd(coords);
      
      if (onCoordinateChange) {
        onCoordinateChange({
          x1: Math.min(drawStart.x, coords.x),
          y1: Math.min(drawStart.y, coords.y),
          x2: Math.max(drawStart.x, coords.x),
          y2: Math.max(drawStart.y, coords.y),
        });
      }
    }
  }, [isDrawing, isDraggingHotspot, draggingHotspotId, isPreviewMode, drawStart, dragOffset, dragPreview, hotspots, getRelativeCoordinates, onCoordinateChange, onHotspotsChange]);

  const handleMouseUp = useCallback(() => {
    if (isPreviewMode) return;
    
    // Handle end of hotspot dragging
    if (isDraggingHotspot && dragPreview) {
      // Apply the final position from the preview
      const updatedHotspots = hotspots.map(h => 
        h.id === draggingHotspotId 
          ? { ...h, x1: dragPreview.x1, y1: dragPreview.y1, x2: dragPreview.x2, y2: dragPreview.y2 }
          : h
      );
      onHotspotsChange(updatedHotspots);
      
      setIsDraggingHotspot(false);
      setDraggingHotspotId(null);
      setDragOffset({ x: 0, y: 0 });
      setDragPreview(null);
      return;
    }
    
    // Handle end of drawing
    if (!isDrawing) return;
    
    const minSize = 0.02; // Minimum 2% of image size
    const width = Math.abs(drawEnd.x - drawStart.x);
    const height = Math.abs(drawEnd.y - drawStart.y);
    
    if (width > minSize && height > minSize) {
      const newHotspot: Rectangle = {
        id: `hotspot-${Date.now()}`,
        x1: Math.min(drawStart.x, drawEnd.x),
        y1: Math.min(drawStart.y, drawEnd.y),
        x2: Math.max(drawStart.x, drawEnd.x),
        y2: Math.max(drawStart.y, drawEnd.y),
      };
      
      onHotspotsChange([...hotspots, newHotspot]);
      onHotspotSelect(newHotspot.id);
    }
    
    setIsDrawing(false);
    if (onCoordinateChange) {
      onCoordinateChange(null);
    }
  }, [isDrawing, isDraggingHotspot, draggingHotspotId, dragPreview, isPreviewMode, drawStart, drawEnd, hotspots, onHotspotsChange, onHotspotSelect, onCoordinateChange]);

  const handleCanvasContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div 
      ref={canvasRef}
      data-testid="hotspot-canvas"
      className="relative inline-block cursor-crosshair select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={handleCanvasContextMenu}
    >
      <img
        ref={imageRef}
        src={imageSrc}
        alt={imageAlt}
        className="block max-w-full h-auto"
        draggable={false}
        onLoad={() => {
          if (imageRef.current) {
            setImageDimensions({
              width: imageRef.current.naturalWidth,
              height: imageRef.current.naturalHeight,
            });
          }
        }}
      />
      
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Existing hotspots */}
        {hotspots.map(hotspot => {
          const isBeingDragged = draggingHotspotId === hotspot.id;
          const isHovered = hoveredHotspot === hotspot.id;
          const isSelected = selectedHotspot === hotspot.id;
          
          return (
            <rect
              key={hotspot.id}
              id={hotspot.id}
              data-testid="hotspot-rect"
              data-symbol={hotspot.symbolId || ''}
              x={`${hotspot.x1 * 100}%`}
              y={`${hotspot.y1 * 100}%`}
              width={`${(hotspot.x2 - hotspot.x1) * 100}%`}
              height={`${(hotspot.y2 - hotspot.y1) * 100}%`}
              fill={
                isBeingDragged
                  ? 'transparent'
                  : isSelected
                  ? 'rgba(59, 130, 246, 0.3)'
                  : isHovered
                  ? 'rgba(59, 130, 246, 0.2)'
                  : 'rgba(59, 130, 246, 0.1)'
              }
              stroke={
                isBeingDragged
                  ? 'transparent'
                  : isSelected
                  ? 'rgb(59, 130, 246)'
                  : hotspot.symbolId
                  ? 'rgb(34, 197, 94)'
                  : 'rgb(156, 163, 175)'
              }
              strokeWidth={isSelected ? 2 : 1}
              className={`${isPreviewMode ? 'pointer-events-auto' : 'pointer-events-auto'} ${!isPreviewMode && isHovered ? 'cursor-move' : 'cursor-pointer'} transition-opacity`}
              style={{
                cursor: !isPreviewMode && isHovered ? 'move' : 'pointer',
                opacity: isBeingDragged ? 0 : 1
              }}
              onMouseEnter={() => setHoveredHotspot(hotspot.id)}
              onMouseLeave={() => setHoveredHotspot(null)}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!isPreviewMode) {
                  onHotspotSelect(hotspot.id);
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const confirmDelete = window.confirm('Delete this hotspot?');
                if (confirmDelete) {
                  onHotspotsChange(hotspots.filter(h => h.id !== hotspot.id));
                  onHotspotSelect(null);
                }
              }}
            />
          );
        })}
        
        {/* Dragging preview rectangle */}
        {dragPreview && (
          <rect
            data-testid="drag-preview"
            data-symbol={dragPreview.symbolId || ''}
            x={`${dragPreview.x1 * 100}%`}
            y={`${dragPreview.y1 * 100}%`}
            width={`${(dragPreview.x2 - dragPreview.x1) * 100}%`}
            height={`${(dragPreview.y2 - dragPreview.y1) * 100}%`}
            fill="rgba(59, 130, 246, 0.4)"
            stroke="rgb(37, 99, 235)"
            strokeWidth="2"
            strokeDasharray="5,3"
            className="pointer-events-none"
            style={{
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
            }}
          />
        )}
        
        {/* Drawing rectangle */}
        {isDrawing && !isPreviewMode && (
          <rect
            x={`${Math.min(drawStart.x, drawEnd.x) * 100}%`}
            y={`${Math.min(drawStart.y, drawEnd.y) * 100}%`}
            width={`${Math.abs(drawEnd.x - drawStart.x) * 100}%`}
            height={`${Math.abs(drawEnd.y - drawStart.y) * 100}%`}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="pointer-events-none"
          />
        )}
      </svg>
      
      {/* Hotspot preview/tooltip in preview mode */}
      {isPreviewMode && hoveredHotspot && (
        <div
          data-testid="symbol-tooltip"
          className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg pointer-events-none"
          style={{
            left: '50%',
            bottom: '10px',
            transform: 'translateX(-50%)',
          }}
        >
          {hotspots.find(h => h.id === hoveredHotspot)?.symbolId || 'No symbol assigned'}
        </div>
      )}
      
      {/* Preview for selected hotspot in edit mode */}
      {!isPreviewMode && selectedHotspot && (
        <div
          data-testid="hotspot-preview"
          className="absolute z-10 px-2 py-1 text-xs text-white bg-blue-600 rounded shadow-lg pointer-events-none"
          style={{
            left: '50%',
            top: '-30px',
            transform: 'translateX(-50%)',
          }}
        >
          {hotspots.find(h => h.id === selectedHotspot)?.symbolId || 'Select a symbol'}
        </div>
      )}
    </div>
  );
}