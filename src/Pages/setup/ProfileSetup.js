// import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";
import axios from "axios";
import { toast } from "react-toastify";
import { useTransition } from "react-spring";
import { animated } from "react-spring";
import { UserCircleIcon, InboxIcon, LocationMarkerIcon, AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/outline";

// import NameInput from "./modals/01-NameInput";
// import ContactInput from "./modals/02-ContactInput";
// import LocationInput from "./modals/03-LocationInput";
// import GradInput from "./modals/04-GradInput";
// import HeadlineInput from "./modals/05-HeadlineInput";
// import AllDone from "./modals/06-AllDone";
import Buttons from "./modals/components/Buttons";

const InfoInput = () => {

    const [show, setShow] = useState(false); // used to fade modals in and out
    const [, , showTheModal] = useTimeoutFn(() => setShow(true), 400); // used to fade modals in
    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 100); // used to fade modal out
    const [modal, setModal] = useState(1); // used to switch between modals
    const [account, setAccount] = useState({}); // updates account info
    const [loading, setLoading] = useState(false); // indicates that data is being sent to server

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

    // displays modals
    // const displayModals = () => {
    //     if (modal === 1) { return <NameInput        modalInfo={modalInfo.NameInput} loading={loading} setLoading={setLoading} modal={modal} account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
    //     if (modal === 2) { return <ContactInput     modalInfo={modalInfo.ContactInput} loading={loading} setLoading={setLoading} modal={modal} account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
    //     if (modal === 3) { return <LocationInput    modalInfo={modalInfo.LocationInput} loading={loading} setLoading={setLoading} modal={modal} account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
    //     if (modal === 4) { return <GradInput        modalInfo={modalInfo.GradInput} loading={loading} setLoading={setLoading} modal={modal} account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
    //     if (modal === 5) { return <HeadlineInput    modalInfo={modalInfo.HeadlineInput} loading={loading} setLoading={setLoading} modal={modal} account={account} setAccount={setAccount} transition={transition} handleChangeModal={handleChangeModal} />; }
    //     if (modal === 6) { return <AllDone          loading={loading} setLoading={setLoading} modal={modal} account={account} transition={transition} />; }
    // };

    const modalInfo = {
        NameInput: {
            title: "Name",
            sequence: 1,
            description: "Please provide your full name. This is the name others will see on your profile for others who may reach you.",
            icon: UserCircleIcon,
            required: true,
            fields: {
                firstField: {
                    attribute: [
                        { type: "text", title: "First Name (and Middle Name)", placeholder: "First Name", key: "first_name" },
                    ]
                },
                secondField: {
                    attribute: [
                        { type: "text", title: "Last Name", placeholder: "Last Name", key: "last_name" },
                    ]
                },
            }
        },
        ContactInput: {
            title: "Contact Information",
            sequence: 2,
            description: "Please provide the contact information through which you wish to be contacted. This information will be publicly displayed on your account.",
            icon: InboxIcon,
            required: false,
            fields: {
                firstField: {
                    attribute: [
                        { type: "text", title: "Phone Number", placeholder: "Phone Number", key: "phone" },
                    ]
                },
                secondField: {
                    attribute: [
                        { type: "text", title: "Email Address", placeholder: "Email Address", key: "email" },
                    ]
                }
            }
        },
        LocationInput: {
            title: "Location Information",
            sequence: 3,
            description: "Please provide your location information. This information will be used to fill out our Baylor Bridges heat map as displayed on the home page.",
            icon: LocationMarkerIcon,
            required: true,
            fields: {
                firstField: {
                    attribute: [
                        { type: "text", title: "State", placeholder: "State", key: "state" }
                    ]
                },
                secondField: {
                    attribute: [
                        { type: "text", title: "State", placeholder: "State", key: "city" }
                    ]
                }
            }
        },
        GradInput: {
            title: "Graduating Class",
            sequence: 4,
            description: "Please provide the year and semester of your graduating class from Baylor University. If you have not yet graduated, please provide the expected graduation year and semester.",
            icon: AcademicCapIcon,
            required: false,
            fields: {
                firstField: {
                    attribute: [
                        { type: "text", title: "Semester", placeholder: "Semester", key: "graduate_semester" }
                    ]
                },
                secondField: {
                    attribute: [
                        { type: "number", title: "Year", placeholder: "Year", key: "graduate_year" }
                    ]
                }
            }
        },
        HeadlineInput: {
            title: "Headline",
            sequence: 5,
            description: "Your headline should be your professional title, and your biography should be a summary of who you are and what you do.",
            icon: BriefcaseIcon,
            required: false,
            fields: {
                firstField: {
                    attribute: [
                        { type: "text", title: "Headline", placeholder: "Headline", key: "headline" }
                    ]
                },
                secondField: {
                    attribute: [
                        { type: "text", title: "Biography", placeholder: "Biography", key: "biography" }
                    ]
                }
            }
        }
    };

    for (const property in modalInfo) {
        if (modalInfo[property].sequence === modal) {
            console.log("CURRENT MODAL:", modalInfo[property].title);
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
                                <section aria-labelledby="contact-heading">
                                    <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8 mx-auto">
                                        <div className="flex flex-col bg-white rounded-2xl">

                                            {/* {displayModals()} */}
                                            <div className="flex-1 relative pt-16 pb-8">
                                                {transition((style, item) => {
                                                    return item
                                                        ?
                                                        <animated.div style={style} className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-md transform -translate-y-1/2">
                                                            <modalField.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                                        </animated.div>
                                                        : "";
                                                })}
                                                <h3 className="text-xl font-medium text-gray-900">{modalField.title}</h3>
                                                <p className="mt-4 text-base text-gray-500">
                                                    {modalField.description}
                                                </p>
                                            </div>

                                            <div className="bg-white rounded-bl-2xl rounded-br-2xl">
                                                {/* INPUT FIELDS */}
                                                <div className="-space-y-px rounded-md shadow-sm">
                                                    <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                                        <label htmlFor="first-name" className="block text-xs font-medium text-gray-900">
                                                            {modalField.fields.firstField.attribute[0].title}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="first-name"
                                                            id="first-name"
                                                            className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                            placeholder=""
                                                            autoComplete="off"
                                                            onChange={event => setAccount({ ...account, first_name: event.target.value })}
                                                            value={account.first_name}
                                                        />
                                                    </div>
                                                    <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
                                                        <label htmlFor="last-name" className="block text-xs font-medium text-gray-900">
                                                            {modalField.fields.secondField.attribute[0].title}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="last-name"
                                                            id="last-name"
                                                            className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                            placeholder=""
                                                            autoComplete="off"
                                                            onChange={event => setAccount({ ...account, last_name: event.target.value })}
                                                            value={account.last_name}
                                                        />
                                                    </div>
                                                </div>
                                                {/* CHANGE MODAL BUTTONS */}
                                                <div className="flex justify-between mt-6 space-x-2">
                                                    <Buttons
                                                        handleChangeModal={handleChangeModal}
                                                        account={account}
                                                        modal={modal}
                                                        loading={loading}
                                                        required={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </Transition>
                </>
            );
        }
    }

};

export default InfoInput;
