import React from 'react';
import { FaFilter } from 'react-icons/fa';
import FileService from '@/services/FileService';
import Dropdown from '@/components/Navigation/Dropdown'

const Filter = ({ setFiles, filter, setFilter }) => {
    const handleFilter = async (e) => {
        e.preventDefault();

        const { size, created_at, type } = filter;

        const params = {};
        if (size) params.size = size;
        if (created_at) params.created_at = created_at;
        if (type) params.type = type;

        try {
            const response = await FileService.getFilteredData(params);
            if (response?.data) {
                // Adapt the data to the format expected by MediaTable
                setFiles({
                    subfolders: [], // add subfolders here if available
                    files: response.data,
                });
            } else {
                console.log('No filtered data');
            }
        } catch (error) {
            console.error('Error filtering data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };

    const trigger = <FaFilter size={18} style={{ cursor: 'pointer' }} />;

    return (
      <Dropdown trigger={trigger} align="right" width="48">
          <form onSubmit={handleFilter} className="p-4">
              <input
                type="date"
                name="created_at"
                value={filter.created_at}
                onChange={handleChange}
                placeholder="Created At"
                className="px-2 py-1 border rounded w-full mb-2"
              />
              <input
                type="text"
                name="size"
                value={filter.size}
                onChange={handleChange}
                placeholder="Size"
                className="px-2 py-1 border rounded w-full mb-2"
              />
              <input
                type="text"
                name="type"
                value={filter.type}
                onChange={handleChange}
                placeholder="Type"
                className="px-2 py-1 border rounded w-full mb-2"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit
              </button>
          </form>
      </Dropdown>
    );
};

export default Filter;
