import React, { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/outline";
import { useSearchParams } from "react-router-dom";
import USAMap from "react-usa-map";
import axios from "axios";
import dayjs from "dayjs";

import Photo from "../components/Photo";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const sorts = [
    { title: "Name", value: "name" },
    { title: "Class", value: "class" },
    { title: "Location", value: "location" },
    { title: "Occupation", value: "occupation" },
];

const filters = {
    role: {
        title: "Role",
        options: [
            { title: "Alumni", value: "alumni" },
            { title: "Current student", value: "student" },
        ],
    },
    graduate_class: {
        title: "Class",
        options: Array.from(Array(10).keys()).map((t) => ({
            title: (dayjs().year() - (t * 10)) + " - " + (dayjs().year() - ((t + 1) * 10) + 1),
            value: dayjs().year() - (t * 10),
        })),
    },
};

const queryToString = (query, addons) => {
    const concatenateQueryValues = (key, value) => {
        if (value.length === 0) {
            delete query[key];
            return;
        }

        // Delete empty entries in value
        if (Array.isArray(value)) {
            value = value.filter((v) => v);
            return `${key}=${value.join(",")}`;
        } else {
            return `${key}=${value}`;
        }
    };

    let query_strings = [];

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            query_strings.push(concatenateQueryValues(key, value));
        });
    }

    if (addons) {
        Object.entries(addons).forEach(([key, value]) => {
            query_strings.push(concatenateQueryValues(key, value));
        });
    }

    const url = query_strings.length !== 0 ? `?${query_strings.join("&")}` : "";
    return url;
};

const Search = () => {
    const [searchParams] = useSearchParams();
    const [query, setQueryDict] = useState({});
    const [mapStats, setMapStats] = useState({});
    const [profiles, setProfiles] = useState([]);


    const onMapClick = (event) => {
        setProfiles([]);
        setMapStats({});
        return;
    };

    const setQuery = (key, value, checked) => {
        if (!query[key] || !Array.isArray(query[key])) {
            query[key] = [];
        }

        if (checked) {
            query[key].push(value);
        } else {
            query[key] = query[key].filter((v) => v !== value);
        }

        setQueryDict({ ...query });
    };

    useEffect(() => {
        // For keyword
        let keyword = searchParams.get("keywords");
        if (keyword) {
            keyword = keyword.trim();
            query["keywords"] = keyword;
        }


        Object.entries(filters).forEach(([filter_key, filter]) => {
            let value = searchParams.get(filter_key);

            if (value) {
                value = value.split(",");
            }

            if (Array.isArray(value) && value.length > 1) {
                value = value.map((v) => v.trim());
                query[filter_key] = value;
            } else if (Array.isArray(value) && value.length === 1) {
                value = value[0].trim();
                query[filter_key] = value;
            }
        });

        // For sort
        let sort = searchParams.get("sort");
        if (sort) {
            query["sort"] = sort;
        } else {
            query["sort"] = "name";
        }

        setQueryDict({ ...query });
    }, []);


    useEffect(() => {
        console.log("query changed", query);
        window.history.replaceState(null, null, "/search" + queryToString(query));

        axios.get("/search" + queryToString(query, { detailed: true })).then((res) => {
            setProfiles(res.data.profiles);
            setMapStats(res.data.map_stats);
        });
    }, [query]);




    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:block col-span-1">
                    <div className="bg-gray-100 sticky p-2 h-screen" style={{ "top": "5.4rem" }}>
                        <div className="align-middle relative flex">
                            <USAMap customize={mapStats} onClick={onMapClick} />
                        </div>
                    </div>
                </div>
                <div className="col-span-1 px-4">
                    {/* Filters */}
                    <div
                        className="bg-white sticky flex items-center justify-between px-6 py-5 sm:pt-6 md:pt-6 lg:pt-6 pt-2 z-30"
                        style={{ "top": "5.4rem" }}>
                        {/* White cover for sticky filter div, for visuals only */}
                        <div className="absolute bg-inherit w-full"
                            style={{ "top": "-2rem", "height": "4rem", "left": "0rem" }}></div>

                        {/* Sort */}
                        <Menu as="div" className="relative z-10 inline-block text-left">
                            <div>
                                <Menu.Button
                                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
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
                                        {sorts.map((option) => (
                                            <Menu.Item
                                                key={option.value}
                                                onClick={() => setQueryDict({ ...query, sort: option.value })}
                                            >
                                                {({ active }) => (
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            query.sort === option.value ? "font-medium text-gray-900" : "text-gray-500",
                                                            active ? "bg-gray-100" : "",
                                                            "block px-4 py-2 text-sm"
                                                        )}
                                                    >
                                                        {option.title}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>


                        {/* Filters */}
                        <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                            {/* Clear filters */}
                            <Popover as="div" id="desktop-menu" className="relative z-10 inline-block text-left">
                                <Popover.Button
                                    className="group inline-flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-700"
                                >
                                    <span className="text-transparent" aria-hidden="true">Clear</span>
                                    <TrashIcon
                                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5"
                                        onClick={() => { setQueryDict({}); }}

                                    />
                                </Popover.Button>
                            </Popover>

                            {/* Filters */}
                            {Object.entries(filters).map(([filter_key, filter]) => (
                                <Popover as="div" key={filter_key} id="desktop-menu"
                                    className="relative z-10 inline-block text-left">
                                    <div>
                                        <Popover.Button
                                            className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            <span>{filter.title}</span>
                                            {
                                                query[filter_key] && query[filter_key].length > 0 && 
                                                <span
                                                    className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                                                    {query[filter_key].length}
                                                </span>
                                            }
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
                                        <Popover.Panel
                                            className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-lg p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="space-y-4">
                                                {filter.options.map((option) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`filter-${filter_key}-${option.value}`}
                                                            name={`${filter.id}[]`}
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            className="h-4 w-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                                                            defaultChecked={query[filter_key] && query[filter_key].includes(option.value)}
                                                            onClick={(e) => setQuery(filter_key, option.value, e.target.checked)}
                                                        />
                                                        <label
                                                            htmlFor={`filter-${filter_key}-${option.value}`}
                                                            className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                                        >
                                                            {option.title}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
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
                                <li key={profile.user_id} >
                                    {/*TODO add href for account detail page*/}
                                    <a className="block hover:bg-gray-50" href={"/profile/" + profile.user_id} rel="noreferrer">
                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                            <div className="min-w-0 flex-1 flex items-center">
                                                <div className="flex-shrink-0">
                                                    {/* <img className="h-12 w-12 rounded-full" src={avatar_url} alt="" /> */}
                                                    <Photo size="12" account={profile} />
                                                </div>
                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-emerald-600 truncate">{profile.first_name} {profile.last_name}</p>
                                                        <p className="mt-2 flex items-center text-sm text-gray-500">
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

                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;