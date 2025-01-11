'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchAllOrder } from '@/lib/api/order'
import { fetchAllProduct } from '@/lib/api/product'
import { fetchAllCategory } from '@/lib/api/category'
import DataPieChart, { IChartData } from '@/components/chart/pie-chart'

type CategoryPieChartProps = {
  className?: string
}

const CategoryPieChart = ({ className }: CategoryPieChartProps) => {
  const { data: orders, isLoading: ordersIsLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchAllOrder
  })
  const { data: products, isLoading: productsIsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProduct
  })
  const { data: categories, isLoading: categoriesIsLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategory
  })
  const [categoryChartData, setCategoryChartData] = useState<IChartData[]>([])

  const getCategoryChartData = () => {
    const categoryAmountMap: Record<string, number> = {}

    orders
      ?.filter(
        (order) => order.status === 'completed' || order.status === 'shipped'
      )
      .forEach((order) => {
        const product = products?.find(
          (product) => product.id === order.productId
        )
        const category = categories?.find(
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
  }, [orders, products, categories])

  return (
    <DataPieChart
      title='Total Purchases'
      nameKey='category'
      chartData={categoryChartData}
      isLoading={ordersIsLoading || productsIsLoading || categoriesIsLoading}
      className={className}
    />
  )
}

export default CategoryPieChart
