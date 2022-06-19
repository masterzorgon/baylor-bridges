import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

import Password from "../../components/Password";
import Button from "../../components/Button";

import { classNames } from "../../components/Utils";
import axios from "axios";
const ConfirmForm = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [error_message, setErrorMessage] = useState(null);

    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [password_checked, setPasswordChecked] = useState("");

    useEffect(() => {
        setComplete(agreed && password_checked);

        // TODO: error message ?
    }, [password_checked, agreed]);

    const onSubmit = () => {
        setLoading(true);
        // TODO: sumbit password
        axios.post("/accounts/signup/confirm", {
            email: "tinaxli@umich.edu",
            password: password,
            token: "token"
        })
            .then(res => {
                // TODO: direct to sign in?
            }).catch(err => {
                let response = err.response.data;
                setErrorMessage(response.message);
            }).finally(() => {
                setLoading(false);
            });
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

                        <div className="flex items-start mt-6">
                            <div className="flex-shrink-0">
                                <Switch
                                    checked={agreed}
                                    onChange={setAgreed}
                                    className={classNames(
                                        agreed ? "bg-emerald-600" : "bg-gray-200",
                                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    )}
                                >
                                    <span className="sr-only">Agree to policies</span>
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            agreed ? "translate-x-5" : "translate-x-0",
                                            "inline-block h-5 w-5 rounded-full bg-white shadow transdiv ring-0 transition ease-in-out duration-200"
                                        )}
                                    />
                                </Switch>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-500">
                                    By selecting this, you agree to the{" "}
                                    <a href="/terms/terms-conditions" className="font-medium text-gray-700 underline">
                                        Terms and Conditions
                                    </a>
                                    {" "}and{" "}
                                    <a href="/terms/privacy-policy" className="font-medium text-gray-700 underline">
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </>

                    {/* Error message */}
                    {
                        error_message !== null &&
                        <p className="mt-2 text-sm text-red-600">
                            {error_message}
                        </p>
                    }

                    {/* Error message */}
                    {/* {
                        error_message !== null &&
                        <p className="mt-2 text-sm text-red-600">
                            {error_message}
                        </p>
                    } */}


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
                </div>
            </div>
        </div>
    );
};
export default ConfirmForm;