import React from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import Button from "../../../../components/Button";

const ContactInput = ({ onSubmit }) => {
    return (
        <>
            {/* Overlapping cards */}
            <section
                className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
                aria-labelledby="contact-heading"
            >
                <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8">
                    <div className="flex flex-col bg-white rounded-2xl shadow-xl">
                        <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                            <div className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-lg transform -translate-y-1/2">
                                <UserCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900">Contact information</h3>
                            <p className="mt-4 text-base text-gray-500">
                                Please probide adequate contact information through which
                                others may reach you via your Baylor Bridges account.
                            </p>
                        </div>
                        <div className="p-6 pt-0 bg-white rounded-bl-2xl rounded-br-2xl md:px-8">
                            <div className="isolate -space-y-px rounded-md shadow-sm">
                                <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                    <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                        placeholder="+1 (234)-567-8910"
                                    />
                                </div>
                                <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                    <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
                                        Email Address
                                    </label>
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                        placeholder="you@email.com"
                                    />
                                </div>
                            </div>
                            <Button className="mt-4" onClick={onSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactInput;