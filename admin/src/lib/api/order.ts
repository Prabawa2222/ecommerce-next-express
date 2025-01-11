import { z } from 'zod'

import { BASE_URL } from '../contants/api'
import { EditOrderFormSchema } from '../types/form'
import { IOrderJson, IPaymentJson } from '../types/json'

export const fetchAllOrder = async (): Promise<IOrderJson[]> => {
  const res = await fetch(`${BASE_URL}/orders`)

  return await res.json()
}

export const fetchFilteredOrders = async (filter?: {
  sort?: string
  page?: number
  limit?: number
  order?: string
}): Promise<IOrderJson[]> => {
  const params = new URLSearchParams()

  if (filter?.sort) params.append('_sort', filter.sort)
  if (filter?.page) params.append('_page', filter.page.toString())
  if (filter?.limit) params.append('_limit', filter.limit.toString())
  if (filter?.order) params.append('_order', filter.order)

  const res = await fetch(`${BASE_URL}/orders?${params.toString()}`)

  return await res.json()
}

export const fetchSingleOrder = async (id: string) => {
  const res = await fetch(`${BASE_URL}/orders?id=${id}`)

  return await res.json()
}

export const fetchUpdateOrder = async (
  id: string,
  data: z.infer<typeof EditOrderFormSchema>
) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data, updatedAt: new Date() })
  })

  return await res.json()
}

export const fetchAllPayment = async (): Promise<IPaymentJson[]> => {
  const res = await fetch(`${BASE_URL}/payments`)

  return await res.json()
}
