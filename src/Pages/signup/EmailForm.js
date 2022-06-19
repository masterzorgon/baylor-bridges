import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Button";
import { ArrowSmRightIcon, MailIcon } from "@heroicons/react/outline";

import { classNames } from "../../components/Utils";
import axios from "axios";

const EmailForm = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [step, setStep] = useState(1);
    const [error_message, setErrorMessage] = useState(null);

    const [email, setEmail] = useState("");


    const { role } = useParams();
    if (role !== "student" && role !== "alumni") {
        window.location.href = "/404";
    }

    const onSubmit = () => {

        if (step === 1) {
            setLoading(true);
            axios.post("/accounts/signup", {
                username: email,
                role: role
            })
                .then(res => {
                    // to success page
                    console.log("success");
                    setStep(2);
                }).catch(err => {
                    let res = err.response.data;

                    if (res.code === "EmailExistsException") {
                        setErrorMessage("This email address is already associated with another account.");
                    } else if (res.code === "ConfirmationRequiredException") {
                        // DO we still have this in case?
                    } else {
                        setErrorMessage("We are unable to continue for you at this moment.");
                    }
                }).finally(() => {
                    setLoading(false);
                });
        }


    };

    useEffect(() => {
        let reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let is_valid = reg.test(email || "");

        if (role === "student") {
            is_valid = is_valid && email.endsWith("@baylor.edu");
        }

        setComplete(email && email !== "" && is_valid);
        setErrorMessage(null);
    }, [role, email]);

    const step1 = () => {
        return (
            <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your email address</h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500">{role === "student" ? "Please use your Baylor University email to sign up as a current student." : "Please use your email address to sign up as an alumnus."}</p>
                <div className="mt-4 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={classNames("py-4 block w-full pl-10 sm:text-sm rounded-md", error_message === null ? "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" : "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500")}
                        placeholder={role === "student" ? "you@baylor.edu" : "you@alumni.baylor.edu"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mt-6 text-sm text-right w-full grid place-items-center space-y-4">
                    <Button
                        className="relative text-center text-sm px-4 py-4 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={onSubmit}
                        loading={loading}
                        disabled={loading || !complete}
                    >
                        <span className={`flex items-center ${loading ? "invisible" : ""}`}>
                            <span>Next</span>
                            <ArrowSmRightIcon className="h-4 w-4" />
                        </span>
                    </Button>
                </div>
            </>
        );
    };

    const step2 = () => {
        return (
            <>
                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {/* <span className="text-gradient bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">Welcome!</span> */}
                    <span className="block">You are almost there!</span>
                </h2>
                <p className="mt-4 mx-auto text-gray-700">
                    We send the <span className="underline underline-offset-4 decoration-emerald-400">verification link</span> to your email { email },
                    please check your inboxes and complete the sign-up process!
                    we are glad to have you joining our Baylor Bridges Family :)

                </p>
            </>
        );
    };

    return (
        <div className="bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <div className="relative max-w-xl mx-auto">
                <svg className="absolute left-full transdiv translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <svg className="absolute right-full bottom-0 transdiv -translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>

                {/* Title and subtitle */}
                <div className="text-center">
                    <a href="/">
                        <img
                            className="mx-auto h-9 w-auto"
                            src="/Baylor-University-Athletics-01.svg"
                            alt="Workflow"
                        />
                    </a>
                    <h2 className="mt-2 text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl">Sign up</h2>
                </div>



                <div className="px-5 mt-10 md:mt-2 md:bg-white md:shadow md:rounded-lg md:px-8 md:py-8 md:-mx-8">

                    {/* Error message */}
                    {
                        error_message !== null &&
                        <p className="mt-2 text-sm text-red-600">
                            {error_message}
                        </p>
                    }

                    {step === 1 && step1()}
                    {step === 2 && step2()}


                </div>
            </div>
        </div>
    );
};

export default EmailForm;