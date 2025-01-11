'use client'

import { useEffect, useState } from 'react'
import { Boxes, ShoppingCart, UsersRound } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { fetchAllUser } from '@/lib/api/user'
import { fetchAllProduct } from '@/lib/api/product'
import { fetchAllOrder } from '@/lib/api/order'
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
  sales: SummaryType
}

const DashboardSummary = () => {
  const { open } = useSidebar()

  const { data: users, isLoading: usersIsLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUser
  })
  const { data: products, isLoading: productsIsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProduct
  })
  const { data: orders, isLoading: ordersIsLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchAllOrder
  })

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
    sales: {
      total: 0,
      growth: null
    }
  })

  const getUsers = () => {
    if (users && users.length > 0) {
      // Find current month and last month data
      const currentMonthUsers = filterDataByMonth(users, 'currentMonth')
      const lastMonthUsers = filterDataByMonth(users, 'lastMonth')

      if (lastMonthUsers.length === 0) {
        return {
          total: users?.length || 0,
          growth: currentMonthUsers.length > 0 ? 100 : 0
        }
      }

      const userData = {
        total: users?.length || 0,
        growth: Math.round(
          ((currentMonthUsers.length - lastMonthUsers.length) /
            lastMonthUsers.length) *
            100
        )
      }

      setSummary((prev) => ({
        ...prev,
        user: userData
      }))
    }
  }

  const getProducts = () => {
    if (products && products.length > 0) {
      // Find current month data
      const currentMonthProducts = filterDataByMonth(products, 'currentMonth')

      const productData = {
        total: products?.length || 0,
        growth: currentMonthProducts.length
      }

      setSummary((prev) => ({
        ...prev,
        product: productData
      }))
    }
  }

  const getOrders = () => {
    if (orders && orders.length > 0) {
      // Find current month and last month data
      const currentMonthOrders = filterDataByMonth(orders, 'currentMonth')
      const lastMonthOrders = filterDataByMonth(orders, 'lastMonth')

      if (lastMonthOrders.length === 0) {
        return {
          total: orders.length || 0,
          growth: currentMonthOrders.length > 0 ? 100 : 0
        }
      }

      const orderData = {
        total: orders.length || 0,
        growth: Math.round(
          ((currentMonthOrders.length - lastMonthOrders.length) /
            lastMonthOrders.length) *
            100
        )
      }

      setSummary((prev) => ({
        ...prev,
        order: orderData
      }))
    }
  }

  const getSales = () => {
    if (orders && orders.length > 0) {
      // Find current month and last month data
      const currentMonthOrders = filterDataByMonth(orders, 'currentMonth')
      const lastMonthOrders = filterDataByMonth(orders, 'lastMonth')

      const totalSales = orders
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

      const salesData = {
        total: totalSales || 0,
        growth: Math.round(
          ((totalSalesCurrentMonth - totalSalesLastMonth) /
            totalSalesLastMonth) *
            100
        )
      }
      setSummary((prev) => ({
        ...prev,
        sales: salesData
      }))
    }
  }

  const getSummaryData = async () => {
    try {
      getUsers()
      getProducts()
      getOrders()
      getSales()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSummaryData()
  }, [users, orders, products])

  return (
    <Summary
      className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', {
        'md:grid-cols-3 lg:grid-cols-4': !open
      })}
    >
      <SummaryCard
        title='Total Revenue'
        description={formatToRupiah(summary.sales.total)}
        growth={{ amount: summary.sales.growth || 0, format: 'percentage' }}
        icon={UsersRound}
        isLoading={ordersIsLoading}
      />
      <SummaryCard
        title='Total Users'
        description={summary.user.total.toString()}
        growth={{ amount: summary.user.growth || 0, format: 'percentage' }}
        icon={UsersRound}
        isLoading={usersIsLoading}
      />
      <SummaryCard
        title='Total Products'
        description={summary.product.total.toString()}
        growth={{ amount: summary.product.growth || 0, format: 'count' }}
        icon={Boxes}
        isLoading={productsIsLoading}
      />
      <SummaryCard
        title='Total Orders'
        description={summary.order.total.toString()}
        growth={{ amount: summary.order.growth || 0, format: 'percentage' }}
        icon={ShoppingCart}
        isLoading={ordersIsLoading}
      />
    </Summary>
  )
}

export default DashboardSummary
