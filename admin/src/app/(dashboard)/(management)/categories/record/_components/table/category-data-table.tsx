import { formatDateForTable } from '@/lib/utils'
import { ICategoryJson } from '@/lib/types/json'
import { fetchAllCategory } from '@/lib/api/category'
import { DataTable } from '@/components/table/data-table'
import { categoryColumns, CategoryTable } from './category-columns'

async function getData(): Promise<CategoryTable[]> {
  const res: ICategoryJson[] = await fetchAllCategory()

  return res.map((category) => ({
    ...category,
    createdAt: formatDateForTable(new Date(category.createdAt))
  }))
}

const CategoryDataTable = async () => {
  const data = await getData()

  const searchableColumns: string[] = ['title', 'createdAt']

  return (
    <DataTable
      columns={categoryColumns}
      data={data}
      searchableColumns={searchableColumns}
    />
  )
}

export default CategoryDataTable
