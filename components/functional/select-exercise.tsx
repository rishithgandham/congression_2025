'use client';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Languages } from 'lucide-react';
import { BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { redirect, useRouter } from 'next/navigation';

const languages = [
    { name: 'English', flag: 'fi fi-us' },
    { name: 'French', flag: 'fi fi-gf' },
    { name: 'Spanish', flag: 'fi fi-mx' },
    { name: 'German', flag: 'fi fi-de' },
    { name: 'Italian', flag: 'fi fi-it' },
];

export default function SelectExercise() {
    const router = useRouter();
    const [exerciseType, setExerciseType] = useState<"translation" | "reading_comprehension">();
    const [baseLanguage, setBaseLanguage] = useState<string>('');
    const [targetLanguage, setTargetLanguage] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');

    const redirectUserToExercise = (type: "translation" | "reading_comprehension") => {
        router.push(`/app/exercise/${type}?baseLanguage=${baseLanguage}&targetLanguage=${targetLanguage}&difficulty=${difficulty}`);
    };
        
    const isReadyToStart = baseLanguage && targetLanguage && difficulty && baseLanguage !== targetLanguage;

    return (

        <div className="space-y-6">
            {/* Language Selection */}
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="text-xl">Language Settings</CardTitle>
                    <CardDescription>
                        Choose your base language and the language you want to practice
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="baseLanguage">Your Base Language</Label>
                            <Select value={baseLanguage} onValueChange={setBaseLanguage}>
                                <SelectTrigger className="bg-white w-full">
                                    <SelectValue placeholder="Select base language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.name} value={lang.name}>
                                            {lang.name}
                                            <span className={`${lang.flag}`} ></span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetLanguage">Language to Practice</Label>
                            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                                <SelectTrigger className="bg-white w-full">
                                    <SelectValue placeholder="Select target language" />
                                </SelectTrigger>
                                <SelectContent className=''>
                                    {languages.map((lang) => (
                                        <SelectItem className='flex justify-between' key={lang.name} value={lang.name}>
                                            {lang.name}
                                            <span className={`${lang.flag}`} ></span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="difficulty">Difficulty Level</Label>
                            <Select value={difficulty} onValueChange={setDifficulty}>
                                <SelectTrigger className="bg-white w-full">
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
                </CardContent>
            </Card>

            {/* Exercise Selection */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Translation Practice Card */}
                <Card className="h-full border-2 transition-all bg-card  hover:border-primary hover:shadow-lg">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                <Languages className="h-10 w-10 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl text-center">Translation Practice</CardTitle>
                        <CardDescription className="text-center text-base">
                            Translate sentences from one language to another and improve your vocabulary
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full cursor-pointer"
                            size="lg"
                            onClick={() => {
                                redirectUserToExercise("translation");
                            }}
                            disabled={!isReadyToStart}
                        >
                            Start Translating
                        </Button>
                    </CardContent>
                </Card>

                {/* Reading Comprehension Card */}
                <Card className="h-full justify-between bg-card border-2 transition-all hover:border-primary hover:shadow-lg">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                <BookText className="h-10 w-10 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl text-center">Reading Comprehension</CardTitle>
                        <CardDescription className="text-center text-base">
                            Read passages and answer questions to test your understanding
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full cursor-pointer"
                            size="lg"
                            onClick={() => {
                                redirectUserToExercise("reading_comprehension");
                            }}
                            disabled={!isReadyToStart}
                        >
                            Start Reading
                        </Button>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
