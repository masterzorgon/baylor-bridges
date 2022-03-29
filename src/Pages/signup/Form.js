import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { MailIcon, ArrowSmRightIcon, CalculatorIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import axios from "axios";

import Progress from "./Progress";
import Password from "../../components/Password";
import Button from "../../components/Button";

import { classNames, changeBaseURL } from "../../components/Utils";


const Form = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [step, setStep] = useState(1);
    const [error_message, setErrorMessage] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_checked, setPasswordChecked] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [confirmation_code, setConfirmationCode] = useState("");


    const { role } = useParams();
    if (role !== "student" && role !== "alumni") {
        window.location.href = "/404";
    }


    useEffect(() => {
        if (step === 1) {
            let reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            let is_valid = reg.test(email || "");

            if (role === "student") {
                is_valid = is_valid && email.endsWith("@baylor.edu");
            }

            setComplete(email && email !== "" && is_valid);
        } else if (step === 2) {
            setComplete(password_checked && agreed);
        } else if (step === 3) {
            let reg = /^\d{6}$/;
            let is_valid = reg.test(confirmation_code || "");

            setComplete(confirmation_code && confirmation_code !== "" && is_valid);
        }

        setErrorMessage(null);
    }, [step, role, email, password_checked, agreed, confirmation_code]);


    // FIXME: Self-sign up for alumni is disabled
    if (role === "alumni") {
        window.location.href = "https://baylor.qualtrics.com/jfe/form/SV_8v5U3apajzQVm86";
        return;
    }

    const onSubmit = () => {
        // Email address
        if (step === 1) {
            setLoading(true);
            axios.get("/signup/email/" + email)
                .then(res => {
                    setStep(2);
                }).catch(err => {
                    let response = err.response.data;

                    if (response.code === "EmailExistsException") {
                        setErrorMessage("This email address is already associated with another account.");
                    } else if (response.code === "ConfirmationRequiredException") {
                        // Email is already signed up in Cognito, but just not confirmed yet
                        setStep(3);
                    } else {
                        setErrorMessage("We are unable to continue for you at this moment.");
                    }

                    console.log(err);
                }).finally(() => {
                    setLoading(false);
                });
        }

        // Password
        if (step === 2) {
            setLoading(true);
            axios.post("/signup", {
                email: email,
                password: password,
                role: role,
            })
                .then(res => {
                    // Sign up successfully, no addditional Confirmation needed, jump to finish step
                    setStep(9);
                }).catch(err => {
                    console.log(err);
                    let response = err.response.data;

                    if (response.code === "ConfirmationRequiredException") {
                        // If it needs further email, confirmation jump to step 3.
                        setStep(3);
                    } else if (response.code === "UsernameExistsException") {
                        // If already exists, jump back to step 1.
                        setStep(1);
                    } else {
                        setErrorMessage(response.message);
                    }

                }).finally(() => {
                    setLoading(false);
                });
        }

        // Confirmation code
        if (step === 3) {
            setLoading(true);

            axios.post("/signup/confirm", {
                username: email,
                confirmation_code: confirmation_code,
            })
                .then(res => {
                    // Confirmation successfully, jump to finish step
                    setStep(9);
                }).catch(err => {
                    console.log(err);
                    let response = err.response.data;
                    setErrorMessage(response.message);
                }).finally(() => {
                    setLoading(false);
                });
        }
    };

    const step1 = () => {
        return (
            <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your email address</h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500">{role === "student" ? "Please use your Baylor University email to sign up as a current student." : "Please use your email address to sign up as an alumnus." }</p>
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
            </>
        );
    };

    const step2 = () => {
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

                <div className="flex items-start mt-6">
                    <div className="flex-shrink-0">
                        <Switch
                            checked={agreed}
                            onChange={setAgreed}
                            className={classNames(
                                agreed ? "bg-emerald-600" : "bg-gray-200",
                                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
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
        );
    };

    const step3 = () => {
        return (
            <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Confirmation Code</h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500">Please check your mail inbox for { email }.</p>
                <div className="mt-4 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <CalculatorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={classNames("py-4 block w-full pl-10 sm:text-sm rounded-md", error_message === null ? "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" : "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500")}
                        placeholder="000000"
                        value={confirmation_code}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                    />
                </div>
            </>
        );
    };

    const step9 = () => {
        let url = changeBaseURL(window.location.href, "/sign-in");
        window.location.href = url;
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

                <Progress currentStep={step} />


                <div className="px-5 mt-10 md:mt-2 md:bg-white md:shadow md:rounded-lg md:px-8 md:py-8 md:-mx-8">

                    {step === 1 && step1()}
                    {step === 2 && step2()}
                    {step === 3 && step3()}
                    {step === 9 && step9()}

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

export default Form;