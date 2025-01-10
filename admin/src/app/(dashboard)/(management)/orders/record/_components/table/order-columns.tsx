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
import { OrderStatusType } from '@/lib/types/types'
import OrderDetailModal from '../modal/order-detail-modal'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderTable = {
  id: string
  userId: string
  productId: string
  totalPrice: number
  status: OrderStatusType
  createdAt: string
  updatedAt: string
}

export const orderColumns: ColumnDef<OrderTable>[] = [
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
    accessorKey: 'userId',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          User ID
        </Button>
      )
    },
    cell: ({ row }) => <div className='ml-4'>{row.original.userId}</div>
  },
  {
    accessorKey: 'productId',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          Product ID
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='line-clamp-2 max-w-52'>{row.original.productId}</div>
    )
  },
  {
    accessorKey: 'totalPrice',
    accessorFn: (row) => `${row.totalPrice.toString()}`,
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          Total Price
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='text-center'>{row.original.totalPrice}</div>
    )
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          Status
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='line-clamp-2 max-w-52'>{row.original.status}</div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='w-full justify-start px-0 text-xs lg:text-sm'
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
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          Updated At
        </Button>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original

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
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <OrderDetailModal order={row.original} />
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <EditProductModal product={row.original} />
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem asChild className='text-destructive'>
                <DeleteProductModal id={row.original.id} />
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
