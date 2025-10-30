'use client';

import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { UserDropdown } from './user-dropdown'
import { getSession } from '@/lib/auth'
import { Bell, Languages, Moon } from 'lucide-react'
import { useSession } from '@/lib/auth-client';
import { NavbarSkeleton } from './navbar-skeleton';
import { Instrument_Sans } from 'next/font/google';

const instrumentSans = Instrument_Sans({
    variable: "--font-instrument-sans",
    subsets: ["latin"],
});

export default  function Navbar() {


    const { data: session, isPending } = useSession();
    

    if (isPending) {
        return <NavbarSkeleton />;
    }

    if (!session) {
        console.log('No session found, returning null');
        return null;
    }

    return (
        <>
            <div className='w-full bg-background h-12 '>
                <div className='container mx-auto h-full'>
                    <div className="grid grid-cols-2 w-full h-full">
                        <div className='flex items-center justify-start'>
                            <Languages className='h-5 w-5 ml-2 mr-2' />
                            <Link href="/app/dashboard" className={`text-lg ${instrumentSans.className} font-semibold mr-4`}>
                                Literaid
                            </Link>
                            <Button variant="link" size="sm">
                                <Link href="/app/dashboard">
                                    Dashboard
                                </Link>

                            </Button>
                            <Button variant="link" size="sm">
                                <Link href="/app/statistics">
                                    Statistics
                                </Link>
                            </Button>

                            <Button variant="link" size="sm">
                                <Link href="/app/statistics">
                                    Learn
                                </Link>
                            </Button>
                        </div>
                        <div className='flex items-center justify-end'>
                            <Moon className='h-3 w-3 ' />
                            <Bell className='h-3 w-3 ml-3 mr-5' />
                            <UserDropdown user={session.user} />
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}
