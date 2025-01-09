'use client'

import { useEffect, useState } from 'react'

import { fetchAllUser } from '@/lib/api/services'
import { IUserJson } from '@/lib/types/json'
import { MonthType } from '@/lib/types/types'
import DataChart, { ChartDataType } from '@/components/chart/data-chart'

type UsersChartProps = {
  className?: string
}

const UsersChart = ({ className }: UsersChartProps) => {
  const [userChartData, setUserChartData] = useState<ChartDataType[]>([])

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

  const getUsersChartData = async () => {
    const users: IUserJson[] = await fetchAllUser()

    const chartDataMap = new Map<string, number[]>()

    users.forEach((user) => {
      const date = new Date(user.createdAt)
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

    setUserChartData(chartData)
  }

  useEffect(() => {
    getUsersChartData()
  }, [])

  return (
    <DataChart
      title='User Growth'
      label='Total'
      chartData={userChartData}
      className={className}
    />
  )
}

export default UsersChart
