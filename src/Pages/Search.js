import React from "react";
import { CheckCircleIcon, ChevronRightIcon, MailIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import USAMap from "react-usa-map";


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
                <div className="col-span-1 p-4">
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