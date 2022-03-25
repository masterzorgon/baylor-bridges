import React, { useEffect,useState } from "react";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
export default function CookieConsent() {
    const [cookieConsent,setcookieConsent]=useState(null);

    useEffect(() => {
        setcookieConsent(localStorage["cookieConsent"]?true:false);
        console.log("already visited? " + cookieConsent+" "+localStorage["cookieConsent"]);



    }, [cookieConsent]);

    
    return (
        <>
            {/* first time visitor pop up */}
            <div aria-live="assertive"
                className="sticky inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={!cookieConsent}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-visible">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <ExclamationIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Cookie Alert</p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            We use cookies to improve the user experience on our site. To find out more, read our<a
                                                href="/terms/privacy-policy" className="underline" target="_blank" rel="noopener noreferrer">
                                                privacy policy</a> and <a
                                                href="/terms/cookies-policy" className="underline" target="_blank" rel="noopener noreferrer">
                                                cookie policy</a>
                                        </p>
                                        <div className="mt-3 flex space-x-7">
                                            <button
                                                type="button"
                                                className="bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => {
                                                    console.log("click accept");
                                                    localStorage["cookieConsent"]=true;
                                                    setcookieConsent(true);
                                                }}
                                            >
                                                Accept
                                            </button>

                                            {/* TODO : what if user decline? */}
                                            <button
                                                type="button"
                                                className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                    {/* <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                setShow(false);
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            {/* <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>

    );

}