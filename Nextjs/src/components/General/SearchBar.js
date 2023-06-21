import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        console.log('Search term:', searchTerm)
        onSearch(searchTerm)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex">
                <label
                    htmlFor="location-search"
                    className="mb-2  text-gray-900 sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <input
                        type="search"
                        id="location-search"
                        className="block p-2.5 w-full z-5 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border-2 border-white shadow-neon shadow-yellow-300 rounded-md focus:ring-white focus:border-white"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-500 opacity-70 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SearchBar
