import React, { Fragment } from "react";
import { InboxIcon } from "@heroicons/react/outline";
import { useTimeoutFn } from "react-use";
import { Transition } from "@headlessui/react";
import { useTransition, animated } from "react-spring";

import Button from "../../../components/Button";

const ContactInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0);
    const transition = useTransition(show, { // used to fade icon in
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });

    const onSubmit = () => {
        takeAwayModal();
        setTimeout(() => setModal(3), 300);
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
                show={show && modal === 2}
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
                            <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">

                                {transition((style, item) => {
                                    return item
                                        ?
                                        <animated.div style={style} className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-xl transform -translate-y-1/2">
                                            <InboxIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </animated.div>
                                        : "";
                                })}

                                <h3 className="text-xl font-medium text-gray-900">Contact Information</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    Please provide the contact information through which
                                    others may reach you via your Baylor Bridges account.
                                </p>
                            </div>
                            <div className="p-6 pt-0 bg-white rounded-bl-2xl rounded-br-2xl md:px-8">
                                <div className="isolate -space-y-px rounded-md shadow-sm">
                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-color">
                                        <label htmlFor="phone" className="block text-xs font-medium text-gray-900">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="+1 (234) 567-8910"
                                            onChange={event => setAccount({ ...account, contact_info: { ...account.contact_info, phone: event.target.value } })}
                                            value={account.contact_info.phone}
                                        />
                                    </div>
                                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-color">
                                        <label htmlFor="email" className="block text-xs font-medium text-gray-900">
                                            Email Address
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="you@baylor.edu"
                                            onChange={event => setAccount({ ...account, contact_info: { ...account.contact_info, email: event.target.value } })}
                                            value={account.contact_info.email}
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
                                        onClick={onSubmit}
                                        arrow={true}
                                    >
                                        {
                                            account.contact_info.email === "" && account.contact_info.phone === "" ? "Skip" : "Next"
                                        }
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

export default ContactInput;