import React from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Button = ({onClick, loading, disabled, children, className}) =>{

    return (
        <button
            type="button"
            className={classNames("relative text-center w-full flex justify-center text-sm px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed", className)}
            onClick={onClick}
            disabled={disabled}
        >
            {
                loading &&
                <svg className="cursor-not-allowed animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fillOpacity="0"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            }
           
            {!loading && children}

        </button>
    );
};

export default Button;
