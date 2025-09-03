import React, { useState, useMemo, useEffect } from 'react';
import { useAllSymbols } from '@/db/hooks';
import { initializeDatabase } from '@/db/db';
import type { DBSymbol } from '@/db/types';

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
  
  // Database hooks
  const allSymbols = useAllSymbols();
  
  useEffect(() => {
    initializeDatabase();
  }, []);

  if (!allSymbols) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Loading symbols...</p>
      </div>
    );
  }

  const symbols = allSymbols as DBSymbol[];
  
  const filteredSymbols = useMemo(() => {
    return symbols.filter(symbol => {
      const matchesSearch = searchTerm === '' || 
        symbol.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symbol.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symbol.meanings.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === 'all' || symbol.type === filterType;
      
      const matchesCard = filterCard === 'all';
        // Note: Card filtering would need to be implemented via cardAppearances table
      
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
    // For now, return empty array since card filtering via appearances
    // would need to be implemented via cardAppearances table lookup
    return [];
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
          {/* Card filtering disabled for now - would need cardAppearances table lookup */}
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