import React from 'react'
import FileItem from './FileItem'
import FolderItem from './FolderItem'

function MediaTable({ files, viewingDeletedMedia, onAlert }) {
    const subfolders = files.subfolders || []
    const filesList = files.files || []

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {subfolders.map(folder => (
                <FolderItem
                    key={folder.id}
                    folder={folder}
                    viewingDeletedMedia={viewingDeletedMedia}
                    onAlert={onAlert}
                />
            ))}
            {filesList.map(file => (
                <FileItem
                    key={file.id}
                    file={file}
                    viewingDeletedMedia={viewingDeletedMedia}
                    onAlert={onAlert}
                />
            ))}
        </div>
    )
}

export default MediaTable
