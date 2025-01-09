'use client'

import { useEffect, useState } from 'react'
import { UsersRound } from 'lucide-react'

import { fetchAllUser } from '@/lib/api/services'
import { IUserJson } from '@/lib/types/json'
import { cn, filterDataByMonth } from '@/lib/utils'
import Summary from '@/components/summary/summary'
import SummaryCard from '@/components/summary/summary-card'
import { useSidebar } from '@/components/ui/sidebar'

type SummaryType = {
  total: number
  growth: number | null
}

interface ISummary {
  user: SummaryType
}

type UsersSummaryProps = {
  className?: string
}

const UsersSummary = ({ className }: UsersSummaryProps) => {
  const { open } = useSidebar()

  const [summary, setSummary] = useState<ISummary>({
    user: {
      total: 0,
      growth: null
    }
  })

  const getUsers = async () => {
    const res: IUserJson[] = await fetchAllUser()

    // Find current month and last month data
    const currentMonthUsers = filterDataByMonth(res, 'currentMonth')
    const lastMonthUsers = filterDataByMonth(res, 'lastMonth')

    if (lastMonthUsers.length === 0) {
      return {
        total: res.length || 0,
        growth: currentMonthUsers.length > 0 ? 100 : 0
      }
    }

    return {
      total: res.length || 0,
      growth: Math.round(
        ((currentMonthUsers.length - lastMonthUsers.length) /
          lastMonthUsers.length) *
          100
      )
    }
  }

  const getSummaryData = async () => {
    try {
      const user: SummaryType = await getUsers()
      setSummary({
        user
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSummaryData()
  }, [])

  return (
    <Summary
      className={cn(
        'grid gap-4 sm:grid-cols-2 lg:grid-cols-1',
        {
          'md:grid-cols-3 lg:grid-cols-1': !open
        },
        className
      )}
    >
      <SummaryCard
        title='Total Users'
        description={summary.user.total.toString()}
        growth={{ amount: summary.user.growth || 0, format: 'percentage' }}
        icon={UsersRound}
      />
    </Summary>
  )
}

export default UsersSummary
