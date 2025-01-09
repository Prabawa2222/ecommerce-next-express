import { cn } from '@/lib/utils'

type ParagraphProps = {
  children: React.ReactNode
  className?: string
}

const Paragraph = ({ children, className }: ParagraphProps) => {
  return (
    <p className={cn('text-gray-900 dark:text-gray-100', className)}>
      {children}
    </p>
  )
}

export default Paragraph
