// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTimeoutFn } from "react-use";

import NameInput from "./input-components/NameInput";
import ContactInput from "./input-components/ContactInput";

const InfoInput = () => {

    const [show, setShow] = useState(false); // used to fade modals out
    const [, , showTheModal] = useTimeoutFn(() => setShow(true), 300); // used to fade modals in
    const [modal, setModal] = useState(1); // used to switch between modals

    // this makes the modal fade in/out of the page on refresh
    useEffect(() => {
        showTheModal();
        console.log("MODAL", modal);

    }, [modal]);

    const modals = () => {
        if (modal === 1) { return <NameInput show={show} modal={modal} setShow={setShow} setModal={setModal} />; }
        if (modal === 2) { return <ContactInput show={show} modal={modal} setShow={setShow} setModal={setModal} />; }
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
                {modals()}
            </div>
        </>
    );
};

export default InfoInput;















// const onSubmit = event => {

//     // axios.get("/account/profile") // account
//     //     .then(res => {
//     //         console.log("---RESPONSE---", res.data);
            
//     //     })
//     //     .catch(err => console.log("---ERROR---", err));
    
//     // CODE FOR UPDATING USER PROFILE
//     // axios.put("/account/profile", account)
//     //     .then(res => {
//     //         console.log(res);
//     //         console.log(account);
//     //     })
//     //     .catch(err => {
//     //         console.log(err);
//     //     });
    
//     // window.location.href = "/sign-in/setup/all-done";
// };  