'use client'

import { useEffect, useState } from 'react'

import { fetchAllProduct } from '@/lib/api/services'
import { IProductJson } from '@/lib/types/json'
import { MonthType } from '@/lib/types/types'
import DataChart, { ChartDataType } from '@/components/chart/data-chart'

type ProductsChartProps = {
  className?: string
}

const ProductsChart = ({ className }: ProductsChartProps) => {
  const [productChartData, setProductChartData] = useState<ChartDataType[]>([])

  const months: MonthType[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const getProductChartData = async () => {
    const products: IProductJson[] = await fetchAllProduct()

    const chartDataMap = new Map<string, number[]>()

    products.forEach((product) => {
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
  }, [])

  return (
    <DataChart
      title='Product Growth'
      label='Total'
      chartData={productChartData}
      className={className}
    />
  )
}

export default ProductsChart
