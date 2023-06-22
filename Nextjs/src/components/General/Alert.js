import React, { useEffect, useState } from 'react'

const Alert = ({ type = 'info', message, onClose }) => {
    const [visible, setVisible] = useState(true)
    const alertClasses = {
        info: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
            setTimeout(onClose, 200) // assuming the transition takes 200ms
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [onClose])

    return visible ? (
        <div
            className={`alert text-white px-6 py-4 border-0 rounded relative mb-4 ${alertClasses[type]}`}>
            <span className="text-xl inline-block mr-5 align-middle">
                <i className="fas fa-bell" />
            </span>
            <span className="inline-block align-middle mr-8">{message}</span>
            <button
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                onClick={onClose}>
                <span>×</span>
            </button>
            <style jsx>{`
                .alert {
                    transition: opacity 0.2s ease-in-out;
                }

                .alert.fade-out {
                    opacity: 0;
                }
            `}</style>
        </div>
    ) : null
}

export default Alert
