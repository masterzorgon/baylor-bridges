/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon, SearchIcon, BellIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { AccountContext } from "./Account";
import axios from "axios";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const people = [
    {
        name: "Calvin Hawkins",
        email: "calvin.hawkins@example.com",
        image:
            "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Kristen Ramos",
        email: "kristen.ramos@example.com",
        image:
            "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Ted Fox",
        email: "ted.fox@example.com",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
];

const Navbar = (props) => {
    const [isFocus, setFocus] = useState(false);
    const [searchText, setSearchText] = useState("");

    // For current signed in account display
    const [isSignedIn,setSignedIn] = useState(false);
    const { logout } = useContext(AccountContext);

    useEffect(() => {
        axios.get("/account")
            .then(response => {
                if(response.status === 200){
                    setSignedIn(true);
                }else{
                    console.log("not auth!");
                    setSignedIn(false);
                }
            }).catch(err=>{
                console.error("navbar Auth error: ",err);
            });
    });

    return (
        <>
            {/* Semi transparent cover */}
            {/* TODO: Add transition */}
            <Transition
                as={Fragment}
                enter="transition ease-out duration-400"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={isFocus}
            >
                <div className="fixed z-40">
                    <div className="fixed bg-black top-0 w-full h-full opacity-60" onClick={() => setFocus(false)}></div>
                </div>
            </Transition>

            <Popover className="bg-white z-50 sticky top-0">
                <div className="flex shadow-md justify-between items-center px-4 py-5 sm:px-6 md:justify-start md:space-x-10">
                    {/* Baylor University logo */}
                    <div>
                        <a href="/" className="flex">
                            <span className="sr-only">Baylor Bridge</span>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="https://www.click2houston.com/resizer/3v3i6TY06rcxVuEOiQZbJjApyeA=/640x360/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/MISBRBEDPZAR5BN2GDORMZITPI.jpg"
                                alt=""
                            />
                        </a>
                    </div>

                    {/* Mobile burger open button */}
                    <div className="-mr-2 -my-2 md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>

                    {/* Desktop navbar items */}
                    <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                        <Popover.Group as="nav" className="flex space-x-10">
                            <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Home
                            </a>

                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            className={classNames(
                                                open ? "text-gray-900" : "text-gray-500",
                                                "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                            )}
                                        >
                                            <span>More</span>
                                            <ChevronDownIcon
                                                className={classNames(
                                                    open ? "text-gray-600" : "text-gray-400",
                                                    "ml-2 h-5 w-5 group-hover:text-gray-500"
                                                )}
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>
                                        
                                        {/* Sub-menu for "More" */}
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                        <a href="/" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                                                            <div className="ml-4 text-base font-medium text-gray-900">About</div>
                                                        </a>
                                                        <a href="/" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                                                            <div className="ml-4 text-base font-medium text-gray-900">Jobs</div>
                                                        </a>
                                                        <a href="/" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                                                            <div className="ml-4 text-base font-medium text-gray-900">Contact</div>
                                                        </a>
                                                        <a href="/" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                                                            <div className="ml-4 text-base font-medium text-gray-900">Report an issue</div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        </Popover.Group>
                        
                        {/* Search people */}
                        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between ml-6 mr-12 max-w-md relative">
                            <label htmlFor="email" className="sr-only">
                                Search people
                            </label>
                            <div className="w-full relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    className="pl-10 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200 p-3 border-transparent"
                                    placeholder="Search people"
                                    autoComplete="off"
                                    value={searchText}
                                    onFocus={() => setFocus(true)}
                                    onChange={(event) => {
                                        setSearchText(event.target.value);
                                    }}
                                />
                            </div>

                            {/* Search results */}
                            {/* TODO: Add transition */}
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                show={isFocus}
                            >
                                <div className="z-50 absolute bg-white shadow-md py-2 rounded-md w-full max-w-md mt-4 top-16">
                                    <ul className="">
                                        {people.map((person) => (
                                            <li key={person.email} className="py-4 px-5 flex hover:bg-gray-50">
                                                <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                                    <p className="text-sm text-gray-500">{person.email}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <a key="more" className="py-3 px-5 pb-2 flex text-sm text-emerald-800 font-medium" href="/search">
                                        More results
                                    </a>
                                </div>
                            </Transition>
                        </div>
                        
                        {/* Account sign in / up / out */}
                        {
                            !isSignedIn &&
                            <div className="flex items-center md:ml-12">
                                <a href="/sign-in" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Sign in
                                </a>
                                <a href="/sign-up" className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                                    Sign up
                                </a>
                            </div>
                        }
                        {
                            isSignedIn &&
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-4 gap-3">
                                <button
                                    type="button"
                                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-2xl py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/"
                                                        className={classNames(active ? "bg-gray-100" : "", "block px-6 py-3 text-sm text-gray-700")}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/"
                                                        className={classNames(active ? "bg-gray-100" : "", "block px-6 py-3 text-sm text-gray-700")}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/"
                                                        className={classNames(active ? "bg-gray-100" : "", "block px-6 py-3 text-sm text-gray-700")}
                                                        onClick={logout}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        }
                    </div>
                </div>

                {/* This point below is mobile burger menu */}
                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel focus className="absolute top-0 inset-x-0 transition transform origin-top-right md:hidden">
                        <div className="space-y-1 bg-white shadow-lg divide-y-2 divide-gray-50">
                            <div className="py-4 px-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <img
                                            className="h-8 w-auto sm:h-10"
                                            src="https://www.click2houston.com/resizer/3v3i6TY06rcxVuEOiQZbJjApyeA=/640x360/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/MISBRBEDPZAR5BN2GDORMZITPI.jpg"
                                            alt="Baylor University logo"
                                        />
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 pb-6 px-6 space-y-1">
                                {/* Navbar links */}
                                <div className="grid grid-cols-1 gap-6">
                                    <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        Home
                                    </a>
                                    <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        About
                                    </a>
                                </div>

                                {/* Account sign in / up / out */}
                                {
                                    !isSignedIn &&
                                    <div className="pt-6">
                                        <a href="/sign-up" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                                            Sign up
                                        </a>
                                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                                            Existing student or alumini?{" "}
                                            <a href="/sign-in" className="text-emerald-600 hover:text-emerald-500">
                                                Sign in
                                            </a>
                                        </p>
                                    </div>
                                }
                                {
                                    isSignedIn &&
                                    <div className="pt-7 pb-2">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium text-gray-800">Tom Cook</div>
                                                <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </>
    );
};

export default Navbar;