import React from "react";

import { classNames } from "./Utils";


const Button = ({onClick, loading, disabled, children, className}) => {

    return (
        <button
            type="button"
            className={classNames("text-center w-full flex justify-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed relative", className)}
            onClick={onClick}
            disabled={disabled}
        >
            {
                loading &&
                <div className="absolute">
                    <svg className="pointer-events-none animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fillOpacity="0"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            }
           
            <div className={loading ? "opacity-0" : ""}>
                {children}
            </div>

        </button>
    );
};

export default Button;
