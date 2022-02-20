import React, { useEffect, useState,Fragment } from "react";
import SettingsNavbar from "../../components/SettingsNavbar";
// eslint-disable-next-line no-unused-vars
import DatePicker from "tailwind-react-datepicker";
import { Menu, Transition,Dialog } from "@headlessui/react";
import { PencilIcon, DotsVerticalIcon, DocumentRemoveIcon } from "@heroicons/react/solid";


import axios from "axios";
const Experience=()=>{
    const [experiences,setExperiences]=useState([]);
    const [update,setUpdate]=useState(false);
    const [open,setOpen]=useState(false);
    const [field,setField]=useState(null);
    // eslint-disable-next-line no-unused-vars
    const [refresh,setRefresh]=useState(false);

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
            setRefresh(false);

        }
        setUpdate(false);
    },[update,refresh]);

    // eslint-disable-next-line no-unused-vars
    // const handleChange =(index,field,value)=>{
    //     let new_exper=experiences;
    //     new_exper[index][field]=value;
    //     console.log("updating experience is ",new_exper[index]);
    //     setExperiences(new_exper);
    //     setUpdate(true);

    // };

    // eslint-disable-next-line no-unused-vars
    const getModal =(request,field) =>{
        const handleChange = (e,value)=>{
            let new_field=field;
            new_field[value]=e.target.value;
            console.log(new_field);
            setField(new_field);
            setRefresh(true);

            
        };
        console.log("in get modal the field is ",field);

        if(!field){
            return;
        }

        if (request==="edit"){
            return(
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                    <section aria-labelledby="payment-details-heading">
                        <form action="#" method="POST">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
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
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                value={field.title}
                                                onChange={(e)=>{
                                                    handleChange(e,"title");
                                                }}

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
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                placeholder="MM / YY"
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
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                placeholder="MM / YY"
                                            />
                                        </div>

                                        <div className="col-span-4 sm:col-span-4">
                                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                                                description
                                            </label>
                                                        
                                            <textarea
                                                rows={4}
                                                name="comment"
                                                id="comment"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 block w-full sm:text-sm border-gray-300 rounded-md"
                                                defaultValue={""}
                                                value={field.description}
                                                onChange={(e)=>{
                                                    handleChange(e,"description");
                                                }}
                                            />
                                                        
                                        </div>
                                                    
                                    </div>
                                </div>
                                            
                            </div>
                        </form>
                    </section>
                    <div className="mt-5 sm:mt-6">
                        <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                            onClick={() => setOpen(false)}
                        >
                                        update this experience
                        </button>
                    </div>
                </div>
            );
        }else if(request==="remove"){
            console.log("you click remove");
        }

    };

    const handleOpenModal =(exper)=>{
        setField(exper);
        console.log(exper);
        setOpen(true);
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
                                                                                                                
                                                                                                                className={classNames(
                                                                                                                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                                                                                    "flex px-4 py-2 text-sm"
                                                                                                                )}
                                                                                                                onClick={()=> handleOpenModal(exper)}
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
                            {getModal("edit",field)}

                        </Transition.Child>
                        
                    </div>
                </Dialog>
            </Transition.Root>
        </>    
    );


};
export default Experience;