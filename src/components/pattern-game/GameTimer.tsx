import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface GameTimerProps {
  timeRemaining: number;
  duration: number;
}

export const GameTimer: React.FC<GameTimerProps> = ({
  timeRemaining,
  duration
}) => {
  const progress = (timeRemaining / duration) * 100;
  
  const getColorClass = () => {
    if (progress > 60) return 'bg-green-500';
    if (progress > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getEmoji = () => {
    if (progress > 60) return '🟢';
    if (progress > 30) return '🟡';
    return '🔴';
  };

  return (
    <Card className="mystical-card" data-testid="game-timer">
      <CardContent className="p-4 text-center">
        <div className="space-y-3">
          {/* Visual Timer Emoji */}
          <motion.div
            animate={{ scale: timeRemaining <= 3 ? [1, 1.2, 1] : 1 }}
            transition={{ repeat: timeRemaining <= 3 ? Infinity : 0, duration: 0.5 }}
            className="text-2xl"
          >
            {getEmoji()}
          </motion.div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3" data-testid="timer-visual">
            <motion.div
              className={`h-full rounded-full transition-colors duration-500 ${getColorClass()}`}
              initial={{ width: '100%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Visual Countdown Circles */}
          <div className="flex justify-center space-x-1">
            {Array.from({ length: duration }, (_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i < timeRemaining ? getColorClass() : 'bg-gray-300'
                }`}
                animate={{ 
                  scale: i === timeRemaining - 1 ? [1, 1.3, 1] : 1 
                }}
                transition={{ 
                  repeat: i === timeRemaining - 1 ? Infinity : 0, 
                  duration: 1 
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};