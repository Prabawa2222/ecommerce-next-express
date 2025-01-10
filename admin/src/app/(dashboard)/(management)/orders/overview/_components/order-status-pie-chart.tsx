'use client'

import { useEffect, useState } from 'react'

import { fetchAllOrder } from '@/lib/api/services'
import { IOrderJson } from '@/lib/types/json'
import DataPieChart, { IChartData } from '@/components/chart/pie-chart'

type OrderPieChartProps = {
  className?: string
}

const OrderStatusPieChart = ({ className }: OrderPieChartProps) => {
  const [orderChartData, setOrderChartData] = useState<IChartData[]>([])

  const getOrderChartData = async () => {
    const orders: IOrderJson[] = await fetchAllOrder()

    const orderAmountMap: Record<string, number> = {}

    orders.forEach((order) => {
      if (order) {
        orderAmountMap[order.status] = (orderAmountMap[order.status] || 0) + 1
      }
    })

    const chartData: IChartData[] = Object.entries(orderAmountMap).map(
      ([status, amount]) => ({
        label: status,
        amount
      })
    )

    setOrderChartData(chartData)
  }

  useEffect(() => {
    getOrderChartData()
  }, [])

  return (
    <DataPieChart
      title='Order Status'
      nameKey='status'
      chartData={orderChartData}
      className={className}
    />
  )
}

export default OrderStatusPieChart
