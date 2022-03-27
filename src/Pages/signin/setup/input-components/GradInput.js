import React, { Fragment } from "react";
import { AcademicCapIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { useTimeoutFn } from "react-use";
import { Transition } from "@headlessui/react";
import { useTransition, animated } from "react-spring";

const GradInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0);
    const transition = useTransition(show, { // used to fade icon in
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });

    const onSubmit = (event) => {    
        event.preventDefault();
        takeAwayModal();
        setTimeout(() => setModal(5), 400);
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
                show={show && modal === 4}
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
                                {transition((style, item) => {
                                    return item
                                        ?
                                        <animated.div style={style} className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-xl transform -translate-y-1/2">
                                            <AcademicCapIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </animated.div>
                                        : "";
                                })}
                                <h3 className="text-xl font-medium text-gray-900">Graduating Class</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    Please provide the year and semester of your graduating class
                                    from Baylor University.

                                </p>
                            </div>
                            <div className="p-6 pt-0 bg-white rounded-bl-2xl rounded-br-2xl md:px-8">
                                <div className="isolate -space-y-px rounded-md shadow-sm">
                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                            Semester
                                        </label>
                                        <input
                                            type="text"
                                            name="semester"
                                            id="semester"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Spring"
                                            onChange={event => setAccount({ ...account, graduate_semester: event.target.value })}
                                            value={account.graduate_semester}
                                        />
                                    </div>
                                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                        <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
                                            Year
                                        </label>
                                        <input
                                            type="text"
                                            name="year"
                                            id="year"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="2001"
                                            onChange={event => setAccount({ ...account, graduate_year: event.target.value })}
                                            value={account.graduate_year}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevModal}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-emerald-600 shadow-sm text-sm font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    >
                                        <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onSubmit}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
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

export default GradInput;