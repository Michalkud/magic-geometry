import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizProgress as QuizProgressType, getAccuracyPercentage } from '@/data/symbolQuizData';

interface QuizProgressProps {
  progress: QuizProgressType;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({ progress }) => {
  const accuracy = getAccuracyPercentage(progress.correct, progress.total);

  return (
    <Card className="mystical-card">
      <CardHeader>
        <CardTitle className="card-title text-center text-lg">
          📊 Quiz Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Stats */}
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-amber-400">
            {progress.correct} / {progress.total}
          </div>
          <div className="text-sm text-amber-300">
            {accuracy}% Accuracy
          </div>
          <div className="flex justify-center gap-4">
            <Badge className="mystical-badge">
              🔥 Streak: {progress.streak}
            </Badge>
            <Badge className="mystical-badge">
              ⭐ Best: {progress.maxStreak}
            </Badge>
          </div>
        </div>

        {/* By Source */}
        {progress.total > 0 && (
          <div className="space-y-2">
            <h3 className="section-header text-sm">By Source</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(progress.bySource).map(([source, stats]) => (
                stats.total > 0 && (
                  <div key={source} className="text-center p-2 bg-amber-50 rounded">
                    <div className="text-xs font-medium text-amber-800">
                      {source.toUpperCase()}
                    </div>
                    <div className="text-xs text-amber-600">
                      {stats.correct}/{stats.total} ({getAccuracyPercentage(stats.correct, stats.total)}%)
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* By Difficulty */}
        {progress.total > 0 && (
          <div className="space-y-2">
            <h3 className="section-header text-sm">By Difficulty</h3>
            <div className="grid grid-cols-3 gap-1">
              {Object.entries(progress.byDifficulty).map(([difficulty, stats]) => (
                stats.total > 0 && (
                  <div key={difficulty} className="text-center p-2 bg-amber-50 rounded">
                    <div className="text-xs font-medium text-amber-800 capitalize">
                      {difficulty}
                    </div>
                    <div className="text-xs text-amber-600">
                      {stats.correct}/{stats.total}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizProgress;