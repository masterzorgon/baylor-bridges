/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { ArrowSmRightIcon, MailIcon } from "@heroicons/react/outline";
import axios from "axios";

import Progress from "./Progress";
import Button from "../../components/Button";
import Password from "../../components/Password";
import VerificationCode from "../../components/VerificationCode";

import { classNames } from "../../components/Utils";
import { ArrowSmLeftIcon } from "@heroicons/react/solid";


const steps = [
    { id: 1, name: "Email", button: "Send The Email", isSent: true },
    { id: 2, name: "Verification", button: ["Change Email", "Next Step"], isSent: true },
    { id: 3, name: "Reset Password", button: "Verify", isSent: false },
    { id: 4, name: "Success", button: "Sign In Account", isSent: true }
];

const Form = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [step, setStep] = useState(1);
    const [error_message, setErrorMessage] = useState(null);
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationCode_checked, setVerificationCode_checked] = useState(false);
    const [wrongVCode, setwrongVCode] = useState(false);
    const [password, setPassword] = useState("");
    const [password_checked, setPasswordChecked] = useState("");
    const [isResent, setIsResent] = useState(false);
    const [resentFreeze, setResentFreeze] = useState(0);


    useEffect(() => {
        if (step === 1) {
            let reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            let is_valid = reg.test(email || "");

            setComplete(email && email !== "" && is_valid);
        }
        if (step === 2) {

            console.log(verificationCode_checked);
            setComplete(verificationCode_checked);

        }
        if (step === 3) {
            setComplete(password_checked);
        }
    }, [email, verificationCode, password, verificationCode_checked, password_checked]);
    useEffect(() => {

        if (!wrongVCode) {
            setErrorMessage(null);

        }
    }, [step]);
    useEffect(() => {
        if (!resentFreeze) {
            setIsResent(false);
            return;
        }

        const intervalId = setInterval(() => {
            setResentFreeze(resentFreeze - 1);
        }, 1000);
        console.log("resend freeze is" + resentFreeze);

        return () => clearInterval(intervalId);
    }, [resentFreeze]);

    const onSubmit = () => {
        setwrongVCode(false);
        if (step === 1) {
            setLoading(true);
            axios.post("/reset-password", { email: email, }).then(res => {
                setStep(2);
                setComplete(false);
                setResentFreeze(60);
                setIsResent(true);
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
            setComplete(false);

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
                    setComplete(false);
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
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500">
                    The verification code willl be send to this email, please check your inbox. If you do not see the email, please check your junk email folder.
                </p>
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
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500 pointer-events-auto">
                    The Verification email is sent, please check your inbox.{" "}
                    <button
                        className={isResent ? "text-gray-700 font-semibold" : "text-emerald-800 underline font-semibold"}
                        disabled={isResent}
                        onClick={() => {
                            console.log("click resend");
                            setIsResent(true);
                            setResentFreeze(60);
                            // TODO: axios request handle resent
                        }}
                    >{!isResent ? "resend the code" : "sent(" + resentFreeze + "S). "}</button>
                </p>
                <VerificationCode onChange={(verificationCode, checked) => {
                    setVerificationCode(verificationCode);
                    setVerificationCode_checked(checked);
                }} />
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


                    <div className="mt-6 text-sm text-right w-full grid grid-cols-2 gap-4 place-items-center pt-2">
                        {Array.isArray(steps[step - 1].button) ?

                            <>
                                <Button
                                    className="relative text-center col-span-2 sm:col-span-1 text-sm px-4 py-4 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => setStep(1)}
                                    disabled={isResent}
                                    loading={loading}
                                >
                                    <span className={`flex items-center ${loading ? "invisible" : ""}`}>
                                        <ArrowSmLeftIcon className="h-4 w-4" />
                                        <span>{steps[step - 1].button[0]}</span>
                                    </span>
                                </Button>
                                <Button
                                    className="relative text-center col-span-2 sm:col-span-1 text-sm px-4 py-4 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={onSubmit}
                                    loading={loading}
                                    disabled={loading || !complete}
                                >
                                    <span className={`flex items-center ${loading ? "invisible" : ""}`}>
                                        <span>{steps[step - 1].button[1]}</span>
                                        <ArrowSmRightIcon className="h-4 w-4" />
                                    </span>
                                </Button>

                            </>
                            :
                            <Button
                                className="relative col-span-2 text-center text-sm px-4 py-4 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={onSubmit}
                                loading={loading}
                                disabled={loading || !complete}
                            >
                                <span className={`flex items-center ${loading ? "invisible" : ""}`}>
                                    <span>{steps[step - 1].button}</span>
                                    <ArrowSmRightIcon className="h-4 w-4" />
                                </span>
                            </Button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );

};
export default Form;