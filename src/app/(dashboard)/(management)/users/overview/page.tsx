import PageContainer from '@/components/container/page-container'
import UsersChart from './_components/user-chart'
import UsersSummary from './_components/users-summary'

export default function UsersOverviewPage() {
  return (
    <PageContainer>
      <div className='grid grid-cols-7 gap-4'>
        <UsersChart className='order-2 col-span-7 lg:order-1 lg:col-span-5' />
        <UsersSummary className='order-1 col-span-7 lg:order-2 lg:col-span-2' />
      </div>
    </PageContainer>
  )
}
