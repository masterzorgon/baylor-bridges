import React, { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { CheckCircleIcon, ChevronRightIcon, MailIcon, ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/solid";
import USAMap from "react-usa-map";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function mapHandler(event) {
    alert(event.target.dataset.name);
    // TODO: Display right panel for alumini list
}

const applications = [
    {
        applicant: {
            name: "Ricardo Cooper",
            email: "ricardo.cooper@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Kristen Ramos",
            email: "kristen.ramos@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ricardo Cooper",
            email: "ricardo.cooper@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ricardo Cooper",
            email: "ricardo.cooper@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
    {
        applicant: {
            name: "Ted Fox",
            email: "ted.fox@example.com",
            imageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        date: "2020-01-07",
        dateFull: "January 7, 2020",
        stage: "Completed phone screening",
        href: "#",
    },
];

const sortOptions = [
    { name: "Name", href: "#name" },
    { name: "Class", href: "#class" },
    { name: "Research", href: "#research" },
    { name: "Occupation", href: "#occupation" },
];

const filters = [
    {
        id: "class",
        name: "Class",
        options: [
            { value: "2022", label: "2022" },
            { value: "2021", label: "2021" },
            { value: "2020", label: "2020" },
            { value: "2019", label: "2019" },
            { value: "2018", label: "2018" },
            { value: "2017", label: "2017" },
            { value: "2016", label: "2016" },
            { value: "2015", label: "2015" },
            { value: "2014", label: "2014" },
            { value: "2013", label: "2013" },
            { value: "2012", label: "2012" },
            { value: "2011", label: "2011" },
            { value: "2010", label: "2010" },
            { value: "2009", label: "2009" },
            { value: "2008", label: "2008" },
            { value: "2007", label: "2007" },
            { value: "2006", label: "2006" },
            { value: "2005", label: "2005" },
            { value: "2004", label: "2004" },
            { value: "2003", label: "2003" },
            { value: "2002", label: "2002" },
            { value: "2001", label: "2001" },
            { value: "2000", label: "2000" },
        ],
    },
    {
        id: "research",
        name: "Research",
        options: [
            { value: "clothing-company", label: "Clothing Company" },
            { value: "fashion-inc", label: "Fashion Inc." },
            { value: "shoes-n-more", label: "Shoes 'n More" },
        ],
    },
    {
        id: "occupation",
        name: "Occupation",
        options: [
            { value: "white", label: "White" },
            { value: "black", label: "Black" },
            { value: "grey", label: "Grey" },
        ],
    },
];

// TODO: Mobile responsive for everything in this page
// TODO: On mobile, hide map, replace with a filter

const Search = (props) => {
    return (
        <>
            <div className="grid grid-cols-2">
                <div className="col-span-1">
                    <div className="bg-gray-100 sticky p-2 h-screen" style={{ "top": "5.4rem" }}>
                        <div className="align-middle relative flex">
                            <USAMap onClick={mapHandler} />
                        </div>
                    </div>
                </div>
                <div className="col-span-1 px-4">
                    {/* Filters */}
                    <div className="bg-white sticky flex items-center justify-between px-6 py-4" style={{ "top": "5.4rem" }}>
                        {/* White cover for sticky filter div, for visuals only */}
                        <div className="absolute bg-inherit w-full" style={{ "top": "-2rem", "height": "4rem", "left": "0rem" }}></div>
                        
                        {/* Filters */}
                        <Menu as="div" className="relative z-10 inline-block text-left">
                            <div>
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
                                <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option}>
                                                {({ active }) => (
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "block px-4 py-2 text-sm font-medium text-gray-900"
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

                        <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                            {filters.map((section, sectionIdx) => (
                                <Popover as="div" key={section.name} id="desktop-menu" className="relative z-10 inline-block text-left">
                                    <div>
                                        <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            <span>{section.name}</span>
                                            {sectionIdx === 0 ? (
                                                <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
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
                                        <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <form className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
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
                        <ul className="divide-y divide-gray-200">
                            {applications.map((application) => (
                                <li key={application.applicant.email}>
                                    <a href={application.href} className="block hover:bg-gray-50">
                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                            <div className="min-w-0 flex-1 flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="h-12 w-12 rounded-full" src={application.applicant.imageUrl} alt="" />
                                                </div>
                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-emerald-600 truncate">{application.applicant.name}</p>
                                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                                            <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            <span className="truncate">{application.applicant.email}</span>
                                                        </p>
                                                    </div>
                                                    <div className="hidden md:block">
                                                        <div>
                                                            <p className="text-sm text-gray-900">
                                                                Applied on <time dateTime={application.date}>{application.dateFull}</time>
                                                            </p>
                                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                                                {application.stage}
                                                            </p>
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
                                        <span className="font-medium">97</span> results
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