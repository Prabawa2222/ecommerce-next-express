import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { OrderTable } from '../table/order-columns'

type OrderDetailModalProps = {
  order: OrderTable
}

const OrderDetailModal = ({ order }: OrderDetailModalProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='w-full justify-start px-2 font-normal'
        >
          View detail
        </Button>
      </DialogTrigger>
      <DialogContent className='h-[90vh] max-w-[320px] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>order detail</DialogTitle>
          <DialogDescription>
            View detailed information about the selected order.
          </DialogDescription>
        </DialogHeader>
        <OrderDetail order={order} />
      </DialogContent>
    </Dialog>
  )
}

type OrderDetailProps = {
  order: OrderTable
}

const OrderDetail = ({ order }: OrderDetailProps) => {
  return (
    <div className='grid items-start gap-4'>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>ID:</span>
        <p className='sm:col-span-6'>{order.id}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>User ID:</span>
        <p className='sm:col-span-6'>{order.userId}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Product ID:</span>
        <p className='sm:col-span-6'>{order.productId}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Total Price:</span>
        <p className='sm:col-span-6'>{order.totalPrice}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Status:</span>
        <p className='sm:col-span-6'>{order.status}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Created At:</span>
        <p className='sm:col-span-6'>{order.createdAt}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Updated At:</span>
        <p className='sm:col-span-6'>{order.updatedAt}</p>
      </div>
    </div>
  )
}

export default OrderDetailModal
