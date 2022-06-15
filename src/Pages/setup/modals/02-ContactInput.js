import React from "react";
import { InboxIcon } from "@heroicons/react/outline";
import { animated } from "react-spring";

import Buttons from "./components/Buttons";

const ContactInput = ({ loading, modal, account, setAccount, transition, handleChangeModal }) => {
    return (
        <>
            <section aria-labelledby="contact-heading">
                <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8 mx-auto">
                    <div className="flex flex-col bg-white rounded-2xl">
                        <div className="flex-1 relative pt-16 pb-8">

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
                                will be displayed on your profile for
                                others who may reach you.
                            </p>
                        </div>
                        <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                            {/* INPUT FIELDS */}
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-color">
                                    <label htmlFor="phone" className="block text-xs font-medium text-gray-900">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
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
                                        className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                        placeholder="you@baylor.edu"
                                        onChange={event => setAccount({ ...account, contact_info: { ...account.contact_info, email: event.target.value } })}
                                        value={account.contact_info.email}
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
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactInput;