import React from "react";
import { MailIcon } from "@heroicons/react/outline";

export default function ContactUs()
{
    return (
        <>
            <div className="relative bg-white">
                <div className="lg:absolute lg:inset-0">
                    <div className="m-5 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <img
                            className="h-56 w-full shadow-sm rounded-xl object-cover lg:absolute lg:h-full"
                            src="https://pbs.twimg.com/media/D9D59L-XUAUStai?format=jpg&name=large"
                            alt="Pat Neff Hall"
                        />
                    </div>
                </div>

                <div className="relative py-5 px-4 sm:py-5 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-5 lg:grid lg:grid-cols-2">
                    <div className="lg:pr-8">
                        <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                            
                            <h2 className="flex justify-center text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Contact Us
                            </h2>

                            <div className="px-6 py-6 mt-5 bg-emerald-700 rounded-lg md:py-6 md:px-6 lg:py-6 lg:px-6 xl:flex xl:items-center">
                                <div className="xl:w-0 xl:flex-1">
                                    <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                        Baylor Bridges Team
                                    </h2>
                                    <p className="mt-5 max-w-3xl text-md leading-6 text-white">
                                        Have a question about Baylor Bridges? Contact us by sending a message!
                                    </p>
                                    <div className="mt-5 flex justify-between align-middle">
                                        <div className="flex-shrink-0">
                                            <MailIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <a href="mailto: baylorbriges@baylor.edu" target="_blank" rel="noreferrer" className="hover:text-emerald-200 mr-auto ml-2 max-w-3xl text-lg leading-6 text-white">
                                            baylorbriges@baylor.edu
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-6 mt-5 bg-emerald-700 rounded-lg md:py-6 md:px-6 lg:py-6 lg:px-6 xl:flex xl:items-center">
                                <div className="xl:w-0 xl:flex-1">
                                    <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                        Technical Support
                                    </h2>
                                    <p className="mt-5 max-w-3xl text-md leading-6 text-white">
                                        Problem with the platform? Send us a help request and we will get back to you as soon as possible!
                                    </p>
                                    <div className="mt-5 flex justify-between align-middle">
                                        <div className="flex-shrink-0">
                                            <MailIcon className="cursor-default h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <a href="mailto: baylorbridges@outlook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-200 mr-auto ml-2 max-w-3xl text-lg leading-6 text-white">
                                            baylorbridges@outlook.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>





            {/* <div className="bg-white">
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
                                    <div className="flex-shrink-0">
                                        <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 text-base text-gray-500">
                                        <p>+1 (555) 123 4567</p>
                                        <p className="mt-1">Mon-Sun 10 am to </p>
                                    </div> 
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
                                    <div className="flex-shrink-0">
                                        <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 text-base text-gray-500">
                                        <p>+1 (555) 123 4567</p>
                                        <p className="mt-1">Mon-Fri 8am to 6pm PST</p>
                                    </div> 
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
            </div> */}



        </>
    );
}

