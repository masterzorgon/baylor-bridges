import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "../../../components/Button";

const EnterInfo = () => {

    const [loading, setLoading] = useState(false); // Whether the axios is requesting
    const [account, setAccount] = useState({
        biography: "",
        city: "",
        first_name: "",
        graduate_year: "",
        graduate_semester: "",
        headline: "",
        last_name: "",
        state: "",
        contact_info: {
            email: "",
            email_visibility: false,
            phone: "",
            phone_visibility: false,
        }
    }); // updates account info

    useEffect(() => {
        console.log(account);
    }, [account]);

    const onSubmit = (event) => {
        setLoading(true);

        // IMPLEMENT AXIOS PUT REQUEST FOR NAME INPUT        
        // axios.get("/account/profile") // account
        //     .then(res => {
        //         console.log(res.data);
        //         // setAccount(res.data);
        //     })
        //     .catch(err => console.log(err))
        //     .finally(() => setLoading(false));
        
        axios.get("/account/profile", account)
            .then(res => {
                console.log(res);
                console.log(account);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="relative bg-white">
            <div className="lg:absolute lg:inset-0">
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        
                        className="h-56 w-full object-cover lg:absolute lg:h-full"
                        // panorama
                        src="https://static.wixstatic.com/media/deb6cf_bfb248d824ccae8bde09b64f3a6e202f.jpg/v1/fill/w_1110,h_870,al_c,q_85,usm_0.66_1.00_0.01/deb6cf_bfb248d824ccae8bde09b64f3a6e202f.webp"
                        alt=""
                    /> 
                </div>
            </div>
            <div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-32 lg:grid lg:grid-cols-2">
                <div className="lg:pr-8">
                    <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Provide your profile information
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                            Please make sure the information you provide is valid and verifiable
                            so that those who contact you through your Baylor Bridges
                            profile may reach you appropriately.
                        </p>
                        <form action="#" method="POST" className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    First name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        placeholder="John"
                                        onChange={event => setAccount({...account, first_name: event.target.value})}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    Last name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        placeholder="Doe"
                                        onChange={event => setAccount({...account, last_name: event.target.value})}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Graduate Class Semester
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        placeholder="Spring"
                                        onChange={event => setAccount({...account, graduate_semester: event.target.value})}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    Graduate Class Year
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        placeholder="2001"
                                        onChange={event => setAccount({...account, graduate_year: event.target.value})}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Headline
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Orthopedic surgeon"
                                        onChange={event => setAccount({...account, headline: event.target.value})}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                    State
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="Texas"
                                        onChange={event => setAccount({...account, state: event.target.value})}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        onChange={event => setAccount({ ...account, contact_info: {...account.contact_info, email: event.target.value}})}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="flex justify-between">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <span id="phone-description" className="text-sm text-gray-500">
                                        Optional
                                    </span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        aria-describedby="phone-description"
                                        placeholder="+1 (234) 567-8910"
                                        onChange={event => setAccount({...account, contact_info: {...account.contact_info, phone: event.target.value}})}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="flex justify-between">
                                    <label htmlFor="how-can-we-help" className="block text-sm font-medium text-gray-700">
                                        Biography
                                    </label>
                                    <span id="how-can-we-help-description" className="text-sm text-gray-500">
                                    </span>
                                </div>
                                <div className="mt-1">
                                    <textarea
                                        id="how-can-we-help"
                                        name="how-can-we-help"
                                        aria-describedby="how-can-we-help-description"
                                        placeholder="A brief summary of who you are and what you do"
                                        onChange={event => setAccount({...account, biography: event.target.value})}
                                        rows={4}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border border-gray-300 rounded-md"
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <Button
                                    loading={loading}
                                    disabled={loading}
                                    onClick={onSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
    
export default EnterInfo;