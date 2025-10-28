import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

export default function ExerciseConfiguration({ exerciseType, baseLanguage, targetLanguage, difficulty, onStartExercise }: { exerciseType: string, baseLanguage: string, targetLanguage: string, difficulty: string, onStartExercise: () => void }) {


    return (
        <>
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
                        <Button size="lg" onClick={onStartExercise} className="flex-1">
                            Start Exercise
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
