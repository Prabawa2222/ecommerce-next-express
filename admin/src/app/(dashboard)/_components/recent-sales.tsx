import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RecentSaleList from './recent-sale-list'

type RecentSalesProps = {
  className?: string
}

const RecentSales = ({ className }: RecentSalesProps) => {
  return (
    <Card className={cn('p-4 md:p-6', className)}>
      <CardHeader className='mb-4 p-0'>
        <CardTitle className='text-sm font-semibold'>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <RecentSaleList />
      </CardContent>
    </Card>
  )
}

export default RecentSales
