import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import TranslationPractice from '@/components/functional/translation_exercise';
import { generateTranslationExercises, TranslationQuestion } from '@/lib/actions/exercises';
import TranslationExercise from '@/components/functional/translation_exercise';

export default async function ExercisePage({
    params,
    searchParams
}: {
    params: Promise<{ type: string }>;
    searchParams: Promise<{ baseLanguage: string, targetLanguage: string, difficulty: string }>;
}) {
    const { type: exerciseType } = await params;
    const { baseLanguage, targetLanguage, difficulty } = await searchParams;

    const { exercises, error } = await generateTranslationExercises(
        baseLanguage,
        targetLanguage,
        difficulty,
        5
    );

    // create some mock exercises
    const mockExercises: TranslationQuestion[] = [
        {
            id: 1,
            baseLanguage: 'English',
            targetLanguage: 'Spanish',
            sentence: 'Hello, how are you?',
            correctAnswer: 'Hola, ¿cómo estás?',
            difficulty: 'easy',
            category: 'greetings',
        },
        {
            id: 2,
            baseLanguage: 'English',
            targetLanguage: 'Spanish',
            sentence: 'I love learning new languages.',
            correctAnswer: 'Me encanta aprender nuevos idiomas.',
            difficulty: 'medium',
            category: 'general',
        },
        {
            id: 3,
            baseLanguage: 'English',
            targetLanguage: 'Spanish',
            sentence: 'Where is the nearest library?',
            correctAnswer: '¿Dónde está la biblioteca más cercana?',
            difficulty: 'hard',
            category: 'general',
        },
        {
            id: 4,
            baseLanguage: 'English',
            targetLanguage: 'Spanish',
            sentence: 'Can you help me with this?',
            correctAnswer: '¿Puedes ayudarme con esto?',
            difficulty: 'easy',
            category: 'general',
        },
        {
            id: 5,
            baseLanguage: 'English',
            targetLanguage: 'Spanish',
            sentence: 'Thank you very much for your time.',
            correctAnswer: 'Muchas gracias por tu tiempo.',
            difficulty: 'medium',
            category: 'general',
        },
    ];





    return (
        <div className="container  mx-auto py-8">
            <div className="mb-6">
                <Link href="/app/dashboard">
                    <Button variant="link" className="mb-4 cursor-pointer">
                        <ArrowLeft className="h-3 w-3 " />
                        Back to Dashboard
                    </Button>
                </Link>

                <h1 className="text-3xl font-bold capitalize">
                    {exerciseType.replace('_', ' ')} Exercise
                </h1>
                <p className="text-muted-foreground mt-2">
                    Practice translating {targetLanguage} with {baseLanguage} as your base language
                </p>
            </div>

            <TranslationExercise questions={exercises}
                exerciseType={exerciseType}
                baseLanguage={baseLanguage}
                targetLanguage={targetLanguage}
                difficulty={difficulty}

            />
        </div>
    );
}