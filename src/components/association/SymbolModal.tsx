import React, { useRef, useState, useCallback } from 'react';

interface SymbolModalProps {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  onDragStart: (symbolId: string, symbolName: string, x: number, y: number) => void;
  onDragEnd: () => void;
}

export default function SymbolModal({
  id,
  name,
  description,
  position,
  onDragStart,
  onDragEnd,
}: SymbolModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    // Get modal position relative to viewport
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Convert to normalized coordinates relative to parent container
      const parent = modalRef.current.offsetParent as HTMLElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const normalizedX = (centerX - parentRect.left) / parentRect.width;
        const normalizedY = (centerY - parentRect.top) / parentRect.height;
        
        onDragStart(id, name, normalizedX, normalizedY);
      }
    }
  }, [id, name, onDragStart]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd();
    }
  }, [isDragging, onDragEnd]);

  // Attach global mouse up listener
  React.useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
        onDragEnd();
      };
      
      document.addEventListener('mouseup', handleGlobalMouseUp);
      return () => {
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, onDragEnd]);

  return (
    <div
      ref={modalRef}
      data-testid="symbol-modal"
      className={`absolute bg-white rounded-lg shadow-lg p-3 border-2 transition-all ${
        isDragging 
          ? 'border-blue-500 scale-105 cursor-grabbing' 
          : 'border-gray-300 hover:border-blue-400 cursor-grab'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '150px',
        transform: 'translate(-50%, -50%)',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="pointer-events-none">
        <h3 
          data-testid="symbol-name"
          className="font-semibold text-sm text-gray-800 mb-1 truncate"
        >
          {name}
        </h3>
        <p 
          data-testid="symbol-description"
          className="text-xs text-gray-600 line-clamp-2"
        >
          {description}
        </p>
      </div>
      
      {/* Drag Handle Indicator */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}