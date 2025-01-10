import { Metadata } from 'next'
import ManagementNavbar from '@/components/layout/management-navbar'

export const metadata: Metadata = {
  title: 'Order Management',
  description: 'E-commerce Order Management.'
}

export default function OrderManagementLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const menus = [
    {
      href: '/orders/overview',
      label: 'Overview'
    },
    {
      href: '/orders/record',
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
