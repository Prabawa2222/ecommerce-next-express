import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { EditProductFormSchema } from '@/lib/types/form'
import { fetchUpdateProduct } from '@/lib/api/services'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormErrorMessage from '@/components/form-error-message'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ProductTable } from './table/product-columns'
import { Textarea } from '@/components/ui/textarea'

type EditProductFormProps = {
  product: ProductTable
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProductForm = ({ product, setOpen }: EditProductFormProps) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof EditProductFormSchema>>({
    resolver: zodResolver(EditProductFormSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    }
  })

  const {
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = form

  const nameValue = watch('name')
  const descriptionValue = watch('description')
  const priceValue = watch('price')
  const stockValue = watch('stock')

  const onSubmit = async (values: z.infer<typeof EditProductFormSchema>) => {
    try {
      const res = await fetchUpdateProduct(product.id, values)

      if (res?.error) {
        return setError('root', { message: res.error.message })
      }

      setOpen(false)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Product has been updated successfully.'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Failed',
        description: 'Product was not updated.'
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-4'
      >
        <div className='flex w-full flex-col gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {errors.root && (
          <FormErrorMessage>{errors.root.message}</FormErrorMessage>
        )}

        <Button
          type='submit'
          disabled={
            isSubmitting ||
            (nameValue === product.name &&
              descriptionValue === product.description &&
              priceValue === product.price &&
              stockValue === product.stock)
          }
          className='w-full'
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </Form>
  )
}

export default EditProductForm
