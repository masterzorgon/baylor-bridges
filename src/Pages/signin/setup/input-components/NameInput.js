import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { UserCircleIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { useTimeoutFn } from "react-use";
import Button from "../../../../components/Button";

const NameInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0);

    const onSubmit = (event) => {   
        event.preventDefault();
        takeAwayModal();
        setTimeout(() => setModal(2), 400);
    };

    return (
        <>
            {/* Overlapping cards */}
            <Transition
                show={show && modal === 1}
                as={Fragment}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transform duration-[400ms] transition ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
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
                                <h3 className="text-xl font-medium text-gray-900">Name</h3>
                                <p className="mt-4 text-base text-gray-500">Please provide your full, legal name. This is the name others will know you by via your Baylor Bridges account.</p>
                            </div>
                            <div className="p-6 pt-0 bg-white rounded-bl-2xl rounded-br-2xl md:px-8">
                                <div className="isolate -space-y-px rounded-md shadow-lg">
                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Jane"
                                            onChange={event => setAccount({ ...account, first_name: event.target.value })}
                                            value={account.first_name}
                                        />
                                    </div>
                                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                        <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Doe"
                                            onChange={event => setAccount({ ...account, last_name: event.target.value })}
                                            value={account.last_name}
                                        />
                                    </div>
                                </div>
                                <Button className="mt-4" onClick={onSubmit}>
                                    Next
                                </Button>
                                <div className="flex justify-center mt-6 text-emerald-600 hover:text-emerald-700">
                                    <ArrowLeftIcon className="w-4 mr-2" />
                                    <a href="/sign-in/setup/profile-setup">
                                        Previous
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Transition>
        </>
    );
};

export default NameInput;