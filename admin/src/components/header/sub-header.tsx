type SubHeaderProps = {
  children: React.ReactNode
}

const SubHeader = ({ children }: SubHeaderProps) => {
  return <h2 className='font-bold'>{children}</h2>
}

export default SubHeader
