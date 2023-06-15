const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${className} inline-flex px-4 py-2 border-2 shadow-neon shadow-red-500 rounded-md font-semibold text-xs text-sky-50 uppercase tracking-widest hover:shadow-neon-hover hover:shadow-red-500 transition-shadow duration-100`}
        {...props}
    />
)

export default Button
