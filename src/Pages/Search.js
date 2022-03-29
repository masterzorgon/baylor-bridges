import React, { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronDownIcon, TrashIcon, SearchIcon } from "@heroicons/react/outline";
import { useSearchParams } from "react-router-dom";
import USAMap from "react-usa-map";
import axios from "axios";
import dayjs from "dayjs";
import { DebounceInput } from "react-debounce-input";

import { classNames } from "../components/Utils";
import Photo from "../components/Photo";
import { states } from "../components/Utils";

/**
 * All filters and their attributes
 */
const filters = {
    sort: {
        title: "Sort",
        options: [
            { title: "Name", value: "name" },
            { title: "Class", value: "class" },
            { title: "Location", value: "location" },
            { title: "Occupation", value: "occupation" },
        ],
    },
    keywords: {
        title: "Keyboard",
    },
    role: {
        title: "Role",
        options: [
            { title: "Alumni", value: "alumni" },
            { title: "Current student", value: "student" },
        ],
        show: true,
    },
    graduate_class: {
        title: "Class",
        options: Array.from(Array(10).keys()).map((t) => ({
            title: (dayjs().year() - (t * 10)) + " - " + (dayjs().year() - ((t + 1) * 10) + 1),
            value: dayjs().year() - (t * 10),
        })),
        show: true,
    },
    state: {
        title: "State",
        options: states,
        className: "block lg:hidden",
        show: true,
    },
};

/**
 * Concatenate all filters into a single string
 * 
 * @param {Dictonary} query 
 * @param {Dictonary} addons 
 * @returns 
 */
const queryToString = (query, addons) => {
    const concatenateQueryValues = (key, value) => {
        if (!value || value.length === 0) {
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
        Object.entries(query).filter(([k, v]) => v).forEach(([key, value]) => {
            query_strings.push(concatenateQueryValues(key, value));
        });
    }

    if (addons) {
        Object.entries(addons).filter(([k, v]) => v).forEach(([key, value]) => {
            query_strings.push(concatenateQueryValues(key, value));
        });
    }

    const url = query_strings.length !== 0 ? `?${query_strings.filter(v => v).join("&")}` : "";
    return url;
};

const Search = () => {
    const [searchParams] = useSearchParams();
    const [query, setQueryDict] = useState({});
    const [mapStats, setMapStats] = useState({});
    const [profiles, setProfiles] = useState([]);

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
        Object.entries(filters).forEach(([filter_key, filter]) => {
            let value = searchParams.get(filter_key);

            if (value) {
                if (filter.options) {
                    value = value.split(",");
                    value = value.map((v) => v.trim());
                    query[filter_key] = value;
                } else {
                    value = value.trim();
                    query[filter_key] = value;
                }
            }
        });

        // Give sorting a default value
        if (!query.sort) {
            query.sort = "name";
        }

        setQueryDict({ ...query });
    }, []);


    useEffect(() => {
        console.log(query);
        window.history.replaceState(null, null, "/search" + queryToString(query));
        axios.get("/search" + queryToString(query, { detailed: true })).then((res) => {
            setProfiles(res.data.profiles);
            setMapStats(res.data.map_stats);
        });
    }, [query]);

    const getMapConfig = (stats, current) => {
        let config = {};
        let max = 0;

        // Find the state with the highest number of people
        for (const value of Object.values(stats)) {
            if (max < value) {
                max = value;
            }
        }
        
        states.forEach((state) => {
            config[state.value] = {};

            if (!(state.value in stats)) { // For the state has no people, grey out
                if (!current) {
                    config[state.value].fill = "rgba(229, 231, 235, 1)";
                } else {
                    config[state.value].fill = "rgba(229, 231, 235, 0.6)";
                }
            } else { // For the state has people, color it with different opacity
                let value = stats[state.value];
                let opacity = value / max;

                if (current && state.value !== current) {
                    opacity *= 0.7;
                    config[state.value].fill = `rgba(5, 150, 105, ${opacity})`;
                } else if (current && state.value === current) {
                    opacity = 1;
                    config[state.value].fill = `rgba(5, 150, 105, ${opacity})`;
                } else {
                    config[state.value].fill = `rgba(5, 150, 105, ${opacity})`;
                }
            }
        });

        return config;
    };

    const clearFilters = () => {
        let query_new = {};

        Object.entries(filters).forEach(([filter_key, filter]) => {
            if (filter.show === true) {
                // Do nothng
            } else {
                query_new[filter_key] = query[filter_key];
            }
        });

        setQueryDict({ ...query_new });
    };

    const onMapClick = (dataset) => {
        console.log(dataset);
        
        if (dataset.name === query["state"]) {
            delete query["state"];
            setQueryDict({ ...query });
        } else if (mapStats[dataset.name] && mapStats[dataset.name] !== 0) {
            setQueryDict({ ...query, state: dataset.name });
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:block col-span-1">
                    <div className="bg-gray-50 sticky p-2 h-screen" style={{ "top": "5.4rem" }}>
                        <div className="align-middle relative flex clickable-map">
                            <USAMap title="" customize={getMapConfig(mapStats, query["state"])} onClick={(e) => onMapClick(e.target.dataset)} />
                        </div>
                    </div>
                </div>
                
                <div className="col-span-1 px-4">
                    {/* Filters & Search Input */}
                    <ul className="bg-white sticky px-4 py-6 sm:px-6 z-30" style={{ "top": "5.3rem" }}>
                        {/* White cover for sticky filter div, for visuals only */}
                        <div className="absolute bg-inherit w-full"
                            style={{ "top": "-2rem", "height": "4rem", "left": "0rem" }}></div>

                        {/* Search Input */}
                        <li className="flex-1 flex items-center justify-between md:hidden w-full relative mb-6">
                            <label htmlFor="email" className="sr-only">
                                Search people
                            </label>
                            <div className="w-full relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <DebounceInput
                                    type="search"
                                    name="search"
                                    id="search"
                                    className="pl-10 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-100 p-3 border-transparent border-0"
                                    placeholder="Search people"
                                    autoComplete="off"
                                    value={query.keywords || ""}
                                    debounceTimeout={250}
                                    onChange={(e) => { setQueryDict({ ...query, keywords: e.target.value }); }}
                                />
                            </div>
                        </li>

                        <li className="flex items-center justify-between">

                            {/* Sort */}
                            <Menu as="div" className="relative z-10 inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="p-2 group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                    >
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
                                    <Menu.Items className="absolute mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {filters.sort.options.map((option) => (
                                                <Menu.Item
                                                    key={option.value}
                                                    onClick={() => setQueryDict({ ...query, sort: option.value })}
                                                >
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            query.sort === option.value ? "font-medium text-gray-900" : "text-gray-400",
                                                            "hover:bg-gray-100 block px-4 py-2 text-sm cursor-pointer"
                                                        )}
                                                    >
                                                        {option.title}
                                                    </a>
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>


                            {/* Filters */}
                            <Popover.Group className="hidden sm:flex sm:items-center space-x-2">
                                {/* Clear filters */}
                                <Popover as="div" className="relative z-10 inline-block text-left">
                                    <button
                                        className="p-2 text-gray-400 hover:text-gray-700"
                                        onClick={() => clearFilters()}
                                    >
                                        <span className="text-transparent sr-only" aria-hidden="true">Clear</span>
                                        <TrashIcon
                                            className="flex-shrink-0 h-5 w-5"
                                        />
                                    </button>
                                </Popover>

                                {/* Filters */}
                                {Object.entries(filters)
                                    .filter(([key, value]) => value.show === true) // Only show filters with options
                                    .map(([filter_key, filter]) => (
                                        <Popover
                                            as="div"
                                            key={filter_key}
                                            className={classNames("relative z-10 inline-block text-left", filter.className)}
                                        >
                                            <div>
                                                <Popover.Button
                                                    className="p-2 group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                                >
                                                    <span>{filter.title}</span>
                                                    {
                                                        // Display how many options are selected
                                                        query[filter_key] && query[filter_key].length > 0 && 
                                                        <span
                                                            className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                                                            {query[filter_key].length}
                                                        </span>
                                                    }
                                                    <ChevronDownIcon
                                                        className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                                                    className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-lg p-4 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 overflow-y-auto"
                                                >
                                                    <div className="space-y-4">
                                                        {filter.options.map((option) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${filter_key}-${option.value}`}
                                                                    name={`filter-${filter_key}-${option.value}`}
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
                        </li>
                    </ul>

                    {/* People list */}
                    <div className="bg-white sm:rounded-md">
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
                                                        {
                                                            (profile.first_name || profile.last_name) ?
                                                                <p className="text-sm font-medium text-emerald-600 truncate">{profile.first_name} {profile.last_name}</p>
                                                                :
                                                                <p className="text-sm font-medium text-gray-500 truncate">Baylor Bridges User</p>
                                                        }
                                                        {
                                                            profile.headline &&
                                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                <span className="truncate">{profile.headline}</span>
                                                            </p>
                                                        }
                                                    </div>
                                                    <div className="hidden md:block">
                                                        <div>
                                                            {
                                                                (profile.city || profile.state) &&
                                                                <p className="text-sm text-gray-900">
                                                                    {profile.city} {profile.state}
                                                                </p>
                                                            }
                                                            {
                                                                profile.graduate_year &&
                                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                    {/* <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" /> */}
                                                                    Class {profile.graduate_year}
                                                                </p>
                                                            }
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