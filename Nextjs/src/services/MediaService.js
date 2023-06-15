import axios from '@/lib/axios'

class MediaService {
    static async getAllMedia() {
        return await axios.get('/api/media')
    }

    static async getAllDeletedMedia() {
        return await axios.get('/api/media/deleted')
    }

    static async getAllSharedMedia() {
        return await axios.get('/api/shared')
    }

    static async getMediaFolderItems(id) {
        return await axios.get(`/api/media/${id}`)
    }

    static async moveMediaToFolder(media, folder) {
        const formData = new FormData()
        formData.append('folder_id', folder)
        formData.append('_method', 'PATCH')

        if ('extension' in media) {
            return await axios.post(`/api/files/${media.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        } else {
            return await axios.post(`/api/folders/${media.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }
    }
}

export default MediaService
