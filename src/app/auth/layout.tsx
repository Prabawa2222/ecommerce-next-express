export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-[400px] items-center justify-center'>
      {children}
    </main>
  )
}
