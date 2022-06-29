import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { animated } from "react-spring";
import { SelectorIcon, CheckIcon } from "@heroicons/react/outline";
import { states, classNames } from "../../components/Utils";

import Buttons from "./modals/components/Buttons";

const semesters = [
    { title: "Spring", value: "spring" },
    { title: "Fall", value: "fall" }
];

const Modal = ({
    show,
    transition,
    modalField,
    loading,
    account,
    setAccount,
    modal,
    handleChangeModal,
    handleFilteredInput,
}) => {

    const [state, setState] = useState(states[0]);
    const [semester, setSemester] = useState(semesters[0]);

    useEffect(() => {
        for (let state of states) {
            if (state.value === account.state) {
                setState(state);
            }
        }
    }, []);

    useEffect(() => {
        setAccount({ ...account, state: state.value });
    }, [state, setAccount]);

    useEffect(() => {
        for (let semester of semesters) {
            if (semester.value === account.graduate_semester) {
                setSemester(semester);
            }
        }
    }, []);

    useEffect(() => {
        setAccount({ ...account, graduate_semester: semester.value });
    }, [semester, setAccount]);

    const inputFieldLabel = (required, title) => (
        required
            ?
            <div className="flex justify-between">
                <label htmlFor="state" className="block text-xs font-medium text-gray-900">
                    {title}
                </label>
                <span className="text-sm text-gray-500" id="email-optional">
                    Required
                </span>
            </div>
            :
            <label htmlFor="first-name" className="block text-xs font-medium text-gray-900">
                {title}
            </label>
    );

    return (
        <>
            <Transition
                show={show}
                as={Fragment}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transform duration-[400ms] transition ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="z-10 min-h-screen flex flex-col justify-center ">
                    <div className="bg-white max-w-2xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20 mt-2">
                        <section aria-labelledby="contact-heading">
                            <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8 mx-auto">
                                <div className="flex flex-col bg-white rounded-2xl">
                                    <div className="flex-1 relative pt-16 pb-8">
                                        {transition((style, item) => {
                                            return item
                                                ?
                                                <animated.div style={style} className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-md transform -translate-y-1/2">
                                                    <modalField.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                                </animated.div>
                                                : "";
                                        })}
                                        <h3 className={modalField.style ? modalField.style : "text-xl font-medium text-gray-900"}>
                                            {modalField.title}
                                        </h3>
                                        <p className="mt-4 text-base text-gray-500">
                                            {modalField.description}
                                        </p>
                                    </div>

                                    {/* INPUT FIELDS */}
                                    <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                                        <div className="-space-y-pxsm shadow-sm">
                                            {modalField.fields.map(field => {
                                                // RENDER TEXT INPUT
                                                if (field.type === "text") {
                                                    return (
                                                        <>
                                                            <div key={field.title} className="relative border border-gray-300 rounded-sm px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                                                {inputFieldLabel(field.required, field.title)}
                                                                <input
                                                                    type="text"
                                                                    name={field.title}
                                                                    id={field.key}
                                                                    className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                                    placeholder={field.placeholder}
                                                                    autoComplete="off"
                                                                    onChange={
                                                                        field.filtered
                                                                            ? event => handleFilteredInput(event)
                                                                            : event => field.change(event)
                                                                    }
                                                                    value={
                                                                        field.value !== null
                                                                            ? field.value
                                                                            : ""
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    );
                                                }

                                                // RENDER BIO INPUT
                                                if (field.type === "bio") {
                                                    return (
                                                        <>
                                                            <div className="relative border border-gray-300 rounded-sm rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                                                {inputFieldLabel(field.required, field.title)}
                                                                <textarea
                                                                    type="text"
                                                                    name="bio"
                                                                    id="bio"
                                                                    className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                                    style={{ "height": "10rem" }}
                                                                    placeholder={field.placeholder}
                                                                    onChange={
                                                                        field.filtered
                                                                            ? event => handleFilteredInput(event)
                                                                            : event => field.change(event)
                                                                    }
                                                                    value={
                                                                        field.value !== null
                                                                            ? field.value
                                                                            : ""
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    );
                                                }

                                                // RENDER LIST INPUT
                                                if (field.type === "list" && field.title === "State") {
                                                    return (
                                                        <>
                                                            <Listbox value={state} onChange={setState}>
                                                                {({ open }) => (
                                                                    <>
                                                                        <div className="relative border border-gray-300 rounded-sm px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                                                            {inputFieldLabel(field.required, field.title)}
                                                                            <Listbox.Button className="cursor-pointer bg-white relative w-full rounded-sm text-left focus:outline-none focus:ring-0 sm:text-sm">
                                                                                <span className="block truncate">{state.title}</span>
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
                                                                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-sm text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                                    {states.map((state) => (
                                                                                        <Listbox.Option
                                                                                            key={state.value}
                                                                                            className={({ active }) => classNames(
                                                                                                active ? "text-white bg-emerald-600" : "text-gray-900",
                                                                                                "cursor-default select-none relative py-2 pl-3 pr-9"
                                                                                            )}
                                                                                            value={state}
                                                                                        >
                                                                                            {({ selected, active }) => (
                                                                                                <>
                                                                                                    <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                                                                                                        {state.title}
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
                                                        </>
                                                    );
                                                }

                                                if (field.type === "list" && field.title === "Semester") {
                                                    return (
                                                        <>
                                                            <div className="relative border border-gray-300 rounded-sm px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                                                {inputFieldLabel(field.required, field.title)}
                                                                <Listbox value={semester} onChange={setSemester}>
                                                                    {({ open }) => (
                                                                        <>
                                                                            <div className="px-0 py-0 mt-1 relative">
                                                                                <Listbox.Button className="bg-white relative w-full rounded-sm text-left py-1 cursor-default focus:outline-none focus:ring-0 sm:text-sm">
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
                                                                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-sm text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
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
                                                        </>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>

                                    {/* CHANGE MODAL BUTTONS */}
                                    <div className="flex justify-between mt-6 space-x-2">
                                        <Buttons
                                            handleChangeModal={handleChangeModal}
                                            account={account}
                                            modal={modal}
                                            loading={loading}
                                            required={modalField.buttons}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default Modal;