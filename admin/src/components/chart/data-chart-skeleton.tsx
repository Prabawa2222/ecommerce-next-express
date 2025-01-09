import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader } from '@/components/ui/card'

type ChartSkeletonProps = {
  className?: string
}

const ChartSkeleton = ({ className }: ChartSkeletonProps) => {
  return (
    <Card className={cn('p-4 md:p-6', className)}>
      <CardHeader className='mb-4 p-0'>
        <Skeleton className='h-4 w-1/4' />
      </CardHeader>
      <div className='flex h-[320px] w-full items-end gap-2 pt-8'>
        <Skeleton className='h-1/2 w-full' />
        <Skeleton className='h-2/3 w-full' />
        <Skeleton className='h-1/2 w-full' />
        <Skeleton className='h-1/4 w-full' />
        <Skeleton className='h-2/3 w-full' />
        <Skeleton className='h-3/5 w-full' />
        <Skeleton className='hidden h-5/6 w-full md:block' />
        <Skeleton className='hidden h-1/5 w-full md:block' />
        <Skeleton className='hidden h-2/3 w-full md:block' />
        <Skeleton className='hidden h-1/2 w-full md:block' />
        <Skeleton className='hidden h-3/5 w-full md:block' />
        <Skeleton className='hidden h-5/6 w-full md:block' />
      </div>
    </Card>
  )
}

export default ChartSkeleton
