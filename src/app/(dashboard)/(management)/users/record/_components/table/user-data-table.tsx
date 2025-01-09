import { formatDateForTable } from '@/lib/utils'
import { IUserJson } from '@/lib/types/json'
import { fetchAllUser } from '@/lib/api/services'
import { DataTable } from '../../../../../../../components/table/data-table'
import { userColumns, UserTable } from './user-columns'

async function getData(): Promise<UserTable[]> {
  const res: IUserJson[] = await fetchAllUser()

  return res.map((user) => ({
    ...user,
    createdAt: formatDateForTable(new Date(user.createdAt)),
    updatedAt: formatDateForTable(new Date(user.updatedAt))
  }))
}

const UserDataTable = async () => {
  const data = await getData()

  const searchableColumns: string[] = [
    'name',
    'email',
    'role',
    'createdAt',
    'updatedAt'
  ]

  return (
    <DataTable
      columns={userColumns}
      data={data}
      searchableColumns={searchableColumns}
    />
  )
}

export default UserDataTable
