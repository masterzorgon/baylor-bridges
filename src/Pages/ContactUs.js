import React from "react";
import { MailIcon } from "@heroicons/react/outline";

export default function ContactUs() {
    return (
        <div className="bg-white">
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-3xl">Contact Us</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:mt-2">
                        We would love to hear from you!
                    </p>
                </div>
                <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
                    <div>
                        <h2 className="text-lg sm:text-lg font-semibold text-gray-900">Program Support</h2>
                        <div className="mt-3">
                            <p className="text-md sm:text-sm text-gray-500">
                                Please contact program support if you have any questions regarding the Baylor Bridges program, student pillars and relations, or apply to join the program. Our coordinators are available to help you with any questions you may have.
                            </p>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MailIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-1.5 text-md text-gray-900">
                                    <p>baylorbridges@baylor.edu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 sm:mt-16 md:mt-0">
                        <h2 className="text-lg sm:text-lg font-semibold text-gray-900">Technical Support</h2>
                        <div className="mt-3">
                            <p className="text-md sm:text-sm text-gray-500">
                                Please contact technical support if you encountered any technical issues or have any other technical inqueries regarding our web application. Our technical directors are happy to help you.
                            </p>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MailIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-1.5 text-md text-gray-900">
                                    <p>baylorbridges@outlook.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

