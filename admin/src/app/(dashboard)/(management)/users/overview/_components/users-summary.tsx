'use client'

import { useEffect, useState } from 'react'
import { UsersRound } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { fetchAllUser } from '@/lib/api/user'
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

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUser
  })

  const getUsers = () => {
    // Find current month and last month data
    if (users && users.length > 0) {
      const currentMonthUsers = filterDataByMonth(users, 'currentMonth')
      const lastMonthUsers = filterDataByMonth(users, 'lastMonth')

      if (lastMonthUsers.length === 0) {
        return {
          total: users.length || 0,
          growth: currentMonthUsers.length > 0 ? 100 : 0
        }
      }

      const userData = {
        total: users.length || 0,
        growth: Math.round(
          ((currentMonthUsers.length - lastMonthUsers.length) /
            lastMonthUsers.length) *
            100
        )
      }
      setSummary({
        user: userData
      })
    }
  }

  useEffect(() => {
    getUsers()
  }, [users])

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
        isLoading={isLoading}
      />
    </Summary>
  )
}

export default UsersSummary
