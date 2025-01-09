'use client'

import { useEffect, useState } from 'react'

import {
  fetchAllCategory,
  fetchAllOrder,
  fetchAllProduct
} from '@/lib/api/services'
import { ICategoryJson, IOrderJson, IProductJson } from '@/lib/types/json'
import { MonthType } from '@/lib/types/types'
import MultipleDataChart, {
  ChartDataType
} from '@/components/chart/multiple-data-chart'

type CategoryChartProps = {
  className?: string
}

const CategoryChart = ({ className }: CategoryChartProps) => {
  const [categoryChartData, setCategoryChartData] = useState<ChartDataType>([])

  // const chartData: ChartDataType = [
  //   {
  //     category: 't-shirt',
  //     data: [
  //       {
  //         year: '2023',
  //         values: [
  //           {
  //             month: 'January',
  //             amount: 0
  //           },
  //           {
  //             month: 'February',
  //             amount: 0
  //           },
  //           {
  //             month: 'March',
  //             amount: 0
  //           },
  //           {
  //             month: 'April',
  //             amount: 0
  //           },
  //           {
  //             month: 'May',
  //             amount: 0
  //           },
  //           {
  //             month: 'June',
  //             amount: 0
  //           },
  //           {
  //             month: 'July',
  //             amount: 0
  //           },
  //           {
  //             month: 'August',
  //             amount: 0
  //           },
  //           {
  //             month: 'September',
  //             amount: 0
  //           },
  //           {
  //             month: 'October',
  //             amount: 0
  //           },
  //           {
  //             month: 'November',
  //             amount: 10
  //           },
  //           {
  //             month: 'December',
  //             amount: 12
  //           }
  //         ]
  //       },
  //       {
  //         year: '2024',
  //         values: [
  //           {
  //             month: 'January',
  //             amount: 0
  //           },
  //           {
  //             month: 'February',
  //             amount: 0
  //           },
  //           {
  //             month: 'March',
  //             amount: 0
  //           },
  //           {
  //             month: 'April',
  //             amount: 0
  //           },
  //           {
  //             month: 'May',
  //             amount: 0
  //           },
  //           {
  //             month: 'June',
  //             amount: 0
  //           },
  //           {
  //             month: 'July',
  //             amount: 0
  //           },
  //           {
  //             month: 'August',
  //             amount: 0
  //           },
  //           {
  //             month: 'September',
  //             amount: 0
  //           },
  //           {
  //             month: 'October',
  //             amount: 0
  //           },
  //           {
  //             month: 'November',
  //             amount: 20
  //           },
  //           {
  //             month: 'December',
  //             amount: 11
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     category: 'pant',
  //     data: [
  //       {
  //         year: '2023',
  //         values: [
  //           {
  //             month: 'January',
  //             amount: 0
  //           },
  //           {
  //             month: 'February',
  //             amount: 0
  //           },
  //           {
  //             month: 'March',
  //             amount: 0
  //           },
  //           {
  //             month: 'April',
  //             amount: 0
  //           },
  //           {
  //             month: 'May',
  //             amount: 0
  //           },
  //           {
  //             month: 'June',
  //             amount: 0
  //           },
  //           {
  //             month: 'July',
  //             amount: 0
  //           },
  //           {
  //             month: 'August',
  //             amount: 0
  //           },
  //           {
  //             month: 'September',
  //             amount: 0
  //           },
  //           {
  //             month: 'October',
  //             amount: 0
  //           },
  //           {
  //             month: 'November',
  //             amount: 8
  //           },
  //           {
  //             month: 'December',
  //             amount: 4
  //           }
  //         ]
  //       },
  //       {
  //         year: '2024',
  //         values: [
  //           {
  //             month: 'January',
  //             amount: 0
  //           },
  //           {
  //             month: 'February',
  //             amount: 0
  //           },
  //           {
  //             month: 'March',
  //             amount: 0
  //           },
  //           {
  //             month: 'April',
  //             amount: 0
  //           },
  //           {
  //             month: 'May',
  //             amount: 0
  //           },
  //           {
  //             month: 'June',
  //             amount: 0
  //           },
  //           {
  //             month: 'July',
  //             amount: 0
  //           },
  //           {
  //             month: 'August',
  //             amount: 0
  //           },
  //           {
  //             month: 'September',
  //             amount: 0
  //           },
  //           {
  //             month: 'October',
  //             amount: 0
  //           },
  //           {
  //             month: 'November',
  //             amount: 11
  //           },
  //           {
  //             month: 'December',
  //             amount: 12
  //           }
  //         ]
  //       },
  //       {
  //         year: '2025',
  //         values: [
  //           {
  //             month: 'January',
  //             amount: 7
  //           },
  //           {
  //             month: 'February',
  //             amount: 0
  //           },
  //           {
  //             month: 'March',
  //             amount: 0
  //           },
  //           {
  //             month: 'April',
  //             amount: 0
  //           },
  //           {
  //             month: 'May',
  //             amount: 0
  //           },
  //           {
  //             month: 'June',
  //             amount: 0
  //           },
  //           {
  //             month: 'July',
  //             amount: 0
  //           },
  //           {
  //             month: 'August',
  //             amount: 0
  //           },
  //           {
  //             month: 'September',
  //             amount: 0
  //           },
  //           {
  //             month: 'October',
  //             amount: 0
  //           },
  //           {
  //             month: 'November',
  //             amount: 0
  //           },
  //           {
  //             month: 'December',
  //             amount: 0
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]

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

  const getCategoryChartData = async () => {
    const orders: IOrderJson[] = await fetchAllOrder()
    const products: IProductJson[] = await fetchAllProduct()
    const categories: ICategoryJson[] = await fetchAllCategory()

    const initialCategoryChartData = orders
      .filter(
        (order) => order.status === 'completed' || order.status === 'shipped'
      )
      .map((order) => {
        const product = products.find(
          (product) => product.id === order.productId
        )
        const category = categories.find(
          (category) => category.id === product?.categoryId
        )

        if (category) {
          return {
            category: category?.title,
            createdAt: order.createdAt
          }
        }
      })
      .filter(Boolean) as { category: string; createdAt: string }[] // Remove undefined value

    // Group data by category and year, initializing all months
    const chartDataMap = new Map<string, Map<string, number[]>>()

    initialCategoryChartData.forEach(({ category, createdAt }) => {
      const date = new Date(createdAt)
      const year = date.getFullYear().toString()
      const month = date.getMonth()

      if (!chartDataMap.has(category)) {
        chartDataMap.set(category, new Map())
      }

      const yearData = chartDataMap.get(category)!

      if (!yearData.has(year)) {
        yearData.set(year, Array(12).fill(0))
      }

      yearData.get(year)![month] += 1
    })

    const chartData: ChartDataType = Array.from(chartDataMap.entries()).map(
      ([category, yearMap]) => ({
        category,
        data: Array.from(yearMap.entries()).map(([year, amounts]) => ({
          year,
          values: amounts.map((amount, index) => ({
            month: months[index],
            amount
          }))
        }))
      })
    )

    setCategoryChartData(chartData)
  }

  useEffect(() => {
    getCategoryChartData()
  }, [])

  return (
    <MultipleDataChart
      title='Purchased Category'
      label='total'
      chartData={categoryChartData}
      className={className}
    />
  )
}

export default CategoryChart
