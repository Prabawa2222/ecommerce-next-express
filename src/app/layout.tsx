import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/provider/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'E-commerce Dashboard',
  description: 'E-commerce Dashboard.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={`${sora.variable}`}>
      <body className='font-[family-name:var(--font-sora)] antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
