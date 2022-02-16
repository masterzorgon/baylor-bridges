import React from "react";
import {ArrowSmRightIcon} from "@heroicons/react/solid";

const NotFound = () => {
    return (
        <>
            <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
                <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-20">
                        <div className="text-center">
                            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">404 error</p>
                            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
                            <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                            <div className="mt-6 w-full grid place-items-center">
                                <a href="/" className="text-base font-medium text-emerald-600 hover:text-emerald-500 flex items-center space-x-0.5">
                                    <span>Go back home</span>
                                    <ArrowSmRightIcon className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default NotFound;