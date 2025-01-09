import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const RecentSaleItemSkeleton = () => {
  return (
    <div className='flex w-full flex-col justify-center gap-4 md:flex-row md:items-center'>
      <div className='flex w-full items-center justify-center gap-4'>
        <Skeleton className='h-10 w-10 rounded-full' />
        <div className='flex flex-1 flex-col gap-1'>
          <Skeleton className='h-4 w-1/4' />
          <Skeleton className='h-[14px] w-2/3' />
        </div>
      </div>
      <Skeleton className='h-7 w-1/3' />
      <Separator className='md:hidden' />
    </div>
  )
}

export default RecentSaleItemSkeleton
