import React from "react";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";


export default function DeletePublicationAlert({ setPublicationDelete, publicationDelete }) {

    const handleDeletePublication = event => {
        event.preventDefault();
    };
        
    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="fixed inset-20 flex items-end px-4 py-6 sm:p-6 sm:items-start"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={publicationDelete}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-sm rounded-lg pointer-events-auto ring-1 ring-gray-500 ring-opacity-5 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <ExclamationIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Delete this publication?</p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        {/* DELETE AND CANCEL BUTTON */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-5 h-5 w-5 text-gray-500 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                            onClick={handleDeletePublication}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>

                                        <button
                                            className="bg-white rounded-md inline-flex text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                            onClick={() => setPublicationDelete(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    );
}