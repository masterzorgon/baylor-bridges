/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import axios from "axios";

import SettingsNavbar from "../../components/SettingsNavbar";
import { AccountContext } from "../../components/Account";
import Photo from "../../components/Photo";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const states = [
    "AZ", "NY", "CT", "MD", "WA", "OR", "NV", "NM", "DC", "DE", "MA", "MN", "WI", "IL",
    "VT", "RI", "NJ", "CO", "CA", "PA", "VA", "GA", "ME", "NH", "HI", "ID", "MT", "IN",
    "TE", "AK", "KY", "NC", "WV", "WY", "ND", "SD", "NE", "UT", "TN", "KS", "OK", "TX",
    "IO", "MO", "AR", "AL", "MS", "LA", "MI", "LA", "FL", "SC", "OH", "IA",
];

// eslint-disable-next-line no-unused-vars
const contact_status = [
    "self", "Alumni", "public"
];

const profile = {
    basic: {
        title: "Basic",
        description: "The following information will be displayed publically to everyone.",
        fields: {
            photo: {
                title: "Photo",
                value: { type: "photo", key: "photo" },
            },
            name: {
                title: "Name",
                value: [
                    { type: "text", title: "Prefix", placeholder: "Prefix", key: "prefix" },
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
                    { type: "dropdown", title: "State", placeholder: "State", key: "state" },
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
                value: [{ type: "text", title: "Email address", placeholder: "Email address", key: "email" },
                    { type: "dropdown", title: "Visibility", placeholder: "self", key: "email_visibility" },]
            },
            phone: {
                title: "Phone number",
                value: [{ type: "text", title: "Phone number", placeholder: "Phone number", key: "phone" },
                    { type: "dropdown", title: "Visibility", placeholder: "self", key: "phone_visibility" },]
            },
        }
    }
};


const Profile = () => {
    const { getAccountLocal } = useContext(AccountContext);
    const [account, setAccount] = useState(null);

    const [open, setOpen] = useState(false);
    const [field, setField] = useState(null);
    const [update, setUpdate] = useState(null);
    const [Refresh,setRefresh]=useState(false);

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
                string += account_from[value.key] + " "
            ));
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
                    onClick={() => handleOpenUpdate(section_key, field)}
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

    const handleSubmit=()=>{
        console.log("the submitted update is ",update);
        axios.put("/account/profile",update).then(res=>{


            //update ccount without read from backend
            let newAccount=account;
            if ("email" in update || "phone" in update){
                for (const [key,value] of Object.entries(update)){
                    newAccount["contact_info"][key]=value;
                }
            }else{
                for (const [key,value] of Object.entries(update)){
                    newAccount[key]=value;
                }
            }
            console.log("new account is ",newAccount);
            setAccount(newAccount);
            setOpen(false);
        });
        

    };

    const getModal = (field) => {
        const handleChange = (e, value) => {
            let newUpdate=update;
            newUpdate[value.key]=e.target.value;
            setUpdate(newUpdate);
            console.log(update);
            setRefresh(true);
        };

        // const getSubmitButton = () =>{

        // }

        const generate_dropdown_list = (type) => {
            if (type === "Visibility") {
                return (
                    <>
                        {contact_status.map((status, stateIdx) => (
                            <Menu.Item key={status + "_option"}>
                                {({ active }) => (
                                    <a
                                        href="/"
                                        className={classNames(
                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        {status}
                                    </a>
                                )}
                            </Menu.Item>

                        ))};
                    </>);
            } else {
                return (
                    <>
                        {states.map((state, stateIdx) => (
                            <Menu.Item key={state + "_option"}>
                                {({ active }) => (
                                    <a
                                        href="/"
                                        className={classNames(
                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        {state}
                                    </a>
                                )}
                            </Menu.Item>

                        ))};
                    </>);

            }
        };

        const getTypeDom = (value) => {

            if (value.type === "file") {
                return <></>;
            } else if (value.type === "text") {

                return (
                    <div>
                        <label htmlFor={value.key} className="block text-sm font-medium text-gray-700 sr-only">
                            {value.title}
                        </label>
                        <div className="mt-1">
                            <input
                                type={value.type}
                                name={value.key}
                                id={value.key}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder={value.placeholder}
                                value={update[value.key]}
                                onChange={(e) => {
                                    handleChange(e, value);
                                }}
                            />
                        </div>
                    </div>
                );
            } else if (value.type === "textarea") {
                return (
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Add your comment
                        </label>
                        <div className="mt-1">
                            <textarea
                                rows={4}
                                name="comment"
                                id="comment"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                defaultValue={""}
                            />
                        </div>
                    </div>
                );
            } else if (value.type === "dropdown") {
                return (
                    <div>
                        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">
                            {value.title}
                        </label>

                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                    {/* fixme showing the correct value here */}
                                    {
                                        value.title === "Visibility" ?
                                            account["contact_info"][value.key]
                                            :
                                            account[value.key]

                                    }

                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-60">
                                    <div className="py-1">
                                        {generate_dropdown_list(value.title)}

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                );
            }
        };

        if (!field) {
            return;
        }

        if (Array.isArray(field.value)) {
            return (
                <>
                    <legend className="block text-sm font-medium text-gray-700">{field.title}</legend>
                    {
                        field.value.map((value, index) => (
                            getTypeDom(value)
                        ))
                    }
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={()=>handleSubmit()}
                    >
                        Save
                    </button>
                </>
            );
        } else {

            return (
                <>
                    <legend className="block text-sm font-medium text-gray-700">{field.title}</legend>
                    {getTypeDom(field.value)}
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={()=>handleSubmit()}
                    >
                    Save
                    </button>
                </>
            );
        }
    };

    const handleOpenUpdate = (section_key, field) => {
        let newUpdate={};
        console.log(field);

        if(Array.isArray(field.value)){
            for (const f of field.value){
                if(field.title==="Email address" || field.title==="Phone number"){
                    newUpdate[f.key]=account["contact_info"][f.key];

                }else{
                    newUpdate[f.key]=account[f.key];
                }

            }
        }else{
            newUpdate[field.value.key]=account[field.value.key];
        }
        setUpdate(newUpdate);
        console.log(newUpdate);
        setField(field);
        setOpen(true);
    };

    useEffect(() => {
        console.log("calling use effect");

        setRefresh(false);
        // // TODO reduce the backend request
        // var account = getAccountLocal();
        // if (account === null) {
        //     window.location.href = "/signin";
        // }

        axios.get("/account/profile")
            .then(res => {
                setAccount(res.data);
                    
            })
            .catch(err => {
                if (err.response.status && err.response.status===401){
                    window.location.href="/signin";
                }
            });
    }, [getAccountLocal,Refresh]);

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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 -space-y-px">

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
