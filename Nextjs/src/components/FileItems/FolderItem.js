import React, { createContext, useContext, useState } from 'react'
import {
    FaBomb,
    FaDownload,
    FaFolder,
    FaInfoCircle,
    FaShareAlt,
    FaTrashAlt,
    FaTrashRestoreAlt,
} from 'react-icons/fa'
import Modal from '@/components/General/Modal'
import ShareComponent from '@/components/ShareComponent'
import { userIsOwnerOfMedia } from '@/hooks/userIsOwnerOfMedia'
import FolderService from '@/services/FolderService'
import MoveMediaComponent from '@/components/MoveMediaComponent'

const FolderContext = createContext()

function FolderItem({ folder, viewingDeletedMedia, onAlert }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [target, setTarget] = useState('')
    const isOwner = userIsOwnerOfMedia(folder)

    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState)
    }

    const contextValue = {
        folder: folder,
        toggleModal,
        setTarget,
        onAlert,
    }

    function navigateToFolder(folderId) {
        const event = new CustomEvent('fetchAllMediaFolderItems', {
            detail: { folderId },
        })
        window.dispatchEvent(event)

        window.history.pushState(null, null, `/dashboard/${folderId}`)
    }

    return (
        <FolderContext.Provider value={contextValue}>
            <div className="bg-gray-900 rounded-md text-sky-50 border-2 shadow-neon shadow-purple-500 rounded-md">
                {!isOwner && folder.user_id != null && (
                    <div className="relative ">
                        <div className={'relative float-right mt-2 mr-2'}>
                            <InformationIcon
                                message={
                                    'The owner TODO has shared this with you.'
                                }
                            />
                        </div>
                    </div>
                )}
                <div className="p-2 pt-8 ">
                    <div
                        className="flex items-center justify-center mb-6 hover:cursor-pointer"
                        onClick={() => navigateToFolder(folder.id)}>
                        <div className="w-20 h-10 rounded-md flex items-center justify-center">
                            <FaFolder size={60} />
                        </div>
                    </div>
                    <div className="text-sm font-medium truncate">
                        {folder.name}
                    </div>
                </div>

                {/* Render the modal with the ShareComponent */}
                <Modal isOpen={isModalOpen} onClose={toggleModal}>
                    {target === 'share' && <ShareComponent file={folder} />}
                    {target === 'move' && <MoveMediaComponent media={folder} />}
                </Modal>

                <div className="bg-gray-800 p-2 shadow-neon shadow-purple-500">
                    <div className="text-xs text-gray-500 text-right">
                        Folder
                    </div>
                    <FunctionButtons
                        isOwner={isOwner}
                        viewingDeletedMedia={viewingDeletedMedia}
                        onAlert={onAlert}
                    />
                </div>
            </div>
        </FolderContext.Provider>
    )
}

const FunctionButtons = ({ isOwner, viewingDeletedMedia }) => {
    const { folder } = useContext(FolderContext)

    return (
        <div className="text-gray-500 text-right">
            <MoveToFolderButton viewingDeletedMedia={viewingDeletedMedia} />
            <DownloadButton />
            {/* Conditionally render TrashButton and ShareButton if the user is the owner */}
            {isOwner && !viewingDeletedMedia ? (
                <>
                    <TrashButton />
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

const MoveToFolderButton = ({ viewingDeletedMedia }) => {
    const { toggleModal, setTarget } = useContext(FolderContext)

    // Return null (don't render the button) when viewingDeletedMedia is true
    if (viewingDeletedMedia) {
        return null
    }

    return (
        <button
            onClick={() => {
                toggleModal()
                setTarget('move')
            }}>
            <FaFolder size={18} className="mr-2 hover:text-blue-500" />
        </button>
    )
}

const DownloadButton = () => {
    const { folder } = useContext(FolderContext)

    return (
        <button
            onClick={() =>
                FolderService.downloadFolder(folder.id, folder.name)
            }>
            <FaDownload size={18} className="mr-2 hover:text-blue-500" />
        </button>
    )
}

const TrashButton = () => {
    const { folder, onAlert } = useContext(FolderContext)
    const onDelete = async id => {
        try {
            await FolderService.deleteFolder(folder.id)
            window.dispatchEvent(new CustomEvent('fetchAllMedia'))
            onAlert({
                show: true,
                message: 'Folder successfully moved to trash.',
                type: 'success',
            })
        } catch (error) {
            console.error('Error deleting folder:', error)
        }
    }

    return (
        <button className="mx-2" onClick={() => onDelete(folder.id)}>
            <FaTrashAlt size={18} />
        </button>
    )
}

const ShareButton = () => {
    const { toggleModal } = useContext(FolderContext)

    return (
        <button onClick={toggleModal}>
            <FaShareAlt size={18} />
        </button>
    )
}

const InformationIcon = ({ message }) => {
    const [isHovered, setIsHovered] = useState(false)
    const iconClass = isHovered ? 'text-yellow-400' : ''

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <FaInfoCircle size={18} className={iconClass} />
            {isHovered && (
                <div className="absolute text-left w-64 p-2 bg-gray-900 rounded-md text-sm text-white">
                    {message}
                </div>
            )}
        </div>
    )
}

const RestoreButton = ({ viewingDeletedMedia }) => {
    const { folder, onAlert } = useContext(FolderContext)

    const onRestore = async id => {
        try {
            await FolderService.restoreFolder(id)
            window.dispatchEvent(new CustomEvent('fetchAllDeletedMedia'))
            onAlert({
                show: true,
                message: 'Folder successfully restored.',
                type: 'success',
            })
        } catch (error) {
            console.error('Error restoring folder:', error)
        }
    }

    return (
        viewingDeletedMedia && (
            <button onClick={() => onRestore(folder.id)}>
                <FaTrashRestoreAlt
                    size={18}
                    className="mr-2 hover:text-green-500"
                />
            </button>
        )
    )
}

const ForceDeleteButton = ({ viewingDeletedMedia }) => {
    const { folder } = useContext(FolderContext)

    const onForceDelete = async id => {
        try {
            await FolderService.forceDelete(id)
            window.dispatchEvent(new CustomEvent('fetchAllDeletedMedia'))
        } catch (error) {
            console.error('Error force deleting folder:', error)
        }
    }

    return (
        viewingDeletedMedia && (
            <button onClick={() => onForceDelete(folder.id)}>
                <FaBomb size={18} className="mr-2 hover:text-red-500" />
            </button>
        )
    )
}

export default FolderItem
