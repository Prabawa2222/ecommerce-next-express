import { formatDateForTable } from '@/lib/utils'
import { IOrderJson } from '@/lib/types/json'
import { fetchAllOrder } from '@/lib/api/services'
import { DataTable } from '@/components/table/data-table'
import { orderColumns, OrderTable } from './order-columns'

async function getData(): Promise<OrderTable[]> {
  const res: IOrderJson[] = await fetchAllOrder()

  return res.map((user) => ({
    ...user,
    createdAt: formatDateForTable(new Date(user.createdAt)),
    updatedAt: formatDateForTable(new Date(user.updatedAt))
  }))
}

const OrderDataTable = async () => {
  const data = await getData()

  const searchableColumns: string[] = [
    'userId',
    'productId',
    'totalPrice',
    'status',
    'createdAt',
    'updatedAt'
  ]

  return (
    <DataTable
      columns={orderColumns}
      data={data}
      searchableColumns={searchableColumns}
    />
  )
}

export default OrderDataTable
