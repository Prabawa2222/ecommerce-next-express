import { z } from 'zod'

export const AddProductFormSchema = z.object({
  name: z.string({ required_error: 'Required' }).min(3, {
    message: 'Product name must be at least 3 characters.'
  }),
  image: z.string({ required_error: 'Required' }).min(1, {
    message: 'Image is required.'
  }),
  description: z.string({ required_error: 'Required' }).min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  categoryId: z.string({ required_error: 'Required' }).min(1, {
    message: 'Category ID is required'
  }),
  price: z.coerce.number({ required_error: 'Required' }).min(1, {
    message: 'Price is required'
  }),
  stock: z.coerce.number({ required_error: 'Required' }).min(1, {
    message: 'Stock is required'
  })
})

export const EditProductFormSchema = z.object({
  name: z.string({ required_error: 'Required' }).min(3, {
    message: 'Product name must be at least 3 characters.'
  }),
  description: z.string({ required_error: 'Required' }).min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  price: z.coerce.number({ required_error: 'Required' }).min(1, {
    message: 'Price is required'
  }),
  stock: z.coerce.number({ required_error: 'Required' }).min(1, {
    message: 'Stock is required'
  })
})
