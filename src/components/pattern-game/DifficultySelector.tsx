import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  symbolCount: number;
}

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800 hover:bg-green-200',
  medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  hard: 'bg-red-100 text-red-800 hover:bg-red-200'
};

const difficultyEmojis: Record<Difficulty, string> = {
  easy: '🟢',
  medium: '🟡', 
  hard: '🔴'
};

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onDifficultyChange,
  symbolCount
}) => {
  return (
    <div className="space-y-4">
      <h3 className="section-header text-center">Difficulty</h3>
      
      <div className="flex justify-center gap-4">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
          <Button
            key={level}
            onClick={() => onDifficultyChange(level)}
            className={`
              px-6 py-3 rounded-lg transition-all duration-200
              ${difficulty === level 
                ? `${difficultyColors[level]} ring-2 ring-amber-400` 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            variant="ghost"
          >
            <span className="text-xl mr-2">{difficultyEmojis[level]}</span>
            <span className="capitalize font-medium">{level}</span>
          </Button>
        ))}
      </div>
      
      <div className="text-center">
        <Badge className="mystical-badge bg-amber-100 text-amber-800">
          {symbolCount} symbols available
        </Badge>
      </div>
    </div>
  );
};