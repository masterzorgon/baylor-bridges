import React from "react";
import { UserCircleIcon, NewspaperIcon, PhoneIcon, AtSymbolIcon, LocationMarkerIcon, AcademicCapIcon, IdentificationIcon } from "@heroicons/react/outline";
import { SortAscendingIcon } from "@heroicons/react/solid";

const ProfileSetup = () => {

    const profileField = [
        {
            name: "Name",
            href: "#",
            description:
                "This will be your display name that others will view. Please use your real name.",
            icon: UserCircleIcon,
        },
        {
            name: "Headline",
            href: "#",
            description:
                "This is your professional title that will be showcased on your profile.",
            icon: IdentificationIcon,
        },
        {
            name: "Expected Graduate Class",
            href: "#",
            description:
                "This is your graduated class from Baylor University.",
            icon: AcademicCapIcon,
        },
        {
            name: "Location",
            href: "#",
            description:
                "This is your current location by state.",
            icon: LocationMarkerIcon,
        },
        {
            name: "Biography",
            href: "#",
            description:
                "This is a brief summary of who you are and what you do.",
            icon: NewspaperIcon,
        },
        {
            name: "Email address",
            href: "#",
            description:
                "This is your email address through which others may contact you.",
            icon: AtSymbolIcon,
        },
        {
            name: "Phone number",
            href: "#",
            description:
                "This is your phone number through which others may contact you.",
            icon: PhoneIcon,
        },
    ];

    return (
        <>
            <div className="bg-white">
                {/* Header */}
                <div className="relative pb-32 bg-gray-800">
                    <div className="absolute inset-0">
                        <img
                            className="w-full h-full object-cover"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfswXHxYYNlZjjbSsOZZCiiPNJt0MnEbcREA&usqp=CAU"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-emerald-800 mix-blend-multiply" aria-hidden="true" />
                    </div>
                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">Welcome!</h1>
                        <p className="mt-6 max-w-3xl text-xl text-gray-300">
                            Baylor Bridges is so glad that you decided to join our online platform.<br />
                            Please proceed to set up your Baylor Bridges profile to get started.
                        </p>
                    </div>
                </div>

                {/* Overlapping cards */}
                <section
                    className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
                    aria-labelledby="contact-heading"
                >
                    <h2 className="sr-only" id="contact-heading">
                        Contact us
                    </h2>
                    <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
                        {profileField.map((link) => (
                            <div key={link.name} className="flex flex-col bg-white rounded-2xl shadow-md">
                                <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                                    <div className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-lg transform -translate-y-1/2">
                                        <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-900">{link.name}</h3>
                                    <p className="mt-4 text-base text-gray-500">{link.description}</p>
                                </div>

                                <div className="m-3">
                                    <div className="h-10 mt-1 flex rounded-xl">
                                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <link.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="focus:ring-emerald-500 focus:border-emerald-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                                                placeholder={link.name}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                        >
                                            <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span>Set</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProfileSetup;