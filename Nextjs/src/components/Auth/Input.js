const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} rounded-md border-gray-300 focus:border-indigo-300 bg-transparent shadow-neon shadow-blue-500 hover:shadow-neon-hover hover:shadow-blue-500 transition-shadow duration-100`}
        {...props}
    />
)

export default Input
