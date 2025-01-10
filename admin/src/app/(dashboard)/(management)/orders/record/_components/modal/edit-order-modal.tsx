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
import EditOrderForm from '../edit-order-form'

type EditOrderModalProps = {
  order: OrderTable
}

const EditOrderModal = ({ order }: EditOrderModalProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='w-full justify-start px-2 font-normal'
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[320px] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to order data here.
          </DialogDescription>
        </DialogHeader>
        <EditOrderForm order={order} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default EditOrderModal
