import React from "react";

const Progress = ({ currentStep, steps }) => {
    const percentProgress = () => {

        if (currentStep === steps.length) return "100%";
        let number = (currentStep / steps.length) * 100 - 12.5;
        return number.toString() + "%";


    };
    return (
        <div>
            <div className="mt-6" aria-hidden="true">
                <div className="bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-2 ${steps[currentStep - 1].isSent ? "bg-emerald-800" : "bg-yellow-500"} rounded-full`} style={{ width: percentProgress() }} />
                </div>
                <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                    {steps.map((step) => (
                        <span key={step.name}>
                            <div className={`${step.id > 1 && step.id < steps.length ? "text-center" : ""} 
                            ${step.id <= currentStep ? "text-emerald-800" : "text-gray-400"} ${step.id === steps.length && "text-right"}`}>
                                {step.name}

                            </div>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Progress;
