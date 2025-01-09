import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { AddProductFormSchema, EditProductFormSchema } from '../types/form'

const BASE_URL = 'http://localhost:3004'

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

export const fetchAllUser = async () => {
  const res = await fetch(`${BASE_URL}/users`)

  return await res.json()
}

export const fetchAllProduct = async () => {
  const res = await fetch(`${BASE_URL}/products`)

  return await res.json()
}

export const fetchAllCategory = async () => {
  const res = await fetch(`${BASE_URL}/categories`)

  return await res.json()
}

export const fetchAllOrder = async () => {
  const res = await fetch(`${BASE_URL}/orders`)

  return await res.json()
}

export const fetchSingleData = async (
  data: 'users' | 'products' | 'orders' | 'categories',
  id: string
) => {
  const res = await fetch(`${BASE_URL}/${data}?id=${id}`)

  return await res.json()
}

export const fetchFilteredData = async (
  data: 'users' | 'products' | 'orders' | 'categories',
  filter?: {
    sort?: string
    page?: number
    limit?: number
    order?: string
  }
) => {
  const params = new URLSearchParams()

  if (filter?.sort) params.append('_sort', filter.sort)
  if (filter?.page) params.append('_page', filter.page.toString())
  if (filter?.limit) params.append('_limit', filter.limit.toString())
  if (filter?.order) params.append('_order', filter.order)

  const res = await fetch(`${BASE_URL}/${data}?${params.toString()}`)

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

export const fetchDeleteUser = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE'
  })

  return await res.json()
}

export const fetchAddProduct = async (
  data: z.infer<typeof AddProductFormSchema>
) => {
  const res = await fetch(`${BASE_URL}/products/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })

  return await res.json()
}

export const fetchUpdateProduct = async (
  id: string,
  data: z.infer<typeof EditProductFormSchema>
) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data, updatedAt: new Date() })
  })

  return await res.json()
}

export const fetchDeleteProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE'
  })

  return await res.json()
}
