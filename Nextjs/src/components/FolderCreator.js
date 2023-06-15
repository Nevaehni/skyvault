import { useState } from 'react'
import FolderService from '@/services/FolderService'

export default function FolderCreator(props) {
    const { onClose, setIsModalOpen } = props
    const [folderName, setFolderName] = useState('')
    const onChangeHandler = event => {
        setFolderName(event.target.value)
    }

    const createFolder = async () => {
        try {
            await FolderService.createFolder(folderName).then(response => {
                const event = new CustomEvent('fetchAllMedia')
                window.dispatchEvent(event)

                setTimeout(() => {
                    onClose()
                    setIsModalOpen(false)
                }, 1000)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center h-auto">
            <div className="bg-gray-900 rounded-lg  w-96">
                <div className="max-h-40 overflow-y-auto mb-4 text-gray-100">
                    <label
                        className="block text-gray-100 text-sm font-bold mb-2"
                        htmlFor="username">
                        Folder name
                    </label>
                    <input
                        className="w-full bg-gray-800 rounded-lg p-2"
                        type="text"
                        placeholder="Folder name"
                        value={folderName}
                        onChange={onChangeHandler}
                    />
                    <button
                        onClick={createFolder}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Create folder
                    </button>
                </div>
            </div>
        </div>
    )
}
