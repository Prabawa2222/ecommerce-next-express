'use client'

import { useEffect, useState } from 'react'
import { Boxes, ShoppingCart, UsersRound } from 'lucide-react'

import {
  fetchAllOrder,
  fetchAllProduct,
  fetchAllUser
} from '@/lib/api/services'
import { IOrderJson, IProductJson, IUserJson } from '@/lib/types/json'
import { cn, filterDataByMonth, formatToRupiah } from '@/lib/utils'
import SummaryCard from '@/components/summary/summary-card'
import Summary from '@/components/summary/summary'
import { useSidebar } from '@/components/ui/sidebar'

type SummaryType = {
  total: number
  growth: number | null
}

interface ISummary {
  user: SummaryType
  product: SummaryType
  order: SummaryType
  sale: SummaryType
}

const DashboardSummary = () => {
  const { open } = useSidebar()

  const [summary, setSummary] = useState<ISummary>({
    user: {
      total: 0,
      growth: null
    },
    product: {
      total: 0,
      growth: null
    },
    order: {
      total: 0,
      growth: null
    },
    sale: {
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

  const getProducts = async () => {
    const res: IProductJson[] = await fetchAllProduct()

    // Find current month data
    const currentMonthProducts = filterDataByMonth(res, 'currentMonth')

    return {
      total: res.length || 0,
      growth: currentMonthProducts.length
    }
  }

  const getOrders = async () => {
    const res: IOrderJson[] = await fetchAllOrder()

    // Find current month and last month data
    const currentMonthOrders = filterDataByMonth(res, 'currentMonth')
    const lastMonthOrders = filterDataByMonth(res, 'lastMonth')

    if (lastMonthOrders.length === 0) {
      return {
        total: res.length || 0,
        growth: currentMonthOrders.length > 0 ? 100 : 0
      }
    }

    return {
      total: res.length || 0,
      growth: Math.round(
        ((currentMonthOrders.length - lastMonthOrders.length) /
          lastMonthOrders.length) *
          100
      )
    }
  }

  const getSales = async () => {
    const res: IOrderJson[] = await fetchAllOrder()

    // Find current month and last month data
    const currentMonthOrders = filterDataByMonth(res, 'currentMonth')
    const lastMonthOrders = filterDataByMonth(res, 'lastMonth')

    const totalSales = res
      .filter(
        (item) => item.status === 'completed' || item.status === 'shipped'
      )
      .reduce((total, item) => total + item.totalPrice, 0)

    const totalSalesCurrentMonth = currentMonthOrders
      .filter(
        (item) => item.status === 'completed' || item.status === 'shipped'
      )
      .reduce((total, item) => total + item.totalPrice, 0)

    const totalSalesLastMonth = lastMonthOrders
      .filter(
        (item) => item.status === 'completed' || item.status === 'shipped'
      )
      .reduce((total, item) => total + item.totalPrice, 0)

    if (lastMonthOrders.length === 0) {
      return {
        total: totalSales || 0,
        growth: totalSalesCurrentMonth > 0 ? 100 : 0
      }
    }

    return {
      total: totalSales || 0,
      growth: Math.round(
        ((totalSalesCurrentMonth - totalSalesLastMonth) / totalSalesLastMonth) *
          100
      )
    }
  }

  const getSummaryData = async () => {
    try {
      const [user, product, order, sale]: SummaryType[] = await Promise.all([
        getUsers(),
        getProducts(),
        getOrders(),
        getSales()
      ])

      setSummary({
        user,
        product,
        order,
        sale
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
      className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', {
        'md:grid-cols-3 lg:grid-cols-4': !open
      })}
    >
      <SummaryCard
        title='Total Sales'
        description={formatToRupiah(summary.sale.total)}
        growth={{ amount: summary.sale.growth || 0, format: 'percentage' }}
        icon={UsersRound}
      />
      <SummaryCard
        title='Total Users'
        description={summary.user.total.toString()}
        growth={{ amount: summary.user.growth || 0, format: 'percentage' }}
        icon={UsersRound}
      />
      <SummaryCard
        title='Total Products'
        description={summary.product.total.toString()}
        growth={{ amount: summary.product.growth || 0, format: 'count' }}
        icon={Boxes}
      />
      <SummaryCard
        title='Total Orders'
        description={summary.order.total.toString()}
        growth={{ amount: summary.order.growth || 0, format: 'percentage' }}
        icon={ShoppingCart}
      />
    </Summary>
  )
}

export default DashboardSummary
