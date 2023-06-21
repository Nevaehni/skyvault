import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Modal from '@/components/General/Modal'
import FilesUploader from '@/components/FilesUploader'
import FolderCreator from '@/components/FolderCreator'
import { FaCloudUploadAlt, FaFolderPlus } from 'react-icons/fa'

const SideMenu = props => {
    const {
        fetchAllMedia,
        fetchAllDeletedMedia,
        fetchAllSharedMedia,
        setActiveRoute,
        activeRoute,
    } = props

    // State hook for managing modal open/close state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [target, setTarget] = useState('')
    const [activeButton, setActiveButton] = useState(null)

    // Function to open the modal, setting isModalOpen to true
    const handleOpenModal = target => {
        setIsModalOpen(true)
        setTarget(target)
    }

    // Function to close the modal, setting isModalOpen to false
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleDashboardContent = key => {
        switch (key) {
            case 0:
                fetchAllMedia()
                break
            case 1:
                fetchAllDeletedMedia()
                break
            case 2:
                fetchAllSharedMedia()
                break
            default:
                fetchAllMedia()
                break
        }
        setActiveRoute(key)
        setActiveButton(key)
    }

    const isMobile = useMediaQuery({ maxWidth: 640 })

    const navigationButtonClickedClasses =
        'w-full text-sky-50 border-1 shadow-neon shadow-green-300 rounded-md hover:shadow-neon-hover hover:shadow-green-300 transition-shadow duration-100'

    return (
        <aside className="flex flex-col justify-between hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-sky-50 transition-all duration-300 p-1">
            <div className="mx-auto py-6 sm:px-6 lg:px-8">
                {isMobile ? (
                    <button
                        className="flex justify-center py-2 px-4 w-full text-sky-50 border-2 shadow-neon shadow-green-500 rounded-md hover:shadow-neon-hover hover:shadow-green-500 transition-shadow duration-100"
                        onClick={() => handleOpenModal('upload')}>
                        <FaCloudUploadAlt />
                    </button>
                ) : (
                    <button
                        className="py-2 px-4 w-full text-sky-50 border-2 shadow-neon shadow-green-500 rounded-md hover:shadow-neon-hover hover:shadow-green-500 transition-shadow duration-100"
                        onClick={() => handleOpenModal('upload')}>
                        Upload
                    </button>
                )}

                {isMobile ? (
                    <button
                        className="flex justify-center py-2 mt-2 px-4 w-full text-sky-50 border-2 shadow-neon shadow-blue-500 rounded-md hover:shadow-neon-hover hover:shadow-blue-500 transition-shadow duration-100"
                        onClick={() => handleOpenModal('folder')}>
                        <FaFolderPlus />
                    </button>
                ) : (
                    <button
                        className="py-2 mt-2 px-4 w-full text-sky-50 border-2 shadow-neon shadow-blue-500 rounded-md hover:shadow-neon-hover hover:shadow-blue-500 transition-shadow duration-100"
                        onClick={() => handleOpenModal('folder')}>
                        Create folder
                    </button>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    setIsModalOpen={setIsModalOpen}>
                    {/* Render the FilesUploader component to allow users to upload files */}
                    {target === 'upload' && (
                        <FilesUploader
                            onClose={handleCloseModal}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                    {target === 'folder' && (
                        <FolderCreator
                            onClose={handleCloseModal}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                </Modal>

                <div
                    className={`p-2 mt-2 text-center ${
                        activeButton === 0 ? navigationButtonClickedClasses : ''
                    }`}>
                    <button
                        className="text-sm"
                        onClick={() => handleDashboardContent(0)}>
                        Files
                    </button>
                </div>

                <div
                    className={`p-2 mt-2 text-center ${
                        activeButton === 2 ? navigationButtonClickedClasses : ''
                    }`}>
                    <button
                        className="text-sm"
                        onClick={() => handleDashboardContent(2)}>
                        Shared files
                    </button>
                </div>

                <div
                    className={`p-2 mt-2 text-center ${
                        activeButton === 1 ? navigationButtonClickedClasses : ''
                    }`}>
                    <button
                        className="text-sm"
                        onClick={() => handleDashboardContent(1)}>
                        Trashcan
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default SideMenu
