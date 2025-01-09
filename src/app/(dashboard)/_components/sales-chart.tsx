'use client'

import { useEffect, useState } from 'react'

import { fetchAllOrder } from '@/lib/api/services'
import { IOrderJson } from '@/lib/types/json'
import { MonthType } from '@/lib/types/types'
import DataChart, { ChartDataType } from '@/components/chart/data-chart'

type SalesChartProps = {
  className?: string
}

const SalesChart = ({ className }: SalesChartProps) => {
  const [sales, setSales] = useState<ChartDataType>({})
  const [existYears, setExistYears] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(0)

  const getSales = async () => {
    const res: IOrderJson[] = await fetchAllOrder()

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

    const salesByYear: ChartDataType = {}
    const years: number[] = []

    res
      .filter(
        (item) => item.status === 'completed' || item.status === 'shipped'
      )
      .forEach((item) => {
        // Find date, year and month of an order
        const date = new Date(item.createdAt)
        const year = date.getFullYear()
        const month = date.toLocaleDateString('en-US', {
          month: 'long'
        }) as MonthType

        // Add non-duplicate year of compteled order
        if (!years.includes(year)) years.push(year)

        // Initialize salesByYear data
        if (!salesByYear[year])
          salesByYear[year] = months.map((month) => ({ month, amount: 0 }))

        const existingMonthData = salesByYear[year].find(
          (data) => data.month === month
        )

        if (existingMonthData) {
          existingMonthData.amount += item.totalPrice
        } else {
          salesByYear[year].push({ month, amount: item.totalPrice })
        }
      })

    setExistYears(years)
    setSelectedYear(years[years.length - 1])
    setSales(salesByYear)
  }

  useEffect(() => {
    getSales()
  }, [])

  return (
    <DataChart
      title='Sales Growth'
      label='Amount'
      chart={{ data: sales, existYears, selectedYear }}
      className={className}
    />
  )
}

export default SalesChart
