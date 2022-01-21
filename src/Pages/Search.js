import React, {Fragment, useEffect,useState} from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {  ChevronRightIcon, MailIcon, ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/solid";
import USAMap from "react-usa-map";
import {useSearchParams} from "react-router-dom";

import axios from "axios";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function mapHandler(event) {
    alert(event.target.dataset.name);
    // TODO: Display right panel for alumini list
}

const avatar_url="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
// const applications = [
//     {
//         applicant: {
//             name: "Ricardo Cooper",
//             email: "ricardo.cooper@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Kristen Ramos",
//             email: "kristen.ramos@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ricardo Cooper",
//             email: "ricardo.cooper@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ricardo Cooper",
//             email: "ricardo.cooper@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
//     {
//         applicant: {
//             name: "Ted Fox",
//             email: "ted.fox@example.com",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//         date: "2020-01-07",
//         dateFull: "January 7, 2020",
//         stage: "Completed phone screening",
//         href: "#",
//     },
// ];

const sortOptions = [
    { name: "Name", href: "#name" },
    { name: "Class", href: "#class" },
    { name: "Location", href: "#location" },
    { name: "Occupation", href: "#occupation" },
];

const filters = [
    {
        id: "role",
        name: "Role",
        options: [
            { value: "#alumni", label: "Alumni" },
            { value: "#student", label: "Current student" },
        ],
    },
    {
        id: "class",
        name: "Class",
        options: [
            { value: "2022", label: "2022" },
        ],
    }
];

// TODO: Mobile responsive for everything in this page
// TODO: On mobile, hide map, replace with a filter

const Search = (props) => {
    const [searchParams] = useSearchParams();

    const keywords=searchParams.get("keywords");
    const sort=searchParams.get("sort");
    const role=searchParams.get("role");
    const graduate_class=searchParams.get("class");


    const [profiles,setProfiles]=useState([]);

    useEffect(()=>{
        console.log(keywords,sort,role,graduate_class);
        axios.get("/searchBarResult",{
            params:{
                keywords:keywords,
                detailed:true
            }
        }).then((res)=>{
            console.log("search bar result is: ");
            console.log(res.data);
            setProfiles(res.data.profiles);
            console.log(profiles);
        });

    });

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:block col-span-1">
                    <div className="bg-gray-100 sticky p-2 h-screen" style={{ "top": "5.4rem" }}>
                        <div className="align-middle relative flex">
                            <USAMap onClick={mapHandler} />
                        </div>
                    </div>
                </div>
                <div className="col-span-1 px-4">
                    {/* Filters */}
                    <div className="bg-white sticky flex items-center justify-between px-6 py-5 sm:pt-6 md:pt-6 lg:pt-6 pt-2 z-30" style={{ "top": "5.4rem" }}>
                        {/* White cover for sticky filter div, for visuals only */}
                        <div className="absolute bg-inherit w-full" style={{ "top": "-2rem", "height": "4rem", "left": "0rem" }}></div>

                        {/* Filters */}
                        <Menu as="div" className="relative z-10 inline-block text-left">
                            <div>
                                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
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
                                <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option}>
                                                {({ active }) => (
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "block px-4 py-2 text-sm font-medium text-gray-900"
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                            {filters.map((section, sectionIdx) => (
                                <Popover as="div" key={section.name} id="desktop-menu" className="relative z-10 inline-block text-left">
                                    <div>
                                        <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            <span>{section.name}</span>
                                            {sectionIdx === 0 ? (
                                                <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                                                    1
                                                </span>
                                            ) : null}
                                            <ChevronDownIcon
                                                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>
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
                                        <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-lg p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <form className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            className="h-4 w-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                            className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </form>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                            ))}
                        </Popover.Group>
                    </div>

                    {/* People list */}
                    <div className="bg-white overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-100">
                            {profiles.map((profile) => (
                                <li key={profile.use_id}>
                                    {/*TODO add href for account detail page*/}
                                    <a  className="block hover:bg-gray-50">
                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                            <div className="min-w-0 flex-1 flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="h-12 w-12 rounded-full" src={avatar_url} alt="" />
                                                </div>
                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-emerald-600 truncate">{profile.first_name} {profile.last_name}</p>
                                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                                            <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            <span className="truncate">{profile.headline}</span>
                                                        </p>
                                                    </div>
                                                    <div className="hidden md:block">
                                                        <div>
                                                            <p className="text-sm text-gray-900">
                                                                {profile.city} {profile.state}
                                                            </p>
                                                            {/*<p className="mt-2 flex items-center text-sm text-gray-500">*/}
                                                            {/*    <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />*/}
                                                            {/*    {application.stage}*/}
                                                            {/*</p>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </a>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                                        <span className="font-medium">97</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md -space-x-px" aria-label="Pagination">
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                        {/* Current: "z-10 bg-emerald-50 border-emerald-500 text-emerald-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                                        <a
                                            href="#"
                                            aria-current="page"
                                            className="z-10 bg-emerald-50 border-emerald-500 text-emerald-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        >
                                            1
                                        </a>
                                        <a
                                            href="#"
                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        >
                                            2
                                        </a>
                                        <a
                                            href="#"
                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                        >
                                            3
                                        </a>
                                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                            ...
                                        </span>
                                        <a
                                            href="#"
                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                        >
                                            8
                                        </a>
                                        <a
                                            href="#"
                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        >
                                            9
                                        </a>
                                        <a
                                            href="#"
                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        >
                                            10
                                        </a>
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Next</span>
                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;