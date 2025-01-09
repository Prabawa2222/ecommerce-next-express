'use client'

import Link from 'next/link'
import {
  Boxes,
  ChartColumnDecreasing,
  LayoutDashboard,
  ShoppingCart,
  SquareChartGantt,
  StretchHorizontal,
  UserRound
} from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '../ui/sidebar'
import { usePathname } from 'next/navigation'

const managementItems = [
  {
    title: 'Dashboard',
    baseUrl: '/',
    url: '/',
    icon: LayoutDashboard
  },
  {
    title: 'Users',
    baseUrl: '/users',
    url: '/users/overview',
    icon: UserRound
  },
  {
    title: 'Products',
    baseUrl: '/products',
    url: '/products/overview',
    icon: Boxes
  },
  {
    title: 'Categories',
    baseUrl: '/categories',
    url: '/categories/overview',
    icon: StretchHorizontal
  },
  {
    title: 'Orders',
    baseUrl: '/orders',
    url: '/orders/overview',
    icon: ShoppingCart
  },
  {
    title: 'Analytics',
    baseUrl: '/analytics',
    url: '/analytics/overview',
    icon: ChartColumnDecreasing
  },
  {
    title: 'Reports',
    baseUrl: '/reports',
    url: '/reports/overview',
    icon: SquareChartGantt
  }
]

const AppSidebarMenu = () => {
  const pathname = usePathname()
  const { open } = useSidebar()

  return (
    <SidebarGroup className='py-0'>
      <SidebarGroupContent>
        <SidebarGroupLabel>Management</SidebarGroupLabel>
        <SidebarMenu>
          {!open && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild className='py-6'>
                <SidebarTrigger />
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {managementItems.map((item) => {
            const isActive =
              item.baseUrl === '/'
                ? pathname === '/'
                : pathname.startsWith(item.baseUrl)

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive} className='py-6'>
                  <Link href={item.url} aria-label={`${item.title} page`}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default AppSidebarMenu
