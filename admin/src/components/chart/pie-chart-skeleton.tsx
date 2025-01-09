import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

type PieChartSkeletonProps = {
  className?: string
}

const PieChartSkeleton = ({ className }: PieChartSkeletonProps) => {
  return (
    <Card
      className={cn(
        'flex w-full flex-col items-center gap-6 p-4 md:p-6',
        className
      )}
    >
      <Skeleton className='h-4 w-2/3' />

      <Skeleton className='aspect-square w-2/3 rounded-full' />
      <div className='flex w-2/3 items-center gap-4'>
        <Skeleton className='h-3 w-full flex-1' />
        <Skeleton className='h-3 w-full flex-1' />
        <Skeleton className='h-3 w-full flex-1' />
      </div>
    </Card>
  )
}

export default PieChartSkeleton
