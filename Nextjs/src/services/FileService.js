import axios from '@/lib/axios'

class FileService {
    static async getAllFiles() {
        return await axios.get('/api/files')
    }

    static async getAllDeletedFiles() {
        return await axios.get('/api/files/deleted')
    }

    static async getAllSharedFiles() {
        return await axios.get('/api/shared')
    }

    static async deleteFile(id) {
        return await axios.delete(`/api/files/${id}`)
    }

    static async restoreFile(id) {
        return await axios.patch(`/api/files/restore/${id}`)
    }

    static async forceDelete(id) {
        return await axios.delete(`/api/files/force-delete/${id}`)
    }

    static async downloadFile(id, fileName) {
        const response = await axios.get(`/api/files/download/${id}`, {
            responseType: 'blob',
        })
        const url = URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    static async searchFiles(searchTerm) {
        return await axios.get(`/api/search/${searchTerm}`)
    }
}

export default FileService
