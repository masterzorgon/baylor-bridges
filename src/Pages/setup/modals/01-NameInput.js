import React from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { animated } from "react-spring";

import Buttons from "./components/Buttons";

const NameInput = ({ required, loading, setLoading, modal, account, setAccount, handleChangeModal, transition }) => {
    return (
        <>
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
                <p className="mt-4 text-base text-gray-500">Please provide your full name. This is the name others will see on your profile for others who may reach you.</p>
            </div>
            <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                {/* INPUT FIELDS */}
                <div className="-space-y-px rounded-md shadow-sm">
                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                        <label htmlFor="first-name" className="block text-xs font-medium text-gray-900">
                            First Name (and Middle Name)
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
                {/* CHANGE MODAL BUTTONS */}
                <div className="flex justify-between mt-6 space-x-2">
                    <Buttons
                        handleChangeModal={handleChangeModal}
                        account={account}
                        modal={modal}
                        loading={loading}
                        required={true}
                    />
                </div>
            </div>
        </>
    );
};

export default NameInput;