import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import TranslationPractice from '@/components/functional/translation_exercise';
import { generateTranslationExercises, TranslationQuestion } from '@/lib/actions/exercises';
import TranslationExercise from '@/components/functional/translation_exercise';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function ExercisePage({
    params,
    searchParams
}: {
    params: Promise<{ type: string }>;
    searchParams: Promise<{ baseLanguage: string, targetLanguage: string, difficulty: string }>;
}) {
    const { type: exerciseType } = await params;
    const { baseLanguage, targetLanguage, difficulty } = await searchParams;

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    console.log(session?.user.id);

    // const { exercises, error } = await generateTranslationExercises(
    //     baseLanguage,
    //     targetLanguage,
    //     difficulty,
    //     5
    // );

    // create some mock exercises
    const mockExercises: TranslationQuestion[] = [

        {
            id: 1,
            baseLanguage: 'Spanish',
            targetLanguage: 'English',
            sentence: 'Mi hermana siempre se lleva mi ropa sin pedir permiso.',
            correctAnswer: 'My sister always takes my clothes without asking for permission.',
            difficulty: 'medium',
            category: 'daily life'
        },
        {
            id: 2,
            baseLanguage: 'Spanish',
            targetLanguage: 'English',
            sentence: 'Estoy emocionado por nuestro viaje a la playa este fin de semana.',
            correctAnswer: "I'm excited about our trip to the beach this weekend.",
            difficulty: 'medium',
            category: 'travel'
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

            <TranslationExercise questions={mockExercises}
                exerciseType={exerciseType}
                baseLanguage={baseLanguage}
                targetLanguage={targetLanguage}
                difficulty={difficulty}
                userId={session?.user?.id ?? ''}
            />
        </div>
    );
}