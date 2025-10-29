import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import TranslationPractice from '@/components/functional/translation_exercise';
import { generateTranslationExercises, Passage, TranslationQuestion } from '@/lib/actions/exercises';
import TranslationExercise from '@/components/functional/translation_exercise';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import ReadingComprehensionExercise from '@/components/functional/reading_comprehension_exercise';

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




    

    // Mock data
    const passage: Passage = {

        title: "La Vida en la Ciudad",
        difficulty: "medium",
        language: "Spanish",
        content: `Madrid es la capital de España y una de las ciudades más grandes de Europa. Con más de tres millones de habitantes, Madrid es conocida por su rica historia, su vibrante vida cultural y su deliciosa gastronomía.
      
      El centro de Madrid está lleno de monumentos históricos. El Palacio Real, la residencia oficial de la familia real española, es uno de los palacios más grandes de Europa. Aunque la familia real ya no vive allí, el palacio está abierto al público y recibe miles de visitantes cada año.
      
      La Plaza Mayor es otro lugar emblemático de Madrid. Esta plaza rectangular, construida en el siglo XVII, ha sido testigo de muchos eventos importantes en la historia española. Hoy en día, la plaza está rodeada de cafés y restaurantes donde los madrileños y turistas disfrutan de tapas y conversaciones.
      
      Madrid también es famosa por sus museos. El Museo del Prado alberga una de las colecciones de arte más importantes del mundo, con obras de artistas españoles como Velázquez y Goya. El Museo Reina Sofía, por otro lado, se especializa en arte moderno y contemporáneo, incluyendo el famoso cuadro "Guernica" de Picasso.
      
      La vida nocturna en Madrid es legendaria. Los madrileños cenan tarde, generalmente después de las nueve de la noche, y las calles están llenas de vida hasta altas horas de la madrugada. Los bares de tapas, los restaurantes y las discotecas permanecen abiertos hasta muy tarde, reflejando el espíritu festivo de la ciudad.`,
        questions: [
            {
                id: 1,
                question: "¿Cuántos habitantes tiene aproximadamente Madrid?",
                options: ["Menos de un millón", "Más de tres millones", "Exactamente dos millones", "Cinco millones"],
                correctAnswer: 1,
            },
            {
                id: 2,
                question: "¿Qué característica tiene el Palacio Real?",
                options: [
                    "Es el palacio más pequeño de Europa",
                    "La familia real vive allí actualmente",
                    "Es uno de los palacios más grandes de Europa",
                    "Está cerrado al público",
                ],
                correctAnswer: 2,
            },
            {
                id: 3,
                question: "¿Cuándo fue construida la Plaza Mayor?",
                options: ["En el siglo XV", "En el siglo XVI", "En el siglo XVII", "En el siglo XVIII"],
                correctAnswer: 2,
            },
            {
                id: 4,
                question: "¿Qué tipo de arte se encuentra en el Museo Reina Sofía?",
                options: ["Arte clásico solamente", "Arte medieval", "Arte moderno y contemporáneo", "Arte asiático"],
                correctAnswer: 2,
            },
            {
                id: 5,
                question: "¿A qué hora cenan generalmente los madrileños?",
                options: [
                    "Antes de las seis de la tarde",
                    "A las siete de la noche",
                    "Después de las nueve de la noche",
                    "A mediodía",
                ],
                correctAnswer: 2,
            },
        ],
    };






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

            {exerciseType === 'translation' ? (
                <TranslationExercise questions={mockExercises}
                    exerciseType={exerciseType}
                    baseLanguage={baseLanguage}
                    targetLanguage={targetLanguage}
                    difficulty={difficulty}
                    userId={session?.user?.id ?? ''}
                />
            ) : (
                <ReadingComprehensionExercise
                    exerciseType={exerciseType}
                    baseLanguage={baseLanguage}
                    targetLanguage={targetLanguage}
                    difficulty={difficulty}
                    userId={session?.user?.id ?? ''}
                    passage={passage}
                />
            )}
        </div>
    );
}