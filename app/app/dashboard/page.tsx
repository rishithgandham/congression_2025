

import DashboardLanguageButton from '@/components/functional/dashboard_language_button'
import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import React from 'react'
import { BookText, Loader2 } from 'lucide-react'
import { headers } from 'next/headers'
import { getSession } from '@/lib/auth'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SelectExercise from '@/components/functional/select-exercise'
import { getAllExercises } from '@/lib/actions/exercises'


const languages = [
    {
        name: 'English',
        flag: 'fi fi-us',
    },
    {
        name: 'French',
        flag: 'fi fi-gf',
    },
    {
        name: 'Spanish',
        flag: 'fi fi-mx',
    },
    {
        name: 'German',
        flag: 'fi fi-de',
    },
    {
        name: 'Italian',
        flag: 'fi fi-it',
    },
]

export default async function Dashboard() {


    const session = await getSession({
        headers: await headers(),
    });

    console.log(session);

    // Check session status immediately and redirect if not authenticated
    if (!session) {
        redirect("/signin");
    }

    const { exercises, error } = await getAllExercises(session?.user?.id);

    return (
        <>
            <div className='w-full min-h-screen flex justify-center'>
                <main className='container pt-10 '>
                    {/* <p className='text-4xl font-bold'>Dashboard</p>
                    <p className='text-lg text-muted-foreground'>Welcome, Rishith. How would you like to practice today?</p> */}

                    {/* <div className='flex flex-row flex-wrap justify-start mt-5 gap-4'>
                        {languages.map((language) => (
                            <DashboardLanguageButton key={language.name} name={language.name} flag={language.flag} />
                        ))}
                    </div> */}

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Welcome, {session?.user?.name.split(" ")[0]} </h1>
                        <p className="text-muted-foreground text-lg">Select how you'd like to practice today</p>
                    </div>

                    <SelectExercise />


                    <div className='my-10'>
                        <p className='text-xl font-bold mb-4'>Your recent activity</p>
                        <div className='bg-card border border-gray-200 rounded-lg overflow-hidden'>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='bg-background'>
                                        <tr>
                                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Language</th>
                                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Activity</th>
                                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Difficulty</th>
                                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Score</th>

                                        </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-gray-200'>
                                        {exercises.map((exercise) => (
                                            <tr key={exercise.id}>
                                                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>{exercise.date.toLocaleDateString()}</td>
                                                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>{exercise.targetLanguage}</td>
                                                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>{exercise.exerciseType === 'translation' ? 'Translation' : 'Reading Comprehension'}</td>
                                                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>{exercise.difficulty}</td>
                                                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>{exercise.score}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                            
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
