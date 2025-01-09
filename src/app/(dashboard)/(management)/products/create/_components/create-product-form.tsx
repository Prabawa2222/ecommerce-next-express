'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AddProductFormSchema } from '@/lib/types/form'
import SubHeader from '@/components/header/sub-header'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import FormErrorMessage from '@/components/form-error-message'
import { fetchAddProduct } from '@/lib/api/services'

const CreateProductForm = () => {
  const form = useForm<z.infer<typeof AddProductFormSchema>>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      image: 'https://example.com/example.png',
      name: '',
      description: '',
      categoryId: '',
      price: 0,
      stock: 0
    }
  })

  const {
    setError,
    formState: { errors, isSubmitting }
  } = form

  const onSubmit = async (values: z.infer<typeof AddProductFormSchema>) => {
    console.log(values)

    try {
      const res = await fetchAddProduct(values)

      if (res?.error) {
        return setError('root', { message: res.error.message })
      }

      toast({
        title: 'Success',
        description: 'User has been updated successfully.'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Failed',
        description: 'Product was not added.'
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto flex w-full max-w-xl flex-col justify-center gap-4 rounded-md border p-4 sm:mx-0'
      >
        <SubHeader>Add New Product</SubHeader>

        <div className='flex flex-col gap-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem hidden>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input className='rounded-sm' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g., Black T-Shirt'
                    className='rounded-sm'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder='Simply describe the product'
                    className='rounded-sm'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className='rounded-sm'>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='rounded-sm'>
                    <SelectItem value='1'>T-Shirt</SelectItem>
                    <SelectItem value='2'>Pant</SelectItem>
                    <SelectItem value='3'>Shoe</SelectItem>
                    <SelectItem value='4'>Hoodie</SelectItem>
                    <SelectItem value='5'>Accessory</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='e.g, 250000'
                    className='rounded-sm'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='e.g, 55'
                    className='rounded-sm'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errors.root && (
            <FormErrorMessage>{errors.root.message}</FormErrorMessage>
          )}

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateProductForm
