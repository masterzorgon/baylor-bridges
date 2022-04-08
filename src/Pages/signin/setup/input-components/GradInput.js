import React, { Fragment, useState } from "react";
import { AcademicCapIcon, ArrowLeftIcon, ArrowRightIcon, SelectorIcon } from "@heroicons/react/outline";
import { useTimeoutFn } from "react-use";
import { Menu, Transition } from "@headlessui/react";
import { useTransition, animated } from "react-spring";

const GradInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0);
    const [semester, setSemester] = useState("Spring");
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

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
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
                    className="-mt-32 max-w-7xl sm:mx-20 relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
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
                                        <Menu as="div" id="dropdown" className="flex relative text-left">
                                            <div className="w-full">
                                                <Menu.Button className="inline-flex justify-betweem w-full rounded-md border border-transparent bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white">
                                                    {semester}
                                                    <SelectorIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="overflow-scroll max-h-40 origin-top-right absolute right-0 mt-1 w-full rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    type="submit"
                                                                    className={classNames(
                                                                        active ? "bg-gray-100 text-green-600" : "text-gray-700",
                                                                        "block w-full text-left px-4 py-2 text-sm"
                                                                    )}
                                                                    onClick={event => setSemester(event.target.textContent)}
                                                                >
                                                                    Spring
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    type="submit"
                                                                    className={classNames(
                                                                        active ? "bg-gray-100 text-green-600" : "text-gray-700",
                                                                        "block w-full text-left px-4 py-2 text-sm"
                                                                    )}
                                                                    onClick={event => setSemester(event.target.textContent)}
                                                                >
                                                                    Fall
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
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
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-emerald-600 shadow-sm text-sm font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                                        transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200 hover:shadow-md"
                                    >
                                        <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onSubmit}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                                        transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200 hover:shadow-md"
                                    >
                                        Skip
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