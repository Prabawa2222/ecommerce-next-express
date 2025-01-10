'use client'

import { MoreHorizontal } from 'lucide-react'

import { ColumnDef } from '@tanstack/react-table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import DeleteCategoryModal from '../modal/delete-category-modal'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryTable = {
  id: string
  title: string
  createdAt: string
}

export const categoryColumns: ColumnDef<CategoryTable>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='px-0 text-xs lg:text-sm'
        >
          Title
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
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original

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
                onClick={() => navigator.clipboard.writeText(category.id)}
              >
                Copy category ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                {/* <UserDetailModal user={row.original} /> */}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                {/* <EditUserModal user={row.original} /> */}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='text-destructive'>
                <DeleteCategoryModal id={row.original.id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
