import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import type { DBSymbol } from '@/db/types';

interface PatternCardProps {
  symbol: DBSymbol;
  onClick?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  isTarget?: boolean;
  showResult?: 'correct' | 'incorrect';
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small: 'w-16 h-16',
  medium: 'w-24 h-24',
  large: 'w-32 h-32'
};

const getImagePath = (symbol: DBSymbol): string | null => {
  // Try to construct image path - this would be enhanced in real implementation
  const labelKey = symbol.label.toLowerCase().replace(/\s+/g, '-');
  
  const possiblePaths = [
    `/symbols/${symbol.id}.jpg`,
    `/symbols/${symbol.id}.png`,
    `/symbols/${labelKey}.jpg`,
    `/symbols/${labelKey}.png`,
  ];
  
  return possiblePaths[0];
};

export const PatternCard: React.FC<PatternCardProps> = ({
  symbol,
  onClick,
  disabled = false,
  isSelected = false,
  isTarget = false,
  showResult,
  size = 'medium'
}) => {
  const imagePath = getImagePath(symbol);
  
  const getCardClass = () => {
    let baseClass = 'mystical-card cursor-pointer transition-all duration-200 hover:scale-105';
    
    if (disabled) baseClass += ' cursor-not-allowed opacity-75';
    if (isSelected) baseClass += ' ring-2 ring-amber-400';
    if (isTarget) baseClass += ' ring-2 ring-blue-400';
    
    if (showResult === 'correct') baseClass += ' ring-2 ring-green-400 bg-green-50';
    if (showResult === 'incorrect') baseClass += ' ring-2 ring-red-400 bg-red-50';
    
    return baseClass;
  };

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <Card 
        className={getCardClass()}
        onClick={!disabled ? onClick : undefined}
      >
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          {/* Symbol Image - NO TEXT LABELS */}
          <div className={`${sizeClasses[size]} flex items-center justify-center rounded-lg overflow-hidden`}>
            {imagePath ? (
              <img
                src={imagePath}
                alt="" // Intentionally empty - no text hints
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-amber-600">🔮</span>
              </div>
            )}
          </div>
          
          {/* Visual Feedback Only */}
          {showResult && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-2"
            >
              {showResult === 'correct' ? (
                <span className="text-green-600 text-xl">✓</span>
              ) : (
                <span className="text-red-600 text-xl">✗</span>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};