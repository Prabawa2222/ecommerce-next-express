'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

type DeleteRecordModalProps = {
  id: string
  onDelete: () => void
}

const DeleteRecordModal = ({ id, onDelete }: DeleteRecordModalProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='w-full justify-start px-2 font-normal text-destructive'
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Delete a record</DialogTitle>
          <DialogDescription className='text-primary'>
            Are you sure you want to delete a record with id {id}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            variant='secondary'
            onClick={() => {
              onDelete()
              setOpen(false)
              router.refresh()
            }}
          >
            Yes
          </Button>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteRecordModal
