import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

import { classNames, changeBaseURL } from "../../components/Utils";

const roles = [
    {
        key: "student",
        title: "Current Students",
        description: "Sign up as a current student of the Baylor University, and make your connections in the networks.",
    },
    {
        key: "alumni",
        title: "Baylor Alumni",
        description: "Sign up as an aluminus of the Baylor University, and present yourself in the networks.",
    },
];

const Entrace = () => {
    const [currentRole, setCurrentRole] = useState(null);
    const navigate = useNavigate();

    const onNext = () => {
        const url = changeBaseURL(window.location.href, "/sign-up/" + currentRole);
        navigate(url);
    };

    return (
        <div className="min-h-screen flex justify-center bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <div className="min-h-full flex flex-col justify-center relative max-w-2xl mx-auto">
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
                <div className="text-center -mt-14">
                    <a href="/">
                        <img
                            className="mx-auto h-20 w-auto"
                            src="/Baylor-University-Athletics-01.svg"
                            alt="Workflow"
                        />
                    </a>
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Sign up</h2>
                    <p className="mt-4 text-lg leading-6 text-gray-500">
                        Create an account in Baylor Bridges, start your connection with all the Baylor University people around the world.
                    </p>
                </div>

                <RadioGroup value={currentRole} onChange={setCurrentRole}>
                    <div className="mt-14 sm:mt-18 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {roles.map((role) => (
                            <RadioGroup.Option
                                key={role.key}
                                value={role.key}
                                className={({ checked, active }) => classNames(
                                    checked ? "border-transparent" : "border-gray-300",
                                    active ? "ring-2 ring-emerald-500" : "",
                                    "relative bg-white border rounded-lg shadow-sm p-6 pb-7 flex cursor-pointer focus:outline-none"
                                )
                                }
                            >
                                {({ checked, active }) => (
                                    <>
                                        <div className="flex-1 flex">
                                            <div className="flex flex-col">
                                                <RadioGroup.Label as="span" className={classNames(checked ? "text-emerald-900" : "text-gray-900", "block text-md font-semibold")}>
                                                    {role.title}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description as="span" className="mt-1 sm:mt-5 flex items-center text-sm text-gray-500">
                                                    {role.description}
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        <CheckCircleIcon
                                            className={classNames(checked ? "" : "opacity-0", "h-7 w-7 -mt-1 -mr-2 text-emerald-600 duration-75 ease-in")}
                                            aria-hidden="true"
                                        />
                                        <div
                                            className={classNames(
                                                active ? "border" : "border-2",
                                                checked ? "border-emerald-600" : "border-transparent",
                                                "absolute -inset-px rounded-lg"
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>

                <div className="mt-14 sm:mt-10 w-full grid text-center place-items-center space-y-4">
                    <button
                        type="button"
                        className="duration-75 ease-in w-1/2 sm:w-1/3 text-center px-6 py-4 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentRole === null}
                        onClick={onNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Entrace;