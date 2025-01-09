'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'

export const handleCredentialsSignin = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: {
              message: 'Invalid credentials'
            }
          }
        case 'AccessDenied':
          return {
            error: {
              message: 'Access denied'
            }
          }
        default:
          return {
            error: {
              message: error.message
            }
          }
      }
    }

    throw error
  }
}
