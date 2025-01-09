import { Metadata } from 'next'
import ManagementNavbar from '@/components/layout/management-navbar'

export const metadata: Metadata = {
  title: 'Product Management',
  description: 'E-commerce Product Management.'
}

export default function ProductManagementLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const menus = [
    {
      href: '/products/overview',
      label: 'Overview'
    },
    {
      href: '/products/record',
      label: 'Record'
    },
    {
      href: '/products/create',
      label: 'Create'
    }
  ]

  return (
    <>
      <ManagementNavbar menus={menus} />
      {children}
    </>
  )
}
