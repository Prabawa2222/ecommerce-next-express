'use client'

import { useEffect, useState } from 'react'

import { fetchAllPayment } from '@/lib/api/services'
import { IPaymentJson } from '@/lib/types/json'
import { sortChartDataByCustomOrder } from '@/lib/utils'
import DataPieChart, { IChartData } from '@/components/chart/pie-chart'

type PaymentStatusPieChartProps = {
  className?: string
}

const PaymentStatusPieChart = ({ className }: PaymentStatusPieChartProps) => {
  const [paymentChartData, setPaymentChartData] = useState<IChartData[]>([])

  const getPieChartData = async () => {
    const payments: IPaymentJson[] = await fetchAllPayment()

    const paymentAmountMap: Record<string, number> = {}

    payments.forEach((payment) => {
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
  }, [])

  return (
    <DataPieChart
      title='Payment Status'
      nameKey='status'
      chartData={paymentChartData}
      className={className}
    />
  )
}

export default PaymentStatusPieChart
