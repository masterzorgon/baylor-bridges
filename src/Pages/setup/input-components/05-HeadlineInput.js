import React, { Fragment } from "react";
import { BriefcaseIcon } from "@heroicons/react/outline";
import { animated } from "react-spring";

import Button from "../../../components/Button";

const HeadlineInput = ({ account, setAccount, transition, handleChangeModal }) => {

    return (
        <>
            <section
                aria-labelledby="contact-heading"
            >
                <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8 mx-auto">
                    <div className="flex flex-col bg-white rounded-2xl">
                        <div className="flex-1 relative pt-16 pb-8">
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
                        <div className="bg-white rounded-bl-2xl rounded-br-2xl">
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
                            <div className="flex justify-between mt-6 space-x-2">
                                <Button
                                    onClick={() => handleChangeModal("back")}
                                    className="sm:w-fit px-5 py-3 border shadow-sm text-sm bg-gray-100 font-medium rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    Back
                                </Button>
                                <Button
                                    className="sm:w-fit px-5 py-3 text-sm"
                                    onClick={() => handleChangeModal("next")}
                                    arrow={true}
                                >
                                    {
                                        account.headline === "" && account.biography === "" ? "Skip" : "Next"
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeadlineInput;