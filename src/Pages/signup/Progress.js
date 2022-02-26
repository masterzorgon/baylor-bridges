import React from "react";

const steps = [
    { id: 1, name: "Email Address", href: "1" },
    { id: 2, name: "Password", href: "2" },
    { id: 3, name: "Verification", href: "3" },
];

const Progress = ({ currentStep }) => {
    return (
        <nav aria-label="Progress" className="mt-4 sm:mt-10">
            <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                {steps.map((step) => (
                    <li key={step.name} className="md:flex-1">
                        {step.id <= currentStep ? (
                            <a
                                href={step.href}
                                className="group pl-4 py-2 flex flex-col border-l-4 border-emerald-600 hover:border-emerald-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-xs text-emerald-600 font-semibold tracking-wide uppercase group-hover:text-emerald-800">
                                    Step {step.id}
                                </span>
                                <span className="text-sm font-medium">{step.name}</span>
                            </a>
                        ) : step.id === currentStep ? (
                            <a
                                href={step.href}
                                className="pl-4 py-2 flex flex-col border-l-4 border-emerald-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                                aria-current="step"
                            >
                                <span className="text-xs text-emerald-600 font-semibold tracking-wide uppercase">{step.id}</span>
                                <span className="text-sm font-medium">{step.name}</span>
                            </a>
                        ) : (
                            <a
                                href={step.href}
                                className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                                    Step {step.id}
                                </span>
                                <span className="text-sm font-medium">{step.name}</span>
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Progress;