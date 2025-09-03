/**
 * Symbol System Demo Page
 * Demonstrates the comprehensive RWS symbol mapping and relationship system
 */

import React, { useState, useEffect } from 'react';
import { 
  useSymbolRegistry,
  useAllSymbols,
  useSymbolRelationships,
  useSymbolsByType,
  useSymbolCounts,
  useSearchSymbols
} from '../db/hooks';
import { initializeDatabase } from '../db/db';
import type { DBSymbol } from '../db/types';

const SymbolSystemDemo: React.FC = () => {
  // Database hooks
  const symbolRegistry = useSymbolRegistry();
  const allSymbols = useAllSymbols();
  const symbolCounts = useSymbolCounts();
  
  const [selectedSymbol, setSelectedSymbol] = useState<DBSymbol | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState('card-00-the-fool');
  
  const searchResults = useSearchSymbols(searchTerm);

  useEffect(() => {
    initializeDatabase();
  }, []);

  useEffect(() => {
    // Set initial symbol when symbols are loaded
    if (allSymbols && allSymbols.length > 0 && !selectedSymbol) {
      const whiteRose = allSymbols.find(s => s.id === 'white-rose') || allSymbols[0];
      setSelectedSymbol(whiteRose);
    }
  }, [allSymbols, selectedSymbol]);

  // Get symbols for selected card
  // const cardSymbols = useSymbolsByCard(selectedCard); // Would need card ID conversion
  const cardSymbols: DBSymbol[] = []; // Placeholder for now

  // Get relationships for selected symbol
  const relatedSymbolsData = useSymbolRelationships(selectedSymbol?.id);
  const relatedSymbols = relatedSymbolsData || [];

  // Loading state
  if (!allSymbols || !symbolRegistry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Symbol System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          RWS Symbol Graph System
        </h1>
        
        {symbolCounts && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Registry Stats */}
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Registry Stats</h2>
              <div className="text-white/80 space-y-2">
                <div>Total Symbols: <span className="font-bold text-yellow-300">{symbolCounts?.total || 0}</span></div>
                <div>With Appearances: <span className="font-bold text-yellow-300">{symbolCounts?.withAppearances || 0}</span></div>
                <div>Symbol Registry: <span className="font-bold text-yellow-300">{symbolRegistry?.size || 0}</span></div>
              </div>
            </div>

            {/* Graph Stats */}
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Graph Stats</h2>
              <div className="text-white/80 space-y-2">
                <div>Symbols: <span className="font-bold text-green-300">{allSymbols?.length || 0}</span></div>
                <div>Relationships: <span className="font-bold text-green-300">{relatedSymbols.length}</span></div>
                <div>Selected Symbol: <span className="font-bold text-green-300">{selectedSymbol?.label || 'None'}</span></div>
              </div>
            </div>

            {/* Symbol Types */}
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Symbol Types</h2>
              <div className="text-white/80 space-y-1 text-sm">
                {Object.entries(symbolCounts?.byType || {}).map(([type, count]) => (
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
              
              {searchResults && searchResults.length > 0 && (
                <div className="mt-4 space-y-2">
                  {searchResults.map(symbol => (
                    <div
                      key={symbol.id}
                      className="p-3 bg-black/30 rounded cursor-pointer hover:bg-black/50 transition-colors"
                      onClick={() => setSelectedSymbol(symbol)}
                    >
                      <div className="text-white font-medium">{symbol.label}</div>
                      <div className="text-white/60 text-sm">{symbol.type}</div>
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
                      <h3 className="text-white font-bold mb-2">Symbol Details:</h3>
                      <div className="space-y-1">
                        <div className="text-white/70 text-sm">
                          {selectedSymbol.description}
                        </div>
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
                      {relatedSymbols.map(relationship => (
                        <div
                          key={relationship.targetId}
                          className="p-2 bg-black/30 rounded cursor-pointer hover:bg-black/50 transition-colors text-sm"
                        >
                          <div className="text-white font-medium">{relationship.targetId}</div>
                          <div className="text-white/60">{relationship.type}</div>
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
          <p>RWS Symbol Graph System • {allSymbols?.length || 0} symbols • {relatedSymbols.length} relationships</p>
        </div>
      </div>
    </div>
  );
};

export default SymbolSystemDemo;