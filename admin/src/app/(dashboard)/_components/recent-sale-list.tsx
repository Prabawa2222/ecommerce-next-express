'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { IUserJson } from '@/lib/types/json'
import { fetchFilteredOrders } from '@/lib/api/order'
import { fetchSingleUser } from '@/lib/api/user'
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
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', 'createdAt', 'desc', 5],
    queryFn: () =>
      fetchFilteredOrders({
        sort: 'createdAt',
        order: 'desc',
        limit: 5
      })
  })
  const [recentSales, setRecentSales] = useState<IRecentSales[]>([])

  const getRecentSales = async () => {
    try {
      // const orders: IOrderJson[] = await fetchFilteredOrders( {
      //   sort: 'createdAt',
      //   order: 'desc',
      //   limit: 5
      // })

      if (orders && orders.length > 0) {
        const recentSalesData: IRecentSales[] = await Promise.all(
          orders?.map(async (order) => {
            const res: IUserJson[] = await fetchSingleUser(order.userId)

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
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRecentSales()
  }, [orders])

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      {!isLoading ? (
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
