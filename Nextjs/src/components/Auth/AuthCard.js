const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-900">
        <div className="w-full sm:max-w-md px-6 py-4 overflow-hidden sm:rounded-lg border-2 shadow-neon shadow-blue-500">
            <div className="flex justify-center">{logo}</div>
            {children}
        </div>
    </div>
)

export default AuthCard
