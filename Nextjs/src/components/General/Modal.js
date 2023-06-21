import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
    let completeButtonRef = useRef()

    return (
      <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose} initialFocus={completeButtonRef}>
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

                  {/* Trick the browser into centering the modal contents. */}
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-gray-900 border-2 shadow-neon shadow-purple-500 rounded-md">
                          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                              {title}
                          </Dialog.Title>
                          <div className="mt-2">
                              {children}
                          </div>
                          <div className="mt-4">
                              <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-sky-50 border-2 shadow-neon shadow-red-500 rounded-md"
                                onClick={onClose}
                                ref={completeButtonRef}>
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
