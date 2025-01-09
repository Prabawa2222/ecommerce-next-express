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
import { UserTable } from '../table/user-columns'
import EditUserForm from '../edit-user-form'

type UserDetailModalProps = {
  user: UserTable
}

const EditUserModal = ({ user }: UserDetailModalProps) => {
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
      <DialogContent className='max-w-[320px] sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>Make changes to user data here.</DialogDescription>
        </DialogHeader>
        <EditUserForm user={user} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default EditUserModal
