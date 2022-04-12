import React, { Fragment, useState, useEffect } from "react";
import { AcademicCapIcon, SelectorIcon, CheckIcon } from "@heroicons/react/outline";
import { useTimeoutFn } from "react-use";
import { Listbox, Transition } from "@headlessui/react";
import { useTransition, animated } from "react-spring";

import Button from "../../../components/Button";
import { classNames } from "../../../components/Utils";

const semesters = [
    { title: "Spring", value: "spring" },
    { title: "Fall", value: "fall" }
];

const GradInput = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0);

    const [semester, setSemester] = useState(semesters[0]);

    const transition = useTransition(show, { // used to fade icon in
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });

    const onSubmit = () => {
        takeAwayModal();
        setTimeout(() => setModal(5), 300);
    };

    const prevModal = () => {
        takeAwayModal();
        setTimeout(() => setModal(modal - 1), 300);
    };

    useEffect(() => {
        setAccount({ ...account, graduate_semester: semester.value });
    }, [semester, setAccount]);

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
                    className=""
                    aria-labelledby="contact-heading"
                >
                    <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8 mx-auto">
                        <div className="flex flex-col bg-white rounded-2xl">
                            <div className="flex-1 relative pt-16 pb-8">
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
                                    Please provide the {account.role === "student" && "expected"} year and semester of your graduating class
                                    from Baylor University.
                                </p>
                            </div>
                            <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                                <div className="-space-y-px rounded-md shadow-sm">
                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                            Semester
                                        </label>
                                        <Listbox value={semester} onChange={setSemester}>
                                            {({ open }) => (
                                                <>
                                                    <div className="mt-1 relative">
                                                        <Listbox.Button className="bg-white relative w-full rounded-md text-left py-1 cursor-default focus:outline-none focus:ring-0 sm:text-sm">
                                                            <span className="block truncate">{semester.title}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                {semesters.map((semester) => (
                                                                    <Listbox.Option
                                                                        key={semester.value}
                                                                        className={({ active }) => classNames(
                                                                            active ? "text-white bg-emerald-600" : "text-gray-900",
                                                                            "cursor-default select-none relative py-2 pl-3 pr-9"
                                                                        )}
                                                                        value={semester}
                                                                    >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                                <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                                                                                    {semester.title}
                                                                                </span>

                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active ? "text-white" : "text-emerald-600",
                                                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                                        )}
                                                                                    >
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox>
                                    </div>
                                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                        <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
                                            Year
                                        </label>
                                        <input
                                            type="text"
                                            name="year"
                                            id="year"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="2001"
                                            onChange={event => {
                                                // Check if it's 4 digits
                                                console.log(event);
                                                console.log(!isNaN(event.target.value));
                                                if (event.target.value.length <= 4 && !isNaN(event.target.value)) {
                                                    setAccount({ ...account, graduate_year: parseInt(event.target.value )});
                                                }
                                            }}
                                            value={account.graduate_year}
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
                                            account.graduate_year === "" && account.graduate_semester === "" ? "Skip" : "Next"
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

export default GradInput;