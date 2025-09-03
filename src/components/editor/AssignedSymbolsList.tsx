import React, { useMemo } from 'react';
import { Rectangle } from './HotspotCanvas';
import { SYMBOL_REGISTRY } from '@/data/symbols/symbolRegistry';
import { Symbol } from '@/data/symbols/types';

export interface AssignedSymbolsListProps {
  hotspots: Rectangle[];
  selectedHotspot: string | null;
  onSelectHotspot: (hotspotId: string) => void;
  onRemoveSymbol: (hotspotId: string) => void;
  showUnassignedFilter?: boolean;
  onToggleUnassignedFilter?: () => void;
}

interface AssignedSymbolInfo {
  symbol: Symbol;
  hotspotIds: string[];
}

export default function AssignedSymbolsList({
  hotspots,
  selectedHotspot,
  onSelectHotspot,
  onRemoveSymbol,
  showUnassignedFilter = false,
  onToggleUnassignedFilter,
}: AssignedSymbolsListProps) {
  // Group hotspots by symbol
  const assignedSymbols = useMemo(() => {
    const symbolMap = new Map<string, AssignedSymbolInfo>();
    
    hotspots.forEach(hotspot => {
      if (hotspot.symbolId) {
        const symbol = SYMBOL_REGISTRY.get(hotspot.symbolId);
        if (symbol) {
          const existing = symbolMap.get(hotspot.symbolId);
          if (existing) {
            existing.hotspotIds.push(hotspot.id);
          } else {
            symbolMap.set(hotspot.symbolId, {
              symbol: symbol as Symbol,
              hotspotIds: [hotspot.id],
            });
          }
        }
      }
    });
    
    return Array.from(symbolMap.values()).sort((a, b) => 
      a.symbol.label.localeCompare(b.symbol.label)
    );
  }, [hotspots]);
  
  const unassignedCount = useMemo(() => {
    return hotspots.filter(h => !h.symbolId).length;
  }, [hotspots]);
  
  const handleSymbolClick = (hotspotId: string) => {
    onSelectHotspot(hotspotId);
    // Scroll to the hotspot if needed
    const hotspotElement = document.querySelector(`[data-hotspot-id="${hotspotId}"]`);
    if (hotspotElement) {
      hotspotElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  return (
    <div 
      data-testid="assigned-symbols-panel"
      className="h-full flex flex-col bg-gray-950 border-t border-gray-700"
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Assigned Symbols</h3>
          <span className="text-sm text-gray-400">
            {assignedSymbols.length} symbols assigned
          </span>
        </div>
        
        {unassignedCount > 0 && (
          <div 
            data-testid="unassigned-count"
            className="text-sm text-amber-400 mb-2"
          >
            {unassignedCount} hotspot{unassignedCount !== 1 ? 's' : ''} without symbol
          </div>
        )}
        
        {onToggleUnassignedFilter && (
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              data-testid="filter-unassigned-only"
              type="checkbox"
              checked={showUnassignedFilter}
              onChange={onToggleUnassignedFilter}
              className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
            />
            Show only unassigned symbols
          </label>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {assignedSymbols.length === 0 ? (
          <div 
            data-testid="no-symbols-message"
            className="p-4 text-center text-gray-500"
          >
            No symbols assigned yet
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {assignedSymbols.map(({ symbol, hotspotIds }) => {
              const isSelected = hotspotIds.some(id => id === selectedHotspot);
              
              return (
                <div
                  key={symbol.id}
                  data-testid={`assigned-symbol-${symbol.id}`}
                  className={`
                    p-3 hover:bg-gray-900 transition-colors
                    ${isSelected ? 'bg-blue-900/30 border-l-2 border-blue-500' : ''}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => handleSymbolClick(hotspotIds[0])}
                    >
                      <div className="font-medium text-white">
                        {symbol.label}
                      </div>
                      {hotspotIds.length > 1 && (
                        <span 
                          data-testid={`symbol-count-${symbol.id}`}
                          className="text-xs text-blue-400 ml-2"
                        >
                          ({hotspotIds.length} hotspots)
                        </span>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        {symbol.type} • {symbol.meanings.slice(0, 2).join(', ')}
                      </div>
                    </div>
                    
                    <button
                      data-testid={`remove-symbol-${symbol.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Remove from all hotspots with this symbol
                        hotspotIds.forEach(id => onRemoveSymbol(id));
                      }}
                      className="ml-2 p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                      title="Remove symbol assignment"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {hotspotIds.length > 1 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {hotspotIds.map((id, index) => (
                        <button
                          key={id}
                          onClick={() => handleSymbolClick(id)}
                          className={`
                            px-2 py-1 text-xs rounded transition-colors
                            ${id === selectedHotspot 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
                          `}
                        >
                          Hotspot {index + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}