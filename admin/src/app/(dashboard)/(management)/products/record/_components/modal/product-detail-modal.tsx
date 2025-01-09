import * as React from 'react'
import Image from 'next/image'

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

type ProductDetailModalProps = {
  product: ProductTable
}

const ProductDetailModal = ({ product }: ProductDetailModalProps) => {
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
          <DialogTitle>Product detail</DialogTitle>
          <DialogDescription>
            View detailed information about the selected product.
          </DialogDescription>
        </DialogHeader>
        <ProductDetail product={product} />
      </DialogContent>
    </Dialog>
  )
}

type ProductDetailProps = {
  product: ProductTable
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className='grid items-start gap-4'>
      <div className='flex items-center justify-center'>
        <Image
          src={product.image}
          alt='User image'
          width={400}
          height={400}
          className='h-auto w-[400px] rounded-sm'
        />
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>ID:</span>
        <p className='sm:col-span-6'>{product.id}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Name:</span>
        <p className='sm:col-span-6'>{product.name}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Description:</span>
        <p className='sm:col-span-6'>{product.description}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Category ID:</span>
        <p className='sm:col-span-6'>{product.categoryId}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Price:</span>
        <p className='sm:col-span-6'>{product.price}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Stock:</span>
        <p className='sm:col-span-6'>{product.stock}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>CreatedAt:</span>
        <p className='sm:col-span-6'>{product.createdAt}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>UpdatedAt:</span>
        <p className='sm:col-span-6'>{product.updatedAt}</p>
      </div>
    </div>
  )
}

export default ProductDetailModal
