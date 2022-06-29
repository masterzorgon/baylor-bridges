// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTimeoutFn } from "react-use";
import axios from "axios";
import { toast } from "react-toastify";
import { useTransition } from "react-spring";
import { UserCircleIcon, LocationMarkerIcon, AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/outline";
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
            fields: {
                firstField: {
                    attribute: [
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
                    ]
                },
                secondField: {
                    attribute: [
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
            }
        },
        ContactInput: {
            title: "Contact Information",
            sequence: 2,
            description: "Please provide the contact information through which you wish to be contacted. This information will be publicly displayed on your account.",
            icon: InboxIcon,
            buttons: (account.contact_info.email !== null && account.contact_info.phone !== null) &&
                (account.contact_info.email !== "" && account.contact_info.phone !== ""),
            fields: {
                firstField: {
                    attribute: [
                        {
                            type: "text",
                            title: "Phone Number",
                            placeholder: "(123) 456-7890",
                            key: "phone",
                            required: false,
                            value: account.contact_info.phone,
                            filtered: false,
                            change: event => setAccount({ ...account, contact_info: { ...account.contact_info, phone: event.target.value } })
                        },
                    ]
                },
                secondField: {
                    attribute: [
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
                }
            }
        },
        LocationInput: {
            title: "Location Information",
            sequence: 3,
            description: "Please provide your location information. This information will be used to fill out our Baylor Bridges heat map as displayed on the home page.",
            icon: LocationMarkerIcon,
            buttons: (account.state !== null && account.city !== null) &&
                (account.state !== "" && account.city !== ""),
            fields: {
                firstField: {
                    attribute: [
                        {
                            type: "list",
                            title: "State",
                            placeholder: "TX",
                            key: "state",
                            required: true,
                            value: account.state,
                            filtered: false,
                        }
                    ]
                },
                secondField: {
                    attribute: [
                        {
                            type: "text",
                            title: "City",
                            placeholder: "San Antonio",
                            key: "city",
                            required: false,
                            value: account.city,
                            filtered: false,
                        }
                    ]
                }
            }
        },
        GradInput: {
            title: "Graduating Class",
            sequence: 4,
            description: "Please provide the year and semester of your graduating class from Baylor University. If you have not yet graduated, please provide the  graduation year and semester.",
            icon: AcademicCapIcon,
            buttons: (account.graduate_year !== null && account.graduate_semester !== null) &&
                (account.graduate_year !== "" && account.graduate_semester !== ""),
            fields: {
                firstField: {
                    attribute: [
                        {
                            type: "list",
                            title: "Semester",
                            placeholder: "Spring",
                            key: "graduate_semester",
                            required: false,
                            value: account.graduate_semester,
                            filtered: false,
                        }
                    ]
                },
                secondField: {
                    attribute: [
                        {
                            type: "text",
                            title: "Year",
                            placeholder: "2001",
                            key: "graduate_year",
                            required: false,
                            value: account.graduate_year,
                            filtered: true,
                        }
                    ]
                }
            }
        },
        HeadlineInput: {
            title: "Headline",
            sequence: 5,
            description: "Your headline should be your professional title, and your biography should be a summary of who you are and what you do.",
            icon: BriefcaseIcon,
            buttons: (account.headline !== null && account.biography !== null) &&
                (account.headline !== "" && account.biography !== ""),
            fields: {
                firstField: {
                    attribute: [
                        {
                            type: "text",
                            title: "Headline",
                            placeholder: "Headline",
                            key: "headline",
                            required: false,
                            value: account.headline,
                            filtered: false,
                            change: event => setAccount({ ...account, headline: event.target.value })
                        }
                    ]
                },
                secondField: {
                    attribute: [
                        {
                            type: "bio",
                            title: "Biography",
                            placeholder: "Biography",
                            key: "biography",
                            required: false,
                            value: account.biography,
                            filtered: false,
                            change: event => setAccount({ ...account, biography: event.target.biography })
                        }
                    ]
                }
            }
        },
    };

    const handleFilteredInput = event => {
        // Check if it's 4 digits
        console.log("CHANGE GRAD YEAR", event);
        console.log("IsNumber", !isNaN(event.target.value));
        console.log("TYPE", typeof (event.target.value));
        console.log("NUMBER", event.target.value);

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

    for (const property in modalInfo) {
        if (modalInfo[property].sequence === modal) {

            const modalField = modalInfo[property];

            const handleInputFields = () => {
                if (modalField.fields.firstField.attribute[0].type === "text") {
                    return (
                        <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                    {
                                        modalField.fields.firstField.attribute[0].required
                                            ?
                                            <div className="flex justify-between">
                                                <label htmlFor="state" className="block text-xs font-medium text-gray-900">
                                                    {modalField.fields.firstField.attribute[0].title}
                                                </label>
                                                <span className="text-sm text-gray-500" id="email-optional">
                                                    Required
                                                </span>
                                            </div>
                                            :
                                            <label htmlFor="first-name" className="block text-xs font-medium text-gray-900">
                                                {modalField.fields.firstField.attribute[0].title}
                                            </label>
                                    }
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                        placeholder={modalField.fields.firstField.attribute[0].placeholder}
                                        autoComplete="off"
                                        onChange={
                                            modalField.fields.firstField.attribute[0].filtered
                                                ? event => handleFilteredInput(event)
                                                : event => modalField.fields.firstField.attribute[0].change(event)
                                        }
                                        value={
                                            modalField.fields.firstField.attribute[0].value !== null
                                                ? modalField.fields.firstField.attribute[0].value
                                                : ""
                                        }
                                    />
                                </div>
                                <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                    {
                                        modalField.fields.secondField.attribute[0].required
                                            ?
                                            <div className="flex justify-between">
                                                <label htmlFor="state" className="block text-xs font-medium text-gray-900">
                                                    {modalField.fields.secondField.attribute[0].title}
                                                </label>
                                                <span className="text-sm text-gray-500" id="email-optional">
                                                    Required
                                                </span>
                                            </div>
                                            :
                                            <label htmlFor="first-name" className="block text-xs font-medium text-gray-900">
                                                {modalField.fields.secondField.attribute[0].title}
                                            </label>
                                    }
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                        placeholder={modalField.fields.secondField.attribute[0].placeholder}
                                        autoComplete="off"
                                        onChange={
                                            modalField.fields.secondField.attribute[0].filtered
                                                ? event => handleFilteredInput(event)
                                                : event => modalField.fields.secondField.attribute[0].change(event)
                                        }
                                        value={
                                            modalField.fields.secondField.attribute[0].value !== null
                                                ? modalField.fields.secondField.attribute[0].value
                                                : ""
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    );
                }

                if (modalField.fields.firstField.attribute[0].type === "bio") {
                    return (
                        <>
                            <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                <label htmlFor="bio" className="block text-xs font-medium text-gray-900">
                                    {modalField.fields.firstField.attribute[0].title}
                                </label>
                                <textarea
                                    type="text"
                                    name="bio"
                                    id="bio"
                                    className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                    style={{ "height": "10rem" }}
                                    placeholder="As an orthopedic surgeon, I..."
                                    onChange={
                                        modalField.fields.firstField.attribute[0].filtered
                                            ? event => handleFilteredInput(event)
                                            : event => modalField.fields.firstField.attribute[0].change(event)
                                    }
                                    value={
                                        modalField.fields.firstField.attribute[0].value !== null
                                            ? modalField.fields.firstField.attribute[0].value
                                            : ""
                                    }
                                />
                            </div>
                            <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                <label htmlFor="bio" className="block text-xs font-medium text-gray-900">
                                    {modalField.fields.secondField.attribute[0].title}
                                </label>
                                <textarea
                                    type="text"
                                    name="bio"
                                    id="bio"
                                    className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                    style={{ "height": "10rem" }}
                                    placeholder="As an orthopedic surgeon, I..."
                                    onChange={
                                        modalField.fields.secondField.attribute[0].filtered
                                            ? event => handleFilteredInput(event)
                                            : event => modalField.fields.firstField.attribute[0].change(event)
                                    }
                                    value={
                                        modalField.fields.secondField.attribute[0].value !== null
                                            ? modalField.fields.secondField.attribute[0].value
                                            : ""
                                    }
                                />
                            </div>
                        </>
                    );
                }
            };

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
                        handleChangeModal={handleChangeModal}
                        handleInputFields={handleInputFields}
                    />
                </>
            );
        }
    }
};

export default InfoInput;
