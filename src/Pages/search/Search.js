import React, { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/outline";
import { useSearchParams } from "react-router-dom";
import USAMap from "react-usa-map";
import axios from "axios";
import dayjs from "dayjs";

import Photo from "../../components/Photo";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const states = [
    { title: "Arizona", value: "AZ", description: "AZ" }, { title: "New York", value: "NY", description: "NY" }, { title: "Connecticut", value: "CT", description: "CT" }, { title: "Maryland", value: "MD", description: "MD" }, { title: "Washington", value: "WA", description: "WA" }, { title: "Oregon", value: "OR", description: "OR" }, { title: "Nevada", value: "NV", description: "NV" }, { title: "New Mexico", value: "NM", description: "NM" }, { title: "District of Columbia", value: "DC", description: "DC" }, { title: "Delaware", value: "DE", description: "DE" }, { title: "Massachusetts", value: "MA", description: "MA" }, { title: "Minnesota", value: "MN", description: "MN" }, { title: "Wisconsin", value: "WI", description: "WI" }, { title: "Illinois", value: "IL", description: "IL" },
    { title: "Vermont", value: "VT", description: "VT" }, { title: "Rhode Island", value: "RI", description: "RI" }, { title: "New Jersey", value: "NJ", description: "NJ" }, { title: "Colorado", value: "CO", description: "CO" }, { title: "California", value: "CA", description: "CA" }, { title: "Pennsylvania", value: "PA", description: "PA" }, { title: "Virginia", value: "VA", description: "VA" }, { title: "Georgia", value: "GA", description: "GA" }, { title: "Maine", value: "ME", description: "ME" }, { title: "New Hampshire", value: "NH", description: "NH" }, { title: "Hawaii", value: "HI", description: "HI" }, { title: "Idaho", value: "ID", description: "ID" }, { title: "Montana", value: "MT", description: "MT" }, { title: "Indiana", value: "IN", description: "IN" },
    { title: "Alaska", value: "AK", description: "AK" }, { title: "Kentucky", value: "KY", description: "KY" }, { title: "North Carolina", value: "NC", description: "NC" }, { title: "West Virginia", value: "WV", description: "WV" }, { title: "Wyoming", value: "WY", description: "WY" }, { title: "North Dakota", value: "ND", description: "ND" }, { title: "South Dakota", value: "SD", description: "SD" }, { title: "Nebraska", value: "NE", description: "NE" }, { title: "Utah", value: "UT", description: "UT" }, { title: "Tennessee", value: "TN", description: "TN" }, { title: "Kansas", value: "KS", description: "KS" }, { title: "Oklahoma", value: "OK", description: "OK" }, { title: "Texas", value: "TX", description: "TX" },
    { title: "Missouri", value: "MO", description: "MO" }, { title: "Arkansas", value: "AR", description: "AR" }, { title: "Alabama", value: "AL", description: "AL" }, { title: "Mississippi", value: "MS", description: "MS" }, { title: "Louisiana", value: "LA", description: "LA" }, { title: "Michigan", value: "MI", description: "MI" }, { title: "Florida", value: "FL", description: "FL" }, { title: "South Carolina", value: "SC", description: "SC" }, { title: "Ohio", value: "OH", description: "OH" }, { title: "Iowa", value: "IA", description: "IA" },
];

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

        // For state
        let state = searchParams.get("state");
        if (state) {
            query["state"] = state;
        }

        setQueryDict({ ...query });
    }, []);


    useEffect(() => {
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

            if (!(state.value in mapStats)) { // For the state has no people, grey out
                if (!current) {
                    config[state.value].fill = "rgba(211, 211, 211, 1)";
                } else {
                    config[state.value].fill = "rgba(211, 211, 211, 0.6)";
                }
            } else { // For the state has people, color it with different opacity
                let value = mapStats[state.value];
                let opacity = value / max * 0.9;

                if (current && state.value !== current) {
                    opacity *= 0.7;
                    config[state.value].fill = `rgba(21, 71, 52, ${opacity})`;
                } else if (current && state.value === current) {
                    opacity = 1;
                    config[state.value].fill = `rgba(21, 71, 52, ${opacity})`;
                } else {
                    config[state.value].fill = `rgba(21, 71, 52, ${opacity})`;
                }
            }
        });

        return config;
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
                    <div className="bg-gray-100 sticky p-2 h-screen" style={{ "top": "5.4rem" }}>
                        <div className="align-middle relative flex clickable-map">
                            <USAMap title="" customize={getMapConfig(mapStats, query["state"])} onClick={(e) => onMapClick(e.target.dataset)} />
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
                                <button
                                    className="group inline-flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-700"
                                    onClick={() => { setQueryDict({ keywords: query["keywords"], sort: query["sort"] }); }}
                                >
                                    <span className="text-transparent" aria-hidden="true">Clear</span>
                                    <TrashIcon
                                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5"
                                    />
                                </button>
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