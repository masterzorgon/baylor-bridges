import React, { Fragment } from "react";
import { animated } from "react-spring";
import { Transition } from "@headlessui/react";

import Buttons from "./components/Buttons";
import AllDone from "./components/AllDone";
import TextInput from "./components/TextInput";
import BioInput from "./components/BioInput";
import ListInput from "./components/ListInput";

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
                                {
                                    modal === 6
                                        ?
                                        <AllDone transition={transition} account={account} />
                                        :
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
                                                    {modal === 6 && <AllDone transition={transition} account={account} />}
                                                    {modalField.fields.map(field => {
                                                        // RENDER TEXT INPUT
                                                        if (field.type === "text") {
                                                            return (
                                                                <>
                                                                    <TextInput
                                                                        field={field}
                                                                        inputFieldLabel={inputFieldLabel}
                                                                        handleFilteredInput={handleFilteredInput}
                                                                    />
                                                                </>
                                                            );
                                                        }

                                                        // RENDER BIO INPUT
                                                        if (field.type === "bio") {
                                                            return (
                                                                <>
                                                                    <BioInput
                                                                        field={field}
                                                                        inputFieldLabel={inputFieldLabel}
                                                                        handleFilteredInput={handleFilteredInput}
                                                                    />
                                                                </>
                                                            );
                                                        }

                                                        // RENDER LIST INPUT
                                                        if (field.type === "list") {
                                                            return (
                                                                <>
                                                                    <ListInput
                                                                        field={field}
                                                                        account={account}
                                                                        setAccount={setAccount}
                                                                        inputFieldLabel={inputFieldLabel}
                                                                    />
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
                                }
                            </div>
                        </section>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default Modal;