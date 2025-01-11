import { z } from 'zod'

import { BASE_URL } from '../contants/api'
import { AddCategoryFormSchema } from '../types/form'
import { ICategoryJson } from '../types/json'
import { generateUniqueNumberId } from '../utils'

export const fetchAllCategory = async (): Promise<ICategoryJson[]> => {
  const res = await fetch(`${BASE_URL}/categories`)

  return await res.json()
}

export const fetchFilteredCategories = async (filter?: {
  sort?: string
  page?: number
  limit?: number
  order?: string
}): Promise<ICategoryJson[]> => {
  const params = new URLSearchParams()

  if (filter?.sort) params.append('_sort', filter.sort)
  if (filter?.page) params.append('_page', filter.page.toString())
  if (filter?.limit) params.append('_limit', filter.limit.toString())
  if (filter?.order) params.append('_order', filter.order)

  const res = await fetch(`${BASE_URL}/categories?${params.toString()}`)

  return await res.json()
}

export const fetchSingleCategory = async (id: string) => {
  const res = await fetch(`${BASE_URL}/categories?id=${id}`)

  return await res.json()
}

export const fetchAddCategory = async (
  data: z.infer<typeof AddCategoryFormSchema>
) => {
  const categories: ICategoryJson[] = await fetchAllCategory()
  const categoryIds = categories.map((category) => Number(category.id))
  const newId = generateUniqueNumberId(categoryIds)

  const res = await fetch(`${BASE_URL}/categories/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data,
      id: newId.toString(),
      createdAt: new Date()
    })
  })

  return await res.json()
}

export const fetchDeleteCategory = async (id: string) => {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: 'DELETE'
  })

  return await res.json()
}
