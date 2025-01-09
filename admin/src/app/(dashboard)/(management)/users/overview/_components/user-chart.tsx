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
  const [users, setUsers] = useState<ChartDataType>({})
  const [existYears, setExistYears] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(0)

  const getUsers = async () => {
    const res: IUserJson[] = await fetchAllUser()

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

    const usersByYear: ChartDataType = {}
    const years: number[] = []

    res.forEach((item) => {
      // Find date, year and month of a user
      const date = new Date(item.createdAt)
      const year = date.getFullYear()
      const month = date.toLocaleDateString('en-US', {
        month: 'long'
      }) as MonthType

      // Add non-duplicate year
      if (!years.includes(year)) years.push(year)

      // Initialize usersByYear data
      if (!usersByYear[year])
        usersByYear[year] = months.map((month) => ({ month, amount: 0 }))

      const existingMonthData = usersByYear[year].find(
        (data) => data.month === month
      )

      if (existingMonthData) {
        existingMonthData.amount += 1
      } else {
        usersByYear[year].push({ month, amount: 1 })
      }
    })

    setExistYears(years)
    setSelectedYear(years[years.length - 1])
    setUsers(usersByYear)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <DataChart
      title='User Growth'
      label='Total'
      chart={{ data: users, existYears, selectedYear }}
      className={className}
    />
  )
}

export default UsersChart
