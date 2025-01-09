import { cn } from '@/lib/utils'

type SummaryProps = {
  className?: string
  children: React.ReactNode
}

const Summary = ({ className, children }: SummaryProps) => {
  return <div className={cn(className)}>{children}</div>
}

export default Summary
