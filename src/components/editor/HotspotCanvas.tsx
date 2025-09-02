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
      return; // Don't start drawing if clicking on existing hotspot
    }
    
    const coords = getRelativeCoordinates(e);
    setIsDrawing(true);
    setDrawStart(coords);
    setDrawEnd(coords);
    onHotspotSelect(null);
  }, [isPreviewMode, getRelativeCoordinates, onHotspotSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || isPreviewMode) return;
    
    const coords = getRelativeCoordinates(e);
    setDrawEnd(coords);
    
    if (onCoordinateChange) {
      onCoordinateChange({
        x1: Math.min(drawStart.x, coords.x),
        y1: Math.min(drawStart.y, coords.y),
        x2: Math.max(drawStart.x, coords.x),
        y2: Math.max(drawStart.y, coords.y),
      });
    }
  }, [isDrawing, isPreviewMode, drawStart, getRelativeCoordinates, onCoordinateChange]);

  const handleMouseUp = useCallback(() => {
    if (!isDrawing || isPreviewMode) return;
    
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
  }, [isDrawing, isPreviewMode, drawStart, drawEnd, hotspots, onHotspotsChange, onHotspotSelect, onCoordinateChange]);

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
        {hotspots.map(hotspot => (
          <rect
            key={hotspot.id}
            data-testid="hotspot-rect"
            data-symbol={hotspot.symbolId || ''}
            x={`${hotspot.x1 * 100}%`}
            y={`${hotspot.y1 * 100}%`}
            width={`${(hotspot.x2 - hotspot.x1) * 100}%`}
            height={`${(hotspot.y2 - hotspot.y1) * 100}%`}
            fill={
              selectedHotspot === hotspot.id
                ? 'rgba(59, 130, 246, 0.3)'
                : hoveredHotspot === hotspot.id
                ? 'rgba(59, 130, 246, 0.2)'
                : 'rgba(59, 130, 246, 0.1)'
            }
            stroke={
              selectedHotspot === hotspot.id
                ? 'rgb(59, 130, 246)'
                : hotspot.symbolId
                ? 'rgb(34, 197, 94)'
                : 'rgb(156, 163, 175)'
            }
            strokeWidth={selectedHotspot === hotspot.id ? 2 : 1}
            className={`${isPreviewMode ? 'pointer-events-auto' : 'pointer-events-auto'} cursor-pointer transition-all`}
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
        ))}
        
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