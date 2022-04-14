import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useTimeoutFn } from "react-use";
import { useTransition, animated } from "react-spring";

import Button from "../../../components/Button";

const NameInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 50); // used to fade modal out
    const transition = useTransition(show, { // used to fade icon in
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });

    const onSubmit = () => {
        setTimeout(() => setModal(2), 300);
        takeAwayModal();
    };

    const prevModal = () => {
        window.location.href = "/setup/profile-setup";
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
                    <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8 mx-auto">
                        <div className="flex flex-col bg-white rounded-2xl">
                            <div className="flex-1 relative pt-16 pb-8">

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
                            <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                                <div className="-space-y-px rounded-md shadow-sm">
                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                        <label htmlFor="first-name" className="block text-xs font-medium text-gray-900">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
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
                                            className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder=""
                                            autoComplete="off"
                                            onChange={event => setAccount({ ...account, last_name: event.target.value })}
                                            value={account.last_name}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6 space-x-2">
                                    <Button
                                        onClick={prevModal}
                                        className="sm:w-fit px-5 py-3 border shadow-sm text-sm bg-gray-100 font-medium rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        className="sm:w-fit px-5 py-3 text-sm"
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