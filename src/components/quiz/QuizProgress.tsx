import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
interface QuizProgressType {
  correct: number;
  incorrect: number;
  streak: number;
  bestStreak: number;
  total: number;
}

const getAccuracyPercentage = (correct: number, total: number): number => {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
};

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
              ⭐ Best: {progress.bestStreak}
            </Badge>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default QuizProgress;