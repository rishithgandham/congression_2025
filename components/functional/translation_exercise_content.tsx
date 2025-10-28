import { cn } from '@/lib/utils'
import React from 'react'
import { TranslationQuestion } from '@/lib/actions/exercises'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TranslationExerciseContent({ showAwnser, currentQuestion, currentQuestionIndex, length, progress, loadingFeedback, userAnswer, setUserAnswer, handleCheckAnswer, handlePrevious, handleNext, averageScore }: { showAwnser: boolean, currentQuestion: TranslationQuestion, currentQuestionIndex: number, length: number, progress: number, loadingFeedback: boolean, userAnswer: string, setUserAnswer: (userAnswer: string) => void, handleCheckAnswer: () => void, handlePrevious: () => void, handleNext: () => void, averageScore: number }) {

    return (
        <>
            <div className={cn(showAwnser ? "md:w-1/2" : "md:w-2/3", "w-full")}>
                {/* Progress Bar */}

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                            Question {currentQuestionIndex + 1} of {length}
                        </span>
                        <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Question Card */}
                <Card className="mb-6 border-2">
                    <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-sm">
                                {currentQuestion.baseLanguage} → {currentQuestion.targetLanguage}
                            </Badge>
                            <Badge variant="outline" className="text-sm">
                                #{currentQuestion.id}
                            </Badge>
                        </div>
                        <CardTitle className="text-2xl text-balance">{currentQuestion.sentence}</CardTitle>
                        <CardDescription>Type your translation below</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                placeholder="Enter your translation..."
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className="text-lg py-6"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && userAnswer.trim()) {
                                        handleCheckAnswer()
                                    }
                                }}
                            />
                        </div>



                        <div className="flex gap-2">
                            <Button onClick={handleCheckAnswer} disabled={!userAnswer.trim() || showAwnser || loadingFeedback} className="flex-1">
                                Check Answer
                            </Button>

                        </div>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                    <Button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        variant="outline"
                        size="lg"
                        className="flex-1 bg-transparent"
                    >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        Previous
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={currentQuestionIndex === length - 1}
                        size="lg"
                        className="flex-1"
                    >
                        Next
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                {/* Completion Message */}
                {(currentQuestionIndex === length - 1 && showAwnser) && (
                    <div className="mt-6 p-4 bg-primary/10  rounded-lg text-center">
                        <p className="text-primary font-medium">You've finished the last question! Great job practicing!</p>
                    </div>
                )}

                {averageScore && (
                    <div className="mt-6 p-4 bg-primary/10  border-primary rounded-lg text-center">
                        <p className="text-primary font-medium">Average Score: {averageScore.toFixed(2)}</p>
                    </div>
                )}

            </div>
        </>
    )
}
