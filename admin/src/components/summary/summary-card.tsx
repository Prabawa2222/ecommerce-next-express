import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps } from 'lucide-react'

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Paragraph from '@/components/paragraph/paragraph'
import SubParagraph from '@/components/paragraph/sub-paragraph'
import SummaryCardSkeleton from './summary-card-skeleton'

type SummaryCardProps = {
  title: string
  description: string
  growth: {
    amount: number
    format: 'percentage' | 'count'
  }
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}

const SummaryCard = (props: SummaryCardProps) => {
  return props.description && props.growth.amount ? (
    <Card className='h-fit'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-sm font-normal'>{props.title}</CardTitle>
          <props.icon size={14} color='gray' />
        </div>
        <CardDescription>
          <Paragraph className='text-xl font-bold sm:text-2xl'>
            {props.description}
          </Paragraph>
        </CardDescription>
        {props.growth.format === 'percentage' ? (
          <CardDescription>
            {props.growth.amount > 0 ? (
              <SubParagraph className='text-xs text-green-600 dark:text-green-600'>
                +{props.growth.amount}% from last month
              </SubParagraph>
            ) : (
              <SubParagraph className='text-xs text-destructive dark:text-destructive'>
                {props.growth.amount}% from last month
              </SubParagraph>
            )}
          </CardDescription>
        ) : (
          <CardDescription>
            <SubParagraph className='text-xs text-success dark:text-success'>
              +{props.growth.amount} this month
            </SubParagraph>
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  ) : (
    <SummaryCardSkeleton />
  )
}

export default SummaryCard
