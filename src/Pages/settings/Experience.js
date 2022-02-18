import React, { useEffect, useState } from "react";
import SettingsNavbar from "../../components/SettingsNavbar";
// eslint-disable-next-line no-unused-vars
import DatePicker from "tailwind-react-datepicker";
import axios from "axios";
const Experience=()=>{
    const [experiences,setExperiences]=useState([]);
    useEffect(()=>{

        if (experiences.length==0){
            axios.get("/account/profile/experience")
                .then(res=>{
                    console.log(res.data);
                    setExperiences(res.data);
                
                });
        }else{
            console.log("not calling axios");

        }
    },[experiences]);

    // eslint-disable-next-line no-unused-vars
    const handleChange =(index,field,value)=>{
        let new_exper=experiences;
        new_exper[index][field]=value;
        console.log("updating experience is ",new_exper[index]);
        setExperiences(new_exper);

    };


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

                                                
                                                    <section aria-labelledby="payment-details-heading" key={exper.exper_id}>
                                                        <form action="#" method="POST">
                                                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                                                <div className="bg-white py-6 px-4 sm:p-6">
                                                                    <div>
                                                                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                          Experience
                                                                        </h2>
                                                                        <p className="mt-1 text-sm text-gray-500">
                          Update your current experience. Notice that it may take up to 5 mins to update on search functionality
                                                                        </p>
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
                                                                                value={exper.title}
                                                                                onChange={(e)=> handleChange(idx,"title",e.target.value)}
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


                                                                    </div>
                                                                </div>
                                                                <div className="bg-white py-6 px-4 sm:p-6">
                                                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                                                description
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <textarea
                                                                            rows={4}
                                                                            name="comment"
                                                                            id="comment"
                                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                            defaultValue={""}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                                    <button
                                                                        type="submit"
                                                                        className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                                                    >
                                                                    Save
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </section>
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