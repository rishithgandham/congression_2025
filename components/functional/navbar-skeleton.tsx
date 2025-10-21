import { Skeleton } from '../ui/skeleton';

export function NavbarSkeleton() {
    return (
        <div className='w-full bg-background h-12'>
            <div className='container mx-auto h-full'>
                <div className="grid grid-cols-2 w-full h-full">
                    <div className='flex items-center justify-start gap-4'>
                        <Skeleton className="h-4 w-4 ml-2" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                    <div className='flex items-center justify-end'>
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
