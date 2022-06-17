/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { MailIcon, ArrowLeftIcon, CheckIcon } from "@heroicons/react/outline";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import axios from "axios";
import { toast } from "react-toastify";

import Button from "../../components/Button";

import { classNames } from "../../components/Utils";

const steps = [
    { id: 1, name: "Email", button: "Next", isSent: true },
    { id: 2, name: "Reset Password Email Sent", button: "Re-send email", isSent: true },
];

const Form = () => {
    const [loading, setLoading] = useState(false); // loading state for the button
    const [complete, setComplete] = useState(false); // used to disable/enable button in step1
    const [step, setStep] = useState(1); // sets the modal to be displayed
    const [error_message, setErrorMessage] = useState(null);
    const [email, setEmail] = useState(""); // enter email input state
    const [wrongVCode, setwrongVCode] = useState(false);
    const [isResent, setIsResent] = useState(false); // email sent status
    const [resentFreeze, setResentFreeze] = useState(0); // timer till user can resend email

    useEffect(() => {
        if (step === 1) {
            let reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            let is_valid = reg.test(email || "");

            setComplete(email && email !== "" && is_valid);
        }
    }, [email]);

    useEffect(() => {
        if (!wrongVCode) setErrorMessage(null);
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
        }

        if (step === 2) window.location.href = "/";
    };

    useEffect(() => {
        console.log("resentFreeze:", resentFreeze);
    }, [resentFreeze]);

    const step1 = () => {
        return (
            <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Email Address</h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500">
                    A link to reset your password will be sent to this email, please check your inbox.
                    If you do not see the email, please check your junk email folder.
                </p>
                <div className="mt-4 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={
                            classNames("py-2 w-full pl-10 sm:text-sm rounded-md z-30", error_message === null ? "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" :
                                "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                            )}
                        placeholder="yourname@baylor.edu"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
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
                <button onClick={() => setStep(1)} className=" flex items-center mb-4 text-sm text-green-600 hover:text-green-700">
                    <ArrowLeftIcon width="1em" />
                    <span className="ml-2">{email}</span>
                </button>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Verification Email Sent
                </h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500 pointer-events-auto">
                    The link to reset your password has been sent. If you do not see it in your inbox,
                    please check your spam or consider re-entering the account email you provided.
                </p>
                {/* COUNTDOWN TIMER */}
                <div className="text-3xl flex justify-center my-6">
                    <CountdownCircleTimer
                        isPlaying={resentFreeze === 0 ? false : true}
                        size={120}
                        duration={60}
                        colors={["#069668"]} // green
                        onComplete={() => ({ shouldRepeat: resentFreeze === 0 ? false : true })}
                    >
                        {({ remainingTime }) => (
                            resentFreeze === 0
                                ? <CheckIcon className="text-green-600 w-10" />
                                : remainingTime
                        )}
                    </CountdownCircleTimer>
                </div>
            </>
        );
    };

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
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Forgot your password?
                        </h2>
                    </a>
                </div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {step === 1 && step1()}
                    {step === 2 && step2()}

                    {/* Error message */}
                    {
                        error_message !== null &&
                        <p className="mt-2 text-sm text-red-600">
                            {error_message}
                        </p>
                    }

                    <div className="mt-4 text-sm text-right w-full grid grid-cols-2 gap-4 place-items-center pt-2">
                        {step === 2
                            ?
                            <button
                                className="w-full relative col-span-2 text-center text-sm px-4 py-3 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleResend}
                                disabled={isResent}
                            >
                                Resend email
                            </button>
                            :
                            <Button
                                className="relative col-span-2 text-center text-sm px-4 py-3 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={onSubmit}
                                loading={loading}
                                disabled={loading || !complete}
                                arrow={true}
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