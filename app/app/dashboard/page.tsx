

import DashboardLanguageButton from '@/components/functional/dashboard_language_button'
import { useSession } from '@/lib/auth-client'
    import { redirect } from 'next/navigation'
import React from 'react'
import { Loader2 } from 'lucide-react'
import { headers } from 'next/headers'
import { getSession } from '@/lib/auth'


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

    // Check session status immediately and redirect if not authenticated
    if (!session) {
        redirect("/signin");
    }

    return (
        <>
            <div className='w-full min-h-screen flex justify-center'>
                <main className='container pt-15 '>
                    <p className='text-4xl font-bold'>Dashboard</p>
                    <p className='text-lg text-muted-foreground'>Welcome, Rishith. What language would you like to learn today?</p>

                    <div className='flex flex-row flex-wrap justify-start mt-5 gap-4'>
                        {languages.map((language) => (
                            <DashboardLanguageButton key={language.name} name={language.name} flag={language.flag} />
                        ))}
                    </div>


                    <div className='mt-10'>
                        <p className='text-xl font-bold mb-4'>Your recent activity</p>
                        <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='bg-background'>
                                        <tr>
                                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Language</th>
                                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Activity</th>
                                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-gray-200'>
                                        <tr>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>Today</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>Spanish</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>Vocabulary Practice</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>15 min</td>
                                        </tr>
                                        <tr>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>Yesterday</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>French</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>Grammar Lesson</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>25 min</td>
                                        </tr>
                                        <tr>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>2 days ago</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>German</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>Reading Exercise</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>20 min</td>
                                        </tr>
                                        <tr>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>3 days ago</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>Italian</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>Conversation Practice</td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>30 min</td>
                                        </tr>
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
