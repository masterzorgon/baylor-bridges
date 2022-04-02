
import React, { useState, useEffect } from "react";
import { ArrowSmRightIcon, CalculatorIcon, MailIcon } from "@heroicons/react/outline";
import axios from "axios";

import Progress from "./Progress";
import Button from "../../components/Button";
import Password from "../../components/Password";

import { classNames } from "../../components/Utils";


const steps = [
    { id: 1, name: "Email", button: "send the email", isSent: true },
    { id: 2, name: "Verification", button: "next step", isSent: false },
    { id: 3, name: "Reset Password", button: "verify", isSent: false },
    { id: 4, name: "Success", button: "sign in account", isSent: false }
];

const Form = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [step, setStep] = useState(1);
    const [error_message, setErrorMessage] = useState(null);

    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [wrongVCode, setwrongVCode] = useState(false);
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
        if (step === 3) {
            setComplete(password_checked);
        }
    }, [email, verificationCode, password]);
    useEffect(() => {

        if (!wrongVCode) {
            setErrorMessage(null);

        }
    }, [step]);

    const onSubmit = () => {
        setwrongVCode(false);
        if (step === 1) {
            setLoading(true);
            axios.post("/reset-password", { email: email, }).then(res => {
                setStep(2);
            }).catch(err => {
                setErrorMessage(err.response.data.message);
            }).finally(() => {
                setLoading(false);
            });

            //todo: axios request

        }
        if (step === 2) {
            // setLoading(true);
            setStep(3);

            //todo: axios request

        }
        if (step === 3) {
            setLoading(true);
            axios.post("/reset-password/confirm", {
                "email": email,
                "confirm_code": verificationCode,
                "new_password": password
            }).then(res => {
                setStep(4);
            }).catch(err => {
                console.log(err.response);
                if (err.response.data.code === "CodeMismatchException") {
                    setErrorMessage(err.response.data.message);
                    // wrongVCode state is going to notify the useEffect do not remove the error message when it jumps from step 3 to step 2
                    setwrongVCode(true);
                    setStep(2);
                } else if (err.response.data.code === "ExpiredCodeException") {
                    setErrorMessage("account might not exist or code is expired. Please try again.");
                    // wrongVCode state is going to notify the useEffect do not remove the error message when it jumps from step 3 to step 1
                    setwrongVCode(true);
                    setStep(1);
                } else {
                    setErrorMessage(err.response.data.message);
                }

            }).finally(() => {
                setLoading(false);
            });

        }
        if (step === 4) {
            window.location.href = "/sign-in";

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
                <h3 className="text-lg leading-6 font-medium text-gray-900">successfully Reset the Password :)</h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500 self-center">Your account password has been successfully reset. Sign in your account with new password</p>


            </>
        );
    };


    return (
        <div className="bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <div className="relative max-w-xl mx-auto">

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


                <div className="bg-white mt-5 py-8 px-4 shadow sm:rounded-lg sm:px-10 sm:mt-10">

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
                                <span>{steps[step - 1].button}</span>
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