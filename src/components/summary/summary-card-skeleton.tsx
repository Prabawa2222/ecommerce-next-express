import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const SummaryCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex w-full items-center justify-between'>
          <Skeleton className='h-5 w-1/3' />
          <Skeleton className='h-5 w-5' />
        </div>
        <CardDescription>
          <Skeleton className='h-8 w-1/3' />
        </CardDescription>
        <CardDescription>
          <Skeleton className='h-4 w-1/2' />
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default SummaryCardSkeleton
