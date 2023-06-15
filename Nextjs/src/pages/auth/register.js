import ApplicationLogo from '@/components/General/ApplicationLogo'
import AuthCard from '@/components/Auth/AuthCard'
import Button from '@/components/Auth/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Auth/Input'
import InputError from '@/components/Auth/InputError'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
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
                <h1 className="text-sky-50 flex justify-center mt-2 mb-5">
                    Create an account
                </h1>
                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div>
                        <Input
                            id="name"
                            placeholder="Name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full border-2 shadow-neon shadow-blue-500 bg-transparent text-sky-50"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <Input
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full border-2 shadow-neon shadow-blue-500 bg-transparent text-sky-50"
                            onChange={event => setEmail(event.target.value)}
                            required
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
                            className="block mt-1 w-full border-2 shadow-neon shadow-blue-500 bg-transparent text-sky-50"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Input
                            id="passwordConfirmation"
                            placeholder="Repeat Password"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full border-2 shadow-neon shadow-blue-500 bg-transparent text-sky-50"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />

                        <InputError
                            messages={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href="/auth/login"
                            className="underline text-sm text-sky-50 hover:text-sky-200">
                            Already registered?
                        </Link>

                        <Button className="ml-4">Register</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Register
