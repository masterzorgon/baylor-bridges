/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { ArrowSmRightIcon, MailIcon } from "@heroicons/react/outline";
import axios from "axios";
import { toast } from "react-toastify";

import Button from "../../components/Button";

import { classNames } from "../../components/Utils";


const steps = [
    { id: 1, name: "Email", button: "Next", isSent: true },
    { id: 2, name: "Reset Password Email Sent", button: ["Re-enter Email", "Return to Home"], isSent: true },
    { id: 3, name: "Reset Password", button: "Verify", isSent: false },
    { id: 4, name: "Success", button: "Sign In Account", isSent: true }
];

const Form = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [step, setStep] = useState(1); // sets the modal to be displayed
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

            console.log(verificationCode_checked + "\t" + verificationCode);
            setComplete(verificationCode_checked);

        }
        if (step === 3) {
            setComplete(password_checked);
        }
    }, [email, password, verificationCode_checked, password_checked]);
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
        return () => clearInterval(intervalId);
    }, [resentFreeze]);

    const onSubmit = () => {
        setwrongVCode(false);
        if (step === 1) {
            setLoading(true);
            // reset password
            axios.post("/accounts/password", { email: email, }).then(res => {
                setStep(2);
                setComplete(false);
                setResentFreeze(60);
                setIsResent(true);
            }).catch(err => {
                setErrorMessage(err.response.data.message);
                toast.error(err.response.data.message);
            }).finally(() => {
                setLoading(false);
            });

            //todo: axios request

        }
        if (step === 2) {
            // setLoading(true);
            // setStep(3);
            // setComplete(false);
            window.location.href = "/";

            //todo: axios request

        }
        if (step === 3) {
            setLoading(true);
            // response to a reset password requests
            axios.post("/accounts/password/confirm", {
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
                <h3 className="text-lg leading-6 font-medium text-gray-900">Email Address</h3>
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
                        className={classNames("py-2 w-full pl-10 sm:text-sm rounded-md z-30", error_message === null ? "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" : "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500")}
                        placeholder="abc@123.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </>
        );

    };

    const handleResend = () => {
        axios.post("/accounts/password", { "email": email })
            .then(res => {
                console.log("click resend");
                setIsResent(true);
                setResentFreeze(60);
            }).catch(err => {
                setErrorMessage(err.response.data.message);
            });
    };

    const step2 = () => {

        return (
            <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Verification Email Sent</h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500 pointer-events-auto">
                    The verification email has been sent. If you do not see it, please check your spam or consider re-entering the account email you provided.{" "}
                    <button
                        className={isResent ? "text-gray-700 font-semibold" : "text-emerald-800 underline font-semibold"}
                        disabled={isResent}
                        onClick={() => {
                            handleResend();
                            // TODO: axios request handle resent
                        }}
                    >{!isResent ? "Resend the code?" : "Already sent(" + resentFreeze + "S). "}</button>
                </p>
                {/* <VerificationCode onChange={(verificationCode, checked) => {
                    setVerificationCode(verificationCode);
                    setVerificationCode_checked(checked);
                }} /> */}
            </>
        );

    };

    // const step3 = () => {
    //     return (
    //         <>
    //             <h3 className="text-lg leading-6 font-medium text-gray-900">Password</h3>
    //             <p className="mt-1 text-sm font-medium mb-4 text-gray-500">Set a password for your account.</p>
    //             <Password
    //                 className="py-2"
    //                 onChange={(password, checked) => {
    //                     setPassword(password);
    //                     setPasswordChecked(checked);
    //                 }}
    //             />

    //         </>
    //     );
    // };

    // const step4 = () => {
    //     return (
    //         <>
    //             <h3 className="text-lg leading-6 font-medium text-gray-900">Successfully Reset The Password :)</h3>
    //             <p className="mt-1 text-sm font-medium mb-4 text-gray-500 self-center">Your account password has been successfully reset. Sign in your account with new password</p>


    //         </>
    //     );
    // };


    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="relative max-w-xl mx-auto">
                {/* Title and subtitle */}
                <div className="text-center">
                    <a className="sm:mx-auto sm:w-full sm:max-w-md" href="/">
                        <img
                            className="mx-auto h-20 w-auto"
                            src="/Baylor-University-Athletics-01.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password?</h2>
                    </a>
                </div>
            </div>

            {/* <Progress currentStep={step} steps={steps} /> */}

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {step === 1 && step1()}
                    {step === 2 && step2()}
                    {/* {step === 3 && step3()} */}
                    {/* {step === 4 && step4()} */}
                    {/* {step === 9 && step9()} */}

                    {/* Error message */}
                    {
                        error_message !== null &&
                        <p className="mt-2 text-sm text-red-600">
                            {error_message}
                        </p>
                    }


                    <div className="mt-4 text-sm text-right w-full grid grid-cols-2 gap-4 place-items-center pt-2">
                        {Array.isArray(steps[step - 1].button) ?
                            <>
                                <Button
                                    className="relative text-center col-span-2 sm:col-span-1 text-sm px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-emerald-800 bg-white border-zinc-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => setStep(1)}
                                    // disabled={isResent}
                                    loading={loading}
                                >
                                    <span className={`flex items-center ${loading ? "invisible" : ""}`}>

                                        <span>{steps[step - 1].button[0]}</span>
                                    </span>
                                </Button>
                                <Button
                                    className="relative text-center col-span-2 sm:col-span-1 text-sm px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={onSubmit}
                                    loading={loading}
                                    // disabled={loading || !complete}
                                    arrow={true}
                                >
                                    <span className={`flex items-center ${loading ? "invisible" : ""}`}>
                                        <span>{steps[step - 1].button[1]}</span>
                                    </span>
                                </Button>

                            </>
                            :
                            <Button
                                className="relative col-span-2 text-center text-sm px-4 py-3 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={onSubmit}
                                loading={loading}
                                disabled={loading || !complete}
                            >
                                <span className={`flex items-center ${loading ? "invisible" : ""}`}>
                                    <span>{steps[step - 1].button}</span>

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