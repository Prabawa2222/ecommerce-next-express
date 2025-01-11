import { BASE_URL } from '../contants/api'
import { IUserJson } from '../types/json'

export const fetchAllUser = async (): Promise<IUserJson[]> => {
  const res = await fetch(`${BASE_URL}/users`)

  return await res.json()
}

export const fetchFilteredUsers = async (filter?: {
  sort?: string
  page?: number
  limit?: number
  order?: string
}): Promise<IUserJson[]> => {
  const params = new URLSearchParams()

  if (filter?.sort) params.append('_sort', filter.sort)
  if (filter?.page) params.append('_page', filter.page.toString())
  if (filter?.limit) params.append('_limit', filter.limit.toString())
  if (filter?.order) params.append('_order', filter.order)

  const res = await fetch(`${BASE_URL}/users?${params.toString()}`)

  return await res.json()
}

export const fetchSingleUser = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users?id=${id}`)

  return await res.json()
}

export const fetchUpdateUser = async (
  id: string,
  data: {
    name: string
  }
) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data, updatedAt: new Date() })
  })

  return await res.json()
}

export const fetchUserByEmailAndPassword = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const res = await fetch(
    `${BASE_URL}/users?email=${email}&password=${password}`,
    {
      method: 'GET',
      next: {
        revalidate: 0
      }
    }
  )

  return await res.json()
}

export const fetchDeleteUser = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE'
  })

  return await res.json()
}
