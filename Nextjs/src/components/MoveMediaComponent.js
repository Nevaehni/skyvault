import { useEffect, useState } from 'react'
import FolderService from '@/services/FolderService'
import MediaService from '@/services/MediaService'

export default function MoveMediaComponent({ media }) {
    const [error, setError] = useState('')
    const [folders, setFolders] = useState([])
    const [selectedFolder, setSelectedFolder] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await FolderService.getAllFolders()
                setFolders(response.data)
            } catch (error) {
                setError('Error fetching folders')
            }
        }

        fetchData()
    }, [])

    async function handleMoveMedia(event) {
        event.preventDefault()
        try {
            await MediaService.moveMediaToFolder(media, selectedFolder).then(
                () => {
                    const event = new CustomEvent('fetchAllMedia')
                    window.dispatchEvent(event)
                },
            )
        } catch (error) {
            setError('Error moving media')
        }
    }

    function handleSelectChange(event) {
        setSelectedFolder(event.target.value)
    }

    return (
        <div className="text-gray-500">
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
                Move media to a different folder:
            </h1>
            <form className="flex mb-4" onSubmit={handleMoveMedia}>
                <select
                    value={selectedFolder}
                    onChange={handleSelectChange}
                    className="text-xs w-full px-4 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">Dashboard</option>
                    {folders.map(folder => (
                        <option key={folder.id} value={folder.id}>
                            {folder.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="text-xs justify-center px-4 text-sky-50 border-2 rounded-r-md shadow-neon shadow-green-500 hover:shadow-neon-hover hover:shadow-green-500 transition-shadow duration-100">
                    Move
                </button>
            </form>
        </div>
    )
}
