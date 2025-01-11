'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchAllProduct } from '@/lib/api/product'
import { months } from '@/lib/contants/chart'
import DataChart, { ChartDataType } from '@/components/chart/data-chart'

type ProductsChartProps = {
  className?: string
}

const ProductsChart = ({ className }: ProductsChartProps) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProduct
  })
  const [productChartData, setProductChartData] = useState<ChartDataType[]>([])

  const getProductChartData = () => {
    const chartDataMap = new Map<string, number[]>()

    products?.forEach((product) => {
      const date = new Date(product.createdAt)
      const year = date.getFullYear().toString()
      const month = date.getMonth()

      if (!chartDataMap.has(year)) {
        chartDataMap.set(year, Array(12).fill(0))
      }

      chartDataMap.get(year)![month] += 1 // increment the count for the month
    })

    const chartData: ChartDataType[] = Array.from(chartDataMap.entries()).map(
      ([year, amounts]) => ({
        year,
        values: amounts.map((amount, index) => ({
          month: months[index],
          amount
        }))
      })
    )

    setProductChartData(chartData)
  }

  useEffect(() => {
    getProductChartData()
  }, [products])

  return (
    <DataChart
      title='Product Growth'
      label='Total'
      chartData={productChartData}
      isLoading={isLoading}
      className={className}
    />
  )
}

export default ProductsChart
