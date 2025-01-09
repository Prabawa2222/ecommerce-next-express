import PageContainer from '@/components/container/page-container'
import ProductsChart from './_components/product-chart'
import ProductsSummary from './_components/products-summary'

const ProductsOverview = () => {
  return (
    <PageContainer>
      <div className='grid grid-cols-7 gap-4'>
        <ProductsChart className='order-2 col-span-7 lg:order-1 lg:col-span-5' />
        <ProductsSummary className='order-1 col-span-7 lg:order-2 lg:col-span-2' />
      </div>
    </PageContainer>
  )
}

export default ProductsOverview
