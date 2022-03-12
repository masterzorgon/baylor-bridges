import React from "react";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Navbar = (props) => {
    const tabs = [
        { id: "account", name: "Account", href: "account" },
        { id: "profile", name: "Profile", href: "profile" },
        { id: "experience", name: "Experience", href: "experience" },
        // { id: "workload", name: "Workload", href: "workload" },
    ];

    return (
        <>
            {/* DESKTOP VIEW: */}
            <div className="sm:block lg:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <a
                                key={tab.id}
                                href={tab.href}
                                className={classNames(
                                    tab.id === props.current
                                        ? "border-emerald-500 text-emerald-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                )}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;