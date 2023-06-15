import ApplicationLogo from '@/components/General/ApplicationLogo'
import AuthCard from '@/components/Auth/AuthCard'
import AuthSessionStatus from '@/components/Auth/AuthSessionStatus'
import Button from '@/components/Auth/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Auth/Input'
import InputError from '@/components/Auth/InputError'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <h1 className="text-sky-50 flex justify-center mt-2 mb-5">
                    Log into SkyVault
                </h1>
                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Input
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full border-2 text-sky-50"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full border-2 text-sky-50"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="block mt-4 ">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 border-1 shadow-neon shadow-blue-500 hover:shadow-neon-hover hover:shadow-blue-500 transition-shadow duration-100"
                                onChange={event =>
                                    setShouldRemember(event.target.checked)
                                }
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href="/auth/forgot-password"
                            className="underline text-sm text-sky-50 hover:text-sky-200">
                            Forgot your password?
                        </Link>

                        <Link
                            href="/auth/register"
                            className="underline text-sm text-sky-50 hover:text-sky-200">
                            Register
                        </Link>

                        <Button className="ml-3 hover:neon-hover">Login</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
