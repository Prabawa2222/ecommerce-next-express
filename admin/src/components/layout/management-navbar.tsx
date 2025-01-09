'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'

type ManagementMenuType = {
  href: string
  label: string
}

type ManagementNavbarProps = {
  menus: ManagementMenuType[]
}

const ManagementNavbar = ({ menus }: ManagementNavbarProps) => {
  const pathname = usePathname()

  return (
    <div className='px-4 pt-4'>
      <NavigationMenu className='w-fit rounded-md bg-zinc-100 p-1 dark:bg-zinc-900'>
        <NavigationMenuList>
          {menus.map((menu, index) => {
            const isActive = pathname === menu.href

            return (
              <NavigationMenuItem key={index}>
                <Link
                  href={menu.href}
                  aria-label={`${menu.label} page`}
                  className={cn(
                    'rounded-sm px-3 py-1 text-sm font-medium text-zinc-400 transition-all duration-300 ease-in-out hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700',
                    {
                      'bg-white text-gray-900 shadow-sm hover:bg-white dark:bg-background dark:text-white dark:hover:bg-background':
                        isActive
                    }
                  )}
                >
                  {menu.label}
                </Link>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
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

export default ManagementNavbar
