import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { fetchUserByEmailAndPassword } from './lib/api/services'
import { IUserJson } from './lib/types/json'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 3
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const user: IUserJson[] = await fetchUserByEmailAndPassword({
          email: credentials.email as string,
          password: credentials.password as string
        })

        if (!user.length) return null

        return user[0]
      }
    })
  ],
  callbacks: {
    signIn: async ({ user }) => {
      if (user.role !== 'admin') {
        throw new Error()
      }
      return true
    },
    authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user

      if (!isLoggedIn) {
        return Response.redirect(new URL('/auth/login', request.nextUrl))
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
        token.role = user.role
      }

      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.image = token.image as string
        session.user.name = token.name as string
        session.user.role = token.role as string
      }

      return session
    }
  }
})
