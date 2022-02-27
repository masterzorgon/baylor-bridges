import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
// import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";

import axios from "axios";

const ExperienceModal = ({ modal, setModal, experience, setExperience, setUploadSuccess, setUploadFailure,loading,setLoading,experiences,setExperiences,setRefresh }) => {
    /* 
        TODO:
            - add publication submission functionality to the modal
    */
    const [publication, setPublication] = React.useState(false);
    const clearModal = () => {
        // document.getElementById("newExperienceModal").reset();
        setExperience({
            description: "",
            exper_id: "",
            publications: [],
            start_time: "",
            stop_time: "",
            title: ""
        });
        // close modal
        setModal(false);
    };
    
    const handleAddNewExperience = (event) => {
        event.preventDefault();
        
        const config = {
            method: "post",
            url: "/account/profile/experience", 
            headers: { "Content-Type": "application/json" },
            data : JSON.stringify(experience)
        };

        setLoading(true);
        console.log("loading now is ", loading);
        
        axios(config)
            .then(response => {
                console.log(JSON.stringify(response.data));
                setUploadSuccess(true);
                setTimeout(() => setUploadSuccess(false), 6000);


                clearModal();
                // FIXME: add to experiences list
                let new_expers=experiences;
                new_expers.push(experience);
                setExperiences(new_expers);

                console.log("the new experiences is ",experiences);
                
                setRefresh(true);
            })
            .catch(error => {
                console.log(error);
                setUploadFailure(true);
                setTimeout(() => setUploadFailure(false), 6000);
                clearModal();
            })
            .finally(()=>(setLoading(false)))
        ;
    };


    const handleInputChange = event => {
        event.preventDefault();
        let name    = event.target.name;
        let value   = event.target.value;

        if      (name === "title")          setExperience({ ...experience, title: value });
        else if (name === "start_time")     setExperience({ ...experience, start_time: value });
        else if (name === "stop_time")      setExperience({ ...experience, stop_time: value });
        else if (name === "description")    setExperience({ ...experience, description: value });
    };

    // eslint-disable-next-line no-unused-vars
    const handlePublication = (event) => {
        event.preventDefault();

        const title = document.getElementById("publications-title");
        const URL = document.getElementById("publications-url");

        setExperience({
            ...experience,
            publications: [...experience.publications, [title.value, URL.value]]
        });

        title.value = "";
        URL.value = "";

        console.log(experience);
    };

    const handleCancelExperience = event => {
        event.preventDefault();
        setModal(false);
        clearModal();
    };

    const handleReturn = (event) => {
        event.preventDefault();
        setPublication(false);
    };

    return (
        <Transition.Root show={modal} as={Fragment}>
            {publication
                // [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
                // [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
                //  PUBLICATION MODAL [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
                ? 
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setModal}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

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
                            {/* MODAL CONTENT */}
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <form id='newPublicationModal'>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Add Publications
                                        </Dialog.Title>

                                        <div className="sm:col-span-6">
                                            <div className="my-3 isolate -space-y-px rounded-md shadow-sm">
                                                <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                                    <input
                                                        type="text"
                                                        name="publications-title"
                                                        id="publications-title"
                                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                        placeholder="Publication title"
                                                        
                                                    />
                                                </div>
                                                <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                                                    <input
                                                        type="text"
                                                        name="publications-url"
                                                        id="publications-url"
                                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                        placeholder="Publication URL"
                                                        
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="mt-5 sm:mt-6">

                                    {/* move add publication to edit experience */}
                                    {/* <button
                                        type="button"
                                        className=" mb-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
                                        onClick={handlePublication}
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
                                            "Add This Experience"
                                        }
                                    </button> */}
                                    <Button
                                        onClick={handlePublication}
                                        loading={loading}
                                        disabled={loading}
                                    >
                                        Add This Experience
                                    </Button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
                                        onClick={handleReturn}
                                    >
                                        Return
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>

                // [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
                // [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
                //  EXPERIENCE MODAL [*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
                : 
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setModal}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* 
                            SUPPLY INPUT FOR NEW EXPERIENCE BELOW
                                - needs expereince id (no input needed for this)
                        */}

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
                            {/* MODAL CONTENT */}
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                                <form id='newExperienceModal'>
                                    <div className="bg-white py-6 px-4 sm:p-6">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            New Experience
                                        </Dialog.Title>

                                        {/* ADD INPUT FOR EXPERIENCE CRITERIA BELOW */}
                                        <div className="mt-6 grid grid-cols-4 gap-4">
                                            <div className="col-span-4 sm:col-span-2">
                                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    className=" my-3 flex-1 block w-full focus:ring-emerald-500 focus:border-emerald-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                                    placeholder="Experience Title"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            {/* DATE INPUT */}
                                            <div className="col-span-4 sm:col-span-1">
                                                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                                Start Date
                                                </label>
                                                <input
                                                    type="text"
                                                    name="start_time"
                                                    id="start_time"
                                                    autoComplete="cc-exp"
                                                    className="my-3 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                    placeholder="MM / YY"
                                                    onChange={handleInputChange}
                                                />
                                                {/* <DatePicker/> */}
                                            </div>
                                            <div className="col-span-4 sm:col-span-1">
                                                <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                                End date
                                                </label>
                                                <input
                                                    type="text"
                                                    name="stop_time"
                                                    id="stop_time"
                                                    autoComplete="cc-exp"
                                                    className="my-3 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                    placeholder="MM / YY"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-span-4 sm:col-span-4">
                                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                                   description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows={3}
                                                    className="my-3 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border border-gray-300 rounded-md max-h-20"
                                                    defaultValue={""}
                                                    placeholder="Experience Description"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="mt-5 sm:mt-6">
                                    {/* <button
                                        type="button"
                                        className=" mb-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
                                        onClick={() => setPublication(true)}
                                    >
                                        Add Publications
                                    </button> */}
                                    {/* <button
                                        type="button"
                                        className=" mb-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
                                        onClick={handleAddNewExperience}
                                    >
                                        Submit New Experience
                                    </button> */}
                                    <Button
                                        onClick={handleAddNewExperience}
                                        loading = {loading}
                                        disabled = {loading}
                                        className="mb-4"
                                    >
                                        Submit new Experience
                                    </Button>
                                    {/* <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
                                        onClick={handleReturn}
                                    >
                                        Return
                                    </button> */}
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-slate-200 shadow-sm px-4 py-2 bg-white text-base font-medium text-emerald-600 hover:bg-slate-200 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
                                        onClick={handleCancelExperience}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            }
        </Transition.Root>
    );
};

export default ExperienceModal;