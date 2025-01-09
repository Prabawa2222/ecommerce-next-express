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
  const [products, setProducts] = useState<ChartDataType>({})
  const [existYears, setExistYears] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(0)

  const getProducts = async () => {
    const res: IProductJson[] = await fetchAllProduct()

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

    const productsByYear: ChartDataType = {}
    const years: number[] = []

    res.forEach((item) => {
      // Find date, year and month of a product
      const date = new Date(item.createdAt)
      const year = date.getFullYear()
      const month = date.toLocaleDateString('en-US', {
        month: 'long'
      }) as MonthType

      // Add non-duplicate year
      if (!years.includes(year)) years.push(year)

      // Initialize productsByYear data
      if (!productsByYear[year])
        productsByYear[year] = months.map((month) => ({ month, amount: 0 }))

      const existingMonthData = productsByYear[year].find(
        (data) => data.month === month
      )

      if (existingMonthData) {
        existingMonthData.amount += 1
      } else {
        productsByYear[year].push({ month, amount: 1 })
      }
    })

    setExistYears(years)
    setSelectedYear(years[years.length - 1])
    setProducts(productsByYear)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <DataChart
      title='Product Growth'
      label='Total'
      chart={{ data: products, existYears, selectedYear }}
      className={className}
    />
  )
}

export default ProductsChart
