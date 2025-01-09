type ContainerProps = {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return <div className='mx-auto flex w-full max-w-screen-2xl'>{children}</div>
}

export default Container
