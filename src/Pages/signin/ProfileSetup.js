import React from "react";
import { UserCircleIcon, NewspaperIcon, PhoneIcon, AtSymbolIcon, LocationMarkerIcon, AcademicCapIcon, IdentificationIcon } from "@heroicons/react/outline";

const ProfileSetup = () => {

    const profileField = [
        {
            name: "Name",
            href: "#",
            description:
                "Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.",
            icon: UserCircleIcon,
        },
        {
            name: "Headline",
            href: "#",
            description:
                "Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.",
            icon: IdentificationIcon,
        },
        {
            name: "Expected Graduate Class",
            href: "#",
            description:
                "Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.",
            icon: AcademicCapIcon,
        },
        {
            name: "Location",
            href: "#",
            description:
                "Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.",
            icon: LocationMarkerIcon,
        },
        {
            name: "Biography",
            href: "#",
            description:
                "Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.",
            icon: NewspaperIcon,
        },
        {
            name: "Email address",
            href: "#",
            description:
                "Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.",
            icon: AtSymbolIcon,
        },
        {
            name: "Phone number",
            href: "#",
            description:
                "Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.",
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
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdATIMu4F2ie09t6nJ92bN5nk9WhTKcgz7_A&usqp=CAU"
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
                            <div key={link.name} className="flex flex-col bg-white rounded-2xl shadow-xl">
                                <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                                    <div className="absolute top-0 p-5 inline-block bg-indigo-600 rounded-xl shadow-lg transform -translate-y-1/2">
                                        <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-900">{link.name}</h3>
                                    <p className="mt-4 text-base text-gray-500">{link.description}</p>
                                </div>

                                <div className="m-2">
                                    <div className="">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg"
                                            placeholder="you@example.com"
                                        />
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