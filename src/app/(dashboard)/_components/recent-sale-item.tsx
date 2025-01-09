import Image from 'next/image'

import Paragraph from '@/components/paragraph/paragraph'
import SubParagraph from '@/components/paragraph/sub-paragraph'
import { Separator } from '@/components/ui/separator'

type RecentSaleItemProps = {
  recentSale: {
    user: {
      image: string
      name: string
      email: string
    }
    amount: number
  }
}

const RecentSaleItem = ({ recentSale }: RecentSaleItemProps) => {
  return (
    <div className='flex w-full flex-col justify-center gap-4 md:flex-row md:items-center'>
      <div className='flex w-full items-center justify-center gap-4'>
        <Image
          src={recentSale.user.image}
          alt='User image'
          width={40}
          height={40}
          className='h-10 w-10 rounded-full bg-gray-200'
        />
        <div className='flex flex-1 flex-col'>
          <Paragraph>{recentSale.user.name}</Paragraph>
          <SubParagraph>{recentSale.user.email}</SubParagraph>
        </div>
      </div>
      <p>+{recentSale.amount.toLocaleString('id-ID')}</p>
      <Separator className='md:hidden' />
    </div>
  )
}

export default RecentSaleItem
