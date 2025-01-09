'use client'

import { fetchDeleteProduct } from '@/lib/api/services'
import { useToast } from '@/hooks/use-toast'

import DeleteRecordModal from '@/components/modal/delete-record-modal'

type DeleteProductModalProps = {
  id: string
}

const DeleteProductModal = ({ id }: DeleteProductModalProps) => {
  const { toast } = useToast()

  const handleDeleteRecord = async () => {
    try {
      const res = await fetchDeleteProduct(id)

      if (res?.error) {
        return toast({
          title: 'Failed',
          description: 'Product was not deleted.'
        })
      }

      toast({
        title: 'Success',
        description: 'Product has been deleted successfully.'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Failed',
        description: 'Product was not deleted.'
      })
    }
  }

  return <DeleteRecordModal id={id} onDelete={handleDeleteRecord} />
}

export default DeleteProductModal
