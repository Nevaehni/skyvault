import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import FileService from '@/services/FileService'
import CreateUserForm from '@/components/Admin/CreateUser'
import EditUserForm from '@/components/Admin/EditUser'

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [currentEditingUser, setCurrentEditingUser] = useState(null)
    const [isCreateModalOpen, setCreateModalOpen] = useState(false)
    const [isEditModalOpen, setEditModalOpen] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await FileService.getAllUsers()
            setUsers(res.data)
        }

        fetchUsers()
    }, [])

    const handleDeleteUser = async id => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await FileService.deleteUser(id)
            setUsers(users.filter(user => user.id !== id))
        }
    }


    const router = useRouter()

    const handleBack = () => {
        router.push('/dashboard')
    }

    const handleCreateUser = async formData => {
        try {
            const response = await FileService.createUser(formData)
            setUsers([...users, response.data.user])
            setCreateModalOpen(false)
        } catch (error) {
            console.log('User creation failed:', error.response.data)
        }
    }

    const handleEditUser = async formData => {
        try {
            const response = await FileService.updateUser(
                currentEditingUser.id,
                formData,
            )
            setUsers(
                users.map(user =>
                    user.id === currentEditingUser.id
                        ? response.data.user
                        : user,
                ),
            )
            setCurrentEditingUser(null)
            setEditModalOpen(false)
        } catch (error) {
            console.log('User update failed:', error.response.data)
        }
    }

    const openEditUserModal = user => {
        setCurrentEditingUser(user)
        setEditModalOpen(true)
    }

    return (
        <div className="py-12">
            <CreateUserForm
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateUser}
            />

            <EditUserForm
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSubmit={handleEditUser}
                user={currentEditingUser}
            />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-gray-800">
                        <div className="flex justify-between">
                            <h3 className="text-lg leading-6 font-medium text-white">
                                Admin Dashboard
                            </h3>
                            <button
                                onClick={() => setCreateModalOpen(true)}
                                className="px-4 py-2 text-sky-50 font-medium border-2 shadow-neon shadow-green-500 rounded-md hover:shadow-neon-hover hover:shadow-green-500 transition-shadow duration-100">
                                Create User
                            </button>
                        </div>
                        {/* Rest of the UI elements go here... */}
                        <div className="mt-5 flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="text-sky-50 font-medium border-2 shadow-neon shadow-green-500 rounded-md hover:shadow-neon-hover hover:shadow-green-500 transition-shadow duration-100">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-900">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                        ID
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                        Storage Limit
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                        Storage Used
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                        Created At
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-800 divide-y divide-gray-200">
                                                {users.map(user => (
                                                    <tr key={user.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sky-50">
                                                            {user.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sky-50">
                                                            {user.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sky-50">
                                                            {user.email}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sky-50">
                                                            {user.storage_limit}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sky-50">
                                                            {user.storage_used}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sky-50">
                                                            {user.created_at}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sky-50">
                                                            <button
                                                                onClick={() =>
                                                                    openEditUserModal(
                                                                        user,
                                                                    )
                                                                }
                                                                className="px-4 py-2 text-sky-50 font-medium border-2 shadow-neon shadow-blue-500 rounded-md hover:shadow-neon-hover hover:shadow-blue-500 transition-shadow duration-100 mr-2">
                                                                Edit User
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteUser(
                                                                        user.id,
                                                                    )
                                                                }
                                                                className="px-4 py-2 text-sky-50 font-medium border-2 shadow-neon shadow-red-500 rounded-md hover:shadow-neon-hover hover:shadow-red-500 transition-shadow duration-100">
                                                                Delete User
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button
                                        onClick={handleBack}
                                        className="px-4 py-2 mr-2 text-sky-50 font-medium border-2 shadow-neon shadow-blue-500 rounded-md hover:shadow-neon-hover hover:shadow-blue-500 transition-shadow duration-100 mt-4">
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
