/**
 * Symbol System Demo Page
 * Demonstrates the comprehensive RWS symbol mapping and relationship system
 */

import React, { useState, useEffect } from 'react';
import { 
  SYMBOL_REGISTRY, 
  getRegistryStats, 
  findSymbolsOnCard, 
  getRelatedSymbols,
  Symbol,
  getSymbolsByType,
  findSymbolsByMeaning,
  getGraphStats
} from '../data/symbols/index';

const SymbolSystemDemo: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Symbol[]>([]);
  const [selectedCard, setSelectedCard] = useState('card-00-the-fool');

  useEffect(() => {
    // Load initial statistics
    const registryStats = getRegistryStats();
    const graphStats = getGraphStats();
    
    setStats({
      registry: registryStats,
      graph: graphStats
    });

    // Set initial symbol
    setSelectedSymbol(SYMBOL_REGISTRY.get('white-rose') || null);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = findSymbolsByMeaning(searchTerm);
      setSearchResults(results.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const cardSymbols = findSymbolsOnCard(selectedCard);
  const relatedSymbols = selectedSymbol ? getRelatedSymbols(selectedSymbol.id) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          RWS Symbol Graph System
        </h1>
        
        {stats && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Registry Stats */}
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Registry Stats</h2>
              <div className="text-white/80 space-y-2">
                <div>Total Symbols: <span className="font-bold text-yellow-300">{stats.registry.totalSymbols}</span></div>
                <div>Unique Cards: <span className="font-bold text-yellow-300">{stats.registry.uniqueCards}</span></div>
                <div>Avg Appearances: <span className="font-bold text-yellow-300">{stats.registry.averageAppearancesPerSymbol.toFixed(2)}</span></div>
              </div>
            </div>

            {/* Graph Stats */}
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Graph Stats</h2>
              <div className="text-white/80 space-y-2">
                <div>Nodes: <span className="font-bold text-green-300">{stats.graph.nodeCount}</span></div>
                <div>Edges: <span className="font-bold text-green-300">{stats.graph.edgeCount}</span></div>
                <div>Density: <span className="font-bold text-green-300">{stats.graph.density.toFixed(4)}</span></div>
              </div>
            </div>

            {/* Symbol Types */}
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Symbol Types</h2>
              <div className="text-white/80 space-y-1 text-sm">
                {Object.entries(stats.registry.symbolsByType).map(([type, count]) => (
                  <div key={type}>
                    {type}: <span className="font-bold text-blue-300">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Symbol Explorer */}
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Symbol Search</h2>
              <input
                type="text"
                placeholder="Search symbols by meaning..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded bg-black/30 text-white border border-white/20 focus:border-yellow-400 focus:outline-none"
              />
              
              {searchResults.length > 0 && (
                <div className="mt-4 space-y-2">
                  {searchResults.map(symbol => (
                    <div
                      key={symbol.id}
                      className="p-3 bg-black/30 rounded cursor-pointer hover:bg-black/50 transition-colors"
                      onClick={() => setSelectedSymbol(symbol)}
                    >
                      <div className="text-white font-medium">{symbol.label}</div>
                      <div className="text-white/60 text-sm">{symbol.type} • {symbol.appearances.length} appearances</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Card Symbols */}
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Card Symbols</h2>
              <select
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
                className="w-full p-3 rounded bg-black/30 text-white border border-white/20 mb-4"
              >
                <option value="card-00-the-fool">The Fool</option>
                <option value="card-01-the-magician">The Magician</option>
                <option value="card-02-the-high-priestess">The High Priestess</option>
                <option value="card-03-the-empress">The Empress</option>
                <option value="card-13-death">Death</option>
              </select>

              <div className="text-white/80 mb-3">
                <span className="font-bold text-yellow-300">{cardSymbols.length}</span> symbols found
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {cardSymbols.map(symbol => (
                  <div
                    key={symbol.id}
                    className="p-2 bg-black/30 rounded cursor-pointer hover:bg-black/50 transition-colors text-sm"
                    onClick={() => setSelectedSymbol(symbol)}
                  >
                    <div className="text-white font-medium">{symbol.label}</div>
                    <div className="text-white/60">{symbol.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Symbol Detail */}
          <div className="space-y-6">
            {selectedSymbol && (
              <>
                {/* Symbol Details */}
                <div className="bg-white/10 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedSymbol.label}</h2>
                  <div className="text-yellow-300 text-sm mb-4 capitalize">{selectedSymbol.type}</div>
                  
                  <div className="text-white/80 mb-4">{selectedSymbol.description}</div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-white font-bold mb-2">Meanings:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSymbol.meanings.map((meaning, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/30 rounded text-white/80 text-sm">
                            {meaning}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-bold mb-2">Traditions:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSymbol.traditions.map((tradition, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-500/30 rounded text-white/80 text-sm">
                            {tradition}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-bold mb-2">Appears on {selectedSymbol.appearances.length} card(s):</h3>
                      <div className="space-y-1">
                        {selectedSymbol.appearances.map((appearance, idx) => (
                          <div key={idx} className="text-white/70 text-sm">
                            {appearance.cardId.replace('card-', '').replace('-', ' ')} 
                            ({appearance.prominence})
                            {appearance.variant && ` • ${appearance.variant}`}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Symbols */}
                <div className="bg-white/10 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Related Symbols ({relatedSymbols.length})
                  </h2>
                  
                  {relatedSymbols.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {relatedSymbols.map(symbol => (
                        <div
                          key={symbol.id}
                          className="p-2 bg-black/30 rounded cursor-pointer hover:bg-black/50 transition-colors text-sm"
                          onClick={() => setSelectedSymbol(symbol)}
                        >
                          <div className="text-white font-medium">{symbol.label}</div>
                          <div className="text-white/60">{symbol.type} • {symbol.appearances.length} appearances</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-white/60">No direct relationships found</div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-white/60">
          <p>RWS Symbol Graph System • {stats?.registry.totalSymbols} symbols • {stats?.graph.edgeCount} relationships</p>
        </div>
      </div>
    </div>
  );
};

export default SymbolSystemDemo;