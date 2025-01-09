'use client'

import { useEffect, useState } from 'react'

import {
  fetchAllCategory,
  fetchAllOrder,
  fetchAllProduct
} from '@/lib/api/services'
import { ICategoryJson, IOrderJson, IProductJson } from '@/lib/types/json'
import DataPieChart, { IChartData } from '@/components/chart/pie-chart'

type CategoryPieChartProps = {
  className?: string
}

const CategoryPieChart = ({ className }: CategoryPieChartProps) => {
  const [categoryChartData, setCategoryChartData] = useState<IChartData[]>([])

  const getCategoryChartData = async () => {
    const orders: IOrderJson[] = await fetchAllOrder()
    const products: IProductJson[] = await fetchAllProduct()
    const categories: ICategoryJson[] = await fetchAllCategory()

    const categoryAmountMap: Record<string, number> = {}

    orders
      .filter(
        (order) => order.status === 'completed' || order.status === 'shipped'
      )
      .forEach((order) => {
        const product = products.find(
          (product) => product.id === order.productId
        )
        const category = categories.find(
          (category) => category.id === product?.categoryId
        )

        if (category) {
          categoryAmountMap[category.title] =
            (categoryAmountMap[category.title] || 0) + 1
        }
      })

    const chartData: IChartData[] = Object.entries(categoryAmountMap).map(
      ([category, amount]) => ({
        label: category,
        amount
      })
    )

    setCategoryChartData(chartData)
  }

  useEffect(() => {
    getCategoryChartData()
  }, [])

  return (
    <DataPieChart
      title='Total Purchases'
      nameKey='category'
      chartData={categoryChartData}
      className={className}
    />
  )
}

export default CategoryPieChart
