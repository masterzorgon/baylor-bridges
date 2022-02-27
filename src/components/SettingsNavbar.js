import React from "react";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const SettingsNavbar = (props) => {
    const tabs = [
        { id: "profile", name: "Profile", href: "profile" },
        { id: "experience", name: "Experience", href: "experience" },
        // { id: "workload", name: "Workload", href: "workload" },
    ];

    const redirect = () => {
        
        const selectedTab = document.getElementById("selected-tab");
        const selectedValue = selectedTab.options[selectedTab.selectedIndex].value;

        selectedTab.defaultValue = selectedValue;
        window.location.href = selectedValue;

        console.log("CHANGE", tabs.find((tab) => tab.id === props.current).name);
    };

    return (
        <>
            {/* 
                FIX:
                    - when you select an option from the select menu, nothing happens — you are not redirected
                    - allow mobile user to navigate to Settings from home menu
            */}

            {/* MOBILE VIEW: SELECT MENU */}
            <nav className="lg:hidden">
                <label htmlFor="selected-tab" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                    defaultValue={tabs.find((tab) => tab.id === props.current).name}
                    onChange={redirect}
                >
                    {tabs.map((tab) => (
                        <option value={tab.href} key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </nav>

            {/* DESKTOP VIEW: */}
            <div className="hidden lg:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
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

export default SettingsNavbar;