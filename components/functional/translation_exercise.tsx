"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, SkipForward, ArrowLeft, Sparkle, Sparkles, Languages, Loader, Loader2 } from "lucide-react"
import { gradeTranslation, TranslationQuestion, TranslationFeedback } from "@/lib/actions/exercises"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"
import { TranslationFeedbackDisplay } from "./translation-feedback-display"



export default function TranslationExercise({ questions, exerciseType, baseLanguage, targetLanguage, difficulty }: { questions: TranslationQuestion[], exerciseType: string, baseLanguage: string, targetLanguage: string, difficulty: string }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [loadingFeedback, setLoadingFeedback] = useState(false)
  const [feedback, setFeedback] = useState<TranslationFeedback | null>(null)



  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const [isExerciseStarted, setIsExerciseStarted] = useState(false)

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setUserAnswer("")
      setShowAnswer(false)
      setFeedback(null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setUserAnswer("")
      setShowAnswer(false)
      setFeedback(null)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const handleCheckAnswer = async () => {
    setLoadingFeedback(true)
    const { feedback: feedbackData, error } = await gradeTranslation(currentQuestion, userAnswer)

    if (error) {
      console.error('Error getting feedback:', error)
    } else {
      setFeedback(feedbackData)
    }

    setLoadingFeedback(false)
    setShowAnswer(true)
  }



  return (
    <div className="container px-0 ">

      {!isExerciseStarted ? (
        <Card className='border-2 bg-card w-full'>
          <CardHeader>
            <CardTitle>Exercise Configuration</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Exercise Type</label>
                <p className="text-lg capitalize">{exerciseType.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Base Language</label>
                <p className="text-lg">{baseLanguage}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Target Language</label>
                <p className="text-lg">{targetLanguage}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
                <p className="text-lg capitalize">{difficulty}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button size="lg" onClick={() => setIsExerciseStarted(true)} className="flex-1">
                Start Exercise
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex">
          <div className={cn(showAnswer ? "md:w-1/2" : "md:w-2/3", "w-full")}>
            {/* Progress Bar */}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
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
                  <Button onClick={handleCheckAnswer} disabled={!userAnswer.trim() || showAnswer} className="flex-1">
                    Check Answer
                  </Button>
                  <Button onClick={handleSkip} variant="outline" className="flex-1 bg-transparent">
                    <SkipForward className="mr-2 h-4 w-4" />
                    Skip
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
                disabled={currentQuestionIndex === questions.length - 1}
                size="lg"
                className="flex-1"
              >
                Next
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Completion Message */}
            {currentQuestionIndex === questions.length - 1 && (
              <div className="mt-6 p-4 bg-primary/10 border border-primary rounded-lg text-center">
                <p className="text-primary font-medium">You've reached the last question! Great job practicing!</p>
              </div>
            )}

          </div>
          <div className={cn("px-5 min-h-[500px] w-full", showAnswer ? "md:w-1/2" : "md:w-1/3")}>
            <Card className="h-[100%] gap-1">
              <CardHeader className="">
                <div className="">

                  <CardTitle className="text-xl flex items-center gap-3 mb-3"><Sparkles className="h-5 w-5 text-primary" />AI Feedback</CardTitle>

                  <p className="text-sm text-muted-foreground">
                    Feedback will be shown here after you check your answer.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="h-full overflow-y-auto">
                {showAnswer && feedback ? (
                  <TranslationFeedbackDisplay feedback={feedback} question={currentQuestion} userAwnser={userAnswer} />
                ) : loadingFeedback ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-10 w-10 text-muted-foreground/50 animate-spin" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Languages className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
