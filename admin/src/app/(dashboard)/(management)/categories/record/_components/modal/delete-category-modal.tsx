'use client'

import { fetchDeleteCategory } from '@/lib/api/category'
import { useToast } from '@/hooks/use-toast'

import DeleteRecordModal from '@/components/modal/delete-record-modal'

type DeleteCategoryModalProps = {
  id: string
}

const DeleteCategoryModal = ({ id }: DeleteCategoryModalProps) => {
  const { toast } = useToast()

  const handleDeleteRecord = async () => {
    try {
      const res = await fetchDeleteCategory(id)

      if (res?.error) {
        return toast({
          title: 'Failed',
          description: 'Category was not deleted.'
        })
      }

      toast({
        title: 'Success',
        description: 'Category has been deleted successfully.'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Failed',
        description: 'Category was not deleted.'
      })
    }
  }

  return <DeleteRecordModal id={id} onDelete={handleDeleteRecord} />
}

export default DeleteCategoryModal
