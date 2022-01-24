import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import SettingsNavbar from "../../components/SettingsNavbar";
import { AccountContext } from "../../components/Account";
import Photo from "../../components/Photo";


const profile = {
    basic: {
        title: "Basic",
        description: "The following information will be displayed publicly to everyone.",
        fields: {
            photo: {
                title: "Photo",
                value: "photo",
                type: "file",
            },
            name: {
                title: "Name",
                value: ["prefix", "first_name", "last_name"],
                type: ["text", "text", "text"],
            },
            headline: {
                title: "Headline",
                value: "headline",
                type: "text",
            },
            occupation: {
                title: "Occupation",
                value: "occupation",
                type: "text",
            },
            location: {
                title: "Location",
                value: ["city", "state"],
                type: ["text", "dropdown"],
            },
            biography: {
                title: "Biography",
                value: "biography",
                type: "textarea",
            },
        }
    },
    contact_info: {
        title: "Contact Information",
        description: "Manage your contact information and how they should be displayed.",
        fields: {
            email: {
                title: "Email address",
                value: "email",
                type: "text",
            },
            phone: {
                title: "Phone number",
                value: "phone",
                type: "text",
            },
        }
    }
};


const Profile = () => {
    const { getAccountLocal } = useContext(AccountContext);
    const [account, setAccount] = useState(null);

    const getValue = (section_key, field) => {
        if (field.value === "photo") {
            return <Photo size="10" />;
        }

        var account_from = account;
        if (section_key !== "basic") {
            account_from = account[section_key];
            console.log(account_from);
        }

        if (Array.isArray(field.value)) {
            var string = "";
            field.value.map((value, index) => (
                string += account_from[value] + " "
            ));
            return string;
        } else {
            return account_from[field.value] ? account_from[field.value] : <div className="text-gray-400">Not set</div>;
        }
    };

    const getButtons = (section_key, field) => {
        const update = (
            <button
                type="button"
                className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >Update</button>
        );

        if (field.value === "photo") {
            return (
                <>
                    <button
                        type="button"
                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >Update</button>
                    <span className="text-gray-300 mt-2.5" aria-hidden="true">|</span>
                    <button
                        type="button"
                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >Remove</button>
                </>
            );
        }

        return update;
    };

    useEffect(() => {
        var account = getAccountLocal();
        if (account === null) {
            window.location.href = "/signin";
        }

        axios.get("/account/profile")
            .then(res => {
                setAccount(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [getAccountLocal]);

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
        </>
    );
};

export default Profile;
