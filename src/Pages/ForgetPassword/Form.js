/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { ArrowSmRightIcon, CalculatorIcon, MailIcon } from "@heroicons/react/outline";

import Progress from "../../components/Progress";
import Button from "../../components/Button";
import Password from "../../components/Password";

import { classNames, changeBaseURL } from "../../components/Utils";


const steps = [
    { id: 1, name: "Email" },
    { id: 2, name: "Verification" },
    { id: 3, name: "Reset Password" },
    { id: 4, name: "Success" }
];

const Form = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [step, setStep] = useState(1);
    const [error_message, setErrorMessage] = useState(null);

    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [password, setPassword] = useState("");
    const [password_checked, setPasswordChecked] = useState("");


    useEffect(() => {
        if (step === 1) {
            let reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            let is_valid = reg.test(email || "");

            setComplete(email && email !== "" && is_valid);
        }
        if (step === 2) {
            let reg = /^\d{6}$/;
            let is_valid = reg.test(verificationCode || "");
            setComplete(verificationCode && verificationCode !== "" && is_valid);

        }
        setErrorMessage(null);

    }, [email, verificationCode, step]);

    const onSubmit = () => {
        if (step === 1) {
            // setLoading(true);
            setStep(2);

            //todo: axios request

        }
        if (step === 2) {
            // setLoading(true);
            setStep(3);

            //todo: axios request

        }
        if (step === 3) {
            // setLoading(true);
            setStep(4);

            //todo: axios request

        }

    };

    const step1 = () => {
        return (
            <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your email address</h3>
                <div className="mt-4 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={classNames("py-4 w-full pl-10 sm:text-sm rounded-md z-30", error_message === null ? "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" : "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500")}
                        placeholder="abc@123.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </>
        );

    };

    const step2 = () => {

        return (
            <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Verification Code</h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500">
                    The Verification email is sent
                </p>
                <div className="mt-4 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <CalculatorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"

                        className={classNames("py-4 w-full pl-10 sm:text-sm rounded-md z-30", error_message === null ? "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" : "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500")}
                        placeholder="0 0 0 0 0 0"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                </div>
            </>
        );

    };

    const step3 = () => {
        return (
            <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your password</h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500">Set a password for your account.</p>
                <Password
                    className="py-4"
                    onChange={(password, checked) => {
                        setPassword(password);
                        setPasswordChecked(checked);
                    }}
                />

            </>
        );
    };

    const step4 = () => {
        return (
            <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">successfully Reset the Password!</h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500 self-center">Your account password has been successfully reset. Sign in your account </p>


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
                    <h2 className="mt-2 text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl">Forget Password</h2>
                </div>

                <Progress currentStep={step} steps={steps} />


                <div className="px-5 mt-10 md:mt-2 md:bg-white md:shadow md:rounded-lg md:px-8 md:py-8 md:-mx-8">

                    {step === 1 && step1()}
                    {step === 2 && step2()}
                    {step === 3 && step3()}
                    {step === 4 && step4()}
                    {/* {step === 9 && step9()} */}

                    {/* Error message */}
                    {
                        error_message !== null &&
                        <p className="mt-2 text-sm text-red-600">
                            {error_message}
                        </p>
                    }


                    <div className="mt-6 text-sm text-right w-full grid place-items-center space-y-4">
                        <Button
                            className="relative text-center text-sm px-4 py-4 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={onSubmit}
                            loading={loading}
                            disabled={loading || !complete}
                        >
                            <span className={`flex items-center ${loading ? "invisible" : ""}`}>
                                <span>{step===4?"Sign In My Account":"Next"}</span>
                                <ArrowSmRightIcon className="h-4 w-4" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default Form;