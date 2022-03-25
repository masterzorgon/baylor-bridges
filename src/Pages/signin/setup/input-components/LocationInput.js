import React, { Fragment } from "react";
import { LocationMarkerIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import Button from "../../../../components/Button";
import { useTimeoutFn } from "react-use";
import { Transition } from "@headlessui/react";

const LocationInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0);

    const onSubmit = (event) => {    
        event.preventDefault();
        takeAwayModal();
        setTimeout(() => setModal(1), 400);
    };

    const prevModal = (event) => {
        event.preventDefault();
        takeAwayModal();
        setTimeout(() => setModal(modal - 1), 400);
    };

    return (
        <>
            {/* Overlapping cards */}
            <Transition
                show={show && modal === 3}
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
                                    <LocationMarkerIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900">Location Information</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    At your discretion, please provide your location information. This information
                                    will be available for others to see on your Baylor Bridges account. Your state
                                    information will be used to fill in the Baylor Bridges heat map displayed on the home page.

                                </p>
                            </div>
                            <div className="p-6 pt-0 bg-white rounded-bl-2xl rounded-br-2xl md:px-8">
                                <div className="isolate -space-y-px rounded-md shadow-lg">
                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            id="state"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Texas"
                                            onChange={event => setAccount({...account, state: event.target.value})}
                                            value={account.state}
                                        />
                                    </div>
                                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                        <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Houston"
                                            onChange={event => setAccount({...account, city: event.target.value})}
                                            value={account.city}
                                        />
                                    </div>
                                </div>
                                <Button className="mt-4" onClick={onSubmit}>
                                    Next
                                </Button>
                                <div className="flex justify-center mt-6 text-emerald-600 hover:text-emerald-700">
                                    <ArrowLeftIcon className="w-4 mr-2" />
                                    <a href="#" onClick={prevModal}>
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

export default LocationInput;