import { useState } from 'react'
import axios from '@/lib/axios'

export default function FilesUploader(props) {
    const { onClose, setIsModalOpen } = props
    const [files, setFiles] = useState([])
    const [progress, setProgress] = useState(0)
    const [fileStatus, setFileStatus] = useState({})
    const [uploadDisabled, setUploadDisabled] = useState(false)

    const handleFileChange = event => {
        const fileList = Array.from(event.target.files)
        const maxSize = 1048576 * 10; // 10MB
        let isExceeded = false;

        fileList.forEach(file => {
            if (file.size > maxSize) {
                isExceeded = true;
                alert('File size exceeds the 10 MB limit. Please choose a smaller file.');
            }
        });

        if (!isExceeded) setFiles(fileList);
    }


    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const handleUpload = async () => {
        if (files.length < 1 || uploadDisabled) return
        setUploadDisabled(true)
        await csrf()
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append('files[' + i + ']', files[i])
        }

        try {
            const response = await axios.post('api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                    )
                    setProgress(percentCompleted)
                },
            })

            const fileStatuses = {}
            for (let i = 0; i < files.length; i++) {
                fileStatuses[files[i].name] = 'uploaded'
            }
            setFileStatus(fileStatuses)
        } catch (error) {
            const fileStatuses = {}
            for (let i = 0; i < files.length; i++) {
                fileStatuses[files[i].name] = 'failed'
            }
            setFileStatus(fileStatuses)
        }

        setProgress(100)

        const event = new CustomEvent('fetchAllMedia', {
            detail: 'Hello from child component!',
        })
        window.dispatchEvent(event)

        setTimeout(() => {
            setUploadDisabled(false)
            onClose()
            setIsModalOpen(false)
        }, 2000) // set the delay to 2 seconds
    }

    const handleClear = () => {
        setFiles([])
        setProgress(0)
        setFileStatus({})

        // Clear the `input` element by setting its `value` to an empty string
        const input = document.querySelector('input[type="file"]')
        if (input) {
            input.value = ''
        }
    }

    return (
        <div className="flex justify-center items-center h-auto">
            <div className="bg-gray-900 rounded-lg  w-96">
                <div className="max-h-40 overflow-y-auto mb-4 text-gray-100">
                    {files.map((file, index) => (
                        <div key={index}>
                            {file.name}{' '}
                            {fileStatus[file.name] && (
                                <span
                                    className={`text-${
                                        fileStatus[file.name] === 'uploaded'
                                            ? 'green'
                                            : 'red'
                                    }-500`}>
                                    {fileStatus[file.name].toUpperCase()}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-sky-50 py-2">Max 10 MB upload limit</div>
                <div className="relative border-2 border-gray-600 rounded-md p-4 text-gray-400">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 z-5"
                    />
                    <div className="flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 2h8a1 1 0 011 1v3a1 1 0 01-1 1H6a1 1 0 01-1-1V7a1 1 0 011-1zm0 5h8a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-1a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="ml-2">
                            {files.length} files selected
                        </span>
                    </div>
                </div>

                <progress
                    value={progress}
                    max="100"
                    className="block w-full my-4 rounded-full bg-gray-800 rounded-2xl">
                    {progress}%
                </progress>

                <div className="flex justify-center space-x-4">
                    <button
                        className="px-4 py-2 text-sky-50 font-medium border-2 shadow-neon shadow-green-500 rounded-md hover:shadow-neon-hover hover:shadow-green-500 transition-shadow duration-100"
                        onClick={handleUpload}>
                        Upload
                    </button>
                    <button
                        className="px-4 py-2 text-sky-50 font-medium border-2 shadow-neon shadow-teal-500 rounded-md hover:shadow-neon-hover hover:shadow-teal-500 transition-shadow duration-100"
                        onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </div>
        </div>
    )
}
