import { useState } from 'react';
import UserForm from '@/components/Admin/UserForm'
import Modal from '@/components/General/Modal'

const CreateUser = ({ isOpen, onSubmit, onClose }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (user) => {
        try {
            await onSubmit(user);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Create User">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <UserForm onSubmit={handleSubmit} isCreating />
      </Modal>
    )
}

export default CreateUser
