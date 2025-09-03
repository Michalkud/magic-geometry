import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Difficulty = 'easy' | 'medium' | 'hard';

interface GameStats {
  correct: number;
  incorrect: number;
  streak: number;
  bestStreak: number;
  totalRounds: number;
}

interface GameResultsProps {
  gameStats: GameStats;
  difficulty: Difficulty;
  onPlayAgain: () => void;
  onReturnToSetup: () => void;
}

const getPerformanceEmoji = (accuracy: number): string => {
  if (accuracy >= 90) return '🏆';
  if (accuracy >= 75) return '🥇';
  if (accuracy >= 60) return '🥈';
  if (accuracy >= 40) return '🥉';
  return '🎯';
};

const getStreakEmoji = (streak: number): string => {
  if (streak >= 10) return '🔥🔥🔥';
  if (streak >= 5) return '🔥🔥';
  if (streak >= 3) return '🔥';
  if (streak >= 1) return '⚡';
  return '➖';
};

const difficultyEmojis: Record<Difficulty, string> = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴'
};

export const GameResults: React.FC<GameResultsProps> = ({
  gameStats,
  difficulty,
  onPlayAgain,
  onReturnToSetup
}) => {
  const accuracy = gameStats.totalRounds > 0 
    ? Math.round((gameStats.correct / gameStats.totalRounds) * 100) 
    : 0;

  return (
    <div className="max-w-2xl mx-auto" data-testid="game-results">
      <Card className="mystical-card">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="card-title text-2xl mb-4">
              🎉 Game Complete! 🎉
            </CardTitle>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Performance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-4"
          >
            <div className="text-6xl mb-4">
              {getPerformanceEmoji(accuracy)}
            </div>
            
            {/* Visual Score Display */}
            <div className="grid grid-cols-3 gap-4">
              {/* Correct Answers */}
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl text-green-600 mb-2">✓</div>
                <div className="flex justify-center space-x-1">
                  {Array.from({ length: gameStats.correct }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-green-500 rounded-full" />
                  ))}
                </div>
              </div>
              
              {/* Incorrect Answers */}
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl text-red-600 mb-2">✗</div>
                <div className="flex justify-center space-x-1">
                  {Array.from({ length: gameStats.incorrect }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-red-500 rounded-full" />
                  ))}
                </div>
              </div>
              
              {/* Difficulty */}
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl mb-2">{difficultyEmojis[difficulty]}</div>
                <div className="text-xs text-amber-700 capitalize">{difficulty}</div>
              </div>
            </div>
          </motion.div>

          {/* Best Streak Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center p-4 bg-amber-50 rounded-lg"
            data-testid="final-streak"
          >
            <div className="text-lg font-semibold text-amber-800 mb-2">Best Streak</div>
            <div className="text-3xl mb-2">{getStreakEmoji(gameStats.bestStreak)}</div>
            <div className="flex justify-center space-x-1">
              {Array.from({ length: Math.min(gameStats.bestStreak, 15) }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.05) }}
                  className="w-2 h-2 bg-amber-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            <Button 
              onClick={onPlayAgain}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2"
            >
              Play Again
            </Button>
            <Button 
              onClick={onReturnToSetup}
              variant="outline"
              className="px-6 py-2"
            >
              Change Settings
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};