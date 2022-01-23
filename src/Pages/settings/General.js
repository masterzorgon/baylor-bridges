import React, { useState, useEffect, useContext } from "react";
// import { Switch } from "@headlessui/react";

import SettingsNavbar from "../../components/SettingsNavbar";
import { AccountContext } from "../../components/Account";


// function classNames(...classes) {
//     return classes.filter(Boolean).join(" ");
// }

const General = () => {
    // const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true);
    // const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false);

    const { getAccount, getAccountLocal } = useContext(AccountContext);
    const [account, setAccount] = useState({});
    console.log(account);

    useEffect(() => {
        setAccount(getAccountLocal());
        getAccount()
            .then(account => {
                setAccount(account);
            })
            .catch(error => {
                setAccount(null);
                window.location.href = "/login";
            });
    }, [getAccount, getAccountLocal]);

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
                                            <SettingsNavbar current="general" />

                                            {/* Description list with inline editing */}
                                            <div className="mt-10 divide-y divide-gray-200">
                                                <div className="space-y-1">
                                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Alumni Profile</h3>
                                                    <p className="max-w-2xl text-sm text-gray-500">
                                                        This information will be displayed publicly so be careful what you share.
                                                    </p>
                                                </div>
                                                <div className="mt-6">
                                                    {/* Full Name */}
                                                    <dl className="divide-y divide-gray-200">
                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">{account.first_name} {account.last_name}</span>
                                                                <span className="ml-4 flex-shrink-0">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>

                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                                            <dt className="text-sm font-medium text-gray-500">Location</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">Waco, Texas</span>
                                                                <span className="ml-4 flex-shrink-0">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>

                                                        {/* Photo */}
                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                            <dt className="text-sm font-medium text-gray-500">Photo</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">
                                                                    <img
                                                                        className="h-8 w-8 rounded-full"
                                                                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                        alt=""
                                                                    />
                                                                </span>
                                                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                    <span className="text-gray-300" aria-hidden="true">
                                                                        |
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>

                                                        {/* Occupation */}
                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">{ account.email }</span>
                                                                <span className="ml-4 flex-shrink-0">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>
                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                                            <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">Baylor Bridges Backend Developer</span>
                                                                <span className="ml-4 flex-shrink-0">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>

                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                                            <dt className="text-sm font-medium text-gray-500">Headline</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">Baylor Bioinformatics Undergraduate Alumni in Electronic Health Record study</span>
                                                                <span className="ml-4 flex-shrink-0">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>

                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                                            <dt className="text-sm font-medium text-gray-500">Biography</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">Hi! This is my Bio</span>
                                                                <span className="ml-4 flex-shrink-0">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>


                                                    </dl>
                                                </div>
                                            </div>

                                            <div className="mt-10 divide-y divide-gray-200">
                                                <div className="space-y-1">
                                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Info</h3>
                                                    <p className="max-w-2xl text-sm text-gray-500">
                                                        Manage the contact way you preferred to connect with people
                                                    </p>
                                                </div>

                                                <div className="mt-6">


                                                    <dl className="divide-y divide-gray-200">
                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                            <dt className="text-sm font-medium text-gray-500">Prefered Contact</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">Both</span>
                                                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>

                                                                </span>
                                                            </dd>
                                                        </div>
                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                            <dt className="text-sm font-medium text-gray-500">email</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">Xiayan_Li2@baylor.edu</span>
                                                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                    <span className="text-gray-300" aria-hidden="true">
                                                                        |
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Visibility
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>
                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">123-456-7890</span>
                                                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                    <span className="text-gray-300" aria-hidden="true">
                                                                        |
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                    >
                                                                        Visibility
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>
                                                        {/*<Switch.Group as="div" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">*/}
                                                        {/*    <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>*/}
                                                        {/*        Automatic timezone*/}
                                                        {/*    </Switch.Label>*/}
                                                        {/*    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">*/}
                                                        {/*        <Switch*/}
                                                        {/*            checked={automaticTimezoneEnabled}*/}
                                                        {/*            onChange={setAutomaticTimezoneEnabled}*/}
                                                        {/*            className={classNames(*/}
                                                        {/*                automaticTimezoneEnabled ? "bg-emerald-600" : "bg-gray-200",*/}
                                                        {/*                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-auto"*/}
                                                        {/*            )}*/}
                                                        {/*        >*/}
                                                        {/*            <span*/}
                                                        {/*                aria-hidden="true"*/}
                                                        {/*                className={classNames(*/}
                                                        {/*                    automaticTimezoneEnabled ? "translate-x-5" : "translate-x-0",*/}
                                                        {/*                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"*/}
                                                        {/*                )}*/}
                                                        {/*            />*/}
                                                        {/*        </Switch>*/}
                                                        {/*    </dd>*/}
                                                        {/*</Switch.Group>*/}
                                                        {/*<Switch.Group*/}
                                                        {/*    as="div"*/}
                                                        {/*    className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"*/}
                                                        {/*>*/}
                                                        {/*    <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>*/}
                                                        {/*        Auto-update applicant data*/}
                                                        {/*    </Switch.Label>*/}
                                                        {/*    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">*/}
                                                        {/*        <Switch*/}
                                                        {/*            checked={autoUpdateApplicantDataEnabled}*/}
                                                        {/*            onChange={setAutoUpdateApplicantDataEnabled}*/}
                                                        {/*            className={classNames(*/}
                                                        {/*                autoUpdateApplicantDataEnabled ? "bg-emerald-600" : "bg-gray-200",*/}
                                                        {/*                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-auto"*/}
                                                        {/*            )}*/}
                                                        {/*        >*/}
                                                        {/*            <span*/}
                                                        {/*                aria-hidden="true"*/}
                                                        {/*                className={classNames(*/}
                                                        {/*                    autoUpdateApplicantDataEnabled ? "translate-x-5" : "translate-x-0",*/}
                                                        {/*                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"*/}
                                                        {/*                )}*/}
                                                        {/*            />*/}
                                                        {/*        </Switch>*/}
                                                        {/*    </dd>*/}
                                                        {/*</Switch.Group>*/}
                                                    </dl>
                                                </div>
                                            </div>
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

export default General;
