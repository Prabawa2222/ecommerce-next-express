import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import Container from '@/components/container/container'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/sidebar'
import { AppNavbar } from '@/components/layout/navbar'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'E-commerce Dashboard.'
}

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <Container>
          <AppSidebar />
          <div className='min-h-screen w-full'>
            <AppNavbar />
            {children}
          </div>
        </Container>
      </SidebarProvider>
    </SessionProvider>
  )
}
