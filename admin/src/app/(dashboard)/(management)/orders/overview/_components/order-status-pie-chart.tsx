'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchAllOrder } from '@/lib/api/order'
import { sortChartDataByCustomOrder } from '@/lib/utils'
import DataPieChart, { IChartData } from '@/components/chart/pie-chart'

type OrderPieChartProps = {
  className?: string
}

const OrderStatusPieChart = ({ className }: OrderPieChartProps) => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchAllOrder
  })
  const [orderChartData, setOrderChartData] = useState<IChartData[]>([])

  const getOrderChartData = () => {
    const orderAmountMap: Record<string, number> = {}

    orders?.forEach((order) => {
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

    const sortedChartData = sortChartDataByCustomOrder(chartData, [
      'pending',
      'shipped',
      'completed'
    ])

    setOrderChartData(sortedChartData)
  }

  useEffect(() => {
    getOrderChartData()
  }, [orders])

  return (
    <DataPieChart
      title='Order Status'
      nameKey='status'
      chartData={orderChartData}
      isLoading={isLoading}
      className={className}
    />
  )
}

export default OrderStatusPieChart
