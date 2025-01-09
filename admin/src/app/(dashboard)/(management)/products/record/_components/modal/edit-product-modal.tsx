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
import { ProductTable } from '../table/product-columns'
import EditProductForm from '../edit-product-form'

type EditProductModalProps = {
  product: ProductTable
}

const EditProductModal = ({ product }: EditProductModalProps) => {
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
            Make changes to product data here.
          </DialogDescription>
        </DialogHeader>
        <EditProductForm product={product} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default EditProductModal
