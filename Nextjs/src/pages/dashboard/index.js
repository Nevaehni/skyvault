import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import MediaService from '@/services/MediaService'
import AppLayout from '@/components/Layouts/AppLayout'
import MediaTable from '@/components/FileItems/MediaTable'
import Alert from '@/components/General/Alert'
import SearchBar from '@/components/General/SearchBar'
import FileService from '@/services/FileService'
import Filter from '@/components/FileItems/Filter'

const Index = () => {
    const [files, setFiles] = useState([])
    const [activeRoute, setActiveRoute] = useState(0)
    const [alert, setAlert] = useState({ show: false, type: '', message: '' })
    const [filter, setFilter] = useState({ size: '', created_at: '', type: '' })

    useEffect(() => {
        let folderId = window.location.href.match(/dashboard\/(\d+)$/)?.[1]

        if (folderId) {
            fetchMedia(MediaService.getMediaFolderItems, folderId)
        } else {
            fetchMedia(MediaService.getAllMedia)
        }

        const events = [
            { name: 'fetchAllMedia', callback: fetchAllMedia },
            {
                name: 'fetchAllMediaFolderItems',
                callback: folderId => fetchAllMediaFolderItems(folderId),
            },
            { name: 'fetchAllSharedMedia', callback: fetchAllSharedMedia },
            { name: 'fetchAllSharedMedia', callback: fetchAllSharedMedia },
            { name: 'fetchAllDeletedMedia', callback: fetchAllDeletedMedia },
        ]

        events.forEach(event => {
            window.addEventListener(event.name, e =>
                event.callback(e.detail?.folderId),
            )
            return () =>
                window.removeEventListener(event.name, e =>
                    event.callback(e.detail?.folderId),
                )
        })
    }, [])

    const fetchMedia = async (api, id) => {
        setFiles([])
        const response = await api(id)
        if (response?.data) {
            setFiles(response.data)
        }
    }

    const fetchAllMedia = () => fetchMedia(MediaService.getAllMedia)
    const fetchAllDeletedMedia = () =>
        fetchMedia(MediaService.getAllDeletedMedia)
    const fetchAllSharedMedia = () => fetchMedia(MediaService.getAllSharedMedia)
    const fetchAllMediaFolderItems = folderId =>
        fetchMedia(() => MediaService.getMediaFolderItems(folderId))

    const handleSearch = async searchTerm => {
        if (searchTerm.trim() === '') {
            // Fetch all items
            fetchAllMedia()
        } else {
            const results = await FileService.searchFiles(searchTerm)
            if (results?.data) {
                setFiles(results.data)
            } else {
                console.log('No search results')
            }
        }
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
            fetchAllMedia={fetchAllMedia}
            fetchAllDeletedMedia={fetchAllDeletedMedia}
            fetchAllSharedMedia={fetchAllSharedMedia}
            setActiveRoute={setActiveRoute}
            activeRoute={activeRoute}>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    {alert.show && (
                        <div className="mb-4">
                            <Alert
                                type={alert.type}
                                message={alert.message}
                                onClose={() =>
                                    setAlert({ ...alert, show: false })
                                }
                            />
                        </div>
                    )}
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center p-3 text-sky-50 font-medium">
                            <Filter
                                setFiles={setFiles}
                                filter={filter}
                                setFilter={setFilter}
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                    </div>

                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 min-h-[32rem] bg-gray-800">
                            <MediaTable
                                files={files}
                                viewingDeletedMedia={activeRoute === 1}
                                onAlert={setAlert}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Index
