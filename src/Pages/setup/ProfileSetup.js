// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTimeoutFn } from "react-use";
import axios from "axios";
import { toast } from "react-toastify";
import { useTransition } from "react-spring";
import { CheckCircleIcon, UserCircleIcon, LocationMarkerIcon, AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/outline";
import { InboxIcon } from "@heroicons/react/outline";

import Modal from "./Modal";

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

    const x_fields = "user_id, first_name, last_name, headline, role, occupation, graduate_year, graduate_semester, city, state, biography, contact_info";

    // get current authenticated account
    useEffect(() => {
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

    // allows use to toggle between next and previous modals
    const handleChangeModal = async (status) => {
        if (status === "next") {
            setLoading(true);

            const accountCopy = { ...account };

            try {
                await axios.put("/accounts/me", accountCopy, { headers: { "x-fields": x_fields } });
                setLoading(false);
                setTimeout(() => setModal(modal + 1), 400);
            } catch (error) {
                toast.error(error.response.data.message);
            }

        } else setTimeout(() => setModal(modal - 1), 400);

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

    const modalInfo = {
        NameInput: {
            title: "Name",
            sequence: 1,
            description: "Please provide your full name. This is the name others will see on your profile for others who may reach you.",
            icon: UserCircleIcon,
            buttons: true,
            fields: [
                {
                    type: "text",
                    title: "First Name (and Middle Name)",
                    placeholder: "Peter",
                    key: "first_name",
                    required: true,
                    value: account.first_name,
                    filtered: false,
                    change: event => setAccount({ ...account, first_name: event.target.value })
                },
                {
                    type: "text",
                    title: "Last Name",
                    placeholder: "Parker",
                    key: "last_name",
                    required: true,
                    value: account.last_name,
                    filtered: false,
                    change: event => setAccount({ ...account, last_name: event.target.value })
                },
            ]
        },
        ContactInput: {
            title: "Contact Information",
            sequence: 2,
            description: "Please provide the contact information through which you wish to be contacted. This information will be publicly displayed on your account.",
            icon: InboxIcon,
            buttons: (account.contact_info.email !== null && account.contact_info.phone !== null) && (account.contact_info.email !== "" && account.contact_info.phone !== ""),
            fields: [
                {
                    type: "text",
                    title: "Phone Number",
                    placeholder: "(123) 456-7890",
                    key: "phone",
                    required: false,
                    value: account.contact_info.phone,
                    filtered: false,
                    change: event => handlePhoneInput(event)
                },
                {
                    type: "text",
                    title: "Email Address",
                    placeholder: "example@email.com",
                    key: "email",
                    required: false,
                    value: account.contact_info.email,
                    filtered: false,
                    change: event => setAccount({ ...account, contact_info: { ...account.contact_info, email: event.target.value } })
                },
            ]
        },
        LocationInput: {
            title: "Location Information",
            sequence: 3,
            description: "Please provide your location information. This information will be used to fill out our Baylor Bridges heat map as displayed on the home page.",
            icon: LocationMarkerIcon,
            buttons: (account.state !== null && account.city !== null) && (account.state !== "" && account.city !== ""),
            fields: [
                {
                    type: "list",
                    title: "State",
                    placeholder: "TX",
                    key: "state",
                    required: true,
                    value: account.state,
                    filtered: false,
                },
                {
                    type: "text",
                    title: "City",
                    placeholder: "San Antonio",
                    key: "city",
                    required: false,
                    value: account.city,
                    filtered: false,
                    change: event => setAccount({ ...account, city: event.target.value })
                }
            ]
        },
        GradInput: {
            title: "Graduating Class",
            sequence: 4,
            description: "Please provide the year and semester of your graduating class from Baylor University. If you have not yet graduated, please provide the  graduation year and semester.",
            icon: AcademicCapIcon,
            buttons: (account.graduate_year !== null && account.graduate_semester !== null) && (account.graduate_year !== "" && account.graduate_semester !== ""),
            fields: [
                {
                    type: "list",
                    title: "Semester",
                    placeholder: "Spring",
                    key: "graduate_semester",
                    required: false,
                    value: account.graduate_semester,
                    filtered: false,
                },
                {
                    type: "text",
                    title: "Year",
                    placeholder: "2001",
                    key: "graduate_year",
                    required: false,
                    value: account.graduate_year,
                    filtered: true,
                    change: event => handleGradYearInput(event)
                }
            ]
        },
        HeadlineInput: {
            title: "Headline",
            sequence: 5,
            description: "Your headline should be your professional title, and your biography should be a summary of who you are and what you do.",
            icon: BriefcaseIcon,
            buttons: (account.headline !== null && account.biography !== null) && (account.headline !== "" && account.biography !== ""),
            fields: [
                {
                    type: "text",
                    title: "Headline",
                    placeholder: "Cardiovascular Surgeon",
                    key: "headline",
                    required: false,
                    value: account.headline,
                    filtered: false,
                    change: event => setAccount({ ...account, headline: event.target.value })
                },
                {
                    type: "bio",
                    title: "Biography",
                    placeholder: "I am a cardiovascular surgeon at St. Luke's, where I...",
                    key: "biography",
                    required: false,
                    value: account.biography,
                    filtered: false,
                    change: event => setAccount({ ...account, biography: event.target.biography })
                }
            ]
        },
        AllDone: {
            title: "You're all set!",
            subtitle: "Great job.",
            sequence: 6,
            description: "Thank you so much for taking the time to set up your Baylor Bridges account. We hope you enjoy our platform, and please feel to reach out via the Contact Us page if you have any questions or concerns.",
            icon: CheckCircleIcon,
            buttons: true
        }
    };

    const handleGradYearInput = event => {
        // verify that it is less than or equal to 4 characters
        // verify that the value provided is a number
        // take into consideration the user deletes their input and accidentally inputs a space char
        if (event.target.value.length <= 4 && !isNaN(event.target.value)) {
            setAccount({ ...account, graduate_year: parseInt(event.target.value) });
        }
        if (event.target.value === "" || event.target.value === " ") {
            setAccount({ ...account, graduate_year: "" });
        }
    };

    const handlePhoneInput = event => {
        // only allow numbers, dashes, and spaces, and parentheses
        if (
            !isNaN(event.target.value) ||
            event.target.value === "-" ||
            event.target.value === "(" ||
            event.target.value === ")"
        ) {
            setAccount({ ...account, contact_info: { ...account.contact_info, phone: event.target.value } });
            console.log("PHONE", account.contact_info.phone);
        }
    };

    // RENDER MODAL COMPONENTS
    for (const property in modalInfo) {

        if (modalInfo[property].sequence === modal) {
            const modalField = modalInfo[property];

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
                        modalField={modalField}
                        loading={loading}
                        show={show}
                        account={account}
                        modal={modal}
                        transition={transition}
                        setAccount={setAccount}
                        handleChangeModal={handleChangeModal}
                    />
                </>
            );
        }
    }
};

export default InfoInput;
