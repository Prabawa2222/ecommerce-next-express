type FormErrorMessageProps = {
  children: React.ReactNode
}

const FormErrorMessage = ({ children }: FormErrorMessageProps) => {
  return <p className='text-sm text-red-500'>{children}</p>
}

export default FormErrorMessage
