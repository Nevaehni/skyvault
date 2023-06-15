import { useAuth } from '@/hooks/auth'

export const userIsOwnerOfMedia = media => {
    const { user } = useAuth()
    return media.user_id === user.id
}
