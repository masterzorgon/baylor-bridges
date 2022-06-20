import React from "react";
import { MailIcon } from "@heroicons/react/outline";

export default function ContactUs() {
    return (
        <div className="bg-white">
            <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl">Contact Us</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        We would love to hear from you!
                    </p>
                </div>
                <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
                    <div>
                        <h2 className="text-xl font-medium text-gray-900 sm:text-2xl">Program Support</h2>
                        <div className="mt-3">
                            <p className="text-md text-gray-500">
                                Please contact program support if you have any questions regarding the Baylor Bridges program, student pillars and relations, or apply to join the program. Our coordinators are available to help you with any questions you may have.
                            </p>
                        </div>
                        <div className="mt-9">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <MailIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3 text-base text-gray-500">
                                    <p>baylorbridges@baylor.edu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 sm:mt-16 md:mt-0">
                        <h2 className="text-xl font-medium text-gray-900 sm:text-2xl">Technical Support</h2>
                        <div className="mt-3">
                            <p className="text-md text-gray-500">
                                Please contact technical support if you encountered any technical issues or have any other technical inqueries regarding our web application. Our technical directors are happy to help you.
                            </p>
                        </div>
                        <div className="mt-9">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <MailIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3 text-base text-gray-500">
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

