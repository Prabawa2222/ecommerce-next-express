'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchAllPayment } from '@/lib/api/order'
import { sortChartDataByCustomOrder } from '@/lib/utils'
import DataPieChart, { IChartData } from '@/components/chart/pie-chart'

type PaymentStatusPieChartProps = {
  className?: string
}

const PaymentStatusPieChart = ({ className }: PaymentStatusPieChartProps) => {
  const { data: payments, isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: fetchAllPayment
  })
  const [paymentChartData, setPaymentChartData] = useState<IChartData[]>([])

  const getPieChartData = () => {
    const paymentAmountMap: Record<string, number> = {}

    payments?.forEach((payment) => {
      if (payment) {
        paymentAmountMap[payment.status] =
          (paymentAmountMap[payment.status] || 0) + 1
      }
    })

    const chartData: IChartData[] = Object.entries(paymentAmountMap).map(
      ([status, amount]) => ({
        label: status,
        amount
      })
    )

    const sortedChartData = sortChartDataByCustomOrder(chartData, [
      'pending',
      'failed',
      'paid'
    ])

    setPaymentChartData(sortedChartData)
  }

  useEffect(() => {
    getPieChartData()
  }, [payments])

  return (
    <DataPieChart
      title='Payment Status'
      nameKey='status'
      chartData={paymentChartData}
      isLoading={isLoading}
      className={className}
    />
  )
}

export default PaymentStatusPieChart
