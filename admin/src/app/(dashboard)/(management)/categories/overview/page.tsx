import PageContainer from '@/components/container/page-container'
import CategoryChart from './_components/category-chart'

const CategoriesOverview = () => {
  return (
    <PageContainer>
      <div className='grid grid-cols-7 gap-4'>
        <CategoryChart className='order-2 col-span-7 lg:order-1 lg:col-span-5' />
        {/* <ProductsSummary className='order-1 col-span-7 lg:order-2 lg:col-span-2' /> */}
      </div>
    </PageContainer>
  )
}

export default CategoriesOverview
