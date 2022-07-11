import React, { Fragment } from "react";
import dayjs from "dayjs";
import { Menu, Transition } from "@headlessui/react";
import { PaperClipIcon } from "@heroicons/react/solid";
import { PencilIcon, DotsVerticalIcon, TrashIcon, PlusSmIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

import Photo from "../../components/Photo";
import Markdown from "../../components/Markdown";
import { classNames } from "../Utils";

const getFormattedDate = (date) => {
    if (!date) return null;
    if (date === "present") return "Present";

    let d = dayjs(date);
    return d.isValid() ? d.format("MMMM YYYY") : "";
};

const getDisplayDateRange = (start, end) => {
    start = getFormattedDate(start);
    end = getFormattedDate(end);

    let display_date = "";
    if (start) display_date += start;
    if (start && end) display_date += " - ";
    if (end) display_date += end;
    return display_date;
};

const ExperienceCard = ({ className, account, experience, onEditExperience, onDeleteExperience, onCreatePublication, onEditPublication, onDeletePublication }) => {
    return (
        <section>
            <div className={classNames("flex space-x-3", className)}>
                <div className="flex-shrink-0">
                    <Photo account={account} size="10" />
                </div>
                <div className="min-w-0 flex-1 flex items-center">
                    <div>
                        <h1 className="text-md font-medium text-gray-800 -mt-0.5">
                            {experience.title}
                        </h1>
                        <h2 className="text-sm text-gray-500">
                            {getDisplayDateRange(experience.start_time, experience.stop_time)}
                        </h2>
                    </div>
                </div>
                {
                    (onEditExperience || onDeleteExperience) &&
                    <div className="flex-shrink-0 self-center flex">
                        <Menu as="div" className="relative z-30 inline-block text-left">
                            <div>
                                <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                    <span className="sr-only">Open options</span>
                                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-2">
                                        {/* Edit experience */}
                                        <Menu.Item>
                                            <button
                                                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex px-4 py-2 text-sm w-full"
                                                onClick={() => onEditExperience(experience)}
                                            >
                                                <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <span>Edit</span>
                                            </button>
                                        </Menu.Item>

                                        {/* Delete experience */}
                                        <Menu.Item>
                                            <button
                                                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex px-4 py-2 text-sm w-full"
                                                onClick={() => onDeleteExperience(experience)}
                                            >
                                                <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <span>Remove</span>
                                            </button>
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                }
            </div>

            <div className="mt-4 ml-12 pl-1 space-y-4">
                <div className="">
                    <p className="block text-sm font-medium text-gray-600">
                        {experience.description?.length > 0 ? <Markdown>{experience.description}</Markdown> : <span className="text-gray-400">This experience has no description.</span>}
                    </p>
                </div>

                {
                    (experience.publications?.length > 0 || onCreatePublication) &&
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {
                            experience.publications.map((publication, pub_index) => (
                                <li className="px-3 py-3 flex items-center justify-between text-sm" key={pub_index}>
                                    <div className="w-0 flex-1 flex items-center">
                                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                        <span className="ml-2 flex-1 w-0 truncate text-gray-700">
                                            <Link to={/^http:\/\//.test(publication.duo_link) || /^https:\/\//.test(publication.duo_link) ? publication.duo_link : "//" + publication.duo_link}
                                                className="font-medium text-emerald-600 hover:text-emerald-500" target="_blank" rel="noreferrer">
                                                {publication.title}
                                            </Link>
                                        </span>
                                    </div>
                                    {
                                        (onEditPublication || onDeletePublication) &&
                                        <div className="ml-4 flex-shrink-0 flex justify-between gap-0 -mr-1 -my-2">
                                            {/* Edit publication */}
                                            {
                                                onEditPublication &&
                                                <button
                                                    type="button"
                                                    className="rounded-full p-2 hover:bg-gray-100"
                                                    onClick={() => onEditPublication(publication)}
                                                >
                                                    <PencilIcon className="h-5 w-5 text-gray-400" />
                                                </button>
                                            }

                                            {/* Delete publication */}
                                            {
                                                onDeletePublication &&
                                                <button
                                                    className="rounded-full p-2 hover:bg-gray-100"
                                                    onClick={() => onDeletePublication(publication)}
                                                >
                                                    <TrashIcon className="h-5 w-5 text-gray-400" />
                                                </button>
                                            }
                                        </div>
                                    }
                                </li>
                            ))
                        }
                        {
                            onCreatePublication &&
                            <li className="flex items-center overflow-hidden">
                                {/* Add new publication */}
                                <button
                                    type="button"
                                    className="relative block w-full border-gray-300 border-dashed py-2.5 text-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-600"
                                    onClick={() => onCreatePublication()}>
                                    <PlusSmIcon className="mx-auto h-5 w-5 text-gray-400" />
                                </button>
                            </li>
                        }
                    </ul>
                }
            </div>
        </section>
    );
};

export default ExperienceCard;