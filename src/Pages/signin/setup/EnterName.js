import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/outline";
// import { UsersIcon } from "@heroicons/react/solid";

import Button from "../../../components/Button";


const EnterName = () => {

    const [show, setShow] = useState(false);

    const nameInput = () => {
        return (
            <div className="isolate -space-y-px rounded-md shadow-sm">
                <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Jane Doe"
                    />
                </div>
                <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
                        Job Title
                    </label>
                    <input
                        type="text"
                        name="job-title"
                        id="job-title"
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Head of Tomfoolery"
                    />
                </div>
            </div>
        );
    };

    const supportLinks = [
        {
            name: "Name",
            description: "This is your full, legal name. This is the name others will know you by via your Baylor Bridges account.",
            input: nameInput,
            icon: UserCircleIcon,
        },
        // {
        //     name: "'Technical Support'",
        //     href: "'#'",
        //     description:
        //         "'Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.'",
        //     icon: SupportIcon,
        // },
        // {
        //     name: "'Media Inquiries'",
        //     href: " '#'",
        //     description:
        //         "'Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.'",
        //     icon: NewspaperIcon,
        // },
    ];

    const onSubmit = () => {
        setShow(show => !show);
    };  

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="relative pb-32 bg-gray-800">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gray-800 mix-blend-multiply" aria-hidden="true" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                        Enter your profile information
                    </h1>
                    <p className="mt-6 max-w-3xl text-xl text-gray-300">
                        Please provide your authentic, verifiable information. The information you provide
                        will be displayed for others to see on your Baylor Bridges profile.
                    </p>
                </div>
            </div>

            {/* Overlapping cards */}
            <section
                className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
                aria-labelledby="contact-heading"
            >
                <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8">
                    {supportLinks.map((link) => (
                        <div key={link.name} className="flex flex-col bg-gray-50 rounded-2xl shadow-xl">
                            <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">

                                <Transition
                                    show={show}
                                    enter="transition-opacity duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-lg transform -translate-y-1/2">
                                        <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                </Transition>

                                <h3 className="text-xl font-medium text-gray-900">{link.name}</h3>
                                <p className="mt-4 text-base text-gray-500">{link.description}</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                                {/* INPUT SECTION GOES BELOW */}
                                {link.input()}
                                {/* INPUT SECTION GOES ABOVE */}
                                <Button className="mt-4" onClick={onSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default EnterName;