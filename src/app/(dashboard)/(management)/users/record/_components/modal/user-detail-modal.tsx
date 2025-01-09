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
import { UserTable } from '../table/user-columns'

type UserDetailModalProps = {
  user: UserTable
}

const UserDetailModal = ({ user }: UserDetailModalProps) => {
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
      <DialogContent className='max-w-[320px] sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>User detail</DialogTitle>
          <DialogDescription>
            View detailed information about the selected user.
          </DialogDescription>
        </DialogHeader>
        <UserDetail user={user} />
      </DialogContent>
    </Dialog>
  )
}

type UserDetailProps = {
  user: UserTable
}

const UserDetail = ({ user }: UserDetailProps) => {
  return (
    <div className='grid items-start gap-4'>
      <div className='flex items-center justify-center'>
        <Image
          src={user.image}
          alt='User image'
          width={200}
          height={200}
          className='h-auto w-[200px] rounded-sm'
        />
      </div>

      <div className='grid items-center sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Name:</span>
        <p className='font-bold sm:col-span-6'>{user.name}</p>
      </div>

      <div className='grid items-center sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Email:</span>
        <p className='font-bold sm:col-span-6'>{user.email}</p>
      </div>

      <div className='grid items-center sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>Role:</span>
        <p className='font-bold sm:col-span-6'>{user.role}</p>
      </div>

      <div className='grid items-center sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>CreatedAt:</span>
        <p className='font-bold sm:col-span-6'>{user.createdAt}</p>
      </div>

      <div className='grid items-center sm:grid-cols-8'>
        <span className='text-sm sm:col-span-2'>UpdatedAt:</span>
        <p className='font-bold sm:col-span-6'>{user.updatedAt}</p>
      </div>
    </div>
  )
}

export default UserDetailModal
