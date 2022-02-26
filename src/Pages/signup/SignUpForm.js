import React, { useState } from "react";
import { MailIcon, ArrowSmRightIcon } from "@heroicons/react/outline";

const SignUpForm = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    console.log(setLoading, setEmail, email, currentStep, setCurrentStep, loading);

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
                        className="mx-auto h-16 w-auto"
                        src="/Baylor-University-Athletics-01.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">Sign up</h2>
                </div>


                <div className="mt-10 px-5 md:mt-6 md:bg-white md:shadow md:rounded-lg md:px-8 md:py-8 md:-mx-8">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Your email address</h3>
                    <p className="mt-1 text-sm font-medium mb-4 text-gray-500">Please use your Baylor University student email to sign up as a current student.</p>
                    <div className="mt-4 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="you@baylor.edu"
                        />
                    </div>

                    <div className="mt-6 text-sm text-right w-full grid place-items-end">
                        <button
                            type="button"
                            className="text-sm flex items-center space-x-0.5 px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            {
                                loading &&
                                <svg className="pointer-events-none animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fillOpacity="0"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            }
                            {
                                !loading &&
                                <>
                                    <span>Next</span>
                                    <ArrowSmRightIcon className="h-4 w-4" />
                                </>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;