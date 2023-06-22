import { useEffect, useState } from 'react'
import UserForm from '@/components/Admin/UserForm'
import Modal from '@/components/General/Modal'

const EditUser = ({ isOpen, user, onSubmit, onClose }) => {
    const [initialData, setInitialData] = useState({})
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(user){
            setInitialData({
                name: user.name,
                email: user.email,
                password: '',
                storage_limit: user.storage_limit,
                storage_used: user.storage_used,
            })
        }
    }, [user])

    const handleSubmit = async (user) => {
        try {
            await onSubmit(user);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Edit User">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <UserForm initialData={initialData} onSubmit={handleSubmit} />
      </Modal>
    )
}

export default EditUser
