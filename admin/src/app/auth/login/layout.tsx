import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'E-commerce Auth.'
}

export default function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
