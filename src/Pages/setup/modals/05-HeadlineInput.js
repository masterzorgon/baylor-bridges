import React, { Fragment } from "react";

import Buttons from "./components/Buttons";

const HeadlineInput = ({ loading, modal, account, setAccount, handleChangeModal }) => {

    return (
        <>
            <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                {/* INPUT FIELDS */}
                <div className="-space-y-px rounded-md shadow-sm">
                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                        <label htmlFor="headline" className="block text-xs font-medium text-gray-900">
                            Headline
                        </label>
                        <input
                            type="text"
                            name="headline"
                            id="headline"
                            className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            placeholder="Orthopedic Surgeon"
                            onChange={event => setAccount({ ...account, headline: event.target.value })}
                            value={account.headline}
                            maxLength="100"
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
                            className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            style={{ "height": "10rem" }}
                            placeholder="As an orthopedic surgeon, I..."
                            onChange={event => setAccount({ ...account, biography: event.target.biography })}
                            value={account.biography}
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
                        required={
                            (account.headline !== null && account.biography !== null) &&
                            (account.headline !== "" && account.biography !== "")
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default HeadlineInput;