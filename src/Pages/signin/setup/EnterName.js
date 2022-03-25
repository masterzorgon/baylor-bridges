// import axios from "axios";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";

import ContactInput from "./input-components/ContactInput";

const EnterName = () => {

    const [show, setShow] = useState(true);
    let [, , resetIsShowing] = useTimeoutFn(() => setShow(true), 500);

    const onSubmit = event => {
        setShow(show => !show);
        resetIsShowing();


        // axios.get("/account/profile") // account
        //     .then(res => {
        //         console.log("---RESPONSE---", res.data);
                
        //     })
        //     .catch(err => console.log("---ERROR---", err));
        
        // CODE FOR UPDATING USER PROFILE
        // axios.put("/account/profile", account)
        //     .then(res => {
        //         console.log(res);
        //         console.log(account);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
        
        // window.location.href = "/sign-in/setup/all-done";
    };  

    return (
        <>
            <div className="bg-gray-100">
                {/* Header */}
                <div className="relative pb-32 bg-gray-800">
                    <div className="absolute inset-0">
                        <img
                            className="w-full h-full object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Old_Main%2C_Baylor_University.jpg"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" aria-hidden="true" />
                    </div>
                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                            Enter your profile information
                        </h1>
                        <p className="mt-6 max-w-3xl text-xl text-gray-300">
                            The information you provide here should be authentic and verifiable.
                            What you provide will be the information that others will identify you with via your
                            Baylor Bridges account.
                        </p>
                    </div>
                </div>

                {/* Overlapping cards */}
                <Transition
                    show={show}
                    enter="transform transition duration-[500ms]"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transform duration-500 transition ease-in-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ContactInput onSubmit={onSubmit} />
                </Transition>
            </div>
        </>
    );
};

export default EnterName;