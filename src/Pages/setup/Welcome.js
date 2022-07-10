import React from "react";

const ProfileSetup = () => {

    return (
        <>
            <div className="flex sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full pointer-events-none -z-10" aria-hidden="true">
                <div className="relative h-full w-full mx-auto overflow-hidden">
                    <svg
                        className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
                        width={404}
                        height={784}
                        fill="none"
                        viewBox="0 0 404 784"
                    >
                        <defs>
                            <pattern
                                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
                    </svg>
                    <svg
                        className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
                        width={404}
                        height={784}
                        fill="none"
                        viewBox="0 0 404 784"
                    >
                        <defs>
                            <pattern
                                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
                    </svg>
                </div>
            </div>

            {/* HERO SECTION */}
            <div className="z-10 min-h-screen flex flex-col justify-center ">
                <div className="bg-white max-w-2xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20 -mt-8">
                    <lord-icon
                        src="https://cdn.lordicon.com/lupuorrc.json"
                        trigger="loop"
                        style={{ width: "8rem", height: "8rem" }}
                    >
                    </lord-icon>
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="text-gradient bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">Welcome!</span>
                        <span className="block">We are so glad to have you.</span>
                    </h2>
                    <p className="mt-4 mx-auto text-gray-700">
                        Since your account is so new, we will walk you through{" "}
                    a few steps to get you started. You will be prompted to fill out
                        some profile information to <span className="underline underline-offset-4 decoration-emerald-400">complete your profile</span>,
                        so that others can better connect with you via your profile.
                    </p>
                    <a
                        href="profile-setup"
                        className="bg-emerald-600 mt-8 cursor-pointer shadow-md inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-white hover:bg-emerald-700"
                    >
                        Get started
                    </a>
                </div>
            </div>
        </>
    );
};

export default ProfileSetup;
