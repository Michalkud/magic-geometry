import React, { useState, useEffect, useCallback } from 'react';
import HotspotCanvas, { Rectangle } from '@/components/editor/HotspotCanvas';
import SymbolList from '@/components/editor/SymbolList';
import CoordinateDisplay from '@/components/editor/CoordinateDisplay';
import ExportModal from '@/components/editor/ExportModal';
import { TAROT_CARDS } from '@/data/cards';

interface CardHotspots {
  [cardId: string]: Rectangle[];
}

interface UndoState {
  past: CardHotspots[];
  present: CardHotspots;
  future: CardHotspots[];
}

export default function SymbolHotspotEditor() {
  const [selectedCard, setSelectedCard] = useState('the-fool');
  const [hotspots, setHotspots] = useState<CardHotspots>({});
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [undoState, setUndoState] = useState<UndoState>({
    past: [],
    present: {},
    future: [],
  });

  // Load hotspots from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('symbolHotspots');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHotspots(parsed);
        setUndoState({
          past: [],
          present: parsed,
          future: [],
        });
      } catch (err) {
        console.error('Failed to load saved hotspots:', err);
      }
    }
  }, []);

  // Get current card data
  const currentCard = TAROT_CARDS.find(c => c.id === selectedCard);
  const currentHotspots = hotspots[selectedCard] || [];

  // Handle hotspot changes with undo support
  const handleHotspotsChange = useCallback((newHotspots: Rectangle[]) => {
    const newState = { ...hotspots, [selectedCard]: newHotspots };
    
    setUndoState(prev => ({
      past: [...prev.past, prev.present],
      present: newState,
      future: [],
    }));
    
    setHotspots(newState);
  }, [hotspots, selectedCard]);

  // Handle symbol selection
  const handleSymbolSelect = useCallback((symbolId: string) => {
    setSelectedSymbol(symbolId);
    
    // If a hotspot is selected, assign the symbol to it
    if (selectedHotspot) {
      const updatedHotspots = currentHotspots.map(h => 
        h.id === selectedHotspot ? { ...h, symbolId } : h
      );
      handleHotspotsChange(updatedHotspots);
    }
  }, [selectedHotspot, currentHotspots, handleHotspotsChange]);

  // Handle hotspot selection
  const handleHotspotSelect = useCallback((id: string | null) => {
    setSelectedHotspot(id);
    
    if (id) {
      const hotspot = currentHotspots.find(h => h.id === id);
      if (hotspot) {
        setCurrentCoords({
          x1: hotspot.x1,
          y1: hotspot.y1,
          x2: hotspot.x2,
          y2: hotspot.y2,
        });
        setSelectedSymbol(hotspot.symbolId || null);
      }
    } else {
      setCurrentCoords(null);
    }
  }, [currentHotspots]);

  // Save to localStorage
  const handleSave = useCallback(() => {
    localStorage.setItem('symbolHotspots', JSON.stringify(hotspots));
    setShowToast('Saved to browser storage');
    setTimeout(() => setShowToast(null), 2000);
  }, [hotspots]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete selected hotspot
      if (e.key === 'Delete' && selectedHotspot) {
        const updated = currentHotspots.filter(h => h.id !== selectedHotspot);
        handleHotspotsChange(updated);
        setSelectedHotspot(null);
      }
      
      // Undo
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        if (undoState.past.length > 0) {
          const previous = undoState.past[undoState.past.length - 1];
          const newPast = undoState.past.slice(0, -1);
          
          setUndoState({
            past: newPast,
            present: previous,
            future: [undoState.present, ...undoState.future],
          });
          
          setHotspots(previous);
        }
      }
      
      // Redo
      if (e.ctrlKey && e.shiftKey && e.key === 'z') {
        if (undoState.future.length > 0) {
          const next = undoState.future[0];
          const newFuture = undoState.future.slice(1);
          
          setUndoState({
            past: [...undoState.past, undoState.present],
            present: next,
            future: newFuture,
          });
          
          setHotspots(next);
        }
      }
      
      // Save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedHotspot, currentHotspots, handleHotspotsChange, undoState, handleSave]);

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Symbol Hotspot Editor</h1>
            
            <div className="flex items-center gap-4">
              <select
                aria-label="Select card"
                value={selectedCard}
                onChange={(e) => {
                  setSelectedCard(e.target.value);
                  setSelectedHotspot(null);
                  setSelectedSymbol(null);
                }}
                className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
              >
                {TAROT_CARDS.map(card => (
                  <option key={card.id} value={card.id}>
                    {card.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  isPreviewMode 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isPreviewMode ? 'Preview Mode' : 'Edit Mode'}
              </button>
              
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              
              <button
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors"
              >
                Export
              </button>
              
              <button
                onClick={() => {
                  // Add demo hotspots for testing
                  const demoHotspots = [
                    { id: 'demo-1', x1: 0.35, y1: 0.15, x2: 0.65, y2: 0.35, symbolId: 'the-fool-figure' },
                    { id: 'demo-2', x1: 0.25, y1: 0.65, x2: 0.45, y2: 0.85, symbolId: 'white-dog' },
                    { id: 'demo-3', x1: 0.55, y1: 0.75, x2: 0.75, y2: 0.95, symbolId: 'cliff-edge' },
                  ];
                  handleHotspotsChange(demoHotspots);
                }}
                className="px-4 py-2 bg-amber-600 text-white rounded font-medium hover:bg-amber-700 transition-colors"
                title="Add sample hotspots for testing"
              >
                Demo
              </button>
            </div>
          </div>
        </div>
        
        {/* Canvas area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-8 overflow-auto flex items-center justify-center bg-gray-900">
            {currentCard && (
              <HotspotCanvas
                imageSrc={currentCard.image}
                imageAlt={currentCard.label}
                hotspots={currentHotspots}
                selectedHotspot={selectedHotspot}
                isPreviewMode={isPreviewMode}
                onHotspotsChange={handleHotspotsChange}
                onHotspotSelect={handleHotspotSelect}
                onCoordinateChange={setCurrentCoords}
              />
            )}
          </div>
          
          {/* Coordinate display */}
          <div className="w-64 p-4 bg-gray-950 border-l border-gray-700">
            <CoordinateDisplay 
              coordinates={currentCoords}
              imageSize={currentCard ? { width: 400, height: 600 } : undefined}
            />
            
            {selectedHotspot && (
              <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700">
                <h3 className="text-sm font-semibold text-white mb-2">Selected Hotspot</h3>
                <div className="text-xs text-gray-400">
                  ID: {selectedHotspot}
                </div>
                {selectedSymbol && (
                  <div className="text-xs text-green-400 mt-1">
                    Symbol: {selectedSymbol}
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700">
              <h3 className="text-sm font-semibold text-white mb-2">Statistics</h3>
              <div className="space-y-1 text-xs text-gray-400">
                <div>Total hotspots: {currentHotspots.length}</div>
                <div>With symbols: {currentHotspots.filter(h => h.symbolId).length}</div>
                <div>Without symbols: {currentHotspots.filter(h => !h.symbolId).length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Symbol list sidebar */}
      <div className="w-80">
        <SymbolList
          selectedSymbol={selectedSymbol}
          onSymbolSelect={handleSymbolSelect}
        />
      </div>
      
      {/* Export modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        cardId={selectedCard}
        hotspots={currentHotspots}
      />
      
      {/* Toast notification */}
      {showToast && (
        <div className="toast fixed bottom-4 right-4 px-4 py-2 bg-green-600 text-white rounded shadow-lg z-50">
          {showToast}
        </div>
      )}
    </div>
  );
}