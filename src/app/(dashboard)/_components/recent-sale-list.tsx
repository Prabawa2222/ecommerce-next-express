'use client'

import { useEffect, useState } from 'react'

import { fetchFilteredData, fetchSingleData } from '@/lib/api/services'
import { IOrderJson, IUserJson } from '@/lib/types/json'
import RecentSaleItem from './recent-sale-item'
import RecentSaleItemSkeleton from './loading/recent-sale-item-skeleton'

interface IRecentSales {
  user: {
    image: string
    name: string
    email: string
  }
  amount: number
}

const RecentSaleList = () => {
  const [recentSales, setRecentSales] = useState<IRecentSales[]>([])

  const getRecentSales = async () => {
    try {
      const orders: IOrderJson[] = await fetchFilteredData('orders', {
        sort: 'createdAt',
        order: 'desc',
        limit: 5
      })

      const recentSalesData: IRecentSales[] = await Promise.all(
        orders.map(async (order) => {
          const res: IUserJson[] = await fetchSingleData('users', order.userId)

          return {
            user: {
              image: res[0].image,
              name: res[0].name,
              email: res[0].email
            },
            amount: order.totalPrice
          }
        })
      )

      setRecentSales(recentSalesData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRecentSales()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      {recentSales.length > 0 ? (
        recentSales.map((recentSale, index) => (
          <RecentSaleItem recentSale={recentSale} key={index} />
        ))
      ) : (
        <>
          <RecentSaleItemSkeleton />
          <RecentSaleItemSkeleton />
          <RecentSaleItemSkeleton />
          <RecentSaleItemSkeleton />
          <RecentSaleItemSkeleton />
        </>
      )}
    </div>
  )
}

export default RecentSaleList
