import PageContainer from '@/components/container/page-container'
import OrderChart from './_components/order-chart'

const OrdersOverviewPage = () => {
  return (
    <PageContainer>
      <div className='grid grid-cols-7 gap-4'>
        <OrderChart className='order-2 col-span-7 lg:order-1 lg:col-span-5' />
        {/* <CategoryPieChart className='order-1 col-span-7 lg:order-2 lg:col-span-2' /> */}
      </div>
    </PageContainer>
  )
}

export default OrdersOverviewPage
