import { useEffect, useState } from 'react';
import FileService from "@/services/FileService";
import Modal from "@/components/General/Modal";

const Dashboard = () => {

    const [users, setUsers] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentEditingUser, setCurrentEditingUser] = useState(null); // track user being edited

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await FileService.getAllUsers();
            setUsers(res.data);
        };

        fetchUsers();
    }, []);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openEditUserModal = (user) => {
        setCurrentEditingUser(user);
        openModal();
    };

    const [userForm, setUserForm] = useState({name: '', email: '', password: '', storage_limit: '', storage_used: ''});

    const handleDeleteUser = async (id) => {
        await FileService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
    };

    const handleChange = e => {
        setUserForm({...userForm, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            let response;
            if (currentEditingUser) {
                response = await FileService.updateUser(currentEditingUser.id, userForm);
                setUsers(users.map(user => user.id === currentEditingUser.id ? response.data.user : user));
            } else {
                response = await FileService.createUser(userForm);
                setUsers([...users, response.data.user]);
            }
            setUserForm({name: '', email: '', password: '', storage_limit: '', storage_used: ''});
            closeModal();
        } catch (error) {
            console.log('User action failed:', error.response.data);
        }
    };

    useEffect(() => {
        if (currentEditingUser) {
            setUserForm({name: currentEditingUser.name, email: currentEditingUser.email, password: '', storage_limit: currentEditingUser.storage_limit, storage_used: currentEditingUser.storage_used});
        }
    }, [currentEditingUser]);

    return (
      <div className="py-12">
          <Modal isOpen={isModalOpen} onClose={closeModal} title={currentEditingUser ? 'Edit User' : 'Create User'}>
              <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
                          Name
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="name" name="name" type="text" placeholder="Name" value={userForm.name} onChange={handleChange} required/>
                  </div>
                  <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                          Email
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" name="email" type="email" placeholder="Email" value={userForm.email} onChange={handleChange} required/>
                  </div>
                  <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                          Password
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="password" name="password" type="password" placeholder="Password" value={userForm.password} onChange={handleChange} required/>
                  </div>
                  <div className="flex items-center justify-between">
                      <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">
                          Submit
                      </button>
                  </div>
              </form>
          </Modal>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 bg-gray-800">
                      <div className="flex justify-between">
                          <h3 className="text-lg leading-6 font-medium text-white">Admin Dashboard</h3>
                          <button onClick={openModal} className="text-blue-600 hover:text-blue-900 mr-2">Create User</button>
                      </div>
                      <div className="mt-5 flex flex-col">
                          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                      <table className="min-w-full divide-y divide-gray-200">
                                          <thead className="bg-gray-900">
                                          <tr>
                                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                  ID
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                  Name
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                  Email
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                  Storage Limit
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                  Storage Used
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                  Created At
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                  Actions
                                              </th>
                                          </tr>
                                          </thead>
                                          <tbody className="bg-gray-800 divide-y divide-gray-200">
                                          {users.map(user => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sky-50">{user.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sky-50">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sky-50">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sky-50">{user.storage_limit}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sky-50">{user.storage_used}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sky-50">{user.created_at}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sky-50">
                                                    <button onClick={() => openEditUserModal(user)} className="text-blue-600 hover:text-blue-900 mr-2">Edit User</button>
                                                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">Delete User</button>
                                                </td>
                                            </tr>
                                          ))}
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};
export default Dashboard;
