import React from 'react'
import { Badge } from '../ui/badge'
import { BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Passage } from '@/lib/actions/exercises'

export default function ReadingPassage({ passage }: { passage: Passage }) {


    return (
        <>
            {/* Passage Section */}
            <Card className="h-fit w-1/2 lg:sticky lg:top-8">
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="gap-1">
                            <BookOpen className="h-3 w-3" />
                            {passage.language}
                        </Badge>
                        <Badge variant="outline">Reading Comprehension</Badge>
                    </div>
                    <CardTitle className="text-2xl">{passage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm max-w-none">
                        {passage.content.split("\n\n").map((paragraph: string, index: number) => (
                            <p key={index} className="mb-4 text-foreground leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
