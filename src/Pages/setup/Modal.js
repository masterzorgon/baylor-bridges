import React, { Fragment, useId, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/outline";
import { animated } from "react-spring";
import jp from "jsonpath";

import { classNames } from "../../components/Utils";
import { Button } from "../../components/Button";

const Modal = ({
    show,
    transition,
    field,
    loading,
    account,
    setAccount,
    next,
    back
}) => {
    const [completed, setCompleted] = useState(false);
    const [skippable, setSkippable] = useState(true);

    useEffect(() => {
        let completed = true;

        field.fields.forEach(field => {
            field.attributes.forEach(attribute => {
                const value = jp.value(account, attribute.path);

                if (attribute.required) {
                    setSkippable(false);
                }

                if (attribute.validator) {
                    const result = attribute.validator.validate(value);
                    if (result.error) completed = false;
                    console.log(attribute.key, value, result);
                }
            });
        });

        setCompleted(completed);
    }, [account, completed, field.fields]);

    const render = () => {
        return field.fields.map(field => {
            if (field.role && account.role !== field.role) return null;

            return field.attributes.map(attribute => {
                if (attribute.role && account.role !== attribute.role) return null;

                attribute.value = jp.value(account, attribute.path);
                attribute.onChange = value => {
                    if (value === "") value = null;
                    jp.apply(account, attribute.path, () => value);
                    setAccount({ ...account });
                };

                switch (attribute.type) {
                    case "text":
                        return <TextInput {...attribute} />;

                    case "radio":
                        return <ListInput {...attribute} />;

                    case "markdown":
                        return <TextareaInput {...attribute} />;

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
                                        <div className="shadow-sm">
                                            {render()}
                                        </div>
                                    </div>}

                                    {/* CHANGE MODAL BUTTONS */}
                                    <div className="flex justify-between mt-6 space-x-2">
                                        <Button
                                            onClick={back}
                                            className="sm:w-fit px-5 py-3 border shadow-sm text-sm bg-gray-100 font-medium rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            disabled={loading || !completed}
                                            loading={loading}
                                            className="sm:w-fit px-5 py-3 text-sm"
                                            onClick={next}
                                            arrow={true}
                                        >
                                            {skippable ? "Skip" : "Next"}
                                        </Button>
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
                value={value ?? ""}
            />
        </div>
    );
};

const ListInput = ({ title, required, value, options, onChange, placeholder }) => {
    const id = useId();

    const option_value_to_title = (options, value) => {
        // Find the option with the matching value
        const option = options.find(option => option.value === value);
        console.log(option, value);
        return option ? option.title : null;
    };

    const render = options => {
        return options.map(option => (
            <Listbox.Option
                key={option.value}
                className={({ active }) => classNames(
                    active ? "text-white bg-emerald-600" : "text-gray-800",
                    "cursor-default select-none relative py-2 pl-3 pr-9"
                )}
                value={option.value}
            >
                {({ selected, active }) => (
                    <>
                        <span className={classNames(selected ? "font-semibold" : "font-normal", selected && !active && "text-emerald-600", "block truncate")}>
                            {option.title}
                        </span>

                        {selected &&
                            <span
                                className={classNames(
                                    active ? "text-white" : "text-emerald-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                            >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                        }
                    </>
                )}
            </Listbox.Option>
        ));
    };

    return (
        <div className="relative border border-gray-300 rounded-md my-2 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
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
            <Listbox
                value={value ?? placeholder}
                onChange={onChange}
                id={id}
            >
                {({ open }) => (
                    <>
                        <div className="px-0 py-0 mt-1 relative">
                            <Listbox.Button className="bg-white relative w-full rounded-sm text-left py-1 cursor-default focus:outline-none focus:ring-0 sm:text-sm">
                                <span className="block truncate">
                                    {option_value_to_title(options, value) ?? placeholder}
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center -mr-1 pointer-events-none">
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
                                    {render(options)}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
};

const TextareaInput = ({ title, required, value, onChange, placeholder }) => {
    const id = useId();

    return (
        <div className="relative border border-gray-300 rounded-md my-2 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
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
            <textarea
                type="text"
                name="bio"
                id={id}
                className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                style={{ "height": "8rem" }}
                placeholder={placeholder}
                onChange={onChange}
                value={value ?? ""}
            />
        </div>
    );
};

export default Modal;