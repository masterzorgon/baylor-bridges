/* This example requires Tailwind CSS v2.0+ */
import { MailIcon } from "@heroicons/react/outline";
import React from "react";

export default function ContactUs() {
    return (
        <>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Baylor Bridges Team</h2>
                            <div className="mt-3">
                                <p className="text-lg text-gray-500">
                                    Have a question about Baylor Bridges? Contact us by sending a message!
                                </p>
                            </div>
                            <div className="mt-9">
                                <div className="flex">
                                    {/* <div className="flex-shrink-0">
                                        <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 text-base text-gray-500">
                                        <p>+1 (555) 123 4567</p>
                                        <p className="mt-1">Mon-Sun 10 am to </p>
                                    </div> */}
                                </div>
                                <div className="mt-6 flex">
                                    <div className="flex-shrink-0">
                                        <MailIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 text-base text-gray-500">
                                        <p>baylorbriges@baylor.edu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 sm:mt-16 md:mt-0">
                            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Technical Support</h2>
                            <div className="mt-3">
                                <p className="text-lg text-gray-500">
                                    Problem with the platform? Send us a help request and we will get back to you as soon as possible!
                                </p>
                            </div>
                            <div className="mt-9">
                                <div className="flex">
                                    {/* <div className="flex-shrink-0">
                                        <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 text-base text-gray-500">
                                        <p>+1 (555) 123 4567</p>
                                        <p className="mt-1">Mon-Fri 8am to 6pm PST</p>
                                    </div> */}
                                </div>
                                <div className="mt-6 flex">
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
        </>
    );
}