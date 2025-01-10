import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { EditOrderFormSchema } from '@/lib/types/form'
import { fetchUpdateOrder } from '@/lib/api/services'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import FormErrorMessage from '@/components/form-error-message'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { OrderTable } from './table/order-columns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type EditOrderFormProps = {
  order: OrderTable
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditOrderForm = ({ order, setOpen }: EditOrderFormProps) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof EditOrderFormSchema>>({
    resolver: zodResolver(EditOrderFormSchema),
    defaultValues: {
      status: order.status
    }
  })

  const {
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = form

  const statusValue = watch('status')

  const onSubmit = async (values: z.infer<typeof EditOrderFormSchema>) => {
    try {
      const res = await fetchUpdateOrder(order.id, values)

      if (res?.error) {
        return setError('root', { message: res.error.message })
      }

      setOpen(false)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Order has been updated successfully.'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Failed',
        description: 'Order was not updated.'
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
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  defaultValue={order.status}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className='rounded-sm'>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='rounded-sm'>
                    <SelectItem value='pending'>Pending</SelectItem>
                    <SelectItem value='shipped'>Shipped</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                  </SelectContent>
                </Select>
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
          disabled={isSubmitting || statusValue === order.status}
          className='w-full'
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </Form>
  )
}

export default EditOrderForm
