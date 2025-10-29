import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { Passage } from '@/lib/actions/exercises'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import Link from 'next/link'

export default function ReadingQuestions({ passage, answeredQuestions, progress, showResults, score, correctAnswersCount, selectedAnswers, handleAnswerSelect, handleSubmit, handleReset }: { passage: Passage, answeredQuestions: number, progress: number, showResults: boolean, score: number, correctAnswersCount: number, selectedAnswers: Record<number, number>, handleAnswerSelect: (questionId: number, optionIndex: number) => void, handleSubmit: () => void, handleReset: () => void }) {


  return (
    <>
      <div className="space-y-6">
        {/* Progress Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {answeredQuestions} / {passage.questions.length} answered
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {showResults && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{score}%</div>
                  <div className="text-sm text-muted-foreground">
                    {correctAnswersCount} out of {passage.questions.length} correct
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Questions Card with Scrollable Content */}
        <Card>
          <CardHeader>
            <CardTitle>Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-6">
              {passage.questions.map((question, qIndex) => {
                const isAnswered = selectedAnswers[question.id] !== undefined
                const selectedOption = selectedAnswers[question.id]
                const isCorrect = selectedOption === question.correctAnswer

                return (
                  <div key={question.id} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1 shrink-0">
                        {qIndex + 1}
                      </Badge>
                      <p className="font-medium leading-relaxed">{question.question}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 ml-11">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = selectedOption === optionIndex
                        const isCorrectOption = optionIndex === question.correctAnswer
                        const showCorrect = showResults && isCorrectOption
                        const showIncorrect = showResults && isSelected && !isCorrect

                        return (
                          <button
                            key={optionIndex}
                            onClick={() => handleAnswerSelect(question.id, optionIndex)}
                            disabled={showResults}
                            className={cn(
                              "w-full text-left p-3 rounded-lg border-2 transition-all",
                              "hover:border-primary/50 disabled:cursor-not-allowed",
                              isSelected && !showResults && "border-primary bg-primary/5",
                              !isSelected && !showResults && "border-border",
                              showCorrect && "border-green-500 bg-green-50 dark:bg-green-950/20",
                              showIncorrect && "border-red-500 bg-red-50 dark:bg-red-950/20",
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm leading-relaxed">{option}</span>
                              {showCorrect && <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />}
                              {showIncorrect && <XCircle className="h-5 w-5 text-red-600 shrink-0" />}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {qIndex < passage.questions.length - 1 && <div className="border-b mt-6" />}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-4 border-t flex gap-3">
              {!showResults ? (
                <Button
                  onClick={handleSubmit}
                  disabled={answeredQuestions !== passage.questions.length}
                  className="flex-1"
                >
                  Submit Answers
                </Button>
              ) : (
                <>
                  <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
                    Try Again
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Link href="/app/dashboard">
                      Back to Dashboard
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
