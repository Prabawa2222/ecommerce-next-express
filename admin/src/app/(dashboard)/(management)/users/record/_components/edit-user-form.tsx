import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserTable } from './table/user-columns'
import { fetchUpdateUser } from '@/lib/api/services'
import FormErrorMessage from '@/components/form-error-message'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = z.object({
  name: z
    .string({ required_error: 'Required' })
    .min(3, { message: 'Name must contain at least 3 characters' })
})

type EditUserForm = {
  user: UserTable
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditUserForm = ({ user, setOpen }: EditUserForm) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name
    }
  })

  const {
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = form

  const nameValue = watch('name')

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetchUpdateUser(user.id, values)

      if (res?.error) {
        return setError('root', { message: res.error.message })
      }

      setOpen(false)
      router.refresh()
      toast({
        title: 'Success',
        description: 'User has been updated successfully.'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Failed',
        description: 'User was not updated.'
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
        </div>

        {errors.root && (
          <FormErrorMessage>{errors.root.message}</FormErrorMessage>
        )}

        <Button
          type='submit'
          disabled={
            isSubmitting || nameValue === user.name || nameValue.length < 3
          }
          className='w-full'
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </Form>
  )
}

export default EditUserForm
