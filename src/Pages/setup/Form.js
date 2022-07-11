import React, { useState, useEffect, useContext, useId, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/outline";
import { animated } from "react-spring";
import { useTimeoutFn } from "react-use";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTransition } from "react-spring";
import { CheckCircleIcon, UserCircleIcon, LocationMarkerIcon, AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/outline";
import { InboxIcon } from "@heroicons/react/outline";
import axios from "axios";
import jp from "jsonpath";

import { classNames } from "../../components/Utils";
import { Button } from "../../components/Button";
import { Properties } from "../../components/profile/Fields";
import { AccountContext } from "../../components/Account";

const fields = {
    name: {
        title: "Name",
        sequence: 1,
        description: "Please provide your full name. This is the name others will see on your profile for others who may reach you.",
        icon: UserCircleIcon,
        fields: [
            Properties.name,
        ]
    },
    contact: {
        title: "Contact Information",
        sequence: 2,
        description: "Please provide the contact information through which you wish to be contacted. This information will be publicly displayed on your account.",
        icon: InboxIcon,
        fields: [
            Properties.email,
            Properties.phone,
        ]
    },
    location: {
        title: "Location Information",
        sequence: 3,
        description: "Please provide your location information. This information will be used to fill out our Baylor Bridges heat map as displayed on the home page.",
        icon: LocationMarkerIcon,
        fields: [
            Properties.location,
        ]
    },
    graduation: {
        title: "Graduating Class",
        sequence: 4,
        description: "Please provide the year and semester of your graduating class from Baylor University. If you have not yet graduated, please provide the  graduation year and semester.",
        icon: AcademicCapIcon,
        fields: [
            Properties.graduate_alumni,
            Properties.graduate_student,
        ]
    },
    headline: {
        title: "Headline",
        sequence: 5,
        description: "Your headline should be your professional title, and your biography should be a summary of who you are and what you do.",
        icon: BriefcaseIcon,
        fields: [
            Properties.headline,
            Properties.occupation,
            Properties.biography,
        ]
    },
    done: {
        title: "You're all set!",
        subtitle: "Great job.",
        sequence: 6,
        description: "Thank you so much for taking the time to set up your Baylor Bridges account. We hope you enjoy our platform, and please feel to reach out via the Contact Us page if you have any questions or concerns.",
        icon: CheckCircleIcon,
    }
};

const Form = () => {
    const [show, setShow] = useState(false); // used to fade modals in and out
    const [, , showTheModal] = useTimeoutFn(() => setShow(true), 200); // used to fade modals in
    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 200); // used to fade modal out
    const [sequence, setSequence] = useState(1); // used to switch between modals
    const [loading, setLoading] = useState(false); // indicates that data is being sent to server

    const { account: defaultAccount } = useContext(AccountContext);
    const [account, setAccount] = useState(defaultAccount);

    const navigate = useNavigate();

    // this makes the modal fade in on refresh
    useEffect(() => showTheModal(), [sequence]);

    // get current authenticated account profile
    const x_fields = "user_id, first_name, last_name, headline, prefix, role, occupation, graduate_year, graduate_semester, city, state, occupation, biography, contact_info";
    useEffect(() => {
        axios.get("/accounts/me", { headers: { "x-fields": x_fields } })
            .then(res => {
                setAccount(res.data);
            })
            .catch(err => {
                toast.error(err.response.data.message);
            });
    }, []);

    const next = () => {
        setLoading(true);

        axios.put("/accounts/me", account, { headers: { "x-fields": x_fields } })
            .then(res => {
                setLoading(false);

                if (sequence === 5) {
                    navigate("/setup/done");
                } else {
                    setTimeout(() => setSequence(sequence + 1), 400);
                }
            }).catch(err => {
                toast.error(err.response.data.message);
            }).finally(() => {
                setLoading(false);
                takeAwayModal();
            });
    };

    const back = () => {
        setLoading(false);
        setTimeout(() => setSequence(sequence - 1), 400);
        takeAwayModal();
    };

    // used to fade icon in
    const transition = useTransition(show, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });

    // RENDER MODAL COMPONENTS
    for (const property in fields) {

        if (fields[property].sequence === sequence) {
            const modalField = fields[property];

            return (
                <>
                    {/* BACKGROUND */}
                    <div className="flex sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full pointer-events-none -z-10" aria-hidden="true">
                        <div className="relative h-full w-full mx-auto overflow-hidden">
                            <svg
                                className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
                                width={404}
                                height={784}
                                fill="none"
                                viewBox="0 0 404 784"
                            >
                                <defs>
                                    <pattern
                                        id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
                            </svg>
                            <svg
                                className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
                                width={404}
                                height={784}
                                fill="none"
                                viewBox="0 0 404 784"
                            >
                                <defs>
                                    <pattern
                                        id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
                            </svg>
                        </div>
                    </div>

                    {/* INPUT MODALS */}
                    <Modal
                        field={modalField}
                        loading={loading}
                        show={show}
                        modal={sequence}
                        transition={transition}
                        account={account}
                        setAccount={setAccount}
                        next={next}
                        {...(sequence > 1 ? { back } : null)}
                    />
                </>
            );
        }
    }
};


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
    const [modified, setModified] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [skippable, setSkippable] = useState(false);

    useEffect(() => {
        let modified = false;
        let completed = true;
        let skippable = true;

        field.fields.forEach(field => {
            field.attributes.forEach(attribute => {
                const value = jp.value(account, attribute.path);

                if (attribute.type !== "visibility" && value && value !== "") {
                    modified = true;
                }

                if (attribute.required) {
                    skippable = false;
                }

                if (attribute.validator) {
                    const result = attribute.validator.validate(value);
                    if (result.error) {
                        completed = false;
                    }
                }
            });
        });

        setModified(modified);
        setSkippable(skippable);
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
                        return <Text {...attribute} />;

                    case "radio":
                        return <Radio {...attribute} />;

                    case "markdown":
                        return <Textarea {...attribute} />;

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
                                    <div className="flex-1 relative pt-16 pb-4">
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
                                    <div className="flex justify-between mt-5 space-x-2">
                                        {
                                            back ?
                                                <Button
                                                    onClick={back}
                                                    className="sm:w-fit px-5 py-3.5 border shadow-sm text-sm bg-gray-100 font-medium rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                >
                                                    Back
                                                </Button>
                                                : <p></p>
                                        }
                                        <Button
                                            disabled={loading || !completed}
                                            loading={loading}
                                            className="sm:w-fit px-5 py-3.5 text-sm font-medium"
                                            onClick={next}
                                            arrow={true}
                                        >
                                            {
                                                (skippable && !modified) ? "Skip" : "Next"
                                            }
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


const Text = ({ title, required, value, onChange, placeholder }) => {
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

const Radio = ({ title, required, value, options, onChange, placeholder }) => {
    const id = useId();

    const option_value_to_title = (options, value) => {
        // Find the option with the matching value
        const option = options.find(option => option.value === value);
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

const Textarea = ({ title, required, value, onChange, placeholder }) => {
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
                onChange={(event) => onChange(event.target.value)}
                value={value ?? ""}
            />
        </div>
    );
};


export default Form;
