'use client'

import { useEffect, useState } from 'react'
import { Boxes } from 'lucide-react'

import { fetchAllProduct } from '@/lib/api/services'
import { IProductJson } from '@/lib/types/json'
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

  const [summary, setSummary] = useState<ISummary>({
    product: {
      total: 0,
      growth: null
    }
  })

  const getProducts = async () => {
    const res: IProductJson[] = await fetchAllProduct()

    // Find current month data
    const currentMonthProducts = filterDataByMonth(res, 'currentMonth')

    return {
      total: res.length || 0,
      growth: currentMonthProducts.length
    }
  }

  const getSummaryData = async () => {
    try {
      const product: SummaryType = await getProducts()
      setSummary({
        product
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSummaryData()
  }, [])

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
      />
    </Summary>
  )
}

export default ProductsSummary
