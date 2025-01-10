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
import { CategoryTable } from '../table/category-columns'

type CategoryDetailModalProps = {
  category: CategoryTable
}

const CategoryDetailModal = ({ category }: CategoryDetailModalProps) => {
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
      <DialogContent className='max-h-[90vh] max-w-[320px] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Category detail</DialogTitle>
          <DialogDescription>
            View detailed information about the selected category.
          </DialogDescription>
        </DialogHeader>
        <CategoryDetail category={category} />
      </DialogContent>
    </Dialog>
  )
}

type CategoryDetailProps = {
  category: CategoryTable
}

const CategoryDetail = ({ category }: CategoryDetailProps) => {
  return (
    <div className='grid items-start gap-4'>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>ID:</span>
        <p className='sm:col-span-6'>{category.id}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Title:</span>
        <p className='sm:col-span-6'>{category.title}</p>
      </div>
      <div className='grid items-start sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Created At:</span>
        <p className='sm:col-span-6'>{category.createdAt}</p>
      </div>
    </div>
  )
}

export default CategoryDetailModal
