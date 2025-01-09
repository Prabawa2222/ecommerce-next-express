'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar'
import AppSidebarMenu from './sidebar-menu'

export function AppSidebar() {
  const { open } = useSidebar()

  return (
    <Sidebar collapsible='icon' className='border-r'>
      <SidebarContent>
        {open && (
          <div className='flex h-14 items-center justify-between px-4'>
            <span className='line-clamp-1 select-none text-base font-bold lg:text-xl'>
              E-COMMERCE
            </span>
            <SidebarTrigger />
          </div>
        )}
        <AppSidebarMenu />
      </SidebarContent>
    </Sidebar>
  )
}
