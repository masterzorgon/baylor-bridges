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

    const modals = () => {
        if (modal === 1) { return <NameInput        account={account} setAccount={setAccount} show={show}  setShow={setShow} modal={modal} setModal={setModal} />; }
        if (modal === 2) { return <ContactInput     account={account} setAccount={setAccount} show={show}  setShow={setShow} modal={modal} setModal={setModal} />; }
        if (modal === 3) { return <LocationInput    account={account} setAccount={setAccount} show={show}  setShow={setShow} modal={modal} setModal={setModal} />; }
        if (modal === 4) { return <GradInput        account={account} setAccount={setAccount} show={show}  setShow={setShow} modal={modal} setModal={setModal} />; }
        if (modal === 5) { return <HeadlineInput    account={account} setAccount={setAccount} show={show}  setShow={setShow} modal={modal} setModal={setModal} />; }
        if (modal === 6) { return <AllDone          account={account} setAccount={setAccount} show={show}  setShow={setShow} modal={modal} setModal={setModal} />; }
    };

    return (
        <>
            <div className="flex-col justify-center sm:overflow-hidden">
                {/* Header */}
                <div className="flex-col mb-5 pb-32">
                    <div className="absolute inset-0">
                        <img
                            className="w-full flex-col-reverse h-80 object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Old_Main%2C_Baylor_University.jpg"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gray-200 mix-blend-multiply" aria-hidden="true" />
                        <div className="relative sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full pointer-events-none -z-10" aria-hidden="true">
                            <div className="relative h-full w-full mx-auto overflow-hidden">
                                <svg
                                    className="flex right-full transform -translate-y-1/4 -translate-x-3/4"
                                    width={404}
                                    height={784}
                                    fill="none"
                                    viewBox="0 0 404 784"
                                >
                                    <defs>
                                        <pattern
                                            id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                                            x={0}
                                            y={0}
                                            width={20}
                                            height={20}
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                                        </pattern>
                                    </defs>
                                    <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
                                </svg>
                                <svg
                                    className="relative left-full transform -translate-y-1/2 -translate-x-1/4"
                                    width={404}
                                    height={784}
                                    fill="none"
                                    viewBox="0 0 404 784"
                                >
                                    <defs>
                                        <pattern
                                            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                                            x={0}
                                            y={0}
                                            width={20}
                                            height={20}
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                                        </pattern>
                                    </defs>
                                    <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 py-10 sm:px-8 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                            Enter your profile information
                        </h1>
                        <p className="mt-6 max-w-3xl text-xl text-white">
                            The information you provide here should be authentic and verifiable.
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