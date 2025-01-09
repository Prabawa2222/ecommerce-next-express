'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { handleCredentialsSignin } from '@/app/actions/actions'

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
import FormErrorMessage from '@/components/form-error-message'

const formSchema = z.object({
  email: z
    .string({ required_error: 'Required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Required' })
    .min(1, { message: 'Password is required' })
})

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const {
    setError,
    formState: { errors, isSubmitting }
  } = form

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await handleCredentialsSignin(values)

      if (res?.error) {
        setError('root', { message: res.error.message })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center justify-center gap-8 rounded-sm border p-6'
      >
        <div className='flex w-full flex-col gap-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='user@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {errors.root && (
          <FormErrorMessage>{errors.root.message}</FormErrorMessage>
        )}

        <Button type='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
