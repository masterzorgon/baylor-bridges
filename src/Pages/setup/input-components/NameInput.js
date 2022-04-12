import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useTimeoutFn } from "react-use";
import { useTransition, animated } from "react-spring";

import Button from "../../../components/Button";

const NameInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0); // used to fade modal out
    const [alert, setAlert] = useState(false);
    const transition = useTransition(show, { // used to fade icon in
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });

    const onSubmit = (event) => {
        if (account.first_name === "" || account.last_name === "") {
            setAlert(true);
        } else {
            event.preventDefault();
            takeAwayModal();
            setTimeout(() => setModal(2), 400);
        }

    };

    const prevModal = (event) => {
        window.location.href = "/sign-in/setup/profile-setup";
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
                    className=""
                    aria-labelledby="contact-heading"
                >
                    {/* ALERT NOTIFICATION BELOW */}
                    <div
                        aria-live="assertive"
                        className="fixed z-50 inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
                    >
                        <div className="w-full flex flex-col space-y-4 mb-auto items-end">
                            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                            <Transition
                                show={alert}
                                as={Fragment}
                                enter="transform ease-out duration-300 transition"
                                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="max-w-sm w-full bg-red-50 shadow-xl rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="p-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                {/* <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" /> */}
                                            </div>
                                            <div className="ml-1 w-0 flex-1 pt-0.5">
                                                <p className="text-sm font-medium text-gray-900">Submission unsuccessful</p>
                                                <p className="mt-1 text-sm text-gray-500">Please fill in required fields.</p>
                                            </div>
                                            <div className="ml-1 flex-shrink-0 flex">
                                                <button
                                                    className="bg-red-50 rounded-md inline-flex text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    onClick={() => {
                                                        setAlert(false);
                                                    }}
                                                >
                                                    <span className="sr-only">Close</span>
                                                    {/* <XIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                    {/* ALERT NOTIFICATION ABOVE */}

                    <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8 mx-auto">
                        <div className="flex flex-col bg-white rounded-2xl">
                            <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">

                                {transition((style, item) => {
                                    return item
                                        ?
                                        <animated.div style={style} className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-md transform -translate-y-1/2">
                                            <UserCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </animated.div>
                                        : "";
                                })}

                                <h3 className="text-xl font-medium text-gray-900">Name</h3>
                                <p className="mt-4 text-base text-gray-500">Please provide your full, legal name. This is the name others will know you by via your Baylor Bridges account.</p>
                            </div>
                            <div className="p-6 pt-0 bg-white rounded-bl-2xl rounded-br-2xl md:px-8">
                                <div className="isolate -space-y-px rounded-md shadow-sm">
                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                        <label htmlFor="first-name" className="block text-xs font-medium text-gray-900">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder=""
                                            autoComplete="off"
                                            onChange={event => setAccount({ ...account, first_name: event.target.value })}
                                            value={account.first_name}
                                        />
                                    </div>
                                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                        <label htmlFor="last-name" className="block text-xs font-medium text-gray-900">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder=""
                                            autoComplete="off"
                                            onChange={event => setAccount({ ...account, last_name: event.target.value })}
                                            value={account.last_name}
                                        />
                                    </div>
                                </div>

                                <div className="flex mt-6 space-x-2">
                                    <Button
                                        onClick={prevModal}
                                        className="px-4 py-3 border shadow-sm text-sm bg-gray-100 font-medium rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        className="py-3 text-sm"
                                        disabled={account.first_name === "" || account.last_name === ""}
                                        onClick={onSubmit}
                                        arrow={true}
                                    >
                                        Next
                                    </Button>
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