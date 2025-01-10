'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from '@/hooks/use-toast'
import { fetchAddCategory } from '@/lib/api/services'
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
import { AddCategoryFormSchema } from '@/lib/types/form'
import SubHeader from '@/components/header/sub-header'
import FormErrorMessage from '@/components/form-error-message'

const CreateCategoryForm = () => {
  const form = useForm<z.infer<typeof AddCategoryFormSchema>>({
    resolver: zodResolver(AddCategoryFormSchema),
    defaultValues: {
      title: ''
    }
  })

  const {
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = form

  const onSubmit = async (values: z.infer<typeof AddCategoryFormSchema>) => {
    try {
      const res = await fetchAddCategory({ title: values.title.toLowerCase() })

      if (res?.error) {
        return setError('root', { message: res.error.message })
      }

      toast({
        title: 'Success',
        description: 'Category has been updated successfully.'
      })

      reset()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Failed',
        description: 'Category was not added.'
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto flex w-full max-w-xl flex-col justify-center gap-4 rounded-md border p-4 sm:mx-0'
      >
        <SubHeader>Add New Category</SubHeader>

        <div className='flex flex-col gap-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input className='rounded-sm' {...field} />
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

export default CreateCategoryForm
