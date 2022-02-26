import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";

import axios from "axios";



const ExperienceModal = ({ modal, setModal, experience, setExperience, setUploadSuccess, setUploadFailure }) => {
    /* 
        TODO:
            - add publication submission functionality to the modal
            - figure out why you are getting a 401 err upon submission
    */
    const [publication, setPublication] = React.useState(false);
    
    const clearModal = () => {
        document.getElementById("newExperienceModal").reset();
        setExperience({
            description: "",
            exper_id: "",
            publications: [],
            start_time: "",
            stop_time: "",
            title: ""
        });
    };
    
    const handleAddNewExperience = (event) => {
        event.preventDefault();

        clearModal();
        
        const config = {
            method: "post",
            url: "/account/profile/experience", 
            headers: { "Content-Type": "application/json" },
            data : JSON.stringify(experience)
        };

        axios(config)
            .then(response => {
                console.log(JSON.stringify(response.data));
                setUploadSuccess(true);
                setTimeout(() => setUploadSuccess(false), 6000);

            })
            .catch(error => {
                console.log(error);
                setUploadFailure(true);
                setTimeout(() => setUploadFailure(false), 6000);
            });
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
                                    <button
                                        type="button"
                                        className=" mb-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
                                        onClick={handlePublication}
                                    >
                                        Add New Publication
                                    </button>
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <form id='newExperienceModal'>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            New Experience
                                        </Dialog.Title>

                                        {/* ADD INPUT FOR EXPERIENCE CRITERIA BELOW */}
                                        <div className="sm:col-span-6">
                                            <div className="sm:mt-0 sm:col-span-2">
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
                                                <input
                                                    type="text"
                                                    name="start_time"
                                                    id="start_time"
                                                    autoComplete="cc-exp"
                                                    className="my-3 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                    placeholder="Start Date: MM / YY"
                                                    onChange={handleInputChange}
                                                />
                                                {/* <DatePicker/> */}
                                            </div>
                                            <div className="col-span-4 sm:col-span-1">
                                                <input
                                                    type="text"
                                                    name="stop_time"
                                                    id="stop_time"
                                                    autoComplete="cc-exp"
                                                    className="my-3 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                    placeholder="End Date: MM / YY"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
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
                                </form>

                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className=" mb-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
                                        onClick={() => setPublication(true)}
                                    >
                                        Add Publications
                                    </button>
                                    <button
                                        type="button"
                                        className=" mb-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
                                        onClick={handleAddNewExperience}
                                    >
                                        Submit New Experience
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 sm:text-sm"
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
