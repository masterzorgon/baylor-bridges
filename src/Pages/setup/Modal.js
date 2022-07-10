import React, { Fragment, useId } from "react";
import { animated } from "react-spring";
import { Transition } from "@headlessui/react";
import jp from "jsonpath";

import Buttons from "./components/Buttons";

const Modal = ({
    show,
    transition,
    field,
    loading,
    account,
    setAccount,
    modal,
    handleChangeModal,
}) => {
    const render = () => {

        return field.fields.map(field => {
            if (field.role && account.role !== field.role) return null;

            return field.attributes.map(attribute => {
                const value = jp.query(account, attribute.path);

                const onChange = value => {
                    setAccount({ ...account, [attribute.key]: value });
                    console.log(account);
                };

                if (attribute.role && account.role !== attribute.role) return null;

                attribute.value = value;
                attribute.onChange = onChange;

                switch (attribute.type) {
                    case "text":
                        return <TextInput {...attribute} />;

                    default:
                        return null;
                }
            });
        });
    };

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
                                                    <field.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                                </animated.div>
                                                : "";
                                        })}
                                        <h3 className={field.style ? field.style : "text-xl font-medium text-gray-900"}>
                                            {field.title}
                                        </h3>
                                        <p className="mt-4 text-base text-gray-500">
                                            {field.description}
                                        </p>
                                    </div>

                                    {/* INPUT FIELDS */}
                                    {field.fields && <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                                        <div className="-space-y-pxsm shadow-sm">
                                            {render()}
                                        </div>
                                    </div>}

                                    {/* CHANGE MODAL BUTTONS */}
                                    <div className="flex justify-between mt-6 space-x-2">
                                        <Buttons
                                            handleChangeModal={handleChangeModal}
                                            account={account}
                                            modal={modal}
                                            loading={loading}
                                            required={field.buttons}
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


const TextInput = ({ title, required, value, onChange, placeholder }) => {
    const id = useId();

    return (
        <div key={title} className="group relative border border-gray-300 rounded-md my-2 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
            <div className="flex justify-between">
                <label htmlFor={id} className="block text-xs font-medium text-gray-900">
                    {title}
                </label>
                {
                    required &&
                    <label htmlFor={id} className="text-xs text-gray-500" id="email-optional">
                        Required
                    </label>
                }
            </div>
            <input
                type="text"
                name={title}
                id={id}
                className="block w-full border-none shadow-none m-0 px-0 py-2 -mb-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder={placeholder}
                autoComplete="off"
                onChange={event => onChange(event.target.value)}
                value={value ? value : ""}
            />
        </div>
    );
};


export default Modal;