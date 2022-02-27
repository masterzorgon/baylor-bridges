/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import axios from "axios";

import SettingsNavbar from "../../components/SettingsNavbar";
import { AccountContext } from "../../components/Account";
import Photo from "../../components/Photo";
import Button from "../../components/Button";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const states = [
    "AZ", "NY", "CT", "MD", "WA", "OR", "NV", "NM", "DC", "DE", "MA", "MN", "WI", "IL",
    "VT", "RI", "NJ", "CO", "CA", "PA", "VA", "GA", "ME", "NH", "HI", "ID", "MT", "IN",
    "TE", "AK", "KY", "NC", "WV", "WY", "ND", "SD", "NE", "UT", "TN", "KS", "OK", "TX",
    "IO", "MO", "AR", "AL", "MS", "LA", "MI", "FL", "SC", "OH", "IA",
];

// eslint-disable-next-line no-unused-vars
const visibility_options = [
    {title: "Self", value:"self"},
    {title: "Alumni", value:"alumni"},
    {title: "Public", value:"public"},
];

const visibility_option_value_to_title = (value) => {
    // Find the option with the matching value
    const option = visibility_options.find(option => option.value === value);
    return option ? option.title : "";
};

const profile = {
    basic: {
        title: "Basic",
        description: "The following information will be displayed publically to everyone.",
        fields: {
            // photo: {
            //     title: "Photo",
            //     value: { type: "photo", key: "photo" },
            // },
            name: {
                title: "Name",
                value: [
                    { type: "text", title: "Prefix", placeholder: "Prefix", key: "prefix", role: "alumni" },
                    { type: "text", title: "First name", placeholder: "First name", key: "first_name" },
                    { type: "text", title: "Last name", placeholder: "Last name", key: "last_name" },
                ],
            },
            headline: {
                title: "Headline",
                value: { type: "text", title: "Headline", placeholder: "Headline", key: "headline" },
            },
            occupation: {
                title: "Occupation",
                value: { type: "text", title: "Occupation", placeholder: "Occupation", key: "occupation" },
            },
            location: {
                title: "Location",
                value: [
                    { type: "text", title: "City", placeholder: "City", key: "city" },
                    { type: "dropdown", title: "State", placeholder: "State", key: "state", options: states },
                ],
            },
            biography: {
                title: "Biography",
                value: { type: "textarea", title: "Biography", placeholder: "Biography", key: "biography" },
            },
        }
    },
    contact_info: {
        title: "Contact Information",
        description: "Manage your contact information and how they should be displayed.",
        fields: {
            email: {
                title: "Email address",
                value: [
                    { type: "text", title: "Email address", placeholder: "Email address", key: "email" },
                    { type: "visibility", title: "Visibility", placeholder: "self", key: "email_visibility" },
                ]
            },
            phone: {
                title: "Phone number",
                value: [
                    { type: "text", title: "Phone number", placeholder: "Phone number", key: "phone" },
                    { type: "visibility", title: "Visibility", placeholder: "self", key: "phone_visibility" },
                ]
            },
        }
    }
};


const Profile = () => {
    const { getAccountLocal } = useContext(AccountContext);
    const [account, setAccount] = useState(null);

    const [open, setOpen] = useState(false); // Whether modal is opened

    const [section_key, setSectionKey] = useState(null); // Current section key of the current fiels to change
    const [field, setField] = useState(null); // Current field to change in the modal
    const [update, setUpdate] = useState(null); // A dictionary to record everything need to be updated to axios

    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false); // Whether the axios is requesting


    useEffect(() => {
        setRefresh(false);

        axios.get("/account/profile")
            .then(res => {
                setAccount(res.data);
                console.log(res.data);
            })
            .catch(err => {
                if (err.response.status && err.response.status === 401) {
                    window.location.href = "/sign-in";
                } else {
                    window.location.href = "/404";
                }
            });

    }, []);

    // Get the value of a field, return either the compounded value, or null
    const getValueRaw = (section_key, field) => {
        // Photo
        if (field.value.type === "photo") {
            return <Photo size="10" />;
        }

        // Basic section would be from root, other sections from their sub-dictionary
        var account_from = account;
        if (section_key !== "basic") {
            account_from = account[section_key];
        }

        // If field value is an array, then traverse the array to concatenate the values from `account`
        // Otherwise, return the value from `account`
        if (Array.isArray(field.value)) {
            var string = "";
            field.value.map((value, index) => (
                account_from[value.key] && !value.key.includes("_visibility") && (value.role ? value.role === account.role : true) ? string += account_from[value.key] + " " : string += ""
            ));

            string = string.trim();
            if (string === "") {
                return null;
            }
            return string;
        } else {
            return account_from[field.value.key] ? account_from[field.value.key] : null;
        }
    };

    const getValue = (section_key, field) => {
        const value = getValueRaw(section_key, field);
        if (value === null) {
            return <div className="text-gray-400">Not set</div>;
        } else {
            return value;
        }
    };


    const getButtons = (section_key, field) => {
        const makeButton = (text) => {
            return (
                <button
                    type="button"
                    className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={() => onOpenModal(section_key, field)}
                >{text}</button>
            );
        };

        if (field.value === "photo") {
            return (
                <>
                    {makeButton("Update")}
                    <span className="text-gray-300 mt-2.5" aria-hidden="true">|</span>
                    {makeButton("Remove")}
                </>
            );
        }

        const value = getValueRaw(section_key, field);
        if (value === null) {
            return makeButton("Set");
        }

        return makeButton("Update");
    };


    const getModal = (field) => {
        // Field has to be valid
        if (!field) {
            return;
        }

        const getTypeDom = (value) => {
            const updateValue = (v) => {
                if (section_key === "basic") {
                    setUpdate({ ...update, [value.key]: v });
                } else {
                    setUpdate({ ...update, [section_key]: { ...update[section_key], [value.key]: v } });
                }
                console.log(update);
            };

            if (value.type === "file") {
                return <></>;
            } else if (value.type === "text") {
                return (
                    <>
                        <label htmlFor={value.key} className="block text-sm font-medium text-gray-700 sr-only">
                            {value.title}
                        </label>
                        <div className="mt-1">
                            <input
                                type={value.type}
                                name={value.key}
                                id={value.key}
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder={value.placeholder}
                                value={section_key === "basic" ? update[value.key] : update[section_key][value.key]}
                                onChange={(e) => updateValue(e.target.value)}
                            />
                        </div>
                    </>
                );
            } else if (value.type === "textarea") {
                return (
                    <>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 sr-only">
                            {value.title}
                        </label>
                        <div className="mt-1">
                            <textarea
                                rows={4}
                                name="comment"
                                id="comment"
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={section_key === "basic" ? update[value.key] : update[section_key][value.key]}
                                onChange={(e) => updateValue(e.target.value)}
                            />
                        </div>
                    </>
                );
            } else if (value.type === "dropdown") {
                return (
                    <>
                        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700 sr-only">
                            {value.title}
                        </label>

                        <Menu as="div" className="relative">
                            <div>
                                <Menu.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                                    <span className="block truncate">{(section_key === "basic" ? update[value.key] : update[section_key][value.key]) || "-"}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    <div className="py-1">
                                        {value.options.map((option, index) => (
                                            <Menu.Item key={option + "_option"}>
                                                {({ active }) => (
                                                    <div
                                                        className={classNames(
                                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                            "block px-4 py-2 text-sm"
                                                        )}
                                                        onClick={() => {
                                                            updateValue(option);
                                                            setRefresh(true);
                                                        }}
                                                    >
                                                        {option}
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </>
                );
            } else if (value.type === "visibility") {
                return (
                    <>
                        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700 sr-only">
                            {value.title}
                        </label>

                        <Menu as="div" className="relative">
                            <div>
                                <Menu.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                                    <span className="block truncate">{visibility_option_value_to_title(section_key === "basic" ? update[value.key] : update[section_key][value.key]) || visibility_option_value_to_title(value.placeholder)}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    <div className="py-1">
                                        {visibility_options.map((option, index) => (
                                            <Menu.Item key={option.value + "_option"}>
                                                {({ active }) => (
                                                    <div
                                                        className={classNames(
                                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                            "block px-4 py-2 text-sm"
                                                        )}
                                                        onClick={() => {
                                                            updateValue(option.value);
                                                            setRefresh(true);
                                                        }}
                                                    >
                                                        {option.title}
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </>
                );
            }
        };

        // If this whole field requires certain role to update and the account role does not match, return nothing for DOM
        if(field.role && field.role !== account.role){
            return;
        }

        // If it's compound field, traverse each atomic value
        // Else, return field itself
        if (Array.isArray(field.value)) {
            return (
                <>
                    <legend className="block text-sm font-medium text-gray-700">{field.title}</legend>
                    {
                        field.value.map((value, index) => (
                            (value.role ? value.role === account.role : true) ? getTypeDom(value) : null
                        ))
                    }
                    <Button
                        loading={loading}
                        disabled={loading}
                        onClick={() => onSubmit()}
                    >
                        Save
                    </Button>
                </>
            );
        } else {
            // If this single field requires certain role to update and the account role does not match, return nothing for DOM
            if(field.value.role && field.value.role !== account.role){
                return;
            }

            return (
                <>
                    <legend className="block text-sm font-medium text-gray-700">{field.title}</legend>
                    {getTypeDom(field.value)}
                    <Button
                        loading={loading}
                        disabled={loading}
                        onClick={() => onSubmit()}
                    >
                        Save
                    </Button>
                </>
            );
        }
    };

    // For button "Set" or "Update", press and trigger this function
    const onOpenModal = (section_key, field) => {
        let update = {};

        // According to difference section_key, copy with different level
        const copyField = (section_key, field) => {
            if (section_key === "basic") {
                update[field.key] = account[field.key];
            } else {
                if (!update[section_key]) {
                    update[section_key] = {};
                }
                update[section_key][field.key] = account[section_key][field.key];
            }
        };

        // If compound value, copy each atomic value, else copy the value directly
        if (Array.isArray(field.value)) {
            for (const f of field.value) {
                copyField(section_key, f);
            }
        } else {
            copyField(section_key, field.value);
        }

        console.log(update);

        setUpdate(update); // Set update dictionary
        setSectionKey(section_key); // Set current section key for current field
        setField(field); // Set current field for modal to update
        setOpen(true); // Open the modal
    };

    const onSubmit = () => {
        setLoading(true);

        axios.put("/account/profile", update)
            .then(res => {
                console.log(res);
                setAccount(res.data);
                setOpen(false);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (

        <>
            <div>
                {/* Content area */}
                <div className="">
                    <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
                        <main className="flex-1">
                            <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                                <div className="pt-10 pb-16">
                                    <div className="px-4 sm:px-6 md:px-0">
                                        <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
                                    </div>
                                    <div className="px-4 sm:px-6 md:px-0">
                                        <div className="py-6">
                                            <SettingsNavbar current="profile" />
                                            {
                                                account !== null && Object.entries(profile).map(([section_key, section]) => (
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
                                                                        <div key={field_key} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4" >
                                                                            <dt className="text-sm font-medium text-gray-500">{field.title}</dt>
                                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                                <span className="flex-grow">
                                                                                    {getValue(section_key, field)}
                                                                                </span>
                                                                                <span className="ml-4 flex-shrink-0 flex item-start space-x-4">
                                                                                    {getButtons(section_key, field)}
                                                                                </span>
                                                                            </dd>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </dl>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setOpen}>
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 space-y-4">
                                {getModal(field)}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default Profile;
