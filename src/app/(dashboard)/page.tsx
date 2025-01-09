import PageContainer from '@/components/container/page-container'
import DashboardSummary from './_components/dashboard-summary'
import SalesChart from './_components/sales-chart'
import RecentSales from './_components/recent-sales'

export default function Home() {
  return (
    <PageContainer>
      <DashboardSummary />
      <div className='flex flex-col gap-4 xl:grid xl:grid-cols-5'>
        <SalesChart className='col-span-3' />
        <RecentSales className='col-span-2' />
      </div>
    </PageContainer>
  )
}
