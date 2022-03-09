import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { PencilIcon, DotsVerticalIcon, PlusSmIcon as PlusSmIconSolid, TrashIcon, ExclamationIcon } from "@heroicons/react/outline";
import { PaperClipIcon } from "@heroicons/react/solid";

import Photo from "../../components/Photo";
import Container from "./Container";
import Button from "../../components/Button";

const CREATE = 0;
const UPDATE = 1;
const DELETE = 2;

const EXPERIENCE = 0;
const PUBLICATION = 1;

const Experience = () => {
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(null);
    const [complete, setComplete] = useState(false);

    const [open, setOpen] = useState(false);
    const [field, setField] = useState(null);

    const [experiences, setExperiences] = useState(null);

    useEffect(() => {
        axios.get("/account/profile/experience")
            .then(res => {
                console.log(res.data);
                setExperiences(res.data);
            });

        console.log(error);
    }, []);

    useEffect(() => {
        if (!field) return; // field is null

        // Experience & Publication must have title
        if (!field.title || field.title === "") {
            setComplete(false);
            return;
        }

        // Publication must have a link
        if (field._type === PUBLICATION && (!field.duo_link || field.duo_link === "")) {
            setComplete(false);
            return;
        }

        setComplete(true);


        // FIXME: Low readability, what is even going on here??? @TinaXiayanLi -Cloudy
        // if the form is for submitting experience
        // if (field._type === EXPERIENCE && field.start_time && field["start_time"].includes("/")) {
        //     let startTime = field["start_time"].split("/");
        //     let startDate = Date.parse(startTime[1] + "-" + startTime[0]);
        //     let currentDate = new Date().getTime();

        //     if (startTime[1].length >= 3 && startDate && startDate < currentDate) {
        //         // the experience must start in the past
        //         if (field.stop_time && field["stop_time"] !== "") {
        //             let endTime = field["stop_time"].split("/");
        //             let endDate = Date.parse(endTime[1] + "-" + endTime[0]);
        //             // if user input the end date
        //             if (field["stop_time"].includes("/") && endTime[1].length >= 3 && endDate && endDate >= startDate) {
        //                 setComplete(true);
        //             } else {
        //                 setComplete(false);
        //             }
        //         }
        //         else {
        //             setComplete(true);
        //         }
        //         setComplete(true);
        //     } else {
        //         setComplete(false);
        //     }
        // } else {
        //     setComplete(false);
        // }

    }, [field]);

    const getModal = (field) => {
        if (!field) return;

        const onChange = (value, attribute) => {
            if (attribute === "start_time" || attribute === "stop_time") {
                // If does not match pattern, do not update value
                if (/^\d{0,2}$/.test(value) === false && /^\d{2}\/\d{0,4}$/.test(value) === false) {
                    return;
                }
            }

            setField({ ...field, [attribute]: value });
        };

        const onCreateExperience = (field) => {
            setLoading(true);
            axios.post("/account/profile/experience", field)
                .then(res => {
                    setErrorMessage(null);
                    setExperiences(res.data);
                    setOpen(false);
                })
                .catch(err => setErrorMessage(err.response.data.message))
                .finally(() => setLoading(false));
        };

        const onUpdateExperience = (field) => {
            setLoading(true);
            axios.put(`/account/profile/experience/${field.exper_id}`, field)
                .then(res => {
                    setErrorMessage(null);
                    setExperiences(res.data);
                    setOpen(false);
                })
                .catch(err => setErrorMessage(err.response.data.message))
                .finally(() => setLoading(false));
        };

        const onDeleteExperience = (field) => {
            setLoading(true);
            axios.delete(`/account/profile/experience/${field.exper_id}`)
                .then(res => {
                    setExperiences(res.data);
                    setErrorMessage(null);
                    setOpen(false);
                })
                .catch(err => setErrorMessage(err.response.data.message))
                .finally(() => setLoading(false));
        };

        const onCreatePublication = (field) => {
            setLoading(true);
            axios.post(`/account/profile/experience/${field.exper_id}/publication`, field)
                .then(res => {
                    setErrorMessage(null);
                    experiences[field.exper_index].publications = res.data;
                    setExperiences(experiences);
                    setOpen(false);
                })
                .catch(err => setErrorMessage(err.response.data.message))
                .finally(() => setLoading(false));
        };

        const onUpdatePublication = (field) => {
            setLoading(true);
            axios.put(`/account/profile/experience/${field.exper_id}/publication/${field.pub_id}`, field)
                .then(res => {
                    setErrorMessage(null);
                    experiences[field.exper_index].publications = res.data;
                    setExperiences(experiences);
                    setOpen(false);
                })
                .catch(err => setErrorMessage(err.response.data.message))
                .finally(() => setLoading(false));
        };

        const onDeletePublication = (field) => {
            setLoading(true);
            axios.delete(`/account/profile/experience/${field.exper_id}/publication/${field.pub_id}`)
                .then(res => {
                    setOpen(false);
                    experiences[field.exper_index].publications = res.data;
                    setExperiences(experiences);
                    setErrorMessage(null);
                })
                .catch(err => setErrorMessage(err.response.data.message))
                .finally(() => setLoading(false));
        };


        const getExperienceDom = (field) => {
            return (
                <div className="p-4 pb-5 sm:align-middle sm:p-6">
                    {/* <div>
                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                            {field._operation === CREATE && "Add Experience"}
                            {field._operation === UPDATE && "Edit Experience"}
                        </h2>
                    </div> */}

                    <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Experience Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                value={field.title}
                                onChange={(e) => onChange(e.target.value, "title")}
                            />
                        </div>

                        <div className="col-span-4 sm:col-span-1">
                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <input
                                type="text"
                                name="start-date"
                                id="start-date"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                placeholder="MM / YYYY"
                                value={field.start_time}
                                onChange={(e) => onChange(e.target.value, "start_time")}
                            />
                            {/* <DatePicker/> */}
                        </div>
                        <div className="col-span-4 sm:col-span-1">
                            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                                End Date
                            </label>
                            <input
                                type="text"
                                name="end-date"
                                id="end-date"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                placeholder="MM / YYYY"
                                value={field.stop_time}
                                onChange={(e) => onChange(e.target.value, "stop_time")}
                            />
                        </div>

                        <div className="col-span-4 sm:col-span-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                name="description"
                                id="description"
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 py-2 px-3 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={field.description}
                                onChange={(e) => onChange(e.target.value, "description")}
                            />
                        </div>
                    </div>

                    <Button
                        className="mt-4"
                        loading={loading}
                        disabled={!complete || loading}
                        onClick={() => {
                            if (field._operation === CREATE) {
                                onCreateExperience(field);
                            } else if (field._operation === UPDATE) {
                                onUpdateExperience(field);
                            }
                        }}
                    >
                        {field._operation === CREATE && "Create"}
                        {field._operation === UPDATE && "Update"}
                    </Button>
                </div >
            );
        };


        const getPublicationDom = (field) => {
            return (
                <div className="p-4 pb-5 sm:align-middle sm:p-6">
                    {/* <div>
                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                            {field._operation === CREATE && "Add Publication"}
                            {field._operation === UPDATE && "Edit Publication"}
                        </h2>
                    </div> */}

                    <div className="grid grid-cols-8 gap-3">
                        <div className="col-span-8 sm:col-span-3">
                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                Publication Title
                            </label>
                            <input
                                type="text"
                                name="expiration-date"
                                id="expiration-date"
                                autoComplete="cc-exp"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                placeholder="Title"
                                onChange={(e) => onChange(e.target.value, "title")}
                                value={field.title}
                            />
                        </div>
                        <div className="col-span-8 sm:col-span-5">
                            <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                DUO Link
                            </label>
                            <input
                                type="text"
                                name="expiration-date"
                                id="expiration-date"
                                autoComplete="cc-exp"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                onChange={(e) => onChange(e.target.value, "duo_link")}
                                placeholder="Link"
                                value={field.duo_link}
                            />
                        </div>
                    </div>

                    <Button
                        className="mt-4"
                        loading={loading}
                        disabled={!complete || loading}
                        onClick={() => {
                            if (field._operation === CREATE) {
                                onCreatePublication(field);
                            } else if (field._operation === UPDATE) {
                                onUpdatePublication(field);
                            }
                        }}
                    >
                        {field._operation === CREATE && "Create"}
                        {field._operation === UPDATE && "Update"}
                    </Button>
                </div>
            );
        };


        const getDeleteDom = (field) => {
            let field_type_text = "";
            if (field._type === EXPERIENCE) {
                field_type_text = "experience";
            } else if (field._type === PUBLICATION) {
                field_type_text = "publication";
            }

            return (
                <>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    Delete {field_type_text}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete {field_type_text} &quot;{field.title}&quot;?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Button
                            className="w-full bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            loading={loading}
                            disabled={loading}
                            onClick={() => {
                                if (field._type === EXPERIENCE) {
                                    onDeleteExperience(field);
                                } else if (field._type === PUBLICATION) {
                                    onDeletePublication(field);
                                }
                            }}
                        >
                            Remove
                        </Button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => !loading && setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            );
        };

        if (field._operation === CREATE || field._operation === UPDATE) {
            if (field._type === EXPERIENCE) {
                return getExperienceDom(field);
            } else if (field._type === PUBLICATION) {
                return getPublicationDom(field);
            }
        } else if (field._operation === DELETE) {
            return getDeleteDom(field);
        }
    };


    const onOpenModal = (field, type, operation) => {
        setField(Object.assign({}, field, { _type: type, _operation: operation }));
        setComplete(false);
        setOpen(true);
    };


    // 
    //  [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
    //  [*][*][*][*] CONTENT AREA! [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
    //  [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
    // 

    return (
        <>
            <Container current="experience">
                <div className="mt-10 divide-y divide-gray-200">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="space-y-1">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Experience</h3>
                            <p className="max-w-2xl text-sm text-gray-500">Manage all your past experiences and publications.</p>
                        </div>
                        <div className="flex justify-center order-3 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <button
                                onClick={() => onOpenModal({ title: "", start_time: "", stop_time: "", description: "" }, EXPERIENCE, CREATE)}
                                className="h-10 w-10 text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-2 flex justify-center rounded-full items-center"
                            >
                                <PlusSmIconSolid className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <dl className="divide-y divide-gray-200">
                            {/* 
                                [*][*][*]                     [*][*][*]
                                [*][*][*] EXPERIENCES SECTION [*][*][*]
                                [*][*][*]                     [*][*][*]
                            */}
                            {experiences && experiences.map((experience, exper_index) => (
                                <section key={exper_index} className="py-6">
                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0">
                                            <Photo size="10" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h1 className="text-md font-medium text-gray-800 -mt-0.5">
                                                {experience.title}
                                            </h1>
                                            <h2 className="text-sm text-gray-500">
                                                {experience.start_time} - {experience.stop_time}
                                            </h2>
                                        </div>
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
                                                                    onClick={() => onOpenModal(experience, EXPERIENCE, UPDATE)}
                                                                >
                                                                    <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    <span>Edit</span>
                                                                </button>
                                                            </Menu.Item>

                                                            {/* Delete experience */}
                                                            <Menu.Item>
                                                                <button
                                                                    className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex px-4 py-2 text-sm w-full"
                                                                    onClick={() => onOpenModal(experience, EXPERIENCE, DELETE)}
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
                                    </div>

                                    <div className="my-6 mb-8">
                                        <p className="block text-sm font-medium text-gray-600">
                                            {experience.description}
                                        </p>
                                    </div>

                                    {/* 
                                            [*][*][*]                         [*][*][*]
                                            [*][*][*] PUBLICATIONS LIST BELOW [*][*][*] 
                                            [*][*][*]                         [*][*][*]
                                        */}

                                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                        {
                                            experience.publications.map((publication, pub_index) => (
                                                <li className="px-3 py-1 flex items-center justify-between text-sm" key={pub_index}>
                                                    <div className="w-0 flex-1 flex items-center">
                                                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                        <span className="ml-2 flex-1 w-0 truncate text-gray-700">
                                                            <a href={/^http:\/\//.test(publication.duo_link) || /^https:\/\//.test(publication.duo_link) ? publication.duo_link : "//" + publication.duo_link}
                                                                className="font-medium text-emerald-600 hover:text-emerald-500" target="_blank" rel="noreferrer">
                                                                {publication.title}
                                                            </a>
                                                        </span>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0 flex justify-between gap-0 -mr-1">
                                                        {/* Edit publication */}
                                                        <button
                                                            type="button"
                                                            className="rounded-full p-2 hover:bg-gray-100"
                                                            onClick={() => onOpenModal(Object.assign({}, publication, { exper_id: experience.exper_id, exper_index: exper_index, pub_index: pub_index }), PUBLICATION, UPDATE)}
                                                        >
                                                            <PencilIcon className="h-5 w-5 text-gray-400" />
                                                        </button>

                                                        {/* Delete publication */}
                                                        <button
                                                            className="rounded-full p-2 hover:bg-gray-100"
                                                            onClick={() => onOpenModal(Object.assign({}, publication, { exper_id: experience.exper_id, exper_index: exper_index, pub_index: pub_index }), PUBLICATION, DELETE)}
                                                        >
                                                            <TrashIcon className="h-5 w-5 text-gray-400" />
                                                        </button>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                        <li className="flex items-center overflow-hidden">
                                            {/* Add new publication */}
                                            <button
                                                type="button"
                                                className="relative block w-full border-gray-300 border-dashed py-2.5 text-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-600"
                                                onClick={() => onOpenModal(Object.assign({}, { title: "", duo_link: "" }, { exper_id: experience.exper_id, exper_index: exper_index }), PUBLICATION, CREATE)}>
                                                <PlusSmIconSolid className="mx-auto h-5 w-5 text-gray-400" />
                                            </button>
                                        </li>
                                    </ul>
                                </section>
                            ))}
                        </dl>
                    </div>
                </div>
            </Container>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={() => { if (!loading) setOpen(false); }}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="overflow-hidden sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all space-y-4">
                                {getModal(field)}
                            </div>

                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};
export default Experience;