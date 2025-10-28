"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, SkipForward, ArrowLeft, Sparkle, Sparkles, Languages, Loader, Loader2 } from "lucide-react"
import { gradeTranslation, TranslationQuestion, TranslationFeedback, saveCompletedTranslationExercise } from "@/lib/actions/exercises"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"
import TranslationFeedbackDisplay from "./translation_feedback_display";
import ExerciseConfiguration from "./exercise_configuration"
import TranslationExerciseContent from "./translation_exercise_content"



export default function TranslationExercise({ questions, exerciseType, baseLanguage, targetLanguage, difficulty, userId }: { questions: TranslationQuestion[], exerciseType: string, baseLanguage: string, targetLanguage: string, difficulty: string, userId: string }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [loadingFeedback, setLoadingFeedback] = useState(false)
  const [isExerciseStarted, setIsExerciseStarted] = useState(false)

  const [feedback, setFeedback] = useState<TranslationFeedback | null>(null)
  const [averageScore, setAverageScore] = useState<number | null>(null);



  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100





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

    if (averageScore === null) {
      setAverageScore(feedbackData.score)
    } else {
      setAverageScore((averageScore + feedbackData.score) / 2)
    }



    setLoadingFeedback(false)
    setShowAnswer(true)

    console.log(averageScore);
    console.log(feedbackData.score);

    if (currentQuestionIndex === questions.length - 1) {
      await saveCompletedTranslationExercise({
        baseLanguage,
        targetLanguage,
        difficulty,
        questions: questions.length,
        score: Math.round((averageScore! + feedbackData.score)/2),
        elapsedTime: 0,
        userId: userId,
      })
      if (error) {
        console.error('Error saving exercise:', error)
      }
    }
  }



  return (
    <div className="container px-0 ">

      {!isExerciseStarted ? (
        <ExerciseConfiguration
          exerciseType={exerciseType}
          baseLanguage={baseLanguage}
          targetLanguage={targetLanguage}
          difficulty={difficulty}
          onStartExercise={() => setIsExerciseStarted(true)}
        />
      ) : (
        <div className="flex">
          <TranslationExerciseContent
            showAwnser={showAnswer}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            length={questions.length}
            progress={progress}
            loadingFeedback={loadingFeedback}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            handleCheckAnswer={handleCheckAnswer}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            averageScore={averageScore ?? 0}
          />
          <TranslationFeedbackDisplay 
            showAwnser={showAnswer}
            feedback={feedback ?? { score: 0, isCorrect: false, overallFeedback: "" }}
            currentQuestion={currentQuestion}
            userAwnser={userAnswer}
            loadingFeedback={loadingFeedback}
          />
        </div>
      )}
    </div>
  )
}
