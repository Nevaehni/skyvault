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

const PasswordReset = () => {
    const router = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

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
                    Password Reset
                </h1>
                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Input
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full text-sky-50"
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
                            className="block mt-1 w-full text-sky-50"
                            onChange={event => setPassword(event.target.value)}
                            required
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
                            placeholder="Confirm Password"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full text-sky-50"
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

                    <div className="flex items-center justify-end mt-4">
                        <Button>Reset Password</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default PasswordReset
