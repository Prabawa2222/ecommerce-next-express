'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import Header from '../header/header'
import AppAvatar from '../avatar'
import { ThemeToggle } from '../ui/theme-toggle'
import { Skeleton } from '../ui/skeleton'
import { SidebarTrigger } from '../ui/sidebar'

export function AppNavbar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const getPageHeader = () => {
    if (pathname === '/') return 'dashboard'
    if (pathname.startsWith('/users')) return 'users'
    if (pathname.startsWith('/products')) return 'products'
    if (pathname.startsWith('/categories')) return 'categories'
    if (pathname.startsWith('/orders')) return 'orders'
    if (pathname.startsWith('/analytics')) return 'analytics'
    if (pathname.startsWith('/reports')) return 'reports'

    return ''
  }

  const pageHeader = getPageHeader()

  return (
    <NavigationMenu className='sticky top-0 h-14 w-full justify-between border-b bg-background px-4'>
      <NavigationMenuList>
        {isMobile && (
          <NavigationMenuItem>
            <SidebarTrigger />
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          {pathname ? (
            <Header>{pageHeader}</Header>
          ) : (
            <Skeleton className='h-7 w-60' />
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className='gap-2'>
        <NavigationMenuItem>
          <ThemeToggle />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <AppAvatar />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
