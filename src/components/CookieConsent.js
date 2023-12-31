import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function CookieConsent() {
    const [cookieConsent, setcookieConsent] = useState(true);

    useEffect(() => {
        setcookieConsent(localStorage["cookieConsent"] ? true : false);
        console.log("already visited? " + cookieConsent + " " + localStorage["cookieConsent"]);
    }, [cookieConsent]);


    return (
        <>
            {/* first time visitor pop up */}
            <div aria-live="assertive"
                className="fixed w-full bottom-0 right-0 py-6 px-4 pointer-events-none"
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
                                            We use cookies to improve the user experience on our site. To find out more, read our{" "}
                                            <Link to="/terms/privacy-policy" className="underline" target="_blank" rel="noopener noreferrer">
                                                privacy policy</Link>
                                            {" "}and{" "}
                                            <Link to="/terms/cookies-policy" className="underline" target="_blank" rel="noopener noreferrer">cookie policy</Link>.
                                        </p>
                                        <div className="mt-3 flex space-x-7">
                                            <button
                                                type="button"
                                                className="bg-white rounded-md text-sm font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                onClick={() => {
                                                    localStorage["cookieConsent"] = true;
                                                    setcookieConsent(true);
                                                }}
                                            >
                                                Accept
                                            </button>

                                            <button
                                                type="button"
                                                className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                onClick={() => window.location.href = "https://www.google.com"}

                                            >
                                                Decline
                                            </button>
                                        </div>
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