import React, { Fragment } from "react";
import { BriefcaseIcon } from "@heroicons/react/outline";
import { useTimeoutFn } from "react-use";
import { Transition } from "@headlessui/react";
import { useTransition, animated } from "react-spring";

import Button from "../../../components/Button";

const HeadlineInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0);
    const transition = useTransition(show, { // used to fade icon in
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });

    const onSubmit = () => {
        takeAwayModal();
        setTimeout(() => setModal(6), 300);
    };

    const prevModal = () => {
        takeAwayModal();
        setTimeout(() => setModal(modal - 1), 300);
    };

    return (
        <>
            {/* Overlapping cards */}
            <Transition
                show={show && modal === 5}
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
                                        <animated.div style={style} className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-lg transform -translate-y-1/2">
                                            <BriefcaseIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </animated.div>
                                        : "";
                                })}
                                <h3 className="text-xl font-medium text-gray-900">Headline</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    Youe headline should be your professional title, and your biography should be
                                    a summary of who you are and what you do.

                                </p>
                            </div>
                            <div className="p-6 pt-0 bg-white rounded-bl-2xl rounded-br-2xl md:px-8">
                                <div className="isolate -space-y-px rounded-md shadow-sm">
                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                        <label htmlFor="headline" className="block text-xs font-medium text-gray-900">
                                            Headline
                                        </label>
                                        <input
                                            type="text"
                                            name="headline"
                                            id="headline"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Orthopedic Surgeon"
                                            onChange={event => setAccount({ ...account, headline: event.target.value })}
                                            value={account.headline}
                                        />
                                    </div>
                                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                        <label htmlFor="bio" className="block text-xs font-medium text-gray-900">
                                            Biography
                                        </label>
                                        <textarea
                                            type="text"
                                            name="bio"
                                            id="bio"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="As an orthopedic surgeon, I..."
                                            onChange={event => setAccount({ ...account, biography: event.target.biography })}
                                            value={account.biography}
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

export default HeadlineInput;