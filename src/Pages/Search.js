/* eslint-disable no-unused-vars */
import React, {Fragment,useEffect,useState} from "react";
import {Menu, Popover, Transition} from "@headlessui/react";
import {ChevronRightIcon, MailIcon,  ChevronDownIcon} from "@heroicons/react/solid";
import {TrashIcon} from "@heroicons/react/outline";
import USAMap from "react-usa-map";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function generateFilterSort(role, graduate_class, sort) {
    console.log("generate filter sort options");
    let sortValue = ["Name", "Class", "Location", "Occupation"];
    let roleValue = ["Alumni", "Current student"];
    // TODO to fill all the class ranges
    let graduate_class_value = ["2022-2026", "2012-2022", "2002-2012"];

    let sortOptions = [];
    // sort should return a single value, role and grad_class should return an array of values
    for (const s of sortValue) {
        if (s === sort) {
            sortOptions.push({name: s, href: "#" + s, current: true});
        } else {
            sortOptions.push({name: s, href: "#" + s, current: false});
        }
    }


    let filters = [{id:"role",name:"Role",options:[]},
        {id:"class",name:"Class",options:[]}
    ];

    for (const r of roleValue) {
        if (role !== null && role.includes(r)) {
            filters[0].options.push({value: "#" + r, label: r, checked: true});
        } else {
            filters[0].options.push({value: "#" + r, label: r, checked: false});
        }
    }

    for (const c of graduate_class_value) {
        if (graduate_class !== null && graduate_class.includes(c)) {
            filters[1].options.push({value: "#" + c, label: c, checked: true});
        } else {
            filters[1].options.push({value: "#" + c, label: c, checked: false});
        }
    }

    return [sortOptions, filters];

}



const avatar_url = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";





// TODO: Mobile responsive for everything in this page
// TODO: On mobile, hide map, replace with a filter

const Search = (props) => {
    const [searchParams] = useSearchParams();

    const keywords = searchParams.get("keywords");
    // eslint-disable-next-line no-unused-vars
    const [sort, setSort] = useState(searchParams.get("sort"));
    const [role, setRole] = useState(searchParams.get("role"));
    const [graduate_class, setGraduateClass] = useState(searchParams.get("class"));
    const [states, setStates] = useState(searchParams.get("state"));
    const [test,setTest]=useState(0);

    const [statesCustomConfig, setStateCustomConfig] = useState({});


    const [profiles, setProfiles] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [sortOptions, setSortOptions] = useState([]);
    const [filtersOptions, setFiltersOptions]=useState([]);

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

    // eslint-disable-next-line no-unused-vars
    function handleCheckFilter(option, options) {
        console.log("options is ",options, "option is ",option);
        if (options !== null && options.includes(option)) {
            const index = options.indexOf(option);
            if (index > -1) {
                options.splice(index, 1); // 2nd parameter means remove one item only
            }

        } else {
            if (options === null) options = [];
            options.push(option);
        }
        console.log("options now is ",options);

        return options;
    }

    useEffect(() => {
        console.log("calling use Effect");
        console.log("test is ",test);
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

            setProfiles(res.data.profiles);
            // console.log("profile is", profiles);
            // console.log("sort is ", sort);

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

        const [get_sort,get_filter] = generateFilterSort(role, graduate_class, sort);
        setSortOptions(get_sort);
        setFiltersOptions(get_filter);
        console.log("filter options is ",filtersOptions);


    }, [keywords, sort,role,graduate_class, states,test]);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:block col-span-1">
                    <div className="bg-gray-100 sticky p-2 h-screen" style={{"top": "5.4rem"}}>
                        <div className="align-middle relative flex">
                            <USAMap onClick={mapHandler}/>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 px-4">
                    {/* Filters */}
                    <div
                        className="bg-white sticky flex items-center justify-between px-6 py-5 sm:pt-6 md:pt-6 lg:pt-6 pt-2 z-30"
                        style={{"top": "5.4rem"}}>
                        {/* White cover for sticky filter div, for visuals only */}
                        <div className="absolute bg-inherit w-full"
                            style={{"top": "-2rem", "height": "4rem", "left": "0rem"}}></div>

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


                        {/* Filters */}
                        <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                            {/* Clear filters */}
                            <Popover as="div" id="desktop-menu" className="relative z-10 inline-block text-left">
                                <Popover.Button
                                    className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    <span className="text-transparent">Clear</span>
                                    <TrashIcon
                                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        onClick={()=> {
                                            setRole(null);
                                            setGraduateClass(null);
                                        }}
                                    />
                                </Popover.Button>
                            </Popover>

                            {filtersOptions.map((section, sectionIdx) => (
                                <Popover as="div" key={section.name} id="desktop-menu"
                                    className="relative z-10 inline-block text-left">
                                    <div>
                                        <Popover.Button
                                            className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            <span>{section.name}</span>
                                            {sectionIdx === 0 ? (
                                                <span
                                                    className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                                                    1
                                                </span>
                                            ) : null}
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
                                            <form className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            className="h-4 w-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                                                            defaultChecked={option.checked}
                                                            onClick={()=>{

                                                                if (section.id === "role"){
                                                                    console.log("clicking role");
                                                                    setRole(handleCheckFilter(option.label,role));
                                                                    console.log("role now is ",role);

                                                                }else{
                                                                    console.log("clicking class");
                                                                    setGraduateClass(handleCheckFilter(option.label,graduate_class));
                                                                }

                                                                setTest(test+1);
                                                                
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                            className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </form>
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

                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;