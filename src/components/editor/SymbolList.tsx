import React, { useState, useMemo } from 'react';
import { SYMBOL_REGISTRY } from '@/data/symbols/symbolRegistry';
import { Symbol } from '@/data/symbols/types';

export interface SymbolListProps {
  selectedSymbol?: string | null;
  onSymbolSelect: (symbolId: string) => void;
  hideAssignedSymbols?: boolean;
  assignedSymbolIds?: string[];
}

export default function SymbolList({ 
  selectedSymbol, 
  onSymbolSelect,
  hideAssignedSymbols = false,
  assignedSymbolIds = []
}: SymbolListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCard, setFilterCard] = useState<string>('all');
  
  const symbols = Array.from(SYMBOL_REGISTRY.values()) as Symbol[];
  
  const filteredSymbols = useMemo(() => {
    return symbols.filter(symbol => {
      const matchesSearch = searchTerm === '' || 
        symbol.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symbol.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symbol.meanings.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === 'all' || symbol.type === filterType;
      
      const matchesCard = filterCard === 'all' || 
        symbol.appearances.some(appearance => appearance.cardId === filterCard);
      
      const isAssigned = assignedSymbolIds.includes(symbol.id);
      const matchesAssignedFilter = !hideAssignedSymbols || !isAssigned;
      
      return matchesSearch && matchesType && matchesCard && matchesAssignedFilter;
    });
  }, [symbols, searchTerm, filterType, filterCard, hideAssignedSymbols, assignedSymbolIds]);
  
  const symbolTypes = useMemo(() => {
    const types = new Set(symbols.map(s => s.type));
    return Array.from(types).sort();
  }, [symbols]);
  
  const availableCards = useMemo(() => {
    const cards = new Set<string>();
    symbols.forEach(symbol => {
      symbol.appearances.forEach(appearance => {
        cards.add(appearance.cardId);
      });
    });
    return Array.from(cards).sort();
  }, [symbols]);
  
  return (
    <div data-testid="symbol-list" className="flex flex-col h-full bg-gray-900 border-l border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-3">Symbols</h2>
        
        <input
          type="text"
          placeholder="Search symbols..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full mt-2 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Types</option>
          {symbolTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        
        <select
          data-testid="card-filter"
          value={filterCard}
          onChange={(e) => setFilterCard(e.target.value)}
          className="w-full mt-2 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Cards</option>
          {availableCards.map(cardId => {
            // Format card ID for display
            const cardName = cardId.replace('card-', '').split('-')
              .map(part => {
                if (part.match(/^\d+$/)) return '';
                return part.charAt(0).toUpperCase() + part.slice(1);
              })
              .filter(Boolean)
              .join(' ');
            return (
              <option key={cardId} value={cardId}>
                {cardName}
              </option>
            );
          })}
        </select>
        
        <div className="mt-2 text-sm text-gray-400">
          {filteredSymbols.length} symbols
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredSymbols.map(symbol => (
          <button
            key={symbol.id}
            data-testid={`symbol-item-${symbol.id}`}
            onClick={() => onSymbolSelect(symbol.id)}
            className={`
              w-full px-4 py-3 text-left border-b border-gray-700 hover:bg-gray-800 transition-colors
              ${selectedSymbol === symbol.id ? 'bg-blue-900 border-blue-600' : ''}
            `}
          >
            <div className="font-medium text-white">
              {symbol.label}
            </div>
            <div className="text-xs text-gray-400 mt-1 line-clamp-2">
              {symbol.description}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {symbol.meanings.slice(0, 3).map((meaning, i) => (
                <span
                  key={i}
                  className="inline-block px-2 py-0.5 text-xs rounded bg-gray-700 text-gray-300"
                >
                  {meaning}
                </span>
              ))}
              {symbol.meanings.length > 3 && (
                <span className="inline-block px-2 py-0.5 text-xs rounded bg-gray-700 text-gray-400">
                  +{symbol.meanings.length - 3} more
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}