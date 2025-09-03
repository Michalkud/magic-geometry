import React, { useState, useEffect, useCallback, useRef } from 'react';
import AssociationCanvas, { SymbolAssociation } from '@/components/association/AssociationCanvas';
import SymbolModal from '@/components/association/SymbolModal';
import CircularLayout from '@/components/association/CircularLayout';
import { TAROT_CARDS } from '@/data/cards';
import { SYMBOL_REGISTRY, Symbol } from '@/data/symbols';

interface CardAssociations {
  cardId: string;
  associations: SymbolAssociation[];
  createdAt: string;
  updatedAt: string;
}

interface DragState {
  isDragging: boolean;
  symbolId: string;
  symbolName: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export default function SymbolAssociationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState('the-fool');
  const [cardAssociations, setCardAssociations] = useState<Record<string, CardAssociations>>({});
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState<string>('');
  const [showToast, setShowToast] = useState<string | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  // Load associations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('symbolAssociations');
    if (saved) {
      try {
        setCardAssociations(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load associations:', err);
      }
    }
  }, []);

  // Update container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Get current card data
  const currentCard = TAROT_CARDS.find(c => c.id === selectedCard);
  const currentAssociations = cardAssociations[selectedCard]?.associations || [];

  // Get symbols for current card
  // Map card id to symbol card id format
  const currentCardObj = TAROT_CARDS.find(c => c.id === selectedCard);
  const symbolCardId = currentCardObj 
    ? `card-${currentCardObj.trumpNumber.toString().padStart(2, '0')}-${selectedCard}`
    : selectedCard;
  
  const cardSymbols = Array.from(SYMBOL_REGISTRY.values())
    .filter((symbol: Symbol) => 
      symbol.appearances.some((app: any) => app.cardId === symbolCardId)
    )
    .slice(0, 12); // Limit to 12 symbols for better circular layout

  // Handle drag start from symbol modal
  const handleDragStart = useCallback((symbolId: string, symbolName: string, x: number, y: number) => {
    setDragState({
      isDragging: true,
      symbolId,
      symbolName,
      startX: x,
      startY: y,
      currentX: x,
      currentY: y,
    });
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDragState(null);
  }, []);

  // Handle mouse move for drag
  useEffect(() => {
    if (!dragState?.isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setDragState(prev => prev ? {
        ...prev,
        currentX: x,
        currentY: y,
      } : null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [dragState?.isDragging]);

  // Handle association creation
  const handleAssociationCreate = useCallback((association: SymbolAssociation) => {
    const updated = {
      ...cardAssociations,
      [selectedCard]: {
        cardId: selectedCard,
        associations: [...currentAssociations, association],
        createdAt: cardAssociations[selectedCard]?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
    
    setCardAssociations(updated);
    setDragState(null);
  }, [selectedCard, cardAssociations, currentAssociations]);

  // Handle association deletion
  const handleAssociationDelete = useCallback((id: string) => {
    const updated = {
      ...cardAssociations,
      [selectedCard]: {
        ...cardAssociations[selectedCard],
        associations: currentAssociations.filter(a => a.id !== id),
        updatedAt: new Date().toISOString(),
      },
    };
    
    setCardAssociations(updated);
  }, [selectedCard, cardAssociations, currentAssociations]);

  // Save to localStorage
  const handleSave = useCallback(() => {
    localStorage.setItem('symbolAssociations', JSON.stringify(cardAssociations));
    setShowToast('Saved to browser storage');
    setTimeout(() => setShowToast(null), 2000);
  }, [cardAssociations]);

  // Export to JSON
  const handleExport = useCallback(() => {
    const data = cardAssociations[selectedCard] || {
      cardId: selectedCard,
      associations: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setExportData(JSON.stringify(data, null, 2));
    setShowExportModal(true);
  }, [selectedCard, cardAssociations]);

  // Calculate active arrow
  const activeArrow = dragState?.isDragging
    ? {
        fromX: dragState.startX,
        fromY: dragState.startY,
        toX: dragState.currentX,
        toY: dragState.currentY,
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h1 className="text-2xl font-bold mb-4">Symbol Association</h1>
          
          <div className="flex items-center gap-4">
            {/* Card Selector */}
            <select
              data-testid="card-selector"
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {TAROT_CARDS.filter(c => c.trumpNumber <= 21).map(card => (
                <option key={card.id} value={card.id}>
                  {card.label}
                </option>
              ))}
            </select>

            {/* Action Buttons */}
            <button
              data-testid="save-button"
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            
            <button
              data-testid="export-button"
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Export JSON
            </button>

            {/* Statistics */}
            <div data-testid="stats-panel" className="ml-auto text-sm text-gray-600">
              Associations: {currentAssociations.length} | 
              Symbols Available: {cardSymbols.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div 
          ref={containerRef}
          className="bg-white rounded-lg shadow-sm p-4 relative"
          style={{ height: '80vh' }}
        >
          {/* Association Canvas */}
          <AssociationCanvas
            cardImage={currentCard?.image || ''}
            cardAlt={currentCard?.label || ''}
            associations={currentAssociations}
            activeArrow={activeArrow}
            onAssociationCreate={handleAssociationCreate}
            onAssociationDelete={handleAssociationDelete}
            draggedSymbol={dragState ? { id: dragState.symbolId, name: dragState.symbolName } : null}
          />

          {/* Symbol Modals in Circular Formation */}
          {containerDimensions.width > 0 && (
            <CircularLayout
              centerX={containerDimensions.width / 2}
              centerY={containerDimensions.height / 2}
              radius={Math.min(containerDimensions.width, containerDimensions.height) * 0.35}
            >
              {cardSymbols.map(symbol => (
                <SymbolModal
                  key={symbol.id}
                  id={symbol.id}
                  name={symbol.label}
                  description={symbol.description}
                  position={{ x: 0, y: 0 }} // Will be overridden by CircularLayout
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </CircularLayout>
          )}
        </div>

        {/* Export Modal */}
        {showExportModal && (
          <div 
            data-testid="export-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
              <h2 className="text-xl font-bold mb-4">Export Associations</h2>
              
              <pre 
                data-testid="export-json"
                className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
              >
                {exportData}
              </pre>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(exportData);
                    setShowToast('Copied to clipboard');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Copy to Clipboard
                </button>
                
                <button
                  onClick={() => {
                    const blob = new Blob([exportData], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selectedCard}-associations.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Download JSON
                </button>
                
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div 
            data-testid={showToast.includes('Saved') ? 'save-toast' : 'toast'}
            className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            {showToast}
          </div>
        )}

        {/* Delete Confirmation (handled inline with confirm dialog) */}
        <div data-testid="confirm-delete" style={{ display: 'none' }}></div>
      </div>
    </div>
  );
}