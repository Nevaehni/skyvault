import axios from '@/lib/axios'

class FolderService {
    static async getAllFolders() {
        return await axios.get('/api/folders/all')
    }

    static async getAllDeletedFolders() {
        return await axios.get('/api/folders/deleted')
    }

    static async getAllSharedFolders() {
        return await axios.get('/api/shared')
    }

    static async deleteFolder(id) {
        return await axios.delete(`/api/folders/${id}`)
    }

    static async restoreFolder(id) {
        return await axios.patch(`/api/folders/restore/${id}`)
    }

    static async forceDelete(id) {
        return await axios.delete(`/api/folders/${id}`)
    }

    static async createFolder(name, parent_id) {
        return await axios.post('/api/folders', { name, parent_id })
    }

    static async shareFolder(id, email) {
        return await axios.post(`/api/folders/${id}/share`, { email })
    }

    static async unshareFolder(id, email) {
        return await axios.delete(`/api/folders/${id}/unshare/${email}`)
    }

    static async downloadFolder(id, folderName) {
        const response = await axios.get(`/api/folders/${id}/download`, {
            responseType: 'arraybuffer',
        })
        const url = URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.download = folderName + '.zip'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }
}

export default FolderService
