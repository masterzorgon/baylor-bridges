import React from "react";
import { ArrowSmLeftIcon } from "@heroicons/react/solid";

const Closed = () => {
    return (
        <div className="bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <div className="relative max-w-xl mx-auto">
                <svg className="absolute left-full transdiv translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <svg className="absolute right-full bottom-0 transdiv -translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>

                {/* Title and subtitle */}
                <div className="text-center">
                    <img
                        className="mx-auto h-9 w-auto"
                        src="/Baylor-University-Athletics-01.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-2 text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl">Sign up</h2>
                </div>

                <div className="mt-10 relative px-4 sm:px-6 lg:px-8">
                    <div className="text-lg max-w-prose mx-auto">
                        <h1>
                            <span className="block text-base text-center text-emerald-600 font-semibold tracking-wide uppercase">
                                Welcome Baylor Alumni!
                            </span>
                            <span className="mt-2 block text-2xl text-center leading-7 font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                We are glad to have you join us! Use this <a className="text-emerald-600 underline underline-offset-2" href="https://baylor.qualtrics.com/jfe/form/SV_8v5U3apajzQVm86">link</a> to sign up!
                            </span>
                        </h1>
                        {/* <p className="mt-8 text-sm text-gray-500 leading-7">
                            <strong> At the moment, self-sign up for alumni is closed. </strong>
                            We want to make sure only Baylor Alumni are admitted. 
                        </p> */}
                        <p className="mt-4 text-sm text-gray-500 leading-7">
                            We will get back to you in 24 Hours!
                            {/* If you are an alumni from Baylor University and wish to sign up for an account, please sign up <a className="text-emerald-600 underline underline-offset-2" href="https://baylor.qualtrics.com/jfe/form/SV_8v5U3apajzQVm86">here</a>. */}
                        </p>
                        <p className="mt-4 text-sm text-gray-500 leading-7">
                            If you are a current student at the Baylor University, please <a className="text-emerald-600 underline underline-offset-2" href="/sign-up"> sign up here</a>.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-sm text-center w-full grid place-items-center">
                    <a href="/" className="font-medium text-emerald-600 hover:text-emerald-500 flex items-center space-x-0.5">
                        <ArrowSmLeftIcon className="h-4 w-4" />
                        <span>Go back home</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Closed;