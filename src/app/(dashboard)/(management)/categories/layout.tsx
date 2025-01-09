import { Metadata } from 'next'
import ManagementNavbar from '@/components/layout/management-navbar'

export const metadata: Metadata = {
  title: 'Category Management',
  description: 'E-commerce Category Management.'
}

export default function CategoryManagementLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const menus = [
    {
      href: '/categories/overview',
      label: 'Overview'
    },
    {
      href: '/categories/record',
      label: 'Record'
    },
    {
      href: '/categories/create',
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
