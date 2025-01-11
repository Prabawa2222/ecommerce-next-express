import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { BASE_URL } from '../contants/api'
import { IProductJson } from '../types/json'
import { AddProductFormSchema, EditProductFormSchema } from '../types/form'

export const fetchAllProduct = async (): Promise<IProductJson[]> => {
  const res = await fetch(`${BASE_URL}/products`)

  return await res.json()
}

export const fetchFilteredProducts = async (filter?: {
  sort?: string
  page?: number
  limit?: number
  order?: string
}): Promise<IProductJson[]> => {
  const params = new URLSearchParams()

  if (filter?.sort) params.append('_sort', filter.sort)
  if (filter?.page) params.append('_page', filter.page.toString())
  if (filter?.limit) params.append('_limit', filter.limit.toString())
  if (filter?.order) params.append('_order', filter.order)

  const res = await fetch(`${BASE_URL}/users?${params.toString()}`)

  return await res.json()
}

export const fetchSingleProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products?id=${id}`)

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
