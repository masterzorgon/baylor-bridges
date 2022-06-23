import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
            <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                {steps.map((step) => (
                    <li key={step.name} className="md:flex-1">
                        {step.id <= currentStep ? (
                            <div
                                className={classNames(step.id !== currentStep && "hidden sm:flex", "flex group pl-4 py-2 flex-col border-l-4 border-emerald-600 hover:border-emerald-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4")}
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
    const [step, setStep] = useState(null);
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const email = queryParams.get("email");
        const token = queryParams.get("token");

        setEmail(email);
        setToken(token);
    }, []);

    const Step = () => {
        const { step: step_route, role } = useParams();

        console.log("role", role, "step", step_route);

        if (role !== "student" && role !== "alumni") {
            return <NotFound />;
        } else if (role === "alumni") {
            window.location.href = "https://baylor.qualtrics.com/jfe/form/SV_8v5U3apajzQVm86";
            return;
        }

        setStep(step_route);

        let view = null;

        if (step_route === "1" || !step_route) {
            view = <EmailAddress email={email} />;
        } else if (step_route === "2") {
            view = <Confirmation email={email} />;
        } else if (step_route === "3") {
            view = <Password email={email} token={token} />;
        } else {
            return <NotFound />;
        }

        return (

            <div className="bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8 h-screen">
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