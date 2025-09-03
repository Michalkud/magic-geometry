import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

type Difficulty = 'easy' | 'medium' | 'hard';

interface VisualProgressProps {
  correct: number;
  total: number;
  difficulty: Difficulty;
}

const difficultyEmojis: Record<Difficulty, string> = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴'
};

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500'
};

export const VisualProgress: React.FC<VisualProgressProps> = ({
  correct,
  total,
  difficulty
}) => {
  const accuracy = total > 0 ? (correct / total) * 100 : 0;
  
  const getAccuracyEmoji = (acc: number): string => {
    if (acc >= 90) return '🌟';
    if (acc >= 75) return '⭐';
    if (acc >= 60) return '✨';
    if (acc >= 40) return '💫';
    return '⚪';
  };

  return (
    <Card className="mystical-card" data-testid="visual-progress">
      <CardContent className="p-4 text-center">
        <div className="space-y-3">
          {/* Difficulty Indicator */}
          <div className="flex items-center justify-center space-x-2" data-testid="difficulty-indicator">
            <span className="text-xl">{difficultyEmojis[difficulty]}</span>
          </div>
          
          {/* Accuracy Visual */}
          <div className="space-y-2">
            <div className="text-2xl">{getAccuracyEmoji(accuracy)}</div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-full rounded-full transition-all duration-500 ${difficultyColors[difficulty]}`}
                style={{ width: `${accuracy}%` }}
              />
            </div>
            
            {/* Score Dots */}
            <div className="flex justify-center space-x-1">
              {Array.from({ length: total }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    i < correct ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};