import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { EyeIcon, MailIcon, EyeOffIcon, ExclamationIcon, LockClosedIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import axios from "axios";

import Button from "../../components/Button";
import Markdown from "../../components/Markdown";
import Password from "../../components/Password";

// const AccountContext = JSON.parse(localStorage.getItem("account"));

import { classNames } from "../../components/Utils";


const visibility_options = [
    { title: "Self", value: "self", description: "Only you can see this field in your profile" },
    { title: "Alumni", value: "alumni", description: "Other alumni can see this field in your profile" },
    { title: "Public", value: "public", description: "Everyone can see this field in your profile" },
];

const option_value_to_title = (options, value) => {
    // Find the option with the matching value
    const option = options.find(option => option.value === value);
    return option ? option.title : "";
};

// const option_value_to_description = (options, value) => {
//     // Find the option with the matching value
//     const option = options.find(option => option.value === value);
//     return option ? option.description : "";
// };

const account_information = {
    basic: {
        title: "Account Settings",
        description: "Manage your account information, authentication, and deactivation status.",
        fields: {
            verified_email:
            {
                title: "Change Verified Email",
                attribute: [
                    { type: "email", title: "Change Verfied Email", placeholder: "New Email Address", key: "verified_email" },
                ],
            },
            change_password:
            {
                title: "Change Password",
                attribute: [
                    { type: "text", title: "New Password", key: "new_password", required: true },
                ],
            },
            two_factor_authentication:
            {
                title: "Two-Factor Authentication",
                attribute: [
                    { type: "two-fa", title: "Two-Factor Authentication" },
                ]
            },
            deactivate_account:
            {
                title: "Deactivate Account",
                attribute: { type: "deactivate", title: "Deactivate Account" },
            },
        }
    },
};


const Account = () => {
    const [account, setAccount] = useState(null);

    const [open, setOpen] = useState(false); // Whether modal is opened

    const [section_key, setSectionKey] = useState(null); // Current section key of the current fiels to change
    const [field, setField] = useState(null); // Current field to change in the modal
    const [update, setUpdate] = useState(null); // A dictionary to record everything need to be updated to axios

    const [loading, setLoading] = useState(false); // Whether the axios is requesting
    const [complete, setComplete] = useState(true); // Whether the fields in the modal are completed (prevent REQUIRED fields left empty)

    const [email, setEmail] = useState(null); // the value of the email provided
    const [error_message, setErrorMessage] = useState(null);
    const [sendEmail, setSendEmail] = useState(false);

    const { role } = useParams(); // to retrieve the type of user associated with this account (student or alumni)

    // First enter this page, fetch account profile data
    useEffect(() => {
        axios.get("/accounts/me")
            .then(res => {
                setAccount(res.data);
                console.log(res.data);
            })
            .catch(err => toast.error(err.response.data.message));

    }, []);

    // When update field changed, check completeness
    useEffect(() => {
        // If no current field for modal, return
        if (!field) {
            return;
        }

        // Set complete to default true
        setComplete(true);

        if (!Array.isArray(field.attribute)) {
            field.attribute = [field.attribute];
        }

        // For all atomic attribute in this field, check if required ones are not empty
        let complete = true;
        let required = field.attribute.filter(value => value.required); // Fetch all REQUIRED atomic attribute

        required.forEach(value => {
            let _value = update[value.key];

            if (!_value || _value === "") {
                complete = false;
            }
        });

        setComplete(complete);
    }, [update, field]);

    // Get the raw value of a field, return either the field attribute value, or null, with the visibility value
    const getFieldDisplayValueRaw = (section_key, field) => {
        if (account === null) {
            return [null, null];
        }

        // Basic section would be from root, other sections from their sub-dictionary
        let account_from = account;

        // If not basic section, then get the sub-dictionary
        if (section_key !== "basic") {
            account_from = account[section_key];
        }

        // If field attribute is not an array, make it an array, with only itself
        if (!Array.isArray(field.attribute)) {
            field.attribute = [field.attribute];
        }

        // Initialize values
        let string = "";
        let visibility = null;

        // Traverse each atomic attribute
        field.attribute.forEach((attribute, index) => {
            if (attribute.key in account_from && account_from[attribute.key]) {
                // If visibility attribute, then get the visibility value
                // If other attribute, then get the value
                if (attribute.type === "visibility") {
                    visibility = account_from[attribute.key];
                } else {
                    if (attribute.type === "dropdown") {
                        string += option_value_to_title(attribute.options, account_from[attribute.key]) + " ";
                    } else {
                        string += account_from[attribute.key] + " ";
                    }
                }
            }
        });

        // Return values
        string = string.trim(); // Remove spaces
        if (string === "") {
            return [null, visibility];
        }
        return [string, visibility];
    };

    const getFieldDisplayValue = (section_key, field) => {

        // Other fields
        const [value, visibility] = getFieldDisplayValueRaw(section_key, field);

        if (value === null) {
            return <div className="text-gray-400"></div>;
        } else {
            // If has visibility attribute, display eye/eyeoff icon
            // else, return just the value
            if (visibility !== null) {
                return (
                    <div className="flex items-center space-x-1">
                        <p>{value}</p>
                        {visibility !== "self" && <EyeIcon className="h-4 w-4 text-gray-400" />}
                        {visibility === "self" && <EyeOffIcon className="h-4 w-4 text-gray-400" />}
                    </div>
                );
            } else {
                return value;
            }
        }
    };

    // Get modal button for given field
    const getFieldModalButton = (section_key, field) => {
        // Make a button with given text
        const makeButton = (text) => {
            return (
                <button
                    type="button"
                    className={field.title === "Deactivate Account" ? "bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"}
                    onClick={() => onOpenFieldModal(section_key, field)}
                >
                    {field.title === "Deactivate Account" ? "Deactivate" : text}
                </button>
            );
        };

        // Return different button according to raw value
        // eslint-disable-next-line no-unused-vars
        const [value, visibility] = getFieldDisplayValueRaw(section_key, field);

        if (value === null) {
            return makeButton("Update");
        } else {
            return makeButton("Enable");
        }
    };


    const getFieldModal = (field) => {
        // Field has to be valid
        if (!field) {
            return;
        }

        const getAttributeDom = (attribute) => {
            // Put value validation condition when inputing here
            const isValidAttributeValue = (attribute, value) => {
                // Graduate year: can only input 4 digits
                if (attribute.key === "graduate_year") {
                    return /^\d{0,4}$/.test(value);
                }

                return true;
            };

            // Update values to be updated through axios
            const updateAttributeValue = (v) => {
                if (v === undefined) {
                    return;
                }

                if (isValidAttributeValue(attribute, v)) {
                    if (section_key === "basic") {
                        setUpdate({ ...update, [attribute.key]: v });
                    } else {
                        setUpdate({ ...update, [section_key]: { ...update[section_key], [attribute.key]: v } });
                    }
                }
            };

            if (attribute.type === "file") {
                return <></>;
            } else if (attribute.type === "visibility") {
                // Visibility is a special type of dropdown
                // Define it's behavior and render it using dropdown
                let value_copy = {};
                Object.assign(value_copy, attribute);
                value_copy.type = "dropdown";
                value_copy.options = visibility_options;
                value_copy.placeholder = value_copy.placeholder ? value_copy.placeholder : "self";
                value_copy.title = value_copy.title ? value_copy.title : "Visibility";
                value_copy.description = value_copy.description ? value_copy.description : "Who can see this?";
                return getAttributeDom(value_copy);
            } else if (attribute.type === "markdown-editor") {
                return (
                    <>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 sr-only">
                            {attribute.title}
                        </label>
                        <div className="grid grid-cols-2 gap-2 h-96">
                            <div className="mt-1">
                                <textarea
                                    rows={4}
                                    name="comment"
                                    id="comment"
                                    className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md h-full resize-none"
                                    value={section_key === "basic" ? update[attribute.key] : update[section_key][attribute.key]}
                                    onChange={(e) => updateAttributeValue(e.target.value)}
                                />
                            </div>
                            <div className="overflow-auto shadow-sm px-4 py-2 rounded-md border-gray-300">
                                <Markdown>
                                    {section_key === "basic" ? update[attribute.key] : update[section_key][attribute.key]}
                                </Markdown>
                            </div>
                        </div>
                    </>
                );
            } else if (attribute.type === "text") {
                return (
                    <>
                        <label htmlFor={attribute.key} className="block text-sm font-medium text-gray-700 sr-only">
                            {attribute.title}
                        </label>
                        <div className="mt-1">
                            {/* <input
                                type={attribute.type}
                                name={attribute.key}
                                id={attribute.key}
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder={attribute.placeholder}
                                value={section_key === "basic" ? update[attribute.key] : update[section_key][attribute.key]}
                                onChange={(e) => updateAttributeValue(e.target.value)}
                            /> */}
                            <Password />
                        </div>
                    </>
                );
            } else if (attribute.type === "deactivate") {
                return (
                    <>
                        <label htmlFor={attribute.key} className="block text-sm font-medium text-gray-700 sr-only">
                            {attribute.title}
                        </label>
                        <div className="mt-1 flex">
                            <div className="mx-auto my-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <p className="ml-5 max-w-2xl text-sm text-gray-500">
                                You’re about to start the process of deactivating your
                                Baylor Birdges account. Your display name, and public
                                profile will no longer be viewable on baylorbridges.com.
                            </p>
                        </div>
                    </>
                );
            } else if (attribute.type === "two-fa") {
                return (
                    <>
                        <label htmlFor={attribute.key} className="block text-sm font-medium text-gray-700 sr-only">
                            {attribute.title}
                        </label>
                        <div className="mt-1 flex">
                            <div className="mx-auto my-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
                                <LockClosedIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                            </div>
                            <p className="ml-5 max-w-2xl text-sm text-gray-500">
                                Help protect your account from unauthorized access by
                                requiring a second authentication method in addition to your
                                Baylor Bridges password.
                            </p>
                        </div>
                    </>
                );
            } else if (attribute.type === "email") {
                return (
                    <>
                        <label htmlFor={attribute.key} className="block text-sm font-medium text-gray-700 sr-only">
                            {attribute.title}
                        </label>
                        <div className="mt-4 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className={classNames("block w-full pl-10 sm:text-sm rounded-md", error_message === null ? "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" : "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500")}
                                placeholder={role === "student" ? "you@baylor.edu" : "you@alumni.baylor.edu"}
                                value={email}
                                onFocus={() => setSendEmail(true)}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                    </>
                );
            }
        };

        // If this whole field requires certain role to update and the account role does not match, return nothing for DOM
        if (field.role && field.role !== account.role) {
            return;
        }

        // If this field has only one attribute, make it an array of one
        if (!Array.isArray(field.attributes)) {
            field.attributes = [field.attributes];
        }

        return (
            <>
                <legend className="block text-sm font-medium text-gray-700">{field.title}</legend>
                {
                    field.attribute.map((attribute, index) => (
                        (attribute.role ? attribute.role === account.role : true) ? getAttributeDom(attribute) : null
                    ))
                }
                {

                }
                <Button
                    loading={loading}
                    disabled={loading || !complete}
                    onClick={() => onSubmit()}
                    className={field.title === "Deactivate Account" ? "text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"}
                >
                    {field.title === "Deactivate Account"
                        ? "Deactivate"
                        : (field.title === "Two-Factor Authentication" ? "Enable" : "Save")}
                </Button>
            </>
        );
    };

    // For button "Set" or "Update", press and trigger this function
    const onOpenFieldModal = (section_key, field) => {
        let update = {};

        if (!Array.isArray(field.attribute)) {
            field.attribute = [field.attribute];
        }

        // Copy all related field attribute value to update dictionary
        for (const a of field.attribute) {
            if (section_key === "basic") update[a.key] = account[a.key];
            else {
                if (!update[section_key]) update[section_key] = {};
                update[section_key][a.key] = account[section_key][a.key];
            }
        }

        setUpdate(update); // Set update dictionary
        setSectionKey(section_key); // Set current section key for current field
        setField(field); // Set current field for modal to update
        setOpen(true); // Open the modal
    };

    const onSubmit = () => {
        setLoading(true);

        if (sendEmail) {
            // update account verified email
            axios.put("/accounts/me/username", { username: email })
                .then(res => {
                    console.log(res.data);
                }).catch(err => {
                    let response = err.response.data;

                    if (response.code === "EmailExistsException") {
                        setErrorMessage("This email address is already associated with another account.");
                    } else if (response.code === "ConfirmationRequiredException") {
                        setErrorMessage("This email address is already associated with another account.");
                    } else {
                        setErrorMessage("We are unable to continue for you at this moment.");
                    }

                    console.log(err);
                }).finally(() => {
                    setSendEmail(false);
                    setLoading(false);
                });
        }


        axios.put("/accounts/me", update)
            .then(res => {
                console.log(res);
                setAccount(res.data);
                setOpen(false);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    };

    const makeField = (section_key, field_key, field) => {
        if (field.role === undefined || (account != null && "role" in account && field.role === account.role)) {
            // If account is not ready because axios is requesting, show animated data-placeholder
            if (account === null) {
                return (
                    <div key={field_key} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4" >
                        <dt data-placeholder className="w-1/2 h-5 rounded-md" ></dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span data-placeholder className="flex-grow h-5 rounded-md"></span>
                            <span data-placeholder className="ml-4 -shrink-0 flex item-start space-x-4 w-1/3 h-5 rounded-md"></span>
                        </dd>
                    </div>
                );
            }

            return (
                <div key={field_key} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4" >
                    <dt className="text-sm font-medium text-gray-500">
                        {field.title}
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">
                            {getFieldDisplayValue(section_key, field)}
                        </span>
                        <span className="ml-4 flex-shrink-0 flex item-start space-x-4">
                            {getFieldModalButton(section_key, field)}
                        </span>
                    </dd>
                </div>
            );
        }
    };

    return (
        <>
            {
                Object.entries(account_information).map(([section_key, section]) => (
                    <div key={section_key} className="mt-10 divide-y divide-gray-200">
                        {/* Title and description */}
                        <div className="space-y-1">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{section.title}</h3>
                            <p className="max-w-2xl text-sm text-gray-500">{section.description}</p>
                        </div>
                        <div className="mt-6">
                            <dl className="divide-y divide-gray-200">
                                {
                                    Object.entries(section.fields).map(([field_key, field]) => (
                                        makeField(section_key, field_key, field)
                                    ))
                                }
                            </dl>
                        </div>
                    </div>
                ))
            }

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-50 inset-0 overflow-none" onClose={() => { if (!loading) setOpen(false); }}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className={
                                    classNames("w-full inline-block align-bottom bg-white rounded-lg p-4 text-left shadow-xl",
                                        "transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 space-y-4",
                                        field && field.className ? field.className : ""
                                    )
                                }
                            >
                                {getFieldModal(field)}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default Account;
