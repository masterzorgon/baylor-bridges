import React, { useState, Fragment } from "react";
import { ArrowLeftIcon, ArrowRightIcon, BriefcaseIcon, ExclamationCircleIcon, XIcon } from "@heroicons/react/outline";
import { useTimeoutFn } from "react-use";
import { Transition } from "@headlessui/react";
import { useTransition, animated } from "react-spring";

const HeadlineInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0);
    const transition = useTransition(show, { // used to fade icon in
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });
    const [alert, setAlert] = useState(false);

    const onSubmit = (event) => {    
        event.preventDefault();
        takeAwayModal();
        setTimeout(() => setModal(6), 400);
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
                    className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
                    aria-labelledby="contact-heading"
                >
                    {/* ALERT NOTIFICATION */}
                    <div
                        aria-live="assertive"
                        className="fixed z-50 inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
                    >
                        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
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
                                                <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                                <p className="text-sm font-medium text-gray-900">Submission unsuccessful</p>
                                                <p className="mt-1 text-sm text-gray-500">Network issues — Please try again.</p>
                                            </div>
                                            <div className="ml-4 flex-shrink-0 flex">
                                                <button
                                                    className="bg-red-50 rounded-md inline-flex text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    onClick={() => {
                                                        setAlert(false);
                                                    }}
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <XIcon className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                    {/* ALERT NOTIFICATION */}
                    <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8">
                        <div className="flex flex-col bg-white rounded-2xl shadow-xl">
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
                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
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
                                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                        <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
                                            Biography
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                rows={4}
                                                name="comment"
                                                id="comment"
                                                className="shadow-sm focus:ring-gray-100 focus:border-gray-300 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="As an orthopedic surgeon, I..."
                                                onChange={event => setAccount({ ...account, biography: event.target.biography })}
                                                value={account.biography}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevModal}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-emerald-600 shadow-sm text-sm font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                                        transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-103 duration-200 hover:shadow-md"
                                    >
                                        <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onSubmit}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                                        transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-103 duration-200 hover:shadow-md"
                                    >
                                        Next
                                        <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                    </button>
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