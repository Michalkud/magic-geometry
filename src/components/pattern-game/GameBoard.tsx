import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PatternCard } from './PatternCard';
import { GameTimer } from './GameTimer';
import { StreakDisplay } from './StreakDisplay';
import { VisualProgress } from './VisualProgress';
import type { DBSymbol } from '@/db/types';

type Difficulty = 'easy' | 'medium' | 'hard';

interface GameStats {
  correct: number;
  incorrect: number;
  streak: number;
  bestStreak: number;
  totalRounds: number;
}

interface GameBoardProps {
  symbols: DBSymbol[];
  difficulty: Difficulty;
  gameStats: GameStats;
  onUpdateStats: (isCorrect: boolean) => void;
  onEndGame: () => void;
}

const TIMER_DURATION = 10; // seconds
const OPTIONS_COUNT = 4;

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateOptions = (correctSymbol: DBSymbol, allSymbols: DBSymbol[]): DBSymbol[] => {
  const options = [correctSymbol];
  const otherSymbols = allSymbols.filter(s => s.id !== correctSymbol.id);
  
  while (options.length < OPTIONS_COUNT && otherSymbols.length > 0) {
    const randomIndex = Math.floor(Math.random() * otherSymbols.length);
    const symbol = otherSymbols.splice(randomIndex, 1)[0];
    options.push(symbol);
  }
  
  return shuffleArray(options);
};

export const GameBoard: React.FC<GameBoardProps> = ({
  symbols,
  difficulty,
  gameStats,
  onUpdateStats,
  onEndGame
}) => {
  const [currentSymbol, setCurrentSymbol] = useState<DBSymbol | null>(null);
  const [options, setOptions] = useState<DBSymbol[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION);

  const generateNewRound = useCallback(() => {
    if (symbols.length === 0) return;
    
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const roundOptions = generateOptions(randomSymbol, symbols);
    
    setCurrentSymbol(randomSymbol);
    setOptions(roundOptions);
    setSelectedOption(null);
    setShowFeedback(false);
    setTimeRemaining(TIMER_DURATION);
  }, [symbols]);

  // Initialize first round
  useEffect(() => {
    generateNewRound();
  }, [generateNewRound]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !showFeedback) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !showFeedback) {
      // Time up - mark as incorrect
      handleAnswer(null);
    }
  }, [timeRemaining, showFeedback]);

  const handleAnswer = (selectedSymbolId: string | null) => {
    if (showFeedback || !currentSymbol) return;
    
    const correct = selectedSymbolId === currentSymbol.id;
    
    setSelectedOption(selectedSymbolId);
    setIsCorrect(correct);
    setShowFeedback(true);
    onUpdateStats(correct);
  };

  const nextRound = () => {
    generateNewRound();
  };

  if (!currentSymbol) {
    return (
      <div className="text-center py-8">
        <p>Loading game...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto" data-testid="pattern-game-board">
      {/* Game HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StreakDisplay 
          streak={gameStats.streak}
          bestStreak={gameStats.bestStreak}
        />
        <GameTimer 
          timeRemaining={timeRemaining}
          duration={TIMER_DURATION}
        />
        <VisualProgress 
          correct={gameStats.correct}
          total={gameStats.totalRounds}
          difficulty={difficulty}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Target Symbol */}
        <div className="lg:col-span-1">
          <Card className="mystical-card">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-lg font-semibold text-amber-800">Find This Symbol</h3>
              </div>
              
              <div data-testid="target-symbol">
                <PatternCard
                  symbol={currentSymbol}
                  isTarget={true}
                  size="large"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Symbol Options */}
        <div className="lg:col-span-2">
          <Card className="mystical-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4" data-testid="symbol-options">
                <AnimatePresence>
                  {options.map((symbol, index) => (
                    <motion.div
                      key={`${symbol.id}-${currentSymbol.id}`}
                      data-testid="symbol-option"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PatternCard
                        symbol={symbol}
                        onClick={() => handleAnswer(symbol.id)}
                        disabled={showFeedback}
                        isSelected={selectedOption === symbol.id}
                        showResult={showFeedback ? (symbol.id === currentSymbol.id ? 'correct' : 'incorrect') : undefined}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Feedback and Controls */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center space-y-4"
                    data-testid="match-feedback"
                  >
                    {isCorrect ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-4xl text-green-600"
                        data-testid="success-animation"
                      >
                        ✨ 🎉 ✨
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-4xl text-red-600"
                      >
                        ❌
                      </motion.div>
                    )}
                    
                    <div className="flex justify-center gap-4">
                      <Button 
                        onClick={nextRound}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        Next Round
                      </Button>
                      <Button 
                        onClick={onEndGame}
                        variant="outline"
                      >
                        End Game
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};