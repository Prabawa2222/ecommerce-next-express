type PageContainerProps = {
  children: React.ReactNode
}

const PageContainer = ({ children }: PageContainerProps) => {
  return <main className='flex w-full flex-col gap-4 p-4'>{children}</main>
}

export default PageContainer
