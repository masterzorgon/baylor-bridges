import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/outline";
import { classNames, states } from "../../../components/Utils";

const semesters = [
    { title: "Spring", value: "spring" },
    { title: "Fall", value: "fall" }
];

const ListInput = ({ field, inputFieldLabel, setAccount, account }) => {

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

    return (
        <div className="relative border border-gray-300 rounded-sm px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
            {inputFieldLabel(field.required, field.title)}
            <Listbox
                value={field.title === "State" ? state : semester}
                onChange={field.title === "State" ? setState : setSemester}
            >
                {({ open }) => (
                    <>
                        <div className="px-0 py-0 mt-1 relative">
                            <Listbox.Button className="bg-white relative w-full rounded-sm text-left py-1 cursor-default focus:outline-none focus:ring-0 sm:text-sm">
                                <span className="block truncate">
                                    {field.title === "State" ? state.title : semester.title}
                                </span>
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
    );
};

export default ListInput;


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
