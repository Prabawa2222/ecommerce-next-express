import { Metadata } from 'next'
import ManagementNavbar from '@/components/layout/management-navbar'

export const metadata: Metadata = {
  title: 'User Management',
  description: 'E-commerce User Management.'
}

export default function UserManagementLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const menus = [
    {
      href: '/users/overview',
      label: 'Overview'
    },
    {
      href: '/users/record',
      label: 'Record'
    }
  ]

  return (
    <>
      <ManagementNavbar menus={menus} />
      {children}
    </>
  )
}
