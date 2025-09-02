import React from 'react';

export interface CoordinateDisplayProps {
  coordinates: { x1: number; y1: number; x2: number; y2: number } | null;
  imageSize?: { width: number; height: number };
}

export default function CoordinateDisplay({ coordinates, imageSize }: CoordinateDisplayProps) {
  if (!coordinates) {
    return (
      <div data-testid="coordinate-display" className="p-3 bg-gray-800 rounded border border-gray-700">
        <div className="text-sm text-gray-400">No selection</div>
      </div>
    );
  }
  
  const formatCoord = (value: number) => value.toFixed(4);
  
  const pixelCoords = imageSize ? {
    x1: Math.round(coordinates.x1 * imageSize.width),
    y1: Math.round(coordinates.y1 * imageSize.height),
    x2: Math.round(coordinates.x2 * imageSize.width),
    y2: Math.round(coordinates.y2 * imageSize.height),
  } : null;
  
  return (
    <div data-testid="coordinate-display" className="p-3 bg-gray-800 rounded border border-gray-700">
      <h3 className="text-sm font-semibold text-white mb-2">Coordinates</h3>
      
      <div className="space-y-2">
        <div>
          <div className="text-xs text-gray-400 mb-1">Normalized (0-1)</div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-200">
            <div>x1: {formatCoord(coordinates.x1)}</div>
            <div>y1: {formatCoord(coordinates.y1)}</div>
            <div>x2: {formatCoord(coordinates.x2)}</div>
            <div>y2: {formatCoord(coordinates.y2)}</div>
          </div>
        </div>
        
        {pixelCoords && (
          <div>
            <div className="text-xs text-gray-400 mb-1">Pixels</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-200">
              <div>x1: {pixelCoords.x1}px</div>
              <div>y1: {pixelCoords.y1}px</div>
              <div>x2: {pixelCoords.x2}px</div>
              <div>y2: {pixelCoords.y2}px</div>
            </div>
          </div>
        )}
        
        <div>
          <div className="text-xs text-gray-400 mb-1">Dimensions</div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-200">
            <div>w: {formatCoord(coordinates.x2 - coordinates.x1)}</div>
            <div>h: {formatCoord(coordinates.y2 - coordinates.y1)}</div>
            {pixelCoords && (
              <>
                <div>w: {pixelCoords.x2 - pixelCoords.x1}px</div>
                <div>h: {pixelCoords.y2 - pixelCoords.y1}px</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}