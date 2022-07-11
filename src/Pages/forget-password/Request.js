import React, { useState, useEffect } from "react";
import { MailIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Joi from "joi";

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

    useEffect(() => {
        const result = Joi.string().email({ tlds: { allow: false } }).required().validate(email);
        setComplete(!result.error);
    }, [email]);

    const onSubmit = () => {
        setLoading(true);
        // reset password
        axios.post("/accounts/password", { email: email, }).then(res => {
            setStep(2);
            setComplete(false);
        }).catch(err => {
            setErrorMessage(err.response.data.message);
            toast.error(err.response.data.message);
        }).finally(() => {
            setLoading(false);
        });
    };

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

                {/* Error message */}
                {
                    error_message !== null &&
                    <p className="mt-2 text-sm text-red-600">
                        {error_message}
                    </p>
                }

                <div className="mt-4 text-sm text-right w-full grid grid-cols-2 gap-4 place-items-center pt-2">
                    {step === 1 &&
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
            </>
        );

    };

    const step2 = () => {
        return (
            <>
                <button onClick={() => setStep(1)} className=" flex items-center mb-4 text-sm text-emerald-600 hover:text-green-700">
                    <ArrowLeftIcon width="1em" />
                    <span className="ml-2">{email}</span>
                </button>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Check your email
                </h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500 pointer-events-auto">
                    We have sent you an email with the link to reset your password to your email address.
                </p>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500 pointer-events-auto">
                    Don&#39;t receive the email? Check your spam filter.
                </p>
                <div className="text-xl flex justify-center -mt-4 -mb-3">
                    <lord-icon
                        src="https://cdn.lordicon.com/rhvddzym.json"
                        trigger="loop"
                        style={{ width: "8rem", height: "8rem" }}
                    >
                    </lord-icon>
                </div>
            </>
        );
    };

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="relative max-w-xl mx-auto">
                {/* Title and subtitle */}
                <div className="text-center">
                    <Link className="sm:mx-auto sm:w-full sm:max-w-md" to="/">
                        <img
                            className="mx-auto h-20 w-auto"
                            src="/Baylor-University-Athletics-01.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Forgot your password?
                        </h2>
                    </Link>
                </div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {step === 1 && step1()}
                    {step === 2 && step2()}
                </div>
            </div>
        </div>
    );
};

export default Form;