import PageContainer from '@/components/container/page-container'
import OrderChart from './_components/order-chart'
import OrderStatusPieChart from './_components/order-status-pie-chart'
import PaymentStatusPieChart from './_components/payment-status-pie-chart'

const OrdersOverviewPage = () => {
  return (
    <PageContainer>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <OrderStatusPieChart />
        <PaymentStatusPieChart />
      </div>
      <div className='grid grid-cols-7 gap-4'>
        <OrderChart className='order-2 col-span-7 lg:order-1 lg:col-span-5' />
      </div>
    </PageContainer>
  )
}

export default OrdersOverviewPage
