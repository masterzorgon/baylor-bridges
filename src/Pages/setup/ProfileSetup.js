// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTimeoutFn } from "react-use";
import axios from "axios";
import { toast } from "react-toastify";
import { useTransition } from "react-spring";
import { CheckCircleIcon, UserCircleIcon, LocationMarkerIcon, AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/outline";
import { InboxIcon } from "@heroicons/react/outline";

import { Properties } from "../../components/profile/Fields";

import Modal from "./Modal";


const fields = {
    name: {
        title: "Name",
        sequence: 1,
        description: "Please provide your full name. This is the name others will see on your profile for others who may reach you.",
        icon: UserCircleIcon,
        fields: [
            Properties.name,
        ]
    },
    contact: {
        title: "Contact Information",
        sequence: 2,
        description: "Please provide the contact information through which you wish to be contacted. This information will be publicly displayed on your account.",
        icon: InboxIcon,
        fields: [
            Properties.email,
            Properties.phone,
        ]
    },
    location: {
        title: "Location Information",
        sequence: 3,
        description: "Please provide your location information. This information will be used to fill out our Baylor Bridges heat map as displayed on the home page.",
        icon: LocationMarkerIcon,
        fields: [
            Properties.location,
        ]
    },
    graduation: {
        title: "Graduating Class",
        sequence: 4,
        description: "Please provide the year and semester of your graduating class from Baylor University. If you have not yet graduated, please provide the  graduation year and semester.",
        icon: AcademicCapIcon,
        fields: [
            Properties.graduate_alumni,
            Properties.graduate_student,
        ]
    },
    headline: {
        title: "Headline",
        sequence: 5,
        description: "Your headline should be your professional title, and your biography should be a summary of who you are and what you do.",
        icon: BriefcaseIcon,
        fields: [
            Properties.headline,
            Properties.occupation,
            Properties.biography,
        ]
    },
    done: {
        title: "You're all set!",
        subtitle: "Great job.",
        sequence: 6,
        description: "Thank you so much for taking the time to set up your Baylor Bridges account. We hope you enjoy our platform, and please feel to reach out via the Contact Us page if you have any questions or concerns.",
        icon: CheckCircleIcon,
    }
};

const InfoInput = () => {
    const [show, setShow] = useState(false); // used to fade modals in and out
    const [, , showTheModal] = useTimeoutFn(() => setShow(true), 400); // used to fade modals in
    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 100); // used to fade modal out
    const [modal, setModal] = useState(1); // used to switch between modals
    const [loading, setLoading] = useState(false); // indicates that data is being sent to server
    const [account, setAccount] = useState({  // updates account info
        first_name: "",
        last_name: "",
        state: "",
        city: "",
        biography: "",
        headline: "",
        role: "",
        contact_info: {
            email: "",
            email_visibility: "self",
            phone: "",
            phone_visibility: "self"
        }
    });


    // this makes the modal fade in on refresh
    useEffect(() => showTheModal(), [modal]);

    // get current authenticated account profile
    const x_fields = "user_id, first_name, last_name, headline, prefix, role, occupation, graduate_year, graduate_semester, city, state, occupation, biography, contact_info";
    useEffect(() => {
        axios.get("/accounts/me", { headers: { "x-fields": x_fields } })
            .then(res => {
                setAccount(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.response.data.message);
            });
    }, []);

    // allows use to toggle between next and previous modals
    const handleChangeModal = async (status) => {
        if (status === "next") {
            setLoading(true);

            axios.put("/accounts/me", account, { headers: { "x-fields": x_fields } })
                .then(res => {
                    setLoading(false);
                    setTimeout(() => setModal(modal + 1), 400);
                }).catch(err => {
                    toast.error(err.response.data.message);
                });
        } else {
            setTimeout(() => setModal(modal - 1), 400);
        }

        takeAwayModal();
    };

    // used to fade icon in
    const transition = useTransition(show, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });

    useEffect(() => {
        console.log("ACCOUNT CHANGED:", account);
    }, [account]);

    // RENDER MODAL COMPONENTS
    for (const property in fields) {

        if (fields[property].sequence === modal) {
            const modalField = fields[property];

            return (
                <>
                    {/* BACKGROUND */}
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

                    {/* INPUT MODALS */}
                    <Modal
                        field={modalField}
                        loading={loading}
                        show={show}
                        modal={modal}
                        transition={transition}
                        account={account}
                        setAccount={setAccount}
                        handleChangeModal={handleChangeModal}
                    />
                </>
            );
        }
    }
};

export default InfoInput;
