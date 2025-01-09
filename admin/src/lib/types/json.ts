import { UserRoleType } from './types'

export interface IUserJson {
  id: string
  name: string
  email: string
  image: string
  role: UserRoleType
  createdAt: string
  updatedAt: string
}

export interface IProductJson {
  id: string
  name: string
  description: string
  categoryId: string
  image: string
  price: number
  stock: number
  createdAt: string
  updatedAt: string
}

export interface ICategoryJson {
  id: string
  title: string
  createdAt: string
}

export interface IOrderJson {
  id: string
  userId: string
  productId: string
  totalPrice: number
  status: 'pending' | 'shipped' | 'completed'
  createdAt: string
  updatedAt: string
}
