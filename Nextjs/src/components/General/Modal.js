import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-30 overflow-y-auto"
                onClose={onClose}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 border-2 shadow-neon shadow-purple-500 rounded-md hover:shadow-neon-hover hover:shadow-purple-500 transition-shadow duration-100">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900">
                                {title}
                            </Dialog.Title>
                            <div className="mt-2">{children}</div>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-sky-50 border-2 shadow-neon shadow-red-500 rounded-md hover:shadow-neon-hover hover:shadow-red-500 transition-shadow duration-100"
                                    onClick={onClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
