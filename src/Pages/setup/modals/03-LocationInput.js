import React, { Fragment, useState, useEffect } from "react";
import { LocationMarkerIcon, SelectorIcon, CheckIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";
import { animated } from "react-spring";

import Buttons from "./components/Buttons";
import { states, classNames } from "../../../components/Utils";

const LocationInput = ({ required, loading, modal, account, setAccount, transition, handleChangeModal }) => {

    const [state, setState] = useState(states[0]);

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

    return (
        <>
            <div className="flex-1 relative pt-16 pb-8">
                {transition((style, item) => {
                    return item
                        ?
                        <animated.div style={style} className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-xl transform -translate-y-1/2">
                            <LocationMarkerIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </animated.div>
                        : "";
                })}

                <h3 className="text-xl font-medium text-gray-900">Location Information</h3>
                <p className="mt-4 text-base text-gray-500">
                    At your discretion, please provide your location information. This
                    information will be used to provide you better profile recommendation.
                </p>
            </div>
            <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                <div className="-space-y-px rounded-md shadow-sm">
                    {/* INPUT FIELDS */}
                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                        <div className="flex justify-between">
                            <label htmlFor="state" className="block text-xs font-medium text-gray-900">
                                State
                            </label>
                            <span className="text-sm text-gray-500" id="email-optional">
                                Required
                            </span>
                        </div>
                        <Listbox value={state} onChange={setState}>
                            {({ open }) => (
                                <>
                                    <div className="mt-0 relative px-0 py-2">
                                        <Listbox.Button className="bg-white relative w-full rounded-md text-left cursor-default focus:outline-none focus:ring-0 sm:text-sm">
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
                                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
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
                    </div>
                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-2 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                        <label htmlFor="city" className="block text-xs font-medium text-gray-900">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            placeholder="Houston"
                            onChange={event => setAccount({ ...account, city: event.target.value })}
                            value={account.city}
                        />
                    </div>
                </div>
                {/* CHANGE MODAL BUTTONS */}
                <div className="flex justify-between mt-6 space-x-2">
                    <Buttons
                        handleChangeModal={handleChangeModal}
                        account={account}
                        modal={modal}
                        loading={loading}
                        required={required && (account.state !== "" && account.city !== "")}
                    />
                </div>
            </div>
        </>
    );
};

export default LocationInput;