'use client'

import Image from 'next/image'
import { MoreHorizontal } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { UserRoleType } from '@/lib/types/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import UserDetailModal from '../modal/user-detail-modal'
import EditUserModal from '../modal/edit-user-modal'
import DeleteUserModal from '../modal/delete-user-modal'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserTable = {
  id: string
  image: string
  name: string
  email: string
  role: UserRoleType
  createdAt: string
  updatedAt: string
}

export const userColumns: ColumnDef<UserTable>[] = [
  // ROW SELECTION
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'image',
    header: 'Image',
    maxSize: 40,
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt='User image'
        width={32}
        height={32}
        className='ml-0.5 h-8 w-8 rounded-sm bg-gray-200'
      />
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0 text-xs lg:text-sm'
        >
          Name
        </Button>
      )
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0 text-xs lg:text-sm'
        >
          Email
        </Button>
      )
    }
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0 text-xs lg:text-sm'
        >
          Role
        </Button>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0 text-xs lg:text-sm'
        >
          Created At
        </Button>
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0 text-xs lg:text-sm'
        >
          Updated At
        </Button>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className='flex w-full items-center justify-center'>
          <DropdownMenu>
            <DropdownMenuTrigger className='border' asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <UserDetailModal user={row.original} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditUserModal user={row.original} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='text-destructive'>
                <DeleteUserModal id={row.original.id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
