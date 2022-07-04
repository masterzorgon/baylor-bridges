import React from "react";
import { classNames } from "../../components/Utils";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";

import Account from "./Account";
import Profile from "./Profile";
import Experience from "./Experience";

const tabs = [
    { id: "account", name: "Account", href: "account" },
    { id: "profile", name: "Profile", href: "profile" },
    { id: "experience", name: "Experience", href: "experience" },
    // { id: "workload", name: "Workload", href: "workload" },
];

const Navbar = () => {
    return (
        <div className="sm:block lg:block">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.id}
                            to={tab.href}
                            className={({ isActive }) => classNames(
                                isActive
                                    ? "border-emerald-500 text-emerald-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                                "duration-150",
                            )}
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

const Settings = () => {
    return (
        <>
            <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
                <main className="flex-1">
                    <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                        <div className="pt-10 sm:pb-8 md:pb-16">
                            <div className="px-4 sm:px-6 md:px-0">
                                <h1 className="text-3xl font-extrabold text-gray-900">
                                    Settings
                                </h1>
                            </div>
                            <div className="px-4 sm:px-6 md:px-0">
                                <div className="py-6">
                                    <Navbar />
                                    <Routes>
                                        <Route path="profile" index element={<Profile />} />
                                        <Route path="experience" element={<Experience />} />
                                        <Route path="account" element={<Account />} />
                                        <Route path="*" element={<Navigate to="profile" />} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Settings;