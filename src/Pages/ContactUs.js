import React from "react";
import { MailIcon } from "@heroicons/react/outline";

export default function ContactUs() {
    return (
        <>
            <div className="relative bg-white">
                <div className="mt-4 relative py-5 px-4 sm:py-5 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-5 lg:grid lg:grid-cols-2">
                    <div className="lg:pr-8">
                        <div className="flex flex-col justify-around max-w-md mx-auto sm:max-w-lg lg:mx-0">
                            
                            <h2 className="flex justify-center text-3xl font-extrabold tracking-tight sm:text-4xl underline">
                                Contact Us
                            </h2>

                            {/* CHANGE ABSOLUTE WITH GRID TO MAKE A TGS CLICKABLE */}
                            <div className="lg:mb-5 mt-5 lg:mx-8 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 xl:items-center">
                                <img
                                    className="shadow-md h-56 w-full rounded-xl object-cover lg:absolute lg:h-full"
                                    src="https://pbs.twimg.com/media/D9D59L-XUAUStai?format=jpg&name=large"
                                    alt="Pat Neff Hall"
                                />
                            </div>

                            <div className="lg:mr-5">
                                <div className="shadow-md px-6 py-6 mt-5 bg-white rounded-lg md:py-6 md:px-6 lg:py-6 lg:px-6 xl:flex xl:items-center">
                                    <div className="">
                                        <h2 className="text-xl font-semibold tracking-tight text-grey-600 sm:text-xl">
                                            Baylor Bridges Team
                                        </h2>
                                        <p className="mt-5 max-w-3xl text-md leading-6 text-grey-600">
                                            Have a question about Baylor Bridges? Contact us by sending a message!
                                        </p>

                                        <div className="mt-5 flex justify-between align-middle">
                                            <MailIcon className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                                            <a href="mailto: baylorbriges@baylor.edu" target="_blank" rel="noreferrer"
                                                className="hover:text-emerald-500 mr-auto ml-2 max-w-3xl text-md leading-6 text-emerald-700"
                                            >
                                                baylorbriges@baylor.edu
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="shadow-md px-6 py-6 mt-5 bg-white rounded-lg md:py-6 md:px-6 lg:py-6 lg:px-6 xl:flex xl:items-center">
                                    <div className="xl:w-0 xl:flex-1">
                                        <h2 className="text-xl font-semibold tracking-tight text-grey-600 sm:text-xl">
                                            Technical Support
                                        </h2>
                                        <p className="mt-5 max-w-3xl text-md leading-6 text-grey-600">
                                            Problem with the platform? Send us a help request and we will get back to you as soon as possible!
                                        </p>
                                        <div className="mt-5 flex justify-between align-middle">
                                            <MailIcon className="cursor-default h-6 w-6 text-emerald-700" aria-hidden="true" />
                                            <a href="mailto: baylorbridges@outlook.com" target="_blank" rel="noreferrer"
                                                className="hover:text-emerald-500 mr-auto ml-2 max-w-3xl text-md leading-6 text-emerald-700"
                                            >
                                                baylorbridges@outlook.com
                                            </a>
                                        </div>
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

