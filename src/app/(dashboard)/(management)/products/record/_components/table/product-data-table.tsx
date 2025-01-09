import { formatDateForTable } from '@/lib/utils'
import { IProductJson } from '@/lib/types/json'
import { fetchAllProduct } from '@/lib/api/services'
import { DataTable } from '@/components/table/data-table'
import { productColumns, UserTable } from './product-columns'

async function getData(): Promise<UserTable[]> {
  const res: IProductJson[] = await fetchAllProduct()

  return res.map((user) => ({
    ...user,
    createdAt: formatDateForTable(new Date(user.createdAt)),
    updatedAt: formatDateForTable(new Date(user.updatedAt))
  }))
}

const ProductDataTable = async () => {
  const data = await getData()

  const searchableColumns: string[] = [
    'name',
    'categoryId',
    'price',
    'stock',
    'createdAt',
    'updatedAt'
  ]

  return (
    <DataTable
      columns={productColumns}
      data={data}
      searchableColumns={searchableColumns}
    />
  )
}

export default ProductDataTable
