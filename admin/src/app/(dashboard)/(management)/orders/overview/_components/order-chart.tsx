'use client'

import { useEffect, useState } from 'react'

import { fetchAllOrder } from '@/lib/api/services'
import { IOrderJson } from '@/lib/types/json'
import { months } from '@/lib/contants/chart'
import DataChart, { ChartDataType } from '@/components/chart/data-chart'

type OrderChartProps = {
  className?: string
}

const OrderChart = ({ className }: OrderChartProps) => {
  const [orderChartData, setOrderChartData] = useState<ChartDataType[]>([])

  const getOrderChartData = async () => {
    const orders: IOrderJson[] = await fetchAllOrder()

    const chartDataMap = new Map<string, number[]>()

    orders.forEach((order) => {
      const date = new Date(order.createdAt)
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

    setOrderChartData(chartData)
  }

  useEffect(() => {
    getOrderChartData()
  }, [])

  return (
    <DataChart
      title='Order Growth'
      label='Total'
      chartData={orderChartData}
      className={className}
    />
  )
}

export default OrderChart
