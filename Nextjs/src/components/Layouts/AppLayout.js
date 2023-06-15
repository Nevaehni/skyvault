import Navigation from '@/components/Layouts/Navigation'
import SideMenu from '@/components/Navigation/SideMenu'
import { useAuth } from '@/hooks/auth'

const AppLayout = props => {
    const {
        header,
        fetchAllMedia,
        fetchAllDeletedMedia,
        fetchAllSharedMedia,
        setActiveRoute,
        activeRoute,
        children,
    } = props
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 bg-gray-900">
            <Navigation user={user} />

            <div className="fixed top-14 w-full h-full flex justify-between">
                {/* Side Menu */}
                <SideMenu
                    fetchAllMedia={fetchAllMedia}
                    fetchAllDeletedMedia={fetchAllDeletedMedia}
                    fetchAllSharedMedia={fetchAllSharedMedia}
                    setActiveRoute={setActiveRoute}
                    activeRoute={activeRoute}
                />

                <div className="h-full w-0.5 border-r-2 shadow- shadow-neon shadow-blue-500 " />

                {/* Index Content */}
                <main className="h-full w-full">{children}</main>
            </div>
        </div>
    )
}

export default AppLayout
