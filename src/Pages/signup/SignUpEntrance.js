import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}


const SignUpEntrace = () => {
    const roles = [
        {
            key: "student",
            title: "Current Student",
            description: "Sign up as a current student of the Baylor University, and make your connections in the networks.",
        },
        {
            key: "alumni",
            title: "Alumnus",
            description: "Sign up as an aluminus of the Baylor University, and present yourself in the networks.",
        },
    ];

    const [currentRole, setCurrentRole] = useState(null);

    const onNext = () => {
        window.location.href = "/sign-up/" + currentRole;
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
                    <img
                        className="mx-auto h-20 w-auto"
                        src="/Baylor-University-Athletics-01.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Sign up</h2>
                    <p className="mt-4 text-lg leading-6 text-gray-500">
                        Create an account in Baylor Bridge, start your connection with Baylor University people around world.
                    </p>
                </div>

                
                <RadioGroup value={currentRole} onChange={setCurrentRole}>
                    <div className="mt-14 sm:mt-18 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {roles.map((role) => (
                            <RadioGroup.Option
                                key={role.key}
                                value={role.key}
                                className={({ checked, active }) =>
                                    classNames(
                                        checked ? "border-transparent" : "border-gray-300",
                                        active ? "ring-2 ring-emerald-500" : "",
                                        "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
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
                                            className={classNames(checked ? "" : "opacity-0", "h-5 w-5 text-emerald-600 transition-all duration-75 ease-in")}
                                            aria-hidden="true"
                                        />
                                        <div
                                            className={classNames(
                                                active ? "border" : "border-2",
                                                checked ? "border-emerald-600" : "border-transparent",
                                                "absolute -inset-px rounded-lg pointer-events-none"
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>

                
                <div className="mt-14 sm:mt-18 text-center">
                    <button
                        type="button"
                        className="transition-all duration-75 ease-in w-1/3 sm:w-1/4 text-center px-6 py-3 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default SignUpEntrace;