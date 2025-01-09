'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import Paragraph from './paragraph/paragraph'
import SubParagraph from './paragraph/sub-paragraph'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from './ui/dropdown-menu'

const AppAvatar = () => {
  const { data: session } = useSession()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer'>
          <AvatarImage
            src={session?.user.image || 'https://github.com/shadcn.png'}
            alt='Admin image'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel className='flex flex-col'>
          <Paragraph className='text-sm font-normal'>
            {session?.user.name}
          </Paragraph>
          <SubParagraph className='text-xs font-normal'>
            {session?.user.email}
          </SubParagraph>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='/profile' aria-label='Profile page'>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={() => signOut()} className='text-destructive'>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AppAvatar
