/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

export default function SignInRequiredModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 50);
    }, []);

    return (
        <Transition.Root show={open} as={Fragment}>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-100 bg-opacity-100 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
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
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="w-full inline-block bg-white rounded-lg p-4 text-left shadow transform sm:my-8 align-middle sm:max-w-lg sm:w-full sm:p-6 space-y-4">
                            <div>
                                <div className="flex justify-center">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/tdrtiskw.json"
                                        trigger=""
                                        style={{ width: "8rem", height: "8rem" }}
                                    >
                                    </lord-icon>
                                </div>
                                <div className="my-3 text-center sm:mt-5">
                                    <div as="h2" className="text-lg leading-6 font-medium text-gray-900">
                                        Oops, something is missing.
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Please check the URL, or come back and try again later.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Transition.Root>
    );
}
