import { useState } from 'react'

const UserForm = ({ onSubmit, initialData = {}, isCreating }) => {
    const [userForm, setUserForm] = useState({
        name: initialData.name || '',
        email: initialData.email || '',
        password: initialData.password || '',
        storage_limit: initialData.storage_limit || '',
        storage_used: initialData.storage_used || '',
    })

    const [passwordWarning, setPasswordWarning] = useState(false);

    const handleChange = e => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (isCreating && !userForm.password) {
            setPasswordWarning(true);
        } else {
            setPasswordWarning(false);
            onSubmit(userForm);
        }
    }

    return (
      <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="name">
                  Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={userForm.name}
                onChange={handleChange}
                required
              />
          </div>

          {/* Email Field */}
          <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="email">
                  Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={handleChange}
                required
              />
          </div>

          {/* Password Field */}
          <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="password">
                  Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={userForm.password}
                onChange={handleChange}
              />
              {passwordWarning && <div className="text-red-500 text-xs mt-1">Password is required for creating a user.</div>}
          </div>

          {/* Storage Limit Field */}
          <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="storage_limit">
                  Storage Limit
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="storage_limit"
                name="storage_limit"
                type="number"
                placeholder="Storage Limit"
                value={userForm.storage_limit}
                onChange={handleChange}
                required
              />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
              <button
                className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                type="submit">
                  Submit
              </button>
          </div>
      </form>
    )
}

export default UserForm
