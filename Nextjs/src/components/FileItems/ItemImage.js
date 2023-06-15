import { useEffect, useState } from 'react'
import axios from 'lib/axios'
import ModalImage from 'react-modal-image'

const ItemImage = ({ mediaId, fileName }) => {
    const defaultImage =
        'https://drive-thirdparty.googleusercontent.com/128/type/application/vnd.google-apps.document'
    const [thumbSrcUrl, setThumbSrcUrl] = useState(
        () => localStorage.getItem(`thumb_${mediaId}`) || defaultImage,
    )
    const [imageSrcUrl, setImageSrcUrl] = useState(
        () => localStorage.getItem(`image_${mediaId}`) || defaultImage,
    )

    useEffect(() => {
        const imageEndpoints = [
            `api/media/thumbnail/${mediaId}`,
            `api/media/image/${mediaId}`,
        ]

        const fetchImage = (url, setImage, key) => {
            axios
                .get(url, { responseType: 'arraybuffer' })
                .then(response => {
                    const imageBlob = new Blob([response.data], {
                        type: 'image/jpeg',
                    })
                    const imageUrl = URL.createObjectURL(imageBlob)
                    setImage(imageUrl)
                    localStorage.setItem(key, imageUrl)
                })
                .catch(error => {
                    console.error(
                        'There has been a problem with your fetch operation: ',
                        error,
                    )
                    setImage(defaultImage)
                })
        }

        Promise.all([
            fetchImage(imageEndpoints[0], setThumbSrcUrl, `thumb_${mediaId}`),
            fetchImage(imageEndpoints[1], setImageSrcUrl, `image_${mediaId}`),
        ])
    }, [mediaId])

    return (
        <>
            <ModalImage
                small={thumbSrcUrl}
                smallSrcSet={thumbSrcUrl}
                large={imageSrcUrl}
                showRotate={true}
                alt={fileName}
            />
        </>
    )
}

export default ItemImage
