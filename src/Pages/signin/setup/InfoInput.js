// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTimeoutFn } from "react-use";

import NameInput from "./input-components/NameInput";
import ContactInput from "./input-components/ContactInput";
import LocationInput from "./input-components/LocationInput";
import GradInput from "./input-components/GradInput";
import HeadlineInput from "./input-components/HeadlineInput";
import AllDone from "./AllDone";

const InfoInput = () => {

    const [show, setShow] = useState(false); // used to fade modals out
    const [, , showTheModal] = useTimeoutFn(() => setShow(true), 400); // used to fade modals in
    const [modal, setModal] = useState(1); // used to switch between modals
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
            phone: "",
        }
    }); // updates account info

    // this makes the modal fade in on refresh
    useEffect(() => {
        showTheModal();
        console.log("MODAL", modal);
    }, [modal]);
    useEffect(() => console.log("ACCOUNT", account), [account]);
    useEffect(() => showTheModal(), []);

    const modals = () => {
        if (modal === 1) { return <NameInput        account={account} setAccount={setAccount} show={show} modal={modal} setShow={setShow} setModal={setModal} />; }
        if (modal === 2) { return <ContactInput     account={account} setAccount={setAccount} show={show} modal={modal} setShow={setShow} setModal={setModal} />; }
        if (modal === 3) { return <LocationInput    account={account} setAccount={setAccount} show={show} modal={modal} setShow={setShow} setModal={setModal} />; }
        if (modal === 4) { return <GradInput        account={account} setAccount={setAccount} show={show} modal={modal} setShow={setShow} setModal={setModal} />; }
        if (modal === 5) { return <HeadlineInput    account={account} setAccount={setAccount} show={show} modal={modal} setShow={setShow} setModal={setModal} />; }
        if (modal === 6) { return <AllDone          account={account} setAccount={setAccount} show={show} modal={modal} setShow={setShow} setModal={setModal} />; }
    };

    return (
        <>
            <div className="bg-white">
                {/* Header */}
                <div className="relative pb-32 bg-gray-800">
                    <div className="absolute inset-0">
                        <img
                            className="w-full h-full object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Old_Main%2C_Baylor_University.jpg"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" aria-hidden="true" />
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