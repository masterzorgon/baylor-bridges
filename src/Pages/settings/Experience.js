import React, { useEffect, useState,Fragment } from "react";
import SettingsNavbar from "../../components/SettingsNavbar";
// eslint-disable-next-line no-unused-vars
import DatePicker from "tailwind-react-datepicker";
import { Menu, Transition } from "@headlessui/react";
import { PencilIcon, DotsVerticalIcon, DocumentRemoveIcon } from "@heroicons/react/solid";

import axios from "axios";
const Experience=()=>{
    const [experiences,setExperiences]=useState([]);
    const [update,setUpdate]=useState(false);

    useEffect(()=>{
        
        console.log("calling use effect");

        if (experiences.length===0){
            axios.get("/account/profile/experience")
                .then(res=>{
                    console.log(res.data);
                    setExperiences(res.data);
                
                });
        }else{
            console.log("not calling axios");

        }
        setUpdate(false);
    },[update]);

    // eslint-disable-next-line no-unused-vars
    const handleChange =(index,field,value)=>{
        let new_exper=experiences;
        new_exper[index][field]=value;
        console.log("updating experience is ",new_exper[index]);
        setExperiences(new_exper);
        setUpdate(true);

    };


    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
      
    return(
        <>
            <div>
                {/* Content area */}
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
                                            <div className="space-y-10 sm:px-6 lg:px-0 lg:col-span-9">
                                                { experiences.map((exper,idx)=> (

                                                    <>
                                                        <section aria-labelledby="payment-details-heading" key={exper.exper_id}>
                                                            <form action="#" method="POST">
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
                                                                                                                href="#"
                                                                                                                className={classNames(
                                                                                                                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                                                                                    "flex px-4 py-2 text-sm"
                                                                                                                )}
                                                                                                            >
                                                                                                                <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                                                <span>Edit</span>
                                                                                                            </a>
                                                                                                        )}
                                                                                                    </Menu.Item>
                                                                                                    <Menu.Item>
                                                                                                        {({ active }) => (
                                                                                                            <a
                                                                                                                href="#"
                                                                                                                className={classNames(
                                                                                                                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                                                                                    "flex px-4 py-2 text-sm"
                                                                                                                )}
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

                                                                </div>
                                                            </form>
                                                        </section></>
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
        </>    
    );


};
export default Experience;