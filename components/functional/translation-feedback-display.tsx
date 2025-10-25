'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { TranslationFeedback, TranslationQuestion } from '@/lib/actions/exercises';

interface TranslationFeedbackDisplayProps {
  feedback: TranslationFeedback;
  question: TranslationQuestion;
  userAwnser: string;
}

export function TranslationFeedbackDisplay({ feedback, question, userAwnser }: TranslationFeedbackDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const getCorrectnessBadge = (isCorrect: boolean) => {
    return isCorrect ? (
      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
        <CheckCircle className="h-3 w-3 mr-1" />
        Correct
      </Badge>
    ) : (
      <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
        <XCircle className="h-3 w-3 mr-1" />
        Needs Improvement
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Score and Correctness */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Translation Score</h3>
        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg ">
          <div className="flex items-center gap-3">
            {getScoreIcon(feedback.score)}
            <div>
              <p className="text-xs text-muted-foreground">Score</p>
              <p className={`text-2xl font-bold ${getScoreColor(feedback.score)}`}>
                {feedback.score}/100
              </p>
            </div>
          </div>
          <Badge variant={feedback.score >= 90 ? "default" : "secondary"}>
            {feedback.score >= 90
              ? "Excellent"
              : feedback.score >= 70
                ? "Good"
                : "Needs Work"}
          </Badge>
        </div>
      </div>

      {/* Translation Comparison */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Translation Comparison</h3>
        <div className="space-y-3">
          <div className="p-3 bg-muted/50 rounded-lg border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Your Translation</p>
            <p className="text-sm font-medium text-foreground">{userAwnser}</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs font-medium text-primary mb-1">Correct Translation</p>
            <p className="text-sm font-medium text-primary">{question.correctAnswer}</p>
          </div>
        </div>
      </div>


      {/* Overall Feedback */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Overall Feedback</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feedback.overallFeedback}
        </p>
      </div>

      
    </div>
  );
}

