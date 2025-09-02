import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { QuizCard } from '@/components/quiz/QuizCard';
import { QuizOptions } from '@/components/quiz/QuizOptions';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { 
  getAllSymbols, 
  generateQuizOptions, 
  getRandomSymbol,
  filterSymbolsBySource,
  filterSymbolsByCategory,
  filterSymbolsByDifficulty,
  getAvailableCategories,
  getInitialProgress,
  updateProgress,
  QuizSymbol,
  QuizProgress as QuizProgressType
} from '@/data/symbolQuizData';
import { getSymbolCounts } from '@/data/allSymbols';

type GameState = 'menu' | 'playing' | 'results';

export default function SymbolQuizPage() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentSymbol, setCurrentSymbol] = useState<QuizSymbol | null>(null);
  const [quizOptions, setQuizOptions] = useState<{ text: string; isCorrect: boolean }[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState<QuizProgressType>(getInitialProgress());
  
  // Filters
  const [sourceFilter, setSourceFilter] = useState<'rws' | 'thoth' | 'universal' | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'easy' | 'medium' | 'hard' | 'all'>('all');
  
  // Symbol pool
  const [availableSymbols, setAvailableSymbols] = useState<QuizSymbol[]>([]);
  
  // Get symbol counts for display
  const symbolCounts = getSymbolCounts();

  // Update available symbols when filters change
  useEffect(() => {
    let symbols = getAllSymbols();
    symbols = filterSymbolsBySource(symbols, sourceFilter);
    symbols = filterSymbolsByCategory(symbols, categoryFilter);
    symbols = filterSymbolsByDifficulty(symbols, difficultyFilter);
    setAvailableSymbols(symbols);
  }, [sourceFilter, categoryFilter, difficultyFilter]);

  // Generate new question
  const generateNewQuestion = useCallback(() => {
    if (availableSymbols.length === 0) return;
    
    const symbol = getRandomSymbol(availableSymbols);
    const options = generateQuizOptions(symbol, availableSymbols, 4);
    
    setCurrentSymbol(symbol);
    setQuizOptions(options);
    setSelectedOption(null);
    setShowResults(false);
  }, [availableSymbols]);

  // Start quiz
  const startQuiz = () => {
    if (availableSymbols.length === 0) {
      alert('No symbols available with current filters. Please adjust your filters.');
      return;
    }
    
    setProgress(getInitialProgress());
    setGameState('playing');
    generateNewQuestion();
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    if (showResults || selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    setShowResults(true);
    
    // Update progress
    const isCorrect = quizOptions[optionIndex].isCorrect;
    if (currentSymbol) {
      setProgress(prev => updateProgress(prev, currentSymbol, isCorrect));
    }
  };

  // Next question
  const nextQuestion = () => {
    generateNewQuestion();
  };

  // End quiz
  const endQuiz = () => {
    setGameState('results');
  };

  // Reset quiz
  const resetQuiz = () => {
    setGameState('menu');
    setProgress(getInitialProgress());
  };

  const availableCategories = getAvailableCategories(getAllSymbols());

  return (
    <div className="min-h-screen p-4 space-y-6" style={{ backgroundColor: '#FFF8E7' }}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-amber-900 font-mystical">
          🔮 Symbol Quiz
        </h1>
        <p className="text-amber-700">
          Test your knowledge of tarot symbols and their meanings
        </p>
        <span data-testid="total-symbols-count" className="text-sm text-amber-500 font-medium">
          {symbolCounts.withImages} symbols with images • {symbolCounts.rws} RWS • {symbolCounts.thoth} Thoth • {symbolCounts.universal} Universal
        </span>
        <p className="text-center text-xs text-amber-500 mt-1">
          📷 Showing only symbols with images
        </p>
      </div>

      {/* Menu State */}
      {gameState === 'menu' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="mystical-card">
            <CardHeader>
              <CardTitle className="card-title text-center">
                Quiz Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Source Filter */}
              <div className="space-y-2">
                <h3 className="section-header">Source</h3>
                <Tabs value={sourceFilter} onValueChange={(value: any) => setSourceFilter(value)}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="rws">RWS</TabsTrigger>
                    <TabsTrigger value="thoth">Thoth</TabsTrigger>
                    <TabsTrigger value="universal">Universal</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <h3 className="section-header">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map(category => (
                    <Badge
                      key={category}
                      className={`cursor-pointer mystical-badge ${
                        categoryFilter === category 
                          ? 'bg-amber-200 text-amber-900' 
                          : 'bg-amber-50 text-amber-700'
                      }`}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="space-y-2">
                <h3 className="section-header">Difficulty</h3>
                <Tabs value={difficultyFilter} onValueChange={(value: any) => setDifficultyFilter(value)}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Available symbols count */}
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <span className="text-amber-800 font-medium">
                  {availableSymbols.length} symbols available with current filters
                </span>
              </div>

              {/* Start Button */}
              <Button 
                onClick={startQuiz}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                disabled={availableSymbols.length === 0}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Playing State */}
      {gameState === 'playing' && currentSymbol && (
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quiz Card */}
            <div className="lg:col-span-2 space-y-6">
              <QuizCard 
                symbol={currentSymbol}
                showAnswer={showResults}
              />
              
              {/* Question */}
              <Card className="mystical-card">
                <CardHeader>
                  <CardTitle className="card-title text-center text-lg">
                    What does this symbol mean?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QuizOptions
                    options={quizOptions}
                    selectedOption={selectedOption}
                    showResults={showResults}
                    onOptionSelect={handleOptionSelect}
                    disabled={showResults}
                  />
                  
                  {showResults && (
                    <div className="mt-6 flex justify-center gap-4">
                      <Button onClick={nextQuestion} className="bg-amber-600 hover:bg-amber-700">
                        Next Question
                      </Button>
                      <Button onClick={endQuiz} variant="outline">
                        End Quiz
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Progress Sidebar */}
            <div className="space-y-6">
              <QuizProgress progress={progress} />
            </div>
          </div>
        </div>
      )}

      {/* Results State */}
      {gameState === 'results' && (
        <div className="max-w-2xl mx-auto">
          <Card className="mystical-card text-center">
            <CardHeader>
              <CardTitle className="card-title text-2xl">
                🎉 Quiz Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <QuizProgress progress={progress} />
              
              <div className="space-y-4">
                <Button 
                  onClick={startQuiz}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  Play Again
                </Button>
                <Button 
                  onClick={resetQuiz}
                  variant="outline"
                  className="w-full"
                >
                  Change Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}