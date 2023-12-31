import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { classNames } from "../../components/Utils";
import NotFound from "../404";

import Entrance from "./Entrace";
import EmailAddress from "./EmailAddress";
import Confirmation from "./Confirmation";
import Password from "./Password";

const steps = [
    { id: 1, name: "Email Address", href: "1" },
    { id: 2, name: "Check Inbox", href: "2" },
    { id: 3, name: "Password", href: "3" },
    { id: 4, name: "Profile Setup", href: "4" },
];

const Progress = ({ currentStep }) => {
    return (
        <nav aria-label="Progress" className="my-2 sm:my-6">
            <ol className="space-y-0 md:flex md:space-y-0 md:space-x-8">
                {steps.map((step) => (
                    <li key={step.name} className="md:flex-1">
                        {step.id <= currentStep ? (
                            <div
                                className={classNames("flex group pl-4 py-2 flex-col border-l-4 border-emerald-600 hover:border-emerald-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4", step.id - currentStep !== 0 && "hidden sm:flex")}
                            >
                                <span className="text-xs text-emerald-600 font-semibold tracking-wide uppercase group-hover:text-emerald-800">
                                    Step {step.id}
                                </span>
                                <span className="text-sm font-medium">{step.name}</span>
                            </div>
                        ) : (
                            <div
                                className="hidden sm:flex group pl-4 py-2 flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                                    Step {step.id}
                                </span>
                                <span className="text-sm font-medium">{step.name}</span>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

const SignUp = () => {
    const Step = () => {
        const { step, role } = useParams();
        const [email, setEmail] = useState(null);
        const [token, setToken] = useState(null);
        console.log("role", role, "step", step);

        useEffect(() => {
            const queryParams = new URLSearchParams(window.location.search);
            const email = queryParams.get("email");
            const token = queryParams.get("token");

            setEmail(email);
            setToken(token);
        }, []);

        if (role !== "student" && role !== "alumni") {
            return <NotFound />;
        } else if (role === "alumni") {
            window.location.href = "https://baylor.qualtrics.com/jfe/form/SV_8v5U3apajzQVm86";
            return;
        }

        let view = null;
        if (step === "1" || !step) {
            view = <EmailAddress email={email} role={role} />;
        } else if (step === "2") {
            view = <Confirmation email={email} role={role} />;
        } else if (step === "3" && email && role && token) {
            view = <Password email={email} role={role} token={token} />;
        } else {
            return <NotFound />;
        }

        return (

            <div className="bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8 h-screen">
                <div className="relative max-w-xl mx-auto h-screen">
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
                        <Link to="/">
                            <img
                                className="mx-auto h-9 w-auto"
                                src="/bu-logo.svg"
                                alt="Workflow"
                            />
                        </Link>
                        <h2 className="mt-2 text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl">Sign up</h2>
                    </div>

                    <Progress currentStep={step || "1"} />

                    <div className="px-5 mt-4 md:mt-2 md:bg-white md:shadow md:rounded-lg md:px-8 md:py-8 md:-mx-8">
                        {view}
                    </div>

                </div>
            </div>
        );
    };

    return (
        <Routes>
            <Route path="/">
                <Route path="/" index element={<Entrance />} />
            </Route>
            <Route path=":role" element={<Step />}>
                <Route path="step-:step" element={<Step />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default SignUp;