/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function SignInRequiredModal() {
    const [open, setOpen] = useState(true);
    const [signInUrl, setSignInUrl] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        query.set("redirect", window.location.pathname);
        setSignInUrl(`/sign-in?${query.toString()}`);
    }, []);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-5 inset-0 overflow-y-auto" onClose={() => setOpen(true)}>
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
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-10 transition-opacity" />
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
                        <div className="w-full inline-block bg-white rounded-lg p-4 text-left shadow-xl transform transition-all sm:my-8 align-middle sm:max-w-lg sm:w-full sm:p-6 space-y-4">
                            <div>
                                <img
                                    className="mx-auto h-12 w-auto my-2"
                                    src="/Baylor-University-Athletics-01.svg"
                                    alt="Workflow"
                                />
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h2" className="text-lg leading-6 font-medium text-gray-900">
                                        Join Baylor Bridges Today
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Be a part of the community, start expanding your network with everyone else.
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 space-y-2">
                                <a
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:col-start-2 sm:text-sm"
                                    href={signInUrl}
                                >
                                    Sign in to continue
                                </a>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
