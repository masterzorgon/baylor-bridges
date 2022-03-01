import React, { useEffect, useState, Fragment, useRef } from "react";
import SettingsNavbar from "../../components/SettingsNavbar";
import ExperienceModal from "../../components/ExperienceModal";

// eslint-disable-next-line no-unused-vars
import { Menu, Transition, Dialog } from "@headlessui/react";
import { PencilIcon, DotsVerticalIcon, DocumentRemoveIcon, PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";

import { MinusCircleIcon, ExclamationIcon, LinkIcon } from "@heroicons/react/outline";
import ErrorMessage from "../../components/ErrorMessage";

// TAILWIND CSS ALERTS
import UploadSuccess from "../../components/UploadSuccess";
import UploadFailure from "../../components/UploadFailure";
import DeletePublicationAlert from "../../components/DeletePublicationAlert";

import axios from "axios";

const Experience = () => {
    const [loading, setLoading] = useState(false);
    const [error_message, setErrorMessage] = useState(null);

    const [experiences, setExperiences] = useState([]);
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [field, setField] = useState(null);

    // modalSetttings will start the modal type(edit/remove) and exper_idx
    const [modalSettings, setModalSettings] = useState({});
    const cancelButtonRef = useRef(null);

    // eslint-disable-next-line no-unused-vars
    const [refresh, setRefresh] = useState(false);

    // STATE FOR ADDING A NEW EXPERIENCE [*][*][*][*]
    const [modal, setModal] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadFailure, setUploadFailure] = useState(false);
    const [experience, setExperience] = useState({
        title: "",
        description: "",
        start_time: "",
        stop_time: "",
        publications: []
    });

    // STATE FOR PUBLICATION [*][*][*][*]
    const [publicationDelete, setPublicationDelete] = useState(false);


    useEffect(() => {
        console.log("calling use effect");

        if (experiences.length === 0) {
            axios.get("/account/profile/experience")
                .then(res => {
                    console.log(res.data);
                    setExperiences(res.data);
                });
        }
        else {
            console.log("not calling axios");
            setRefresh(false);
        }
        setUpdate(false);

    }, [update, refresh]);

    // eslint-disable-next-line no-unused-vars
    // const handleChange =(index,field,value)=>{
    //     let new_exper=experiences;
    //     new_exper[index][field]=value;
    //     console.log("updating experience is ",new_exper[index]);
    //     setExperiences(new_exper);
    //     setUpdate(true);

    // };

    // eslint-disable-next-line no-unused-vars
    const getModal = (modalSettings, field, idx) => {

        const handleChange = (e, value) => {
            let new_field = field;
            if (value === "start_time" || value === "stop_time") {


                let input = e.target.value;
                console.log("input is", input);
                if (input.length <= 2 && /^\d*$/.test(input)) {

                    let oldVal = new_field[value];
                    new_field[value] = e.target.value;

                    if (input.length === 2) {
                        if (oldVal.charAt(oldVal.length - 1) !== "/") {
                            new_field[value] += "/";
                        }
                    }
                }
                else if (/^\d{2}\/\d{0,4}$/.test(input)) {
                    new_field[value] = e.target.value;

                }

                if (new_field[value] === null) {
                    new_field[value] = "";
                    console.log("new field is null");
                }
                setField(new_field);
                console.log(field);



            } else {

                new_field[value] = e.target.value;
                console.log(new_field);
                setField(new_field);

            }
            setRefresh(true);

        };

        // eslint-disable-next-line no-unused-vars
        const handleExperRemove = () => {
            setLoading(true);
            console.log("exper id is " + field["exper_id"] + ", the idx is " + modalSettings["idx"]);

            // eslint-disable-next-line no-unused-vars
            let url = "/account/profile/experience/" + field["exper_id"];

            axios.delete(url)
                .then(res => {
                    console.log("delete the experience successfully");
                    let new_exper = experiences;
                    new_exper.splice(modalSettings["idx"], 1);
                    console.log(new_exper);
                    setRefresh(true);
                    setOpen(false);
                    setExperiences(res.data);
                    setErrorMessage(null);
                })
                .catch(err => err.message !== "time out" ? setErrorMessage(err.response.data.message) : setErrorMessage("server time out"))
                .finally(() => setLoading(false));
        };

        const handlePubRemove = () => {
            setLoading(true);

            console.log("PUB ID", field[0].pub_id);
            console.log("EXP ID", field[1].exper_id);

            let url = `/account/profile/experience/${field[1].exper_id}/publication/${field[0].pub_id}`;

            axios.delete(url)
                .then(res => {
                    let new_exper = experiences;
                    new_exper[modalSettings["idx"]]["publications"] = res.data;
                    console.log(new_exper);
                    setOpen(false);
                    setErrorMessage(null);
                })
                .catch(err => err.message !== "time out" ? setErrorMessage(err.response.data.message) : setErrorMessage("server time out"))
                .finally(() => setLoading(false));
        };


        const handleExperSubmit = (field) => {
            setLoading(true);
            let url = "/account/profile/experience/" + field["exper_id"];
            console.log(url);
            axios.put(url, field)
                .then(res => {
                    console.log("update the experience successfully");
                    setExperiences(res.data);
                    setErrorMessage(false);
                    setOpen(false);
                })
                .catch(err => err.message !== "time out" ? setErrorMessage(err.response.data.message) : setErrorMessage("server time out"))

                .finally(() => setLoading(false));

            // TODO: also submit publications changes
        };

        const handlePubSubmit = (field) => {
            console.log("calling handel pub submit");
            console.log(modalSettings);

            setLoading(true);
            if (modalSettings["modalType"] === "new pub") {
                let url = "/account/profile/experience/" + modalSettings["idx"]["db_id"] + "/publication";
                console.log(url);
                // console.log(experiences[modalSettings["idx"]["list_id"]]);
                axios.post(url, field)
                    .then(res => {
                        console.log("post successfully");
                        console.log(res.data);
                        let new_exper = experiences;
                        new_exper[modalSettings["idx"]["list_id"]]["publications"] = res.data;
                        console.log(new_exper);
                        setErrorMessage(null);
                        setOpen(false);

                    })
                    .catch(err => err.message !== "time out" ? setErrorMessage(err.response.data.message) : setErrorMessage("server time out"))
                    .finally(() => setLoading(false));

            }
            else if (modalSettings["modalType"] === "edit pub") {
                console.log("put to publication");
                let url = "/account/profile/experience/" + modalSettings["idx"]["exper_db_id"] + "/publication/" + field.pub_id;
                console.log("the url is " + url);
                axios.put(url, field)
                    .then(res => {
                        console.log("post successfully");
                        console.log(res.data);
                        let new_exper = experiences;
                        new_exper[modalSettings["idx"]["exper_list_id"]]["publications"] = res.data;
                        console.log(new_exper);

                        setOpen(false);

                    }).finally(() => setLoading(false));
            }
        };


        if (!field) return;

        if (modalSettings["modalType"] === "edit") {
            return (
                /* 
                    [*][*][*][*]                       [*][*][*][*]
                    [*][*][*][*] EDIT EXPERIENCE MODAL [*][*][*][*]
                    [*][*][*][*]                       [*][*][*][*]
                */
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                    <ErrorMessage error_message={error_message}></ErrorMessage>
                    <section aria-labelledby="payment-details-heading">
                        <div>
                            <div className="sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 sm:p-6">
                                    <div>
                                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                                            Edit Experience
                                        </h2>
                                    </div>

                                    <div className="mt-6 grid grid-cols-4 gap-6">
                                        <div className="col-span-4 sm:col-span-2">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                autoComplete=""
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                value={field.title}
                                                onChange={(e) => handleChange(e, "title")}
                                            />
                                        </div>

                                        <div className="col-span-4 sm:col-span-1">
                                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                                Start Date
                                            </label>
                                            <input
                                                type="text"
                                                name="expiration-date"
                                                id="expiration-date"
                                                autoComplete="cc-exp"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                placeholder="MM / YYYY"
                                                value={field.start_time}
                                                onChange={(e) => handleChange(e, "start_time")}
                                            />
                                            {/* <DatePicker/> */}
                                        </div>
                                        <div className="col-span-4 sm:col-span-1">
                                            <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                                End date
                                            </label>
                                            <input
                                                type="text"
                                                name="expiration-date"
                                                id="expiration-date"
                                                autoComplete="cc-exp"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                placeholder="MM / YYYY"
                                                value={field.stop_time}
                                                onChange={(e) => handleChange(e, "stop_time")}
                                            />
                                        </div>

                                        <div className="col-span-4 sm:col-span-4">
                                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>

                                            <textarea
                                                rows={4}
                                                name="comment"
                                                id="comment"
                                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 py-2 px-3 block w-full sm:text-sm border-gray-300 rounded-md"
                                                defaultValue={""}
                                                value={field.description}
                                                onChange={(e) => handleChange(e, "description")}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="submit"
                                    className={`${loading ? "cursor-not-allowed" : ""} inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm`}
                                    onClick={() => handleExperSubmit(field)}
                                    {...(loading ? { disabled: true } : {})}
                                >
                                    {
                                        loading &&
                                        <svg className="cursor-not-allowed animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fillOpacity="0"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    }
                                    {
                                        !loading &&
                                        "Update this Experience"
                                    }
                                </button>
                            </div>
                        </div>
                    </section>

                </div>
            );
        }
        else if (modalSettings["modalType"] === "remove") {
            console.log("you click remove");
            return (
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    Remove Experience
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to remove the experience  &quot;{field.title}&quot; ? All of your data will be permanently removed.
                                        This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className={`${loading ? "cursor-not-allowed" : ""} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
                            onClick={() => handleExperRemove(field.exper_id)}
                            {...(loading ? { disabled: true } : {})}
                        >
                            {
                                loading &&
                                <svg className="cursor-not-allowed animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fillOpacity="0"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            }
                            {
                                !loading &&
                                "Remove"
                            }
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            );
        }
        else if (modalSettings["modalType"] === "remove pub") {
            console.log("you click remove");
            return (
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    Remove Publication
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to remove &quot;{field[0].title}&quot; ? The publication will be permanently removed.
                                        This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className={`${loading ? "cursor-not-allowed" : ""} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
                            onClick={() => handlePubRemove(field[0].pub_id, field[1].exper_id)} // IMPLEMENT REMOVE PUBLICATION FUNCTION
                            {...(loading ? { disabled: true } : {})}
                        >
                            {
                                loading &&
                                <svg className="cursor-not-allowed animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fillOpacity="0"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            }
                            {
                                !loading &&
                                "Remove"
                            }
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            );
        }
        else if (modalSettings["modalType"] === "new pub" || modalSettings["modalType"] === "edit pub") {
            console.log("geting modal new pub");
            return (
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                    <section aria-labelledby="payment-details-heading">
                        <div>
                            <div className="sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 sm:p-6">
                                    <div>
                                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                                            {
                                                modalSettings["modalType"] === "new pub"
                                                    ? "add publication"
                                                    : "edit publication"
                                            }
                                        </h2>
                                    </div>

                                    <div className="mt-6 grid grid-cols-8 gap-6">

                                        <div className="col-span-8 sm:col-span-3">
                                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                                pub title
                                            </label>
                                            <input
                                                type="text"
                                                name="expiration-date"
                                                id="expiration-date"
                                                autoComplete="cc-exp"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                placeholder="Title"
                                                onChange={(e) => handleChange(e, "title")}
                                                value={field.title}
                                            />
                                            {/* <DatePicker/> */}
                                        </div>
                                        <div className="col-span-8 sm:col-span-5">
                                            <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                                duo link
                                            </label>
                                            <input
                                                type="text"
                                                name="expiration-date"
                                                id="expiration-date"
                                                autoComplete="cc-exp"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                onChange={(e) => handleChange(e, "duo_link")}
                                                placeholder="Link"
                                                value={field.duo_link}
                                            />
                                        </div>



                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="submit"
                                    className={`${loading ? "cursor-not-allowed" : ""} inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm`}
                                    onClick={() => handlePubSubmit(field)}
                                    {...(loading ? { disabled: true } : {})}
                                >
                                    {
                                        loading &&
                                        <svg className="cursor-not-allowed animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fillOpacity="0"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    }
                                    {
                                        !loading &&
                                        "submit"
                                    }
                                </button>
                            </div>
                        </div>
                    </section>

                </div>
            );
        }


    };

    const handleOpenModal = (modalType, exper, exper_idx) => {
        setModalSettings({ "modalType": modalType, "idx": exper_idx });
        console.log(modalSettings);
        if (modalType === "new pub") {
            setField({ "title": "", "duo_link": "" });


        }

        else {
            console.log("the idx pass into handleOpenModal is " + exper_idx);
            setField(exper);

        }
        console.log(exper);
        setOpen(true);
    };


    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    const handleNewExperience = () => {
        setModal(true);
        setExperience({
            description: "",
            exper_id: Math.floor(Math.random()),
            publications: [],
            start_time: "",
            stop_time: "",
            title: ""
        });
    };

    /*
        [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
        [*][*][*][*] CONTENT AREA! [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
        [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
    */

    return (
        <>
            <div>
                <div className="">
                    <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
                        <main className="flex-1">
                            <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                                <div className="pt-10 pb-16">
                                    <div className="px-4 sm:px-6 md:px-0">
                                        <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
                                    </div>
                                    <div className="px-4 sm:px-6 md:px-0">
                                        <div className="py-6">
                                            <SettingsNavbar current="experience" />

                                            {/* ALERTS THAT DISPLAY UPON CREATING A NEW EXPERIENCE */}
                                            {uploadSuccess ? <UploadSuccess uploadSuccess={uploadSuccess} setUploadSuccess={setUploadSuccess} /> : null}
                                            {uploadFailure ? <UploadFailure uploadFailure={uploadFailure} setUploadFailure={setUploadFailure} /> : null}

                                            {/* NEW EXPERIENCE BANNER */}
                                            <div className="bg-emerald-600 rounded-md my-4">
                                                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                                                    <div className="flex items-center justify-between flex-wrap">
                                                        <div className="w-0 flex-1 flex items-center">
                                                            <p className="ml-3 font-medium text-white truncate">
                                                                <span className="hidden md:inline">Add a new Experience!</span>
                                                            </p>
                                                        </div>
                                                        <div className="flex justify-center order-3 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                                            <button
                                                                onClick={handleNewExperience}
                                                                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-emerald-600 bg-white hover:bg-emerald-50"
                                                            >
                                                                New Experience
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* SHOW NEW EXPERIENCE MODAL */}
                                            {modal && <ExperienceModal modal={modal} setModal={setModal} experience={experience} setExperience={setExperience}
                                                setUploadSuccess={setUploadSuccess} setUploadFailure={setUploadFailure} loading={loading} setLoading={setLoading}
                                                refresh={refresh} setRefresh={setRefresh} experiences={experiences} setExperiences={setExperiences}
                                                error_message={error_message} setErrorMessage={setErrorMessage} />}

                                            {/* 
                                                [*][*][*]                     [*][*][*]
                                                [*][*][*] EXPERIENCES SECTION [*][*][*]
                                                [*][*][*]                     [*][*][*]
                                            */}

                                            <div className="space-y-10 sm:px-6 lg:px-0 lg:col-span-9">
                                                {experiences.map((exper, idx) => (
                                                    <>
                                                        <section aria-labelledby="payment-details-heading" key={exper.exper_id}>
                                                            <form>
                                                                <div className="shadow sm:rounded-md ">
                                                                    <div className="bg-white py-2 px-2 sm:p-2">

                                                                        <div className="bg-white px-4 py-5 sm:px-6">
                                                                            <div className="flex space-x-3">
                                                                                <div className="min-w-0 flex-1">
                                                                                    <h1 className="text-md font-medium text-gray-900">
                                                                                        {exper.title}
                                                                                    </h1>
                                                                                    <h2 className="text-sm text-gray-500">
                                                                                        from {exper.start_time} to {exper.stop_time}
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
                                                                                                <div className="py-1">
                                                                                                    <Menu.Item>
                                                                                                        {({ active }) => (
                                                                                                            <a

                                                                                                                className={classNames(
                                                                                                                    active ? "bg-gray-100 text-gray-900 cursor-pointer" : "text-gray-700 cursor-pointer",
                                                                                                                    "flex px-4 py-2 text-sm cursor-pointer"
                                                                                                                )}
                                                                                                                onClick={() => handleOpenModal("edit", exper, idx)}
                                                                                                            >
                                                                                                                <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                                <span>Edit</span>
                                                                                                            </a>
                                                                                                        )}
                                                                                                    </Menu.Item>
                                                                                                    <Menu.Item>
                                                                                                        {({ active }) => (
                                                                                                            <a
                                                                                                                className={classNames(
                                                                                                                    active ? "bg-gray-100 text-gray-900 cursor-pointer" : "text-gray-700 cursor-pointer",
                                                                                                                    "flex px-4 py-2 text-sm cursor-pointer"
                                                                                                                )}

                                                                                                                onClick={() => handleOpenModal("remove", exper, idx)}
                                                                                                            >
                                                                                                                <DocumentRemoveIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                                <span>Remove</span>
                                                                                                            </a>
                                                                                                        )}
                                                                                                    </Menu.Item>
                                                                                                </div>
                                                                                            </Menu.Items>
                                                                                        </Transition>
                                                                                    </Menu>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bg-white py-6 px-4 sm:p-6">
                                                                        <p className="block text-sm font-medium text-gray-600">
                                                                            {exper.description}
                                                                        </p>
                                                                    </div>

                                                                    {/* 
                                                                        [*][*][*]                         [*][*][*]
                                                                        [*][*][*] PUBLICATIONS LIST BELOW [*][*][*] 
                                                                        [*][*][*]                         [*][*][*]
                                                                    */}

                                                                    {publicationDelete ? <DeletePublicationAlert publicationDelete={publicationDelete} setPublicationDelete={setPublicationDelete} /> : null}

                                                                    <div className="mx-4">
                                                                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                                                            {
                                                                                exper.publications.map((publication, index) => (

                                                                                    <li className="px-5 py-3 flex items-center justify-between text-sm" key={publication.pub_id}>
                                                                                        <div className="w-0 flex-1 flex items-center">
                                                                                            <LinkIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                                                            <span className="ml-2 flex-1 w-0 truncate text-gray-700">
                                                                                                <a href={/^http:\/\//.test(publication.duo_link) || /^https:\/\//.test(publication.duo_link) ? publication.duo_link : "//" + publication.duo_link}
                                                                                                    className="font-medium text-emerald-600 hover:text-emerald-500" target="_blank" rel="noreferrer"> 
                                                                                                    {publication.title}
                                                                                                </a>
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="ml-4 flex-shrink-0 flex justify-between">
                                                                                            {/* 
                                                                                                [*][*][*][*]                             [*][*][*][*]
                                                                                                [*][*][*][*] ENTER EDIT AND DELETE ICONS [*][*][*][*]
                                                                                                [*][*][*][*]                             [*][*][*][*]
                                                                                            */}

                                                                                            <PencilIcon className="h-5 w-5 mx-4" viewBox="0 0 20 20" fill="currentColor"
                                                                                                onClick={() => handleOpenModal("edit pub", publication, { "pub_list_id": index, "exper_list_id": idx, "exper_db_id": exper.exper_id })}
                                                                                            >
                                                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                                                            </PencilIcon>
                                                                                            <MinusCircleIcon className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                                                                onClick={() => handleOpenModal("remove pub", [publication, exper], idx)}
                                                                                            >
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                            </MinusCircleIcon>
                                                                                        </div>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                            <li className="flex items-center">
                                                                                {/* 
                                                                                    [*][*][*]                                     [*][*][*]
                                                                                    [*][*][*] ENTER ADD NEW PUBLICATION ITEM HERE [*][*][*]
                                                                                    [*][*][*]                                     [*][*][*]
                                                                                */}
                                                                                <div className="border-dashed border-2 border-gray rounded-md py-1 mx-auto relative bg-white-600 w-full">
                                                                                    <div className=""> {/* max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 */}
                                                                                        <div className="sm:text-center sm:px-16 flex">
                                                                                            {/* TODO: CREATE ADD PUBLICATION FUNCTIONALITY */}
                                                                                            <button
                                                                                                type="button"
                                                                                                className="flex m-auto items-center p-1 border border-transparent rounded-full shadow-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                                                                onClick={() => handleOpenModal("new pub", null, { "db_id": exper.exper_id, "list_id": idx })}
                                                                                            >
                                                                                                <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </section>
                                                    </>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setOpen}>
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

                            {/* {console.log("the field in modal is",field)} */}
                            {getModal(modalSettings, field)}

                        </Transition.Child>

                    </div>
                </Dialog>
            </Transition.Root>

        </>
    );


};
export default Experience;