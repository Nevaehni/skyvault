import Link from 'next/link'

const ResponsiveNavLink = ({ active = false, children, ...props }) => (
  <Link
    {...props}
    className={`block pl-3 pr-4 py-2 text-base font-medium leading-5 ${
      active
        ? 'border-indigo-400 text-indigo-700 bg-indigo-50'
        : 'border-transparent text-gray-600'
    }`}
  >
      {children}
  </Link>
)

export const ResponsiveNavButton = props => (
  <button
    className="block w-full pl-3 pr-4 py-2 text-left text-base font-medium leading-5 border-b-2 border-blue-500 hover:border-blue-700"
    {...props}
  />
)

export default ResponsiveNavLink
