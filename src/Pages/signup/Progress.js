import classNames from "classnames";
import React from "react";

const Progress = ({ currentStep, steps }) => {
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

export default Progress;