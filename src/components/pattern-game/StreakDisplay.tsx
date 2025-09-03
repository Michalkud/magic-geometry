import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface StreakDisplayProps {
  streak: number;
  bestStreak: number;
}

const getStreakEmoji = (streak: number): string => {
  if (streak >= 10) return '🔥🔥🔥';
  if (streak >= 5) return '🔥🔥';
  if (streak >= 3) return '🔥';
  if (streak >= 1) return '⚡';
  return '➖';
};

const getStreakColor = (streak: number): string => {
  if (streak >= 10) return 'text-red-600';
  if (streak >= 5) return 'text-orange-600';
  if (streak >= 3) return 'text-yellow-600';
  if (streak >= 1) return 'text-blue-600';
  return 'text-gray-600';
};

export const StreakDisplay: React.FC<StreakDisplayProps> = ({
  streak,
  bestStreak
}) => {
  return (
    <Card className="mystical-card" data-testid="streak-display">
      <CardContent className="p-4 text-center">
        <div className="space-y-3">
          {/* Current Streak Visual */}
          <div className="space-y-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={streak}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className={`text-3xl ${getStreakColor(streak)}`}
              >
                {getStreakEmoji(streak)}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Streak Dots Visual */}
          <div className="flex justify-center space-x-1">
            {Array.from({ length: Math.min(streak, 10) }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="w-2 h-2 bg-amber-500 rounded-full"
              />
            ))}
          </div>
          
          {/* Best Streak Indicator */}
          {bestStreak > 0 && (
            <div className="border-t pt-2">
              <div className="text-xs text-amber-700 mb-1">Best</div>
              <div className="flex justify-center space-x-1">
                {Array.from({ length: Math.min(bestStreak, 10) }, (_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-amber-300 rounded-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};