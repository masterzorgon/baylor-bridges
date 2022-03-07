import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { SelectorIcon, CheckIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import axios from "axios";

import Container from "./Container";
import Photo from "../../components/Photo";
import Button from "../../components/Button";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const states = [
    { title: "Arizona", value: "AZ", description: "AZ" }, { title: "New York", value: "NY", description: "NY" }, { title: "Connecticut", value: "CT", description: "CT" }, { title: "Maryland", value: "MD", description: "MD" }, { title: "Washington", value: "WA", description: "WA" }, { title: "Oregon", value: "OR", description: "OR" }, { title: "Nevada", value: "NV", description: "NV" }, { title: "New Mexico", value: "NM", description: "NM" }, { title: "District of Columbia", value: "DC", description: "DC" }, { title: "Delaware", value: "DE", description: "DE" }, { title: "Massachusetts", value: "MA", description: "MA" }, { title: "Minnesota", value: "MN", description: "MN" }, { title: "Wisconsin", value: "WI", description: "WI" }, { title: "Illinois", value: "IL", description: "IL" },
    { title: "Vermont", value: "VT", description: "VT" }, { title: "Rhode Island", value: "RI", description: "RI" }, { title: "New Jersey", value: "NJ", description: "NJ" }, { title: "Colorado", value: "CO", description: "CO" }, { title: "California", value: "CA", description: "CA" }, { title: "Pennsylvania", value: "PA", description: "PA" }, { title: "Virginia", value: "VA", description: "VA" }, { title: "Georgia", value: "GA", description: "GA" }, { title: "Maine", value: "ME", description: "ME" }, { title: "New Hampshire", value: "NH", description: "NH" }, { title: "Hawaii", value: "HI", description: "HI" }, { title: "Idaho", value: "ID", description: "ID" }, { title: "Montana", value: "MT", description: "MT" }, { title: "Indiana", value: "IN", description: "IN" },
    { title: "Alaska", value: "AK", description: "AK" }, { title: "Kentucky", value: "KY", description: "KY" }, { title: "North Carolina", value: "NC", description: "NC" }, { title: "West Virginia", value: "WV", description: "WV" }, { title: "Wyoming", value: "WY", description: "WY" }, { title: "North Dakota", value: "ND", description: "ND" }, { title: "South Dakota", value: "SD", description: "SD" }, { title: "Nebraska", value: "NE", description: "NE" }, { title: "Utah", value: "UT", description: "UT" }, { title: "Tennessee", value: "TN", description: "TN" }, { title: "Kansas", value: "KS", description: "KS" }, { title: "Oklahoma", value: "OK", description: "OK" }, { title: "Texas", value: "TX", description: "TX" },
    { title: "Missouri", value: "MO", description: "MO" }, { title: "Arkansas", value: "AR", description: "AR" }, { title: "Alabama", value: "AL", description: "AL" }, { title: "Mississippi", value: "MS", description: "MS" }, { title: "Louisiana", value: "LA", description: "LA" }, { title: "Michigan", value: "MI", description: "MI" }, { title: "Florida", value: "FL", description: "FL" }, { title: "South Carolina", value: "SC", description: "SC" }, { title: "Ohio", value: "OH", description: "OH" }, { title: "Iowa", value: "IA", description: "IA" },
];

const semester = [
    { title: "Spring", value: "spring" },
    { title: "Fall", value: "fall" }
];

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

const option_value_to_description = (options, value) => {
    // Find the option with the matching value
    const option = options.find(option => option.value === value);
    return option ? option.description : "";
};

const profile = {
    basic: {
        title: "Basic",
        description: "The following information will be displayed publically to everyone.",
        fields: {
            // photo: {
            //     title: "Photo",
            //     attribute: { type: "photo", key: "photo" },
            // },
            name: {
                title: "Name",
                attribute: [
                    { type: "text", title: "Prefix", placeholder: "Prefix", key: "prefix", role: "alumni" },
                    { type: "text", title: "First name", placeholder: "First name", key: "first_name", required: true },
                    { type: "text", title: "Last name", placeholder: "Last name", key: "last_name", required: true },
                ],
            },
            headline: {
                title: "Headline",
                attribute: { type: "text", title: "Headline", placeholder: "Headline", key: "headline" },
            },
            graduate_class_alumni: {
                title: "Graduate Class",
                role: "alumni",
                attribute: [
                    { type: "dropdown", title: "Semester", placeholder: "Semester", key: "graduate_semester", options: semester },
                    { type: "text", title: "Year", placeholder: "Year", key: "graduate_year" }
                ]
            },
            graduate_class_student: {
                title: "Expecting Graduate Class",
                role: "student",
                attribute: [
                    { type: "dropdown", title: "Semester", placeholder: "Semester", key: "graduate_semester", options: semester },
                    { type: "text", title: "Year", placeholder: "Year", key: "graduate_year" }
                ]
            },
            occupation: {
                title: "Occupation",
                role: "alumni",
                attribute: { type: "text", title: "Occupation", placeholder: "Occupation", key: "occupation", role: "alumni" },
            },
            location: {
                title: "Location",
                attribute: [
                    { type: "text", title: "City", placeholder: "City", key: "city" },
                    { type: "dropdown", title: "State", placeholder: "State", key: "state", options: states },
                ],
            },
            biography: {
                title: "Biography",
                attribute: { type: "textarea", title: "Biography", placeholder: "Biography", key: "biography" },
            },
        }
    },
    contact_info: {
        title: "Contact Information",
        description: "Manage your contact information and how they should be displayed.",
        fields: {
            email: {
                title: "Email address",
                attribute: [
                    { type: "text", title: "Email address", placeholder: "Email address", key: "email" },
                    { type: "visibility", key: "email_visibility" },
                ]
            },
            phone: {
                title: "Phone number",
                attribute: [
                    { type: "text", title: "Phone number", placeholder: "Phone number", key: "phone" },
                    { type: "visibility", key: "phone_visibility" },
                ]
            },
        }
    },
};


const Profile = () => {
    const [account, setAccount] = useState(null);

    const [open, setOpen] = useState(false); // Whether modal is opened

    const [section_key, setSectionKey] = useState(null); // Current section key of the current fiels to change
    const [field, setField] = useState(null); // Current field to change in the modal
    const [update, setUpdate] = useState(null); // A dictionary to record everything need to be updated to axios

    const [loading, setLoading] = useState(false); // Whether the axios is requesting
    const [complete, setComplete] = useState(true); // Whether the fields in the modal are completed (prevent REQUIRED fields left empty)

    // First enter this page, fetch account profile data
    useEffect(() => {
        axios.get("/account/profile")
            .then(res => {
                setAccount(res.data);
                console.log(res.data);
            })
            .catch(err => {
                err.response.status && err.response.status === 401
                    ? window.location.href = "/sign-in"
                    : window.location.href = "/404";
            });

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
        if(account === null){
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
        // Photo - Return Photo component
        if (field.attribute && field.attribute.type === "photo") {
            return <Photo size="10" />;
        }

        // Other fields
        const [value, visibility] = getFieldDisplayValueRaw(section_key, field);
        if (value === null) {
            return <div className="text-gray-400">Not set</div>;
        } else {
            // If has visibility attribute, display eye/eyeoff icon
            // else, return just the value
            if (visibility !== null) {
                return (
                    <div className="flex items-center space-x-1">
                        <p>{value}</p>
                        {visibility !== "self" && <EyeIcon className="h-4 w-4 text-gray-400 pointer-events-none" />}
                        {visibility === "self" && <EyeOffIcon className="h-4 w-4 text-gray-400 pointer-events-none" />}
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
                    className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={() => onOpenFieldModal(section_key, field)}
                >
                    {text}
                </button>
            );
        };

        // Photo - Return special operations button for photo field - Update | Delete
        if (field.attribute === "photo") {
            return (
                <>
                    {makeButton("Update")}
                    <span className="text-gray-300 mt-2.5" aria-hidden="true">|</span>
                    {makeButton("Remove")}
                </>
            );
        }

        // Return different button according to raw value
        // eslint-disable-next-line no-unused-vars
        const [value, visibility] = getFieldDisplayValueRaw(section_key, field);

        if (value === null) {
            return makeButton("Set");
        } else {
            return makeButton("Update");
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
                    }
                    else {
                        setUpdate({ ...update, [section_key]: { ...update[section_key], [attribute.key]: v } });
                    }
                }
            };

            if (attribute.type === "file") {
                return <></>;
            }

            else if (attribute.type === "text") {
                return (
                    <>
                        <label htmlFor={attribute.key} className="block text-sm font-medium text-gray-700 sr-only">
                            {attribute.title}
                        </label>
                        <div className="mt-1">
                            <input
                                type={attribute.type}
                                name={attribute.key}
                                id={attribute.key}
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder={attribute.placeholder}
                                value={section_key === "basic" ? update[attribute.key] : update[section_key][attribute.key]}
                                onChange={(e) => updateAttributeValue(e.target.value)}
                            />
                        </div>
                    </>
                );
            }

            else if (attribute.type === "textarea") {
                return (
                    <>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 sr-only">
                            {attribute.title}
                        </label>
                        <div className="mt-1">
                            <textarea
                                rows={4}
                                name="comment"
                                id="comment"
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={section_key === "basic" ? update[attribute.key] : update[section_key][attribute.key]}
                                onChange={(e) => updateAttributeValue(e.target.value)}
                            />
                        </div>
                    </>
                );
            }

            else if (attribute.type === "dropdown") {
                return (
                    <>
                        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700 sr-only">
                            {attribute.title}
                        </label>

                        <Listbox
                            as="div"
                            value={(section_key === "basic" ? update[attribute.key] : update[section_key][attribute.key]) || (attribute.placeholder)}
                            onChange={(value) => {
                                updateAttributeValue(value);
                            }}
                        >
                            {({ open }) => (
                                <>
                                    <div className="relative">
                                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                                            <span className="w-full inline-flex truncate">
                                                <span className="">{option_value_to_title(attribute.options, section_key === "basic" ? update[attribute.key] : update[section_key][attribute.key]) || option_value_to_title(attribute.options, attribute.placeholder) || <div className="text-gray-500">{attribute.title}</div>}</span>
                                                <span className="ml-2 truncate text-gray-500">{option_value_to_description(attribute.options, section_key === "basic" ? update[attribute.key] : update[section_key][attribute.key]) || option_value_to_description(attribute.options, attribute.placeholder)}</span>
                                            </span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                {attribute.options.map((option, index) => (
                                                    <Listbox.Option
                                                        key={option.value + "_option"}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? "text-white bg-emerald-600" : "text-gray-900",
                                                                "cursor-default select-none relative py-2 pl-8 pr-4"
                                                            )
                                                        }
                                                        value={option.value}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <div className="flex">
                                                                    <span className={classNames(selected ? "font-semibold" : "font-normal", "truncate")}>
                                                                        {option.title}
                                                                    </span>
                                                                    <span className={classNames(active ? "text-indigo-200" : "text-gray-500", "ml-2 truncate")}>
                                                                        {option.description}
                                                                    </span>
                                                                </div>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? "text-white" : "text-emerald-600",
                                                                            "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </>
                );
            }

            else if (attribute.type === "visibility") {
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
                <Button
                    loading={loading}
                    disabled={loading || !complete}
                    onClick={() => onSubmit()}
                >
                    Save
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

        axios.put("/account/profile", update)
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
            <Container current="profile">
                {
                    Object.entries(profile).map(([section_key, section]) => (
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
            </Container>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={() => { if (!loading) setOpen(false); }}>
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
                            <div className="w-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 space-y-4">
                                {getFieldModal(field)}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default Profile;
