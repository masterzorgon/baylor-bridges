
import React, { Fragment, useEffect, useState } from "react";
import { LinkIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

import Photo from "../components/Photo";

const classNames = (...classes) => classes.filter(Boolean).join(" ");


const Profile = () => {
    const { user_id } = useParams();
    const [profileAccount, setProfileAccount] = useState(null);
    //console.log(user_id);

    useEffect(() => {
        let url = "";

        if (user_id === undefined) {
            url = "/account/profile";
        } else {
            url = `/account/${user_id}/profile`;
        }

        axios.get(url)
            .then(({ data }) => {
                setProfileAccount(data);
            })
            .catch(err => {
                window.location.href = "/404";
            });
    }, [user_id, setProfileAccount]);


    return (
        <>
            <div className="min-h-full bg-gray-100">
                <main className="py-10">
                    {/* Page header */}
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <Photo size="16" account={profileAccount} />
                                    <span className="absolute inset-0 shadow-inner rounded-full w-16 h-16" aria-hidden="true" />
                                </div>
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
                        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                            {/* <button
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-500"
                            >
                                Connect
                            </button> */}
                        </div>
                    </div>
                    
                    {/* FIXME: Experience style */}
                    <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                            {/* Description list*/}
                            <section aria-labelledby="applicant-information-title">
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                            Personal Information
                                        </h2>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and contact information.</p>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                        {
                                            profileAccount === null &&
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt data-placeholder className="w-1/3 h-4 rounded-md mb-1 mt-1"></dt>
                                                    <dd data-placeholder className="w-1/2 h-5 rounded-md"></dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt data-placeholder className="w-1/3 h-4 rounded-md mb-1 mt-1"></dt>
                                                    <dd data-placeholder className="w-1/2 h-5 rounded-md"></dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt data-placeholder className="w-1/3 h-4 rounded-md mb-1 mt-1"></dt>
                                                    <dd data-placeholder className="w-1/2 h-5 rounded-md"></dd>
                                                </div><div className="sm:col-span-1">
                                                    <dt data-placeholder className="w-1/3 h-4 rounded-md mb-1 mt-1"></dt>
                                                    <dd data-placeholder className="w-1/2 h-5 rounded-md"></dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt data-placeholder className="w-1/3 h-4 rounded-md mb-1 mt-1"></dt>
                                                    <dd data-placeholder className="w-1/2 h-5 rounded-md"></dd>
                                                </div><div className="sm:col-span-1">
                                                    <dt data-placeholder className="w-1/3 h-4 rounded-md mb-1 mt-1"></dt>
                                                    <dd data-placeholder className="w-1/2 h-5 rounded-md"></dd>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <dt data-placeholder className="w-1/3 h-4 rounded-md mb-1 mt-1"></dt>
                                                    <dd data-placeholder className="w-full h-5 rounded-md"></dd>
                                                </div>
                                            </dl>
                                        }
                                        {
                                            profileAccount !== null &&
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 capitalize">{profileAccount.occupation}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Graduated in</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 capitalize">{profileAccount.graduate_semester} {profileAccount.graduate_year}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">City</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 capitalize">{profileAccount.city}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 capitalize">{profileAccount.role}</dd>
                                                </div>
                                                {
                                                    profileAccount.contact_info?
                                                        <>
                                                            {
                                                                profileAccount.contact_info.email &&
                                                            <div className="sm:col-span-1">
                                                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 lowercase">{profileAccount.contact_info.email}</dd>
                                                            </div>
                                                            }
                                                            {profileAccount.contact_info.phone &&
                                                            <div className="sm:col-span-1">
                                                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                                <dd className="mt-1 text-sm text-gray-900">{profileAccount.contact_info.phone}</dd>
                                                            </div>
                                                            }
                                                        </>
                                                        :<></>
                                                }
                                                {
                                                    profileAccount.contact_info ?
                                                        <div className="sm:col-span-2">
                                                            <dt className="text-sm font-medium text-gray-500">Biography</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">
                                                                {profileAccount.biography}
                                                            </dd>
                                                        </div>
                                                        :<></>
                                                }
                                            </dl>
                                        }
                                    </div>
                                </div>
                            </section>

                            {/* Experiences */}
                            <section aria-labelledby="notes-title">
                                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                                    <div className="divide-y divide-gray-200">
                                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                                            <h2 id="notes-title" className="align-middle text-lg font-medium text-gray-900 border-2 border-transparent">
                                                Experiences
                                            </h2>

                                            {/* INSERT MODAL DISPLAY BUTTON */}
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button className="mt-1 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-500">
                                                        <span className="sr-only">Open options</span>
                                                        <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="">
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
                                        
                                        {/* 
                                            [*][*][*][*]             [*][*][*][*]
                                            [*][*][*][*] EXPERIENCES [*][*][*][*]
                                            [*][*][*][*]             [*][*][*][*]
                                        */}
                                        <div className="px-4 py-6 sm:px-6">
                                            <ul className="space-y-8">
                                                {
                                                    profileAccount && profileAccount.experiences && profileAccount.experiences.map((experience, index) => (
                                                        <li className="" key={experience.exper_id}>
                                                            <p className="font-medium">{experience.title}</p>
                                                            <p className="font-medium text-sm text-gray-500 mt-0.5"><time dateTime={experience.start_time}>{experience.start_time}</time> - <time dateTime={experience.start_time}>{experience.start_time}</time></p>
                                                            <p className="mt-2 text-sm text-gray-700">{experience.description}</p>
                                                            {/* 
                                                                [*][*][*][*]              [*][*][*][*]
                                                                [*][*][*][*] PUBLICATIONS [*][*][*][*]
                                                                [*][*][*][*]              [*][*][*][*]
                                                            */}
                                                            <div className="mt-4">
                                                                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                                                    {
                                                                        experience.publications.map((publication, index) => (
                                                                            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm" key={publication.pub_id}>
                                                                                <div className="w-0 flex-1 flex items-center">
                                                                                    <LinkIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                                                    <span className="ml-2 flex-1 w-0 truncate text-gray-700">
                                                                                        pub test
                                                                                    </span>
                                                                                </div>
                                                                                <div className="ml-4 flex-shrink-0">
                                                                                    <a href={publication.duo_link} className="font-medium text-emerald-600 hover:text-emerald-500">
                                                                                        Open
                                                                                    </a>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Profile;