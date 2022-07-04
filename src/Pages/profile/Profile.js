
import React, { Fragment, useEffect, useState, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import axios from "axios";

import Photo from "../../components/Photo";
import { AccountContext } from "../../components/Account";
import SignInRequiredModal from "./SignInRequiredModal";
import Markdown from "../../components/Markdown";
import ExperienceCard from "../../components/profile/ExperienceCard";
import { classNames } from "../../components/Utils";
import { Properties } from "../../components/profile/Fields";

import NotFoundModal from "./NotFoundModal";


const profile = Properties;
delete profile.name;
delete profile.headline;
delete profile.biography;

const Profile = () => {
    const { user_id } = useParams();

    const { getAccountLocal } = useContext(AccountContext);

    const [isSelf, setIsSelf] = useState(false);
    const [profileAccount, setProfileAccount] = useState(null);

    const [authenticated, setAuthenticated] = useState(null);
    const [notFound, setNotFound] = useState(false);


    useEffect(() => {
        let account = getAccountLocal();
        if (account) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }


        let url = "";
        if (user_id === undefined) {
            url = "/accounts/me";
        } else {
            url = `/accounts/${user_id}`;
        }

        axios.get(url, { headers: { "x-fields": "user_id, first_name, last_name, headline, photo, role, occupation, graduate_year, city, state, biography, contact_info, experiences" } })
            .then(({ data }) => {
                setProfileAccount(data);
                setIsSelf(account && account.user_id === data.user_id);
                setAuthenticated(true);
            })
            .catch(err => {
                if (err.response.data.code && err.response.data.code === "AuthenticationRequiredException") {
                    setAuthenticated(false);
                    console.log(err.response.data.code);
                } else {
                    console.log("other errors");
                    setNotFound(true);
                }
            });
    }, [user_id]);

    const getFieldDisplayValueRaw = (field) => {
        if (!Array.isArray(field.attribute)) {
            field.attribute = [field.attribute];
        }

        let string = "";
        field.attribute.forEach((attribute, index) => {
            if (attribute.key && attribute.key in profileAccount && profileAccount[attribute.key]) {
                string += profileAccount[attribute.key] + " ";
            } else if (attribute.section && attribute.section in profileAccount && attribute.key in profileAccount[attribute.section] && profileAccount[attribute.section][attribute.key]) {
                string += profileAccount[attribute.section][attribute.key] + " ";
            }
        });

        // Return values
        string = string.trim(); // Remove spaces
        if (string === "") {
            return null;
        }
        return string;
    };

    const formatValue = (value, type) => {
        switch (type) {
        case "email":
            return <a className="underline underline-offset-4 decoration-dashed decoration-gray-500" href={`mailto:${value}`}>{value}</a>;

        case "phone":
            return <a className="underline underline-offset-4 decoration-dashed decoration-gray-500" href={`tel:${value}`}>{value}</a>;

        default:
            return value;
        }
    };

    const getFieldDisplayValue = (field) => {
        // If profileAccount is not intialized at all, display animated data-placeholder
        if (profileAccount === null) {
            return (
                <div className="sm:col-span-1">
                    <dt data-placeholder className="w-1/3 h-4 rounded-md mb-1 mt-1"></dt>
                    <dd data-placeholder className="w-1/2 h-5 rounded-md"></dd>
                </div>
            );
        }

        if ("role" in field && field.role !== profileAccount.role) {
            return;
        }

        let value = getFieldDisplayValueRaw(field);

        if (value === null) {
            if (field.has_visibility && !isSelf) {
                if (profileAccount.first_name) {
                    value = <div className="text-gray-400">Connect with {profileAccount.first_name} to view</div>;
                } else {
                    value = <div className="text-gray-400">Connect to view</div>;
                }
            } else {
                value = <div className="text-gray-400">Not set</div>;
            }
        } else {
            value = formatValue(value, field.type);
        }

        return (
            <div className={classNames("col-span-2 sm:col-span-1", field.field_class)}>
                <dt className="text-sm font-medium text-gray-500">{field.title}</dt>
                <dd className={classNames("mt-1 text-sm text-gray-900", field.value_class ? field.value_class : "")}>
                    {value}
                </dd>
            </div>
        );
    };

    return (
        <>
            {authenticated === false ? <SignInRequiredModal /> : ""}
            {notFound === true ? <NotFoundModal /> : ""}

            <div className={classNames("min-h-full bg-gray-100", (authenticated === false || notFound === true) && "blur-sm")}>
                <main className="py-10">


                    {/* Page header */}
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Photo size="20" account={profileAccount} badges={true} />
                            </div>
                            {
                                profileAccount === null &&
                                <div className="h-14 w-96">
                                    <div data-placeholder className="w-full h-9 rounded-md mb-1"></div>
                                    <div data-placeholder className="w-full h-4 rounded-md"></div>
                                </div>
                            }
                            {
                                profileAccount !== null &&
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{profileAccount.prefix} {profileAccount.first_name} {profileAccount.last_name}</h1>
                                    <p className="text-sm font-medium text-gray-500">{profileAccount.headline}</p>
                                </div>
                            }
                        </div>
                        {/* <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-500"
                            >
                                Connect
                            </button>
                        </div> */}
                    </div>

                    <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                            {/* Description list*/}
                            <section aria-labelledby="applicant-information-title">
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6 flex justify-between">
                                        <div>
                                            <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                                Personal Information
                                            </h2>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and contact information.</p>
                                        </div>
                                        {/* INSERT MODAL DISPLAY BUTTON */}
                                        <Menu as="div" className="relative inline-block text-left">
                                            {
                                                // Onle show editing button when this is user's own profile
                                                isSelf &&
                                                <div>
                                                    <Menu.Button className="p-1 -mr-2 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-500">
                                                        <span className="sr-only">Open options</span>
                                                        <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                    </Menu.Button>
                                                </div>
                                            }

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="my-2">
                                                        <Menu.Item>
                                                            <Link to="/settings/profile" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm">
                                                                Edit Personal Information
                                                            </Link>
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>


                                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                        <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2">
                                            {
                                                Object.entries(profile).map(([field_key, field]) => (
                                                    getFieldDisplayValue(field)
                                                ))
                                            }
                                        </dl>
                                    </div>
                                </div>
                            </section>

                            {
                                (!profileAccount || profileAccount.biography) &&
                                <section>
                                    <div className="bg-white shadow sm:rounded-lg">
                                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                                            <div>
                                                <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                                    Biography
                                                </h2>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">A detailed description of person&apos;s life.</p>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            {
                                                profileAccount ?
                                                    <Markdown>
                                                        {profileAccount.biography}
                                                    </Markdown>
                                                    :
                                                    Array(5).fill(0).map((_, i) => (
                                                        <div data-placeholder className="h-5 w-full lg:w-1/2 rounded-lg mt-2" key={i}></div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </section>
                            }

                            {/* Experiences */}
                            {
                                profileAccount && profileAccount.experiences && Array.isArray(profileAccount.experiences) && profileAccount.experiences.length > 0 &&
                                <section aria-labelledby="notes-title">
                                    <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                                        <div className="divide-y divide-gray-200">
                                            <div className="px-4 py-5 sm:px-6 flex justify-between">
                                                <div>
                                                    <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                                        Experiences
                                                    </h2>
                                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Past experiences for this profile.</p>
                                                </div>


                                                {/* INSERT MODAL DISPLAY BUTTON */}
                                                <Menu as="div" className="relative inline-block text-left">
                                                    {
                                                        // Onle show editing button when this is user's own profile
                                                        isSelf &&
                                                        <div>
                                                            <Menu.Button className="p-1 -mr-2 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-500">
                                                                <span className="sr-only">Open options</span>
                                                                <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                            </Menu.Button>
                                                        </div>
                                                    }

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <div className="my-2">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <a
                                                                            href="/settings/experience"
                                                                            className={classNames(
                                                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                                                "block px-4 py-2 text-sm"
                                                                            )}
                                                                        >
                                                                            Edit Experiences
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>

                                            {/* EXPERIENCES */}
                                            <div className="pb-2">
                                                <ul className="divide-y">
                                                    {
                                                        profileAccount && profileAccount.experiences && profileAccount.experiences.map((experience, index) => (
                                                            <li className="px-4 sm:px-6 py-5" key={index}>
                                                                <ExperienceCard experience={experience} />
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            }
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Profile;