import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

export default function ShareComponent({ file }) {
    const [usersWithAccess, setUsersWithAccess] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        axios
            .get(`/api/share/${file.id}/access`)
            .then(response => {
                const entries = Object.entries(
                    response.data,
                ).map(([key, value]) => [parseInt(key), value])
                setUsersWithAccess(entries)
            })
            .catch(error => {
                console.error(error)
            })
    }, [file.id])

    const handleRemoveUser = key => {
        const updatedUsers = usersWithAccess.filter(([k, value]) => k !== key)
        setUsersWithAccess(updatedUsers)
        removeAccess(key)
    }

    const handleInviteUser = async e => {
        e.preventDefault()
        const email = e.target.elements.email.value.trim()
        if (
            email !== '' &&
            !usersWithAccess.some(([key, value]) => value === email)
        ) {
            axios
                .post(`/api/share/${file.id}`, {
                    email: email,
                })
                .then(response => {
                    const newEntry = [usersWithAccess.length + 1, email]
                    setUsersWithAccess([...usersWithAccess, newEntry])
                    window.dispatchEvent(new CustomEvent('fetchAllMedia'))
                })
                .catch(error => {
                    setError(error.response.data)
                })
        }

        e.target.elements.email.value = ''
    }

    const removeAccess = key => {
        axios.delete(`/api/share/${key}/access/remove`).catch(error => {
            console.error(error)
        })
    }

    return (
        <div className="text-gray-500">
            {/* Show error response for failed invites */}
            {error && (
                <p className="text-red-500 text-xs text-center m-2">
                    {error}
                    <button
                        onClick={() => setError('')}
                        className="pl-1 pr-1 float-right hover:bg-red-500 hover:text-white">
                        X
                    </button>
                </p>
            )}
            <h1 className="text-white text-xs text-center m-2">
                Share this file with other users by entering their email
                address.
            </h1>
            <form className="flex mb-4" onSubmit={handleInviteUser}>
                <input
                    name="email"
                    type="email"
                    required={true}
                    placeholder="Email address"
                    className="text-xs w-full px-4 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="text-xs justify-center px-4 text-sky-50 border-2 rounded-r-md shadow-neon shadow-green-500 hover:shadow-neon-hover hover:shadow-green-500 transition-shadow duration-100">
                    Invite
                </button>
            </form>

            <ul className="divide-y divide-gray-300">
                {usersWithAccess.map(([key, value]) => (
                    <li
                        key={key}
                        className="flex rounded items-center hover:bg-purple-500 hover:text-white">
                        <span className="px-4 text-xs flex-grow">{value}</span>
                        <button
                            onClick={() => handleRemoveUser(key)}
                            className="text-xs bg-red-800 justify-center px-4 p-1 m-2 text-sky-50 border-2 shadow-neon shadow-red-500 rounded hover:shadow-neon-hover hover:shadow-red-500 transition-shadow duration-100">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <br />
        </div>
    )
}
