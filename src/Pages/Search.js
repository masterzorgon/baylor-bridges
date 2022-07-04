import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronDownIcon, TrashIcon, SearchIcon } from "@heroicons/react/outline";
import { useSearchParams, createSearchParams, useNavigate, Link } from "react-router-dom";
import USAMap from "react-usa-map";
import axios from "axios";
import dayjs from "dayjs";
import { DebounceInput } from "react-debounce-input";
import TooltipSlider from "rc-slider";
import { useDebounce } from "use-debounce";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { XIcon } from "@heroicons/react/outline";
import { classNames } from "../components/Utils";
import Photo from "../components/Photo";
import { States } from "../components/Utils";

const GraduateYearSlider = ({ value, onChange }) => {
    const MIN = 1970;
    const MAX = Math.floor((dayjs().year() + 5) / 10 + 1) * 10;
    value = value ? value : [MIN, MAX];

    let marks = {};
    for (let t = MIN; t <= MAX; t += 10) {
        marks[t] = `${t}`;
    }

    return (
        <div>
            {/* <div className="flex justify-items-stretch justify-between text-sm text-emerald-600 font-semibold">
                <p>{value[0]}</p>
                <p>{value[1]}</p>
            </div> */}
            <TooltipSlider
                range
                min={MIN}
                max={MAX}
                className="w-auto sm:w-72 mt-1 mb-7 mx-4"
                step={1}
                marks={marks}
                defaultValue={[MIN, MAX]}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

/**
 * All filters and their attributes
 */
const filters = {
    sort: {
        title: "Sort",
        options: [
            { title: "Relavance", value: null },
            { title: "Name", value: "name" },
            { title: "Role", value: "role" },
            { title: "Graduate Year", value: "graduate_year" },
        ],
        option_type: "radio",
    },
    keywords: { title: "Keywords", },
    role: {
        title: "Role",
        options: [
            { title: "Alumni", value: "alumni" },
            { title: "Current student", value: "student" },
        ],
        option_type: "checkbox",
        show: true,
    },
    graduate_year: {
        title: "Class",
        options: null,
        option_indicator: (options) => {
            return options;
        },
        option_type: "graduate-year-slider",
        show: true,
    },
    state: {
        title: "State",
        options: States,
        className: "inline-block lg:hidden",
        option_indicator: (options) => {
            return options;
        },
        option_type: "radio",
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
            value = value.map((v) => encodeURIComponent(v));
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
    const [animation] = useAutoAnimate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({});
    const [queryDebounce] = useDebounce(query, 250);
    const [mapStats, setMapStats] = useState({});
    const [profiles, setProfiles] = useState(null);
    const [open, setOpen] = useState(false);


    const toggleFilterOption = (key, value, checked) => {
        if (!query[key] || !Array.isArray(query[key])) {
            query[key] = [];
        }

        if (checked) {
            //Clears the list and push the new one in, this way we only keep one element
            if (filters[key].option_type === "radio") {
                query[key] = [];
            }

            query[key].push(value);
        } else {
            query[key] = query[key].filter((v) => v !== value);
        }
        console.log(query);
        setQuery({ ...query });
    };

    filters.graduate_year.options = <GraduateYearSlider value={query?.graduate_year?.split("-")} onChange={(value) => setQuery({ ...query, "graduate_year": value.join("-") })} />;

    useEffect(() => {
        Object.entries(filters).forEach(([filter_key, filter]) => {
            let value = searchParams.get(filter_key);

            if (value) {
                if (filter.options && Array.isArray(filter.options)) {
                    value = value.split(",");
                    value = value.map((v) => v.trim());
                    query[filter_key] = value;
                } else {
                    value = value.trim();
                    query[filter_key] = value;
                }
            }
        });

        console.log(query);
        setQuery({ ...query });
    }, [searchParams]);


    useEffect(() => {
        if (!queryDebounce.keywords || queryDebounce.keywords.length <= 0) {
            // TODO: Add "enter search keywords" message
            setProfiles(null);
            return;
        }

        setSearchParams(queryToString(queryDebounce));
        axios.get("/search" + queryToString(queryDebounce)).then((res) => {
            setProfiles(res.data.profiles);
            setMapStats(res.data.states);
        });
    }, [queryDebounce]);

    const getMapConfig = (stats, current) => {
        let config = {};
        States.forEach((state) => {
            config[state.value] = {};

            if (!(state.value in stats)) { // For the state has no people, grey out
                if (!current) {
                    config[state.value].fill = "rgba(229, 231, 235, 1)";
                } else {
                    config[state.value].fill = "rgba(229, 231, 235, 0.6)";
                }
            } else { // For the state has people, color it with different opacity
                let value = stats[state.value];
                let opacity = value;

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
                // Do nothng and let it be cleared
            } else {
                query_new[filter_key] = query[filter_key];
            }
        });

        setQuery({ ...query_new });
    };

    const onMapClick = (dataset) => {
        if (dataset.name === query["state"]) {
            delete query["state"];
            setQuery({ ...query });
        } else if (mapStats[dataset.name] && mapStats[dataset.name] !== 0) {
            setQuery({ ...query, state: dataset.name });
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 relative">
                <div className="hidden lg:block col-span-1">
                    <div className="bg-gray-50 sticky top-20 -mt-1 p-2 h-screen">
                        <div className="align-middle relative flex clickable-map">
                            <USAMap title="" customize={getMapConfig(mapStats, query["state"])} onClick={(e) => onMapClick(e.target.dataset)} />
                        </div>
                    </div>
                </div>


                {/* Mobile view of the screen, copied from: https://tailwindui.com/components/ecommerce/components/category-filters */}
                <Transition show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex z-40">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto" style={{ paddingTop: "5.8rem" }}>
                                    <div className="px-4 flex items-center justify-between">
                                        {/* Clear filters */}
                                        <Popover as="div" className="relative z-10 text-left inline-flex items-center justify-center">
                                            <h2 className="text-md font-medium text-gray-900">Filters</h2>
                                        </Popover>
                                        <div className="flex -mr-2">
                                            <button
                                                className="w-9 h-9 p-2 text-gray-400 hover:text-gray-700 "
                                                onClick={() => clearFilters()}
                                            >
                                                <span className="text-transparent sr-only" aria-hidden="true">Clear all filters</span>
                                                <TrashIcon
                                                    className="flex-shrink-0 h-5 w-5"
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                className="w-9 h-9 bg-white p-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="text-transparent sr-only">Close filters menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Filters */}
                                    <form className="mt-4">
                                        {Object.entries(filters)
                                            .filter(([key, value]) => value.show === true) // Only show filters with options
                                            .map(([filter_key, filter]) => (
                                                <Disclosure as="div" key={filter_key} className="border-t border-gray-200 px-4 py-6">
                                                    {({ open }) => (
                                                        <>
                                                            <h3 className="-mx-2 -my-3 flow-root">
                                                                <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                                                                    <span>
                                                                        <span className="font-medium text-gray-900">{filter.title}</span>
                                                                        {
                                                                            // Display how many options are selected
                                                                            query[filter_key] && query[filter_key].length > 0 &&
                                                                            <span
                                                                                className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                                                                                {filter.option_indicator ? filter.option_indicator(query[filter_key]) : query[filter_key].length}
                                                                            </span>
                                                                        }
                                                                    </span>
                                                                    <span className="ml-6 flex items-center">
                                                                        <ChevronDownIcon
                                                                            className={classNames(open ? "-rotate-180" : "rotate-0", "h-5 w-5 transform")}
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Transition
                                                                show={open}
                                                                enter="transition duration-100 ease-out"
                                                                enterFrom="transform scale-95 opacity-0"
                                                                enterTo="transform scale-100 opacity-100"
                                                                leave="transition duration-75 ease-out"
                                                                leaveFrom="transform scale-100 opacity-100"
                                                                leaveTo="transform scale-95 opacity-0"
                                                            >
                                                                <Disclosure.Panel className="pt-6">
                                                                    <div className="space-y-6">
                                                                        {/* Code is copied from filter input */}
                                                                        {Array.isArray(filter.options) ? filter.options.map((option) => (
                                                                            <div key={option.value} className="flex items-center">
                                                                                <input
                                                                                    id={`filter-${filter_key}-${option.value}`}
                                                                                    name={`filter-${filter_key}-${option.value}`}
                                                                                    defaultValue={option.value}
                                                                                    type={filter.option_type}
                                                                                    className="h-4 w-4"
                                                                                    defaultChecked={query[filter_key] && query[filter_key].includes(option.value)}
                                                                                    checked={query[filter_key] && query[filter_key].includes(option.value)}
                                                                                    onClick={(e) => toggleFilterOption(filter_key, option.value, e.target.checked)}
                                                                                />
                                                                                <label
                                                                                    htmlFor={`filter-${filter_key}-${option.value}`}
                                                                                    className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                                                                >
                                                                                    {option.title}
                                                                                </label>
                                                                            </div>
                                                                        )) : filter.options}
                                                                    </div>
                                                                </Disclosure.Panel>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>


                <div className="col-span-1 px-4">
                    {/* Filters & Search Input */}
                    <ul className="bg-white sticky px-4 pt-9 pb-3 top-16 -mt-2 sm:px-6 sm:pt-6 sm:pb-4 sm:top-20 sm:-mt-1 z-30">

                        {/* Search Input */}
                        <li className="flex-1 flex items-center justify-between md:hidden w-full relative mb-3">
                            <label htmlFor="email" className="sr-only">
                                Search people
                            </label>
                            <div className="w-full relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    className="pl-10 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-100 p-3 border-transparent border-0"
                                    placeholder="Search people"
                                    autoComplete="off"
                                    value={query.keywords || ""}
                                    onChange={(e) => { setQuery({ ...query, keywords: e.target.value }); }}
                                />
                            </div>
                        </li>

                        <li className="flex items-center justify-between">

                            {/* Sort */}
                            <Menu as="div" className="relative z-10 inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="p-2 -ml-2 group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
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
                                                    onClick={() => setQuery({ ...query, sort: option.value })}
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

                            {/* The filter and filter clear button that appears on mobile screen */}
                            <Popover.Group className="flex sm:hidden items-center space-x-2">
                                {/* Button responsible for collapsing and expanding the filters on mobile view.*/}
                                <Popover as="div" className="relative z-10 text-left inline-flex items-center justify-center">
                                    <button
                                        type="button"
                                        className="p-2 -mr-2 group inline-flex justify-center items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                        onClick={() => setOpen(true)}
                                    >
                                        Filters
                                    </button>
                                </Popover>
                            </Popover.Group>



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
                                                    className="p-2 last-of-type:-mr-2 group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                                >
                                                    <span>{filter.title}</span>
                                                    {
                                                        // Display how many options are selected
                                                        query[filter_key] && query[filter_key].length > 0 &&
                                                        <span
                                                            className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                                                            {filter.option_indicator ? filter.option_indicator(query[filter_key]) : query[filter_key].length}
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
                                                        {Array.isArray(filter.options) ? filter.options.map((option) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${filter_key}-${option.value}`}
                                                                    name={`filter-${filter_key}-${option.value}`}
                                                                    defaultValue={option.value}
                                                                    type={filter.option_type}
                                                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                                    defaultChecked={query[filter_key] && query[filter_key].includes(option.value)}
                                                                    checked={query[filter_key] && query[filter_key].includes(option.value)}
                                                                    onClick={(e) => toggleFilterOption(filter_key, option.value, e.target.checked)}
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${filter_key}-${option.value}`}
                                                                    className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                                                >
                                                                    {option.title}
                                                                </label>
                                                            </div>
                                                        )) : filter.options}
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </Popover>
                                    ))}
                            </Popover.Group>
                        </li>
                    </ul>

                    {/* People list */}
                    <div className="bg-white sm:rounded-md mt-1">
                        <ul className="divide-y divide-gray-100 px-6" ref={animation}>
                            {profiles && profiles.map((profile) => (
                                <li key={profile.user_id}>
                                    {/*TODO add href for account detail page*/}
                                    <Link className="block hover:bg-gray-50 rounded-md -mx-6" to={"/profile/" + profile.user_id} rel="noreferrer">
                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                            <div className="min-w-0 flex-1 flex items-center">
                                                <div className="flex-shrink-0">
                                                    {/* <img className="h-12 w-12 rounded-full" src={avatar_url} alt="" /> */}
                                                    <Photo size="12" account={profile} badges={true} />
                                                </div>
                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                    <div>
                                                        {
                                                            (profile.first_name || profile.last_name)
                                                                ? <p className="search-result-field text-sm text-gray-900 truncate" dangerouslySetInnerHTML={{ __html: `${profile._highlightResult.first_name.value} ${profile._highlightResult.last_name.value}` }} />
                                                                : <p className="text-sm font-medium text-gray-500 truncate">Baylor Bridges User</p>
                                                        }
                                                        {
                                                            profile.headline &&
                                                            <p
                                                                className="search-result-field text-sm text-gray-500 flex mt-0.5 truncate"
                                                                dangerouslySetInnerHTML={{ __html: `${profile._highlightResult.headline.value}` }}
                                                            />
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
                                                                <p className="mt-0.5 flex items-center text-sm text-gray-500">
                                                                    {/* <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" /> */}
                                                                    Class of {profile.graduate_year}
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
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
};

const SearchInput = ({ focus, onFocus }) => {
    const [animation] = useAutoAnimate();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [abortController, setAbortController] = useState(new AbortController());

    const [searchResult, setSearchResult] = useState([]);
    const [keywords, setKeywords] = useState("");

    useEffect(() => {
        const url = window.location.href.split("?")[0];
        if (searchParams.get("keywords") && url.endsWith("/search")) {
            setKeywords(searchParams.get("keywords"));
        }
    }, []);

    useEffect(() => {
        abortController.abort();

        let newAbortController = new AbortController();
        setAbortController(newAbortController);

        if (keywords.length === 0) {
            return;
        }

        axios.get("/search", { params: { keywords: keywords, limit: 5 }, signal: newAbortController.signal })
            .then((res) => {
                setSearchResult(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [keywords]);


    return (
        <>
            {/* SEARCH BAR */}
            <div className="hidden md:flex-1 md:flex md:items-center md:justify-between mx-auto max-w-md relative">
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
                        className="transition pl-10 shadow-sm ring-1 border focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm rounded-md bg-gray-100 p-3 border-transparent ring-transparent"
                        placeholder="Search people"
                        autoComplete="off"
                        value={keywords}
                        debounceTimeout={750}
                        onFocus={() => onFocus(true)}
                        onBlur={() => { if (keywords.length === 0) onFocus(false); }}
                        onChange={(e) => { setKeywords(e.target.value); }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                navigate({
                                    pathname: "/search",
                                    search: createSearchParams({ keywords: keywords }).toString()
                                });
                                onFocus(false);
                                e.target.blur();
                            }
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
                    show={focus && searchResult?.profiles?.length > 0 && keywords.length > 0}
                >
                    <div className="z-50 bg-white absolute shadow-md py-2 rounded-md w-full max-w-md mt-4 top-16">
                        <ul className="" ref={animation}>
                            {searchResult?.profiles?.map((profile) => (
                                <li key={profile.user_id}>
                                    <Link className="transition-all py-4 px-5 flex hover:bg-gray-50 space-x-2.5" to={"/profile/" + profile.user_id} rel="noreferrer">
                                        <div className="h-10 w-10">
                                            <Photo size="10" account={profile} badges={true} />
                                        </div>
                                        <div className="flex justify-center flex-col truncate space-y-1">
                                            <p
                                                className="search-result-field text-sm text-gray-900"
                                                dangerouslySetInnerHTML={
                                                    { __html: `${profile._highlightResult.first_name.value} ${profile._highlightResult.last_name.value}` }
                                                }
                                            />

                                            {
                                                profile.headline?.length > 0 &&
                                                <p
                                                    className="search-result-field text-sm text-gray-500"
                                                    dangerouslySetInnerHTML={
                                                        { __html: `${profile._highlightResult.headline.value}` }
                                                    }
                                                />
                                            }
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link key="more" className="py-3 px-5 pb-2 flex text-sm text-emerald-600 font-medium" to={"/search?keywords=" + keywords}>
                            More results
                        </Link>
                    </div>
                </Transition>
            </div>
            {/* END OF SEARCH BAR */}
        </>
    );
};

export default Search;
export { SearchInput };