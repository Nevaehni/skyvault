import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

const Trashcan = () => {
    // Initialize state variable "files" and its setter function "setFiles" using the useState hook
    const [files, setFiles] = useState([])

    // Define a function to fetch all files using the axios library
    const fetchAllMedia = async () => {
        // Send a GET request to the "/api/files" endpoint and wait for the response
        const response = await axios.get('/api/media')
        // Set the state variable "files" to the data returned by the server
        setFiles(response.data)
    }

    // Use the useEffect hook to fetch all files when the component mounts
    useEffect(() => {
        // Call the "fetchAllMedia" function to fetch all files
        fetchAllMedia()
        // Add an event listener to the window object to fetch all files when triggered
        window.addEventListener('fetchAllMedia', fetchAllMedia)
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('fetchAllMedia', fetchAllMedia)
        }
    }, [])

    // Render the component
    return (
        // Render the AppLayout component, which provides a layout for the entire application
        <AppLayout
            header={
                // Render a header for the page
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            {/* Render the Head component to set the page title */}
            <Head>
                <title>Dashboard</title>
            </Head>

            {/* Render the main content of the page */}
            <div className="py-12">
                <div className=" mx-auto sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 h-full bg-gray-800">
                            {/* Render the FileItemsTable component to display a table of all files */}
                            {/*<FileItemsTable files={files} />*/}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Trashcan
