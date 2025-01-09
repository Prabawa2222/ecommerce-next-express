'use client'

import { useEffect, useState } from 'react'

import { fetchAllOrder } from '@/lib/api/services'
import { IOrderJson } from '@/lib/types/json'
import { months } from '@/lib/contants/chart'
import DataChart, { ChartDataType } from '@/components/chart/data-chart'

type SalesChartProps = {
  className?: string
}

const SalesChart = ({ className }: SalesChartProps) => {
  const [salesChartData, setSalesChartData] = useState<ChartDataType[]>([])

  const getSalesChartData = async () => {
    const orders: IOrderJson[] = await fetchAllOrder()

    const chartDataMap = new Map<string, number[]>()

    orders.forEach((order) => {
      const date = new Date(order.createdAt)
      const year = date.getFullYear().toString()
      const month = date.getMonth()

      if (!chartDataMap.has(year)) {
        chartDataMap.set(year, Array(12).fill(0))
      }

      chartDataMap.get(year)![month] += order.totalPrice // increment the total price for the month
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

    setSalesChartData(chartData)
  }

  useEffect(() => {
    getSalesChartData()
  }, [])

  return (
    <DataChart
      title='Sales Growth'
      label='Amount'
      chartData={salesChartData}
      className={className}
    />
  )
}

export default SalesChart
