'use client'

import { fetchDeleteUser } from '@/lib/api/services'
import { useToast } from '@/hooks/use-toast'

import DeleteRecordModal from '@/components/modal/delete-record-modal'

type DeleteUserModalProps = {
  id: string
}

const DeleteUserModal = ({ id }: DeleteUserModalProps) => {
  const { toast } = useToast()

  const handleDeleteRecord = async () => {
    try {
      const res = await fetchDeleteUser(id)

      if (res?.error) {
        return toast({
          title: 'Failed',
          description: 'User was not deleted.'
        })
      }

      toast({
        title: 'Success',
        description: 'User has been deleted successfully.'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Failed',
        description: 'User was not deleted.'
      })
    }
  }

  return <DeleteRecordModal id={id} onDelete={handleDeleteRecord} />
}

export default DeleteUserModal
