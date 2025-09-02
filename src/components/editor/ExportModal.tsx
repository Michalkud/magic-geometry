import React, { useState, useRef } from 'react';
import { Rectangle } from './HotspotCanvas';

export interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: string;
  hotspots: Rectangle[];
}

export default function ExportModal({ isOpen, onClose, cardId, hotspots }: ExportModalProps) {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  if (!isOpen) return null;
  
  const exportData = {
    cardId,
    hotspots: hotspots.map(h => ({
      id: h.symbolId || h.id,
      rectangle: {
        x1: h.x1,
        y1: h.y1,
        x2: h.x2,
        y2: h.y2,
      },
    })),
    exportedAt: new Date().toISOString(),
  };
  
  const jsonString = JSON.stringify(exportData, null, 2);
  
  const handleCopy = async () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      try {
        await navigator.clipboard.writeText(jsonString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };
  
  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cardId}-hotspots.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        data-testid="export-modal"
        className="w-full max-w-2xl max-h-[80vh] bg-gray-900 rounded-lg shadow-xl flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Export Hotspot Data</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-3 text-sm text-gray-400">
            Card: <span className="text-white font-medium">{cardId}</span>
            <span className="mx-2">•</span>
            Hotspots: <span className="text-white font-medium">{hotspots.length}</span>
          </div>
          
          <textarea
            ref={textareaRef}
            data-testid="export-json"
            value={jsonString}
            readOnly
            className="w-full h-96 p-3 font-mono text-sm text-gray-200 bg-gray-800 border border-gray-700 rounded resize-none focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            {copied && (
              <span className="text-green-400">✓ Copied to clipboard</span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
            >
              Download JSON
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}