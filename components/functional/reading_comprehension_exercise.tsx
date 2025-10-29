"use client"
import React, { useState } from 'react'
import ExerciseConfiguration from './exercise_configuration';
import ReadingPassage from './reading_passage';
import ReadingQuestions from './reading_questions';
import { Passage, saveCompletedReadingComprehensionExercise } from '@/lib/actions/exercises';






export default function ReadingComprehensionExercise({ passage, exerciseType, baseLanguage, targetLanguage, difficulty, userId }: { passage: Passage, exerciseType: string, baseLanguage: string, targetLanguage: string, difficulty: string, userId: string }) {
    const [isExerciseStarted, setIsExerciseStarted] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
    const [showResults, setShowResults] = useState(false)

    const currentPassage = passage;
    const answeredQuestions = Object.keys(selectedAnswers).length
    const progress = (answeredQuestions / currentPassage.questions.length) * 100

    const handleAnswerSelect = (questionId: number, optionIndex: number) => {
        if (!showResults) {
            setSelectedAnswers((prev) => ({
                ...prev,
                [questionId]: optionIndex,
            }))
        }
    }

    const handleSubmit = async () => {
        if (answeredQuestions === currentPassage.questions.length) {
            setShowResults(true)
            const { error } = await saveCompletedReadingComprehensionExercise({
                passage: currentPassage,
                score: score,
                elapsedTime: 0,
                userId: userId,
            })
            if (error) {
                console.error('Error saving exercise:', error)
            }
        }


    }

    const handleReset = () => {
        setSelectedAnswers({})
        setShowResults(false)
    }

    const correctAnswersCount = currentPassage.questions.filter((q) => selectedAnswers[q.id] === q.correctAnswer).length

    const score = Math.round((correctAnswersCount / currentPassage.questions.length) * 100)

    return (
        <>


            {!isExerciseStarted ? (
                <ExerciseConfiguration
                    exerciseType={exerciseType}
                    baseLanguage={baseLanguage}
                    targetLanguage={targetLanguage}
                    difficulty={difficulty}
                    onStartExercise={() => setIsExerciseStarted(true)}
                />
            ) : (
                <div className='flex  gap-4'>
                    <ReadingPassage passage={passage} />
                    <ReadingQuestions
                        passage={passage}
                        answeredQuestions={answeredQuestions}
                        progress={progress}
                        showResults={showResults}
                        score={score}
                        correctAnswersCount={correctAnswersCount}
                        selectedAnswers={selectedAnswers}
                        handleAnswerSelect={handleAnswerSelect}
                        handleSubmit={handleSubmit}
                        handleReset={handleReset}
                    />
                </div>
            )}
        </>
    )
}
