'use client'

import React from 'react'
import { Card, CardFooter } from '../ui/card'
import { CardContent } from '../ui/card'

export default function DashboardLanguageButton({ name, flag }: { name: string, flag: string }) {


    return (
        <>
            <button className='m-0 p-0 border-none  cursor-pointer hover:scale-105 transition-all ease-in-out'>
                <Card className='w-50 gap-4 py-4 px-4 bg-background'>
                    <CardContent className='p-0'>
                        <span className={`${flag} text-8xl rounded-xl`} ></span> 
                    </CardContent>
                    <CardFooter className='justify-center max-h-10'>
                        <p className="text-md font-medium">{name}</p>
                    </CardFooter>
                </Card>
            </button>
        </>
    );
}