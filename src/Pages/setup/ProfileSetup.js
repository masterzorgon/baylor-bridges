// import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useTransition } from "react-spring";
import { useTimeoutFn } from "react-use";
import axios from "axios";

import NameInput from "./input-components/01-NameInput";
import ContactInput from "./input-components/02-ContactInput";
import LocationInput from "./input-components/03-LocationInput";
import GradInput from "./input-components/04-GradInput";
import HeadlineInput from "./input-components/05-HeadlineInput";
import AllDone from "./input-components/06-AllDone";

const InfoInput = () => {

    const [show, setShow] = useState(false); // used to fade modals out
    const [, , showTheModal] = useTimeoutFn(() => setShow(true), 400); // used to fade modals in
    const [modal, setModal] = useState(1); // used to switch between modals
    const [account, setAccount] = useState({}); // updates account info
    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 50); // used to fade modal out

    const x_fields = "user_id, first_name, last_name, headline, role, occupation, graduate_year, graduate_semester, city, state, biography, contact_info";

    useEffect(() => {
        // get current authenticated account
        axios.get("/accounts/me", { headers: { "x-fields": x_fields } })
            .then(res => {
                setAccount(res.data);
                console.log(res.data);
            })
            .catch(err => {
                err.response.status && err.response.status === 401
                    ? window.location.href = "/sign-in"
                    : window.location.href = "/404";
            });
    }, []);

    // this makes the modal fade in on refresh
    useEffect(() => {
        showTheModal();
        console.log("MODAL", modal);
    }, [modal]);

    useEffect(() => console.log("ACCOUNT", account), [account]);

    // allows use to toggle between next and previous modals
    const handleChangeModal = (status) => {
        status === "next"
            ? setTimeout(() => setModal(modal + 1), 400)
            : setTimeout(() => setModal(modal - 1), 400);
        takeAwayModal();
    };

    // used to fade icon in
    const transition = useTransition(show, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });

    const modals = () => {
        if (modal === 1) { return <NameInput        account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
        if (modal === 2) { return <ContactInput     account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
        if (modal === 3) { return <LocationInput    account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
        if (modal === 4) { return <GradInput        account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
        if (modal === 5) { return <HeadlineInput    account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
        if (modal === 6) { return <AllDone          account={account} setAccount={setAccount} show={show} modal={modal} transition={transition} handleChangeModal={handleChangeModal} />; }
    };

    return (
        <>
            {/* Header */}
            <div className="flex sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full pointer-events-none -z-10" aria-hidden="true">
                <div className="relative h-full w-full mx-auto overflow-hidden">
                    <svg
                        className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
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
                        className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
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


            <Transition
                show={show}
                as={Fragment}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transform duration-[400ms] transition ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="z-10 min-h-screen flex flex-col justify-center ">
                    <div className="bg-white max-w-2xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20 mt-2">
                        {modals()}
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default InfoInput;
