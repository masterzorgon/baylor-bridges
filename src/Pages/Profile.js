
import React, { Fragment } from "react";
import {
    CheckIcon,
    ThumbUpIcon,
    UserIcon,
} from "@heroicons/react/solid";
import { LinkIcon } from "@heroicons/react/outline";

const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
    advanced: { icon: ThumbUpIcon, bgColorClass: "bg-emerald-500" },
    completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
    {
        id: 1,
        type: eventTypes.applied,
        content: "Applied to",
        target: "Front End Developer",
        date: "Sep 20",
        datetime: "2020-09-20",
    },
    {
        id: 2,
        type: eventTypes.advanced,
        content: "Advanced to phone screening by",
        target: "Bethany Blake",
        date: "Sep 22",
        datetime: "2020-09-22",
    },
    {
        id: 3,
        type: eventTypes.completed,
        content: "Completed phone screening with",
        target: "Martha Gardner",
        date: "Sep 28",
        datetime: "2020-09-28",
    },
    {
        id: 4,
        type: eventTypes.advanced,
        content: "Advanced to interview by",
        target: "Bethany Blake",
        date: "Sep 30",
        datetime: "2020-09-30",
    },
    {
        id: 5,
        type: eventTypes.completed,
        content: "Completed interview with",
        target: "Katherine Snyder",
        date: "Oct 4",
        datetime: "2020-10-04",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Profile = () => {
    return (
        <>
            <div className="min-h-full bg-gray-100">
                <main className="py-10">
                    {/* Page header */}
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <img
                                        className="h-16 w-16 rounded-full"
                                        src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                                        alt=""
                                    />
                                    <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Ricardo Cooper</h1>
                                <p className="text-sm font-medium text-gray-500">
                                    This is the headline of the profile.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-500"
                            >
                                Connect
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                            {/* Description list*/}
                            <section aria-labelledby="applicant-information-title">
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                            Personal Information
                                        </h2>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                <dd className="mt-1 text-sm text-gray-900">Backend Developer</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Graduated in</dt>
                                                <dd className="mt-1 text-sm text-gray-900">Fall 2008</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">City</dt>
                                                <dd className="mt-1 text-sm text-gray-900">TX</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Role</dt>
                                                <dd className="mt-1 text-sm text-gray-900">Alumni</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                <dd className="mt-1 text-sm text-gray-900">yunfan.yang1@sss.ssss</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                <dd className="mt-1 text-sm text-gray-900">+1 403-444-4444</dd>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <dt className="text-sm font-medium text-gray-500">Biography</dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                                                    Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                                                    proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </section>

                            {/* Comments*/}
                            <section aria-labelledby="notes-title">
                                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                                    <div className="divide-y divide-gray-200">
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                                                Experiences
                                            </h2>
                                        </div>
                                        <div className="px-4 py-6 sm:px-6">
                                            <ul className="space-y-8">
                                                <li className="">
                                                    <p className="font-medium">Testing 1</p>
                                                    <p className="font-medium text-sm text-gray-500 mt-0.5"><time dateTime="2020-08-25">August 25, 2020</time> - <time dateTime="2020-08-25">August 25, 2020</time></p>
                                                    <p className="mt-2 text-sm text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.</p>
                                                    <div className="mt-4">
                                                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                                            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                                <div className="w-0 flex-1 flex items-center">
                                                                    <LinkIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                                    <span className="ml-2 flex-1 w-0 truncate text-gray-700">
                                                                        pub test
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4 flex-shrink-0">
                                                                    <a href="/ururrlrl" className="font-medium text-emerald-600 hover:text-emerald-500">
                                                                        Open
                                                                    </a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="">
                                                    <p className="font-medium">Testing 1</p>
                                                    <p className="font-medium text-sm text-gray-500 mt-0.5"><time dateTime="2020-08-25">August 25, 2020</time> - <time dateTime="2020-08-25">August 25, 2020</time></p>
                                                    <p className="mt-2 text-sm text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.</p>
                                                    <div className="mt-4">
                                                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                                            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                                <div className="w-0 flex-1 flex items-center">
                                                                    <LinkIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                                    <span className="ml-2 flex-1 w-0 truncate text-gray-700">
                                                                        pub test
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4 flex-shrink-0">
                                                                    <a href="/ururrlrl" className="font-medium text-emerald-600 hover:text-emerald-500">
                                                                        Open
                                                                    </a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                    People Also Viewed
                                </h2>

                                {/* Activity Feed */}
                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-mb-8">
                                        {timeline.map((item, itemIdx) => (
                                            <li key={item.id}>
                                                <div className="relative pb-8">
                                                    {itemIdx !== timeline.length - 1 ? (
                                                        <span
                                                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                            aria-hidden="true"
                                                        />
                                                    ) : null}
                                                    <div className="relative flex space-x-3">
                                                        <div>
                                                            <span
                                                                className={classNames(
                                                                    item.type.bgColorClass,
                                                                    "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                                                                )}
                                                            >
                                                                <item.type.icon className="w-5 h-5 text-white" aria-hidden="true" />
                                                            </span>
                                                        </div>
                                                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                            <div>
                                                                <p className="text-sm text-gray-500">
                                                                    {item.content}{" "}
                                                                    <a href="#" className="font-medium text-gray-900">
                                                                        {item.target}
                                                                    </a>
                                                                </p>
                                                            </div>
                                                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                                <time dateTime={item.datetime}>{item.date}</time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Profile;