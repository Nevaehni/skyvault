import { useEffect } from 'react';
import ApplicationLogo from '@/components/General/ApplicationLogo'
import Dropdown from '@/components/Navigation/Dropdown'
import Link from 'next/link'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/Navigation/ResponsiveNavLink'
import { DropdownButton } from '@/components/Navigation/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import FileService from "@/services/FileService";

const Navigation = ({ user: initialUser }) => {

    const router = useRouter()
    const { logout } = useAuth()
    const [open, setOpen] = useState(false)
    const goToAdminDashboard = () => {
        router.push('/admin');
    };

    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await FileService.getCurrentUser();
            setUser(res.data);
        };
        fetchUser();
    }, []);


    return (
      <nav className="w-full flex flex-col items-center justify-between z-6 bg-gray-900 z-50">
          <div className="flex w-full flex flex-col items-center justify-between">
              {/* Primary Navigation Menu */}
              <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                      <div className="flex">
                          {/* Logo */}
                          <div className="flex-shrink-0 flex items-center text-sky-50">
                              <Link href="/dashboard/index">
                                  <ApplicationLogo className="block h-10 w-auto fill-current text-sky-50" />
                              </Link>
                          </div>
                        </div>

                        {/* Settings Dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6 text-sky-50">
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out text-sky-50">
                                        <div>{user?.name}</div>

                                    <div className="ml-1">
                                        <svg
                                          className="fill-current h-4 w-4"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20">
                                            <path
                                              fillRule="evenodd"
                                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }>
                              {/* Authentication */}
                              {user ? (
                                user.is_admin ? (
                                  <DropdownButton onClick={goToAdminDashboard}>
                                      Admin Dashboard
                                  </DropdownButton>
                                ) : null
                              ) : null}

                              {/* Authentication */}
                              <DropdownButton onClick={logout}>
                                  Logout
                              </DropdownButton>
                          </Dropdown>
                      </div>

                        {/* Hamburger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setOpen(open => !open)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    {open ? (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Navigation Menu */}
                {open && (
                    <div className="block sm:hidden">

                        {/* Responsive Settings Options */}
                        <div className="pt-4 pb-1 border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="">
                                    <div className="font-medium text-base text-sky-50">
                                        {user?.name}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                {/* Authentication */}
                                {user ? (
                                  user.is_admin ? (
                                    <ResponsiveNavButton onClick={goToAdminDashboard}>
                                        <span className="text-sky-50">Admin Dashboard</span>
                                    </ResponsiveNavButton>
                                  ) : null
                                ) : null}

                                <ResponsiveNavButton onClick={logout}>
                                    <span className="text-sky-50">Logout</span>
                                </ResponsiveNavButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="h-0.5 w-full border-b-2 shadow-neon shadow-blue-500" />
        </nav>
    )
}

export default Navigation
