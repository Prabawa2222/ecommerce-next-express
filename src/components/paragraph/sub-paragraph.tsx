import { cn } from '@/lib/utils'

type SubParagraphProps = {
  children: React.ReactNode
  className?: string
}

const SubParagraph = ({ children, className }: SubParagraphProps) => {
  return (
    <p className={cn('text-sm text-zinc-600 dark:text-zinc-400', className)}>
      {children}
    </p>
  )
}

export default SubParagraph
