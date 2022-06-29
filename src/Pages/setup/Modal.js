import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { animated } from "react-spring";

import Buttons from "./modals/components/Buttons";

const Modal = ({
    show,
    transition,
    modalField,
    loading,
    account,
    modal,
    handleChangeModal,
    handleInputFields
}) => {
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
                                    {handleInputFields()}

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
