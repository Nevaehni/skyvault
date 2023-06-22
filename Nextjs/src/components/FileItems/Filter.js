import React, { useState, useEffect } from 'react'
import { FaFilter } from 'react-icons/fa'
import FileService from '@/services/FileService'
import Dropdown from '@/components/Navigation/Dropdown'

const Filter = ({ setFiles, filter, setFilter }) => {
    const [mediaTypes, setMediaTypes] = useState([])

    useEffect(() => {
        FileService.getAllMediaTypes()
            .then(response => {
                setMediaTypes(Object.values(response.data))
            })
            .catch(err => console.error(err))
    }, [])

    const handleFilter = async e => {
        e.preventDefault()

        const { size, created_at, type } = filter

        const params = {}
        if (size) params.size = size
        if (created_at) params.created_at = created_at
        if (type) params.type = type

        try {
            const response = await FileService.getFilteredData(params)
            if (response?.data) {
                // Adapt the data to the format expected by MediaTable
                setFiles({
                    subfolders: [], // add subfolders here if available
                    files: response.data,
                })
            } else {
                console.log('No filtered data')
            }
        } catch (error) {
            console.error('Error filtering data:', error)
        }
    }

    const handleChange = e => {
        const { name, value } = e.target
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    const trigger = (
        <div>
            <FaFilter
                className="text-white"
                size={22}
                style={{ cursor: 'pointer' }}
            />
        </div>
    )

    return (
        <Dropdown trigger={trigger} align="left" width="48">
            <form
                onSubmit={handleFilter}
                className="p-4 bg-gray-900 -m-1 rounded-md border-2 border-white shadow-neon shadow-yellow-300 rounded-md hover:shadow-neon-hover hover:shadow-yellow-300 transition-shadow duration-100 focus:ring-white focus:border-white">
                <input
                    type="date"
                    name="created_at"
                    value={filter.created_at}
                    onChange={handleChange}
                    placeholder="Created At"
                    className="px-2 py-1 text-gray-900 font-medium border-2 border-white shadow-neon shadow-yellow-300 rounded-md hover:shadow-neon-hover hover:shadow-yellow-300 transition-shadow duration-100 w-full mb-2 focus:ring-white focus:border-white text-gray-500"
                />
                <input
                    type="text"
                    name="size"
                    value={filter.size}
                    onChange={handleChange}
                    placeholder="Size"
                    className="px-2 py-1 text-gray-900 font-medium border-2 border-white shadow-neon shadow-yellow-300 rounded-md hover:shadow-neon-hover hover:shadow-yellow-300 transition-shadow duration-100 w-full mb-2 focus:ring-white focus:border-white"
                />
                <select
                    name="type"
                    value={filter.type}
                    onChange={handleChange}
                    className="px-2 py-1 text-gray-900 font-medium border-2 border-white shadow-neon shadow-yellow-300 rounded-md hover:shadow-neon-hover hover:shadow-yellow-300 transition-shadow duration-100 w-full mb-2 focus:ring-white focus:border-white">
                    <option value="" disabled>
                        Type
                    </option>
                    {mediaTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="px-4 py-2 text-sky-50 font-medium border-2 shadow-neon shadow-green-500 rounded-md hover:shadow-neon-hover hover:shadow-green-500 transition-shadow duration-100">
                    Submit
                </button>
            </form>
        </Dropdown>
    )
}

export default Filter
