import DashboardLanguageButton from '@/components/functional/dashboard_language_button'
import React from 'react'


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

export default function Dashboard() {
    

    return (
        <>
            <div className='w-screen min-h-screen flex justify-center'>
                <main className='container pt-20 mx-auto'>
                    <p className='text-4xl font-bold'>Dashboard</p>
                    <p className='text-lg text-muted-foreground'>Welcome, Rishith. What language would you like to work on today?</p>

                    <div className='flex justify-start mt-5 gap-4'>
                        {languages.map((language) => (
                            <DashboardLanguageButton key={language.name} name={language.name} flag={language.flag} />
                        ))}
                    </div>


                    <p className='text-xl font-bold mt-10'>Your recent activity</p>
                </main>
            </div>
        </>
    )
}
