import {
    FaBomb,
    FaDownload,
    FaFolder,
    FaInfoCircle,
    FaShareAlt,
    FaTrashAlt,
    FaTrashRestoreAlt,
} from 'react-icons/fa'
import React, { createContext, useContext, useState } from 'react'
import ShareComponent from '@/components/ShareComponent'
import Modal from '@/components/General/Modal'
import { userIsOwnerOfMedia } from '@/hooks/userIsOwnerOfMedia'
import FileService from '@/services/FileService'
import MoveMediaComponent from '@/components/MoveMediaComponent'
import ItemImage from '@/components/FileItems/ItemImage'

// Creating a context for sharing data among components
const FileContext = createContext(undefined)

export default function FileItem({ file, viewingDeletedMedia, onAlert }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [target, setTarget] = useState('')
    const isOwner = userIsOwnerOfMedia(file)

    // Function to toggle the modal's open/close state
    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState)
    }

    // Values to be provided via context
    const contextValue = {
        file,
        toggleModal,
        setTarget,
        onAlert,
    }

    return (
        // Wrapping the component with the FileContext.Provider to share context data
        <FileContext.Provider value={contextValue}>
            <div className="bg-gray-900 rounded-md text-sky-50 border-2 shadow-neon shadow-purple-500">
                {!isOwner && file.user_id != null && (
                    <div className="relative ">
                        <div className={'relative float-right mt-2 mr-2'}>
                            <InformationIcon
                                message={
                                    'The owner ' +
                                    file.user_email +
                                    ' has shared this with you.'
                                }
                            />
                        </div>
                    </div>
                )}
                <div className="p-2 pt-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-20 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                            <ItemImage
                                mediaId={file.id}
                                fileName={file.name + '.' + file.extension}
                            />
                        </div>
                    </div>
                    <div className="text-sm font-medium truncate">
                        {file.name}
                    </div>
                </div>

                {/* Render the modal with the ShareComponent */}
                <Modal isOpen={isModalOpen} onClose={toggleModal}>
                    {target === 'share' && <ShareComponent file={file} />}
                    {target === 'move' && <MoveMediaComponent media={file} />}
                </Modal>

                <div className="bg-gray-800 p-2 shadow-neon shadow-purple-500">
                    <div className="text-xs text-gray-500 text-right">
                        {file.size} | .{file.extension}
                    </div>
                    {/* Render the function buttons */}
                    <FunctionButtons
                        isOwner={isOwner}
                        viewingDeletedMedia={viewingDeletedMedia}
                        onAlert={onAlert}
                    />
                </div>
            </div>
        </FileContext.Provider>
    )
}

// Component to render the function buttons
const FunctionButtons = ({ isOwner, viewingDeletedMedia }) => {
    const { file } = useContext(FileContext)

    return (
        <div className="text-gray-500 text-right">
            {!viewingDeletedMedia && <MoveToFolderButton />}
            <DownloadButton />
            {isOwner && !viewingDeletedMedia ? (
                <>
                    <TrashButton />
                    <ShareButton />
                </>
            ) : (
                <>
                    <RestoreButton viewingDeletedMedia={viewingDeletedMedia} />
                    <ForceDeleteButton
                        viewingDeletedMedia={viewingDeletedMedia}
                    />
                </>
            )}
        </div>
    )
}

const MoveToFolderButton = () => {
    const { toggleModal, setTarget } = useContext(FileContext)

    return (
        <button
            onClick={() => {
                setTarget('move')
                toggleModal()
            }}>
            <FaFolder size={18} className="mr-2 hover:text-blue-500" />
        </button>
    )
}

// Download button component
const DownloadButton = () => {
    const { file } = useContext(FileContext)
    return (
        <button
            onClick={() => FileService.downloadFile(file.id, file.file_name)}>
            <FaDownload size={18} className="mr-2 hover:text-blue-500" />
        </button>
    )
}

// Trash button component
const TrashButton = () => {
    const { file, onAlert } = useContext(FileContext)

    const onDelete = async id => {
        try {
            await FileService.deleteFile(file.id)
            // Refresh files list after successful deletion
            window.dispatchEvent(new CustomEvent('fetchAllMedia'))
            onAlert({
                show: true,
                message: 'File successfully moved to trash.',
                type: 'success',
            })
        } catch (error) {
            console.error('Error deleting file:', error)
        }
    }
    return (
        <button className="mx-2" onClick={() => onDelete(file.id)}>
            <FaTrashAlt size={18} />
        </button>
    )
}

// Share button component
const ShareButton = () => {
    const { toggleModal, setTarget } = useContext(FileContext)
    return (
        <button
            onClick={() => {
                setTarget('share')
                toggleModal()
            }}>
            <FaShareAlt size={18} />
        </button>
    )
}

// Information icon component
const InformationIcon = ({ message }) => {
    const [isHovered, setIsHovered] = useState(false)
    const iconClass = isHovered ? 'text-yellow-400' : ''

    return (
        <div
            className={iconClass}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <FaInfoCircle size={18} />
            {isHovered && (
                <div className="absolute text-left w-64 p-2 bg-gray-900 rounded-md text-sm text-white">
                    {message}
                </div>
            )}
        </div>
    )
}

const RestoreButton = ({ viewingDeletedMedia }) => {
    const { file, onAlert } = useContext(FileContext)

    const onRestore = async id => {
        try {
            await FileService.restoreFile(id)
            // Refresh files list after successful restore
            window.dispatchEvent(new CustomEvent('fetchAllDeletedMedia'))
            onAlert({
                show: true,
                message: 'File successfully restored.',
                type: 'success',
            })
        } catch (error) {
            console.error('Error restoring file:', error)
        }
    }

    return (
        viewingDeletedMedia && (
            <button onClick={() => onRestore(file.id)}>
                <FaTrashRestoreAlt
                    size={18}
                    className="mr-2 hover:text-green-500"
                />
            </button>
        )
    )
}

const ForceDeleteButton = ({ viewingDeletedMedia }) => {
    const { file } = useContext(FileContext)
    const onForceDelete = async id => {
        try {
            await FileService.forceDelete(id)
            // Refresh files list after successful force delete
            window.dispatchEvent(new CustomEvent('fetchAllDeletedMedia'))
        } catch (error) {
            console.error('Error force deleting file:', error)
        }
    }

    return (
        viewingDeletedMedia && (
            <button onClick={() => onForceDelete(file.id)}>
                <FaBomb size={18} className="mr-2 hover:text-red-500" />
            </button>
        )
    )
}
