import React, { useEffect, useState, Fragment, useRef } from "react";
import axios from "axios";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { PencilIcon, DotsVerticalIcon, PlusSmIcon as PlusSmIconSolid, TrashIcon, ExclamationIcon, LinkIcon } from "@heroicons/react/outline";

import Photo from "../../components/Photo";
import Container from "./Container";
import ErrorMessage from "./ErrorMessage";
import UploadSuccess from "./UploadSuccess";
import UploadFailure from "./UploadFailure";
import DeletePublicationAlert from "./DeletePublicationAlert";
import Button from "../../components/Button";

const Experience = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [experiences, setExperiences] = useState(null);
    const [open, setOpen] = useState(false);
    const [field, setField] = useState(null);

    // modalSetttings will start the modal type(edit/remove) and exper_idx
    const [modalSettings, setModalSettings] = useState({});
    const cancelButtonRef = useRef(null);

    // eslint-disable-next-line no-unused-vars
    const [refresh, setRefresh] = useState(false);

    // STATE FOR ADDING A NEW EXPERIENCE [*][*][*][*]
    // eslint-disable-next-line no-unused-vars
    const [modal, setModal] = useState(false);

    // 
    //  [*][*][*][*][*][*][*][*][*][*][*]
    //  [*][*][*][*][*][*][*][*][*][*][*]
    // 
    //  BUG MUST FIX:
    //      - suspected that alerts break code
    //          - unable to scroll after submit experience
    //          - possibly affects date input functionality
    // 
    //  [*][*][*][*][*][*][*][*][*][*][*]
    //  [*][*][*][*][*][*][*][*][*][*][*]
    // 

    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadFailure, setUploadFailure] = useState(false);

    // STATE FOR PUBLICATION [*][*][*][*]
    const [publicationDelete, setPublicationDelete] = useState(false);

    const [validSubmit, setValidSubmit] = useState(false);

    useEffect(() => {
        console.log("calling use effect");
        console.log("getting experiences");

        axios.get("/account/profile/experience")
            .then(res => {
                console.log(res.data);
                setExperiences(res.data);
            });

    }, []);

    useEffect(() => {

        if (!field) return;
        console.log("calling second useEffect");


        if (field["title"] !== "") {

            // if the form is for submiting publication
            if (modalSettings["modalType"] == "new pub" || modalSettings["modalType"] == "edit pub") {
                if (field["duo_link"] === "") {
                    setValidSubmit(false);
                } else {
                    setValidSubmit(true);
                }
            } else {
                // if the form is for submitting experience
                if (field.start_time && field["start_time"].includes("/")) {
                    let startTime = field["start_time"].split("/");
                    
                    let startDate = Date.parse(startTime[1] + "-" + startTime[0]);
                    
                    let currentDate = new Date().getTime();

                    if (startTime[1].length >= 3 && startDate && startDate < currentDate) {
                        // the experience must start in the past

                        // FIXME: Blocks are nested too deeply, commented out for now. @TinaXiayanLi -Cloudy
                        // if (field.stop_time && field["stop_time"] !== "") {
                        //     let endTime = field["stop_time"].split("/");
                        //     let endDate = Date.parse(endTime[1] + "-" + endTime[0]);
                        //     // if user input the end date
                        //     if (field["stop_time"].includes("/") && endTime[1].length >= 3 && endDate && endDate >= startDate) {
                        //         setValidSubmit(true);
                        //     } else { setValidSubmit(false); }

                        // }
                        // else { setValidSubmit(true); }
                        setValidSubmit(true);
                    } else { setValidSubmit(false); }



                } else { setValidSubmit(false); }


            }
        } else {
            setValidSubmit(false);
        }

    }, [field]);

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


            if ( value==="start_time" && (/^\d{0,2}$/.test(e.target.value) || /^\d{2}\/\d{0,4}$/.test(e.target.value))) {
                setField({ ...field, [value]: e.target.value });
            }
            else if (value==="stop_time" && (/^\d{0,2}$/.test(e.target.value) || /^\d{2}\/\d{0,4}$/.test(e.target.value))) {
                setField({ ...field, [value]: e.target.value });
            } else if (value!=="start_time" && value!=="stop_time"){
                setField({ ...field, [value]: e.target.value });

            }

        };

        // eslint-disable-next-line no-unused-vars
        const handleExperRemove = () =>
        {
            setLoading(true);
            console.log("exper id is " + field["exper_id"] + ", the idx is " + modalSettings["idx"]);

            // eslint-disable-next-line no-unused-vars
            let url = "/account/profile/experience/" + field["exper_id"];

            axios.delete(url)
                .then(res =>
                {
                    console.log("delete the experience successfully");
                    let new_exper = experiences;
                    new_exper.splice(modalSettings["idx"], 1);
                    console.log(new_exper);
                    setOpen(false);
                    setExperiences(res.data);
                    setErrorMessage(null);
                })
                .catch(err => err.message !== "time out"
                    ? setErrorMessage(err.response.data.message)
                    : setErrorMessage("server time out"))
                .finally(() => setLoading(false));
        };

        const handlePubRemove = () =>
        {
            setLoading(true);

            console.log("PUB ID", field[0].pub_id);
            console.log("EXP ID", field[1].exper_id);

            let url = `/account/profile/experience/${field[1].exper_id}/publication/${field[0].pub_id}`;

            axios.delete(url)
                .then(res =>
                {
                    let new_exper = experiences;
                    new_exper[modalSettings["idx"]]["publications"] = res.data;
                    console.log(new_exper);
                    setOpen(false);
                    setErrorMessage(null);
                })
                .catch(err => err.message !== "time out"
                    ? setErrorMessage(err.response.data.message)
                    : setErrorMessage("server time out"))
                
                .finally(() => setLoading(false));
        };


        const handleExperSubmit = (field) =>
        {
            setLoading(true);

            if (modalSettings["modalType"] === "edit") {
                let url = "/account/profile/experience/" + field["exper_id"];
                console.log(url);
                axios.put(url, field)
                    .then(res =>
                    {
                        console.log("update the experience successfully");
                        setExperiences(res.data);
                        setErrorMessage(null);
                        setOpen(false);
                    })
                    .catch(err => err.message !== "time out"
                        ? setErrorMessage(err.response.data.message)
                        : setErrorMessage("server time out"))

                    .finally(() => setLoading(false));

            }
            else if (modalSettings["modalType"] === "create")
            {
                let url = "/account/profile/experience";

                axios.post(url, field)
                    .then(res =>
                    {
                        console.log("update the experience successfully");
                        setExperiences(res.data);
                        setErrorMessage(null);
                        setOpen(false);
                    })
                    .catch(err => err.message !== "time out"
                        ? setErrorMessage(err.response.data.message)
                        : setErrorMessage("server time out"))

                    .finally(() => setLoading(false));
            }
        };

        const handlePubSubmit = (field) =>
        {
            console.log("calling handel pub submit");
            console.log(modalSettings);

            setLoading(true);
            if (modalSettings["modalType"] === "new pub")
            {
                let url = "/account/profile/experience/" + modalSettings["idx"]["db_id"] + "/publication";

                axios.post(url, field)
                    .then(res =>
                    {
                        console.log("post successfully");
                        console.log(res.data);
                        let new_exper = experiences;
                        new_exper[modalSettings["idx"]["list_id"]]["publications"] = res.data;
                        console.log(new_exper);
                        setErrorMessage(null);
                        setOpen(false);

                    })
                    .catch(err => err.message !== "time out"
                        ? setErrorMessage(err.response.data.message)
                        : setErrorMessage("server time out"))
                    
                    .finally(() => setLoading(false));
            }
            else if (modalSettings["modalType"] === "edit pub")
            {
                let url = "/account/profile/experience/" + modalSettings["idx"]["exper_db_id"] + "/publication/" + field.pub_id;

                axios.put(url, field)
                    .then(res => {
                        console.log("post successfully");
                        console.log(res.data);
                        let new_exper = experiences;
                        new_exper[modalSettings["idx"]["exper_list_id"]]["publications"] = res.data;
                        console.log(new_exper);
                        setOpen(false);
                    })
                    .finally(() => setLoading(false));
            }
        };

        if (!field) return;

        if (modalSettings["modalType"] === "edit" || modalSettings["modalType"] === "create")
        {
            return (
                // 
                //  [*][*][*][*]                       [*][*][*][*]
                //  [*][*][*][*] EDIT EXPERIENCE MODAL [*][*][*][*]
                //  [*][*][*][*]                       [*][*][*][*]
                // 
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                    {errorMessage && <ErrorMessage errorMessage={errorMessage}></ErrorMessage>}
                    <section aria-labelledby="payment-details-heading">
                        <div>
                            <div className="sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-4 px-4 sm:p-4">
                                    <div>
                                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                                            {modalSettings["modalType"] === "edit" ? "Edit Experience" : "Add Experience"}
                                        </h2>
                                    </div>

                                    <div className="mt-6 grid grid-cols-4 gap-6">
                                        <div className="col-span-4 sm:col-span-2">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Title*
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
                                                Start Date*
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
                                                End Date
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

                            <div className="px-4 py-6 sm:p-4">
                                <Button
                                    loading={loading}
                                    disabled={!validSubmit || loading}
                                    onClick={() => handleExperSubmit(field)}
                                >
                                    {
                                        modalSettings["modalType"] === "edit" &&
                                        "Update"
                                    }
                                    {
                                        modalSettings["modalType"] === "create" &&
                                        "Create"
                                    }
                                </Button>
                            </div>
                        </div>
                    </section>

                </div>
            );
        }
        else if (modalSettings["modalType"] === "remove")
        {
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
                                    Delete experience
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete the experience &quot;{field.title}&quot;?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Button
                            className="ml-3 w-auto bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            loading={loading}
                            disabled={loading}
                            onClick={() => handleExperRemove(field.exper_id)}
                        >
                            Remove
                        </Button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            );
        }
        else if (modalSettings["modalType"] === "remove pub")
        {
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
                                    Delete publication
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete &quot;{field[0].title}&quot;?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Button
                            className="ml-3 w-auto bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            loading={loading}
                            disabled={loading}
                            onClick={() => handlePubRemove(field[0].pub_id, field[1].exper_id)} // IMPLEMENT REMOVE PUBLICATION FUNCTION
                        >
                            Remove
                        </Button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            );
        }
        else if (modalSettings["modalType"] === "new pub" || modalSettings["modalType"] === "edit pub")
        {
            console.log("geting modal new pub");
            return (
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                    <section aria-labelledby="payment-details-heading">
                        <div>
                            <div className="sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-3 px-3 sm:p-3">
                                    <div>
                                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                                            {
                                                modalSettings["modalType"] === "new pub"
                                                    ? "Add Publication"
                                                    : "Edit Publication"
                                            }
                                        </h2>
                                    </div>

                                    <div className="mt-2 grid grid-cols-8 gap-3">

                                        <div className="col-span-8 sm:col-span-3">
                                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                                Title*
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
                                                DUO Link*
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

                            <div className="py-2 px-3 sm:p-3">
                                <Button
                                    loading={loading}
                                    disabled={!validSubmit || loading}
                                    onClick={() => handlePubSubmit(field)}
                                >
                                    {
                                        modalSettings["modalType"] === "edit pub" &&
                                        "Update"
                                    }
                                    {
                                        modalSettings["modalType"] === "new pub" &&
                                        "Create"
                                    }
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    };

    const handleOpenModal = (modalType, exper, exper_idx) =>
    {
        setModalSettings({ "modalType": modalType, "idx": exper_idx });
        console.log(modalSettings);
        if (modalType === "new pub")
        {
            setField({ "title": "", "duo_link": "" });
            setValidSubmit(false);
        }
        else if (modalType === "create")
        {
            setField({
                description: "",
                start_time: "",
                stop_time: "",
                title: ""
            });
            setValidSubmit(false);
        }

        else
        {
            console.log("the idx pass into handleOpenModal is " + exper_idx);
            setField(exper);
            setValidSubmit(true);
        }
        console.log(exper);
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
                {/* ALERTS THAT DISPLAY UPON CREATING A NEW EXPERIENCE */}

                {uploadSuccess ? <UploadSuccess uploadSuccess={uploadSuccess} setUploadSuccess={setUploadSuccess} /> : null}
                {uploadFailure ? <UploadFailure uploadFailure={uploadFailure} setUploadFailure={setUploadFailure} /> : null}

                {/* NEW EXPERIENCE BANNER */}
                <div className="mt-10 divide-y divide-gray-200">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="space-y-1">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Experience</h3>
                            <p className="max-w-2xl text-sm text-gray-500">Manage all your past experiences and publications.</p>
                        </div>
                        <div className="flex justify-center order-3 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <button
                                onClick={() => handleOpenModal("create", null, null)}
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
                            {experiences && experiences.map((exper, idx) => (
                                <>
                                    <section key={exper.exper_id} className="py-6">
                                        <div className="flex space-x-3">
                                            <div className="flex-shrink-0">
                                                <Photo size="10" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h1 className="text-md font-medium text-gray-800 -mt-0.5">
                                                    {exper.title}
                                                </h1>
                                                <h2 className="text-sm text-gray-500">
                                                    {exper.start_time} - {exper.stop_time}
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
                                                                <Menu.Item>
                                                                    <button
                                                                        className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex px-4 py-2 text-sm w-full"
                                                                        onClick={() => handleOpenModal("edit", exper, idx)}
                                                                    >
                                                                        <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        <span>Edit</span>
                                                                    </button>
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    <button
                                                                        className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex px-4 py-2 text-sm w-full"
                                                                        onClick={() => handleOpenModal("remove", exper, idx)}
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
                                                {exper.description}
                                            </p>
                                        </div>

                                        {/* 
                                                [*][*][*]                         [*][*][*]
                                                [*][*][*] PUBLICATIONS LIST BELOW [*][*][*] 
                                                [*][*][*]                         [*][*][*]
                                            */}

                                        {publicationDelete ? <DeletePublicationAlert publicationDelete={publicationDelete} setPublicationDelete={setPublicationDelete} /> : null}

                                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                            {
                                                exper.publications.map((publication, index) => (

                                                    <li className="px-3 py-1 flex items-center justify-between text-sm" key={publication.pub_id}>
                                                        <div className="w-0 flex-1 flex items-center">
                                                            <LinkIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                            <span className="ml-2 flex-1 w-0 truncate text-gray-700">
                                                                <a href={/^http:\/\//.test(publication.duo_link) || /^https:\/\//.test(publication.duo_link) ? publication.duo_link : "//" + publication.duo_link}
                                                                    className="font-medium text-emerald-600 hover:text-emerald-500" target="_blank" rel="noreferrer">
                                                                    {publication.title}
                                                                </a>
                                                            </span>
                                                        </div>
                                                        <div className="ml-4 flex-shrink-0 flex justify-between gap-0 -mr-1">
                                                            {/* 
                                                                    [*][*][*][*]                             [*][*][*][*]
                                                                    [*][*][*][*] ENTER EDIT AND DELETE ICONS [*][*][*][*]
                                                                    [*][*][*][*]                             [*][*][*][*]
                                                                */}

                                                            <button
                                                                type="button"
                                                                className="rounded-full p-2 hover:bg-gray-100"
                                                                onClick={() => handleOpenModal("edit pub", publication, { "pub_list_id": index, "exper_list_id": idx, "exper_db_id": exper.exper_id })}
                                                            >
                                                                <PencilIcon className="h-5 w-5 text-gray-400" />
                                                            </button>

                                                            <button
                                                                className="rounded-full p-2 hover:bg-gray-100"
                                                                onClick={() => handleOpenModal("remove pub", [publication, exper], idx)}
                                                            >
                                                                <TrashIcon className="h-5 w-5 text-gray-400" />
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                            <li className="flex items-center overflow-hidden">
                                                {/* 
                                                        [*][*][*]                                     [*][*][*]
                                                        [*][*][*] ENTER ADD NEW PUBLICATION ITEM HERE [*][*][*]
                                                        [*][*][*]                                     [*][*][*]
                                                    */}
                                                <button
                                                    type="button"
                                                    className="relative block w-full border-gray-300 border-dashed py-2.5 text-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-600"
                                                    onClick={() => handleOpenModal("new pub", null, { "db_id": exper.exper_id, "list_id": idx })}>
                                                    <PlusSmIconSolid className="mx-auto h-5 w-5 text-gray-400" />
                                                </button>
                                            </li>
                                        </ul>
                                    </section>
                                </>
                            ))}
                        </dl>
                    </div>
                </div>
            </Container>

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