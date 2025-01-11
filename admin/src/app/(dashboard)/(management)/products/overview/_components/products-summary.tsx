'use client'

import { useEffect, useState } from 'react'
import { Boxes } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { fetchAllProduct } from '@/lib/api/product'
import { cn, filterDataByMonth } from '@/lib/utils'
import Summary from '@/components/summary/summary'
import SummaryCard from '@/components/summary/summary-card'
import { useSidebar } from '@/components/ui/sidebar'

type SummaryType = {
  total: number
  growth: number | null
}

interface ISummary {
  product: SummaryType
}

type UsersSummaryProps = {
  className?: string
}

const ProductsSummary = ({ className }: UsersSummaryProps) => {
  const { open } = useSidebar()
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProduct
  })
  const [summary, setSummary] = useState<ISummary>({
    product: {
      total: 0,
      growth: null
    }
  })

  const getProducts = () => {
    if (products && products.length > 0) {
      // Find current month data
      const currentMonthProducts = filterDataByMonth(products, 'currentMonth')

      const productData = {
        total: products.length || 0,
        growth: currentMonthProducts.length
      }
      setSummary((prev) => ({
        ...prev,
        product: productData
      }))
    }
  }

  useEffect(() => {
    getProducts()
  }, [products])

  return (
    <Summary
      className={cn(
        'grid gap-4 sm:grid-cols-2 lg:grid-cols-1',
        {
          'md:grid-cols-3 lg:grid-cols-1': !open
        },
        className
      )}
    >
      <SummaryCard
        title='Total Products'
        description={summary.product.total.toString()}
        growth={{ amount: summary.product.growth || 0, format: 'count' }}
        icon={Boxes}
        isLoading={isLoading}
      />
    </Summary>
  )
}

export default ProductsSummary
