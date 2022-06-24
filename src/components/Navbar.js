import React, { Fragment, useState, useContext, useEffect } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, ChevronDownIcon, CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { useNavigate, Link } from "react-router-dom";

import { AccountContext } from "./Account";
import { classNames, changeBaseURL, changeSearchParam } from "./Utils";
import Photo from "./Photo";
import { SearchInput } from "../Pages/Search";

const Navbar = ({ hideOnTop }) => {
    const navigate = useNavigate();
    const { signOut, getAccount, getAccountLocal } = useContext(AccountContext);
    const [account, setAccount] = useState(null);
    const [signInUrl, setSignInUrl] = useState("");
    const [signUpUrl, setSignUpUrl] = useState("");
    const [pageYOffset, setPageYOffset] = useState(0);
    const [isFocus, setFocus] = useState(false);

    window.addEventListener("scroll", () => {
        if (window.pageYOffset) {
            setPageYOffset(window.pageYOffset);
        }
    });

    useEffect(() => {
        setAccount(getAccountLocal());

        getAccount()
            .then(account => setAccount(account))
            .catch(error => setAccount(null));

    }, [getAccount, getAccountLocal]);

    useEffect(() => {
        let current = changeSearchParam(window.location.href, "redirect", window.location.pathname);
        let signUpURL = changeBaseURL(current, "/sign-up");
        let signInURL = changeBaseURL(current, "/sign-in");

        setSignUpUrl(signUpURL);
        setSignInUrl(signInURL);
    }, []);


    const handleSignOut = () => {
        signOut()
            .then(() => {
                setAccount(null);
                navigate("/");
            });
    };

    const handleSettings = () => {
        navigate("/settings");
    };

    const additionalClassNames = classNames((!hideOnTop || pageYOffset > window.screen.height * 0.5) ? "opacity-100" : "opacity-0 pointer-events-none", hideOnTop === true ? "fixed w-full" : "sticky", "transition-all");

    return (
        <>
            {/* Semi transparent cover */}
            <Transition
                as={Fragment}
                enter="transition ease-out duration-400"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={isFocus}
            >
                <div className="fixed z-40">
                    <div className="fixed bg-black top-0 left-0 bottom-0 right-0 w-full h-full opacity-60" onClick={() => setFocus(false)}></div>
                </div>
            </Transition>

            <Popover className={classNames("z-50 top-0", additionalClassNames)}>
                <div className="flex shadow-md justify-between items-center px-4 py-5 sm:px-6 md:justify-start bg-white">
                    {/* Baylor University logo */}
                    <div className="h-8 w-auto sm:h-10 mr-4">
                        <Link to="/" className="flex">
                            <span className="sr-only">Baylor Bridge</span>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/Baylor-University-Athletics-01.svg"
                                alt="Baylor University logo"
                            />
                        </Link>
                    </div>

                    {/* MOBILE MENU ICON */}
                    <div className="-mr-2 -my-2 md:hidden flex">
                        <Popover.Button
                            className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            onClickCapture={() => setFocus(true)}
                        >
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>

                    {/* DESKTOP NAVBAR */}
                    <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                        <Popover.Group as="nav" className="flex space-x-0">
                            <Link to="/" className="px-4 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900">
                                Home
                            </Link>

                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            className={classNames(
                                                open ? "text-gray-900" : "text-gray-500",
                                                "group rounded-md inline-flex items-center text-base font-medium hover:text-gray-900",
                                                "px-4 py-2 rounded-md"
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
                                            <Popover.Panel className="absolute bg-white z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                    <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                                                        {/* <Link to="/about" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                                                            <div className="ml-4 text-base font-medium text-gray-900">About</div>
                                                        </Link> */}
                                                        {/*TODO to create this page and connect the url*/}
                                                        <Link to="/about" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                                                            <div className="ml-4 text-base font-medium text-gray-900">About Us</div>
                                                        </Link>
                                                        <Link to="/contact-us" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                                                            <div className="ml-4 text-base font-medium text-gray-900">Contact Us</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        </Popover.Group>

                        {
                            account !== null &&
                            <SearchInput focus={isFocus} onFocus={setFocus} />
                        }

                        {/* Account sign in / up / out */}
                        {
                            account === null &&
                            <div className="flex items-center md:ml-12">
                                <Link to={signInUrl} className="px-4 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900">
                                    Sign in
                                </Link>
                                <Link to={signUpUrl} className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                                    Sign up
                                </Link>
                            </div>
                        }
                        {
                            account !== null &&
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-4 gap-3">
                                {/* <button
                                    type="button"
                                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button> */}
                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                            <span className="sr-only">Open user menu</span>
                                            <Photo size="10" />
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
                                        <Menu.Items className="origin-top-right bg-white absolute right-0 mt-2 w-56 rounded-md shadow-2xl py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="border-b border-gray-200 pb-1 mb-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link to="/profile" className={classNames(active ? "bg-gray-100" : "", "block px-5 py-3")}>
                                                            <p className="text-xs mb-1 uppercase text-gray-400">Signed in as</p>
                                                            <p className="text-sm font-medium text-gray-900 truncate">{account.first_name} {account.last_name}</p>
                                                            <p className="text-xs text-gray-600 truncate">{account.username}</p>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/settings"
                                                            className={classNames(active ? "bg-gray-100" : "", "block px-5 py-3 text-sm text-gray-700")}
                                                        >
                                                            Settings
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(active ? "bg-gray-100" : "", "block px-5 py-3 text-sm text-gray-700 w-full text-left")}
                                                            onClick={handleSignOut}
                                                        >
                                                            Sign out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
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
                        <div className="space-y-1 shadow-lg divide-y-2 divide-gray-50 bg-white">
                            <div className="py-4 px-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <img
                                            className="h-8 w-auto sm:h-10"
                                            src="/Baylor-University-Athletics-01.svg"
                                            alt="Baylor University logo"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 pb-6 px-6 space-y-1">
                                {/* Navbar links */}
                                <div className="grid grid-cols-1 gap-6">
                                    <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        Home
                                    </Link>
                                    <Link to="/search" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        Search
                                    </Link>
                                    <Link to="/about" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        About
                                    </Link>
                                    <Link to="/contact-us" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        Contact Us
                                    </Link>
                                </div>

                                {/* Account sign in / up / out */}
                                {
                                    account === null &&
                                    <div className="pt-6">
                                        <Link to="/sign-up" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                                            Sign up
                                        </Link>
                                        <p className="mt-4 text-center text-base font-medium text-gray-500">
                                            Existing student or alumini?{" "}
                                            <Link to="/sign-in" className="text-emerald-600 hover:text-emerald-500">
                                                Sign in
                                            </Link>
                                        </p>
                                    </div>
                                }
                                {
                                    account !== null &&
                                    <>
                                        <div className="pt-8 pb-2 -mr-2">
                                            <div className="flex items-center">
                                                <Link to="/profile" className="flex-shrink-0 flex grow">
                                                    <Photo size="10" />
                                                    <div className="ml-3">
                                                        <div className="text-base font-medium text-gray-800">{account.first_name} {account.last_name}</div>
                                                        <div className="text-sm font-medium text-gray-500">{account.username}</div>
                                                    </div>
                                                </Link>
                                                {/* <button
                                                    type="button"
                                                    className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                >
                                                    <span className="sr-only">View notifications</span>
                                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                </button> */}
                                                <button
                                                    type="button"
                                                    onClick={handleSettings}
                                                    className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                >
                                                    <span className="sr-only">Settings</span>
                                                    <CogIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                    onClick={handleSignOut}
                                                >
                                                    <span className="sr-only">Sign Out</span>
                                                    <LogoutIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </>
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