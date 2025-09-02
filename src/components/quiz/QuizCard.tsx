import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizSymbol } from '@/data/symbolQuizData';
import { AVAILABLE_IMAGES } from '@/data/allSymbols';

interface QuizCardProps {
  symbol: QuizSymbol;
  showAnswer?: boolean;
  className?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({ 
  symbol, 
  showAnswer = false, 
  className = '' 
}) => {
  const getImagePath = (symbol: QuizSymbol): string | null => {
    // Check by ID
    if (AVAILABLE_IMAGES[symbol.id]) return AVAILABLE_IMAGES[symbol.id];
    
    // Check by label
    const labelKey = symbol.label.toLowerCase().replace(/\s+/g, '-');
    if (AVAILABLE_IMAGES[labelKey]) return AVAILABLE_IMAGES[labelKey];
    
    // Check by label with spaces
    if (AVAILABLE_IMAGES[symbol.label.toLowerCase()]) return AVAILABLE_IMAGES[symbol.label.toLowerCase()];
    
    // For RWS symbols, also try without the rws- prefix
    if (symbol.id.startsWith('rws-')) {
      const baseId = symbol.id.replace('rws-', '');
      if (AVAILABLE_IMAGES[baseId]) return AVAILABLE_IMAGES[baseId];
    }
    
    return null;
  };

  const imagePath = getImagePath(symbol);
  const sourceColor = {
    rws: 'bg-blue-100 text-blue-800',
    thoth: 'bg-purple-100 text-purple-800', 
    universal: 'bg-green-100 text-green-800',
    meanings: 'bg-orange-100 text-orange-800'
  };

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  return (
    <Card className={`mystical-card ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="card-title text-lg">
          {symbol.label}
        </CardTitle>
        <div className="flex justify-center gap-2 mt-2">
          <Badge 
            className={`mystical-badge ${sourceColor[symbol.source]} text-xs`}
            data-testid="symbol-source"
          >
            {symbol.source.toUpperCase()}
          </Badge>
          <Badge 
            className={`mystical-badge ${difficultyColor[symbol.difficulty]} text-xs`}
          >
            {symbol.difficulty}
          </Badge>
          <Badge 
            className="mystical-badge bg-gray-100 text-gray-800 text-xs"
          >
            {symbol.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        {imagePath ? (
          <div className="mb-4">
            <img
              src={imagePath}
              alt={symbol.label}
              className="mx-auto max-w-[200px] max-h-[200px] rounded-lg shadow-md object-contain"
              data-testid="symbol-image"
            />
          </div>
        ) : (
          <div className="mb-4 p-8 bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg">
            <div className="text-4xl mb-2 text-amber-600">🔮</div>
            <p className="text-amber-700 text-sm">Symbol Image</p>
          </div>
        )}
        
        {showAnswer && (
          <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded">
            <p className="text-amber-800 font-medium text-sm">
              {symbol.meaning}
            </p>
            {symbol.cards && symbol.cards.length > 0 && (
              <p className="text-amber-600 text-xs mt-2">
                Found in: {symbol.cards.join(', ')}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;