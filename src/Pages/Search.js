import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import { ChevronRightIcon, MailIcon, ChevronLeftIcon, ChevronDownIcon, FilterIcon } from "@heroicons/react/solid";
import USAMap from "react-usa-map";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
// import { faPassport } from "@fortawesome/free-solid-svg-icons";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function generateFilterSort(role,grad_class,sort){
    let sortValue=["Name","Class","Location","Occupation"];
    let sortOptions = [];
    // sort should return a single value, role and grad_class should return an array of values
    for (const s of sortValue){
        if (s ===sort){
            sortOptions.push({name:s,href:"#"+s,current:true});
        }else{
            sortOptions.push({name:s,href:"#"+s,current:false});
        }
    }
        

    console.log(sortOptions);
    return sortOptions;

}
const avatar_url = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";



const filters = {
    role: [
        { value: "#alumni", label: "Alumni" },
        { value: "#student", label: "Current student" },

    ],
    class: [
        { value: "#2022——2026", label: "2022-2026" },
        { value: "#2012-2022", label: "2012-2022" },
        { value: "#2002-2012", label: "2002-2012" }

    ]
};

// TODO: Mobile responsive for everything in this page
// TODO: On mobile, hide map, replace with a filter

const Search = (props) => {
    const [searchParams] = useSearchParams();

    const keywords = searchParams.get("keywords");
    const [sort,setSort] = useState(searchParams.get("sort"));
    const [role, setRole] = useState(searchParams.get("role"));
    const [graduate_class] = useState(searchParams.get("class"));
    const [states, setStates] = useState(searchParams.get("state"));

    const [statesCustomConfig, setStateCustomConfig] = useState({});


    const [profiles, setProfiles] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [sortOptions,setSortOptions]=useState([]);

    function mapHandler(event) {
        if (event.target.dataset.name === states) {
            console.log("Cancelling state filter selection");
            setStates();
        } else {
            console.log("selected " + event.target.dataset.name);
            setStates(event.target.dataset.name);
        }
        setRole(searchParams.get("role"));
    }



    useEffect(() => {
        console.log(keywords, sort, role, graduate_class);
        axios.get("/searchBarResult", {
            params: {
                keywords: keywords,
                detailed: true,
                sort: sort,
                role: role,
                class: graduate_class,
                state: states
            }
        }).then((res) => {
            console.log("search bar result is: ");
            console.log(res.data);
            setProfiles(res.data.profiles);
            console.log("profile is",profiles);
            console.log("sort is ",sort);

            var config = {};
            var max = 0;

            // Find the state with the highest number of people
            for (const value of Object.values(res.data.map_stats)) {
                if (max < value) {
                    max = value;
                }
            }

            // Make config dictionary
            for (const [key, value] of Object.entries(res.data.map_stats)) {
                var opacity = value / max * 0.95;

                config[key] = {};
                config[key].fill = `rgba(21, 71, 52, ${opacity})`;
            }

            setStateCustomConfig(config);
        });

        setSortOptions(generateFilterSort(role,graduate_class,sort));
        console.log("this sortOptions is",sortOptions);
        console.log(generateFilterSort(role,graduate_class,sort));


    }, [keywords, sort, role, graduate_class, states]);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:block col-span-1">
                    <div className="bg-gray-100 sticky p-2 h-screen" style={{ "top": "5.4rem" }}>
                        <div className="align-middle relative flex">
                            <USAMap customize={statesCustomConfig} onClick={mapHandler} />
                        </div>
                    </div>
                </div>
                <div className="col-span-1 px-4">
                    {/* Filters */}
                    <div className="bg-white sticky flex items-center justify-between px-6 py-5 sm:pt-6 md:pt-6 lg:pt-6 pt-2 z-30" style={{ "top": "5.4rem" }}>
                        {/* White cover for sticky filter div, for visuals only */}
                        <div className="absolute bg-inherit w-full" style={{ "top": "-2rem", "height": "4rem", "left": "0rem" }}></div>

                        {/* Filters */}
                        {/* Filters */}
                        <Disclosure
                            as="section"
                            aria-labelledby="filter-heading"
                            className="relative z-10 border-t border-b border-gray-200 grid items-center"
                        >
                            <h2 id="filter-heading" className="sr-only">
                                Filters
                            </h2>
                            <div className="relative col-start-1 row-start-1 py-4">
                                <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
                                    <div>
                                        <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
                                            <FilterIcon
                                                className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            2 Filters
                                        </Disclosure.Button>
                                    </div>
                                    <div className="pl-6">
                                        <button type="button" className="text-gray-500">
                                            Clear all
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Disclosure.Panel className="border-t border-gray-200 py-10">
                                <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                                    <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                                        <fieldset>
                                            <legend className="block font-medium">Role</legend>
                                            <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                                {filters.role.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                                                        <input
                                                            id={`role-${optionIdx}`}
                                                            name="role[]"
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                            defaultChecked={option.checked}
                                                        />
                                                        <label htmlFor={`role-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="block font-medium">Class</legend>
                                            <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                                {filters.class.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                                                        <input
                                                            id={`class-${optionIdx}`}
                                                            name="class[]"
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                            defaultChecked={option.checked}
                                                        />
                                                        <label htmlFor={`class-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                            <div className="col-start-1 row-start-1 py-4">
                                <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <Menu as="div" className="relative inline-block">
                                        <div className="flex">
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
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    
                                                    {sortOptions.map((option) => (
                                                        <Menu.Item key={option.name} onClick={()=>setSort(option.name)}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={option.href}
                                                                    className={classNames(
                                                                        option.current ? "font-medium text-gray-900" : "text-gray-500",
                                                                        active ? "bg-gray-100" : "",
                                                                        "block px-4 py-2 text-sm"
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
                                </div>
                            </div>
                        </Disclosure>

                    </div>

                    {/* People list */}
                    <div className="bg-white overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-100">
                            {profiles.map((profile) => (
                                <li key={profile.use_id}>
                                    {/*TODO add href for account detail page*/}
                                    <a className="block hover:bg-gray-50">
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
                                        <span className="font-medium">{profiles.length}</span> results
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