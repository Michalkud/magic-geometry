import React, { useState, useRef, useMemo } from 'react';
import { SymbolIcon } from './icons/SymbolIcon';

export type LayerType = 'symbols' | 'colors' | 'geometry' | 'qabalah' | 'astrology' | 'alchemy' | 'text';

export type SymbolHotspot = {
  key: string;
  polygon: number[][];  // Normalized coordinates 0-1
  meanings: string[];
  links: string[];
  note?: string;
};

export type CardCanvasProps = {
  cardId: string;
  imageSrc: string;
  imageAlt: string;
  symbols?: SymbolHotspot[];
  width?: number;
  height?: number;
  className?: string;
};

// Layer configuration
const LAYERS: { id: LayerType; label: string; defaultOn: boolean; color: string }[] = [
  { id: 'symbols', label: 'Symbols', defaultOn: true, color: 'cyan' },
  { id: 'colors', label: 'Colors', defaultOn: false, color: 'violet' },
  { id: 'geometry', label: 'Geometry', defaultOn: false, color: 'amber' },
  { id: 'qabalah', label: 'Qabalah', defaultOn: false, color: 'emerald' },
  { id: 'astrology', label: 'Astrology', defaultOn: false, color: 'blue' },
  { id: 'alchemy', label: 'Alchemy', defaultOn: false, color: 'rose' },
  { id: 'text', label: 'Text', defaultOn: true, color: 'slate' },
];

export default function CardCanvas({
  cardId,
  imageSrc,
  imageAlt,
  symbols = [],
  width = 400,
  height = 600,
  className = '',
}: CardCanvasProps) {
  const [activeLayers, setActiveLayers] = useState<Set<LayerType>>(
    new Set(LAYERS.filter(l => l.defaultOn).map(l => l.id))
  );
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Toggle layer visibility
  const toggleLayer = (layerId: LayerType) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  };

  // Convert normalized polygon to SVG path
  const polygonToPath = (polygon: number[][]) => {
    if (polygon.length === 0) return '';
    const points = polygon.map(([x, y]) => `${x * width},${y * height}`).join(' ');
    return points;
  };

  // Get symbol details for tooltip
  const getSymbolDetails = (symbolKey: string) => {
    return symbols.find(s => s.key === symbolKey);
  };

  return (
    <div className={`relative ${className}`} ref={canvasRef}>
      {/* Layer Toggle Pills */}
      <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1">
        {LAYERS.map(layer => (
          <button
            key={layer.id}
            onClick={() => toggleLayer(layer.id)}
            className={`
              px-2 py-1 text-[10px] font-medium rounded-full border transition-all
              ${activeLayers.has(layer.id)
                ? `bg-${layer.color}-500/20 border-${layer.color}-400/50 text-${layer.color}-200`
                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              }
            `}
            aria-pressed={activeLayers.has(layer.id)}
            aria-label={`Toggle ${layer.label} layer`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* Card Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        width={width}
        height={height}
        className="block w-full h-auto rounded-lg"
        style={{ maxWidth: width, maxHeight: height }}
      />

      {/* Symbol Hotspots Layer */}
      {activeLayers.has('symbols') && symbols.length > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${width} ${height}`}
          style={{ maxWidth: width, maxHeight: height }}
        >
          {symbols.map(symbol => {
            const isHovered = hoveredSymbol === symbol.key;
            const isSelected = selectedSymbol === symbol.key;
            
            return (
              <g key={symbol.key}>
                <polygon
                  points={polygonToPath(symbol.polygon)}
                  fill={isSelected ? 'rgba(6, 182, 212, 0.2)' : isHovered ? 'rgba(6, 182, 212, 0.1)' : 'transparent'}
                  stroke={isSelected ? 'rgb(6, 182, 212)' : isHovered ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.2)'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="pointer-events-auto cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredSymbol(symbol.key)}
                  onMouseLeave={() => setHoveredSymbol(null)}
                  onClick={() => setSelectedSymbol(symbol.key === selectedSymbol ? null : symbol.key)}
                />
                {/* Pulse animation for selected */}
                {isSelected && (
                  <polygon
                    points={polygonToPath(symbol.polygon)}
                    fill="none"
                    stroke="rgb(6, 182, 212)"
                    strokeWidth="2"
                    className="animate-pulse"
                    style={{ pointerEvents: 'none' }}
                  />
                )}
              </g>
            );
          })}
        </svg>
      )}

      {/* Tooltip for hovered/selected symbol */}
      {(hoveredSymbol || selectedSymbol) && (
        <div className="absolute bottom-2 left-2 right-2 z-30">
          <div className="bg-slate-900/95 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3 shadow-xl">
            {(() => {
              const symbol = getSymbolDetails(hoveredSymbol || selectedSymbol || '');
              if (!symbol) return null;
              
              return (
                <>
                  <div className="flex items-start gap-2 mb-2">
                    <SymbolIcon
                      name={symbol.key}
                      size={24}
                      className="text-cyan-300 flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-cyan-100 capitalize">
                        {symbol.key.replace(/-/g, ' ')}
                      </h4>
                      {symbol.note && (
                        <p className="text-xs text-slate-300 mt-1">{symbol.note}</p>
                      )}
                    </div>
                  </div>
                  
                  {symbol.meanings.length > 0 && (
                    <div className="mb-2">
                      <div className="text-[10px] uppercase tracking-wide text-slate-400 mb-1">
                        Meanings
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {symbol.meanings.map((meaning, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-500/20"
                          >
                            {meaning}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {symbol.links.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-400 mb-1">
                        Connections
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {symbol.links.map((link, i) => (
                          <button
                            key={i}
                            className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-violet-500/10 text-violet-200 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
                            onClick={() => console.log('Navigate to:', link)}
                          >
                            {link}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Geometry Overlay (placeholder for future implementation) */}
      {activeLayers.has('geometry') && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${width} ${height}`}
            style={{ maxWidth: width, maxHeight: height }}
          >
            {/* Flower of Life pattern - simplified version */}
            <g stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" fill="none">
              <circle cx={width/2} cy={height/2} r={width/6} />
              <circle cx={width/2 - width/12} cy={height/2} r={width/6} />
              <circle cx={width/2 + width/12} cy={height/2} r={width/6} />
              <circle cx={width/2} cy={height/2 - width/12} r={width/6} />
              <circle cx={width/2} cy={height/2 + width/12} r={width/6} />
            </g>
          </svg>
        </div>
      )}

      {/* Color Scale Overlay (placeholder) */}
      {activeLayers.has('colors') && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(251, 191, 36, 0.1) 100%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      )}
    </div>
  );
}