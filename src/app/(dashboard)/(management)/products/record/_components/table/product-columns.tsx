'use client'

import Image from 'next/image'
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
import ProductDetailModal from '../modal/product-detail-modal'
import EditProductModal from '../modal/edit-product-modal'
import DeleteProductModal from '../modal/delete-product-modal'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductTable = {
  id: string
  image: string
  name: string
  description: string
  categoryId: string
  price: number
  stock: number
  createdAt: string
  updatedAt: string
}

export const productColumns: ColumnDef<ProductTable>[] = [
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
        className='ml-0.5 h-10 w-10 rounded-sm bg-gray-200'
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
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          Name
        </Button>
      )
    }
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          Description
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='line-clamp-2 max-w-52'>{row.original.description}</div>
    )
  },
  {
    accessorKey: 'categoryId',
    accessorFn: (row) => `${row.categoryId.toString()}`,
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          Category ID
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='text-center'>{row.original.categoryId}</div>
    )
  },
  {
    accessorKey: 'price',
    accessorFn: (row) => `${row.price.toString()}`,
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          Price
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='min-w-28'>{row.original.price.toString()}</div>
    )
  },
  {
    accessorKey: 'stock',
    accessorFn: (row) => `${row.stock.toString()}`,
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='w-full justify-start px-0 text-xs lg:text-sm'
        >
          Stock
        </Button>
      )
    },
    cell: ({ row }) => <div className='text-center'>{row.original.stock}</div>
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
      const product = row.original

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
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ProductDetailModal product={row.original} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditProductModal product={row.original} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='text-destructive'>
                <DeleteProductModal id={row.original.id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
