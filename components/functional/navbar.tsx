'use client';

import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { UserDropdown } from './user-dropdown'
import { getSession } from '@/lib/auth'
import { Bell, Languages, Moon } from 'lucide-react'
import { useSession } from '@/lib/auth-client';
import { NavbarSkeleton } from './navbar-skeleton';
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
                            <Languages className='h-4 w-4 ml-2 mr-4' />
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
