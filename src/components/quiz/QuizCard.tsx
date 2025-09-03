import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DBSymbol } from '@/db/types';

interface QuizSymbol extends DBSymbol {
  cardCount?: number;
  sources?: string[];
}

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
    // Basic image path logic - could be enhanced later
    const labelKey = symbol.label.toLowerCase().replace(/\s+/g, '-');
    
    // Try common paths
    const possiblePaths = [
      `/symbols/${symbol.id}.jpg`,
      `/symbols/${symbol.id}.png`,
      `/symbols/${labelKey}.jpg`,
      `/symbols/${labelKey}.png`,
    ];
    
    // For now, just return the first possible path
    // In a real app, you'd check if the file exists
    return possiblePaths[0];
  };

  const imagePath = getImagePath(symbol);
  const sourceColor: Record<string, string> = {
    rws: 'bg-blue-100 text-blue-800',
    thoth: 'bg-purple-100 text-purple-800', 
    universal: 'bg-green-100 text-green-800',
    meanings: 'bg-orange-100 text-orange-800'
  };

  const difficultyColor: Record<string, string> = {
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
            className={`mystical-badge ${sourceColor[symbol.source || 'universal']} text-xs`}
            data-testid="symbol-source"
          >
            {(symbol.source || 'universal').toUpperCase()}
          </Badge>
          <Badge 
            className={`mystical-badge ${difficultyColor[symbol.difficulty || 'easy']} text-xs`}
          >
            {symbol.difficulty || 'easy'}
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
              {symbol.meanings.join(', ')}
            </p>
            {symbol.cardCount && symbol.cardCount > 0 && (
              <p className="text-amber-600 text-xs mt-2">
                Found in {symbol.cardCount} cards
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;