'use client'

import React, { useState } from 'react'
import { Card, CardFooter } from '../ui/card'
import { CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function DashboardLanguageButton({ name, flag }: { name: string, flag: string }) {
    const [familiarity, setFamiliarity] = useState<string>('')
    const [questionCount, setQuestionCount] = useState<string>('')
    const [difficulty, setDifficulty] = useState<string>('')

    const handleStartActivity = () => {
        console.log('Starting activity:', { name, familiarity, questionCount, difficulty })
        // TODO: Implement activity start logic
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='m-0 p-0 border-none cursor-pointer hover:scale-105 transition-all ease-in-out'>
                    <Card className='w-50 gap-4 py-4 px-4 bg-background'>
                        <CardContent className='p-0'>
                            <span className={`${flag} text-8xl rounded-xl`} ></span> 
                        </CardContent>
                        <CardFooter className='justify-center max-h-10'>
                            <p className="text-md font-medium">{name}</p>
                        </CardFooter>
                    </Card>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Start Learning {name}</DialogTitle>
                    <DialogDescription>
                        Let's customize your learning experience for {name}.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="familiarity">How familiar are you with {name}?</Label>
                        <Select value={familiarity} onValueChange={setFamiliarity}>
                            <SelectTrigger className='bg-white w-full'>
                                <SelectValue placeholder="Select your level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
                                <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                                <SelectItem value="advanced">Advanced - Very comfortable</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="questions">How many questions?</Label>
                        <Select   value={questionCount} onValueChange={setQuestionCount}>
                            <SelectTrigger className='bg-white w-full '>
                                <SelectValue placeholder="Select question count" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 questions</SelectItem>
                                <SelectItem value="10">10 questions</SelectItem>
                                <SelectItem value="15">15 questions</SelectItem>
                                <SelectItem value="20">20 questions</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="difficulty">Difficulty level</Label>
                        <Select value={difficulty} onValueChange={setDifficulty}>
                            <SelectTrigger className='bg-white w-full'>
                                <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button 
                        onClick={handleStartActivity}
                        disabled={!familiarity || !questionCount || !difficulty}
                        className="w-full"
                    >
                        Start Activity
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}